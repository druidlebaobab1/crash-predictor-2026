/**
 * Ambiance neural / tech coding (accueil) + radar cockpit.
 * Démarre au premier clic/toucher. Le mute du header n'altère pas le moteur.
 */
(function () {
    "use strict";

    var STORAGE_KEY = "crash_ambient_muted";
    var MASTER_LEVEL = 0.82;
    var ctx = null;
    var master = null;
    var landingGain = null;
    var cockpitGain = null;
    var radarTone = null;
    var radarToneGain = null;
    var started = false;
    var muted = false;
    var beepTimer = 0;
    var rafId = 0;
    var lastMult = 1;
    var lastTickStep = 0;
    var toggleBtns = [];

    muted = false;
    try {
        muted = localStorage.getItem(STORAGE_KEY) === "1";
    } catch (err) {}

    function $(id) {
        return document.getElementById(id);
    }

    function isCockpit() {
        var vip = $("vipSoftwareWrapper");
        return Boolean(vip && !vip.classList.contains("hidden"));
    }

    function isArming() {
        var chrono = $("vipSignalChrono");
        return Boolean(chrono && !chrono.classList.contains("hidden"));
    }

    function isScanning() {
        var loader = $("vipScannerLoader");
        return Boolean(loader && !loader.classList.contains("hidden"));
    }

    function isHudLive() {
        var hud = $("vipLiveHud");
        return Boolean(hud && !hud.classList.contains("hidden"));
    }

    var lastArmSec = -1;
    var lastHudLive = false;

    function playCountdownTick(sec) {
        var urgent = sec <= 5;
        playInto(cockpitGain, urgent ? 920 : 540, urgent ? 0.09 : 0.07, urgent ? 0.26 : 0.18);
    }

    function playSignalLock() {
        playInto(cockpitGain, 520, 0.12, 0.24);
        window.setTimeout(function () {
            playInto(cockpitGain, 780, 0.14, 0.22);
        }, 90);
        window.setTimeout(function () {
            playInto(cockpitGain, 1040, 0.16, 0.2);
        }, 180);
    }

    function readMultiplier() {
        var el = $("vipHudNumber");
        if (!el) return 1;
        var n = parseFloat(String(el.textContent || "").replace(/[xX]/g, "").replace(",", "."));
        return Number.isFinite(n) ? n : 1;
    }

    function applyMuteUi() {
        toggleBtns.forEach(function (toggleBtn) {
            toggleBtn.setAttribute("aria-pressed", muted ? "true" : "false");
            toggleBtn.setAttribute("aria-label", muted ? "Activer le son d'ambiance" : "Couper le son d'ambiance");
            toggleBtn.title = muted ? "Son coupé" : "Son d'ambiance";
            toggleBtn.classList.toggle("is-muted", muted);
        });
    }

    function setMuted(next) {
        muted = Boolean(next);
        try {
            localStorage.setItem(STORAGE_KEY, muted ? "1" : "0");
        } catch (err) {}
        if (master && ctx) {
            master.gain.cancelScheduledValues(ctx.currentTime);
            master.gain.setTargetAtTime(muted ? 0 : MASTER_LEVEL, ctx.currentTime, 0.08);
        }
        if (ctx && ctx.state === "suspended" && !muted) {
            ctx.resume().catch(function () {});
        }
        applyMuteUi();
    }

    function resumeCtx() {
        if (ctx && ctx.state === "suspended") {
            return ctx.resume().catch(function () {});
        }
        return Promise.resolve();
    }

    function makeNoiseBuffer(audioCtx) {
        var length = Math.max(1, Math.floor(audioCtx.sampleRate * 2));
        var buffer = audioCtx.createBuffer(1, length, audioCtx.sampleRate);
        var data = buffer.getChannelData(0);
        for (var i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
        return buffer;
    }

    function startLandingLayers() {
        var sub = ctx.createOscillator();
        sub.type = "sine";
        sub.frequency.value = 48;
        var subGain = ctx.createGain();
        subGain.gain.value = 0.07;
        sub.connect(subGain).connect(landingGain);

        var neural = ctx.createOscillator();
        neural.type = "sine";
        neural.frequency.value = 174.6;
        var neuralGain = ctx.createGain();
        neuralGain.gain.value = 0.018;
        neural.connect(neuralGain).connect(landingGain);

        var fifth = ctx.createOscillator();
        fifth.type = "triangle";
        fifth.frequency.value = 261.6;
        var fifthGain = ctx.createGain();
        fifthGain.gain.value = 0.01;
        fifth.connect(fifthGain).connect(landingGain);

        var lfo = ctx.createOscillator();
        lfo.type = "sine";
        lfo.frequency.value = 0.11;
        var lfoDepth = ctx.createGain();
        lfoDepth.gain.value = 0.008;
        lfo.connect(lfoDepth).connect(neuralGain.gain);

        var air = ctx.createBufferSource();
        air.buffer = makeNoiseBuffer(ctx);
        air.loop = true;
        var airFilter = ctx.createBiquadFilter();
        airFilter.type = "highpass";
        airFilter.frequency.value = 6800;
        var airGain = ctx.createGain();
        airGain.gain.value = 0.008;
        air.connect(airFilter).connect(airGain).connect(landingGain);

        var server = ctx.createBufferSource();
        server.buffer = makeNoiseBuffer(ctx);
        server.loop = true;
        var serverFilter = ctx.createBiquadFilter();
        serverFilter.type = "bandpass";
        serverFilter.frequency.value = 2100;
        serverFilter.Q.value = 4.8;
        var serverGain = ctx.createGain();
        serverGain.gain.value = 0.012;
        server.connect(serverFilter).connect(serverGain).connect(landingGain);

        var scan = ctx.createBufferSource();
        scan.buffer = makeNoiseBuffer(ctx);
        scan.loop = true;
        var scanFilter = ctx.createBiquadFilter();
        scanFilter.type = "bandpass";
        scanFilter.frequency.value = 3400;
        scanFilter.Q.value = 8;
        var scanGain = ctx.createGain();
        scanGain.gain.value = 0.006;
        var scanLfo = ctx.createOscillator();
        scanLfo.type = "sine";
        scanLfo.frequency.value = 0.18;
        var scanDepth = ctx.createGain();
        scanDepth.gain.value = 900;
        scanLfo.connect(scanDepth).connect(scanFilter.frequency);
        scan.connect(scanFilter).connect(scanGain).connect(landingGain);

        sub.start();
        neural.start();
        fifth.start();
        lfo.start();
        air.start();
        server.start();
        scan.start();
        scanLfo.start();
    }

    function startCockpitLayers() {
        radarTone = ctx.createOscillator();
        radarTone.type = "sine";
        radarTone.frequency.value = 210;
        radarToneGain = ctx.createGain();
        radarToneGain.gain.value = 0.11;
        var toneFilter = ctx.createBiquadFilter();
        toneFilter.type = "lowpass";
        toneFilter.frequency.value = 1400;
        radarTone.connect(toneFilter).connect(radarToneGain).connect(cockpitGain);

        var hum = ctx.createOscillator();
        hum.type = "triangle";
        hum.frequency.value = 92;
        var humGain = ctx.createGain();
        humGain.gain.value = 0.03;
        hum.connect(humGain).connect(cockpitGain);

        radarTone.start();
        hum.start();
    }

    function playKeyClick() {
        if (!ctx || !landingGain) return;
        var t = ctx.currentTime;
        var osc = ctx.createOscillator();
        osc.type = "square";
        osc.frequency.value = 780 + Math.random() * 520;
        var filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = 2400 + Math.random() * 1800;
        filter.Q.value = 6;
        var gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.07, t + 0.004);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.028);
        osc.connect(filter).connect(gain).connect(landingGain);
        osc.start(t);
        osc.stop(t + 0.04);
    }

    function playInto(dest, freq, duration, peak) {
        if (!ctx || !dest) return;
        var t = ctx.currentTime;
        var osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = freq;
        var gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(Math.max(peak, 0.0002), t + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
        osc.connect(gain).connect(dest);
        osc.start(t);
        osc.stop(t + duration + 0.03);
    }

    function playChirp() {
        if (!ctx || !landingGain) return;
        var t = ctx.currentTime;
        var notes = [1244, 1480, 1760, 2093];
        var osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = notes[Math.floor(Math.random() * notes.length)];
        var filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = osc.frequency.value;
        filter.Q.value = 10;
        var gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.055, t + 0.006);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);
        osc.connect(filter).connect(gain).connect(landingGain);
        osc.start(t);
        osc.stop(t + 0.055);
    }

    function playSubPulse() {
        if (!ctx || !landingGain || isCockpit()) return;
        var t = ctx.currentTime;
        var osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(96, t);
        osc.frequency.exponentialRampToValueAtTime(72, t + 0.09);
        var gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.07, t + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.12);
        osc.connect(gain).connect(landingGain);
        osc.start(t);
        osc.stop(t + 0.14);
    }

    function playCrash() {
        if (!ctx || !cockpitGain) return;
        var t = ctx.currentTime;
        var osc = ctx.createOscillator();
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(320, t);
        osc.frequency.exponentialRampToValueAtTime(70, t + 0.22);
        var filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1800, t);
        filter.frequency.exponentialRampToValueAtTime(280, t + 0.22);
        var gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.30, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
        osc.connect(filter).connect(gain).connect(cockpitGain);
        osc.start(t);
        osc.stop(t + 0.3);
    }

    function playRadarPing() {
        playInto(cockpitGain, 980, 0.08, 0.24);
        window.setTimeout(function () {
            playInto(cockpitGain, 1320, 0.06, 0.16);
        }, 70);
    }

    function scheduleLandingPulse() {
        if (!ctx) return;
        if (!isCockpit()) {
            var roll = Math.random();
            if (roll < 0.42) playChirp();
            else if (roll < 0.62) playSubPulse();
            else playInto(landingGain, 980 + Math.floor(Math.random() * 4) * 140, 0.04, 0.05);
        }
        beepTimer = window.setTimeout(scheduleLandingPulse, 900 + Math.random() * 1400);
    }

    function keyLoop() {
        if (started && !isCockpit() && !muted) {
            playKeyClick();
            if (Math.random() < 0.4) {
                window.setTimeout(playKeyClick, 35 + Math.random() * 80);
            }
        }
        window.setTimeout(keyLoop, 160 + Math.random() * 260);
    }

    function syncScene() {
        if (!ctx || !landingGain || !cockpitGain) return;
        var vip = isCockpit();
        var now = ctx.currentTime;
        landingGain.gain.setTargetAtTime(vip ? 0.0001 : 1, now, 0.12);
        cockpitGain.gain.setTargetAtTime(vip ? 1 : 0.0001, now, 0.12);
        if (!vip || !radarTone || !radarToneGain) {
            lastMult = 1;
            lastTickStep = 0;
            return;
        }
        var scanning = isScanning();
        var m = readMultiplier();
        if (scanning) {
            radarTone.frequency.setTargetAtTime(248, now, 0.1);
            radarToneGain.gain.setTargetAtTime(0.12, now, 0.1);
            lastMult = m;
            lastTickStep = 0;
            return;
        }
        var freq = 200 + Math.min(Math.max(m, 1) - 1, 10) * 92;
        radarTone.frequency.setTargetAtTime(freq, now, 0.045);
        radarToneGain.gain.setTargetAtTime(0.12 + Math.min(m, 8) * 0.012, now, 0.08);
        if (lastMult >= 1.28 && m <= 1.05) {
            playCrash();
        } else {
            var step = Math.floor(m * 5);
            if (step > lastTickStep && m > lastMult) {
                playInto(cockpitGain, 640 + step * 28, 0.045, 0.16);
                lastTickStep = step;
            }
        }
        lastMult = m;
    }

    function loop() {
        syncScene();
        rafId = window.requestAnimationFrame(loop);
    }

    var lastPing = 0;
    function pingLoop() {
        if (started && isCockpit() && !muted) {
            var now = Date.now();
            if (isScanning() && now - lastPing > 1100) {
                playRadarPing();
                lastPing = now;
            }
            if (isArming()) {
                var val = $("vipSignalChronoValue");
                var sec = parseInt(String(val && val.textContent || "0"), 10);
                if (Number.isFinite(sec) && sec !== lastArmSec) {
                    lastArmSec = sec;
                    playCountdownTick(sec);
                }
            } else {
                lastArmSec = -1;
            }
            var hudLive = isHudLive();
            if (hudLive && !lastHudLive) {
                playSignalLock();
            }
            lastHudLive = hudLive;
        }
        window.setTimeout(pingLoop, 180);
    }

    function startEngine() {
        if (started) {
            resumeCtx();
            return;
        }
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        try {
            ctx = new AC();
        } catch (err) {
            return;
        }
        master = ctx.createGain();
        master.gain.value = muted ? 0 : MASTER_LEVEL;
        var compressor = ctx.createDynamicsCompressor();
        compressor.threshold.value = -16;
        compressor.knee.value = 10;
        compressor.ratio.value = 3.2;
        compressor.attack.value = 0.004;
        compressor.release.value = 0.14;
        master.connect(compressor);
        compressor.connect(ctx.destination);

        landingGain = ctx.createGain();
        landingGain.gain.value = isCockpit() ? 0.0001 : 1;
        landingGain.connect(master);

        cockpitGain = ctx.createGain();
        cockpitGain.gain.value = isCockpit() ? 1 : 0.0001;
        cockpitGain.connect(master);

        startLandingLayers();
        startCockpitLayers();
        scheduleLandingPulse();
        keyLoop();
        pingLoop();
        if (!rafId) loop();
        started = true;
        resumeCtx();
    }

    function isToggleEvent(e) {
        return toggleBtns.some(function (btn) {
            return btn && e && e.target && btn.contains(e.target);
        });
    }

    function onPageGesture(e) {
        if (isToggleEvent(e)) return;
        startEngine();
        resumeCtx();
    }

    function bindUnlock() {
        var opts = { capture: true, passive: true };
        document.addEventListener("pointerdown", onPageGesture, opts);
        document.addEventListener("touchstart", onPageGesture, opts);
        document.addEventListener("touchend", onPageGesture, opts);
        document.addEventListener("click", onPageGesture, opts);
        document.addEventListener("keydown", onPageGesture, opts);
        document.addEventListener("wheel", onPageGesture, opts);
        window.addEventListener("scroll", onPageGesture, opts);
        window.addEventListener("pageshow", function () {
            if (started && !muted) resumeCtx();
        });
    }

    function bindToggle() {
        toggleBtns = Array.prototype.slice.call(document.querySelectorAll(".ambient-audio-toggle"));
        applyMuteUi();
        toggleBtns.forEach(function (toggleBtn) {
            toggleBtn.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (muted || !started || (ctx && ctx.state !== "running")) {
                    startEngine();
                    resumeCtx();
                    setMuted(false);
                    return;
                }
                setMuted(true);
            });
        });
    }

    document.addEventListener("visibilitychange", function () {
        if (document.hidden) return;
        if (started && !muted) resumeCtx();
    });

    function placeToggle() {}

    function boot() {
        bindToggle();
        bindUnlock();
        applyMuteUi();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
