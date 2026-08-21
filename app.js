/**
 * CRASH PREDICTOR 2026
 * Auth locale + sync Supabase, paiement Flutterwave, cockpit VIP.
 */

const CONFIG = {
    flutterwavePublicKey: "FLWPUBK-07d56b9d571ed135ab4bf5d3fd5330a9-X",
    supabaseUrl: "https://tnxyrvjrxxrsqnpviknz.supabase.co",
    supabaseAnonKey: "sb_publishable_Hl6nmMnRAM1mfdDdudH2_w_kYIJAXdF",
    adminSecret: "ADMIN2026",
    licenseUsd: 50,
    licenseXof: 30000,
    sessionKey: "crash_predictor_user_2026",
    usersDbKey: "crash_users_db_2026",
    guestIdKey: "crash_guest_id_2026",
    timerKey: "crash_timer_start_48h_v4"
};

const WINNER_COMMENTS = [
    { username: "ID: CRASH-9142", lang: "FR", gain: "+$450", comment: "Licence activée sans friction. Le radar de vol rend la lecture de la courbe très claire." },
    { username: "ID: CRASH-3810", lang: "FR", gain: "+$820", comment: "Paiement Mobile Money validé en quelques secondes. Le cockpit s’est ouvert tout seul." },
    { username: "ID: CRASH-7104", lang: "FR", gain: "+$1,100", comment: "Interface rapide, rien à installer. L’historique des rounds est bien lisible." },
    { username: "ID: CRASH-4492", lang: "FR", gain: "+$390", comment: "Compte créé en 30 secondes, design net, session fluide sur téléphone." },
    { username: "ID: CRASH-8255", lang: "FR", gain: "+$640", comment: "Le flux entre les rounds est propre. Licence à vie, un seul paiement." },
    { username: "ID: CRASH-6190", lang: "ES", gain: "+$580", comment: "El checkout Flutterwave funcionó bien. Acceso inmediato al radar." },
    { username: "ID: CRASH-2941", lang: "EN", gain: "+$1,380", comment: "Clean cockpit, stable animation, lifetime unlock after card payment." },
    { username: "ID: CRASH-5520", lang: "PT", gain: "+$1,650", comment: "Pagamento confirmado e o software VIP abriu na hora. Visual excelente." }
];

const FLASH_NOTIFICATIONS = [
    { idTag: "ID: CRASH-9421", text: "vient d'activer son accès VIP" },
    { idTag: "ID: CRASH-3810", text: "a validé son accès à vie" },
    { idTag: "ID: CRASH-7140", text: "vient de débloquer son cockpit VIP" },
    { idTag: "ID: CRASH-5219", text: "a activé sa licence avec succès" },
    { idTag: "ID: CRASH-8834", text: "vient de rejoindre la session en direct" },
    { idTag: "ID: CRASH-1940", text: "a déverrouillé le radar de vol" },
    { idTag: "ID: CRASH-6302", text: "vient d'activer son ID membre VIP" }
];

let supabaseClient = null;
let currentUser = readJson(CONFIG.sessionKey, null);
let displayedCommentsCount = 4;
let selectedMomoNetwork = "WAVE";
let vipAnimationId = null;
let vipEngineRunning = false;
let vipResizeHandler = null;
let vipTargetMultiplier = 2.40;
let vipCurrentFlightNumber = 8492;
let realtimeChannel = null;
let paymentInFlight = false;
let pendingCheckoutAfterAuth = false;

document.addEventListener("DOMContentLoaded", () => {
    initSupabase();
    initUserIdentity();
    initGlobalViewRouter();
    initLiveOnlineUsersTicker();
    initLiveFlashSocialNotifications();
    initGuaranteed48hCountdown();
    renderCommentsList();
    initLoadMoreComments();
    initAuthSecurity();
    initProfileModal();
    initModals();
    initCheckout();
    initMasterAdminDashboard();
    syncUserFromSupabase();
    subscribeUserRealtime();
});

/* -------------------------------------------------------------------------- */
/* Utilitaires                                                                 */
/* -------------------------------------------------------------------------- */

function readJson(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function loadUsersDb() {
    return readJson(CONFIG.usersDbKey, []);
}

function saveUsersDb(users) {
    writeJson(CONFIG.usersDbKey, users);
}

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    }[char]));
}

function generateUniqueId() {
    const users = loadUsersDb();
    let candidate = "";
    do {
        candidate = `CRASH-${Math.floor(1000 + Math.random() * 9000)}`;
    } while (users.some((user) => user.uniqueId === candidate));
    return candidate;
}

