(function () {
    const canvas = document.getElementById("fireEmberCanvas");
    if (!canvas || !canvas.getContext) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    const embers = [];
    let width = 0;
    let height = 0;
    let rafId = 0;
    let lastTs = 0;

    function emberCount() {
        const w = window.innerWidth || 360;
        return w < 600 ? 22 : 34;
    }

    function spawnEmber(randomY) {
        const big = Math.random() < 0.18;
        return {
            x: Math.random() * width,
            y: randomY ? Math.random() * height : -12 - Math.random() * 50,
            r: big ? 2.2 + Math.random() * 2.2 : 1.1 + Math.random() * 1.6,
            vy: 22 + Math.random() * 34,
            vx: (Math.random() - 0.5) * 10,
            a: big ? 0.72 + Math.random() * 0.22 : 0.48 + Math.random() * 0.32,
            hue: 18 + Math.random() * 26
        };
    }

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        width = window.innerWidth || 360;
        height = window.innerHeight || 640;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const n = emberCount();
        embers.length = 0;
        for (let i = 0; i < n; i++) embers.push(spawnEmber(true));
    }

    function tick(ts) {
        rafId = requestAnimationFrame(tick);
        if (document.hidden) return;
        const dt = lastTs ? Math.min(0.05, (ts - lastTs) / 1000) : 0.016;
        lastTs = ts;
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < embers.length; i++) {
            const p = embers[i];
            p.y += p.vy * dt;
            p.x += p.vx * dt;
            if (p.y > height + 14 || p.x < -16 || p.x > width + 16) {
                embers[i] = spawnEmber(false);
                continue;
            }
            ctx.beginPath();
            ctx.fillStyle = "hsla(" + p.hue + ", 100%, 58%, " + (p.a * 0.35) + ")";
            ctx.shadowColor = "hsla(" + p.hue + ", 100%, 62%, 0.9)";
            ctx.shadowBlur = 16;
            ctx.arc(p.x, p.y, p.r * 1.8, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.shadowBlur = 8;
            ctx.fillStyle = "hsla(" + Math.min(48, p.hue + 16) + ", 100%, 78%, " + p.a + ")";
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.shadowBlur = 0;
    }

    resize();
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", function () {
        if (!document.hidden) lastTs = 0;
    });
    rafId = requestAnimationFrame(tick);
    window.addEventListener("pagehide", function () {
        cancelAnimationFrame(rafId);
    }, { once: true });
})();
