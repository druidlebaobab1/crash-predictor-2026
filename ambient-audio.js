/**
 * Ambiance cyber / analyse — Web Audio API, sans dépendance.
 * Fichier isolé : n'interagit pas avec le paiement MakeTou.
 */
(function () {
    "use strict";

    var STORAGE_KEY = "crash_ambient_muted";
    var MASTER_LEVEL = 0.042;
    var ctx = null;
    var master = null;
    var started = false;
    var muted = false;
    var beepTimer = 0;
    var toggleBtn = null;

    try {
        muted = localStorage.getItem(STORAGE_KEY) === "1";
    } catch (err) {}

    function $(id) {
        return document.getElementById(id);
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
        applyMuteUi();
    }

    function makeNoiseBuffer(audioCtx) {
        var length = Math.max(1, Math.floor(audioCtx.sampleRate * 2));
        var buffer = audioCtx.createBuffer(1, length, audioCtx.sampleRate);
        var data = buffer.getChannelData(0);
        for (var i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
        return buffer;
    }

    function startLayers() {
        var droneA = ctx.createOscillator();
        droneA.type = "sine";
        droneA.frequency.value = 52;
        var droneAGain = ctx.createGain();
        droneAGain.gain.value = 0.2;
        droneA.connect(droneAGain).connect(master);

        var droneB = ctx.createOscillator();
        droneB.type = "sine";
        droneB.frequency.value = 78.4;
        var droneBGain = ctx.createGain();
        droneBGain.gain.value = 0.09;
        droneB.connect(droneBGain).connect(master);

        var carrier = ctx.createOscillator();
        carrier.type = "triangle";
        carrier.frequency.value = 164.5;
        var carrierFilter = ctx.createBiquadFilter();
        carrierFilter.type = "lowpass";
        carrierFilter.frequency.value = 420;
        var carrierGain = ctx.createGain();
        carrierGain.gain.value = 0.045;
        carrier.connect(carrierFilter).connect(carrierGain).connect(master);

        var lfo = ctx.createOscillator();
        lfo.type = "sine";
        lfo.frequency.value = 0.08;
        var lfoGain = ctx.createGain();
        lfoGain.gain.value = 9;
        lfo.connect(lfoGain).connect(droneB.frequency);

        var noise = ctx.createBufferSource();
        noise.buffer = makeNoiseBuffer(ctx);
        noise.loop = true;
        var noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = "bandpass";
        noiseFilter.frequency.value = 2100;
        noiseFilter.Q.value = 0.85;
        var noiseGain = ctx.createGain();
        noiseGain.gain.value = 0.028;
        noise.connect(noiseFilter).connect(noiseGain).connect(master);

        var noiseLfo = ctx.createOscillator();
        noiseLfo.type = "sine";
        noiseLfo.frequency.value = 0.11;
        var noiseLfoGain = ctx.createGain();
        noiseLfoGain.gain.value = 700;
        noiseLfo.connect(noiseLfoGain).connect(noiseFilter.frequency);

        var shimmer = ctx.createOscillator();
        shimmer.type = "sine";
        shimmer.frequency.value = 1860;
        var shimmerGain = ctx.createGain();
        shimmerGain.gain.value = 0.012;
        shimmer.connect(shimmerGain).connect(master);

        var trem = ctx.createOscillator();
        trem.type = "sine";
        trem.frequency.value = 0.22;
        var tremGain = ctx.createGain();
        tremGain.gain.value = 0.008;
        trem.connect(tremGain).connect(shimmerGain.gain);

        droneA.start();
        droneB.start();
        carrier.start();
        lfo.start();
        noise.start();
        noiseLfo.start();
        shimmer.start();
        trem.start();
    }

    function playBeep(freq, duration, peak) {
        if (!ctx || !master) return;
        var t = ctx.currentTime;
        var osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = freq;
        var filter = ctx.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.value = 420;
        var gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(peak, t + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
        osc.connect(filter).connect(gain).connect(master);
        osc.start(t);
        osc.stop(t + duration + 0.02);
    }

    function playChirp() {
        if (!ctx || !master) return;
        var t = ctx.currentTime;
        var osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.setValueAtTime(420, t);
        osc.frequency.exponentialRampToValueAtTime(1680, t + 0.28);
        var gain = ctx.createGain();
        gain.gain.setValueAtTime(0.0001, t);
        gain.gain.exponentialRampToValueAtTime(0.09, t + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
        osc.connect(gain).connect(master);
        osc.start(t);
        osc.stop(t + 0.32);
    }

    function scheduleAnalysisPulse() {
        if (!ctx) return;
        var roll = Math.random();
        if (roll < 0.16) {
            playChirp();
        } else if (roll < 0.42) {
            playBeep(880, 0.055, 0.1);
            window.setTimeout(function () {
                playBeep(1174, 0.05, 0.08);
            }, 90);
        } else {
            var tones = [740, 830, 988, 1110, 1320];
            playBeep(tones[Math.floor(Math.random() * tones.length)], 0.045 + Math.random() * 0.03, 0.07);
        }
        beepTimer = window.setTimeout(scheduleAnalysisPulse, 1600 + Math.random() * 2800);
    }

    function startEngine() {
        if (started) {
            if (ctx && ctx.state === "suspended") ctx.resume().catch(function () {});
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
        startLayers();
        scheduleAnalysisPulse();
        started = true;
        if (ctx.state === "suspended") ctx.resume().catch(function () {});
    }

    function onFirstGesture() {
        document.removeEventListener("pointerdown", onFirstGesture, true);
        document.removeEventListener("keydown", onFirstGesture, true);
        document.removeEventListener("touchstart", onFirstGesture, true);
        window.removeEventListener("scroll", onFirstGesture, true);
        startEngine();
    }

    function bindUnlock() {
        document.addEventListener("pointerdown", onFirstGesture, { capture: true, passive: true });
        document.addEventListener("keydown", onFirstGesture, { capture: true, passive: true });
        document.addEventListener("touchstart", onFirstGesture, { capture: true, passive: true });
        window.addEventListener("scroll", onFirstGesture, { capture: true, passive: true });
    }

    function bindToggle() {
        toggleBtn = $("ambientAudioToggle");
        if (!toggleBtn) return;
        applyMuteUi();
        toggleBtn.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            startEngine();
            setMuted(!muted);
        });
    }

    document.addEventListener("visibilitychange", function () {
        if (!ctx) return;
        if (document.hidden) {
            ctx.suspend().catch(function () {});
        } else if (!muted) {
            ctx.resume().catch(function () {});
        }
    });

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function () {
            bindToggle();
            bindUnlock();
        });
    } else {
        bindToggle();
        bindUnlock();
    }
})();