async function hashPassword(password) {
    const payload = new TextEncoder().encode(`crash2026:${password}`);
    const digest = await crypto.subtle.digest("SHA-256", payload);
    return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function passwordMatches(user, password) {
    if (!user?.passwordHash) return false;
    if (user.passwordHash === btoa(password)) return true;
    return user.passwordHash === await hashPassword(password);
}

function setButtonLoading(button, loading, idleHtml) {
    if (!button) return;
    if (loading) {
        button.dataset.idleHtml = button.dataset.idleHtml || button.innerHTML;
        button.disabled = true;
        button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Traitement…';
    } else {
        button.disabled = false;
        button.innerHTML = idleHtml || button.dataset.idleHtml || button.innerHTML;
    }
}

function digitsOnly(value) {
    return String(value || "").replace(/\D/g, "");
}

function isValidPhone(value) {
    return digitsOnly(value).length >= 8;
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function $(id) {
    return document.getElementById(id);
}

/* -------------------------------------------------------------------------- */
/* Supabase                                                                    */
/* -------------------------------------------------------------------------- */

function initSupabase() {
    if (typeof supabase === "undefined" || !supabase.createClient) return;
    try {
        supabaseClient = supabase.createClient(CONFIG.supabaseUrl, CONFIG.supabaseAnonKey);
    } catch (error) {
        console.warn("Supabase indisponible:", error);
    }
}

function toCloudUser(user) {
    return {
        unique_id: user.uniqueId,
        name: user.name,
        email: user.email,
        phone: user.phone || "",
        is_subscribed: Boolean(user.isSubscribed),
        updated_at: new Date().toISOString()
    };
}

async function saveUserSession(user) {
    currentUser = user;
    writeJson(CONFIG.sessionKey, user);

    const users = loadUsersDb();
    const index = users.findIndex((item) => item.email === user.email || item.uniqueId === user.uniqueId);
    if (index >= 0) users[index] = { ...users[index], ...user };
    else users.push(user);
    saveUsersDb(users);

    if (!supabaseClient) return;
    try {
        await supabaseClient.from("users").upsert(toCloudUser(user), { onConflict: "email" });
    } catch (error) {
        console.warn("Sync users:", error);
    }
}

async function syncUserFromSupabase() {
    if (!supabaseClient || !currentUser?.email) return;
    try {
        const { data, error } = await supabaseClient
            .from("users")
            .select("unique_id, name, email, phone, is_subscribed")
            .eq("email", currentUser.email)
            .maybeSingle();

        if (error || !data) return;

        const nextUser = {
            ...currentUser,
            uniqueId: data.unique_id || currentUser.uniqueId,
            name: data.name || currentUser.name,
            phone: data.phone || currentUser.phone || "",
            isSubscribed: Boolean(data.is_subscribed)
        };

        const changed = nextUser.isSubscribed !== currentUser.isSubscribed || nextUser.phone !== currentUser.phone;
        await saveUserSession(nextUser);
        if (changed) initGlobalViewRouter();
    } catch (error) {
        console.warn("Lecture cloud:", error);
    }
}

function subscribeUserRealtime() {
    if (!supabaseClient || !currentUser?.email) return;
    if (realtimeChannel) {
        supabaseClient.removeChannel(realtimeChannel);
        realtimeChannel = null;
    }

    realtimeChannel = supabaseClient
        .channel(`user-license-${currentUser.email}`)
        .on("postgres_changes", {
            event: "UPDATE",
            schema: "public",
            table: "users",
            filter: `email=eq.${currentUser.email}`
        }, (payload) => {
            const subscribed = Boolean(payload.new?.is_subscribed);
            if (!currentUser || subscribed === currentUser.isSubscribed) return;
            currentUser.isSubscribed = subscribed;
            saveUserSession(currentUser);
            initGlobalViewRouter();
            showToast(subscribed ? "Licence VIP activée depuis le cloud." : "Licence suspendue.");
        })
        .subscribe();
}

async function recordPayment(payload) {
    if (!supabaseClient) return;
    try {
        await supabaseClient.from("payments").upsert(payload, { onConflict: "tx_ref" });
    } catch (error) {
        console.warn("Sync payments:", error);
    }
}

/* -------------------------------------------------------------------------- */
/* Identité & vues                                                             */
/* -------------------------------------------------------------------------- */

function initUserIdentity() {
    if (currentUser && !currentUser.uniqueId) {
        currentUser.uniqueId = generateUniqueId();
        saveUserSession(currentUser);
        return;
    }
    if (!localStorage.getItem(CONFIG.guestIdKey)) {
        localStorage.setItem(CONFIG.guestIdKey, generateUniqueId());
    }
}

function initGlobalViewRouter() {
    const publicSite = $("publicSiteWrapper");
    const vipSoftware = $("vipSoftwareWrapper");
    const stickyCta = $("stickyMobileCta");

    if (currentUser?.isSubscribed) {
        publicSite?.classList.add("hidden");
        vipSoftware?.classList.remove("hidden");
        stickyCta?.classList.add("hidden");
        const vipName = $("vipUsernameDisplay");
        const vipId = $("vipIdDisplay");
        const vipSidebar = $("vipSidebarUserId");
        if (vipName) vipName.textContent = currentUser.name || "Membre VIP";
        if (vipId) vipId.textContent = `ID: ${currentUser.uniqueId}`;
        if (vipSidebar) vipSidebar.textContent = currentUser.uniqueId;
        startVipGrandVerticalRadarEngine();
    } else {
        publicSite?.classList.remove("hidden");
        vipSoftware?.classList.add("hidden");
        stickyCta?.classList.remove("hidden");
        stopVipEngine();
        updateAuthPublicHeader();
    }
}

function updateAuthPublicHeader() {
    const guestButtons = $("guestButtons");
    const userProfileBadge = $("userProfileBadge");
    const siteAlertBanner = $("siteSubscriptionAlert");

    if (currentUser) {
        guestButtons?.classList.add("hidden");
        userProfileBadge?.classList.remove("hidden");
        const navName = $("navUserName");
        const navId = $("navUserIdTag");
        if (navName) navName.textContent = currentUser.name || "Client";
        if (navId) navId.textContent = `ID: ${currentUser.uniqueId}`;
        siteAlertBanner?.classList.toggle("hidden", Boolean(currentUser.isSubscribed));
    } else {
        guestButtons?.classList.remove("hidden");
        userProfileBadge?.classList.add("hidden");
        siteAlertBanner?.classList.add("hidden");
    }
}

function grantVipAccess() {
    if (!currentUser) return;
    currentUser.isSubscribed = true;
    saveUserSession(currentUser);
    subscribeUserRealtime();
    initGlobalViewRouter();
    closeAllModals();
    hidePaymentOverlay();
    showToast("Licence VIP activée. Cockpit déverrouillé.");
}

/* -------------------------------------------------------------------------- */
/* Cockpit VIP                                                                 */
/* -------------------------------------------------------------------------- */

function stopVipEngine() {
    vipEngineRunning = false;
    if (vipAnimationId) cancelAnimationFrame(vipAnimationId);
    vipAnimationId = null;
    if (vipResizeHandler) {
        window.removeEventListener("resize", vipResizeHandler);
        vipResizeHandler = null;
    }
}

function startVipGrandVerticalRadarEngine() {
    const canvas = $("vipFlightCanvas");
    if (!canvas || vipEngineRunning) return;

    const ctx = canvas.getContext("2d");
    const hudNumber = $("vipHudNumber");
    const targetDisplay = $("vipLiveTargetDisplay");
    const confidenceDisplay = $("vipLiveConfidence");
    const statusMessage = $("vipFlightMessage");
    const historyList = $("vipHistoryList");
    const scannerLoader = $("vipScannerLoader");
    const scanProgressFill = $("scanProgressFill");

    vipEngineRunning = true;

    function resizeCanvas() {
        const parent = canvas.parentElement;
        if (!parent) return;
        canvas.width = parent.clientWidth || 800;
        canvas.height = Math.max(parent.clientHeight || 500, 360);
    }

    vipResizeHandler = resizeCanvas;
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let flightState = "scanning";
    let currentMultiplier = 1;
    let flightProgress = 0;
    let flightSpeed = 0.0014;
    let explosionTimer = 0;
    let particles = [];
    let scanTimer = null;

    if (historyList && !historyList.children.length) {
        [2.15, 1.85, 5.40, 2.90, 1.75].forEach((mult, index) => {
            pushHistoryItem(8491 - index, mult, false);
        });
    }

    function generateNextTarget() {
        const isBig = Math.random() < 0.25;
        const pool = isBig ? [5.20, 5.85, 6.40, 7.15, 7.90] : [1.65, 1.85, 2.10, 2.35, 2.65, 2.95, 3.25];
        vipTargetMultiplier = pool[Math.floor(Math.random() * pool.length)];
        flightSpeed = isBig ? 0.0011 : 0.0015;
        if (targetDisplay) targetDisplay.textContent = `x${vipTargetMultiplier.toFixed(2)}`;
        if (confidenceDisplay) confidenceDisplay.textContent = `${(98.6 + Math.random() * 1.2).toFixed(1)}%`;
        if (statusMessage) {
            statusMessage.innerHTML = `Signal prêt : sortie simulée à <strong>x${vipTargetMultiplier.toFixed(2)}</strong>. Décollage…`;
        }
    }

    function createExplosion(x, y) {
        particles = Array.from({ length: 55 }, (_, index) => {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 9;
            return {
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: index % 3 === 0 ? "#ffc837" : (index % 3 === 1 ? "#ef4444" : "#10b981"),
                size: 3 + Math.random() * 5,
                alpha: 1
            };
        });
    }

    function pushHistoryItem(flightNumber, mult, prepend) {
        if (!historyList) return;
        const item = document.createElement("div");
        const isBig = mult >= 5;
        item.className = isBig ? "history-item big-win animate-fade" : "history-item win animate-fade";
        item.innerHTML = `
            <span class="h-flight">Vol #${flightNumber}</span>
            <span class="h-pred">x${mult.toFixed(2)}</span>
            <span class="h-badge ${isBig ? "gold" : "green"}">${isBig ? "GROS GAIN" : "VALIDÉ"}</span>
        `;
        if (prepend) historyList.insertBefore(item, historyList.firstChild);
        else historyList.appendChild(item);
        while (historyList.children.length > 8) historyList.removeChild(historyList.lastChild);
    }

    function startCalibrationPhase() {
        flightState = "scanning";
        scannerLoader?.classList.remove("hidden");
        if (scanProgressFill) scanProgressFill.style.width = "0%";
        if (statusMessage) statusMessage.textContent = "Calibration du signal… prochain round.";
        let progress = 0;
        clearInterval(scanTimer);
        scanTimer = setInterval(() => {
            if (!vipEngineRunning) {
                clearInterval(scanTimer);
                return;
            }
            progress += 4;
            if (scanProgressFill) scanProgressFill.style.width = `${Math.min(progress, 100)}%`;
            if (progress >= 100) {
                clearInterval(scanTimer);
                scannerLoader?.classList.add("hidden");
                flightState = "flying";
                currentMultiplier = 1;
                flightProgress = 0;
                explosionTimer = 0;
                particles = [];
                generateNextTarget();
            }
        }, 120);
    }

    function renderVIPCockpit() {
        if (!vipEngineRunning) return;
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#060a18";
        ctx.fillRect(0, 0, width, height);

        ctx.strokeStyle = "rgba(255, 200, 55, 0.08)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        for (let y = 30; y < height - 25; y += 40) {
            ctx.beginPath();
            ctx.moveTo(25, y);
            ctx.lineTo(width - 20, y);
            ctx.stroke();
        }
        for (let x = 45; x < width - 20; x += 65) {
            ctx.beginPath();
            ctx.moveTo(x, 20);
            ctx.lineTo(x, height - 25);
            ctx.stroke();
        }
        ctx.setLineDash([]);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(25, height - 25);
        ctx.lineTo(width - 10, height - 25);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(25, 20);
        ctx.lineTo(25, height - 25);
        ctx.stroke();

        const startX = 25;
        const startY = height - 25;
        const multiplierRatio = Math.min(Math.max((vipTargetMultiplier - 1.2) / 6.8, 0.15), 0.95);
        const targetX = startX + (width - startX - 35) * (0.3 + multiplierRatio * 0.7);
        const targetY = startY - (startY - 35) * (0.25 + multiplierRatio * 0.75);
        const cpX = startX + (targetX - startX) * 0.25;
        const cpY = startY;

        if (flightState === "flying") {
            flightProgress += flightSpeed;
            const p = Math.min(flightProgress, 1);
            currentMultiplier = 1 + (vipTargetMultiplier - 1) * Math.pow(p, 1.15);
            if (hudNumber) hudNumber.textContent = `x${currentMultiplier.toFixed(2)}`;

            const curX = (1 - p) * (1 - p) * startX + 2 * (1 - p) * p * cpX + p * p * targetX;
            const curY = (1 - p) * (1 - p) * startY + 2 * (1 - p) * p * cpY + p * p * targetY;

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            for (let s = 0; s <= p; s += 0.01) {
                const px = (1 - s) * (1 - s) * startX + 2 * (1 - s) * s * cpX + s * s * targetX;
                const py = (1 - s) * (1 - s) * startY + 2 * (1 - s) * s * cpY + s * s * targetY;
                ctx.lineTo(px, py);
            }
            ctx.strokeStyle = "#ffc837";
            ctx.lineWidth = 6;
            ctx.lineCap = "round";
            ctx.shadowColor = "#ffc837";
            ctx.shadowBlur = 20;
            ctx.stroke();
            ctx.shadowBlur = 0;

            const dx = 2 * (1 - p) * (cpX - startX) + 2 * p * (targetX - cpX);
            const dy = 2 * (1 - p) * (cpY - startY) + 2 * p * (targetY - cpY);
            ctx.save();
            ctx.translate(curX, curY);
            ctx.rotate(Math.atan2(dy, dx));
            ctx.fillStyle = "#ffc837";
            ctx.beginPath();
            ctx.ellipse(0, 0, 24, 11, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#1e1b4b";
            ctx.beginPath();
            ctx.arc(7, -2, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#f59e0b";
            ctx.beginPath();
            ctx.moveTo(-3, 0); ctx.lineTo(-14, -20); ctx.lineTo(5, -3); ctx.closePath(); ctx.fill();
            ctx.beginPath();
            ctx.moveTo(-3, 0); ctx.lineTo(-14, 20); ctx.lineTo(5, 3); ctx.closePath(); ctx.fill();
            ctx.fillStyle = "#ef4444";
            ctx.beginPath();
            ctx.moveTo(-24, -4);
            ctx.lineTo(-42 - Math.random() * 14, 0);
            ctx.lineTo(-24, 4);
            ctx.closePath();
            ctx.fill();
            ctx.restore();

            if (p >= 1) {
                flightState = "crashed";
                createExplosion(curX, curY);
                vipCurrentFlightNumber += 1;
                pushHistoryItem(vipCurrentFlightNumber, vipTargetMultiplier, true);
                if (statusMessage) {
                    statusMessage.innerHTML = `Round clos à <strong>x${vipTargetMultiplier.toFixed(2)}</strong>.`;
                }
            }
        } else if (flightState === "crashed") {
            explosionTimer += 1;
            particles.forEach((point) => {
                point.x += point.vx;
                point.y += point.vy;
                point.alpha -= 0.024;
                if (point.alpha <= 0) return;
                ctx.save();
                ctx.globalAlpha = point.alpha;
                ctx.fillStyle = point.color;
                ctx.beginPath();
                ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
            if (explosionTimer > 50) startCalibrationPhase();
        }

        vipAnimationId = requestAnimationFrame(renderVIPCockpit);
    }

    startCalibrationPhase();
    renderVIPCockpit();
}

/* -------------------------------------------------------------------------- */
/* Contenu public                                                              */
/* -------------------------------------------------------------------------- */

function initLiveFlashSocialNotifications() {
    const flashBox = $("liveFlashSocialBox");
    if (!flashBox) return;
    let flashIdx = 0;
    const triggerFlash = () => {
        const item = FLASH_NOTIFICATIONS[flashIdx % FLASH_NOTIFICATIONS.length];
        flashIdx += 1;
        $("flashTitle").textContent = item.idTag;
        $("flashSubtitle").textContent = item.text;
        flashBox.classList.add("visible");
        setTimeout(() => flashBox.classList.remove("visible"), 3800);
    };
    setTimeout(triggerFlash, 3500);
    setInterval(triggerFlash, 8500);
}

function initLiveOnlineUsersTicker() {
    const liveCounterEl = $("liveOnlineUsersCount");
    if (!liveCounterEl) return;
    let currentUsers = 1348290;
    setInterval(() => {
        currentUsers += Math.floor((Math.random() - 0.47) * 160);
        currentUsers = Math.min(1492000, Math.max(1180000, currentUsers));
        liveCounterEl.textContent = currentUsers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }, 1400);
}

function initGuaranteed48hCountdown() {
    const timerElements = document.querySelectorAll(".countdown-timer-text");
    if (!timerElements.length) return;
    const duration = 48 * 60 * 60 * 1000;
    let timerStart = Number(localStorage.getItem(CONFIG.timerKey));
    if (!timerStart || Date.now() - timerStart > duration) {
        timerStart = Date.now();
        localStorage.setItem(CONFIG.timerKey, String(timerStart));
    }
    const tick = () => {
        const remaining = Math.max(0, duration - (Date.now() - timerStart));
        const hours = String(Math.floor(remaining / 3600000)).padStart(2, "0");
        const minutes = String(Math.floor((remaining % 3600000) / 60000)).padStart(2, "0");
        const seconds = String(Math.floor((remaining % 60000) / 1000)).padStart(2, "0");
        timerElements.forEach((el) => { el.textContent = `${hours}h ${minutes}m ${seconds}s`; });
    };
    tick();
    setInterval(tick, 1000);
}

function renderCommentsList() {
    const grid = $("commentsGrid");
    if (!grid) return;
    grid.innerHTML = WINNER_COMMENTS.slice(0, displayedCommentsCount).map((comment) => `
        <article class="comment-card">
            <div class="comment-header">
                <div class="comment-user-box">
                    <div class="comment-lang-badge">${escapeHtml(comment.lang)}</div>
                    <div class="comment-username">${escapeHtml(comment.username)} <i class="fa-solid fa-circle-check text-green"></i></div>
                </div>
                <div class="comment-gain-badge">${escapeHtml(comment.gain)}</div>
            </div>
            <p class="comment-text">"${escapeHtml(comment.comment)}"</p>
        </article>
    `).join("");
}

function initLoadMoreComments() {
    $("btnLoadMoreComments")?.addEventListener("click", (event) => {
        displayedCommentsCount = WINNER_COMMENTS.length;
        renderCommentsList();
        event.currentTarget.style.display = "none";
    });
}

/* -------------------------------------------------------------------------- */
/* Admin                                                                       */
/* -------------------------------------------------------------------------- */

function initMasterAdminDashboard() {
    const adminModal = $("adminModal");
    $("linkOpenAdminLogin")?.addEventListener("click", (event) => {
        event.preventDefault();
        adminModal?.classList.add("active");
    });
    $("closeAdminModal")?.addEventListener("click", () => adminModal?.classList.remove("active"));

    $("formAdminAuth")?.addEventListener("submit", (event) => {
        event.preventDefault();
        const key = $("adminSecretKeyInput").value.trim();
        if (key !== CONFIG.adminSecret) {
            showToast("Mot de passe administrateur incorrect.", "error");
            return;
        }
        $("adminAuthScreen")?.classList.add("hidden");
        $("adminDashboardScreen")?.classList.remove("hidden");
        renderAdminUsersTable();
        showToast("Accès administrateur déverrouillé.");
    });

    $("btnAdminActivateById")?.addEventListener("click", async () => {
        const targetId = $("adminTargetIdInput").value.trim().toUpperCase();
        if (!/^CRASH-\d{4}$/.test(targetId)) {
            showToast("ID invalide. Format attendu : CRASH-8491.", "error");
            return;
        }
        await activateMemberById(targetId);
        $("adminTargetIdInput").value = "";
        renderAdminUsersTable();
    });

    $("adminUsersTableBody")?.addEventListener("click", async (event) => {
        const button = event.target.closest("[data-admin-email]");
        if (!button) return;
        await adminToggleUser(button.dataset.adminEmail, button.dataset.adminAction === "activate");
    });
}

async function activateMemberById(targetId) {
    const users = loadUsersDb();
    const index = users.findIndex((user) => user.uniqueId === targetId || user.email?.toUpperCase() === targetId);
    if (index >= 0) {
        users[index].isSubscribed = true;
        saveUsersDb(users);
        if (currentUser && (currentUser.uniqueId === targetId || currentUser.email?.toUpperCase() === targetId)) {
            grantVipAccess();
        }
        if (supabaseClient) {
            await supabaseClient.from("users").update({ is_subscribed: true, updated_at: new Date().toISOString() }).eq("unique_id", targetId);
        }
        showToast(`VIP activé pour ${targetId}.`);
        return;
    }

    const created = {
        id: Date.now(),
        uniqueId: targetId,
        name: `Membre_${targetId}`,
        email: `${targetId.toLowerCase()}@client.local`,
        phone: "",
        isSubscribed: true,
        registeredAt: new Date().toISOString()
    };
    users.push(created);
    saveUsersDb(users);
    if (supabaseClient) {
        await supabaseClient.from("users").upsert(toCloudUser(created), { onConflict: "email" });
    }
    showToast(`ID ${targetId} créé et activé.`);
}

async function renderAdminUsersTable() {
    const tbody = $("adminUsersTableBody");
    if (!tbody) return;
    let users = loadUsersDb();

    if (supabaseClient) {
        try {
            const { data } = await supabaseClient
                .from("users")
                .select("id, unique_id, name, email, is_subscribed")
                .order("updated_at", { ascending: false });
            if (data?.length) {
                data.forEach((cloudUser) => {
                    const idx = users.findIndex((user) => user.email === cloudUser.email || user.uniqueId === cloudUser.unique_id);
                    const mapped = {
                        id: cloudUser.id,
                        uniqueId: cloudUser.unique_id,
                        name: cloudUser.name,
                        email: cloudUser.email,
                        isSubscribed: Boolean(cloudUser.is_subscribed)
                    };
                    if (idx >= 0) users[idx] = { ...users[idx], ...mapped };
                    else users.push(mapped);
                });
                saveUsersDb(users);
            }
        } catch (error) {
            console.warn("Admin fetch:", error);
        }
    }

    if (!users.length) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#9ca3af;padding:15px;">Aucun utilisateur inscrit.</td></tr>';
        return;
    }

    tbody.innerHTML = users.map((user) => `
        <tr>
            <td><strong class="gold-code">${escapeHtml(user.uniqueId || "CRASH-0000")}</strong></td>
            <td>${escapeHtml(user.name)}</td>
            <td>${escapeHtml(user.email)}</td>
            <td>${user.isSubscribed
                ? '<span class="badge-tag green"><i class="fa-solid fa-crown"></i> VIP</span>'
                : '<span class="badge-tag red"><i class="fa-solid fa-circle-xmark"></i> INACTIF</span>'}</td>
            <td>
                <button type="button" class="btn-table-action ${user.isSubscribed ? "deactivate" : "activate"}"
                    data-admin-email="${escapeHtml(user.email)}"
                    data-admin-action="${user.isSubscribed ? "suspend" : "activate"}">
                    ${user.isSubscribed ? "Suspendre" : "Activer VIP"}
                </button>
            </td>
        </tr>
    `).join("");
}

async function adminToggleUser(email, status) {
    const users = loadUsersDb();
    const index = users.findIndex((user) => user.email === email);
    if (index < 0) return;
    users[index].isSubscribed = status;
    saveUsersDb(users);
    if (currentUser?.email === email) {
        currentUser.isSubscribed = status;
        await saveUserSession(currentUser);
        initGlobalViewRouter();
    }
    if (supabaseClient) {
        await supabaseClient.from("users").update({ is_subscribed: status, updated_at: new Date().toISOString() }).eq("email", email);
    }
    renderAdminUsersTable();
    showToast(status ? "Membre activé." : "Accès suspendu.");
}

/* -------------------------------------------------------------------------- */
/* Flutterwave                                                                 */
/* -------------------------------------------------------------------------- */

function initCheckout() {
    document.querySelectorAll("#directBuyButton, #btnAlertSubscribe, #stickyMobileCta, #btnProfileSubscribe").forEach((button) => {
        button?.addEventListener("click", (event) => {
            event.preventDefault();
            $("profileModal")?.classList.remove("active");
            openCheckout();
        });
    });

    document.querySelectorAll(".momo-chip-card").forEach((chip) => {
        chip.addEventListener("click", () => {
            document.querySelectorAll(".momo-chip-card").forEach((item) => item.classList.remove("selected"));
            chip.classList.add("selected");
            selectedMomoNetwork = chip.dataset.network || "WAVE";
        });
    });

    $("checkoutGoLogin")?.addEventListener("click", () => {
        pendingCheckoutAfterAuth = true;
        closeAllModals();
        $("loginModal")?.classList.add("active");
    });
    $("checkoutGoRegister")?.addEventListener("click", () => {
        pendingCheckoutAfterAuth = true;
        closeAllModals();
        $("registerModal")?.classList.add("active");
    });

    $("btnExecuteMomoPayment")?.addEventListener("click", () => startFlutterwavePayment("mobilemoney"));
    $("btnExecuteCardPayment")?.addEventListener("click", () => startFlutterwavePayment("card"));
}

function openCheckout() {
    refreshCheckoutGate();
    $("buyModal")?.classList.add("active");
}

function refreshCheckoutGate() {
    const loggedIn = Boolean(currentUser);
    $("checkoutAuthGate")?.classList.toggle("hidden", loggedIn);
    $("checkoutPaymentPanel")?.classList.toggle("hidden", !loggedIn);
    if (loggedIn && $("checkoutPhoneInput")) {
        $("checkoutPhoneInput").value = currentUser.phone || "";
    }
}

function showPaymentOverlay(text) {
    const label = $("paymentProcessingText");
    if (label) label.textContent = text;
    $("paymentProcessingOverlay")?.classList.remove("hidden");
}

function hidePaymentOverlay() {
    $("paymentProcessingOverlay")?.classList.add("hidden");
    paymentInFlight = false;
}

async function startFlutterwavePayment(method) {
    if (paymentInFlight) return;
    if (!currentUser) {
        pendingCheckoutAfterAuth = true;
        refreshCheckoutGate();
        showToast("Connectez-vous avant de payer.", "error");
        return;
    }
    if (typeof FlutterwaveCheckout !== "function") {
        showToast("Passerelle Flutterwave encore en chargement.", "error");
        return;
    }

    const phone = $("checkoutPhoneInput")?.value.trim() || currentUser.phone || "";
    if (method === "mobilemoney" && !isValidPhone(phone)) {
        showToast("Indiquez un numéro Mobile Money valide.", "error");
        $("checkoutPhoneInput")?.focus();
        return;
    }

    currentUser.phone = phone;
    await saveUserSession(currentUser);

    const isCard = method === "card";
    const txRef = `CRASH-${currentUser.uniqueId}-${Date.now()}`;
    const amount = isCard ? CONFIG.licenseUsd : CONFIG.licenseXof;
    const currency = isCard ? "USD" : "XOF";

    await recordPayment({
        tx_ref: txRef,
        email: currentUser.email,
        unique_id: currentUser.uniqueId,
        amount,
        currency,
        network: isCard ? "CARD" : selectedMomoNetwork,
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
    });

    paymentInFlight = true;
    let checkoutSucceeded = false;
    const payButton = isCard ? $("btnExecuteCardPayment") : $("btnExecuteMomoPayment");
    setButtonLoading(payButton, true);

    FlutterwaveCheckout({
        public_key: CONFIG.flutterwavePublicKey,
        tx_ref: txRef,
        amount,
        currency,
        payment_options: isCard ? "card" : "mobilemoneyfrancophone",
        customer: {
            email: currentUser.email,
            phone_number: digitsOnly(phone) || "0700000000",
            name: currentUser.name
        },
        meta: {
            unique_id: currentUser.uniqueId,
            network: selectedMomoNetwork,
            product: "crash-predictor-2026-lifetime"
        },
        customizations: {
            title: "CRASH PREDICTOR 2026",
            description: isCard ? "Licence à vie — 50 $" : `Mobile Money ${selectedMomoNetwork} — 30 000 F`,
            logo: `${window.location.origin}/assets/crash_hd.jpg`
        },
        callback: async (response) => {
            showPaymentOverlay("Vérification du paiement Flutterwave…");
            checkoutSucceeded = await finalizeFlutterwavePayment(response, { txRef, amount, currency });
            setButtonLoading(payButton, false);
            if (checkoutSucceeded) grantVipAccess();
            else hidePaymentOverlay();
        },
        onclose: () => {
            setButtonLoading(payButton, false);
            if (!checkoutSucceeded && !currentUser?.isSubscribed) {
                hidePaymentOverlay();
            }
        }
    });
}

function isSuccessfulFlutterwaveStatus(status) {
    return ["successful", "completed", "success"].includes(String(status || "").toLowerCase());
}

async function verifyPaymentOnServer(transactionId, txRef) {
    try {
        const response = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ transaction_id: transactionId, tx_ref: txRef })
        });
        if (!response.ok) return null;
        return await response.json();
    } catch {
        return null;
    }
}

