/**
 * Ambiance cyber / radar — Web Audio API, sans dépendance.
 * Fichier isolé : n'interagit pas avec MakeTou ni avec l'algorithme du cockpit.
 */
(function () {
    "use strict";

    var STORAGE_KEY = "crash_ambient_muted";
    var MASTER_LEVEL = 0.04;
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
    var toggleBtn = null;

    muted = false;

    function $(id) {
        return document.getElementById(id);
    }

    function isCockpit() {
        var vip = $("vipSoftwareWrapper");
        return Boolean(vip && !vip.classList.contains("hidden"));
    }

    function isScanning() {
        var loader = $("vipScannerLoader");
        return Boolean(loader && !loader.classList.contains("hidden"));
    }

    function readMultiplier() {
        var el = $("vipHudNumber");
        if (!el) return 1;
        var n = parseFloat(String(el.textContent || "").replace(/[xX]/g, "").replace(",", "."));
        return Number.isFinite(n) ? n : 1;
    }

    function applyMuteUi() {
        if (!toggleBtn) return;
        toggleBtn.setAttribute("aria-pressed", muted ? "true" : "false");
        toggleBtn.setAttribute("aria-label", muted ? "Activer le son d'ambiance" : "Couper le son d'ambiance");
        toggleBtn.title = muted ? "Son coupé" : "Son d'ambiance";
        toggleBtn.classList.toggle("is-muted", muted);
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
        var droneA = ctx.createOscillator();
        droneA.type = "sine";
        droneA.frequency.value = 52;
        var droneAGain = ctx.createGain();
        droneAGain.gain.value = 0.2;
        droneA.connect(droneAGain).connect(landingGain);

        var droneB = ctx.createOscillator();
        droneB.type = "sine";
        droneB.frequency.value = 78.4;
        var droneBGain = ctx.createGain();
        droneBGain.gain.value = 0.09;
        droneB.connect(droneBGain).connect(landingGain);

        var lfo = ctx.createOscillator();
        lfo.type = "sine";
        lfo.frequency.value = 0.08;
        var lfoGain = ctx.createGain();
        lfoGain.gain.value = 9;
        lfo.connect(lfoGain).connect(droneB.frequency);

        var sweep = ctx.createOscillator();
        sweep.type = "sine";
        sweep.frequency.value = 640;
        var sweepGain = ctx.createGain();
        sweepGain.gain.value = 0.018;
        sweep.connect(sweepGain).connect(landingGain);
        var sweepLfo = ctx.createOscillator();
        sweepLfo.type = "sine";
        sweepLfo.frequency.value = 0.18;
        var sweepLfoGain = ctx.createGain();
        sweepLfoGain.gain.value = 380;
        sweepLfo.connect(sweepLfoGain).connect(sweep.frequency);

        var noise = ctx.createBufferSource();
        noise.buffer = makeNoiseBuffer(ctx);
        noise.loop = true;
        var noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = "bandpass";
        noiseFilter.frequency.value = 2100;
        noiseFilter.Q.value = 0.85;
        var noiseGain = ctx.createGain();
        noiseGain.gain.value = 0.026;
        noise.connect(noiseFilter).connect(noiseGain).connect(landingGain);
        var noiseLfo = ctx.createOscillator();
        noiseLfo.type = "sine";
        noiseLfo.frequency.value = 0.11;
        var noiseLfoGain = ctx.createGain();
        noiseLfoGain.gain.value = 700;
        noiseLfo.connect(noiseLfoGain).connect(noiseFilter.frequency);

        droneA.start();
        droneB.start();
        lfo.start();
        sweep.start();
        sweepLfo.start();
        noise.start();
        noiseLfo.start();
    }

    function startCockpitLayers() {
        radarTone = ctx.createOscillator();
        radarTone.type = "sine";
        radarTone.frequency.value = 210;
        radarToneGain = ctx.createGain();
        radarToneGain.gain.value = 0.04;
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
        osc.frequency.value = 1800 + Math.random() * 1400;
        var filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = 2400 + Math.random() * 1800;
        filter.Q.value = 6;
        var gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.045, t + 0.004);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
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
        var osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(420, t);
        osc.frequency.exponentialRampToValueAtTime(1680, t + 0.28);
        var gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.09, t + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
        osc.connect(gain).connect(landingGain);
        osc.start(t);
        osc.stop(t + 0.32);
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
        gain.gain.exponentialRampToValueAtTime(0.12, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
        osc.connect(filter).connect(gain).connect(cockpitGain);
        osc.start(t);
        osc.stop(t + 0.3);
    }

    function playRadarPing() {
        playInto(cockpitGain, 980, 0.06, 0.07);
        window.setTimeout(function () {
            playInto(cockpitGain, 1320, 0.045, 0.045);
        }, 70);
    }

    function scheduleLandingPulse() {
        if (!ctx) return;
        if (!isCockpit()) {
            var roll = Math.random();
            if (roll < 0.18) playChirp();
            else if (roll < 0.45) {
                playInto(landingGain, 880, 0.055, 0.09);
                window.setTimeout(function () {
                    playInto(landingGain, 1174, 0.05, 0.07);
                }, 90);
            } else {
                var tones = [740, 830, 988, 1110, 1320];
                playInto(landingGain, tones[Math.floor(Math.random() * tones.length)], 0.05, 0.065);
            }
        }
        beepTimer = window.setTimeout(scheduleLandingPulse, 1500 + Math.random() * 2600);
    }

    function keyLoop() {
        if (started && !isCockpit() && !muted) {
            playKeyClick();
            if (Math.random() < 0.4) {
                window.setTimeout(playKeyClick, 35 + Math.random() * 80);
            }
        }
        window.setTimeout(keyLoop, 65 + Math.random() * 130);
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
            radarToneGain.gain.setTargetAtTime(0.035, now, 0.1);
            lastMult = m;
            lastTickStep = 0;
            return;
        }
        var freq = 200 + Math.min(Math.max(m, 1) - 1, 10) * 92;
        radarTone.frequency.setTargetAtTime(freq, now, 0.045);
        radarToneGain.gain.setTargetAtTime(0.038 + Math.min(m, 8) * 0.004, now, 0.08);
        if (lastMult >= 1.28 && m <= 1.05) {
            playCrash();
        } else {
            var step = Math.floor(m * 5);
            if (step > lastTickStep && m > lastMult) {
                playInto(cockpitGain, 640 + step * 28, 0.03, 0.05);
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
        if (started && isCockpit() && isScanning() && !muted) {
            var now = Date.now();
            if (now - lastPing > 1200) {
                playRadarPing();
                lastPing = now;
            }
        }
        window.setTimeout(pingLoop, 400);
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
        master.connect(ctx.destination);

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
        return Boolean(toggleBtn && e && e.target && toggleBtn.contains(e.target));
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
            startEngine();
            resumeCtx();
        });
    }

    function bindToggle() {
        toggleBtn = $("ambientAudioToggle");
        if (!toggleBtn) return;
        applyMuteUi();
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
    }

    document.addEventListener("visibilitychange", function () {
        if (document.hidden) return;
        startEngine();
        if (!muted) resumeCtx();
    });

    function boot() {
        bindToggle();
        bindUnlock();
        startEngine();
        resumeCtx();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