async function finalizeFlutterwavePayment(response, expected) {
    const status = response?.status;
    const txRef = response?.tx_ref || expected.txRef;
    const transactionId = response?.transaction_id || response?.id;
    const serverResult = transactionId ? await verifyPaymentOnServer(transactionId, txRef) : null;

    const amountOk = response?.amount == null || Number(response.amount) >= expected.amount;
    const currencyOk = !response?.currency || String(response.currency).toUpperCase() === expected.currency;
    const verified = serverResult?.verified === true || (
        serverResult == null &&
        isSuccessfulFlutterwaveStatus(status) &&
        amountOk &&
        currencyOk
    );

    await recordPayment({
        tx_ref: txRef,
        transaction_id: transactionId ? String(transactionId) : null,
        flw_ref: response?.flw_ref || null,
        email: currentUser.email,
        unique_id: currentUser.uniqueId,
        amount: expected.amount,
        currency: expected.currency,
        network: selectedMomoNetwork,
        status: verified ? "successful" : "failed",
        updated_at: new Date().toISOString()
    });

    if (!verified) {
        showToast("Paiement non confirmé. Aucune licence n’a été activée.", "error");
        return false;
    }
    return true;
}

/* -------------------------------------------------------------------------- */
/* Auth & modales                                                              */
/* -------------------------------------------------------------------------- */

function initAuthSecurity() {
    $("registerForm")?.addEventListener("submit", onRegister);
    $("loginForm")?.addEventListener("submit", onLogin);
    const logout = handleLogout;
    $("logoutBtn")?.addEventListener("click", (event) => { event.stopPropagation(); logout(); });
    $("profileLogoutBtn")?.addEventListener("click", logout);
    $("vipLogoutBtn")?.addEventListener("click", logout);
}

async function onRegister(event) {
    event.preventDefault();
    const submitBtn = $("registerSubmitBtn");
    const name = $("regName").value.trim();
    const email = $("regEmail").value.trim().toLowerCase();
    const password = $("regPassword").value;

    if (name.length < 3) return showToast("Nom requis (3 caractères minimum).", "error");
    if (!isValidEmail(email)) return showToast("Email invalide.", "error");
    if (password.length < 6) return showToast("Mot de passe : 6 caractères minimum.", "error");

    const users = loadUsersDb();
    if (users.some((user) => user.email === email)) {
        return showToast("Cet email existe déjà. Connectez-vous.", "error");
    }

    setButtonLoading(submitBtn, true);
    const newUser = {
        id: Date.now(),
        uniqueId: generateUniqueId(),
        name,
        email,
        phone: "",
        passwordHash: await hashPassword(password),
        isSubscribed: false,
        registeredAt: new Date().toISOString()
    };
    await saveUserSession(newUser);
    subscribeUserRealtime();
    initGlobalViewRouter();
    closeAllModals();
    event.target.reset();
    setButtonLoading(submitBtn, false);
    showToast(`Compte créé. ID : ${newUser.uniqueId}`);
    if (pendingCheckoutAfterAuth) {
        pendingCheckoutAfterAuth = false;
        openCheckout();
    }
}

async function onLogin(event) {
    event.preventDefault();
    const submitBtn = $("loginSubmitBtn");
    const identifier = $("loginEmail").value.trim();
    const password = $("loginPassword").value;
    const email = identifier.toLowerCase();
    const users = loadUsersDb();
    const found = users.find((user) => user.email === email || user.uniqueId === identifier.toUpperCase());

    if (!found) {
        showToast("Compte introuvable. Créez un compte d’abord.", "error");
        return;
    }
    if (!(await passwordMatches(found, password))) {
        showToast("Mot de passe incorrect.", "error");
        return;
    }

    setButtonLoading(submitBtn, true);
    if (found.passwordHash === btoa(password)) {
        found.passwordHash = await hashPassword(password);
    }
    await saveUserSession(found);
    await syncUserFromSupabase();
    subscribeUserRealtime();
    initGlobalViewRouter();
    closeAllModals();
    event.target.reset();
    setButtonLoading(submitBtn, false);
    showToast(`Bienvenue, ${found.name}.`);
    if (pendingCheckoutAfterAuth) {
        pendingCheckoutAfterAuth = false;
        openCheckout();
    }
}

function handleLogout() {
    currentUser = null;
    localStorage.removeItem(CONFIG.sessionKey);
    if (realtimeChannel && supabaseClient) {
        supabaseClient.removeChannel(realtimeChannel);
        realtimeChannel = null;
    }
    stopVipEngine();
    initGlobalViewRouter();
    closeAllModals();
    showToast("Déconnexion effectuée.");
}

function initProfileModal() {
    const openProfile = () => {
        if (!currentUser) return;
        $("profileNameDisplay").textContent = currentUser.name;
        $("profileEmailDisplay").textContent = currentUser.email;
        $("profileUniqueIdDisplay").textContent = currentUser.uniqueId;
        $("profilePhoneInput").value = currentUser.phone || "";
        const badge = $("profileStatusBadge");
        if (currentUser.isSubscribed) {
            badge.className = "status-tag-badge status-active";
            badge.innerHTML = '<i class="fa-solid fa-crown"></i> MEMBRE VIP ACTIF';
            $("btnProfileSubscribe").style.display = "none";
        } else {
            badge.className = "status-tag-badge status-unsubscribed";
            badge.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> NON ABONNÉ';
            $("btnProfileSubscribe").style.display = "block";
        }
        $("profileModal")?.classList.add("active");
    };

    $("userProfileBadge")?.addEventListener("click", openProfile);
    $("userProfileBadge")?.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openProfile();
        }
    });
    $("closeProfileModal")?.addEventListener("click", () => $("profileModal")?.classList.remove("active"));

    $("btnSavePhone")?.addEventListener("click", async () => {
        if (!currentUser) return;
        const phone = $("profilePhoneInput").value.trim();
        if (phone && !isValidPhone(phone)) {
            showToast("Numéro invalide.", "error");
            return;
        }
        currentUser.phone = phone;
        await saveUserSession(currentUser);
        showToast("Téléphone enregistré.");
    });

    $("formUpdatePassword")?.addEventListener("submit", async (event) => {
        event.preventDefault();
        if (!currentUser) return;
        const oldPass = $("profileOldPassword").value;
        const newPass = $("profileNewPassword").value;
        const confirmPass = $("profileConfirmNewPassword").value;
        if (currentUser.passwordHash && !(await passwordMatches(currentUser, oldPass))) {
            showToast("Mot de passe actuel incorrect.", "error");
            return;
        }
        if (newPass.length < 6 || newPass !== confirmPass) {
            showToast("Vérifiez le nouveau mot de passe (6+ caractères).", "error");
            return;
        }
        currentUser.passwordHash = await hashPassword(newPass);
        await saveUserSession(currentUser);
        event.target.reset();
        showToast("Mot de passe mis à jour.");
    });
}

function initModals() {
    $("openLoginBtn")?.addEventListener("click", () => $("loginModal")?.classList.add("active"));
    $("openRegisterBtn")?.addEventListener("click", () => $("registerModal")?.classList.add("active"));
    $("closeLoginModal")?.addEventListener("click", () => $("loginModal")?.classList.remove("active"));
    $("closeRegisterModal")?.addEventListener("click", () => $("registerModal")?.classList.remove("active"));
    $("closeBuyModal")?.addEventListener("click", () => $("buyModal")?.classList.remove("active"));
    $("switchToLogin")?.addEventListener("click", () => {
        $("registerModal")?.classList.remove("active");
        $("loginModal")?.classList.add("active");
    });
    $("switchToRegister")?.addEventListener("click", () => {
        $("loginModal")?.classList.remove("active");
        $("registerModal")?.classList.add("active");
    });
    window.addEventListener("click", (event) => {
        if (event.target.classList?.contains("modal-overlay")) event.target.classList.remove("active");
    });
    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeAllModals();
    });
}

function closeAllModals() {
    document.querySelectorAll(".modal-overlay").forEach((modal) => modal.classList.remove("active"));
}

function showToast(message, type = "success") {
    const container = $("toastContainer");
    if (!container) return;
    const toast = document.createElement("div");
    toast.className = `toast-message ${type === "error" ? "error" : ""}`;
    const icon = type === "error"
        ? '<i class="fa-solid fa-triangle-exclamation" style="color:#ef4444;"></i>'
        : '<i class="fa-solid fa-circle-check" style="color:#10b981;"></i>';
    toast.innerHTML = `${icon} <span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(100%)";
        toast.style.transition = "all 0.3s ease";
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}
