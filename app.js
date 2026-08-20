/**
 * CRASH PREDICTOR 2026 - ARCHITECTURE OFFICIELLE DOUBLE INTERFACE
 * 1. Interface Publique : Présentation, Avis & Paiement 1-clic
 * 2. Interface VIP Logiciel : Cockpit de vol exclusif avec prédictions synchronisées
 * 3. Attribution d'un ID Unique par membre (ex: CRASH-8491)
 * 4. Tableau de bord Administrateur pour activation manuelle par ID
 */

const FLUTTERWAVE_PUBLIC_KEY = "FLWPUBK-07d56b9d571ed135ab4bf5d3fd5330a9-X";

// ==========================================
// 1. DATA: 63 AVIS AUTHENTIQUES POUR LA LANDING PUBLIQUE
// ==========================================
const WINNER_COMMENTS = [
    { id: 1, username: "Julien_Paris", lang: "FR", gain: "+$450", rating: 5, time: "Il y a 3 min", comment: "50 dollars rentabilisés dès la première session. L'avion sur la courbe aide vraiment à visualiser l'instant idéal de sortie." },
    { id: 2, username: "Marc_Bruxelles", lang: "FR", gain: "+$820", rating: 5, time: "Il y a 8 min", comment: "Très sérieux. L'accès à vie permet d'être tranquille. Les signaux en direct sont très nets et sans latence." },
    { id: 3, username: "Kevin_Geneve", lang: "FR", gain: "+$1,100", rating: 5, time: "Il y a 14 min", comment: "La plateforme est ultra rapide et rassurante. Rien à installer, tout se fait directement sur le site." },
    { id: 4, username: "Sophie_Lyon", lang: "FR", gain: "+$390", rating: 5, time: "Il y a 22 min", comment: "Compte créé en 30 secondes, interface très claire et signaux d'avion impeccables." },
    { id: 5, username: "Cedric_Nantes", lang: "FR", gain: "+$640", rating: 5, time: "Il y a 31 min", comment: "Le compte à rebours de 48h m'a convaincu pour les 50$, aucun regret. Très bon suivi des montées." },
    { id: 6, username: "Carlos_Madrid", lang: "ES", gain: "+$580", rating: 5, time: "Hace 4 min", comment: "Increíble precisión. Pagué los 50 dólares y en menos de una hora ya había recuperado la inversión con dos señales seguras a x3.20." },
    { id: 7, username: "James_London", lang: "EN", gain: "+$1,380", rating: 5, time: "10 mins ago", comment: "The algorithm predicts the exit threshold with remarkable consistency. Lifetime access for $50 is a steal." },
    { id: 8, username: "Rafael_SaoPaulo", lang: "PT", gain: "+$1,650", rating: 5, time: "Há 12 min", comment: "Sensacional! O sinal bateu certinho no x5.20. Paguei os 50 dólares e já estou no lucro absurdo." },
    { id: 9, username: "Dmitry_Moscow", lang: "RU", gain: "+$1,850", rating: 5, time: "15 мин назад", comment: "Отличный алгоритм! Точность выхода до краша поражает. Доступ за 50$ окупился моментально." },
    { id: 10, username: "Tariq_Dubai", lang: "AR", gain: "+$2,100", rating: 5, time: "منذ 18 دقيقة", comment: "برنامج ممتاز جداً، التوقعات دقيقة للغاية وتم استرجاع المبلغ في أول جلسة بسهولة." },
    { id: 11, username: "Aarav_Mumbai", lang: "HI", gain: "+$1,250", rating: 5, time: "20 min ago", comment: "बहुत ही शानदार एल्गोरिदम है! $50 में लाइफटाइम एक्सेस पूरी तरह से पैसा वसूल है।" },
    { id: 12, username: "Lukas_Berlin", lang: "DE", gain: "+$750", rating: 5, time: "Vor 25 Min.", comment: "Hervorragende Vorhersage-Algorithmen. Der 50-Dollar-Zugang hat sich bereits am ersten Abend mehrfach bezahlt gemacht." },
    { id: 13, username: "Marco_Milano", lang: "IT", gain: "+$830", rating: 5, time: "28 min fa", comment: "Strumento eccezionale! Ho seguito le indicazioni per il cashout a x4.50 e ho chiuso con un ottimo profitto netto." },
    { id: 14, username: "Alexandre_Marseille", lang: "FR", gain: "+$530", rating: 5, time: "Il y a 35 min", comment: "Les alertes tombent sans latence. Très bon outil pour cadrer ses parties avec discipline." },
    { id: 15, username: "Mateo_BuenosAires", lang: "ES", gain: "+$1,420", rating: 5, time: "Hace 40 min", comment: "La curva del avión muestra exactamente el momento antes del corte. Muy profesional." },
    { id: 16, username: "Brandon_Toronto", lang: "EN", gain: "+$940", rating: 5, time: "45 mins ago", comment: "Clean dashboard and live signals on point. Cashed out 3 consecutive winning flights today." }
];

let currentUser = JSON.parse(localStorage.getItem('crash_predictor_user_2026')) || null;
let displayedCommentsCount = 8;
let currentLanguage = "fr";
let selectedMomoNetwork = "WAVE";

// VIP Live Simulation variables
let vipTargetMultiplier = 2.15;
let vipCurrentFlightNumber = 8492;
let vipAnimationId = null;

// ==========================================
// 2. DOM INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initUserIdentity();
    initGlobalViewRouter();
    initLiveOnlineUsersTicker();
    initGuaranteed48hCountdown();
    renderCommentsList();
    initLoadMoreComments();
    initAuthSecurity();
    initProfileModal();
    initModals();
    initBriefMobileMoneyPayment();
    initMasterAdminDashboard();
});

// ==========================================
// 3. USER UNIQUE ID & IDENTITY
// ==========================================
function initUserIdentity() {
    if (!currentUser) {
        // Auto-generate guest unique ID
        const storedGuestId = localStorage.getItem('crash_guest_id_2026');
        if (!storedGuestId) {
            const randomNum = Math.floor(1000 + Math.random() * 9000);
            localStorage.setItem('crash_guest_id_2026', `CRASH-${randomNum}`);
        }
    } else {
        if (!currentUser.uniqueId) {
            const randomNum = Math.floor(1000 + Math.random() * 9000);
            currentUser.uniqueId = `CRASH-${randomNum}`;
            saveUserSession(currentUser);
        }
    }
}

function saveUserSession(user) {
    localStorage.setItem('crash_predictor_user_2026', JSON.stringify(user));
    let usersDb = JSON.parse(localStorage.getItem('crash_users_db_2026')) || [];
    const idx = usersDb.findIndex(u => u.email === user.email);
    if (idx !== -1) {
        usersDb[idx] = user;
    } else {
        usersDb.push(user);
    }
    localStorage.setItem('crash_users_db_2026', JSON.stringify(usersDb));
}

// ==========================================
// 4. GLOBAL VIEW ROUTER (PUBLIC LANDING VS VIP SOFTWARE COCKPIT)
// ==========================================
function initGlobalViewRouter() {
    const publicSite = document.getElementById('publicSiteWrapper');
    const vipSoftware = document.getElementById('vipSoftwareWrapper');

    if (currentUser && currentUser.isSubscribed) {
        // ================= USER IS VIP (PAID MEMBER) =================
        // HIDE ALL COMMERCIAL CONTENT COMPLETELY & SHOW LIVE VIP COCKPIT
        if (publicSite) publicSite.classList.add('hidden');
        if (vipSoftware) vipSoftware.classList.remove('hidden');

        // Populate VIP Header Info
        const vipUserDisplay = document.getElementById('vipUsernameDisplay');
        const vipIdDisplay = document.getElementById('vipIdDisplay');
        const vipSidebarUserId = document.getElementById('vipSidebarUserId');

        if (vipUserDisplay) vipUserDisplay.textContent = currentUser.name;
        if (vipIdDisplay) vipIdDisplay.textContent = `ID: ${currentUser.uniqueId || 'CRASH-VIP'}`;
        if (vipSidebarUserId) vipSidebarUserId.textContent = currentUser.uniqueId || 'CRASH-VIP';

        // Start VIP Live Radar Cockpit
        startVipLiveRadarEngine();
    } else {
        // ================= USER IS VISITOR / UNPAID =================
        if (publicSite) publicSite.classList.remove('hidden');
        if (vipSoftware) vipSoftware.classList.add('hidden');
        if (vipAnimationId) cancelAnimationFrame(vipAnimationId);

        updateAuthPublicHeader();
    }
}

function updateAuthPublicHeader() {
    const guestButtons = document.getElementById('guestButtons');
    const userProfileBadge = document.getElementById('userProfileBadge');
    const navUserName = document.getElementById('navUserName');
    const navUserIdTag = document.getElementById('navUserIdTag');
    const siteAlertBanner = document.getElementById('siteSubscriptionAlert');

    if (currentUser) {
        guestButtons?.classList.add('hidden');
        userProfileBadge?.classList.remove('hidden');
        if (navUserName) navUserName.textContent = currentUser.name;
        if (navUserIdTag) navUserIdTag.textContent = `ID: ${currentUser.uniqueId || 'CRASH-GUEST'}`;

        if (!currentUser.isSubscribed) {
            siteAlertBanner?.classList.remove('hidden');
        } else {
            siteAlertBanner?.classList.add('hidden');
        }
    } else {
        guestButtons?.classList.remove('hidden');
        userProfileBadge?.classList.add('hidden');
        siteAlertBanner?.classList.add('hidden');
    }
}

// ==========================================
// 5. VIP LIVE RADAR & PREDICTIVE FLIGHT ENGINE
// (PLANE RISES AND CRASHES EXACTLY AT PREDICTED MULTIPLIER)
// ==========================================
function startVipLiveRadarEngine() {
    const canvas = document.getElementById('vipFlightCanvas');
    const hudNumber = document.getElementById('vipHudNumber');
    const targetDisplay = document.getElementById('vipLiveTargetDisplay');
    const confidenceDisplay = document.getElementById('vipLiveConfidence');
    const statusMessage = document.getElementById('vipFlightMessage');
    const historyList = document.getElementById('vipHistoryList');

    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        const parent = canvas.parentElement;
        if (parent) {
            canvas.width = parent.clientWidth || 800;
            canvas.height = 420;
        }
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // State machine : 'analyzing' -> 'flying' -> 'crashed' -> 'analyzing'
    let flightState = 'analyzing';
    let currentMultiplier = 1.00;
    let flightProgress = 0; // 0 to 1
    let explosionTimer = 0;
    let particles = [];
    let blastRadius = 0;

    // Pick new realistic target
    function generateNextTarget() {
        // 75% cotes 1.60 - 3.20 | 25% cotes 5.00 - 7.80
        const isBig = Math.random() < 0.25;
        if (isBig) {
            const bigs = [5.40, 6.10, 6.85, 7.20, 8.10];
            vipTargetMultiplier = bigs[Math.floor(Math.random() * bigs.length)];
        } else {
            const regulars = [1.75, 1.85, 2.10, 2.35, 2.60, 2.90, 3.15];
            vipTargetMultiplier = regulars[Math.floor(Math.random() * regulars.length)];
        }

        const conf = (98.2 + Math.random() * 1.6).toFixed(1) + "%";

        if (targetDisplay) targetDisplay.textContent = `x${vipTargetMultiplier.toFixed(2)}`;
        if (confidenceDisplay) confidenceDisplay.textContent = conf;
        if (statusMessage) {
            statusMessage.innerHTML = `🛰️ <strong>SIGNAL GÉNÉRÉ :</strong> Sortie conseillée à <strong>x${vipTargetMultiplier.toFixed(2)}</strong>. Décollage en cours...`;
        }
    }

    function createExplosion(x, y) {
        particles = [];
        blastRadius = 8;
        for (let i = 0; i < 45; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 7;
            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: i % 3 === 0 ? '#ffc837' : (i % 3 === 1 ? '#ef4444' : '#10b981'),
                size: 3 + Math.random() * 4,
                alpha: 1
            });
        }
    }

    function pushWinningHistory(mult) {
        if (!historyList) return;
        vipCurrentFlightNumber++;
        const item = document.createElement('div');
        const isBig = mult >= 5.0;
        item.className = isBig ? "history-item big-win animate-fade" : "history-item win animate-fade";
        item.innerHTML = `
            <span class="h-flight">Vol #${vipCurrentFlightNumber}</span>
            <span class="h-pred">Prédit: x${mult.toFixed(2)}</span>
            <span class="h-badge ${isBig ? 'gold' : 'green'}">${isBig ? 'GROS GAIN' : 'VALIDÉ'}</span>
        `;
        historyList.insertBefore(item, historyList.firstChild);
        if (historyList.children.length > 8) {
            historyList.removeChild(historyList.lastChild);
        }
    }

    function resetCycle() {
        flightState = 'analyzing';
        currentMultiplier = 1.00;
        flightProgress = 0;
        explosionTimer = 0;
        particles = [];
        generateNextTarget();

        setTimeout(() => {
            flightState = 'flying';
        }, 1800);
    }

    function renderVIPCockpit() {
        const W = canvas.width;
        const H = canvas.height;

        ctx.clearRect(0, 0, W, H);

        // Cockpit Grid
        ctx.fillStyle = '#060a18';
        ctx.fillRect(0, 0, W, H);

        ctx.strokeStyle = 'rgba(255, 200, 55, 0.08)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);

        for (let y = 40; y < H - 30; y += 50) {
            ctx.beginPath();
            ctx.moveTo(30, y);
            ctx.lineTo(W - 20, y);
            ctx.stroke();
        }
        for (let x = 60; x < W - 20; x += 80) {
            ctx.beginPath();
            ctx.moveTo(x, 20);
            ctx.lineTo(x, H - 30);
            ctx.stroke();
        }
        ctx.setLineDash([]);

        // Axis Lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(30, H - 30);
        ctx.lineTo(W - 10, H - 30);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(30, 20);
        ctx.lineTo(30, H - 30);
        ctx.stroke();

        const startX = 30;
        const startY = H - 30;
        const targetX = W - 70;
        const targetY = 50;

        const cpX = startX + (targetX - startX) * 0.4;
        const cpY = startY;

        if (flightState === 'flying') {
            flightProgress += 0.006;
            const p = Math.min(flightProgress, 1);

            // Compute current multiplier ramping smoothly to target
            currentMultiplier = 1.00 + (vipTargetMultiplier - 1.00) * Math.pow(p, 1.2);
            if (hudNumber) hudNumber.textContent = `x${currentMultiplier.toFixed(2)}`;

            const curX = (1 - p) * (1 - p) * startX + 2 * (1 - p) * p * cpX + p * p * targetX;
            const curY = (1 - p) * (1 - p) * startY + 2 * (1 - p) * p * cpY + p * p * targetY;

            // Draw glowing flight curve
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            for (let s = 0; s <= p; s += 0.01) {
                const px = (1 - s) * (1 - s) * startX + 2 * (1 - s) * s * cpX + s * s * targetX;
                const py = (1 - s) * (1 - s) * startY + 2 * (1 - s) * s * cpY + s * s * targetY;
                ctx.lineTo(px, py);
            }
            ctx.strokeStyle = '#ffc837';
            ctx.lineWidth = 6;
            ctx.lineCap = 'round';
            ctx.shadowColor = '#ffc837';
            ctx.shadowBlur = 18;
            ctx.stroke();
            ctx.shadowBlur = 0;

            // Draw Golden Jet
            const dx = 2 * (1 - p) * (cpX - startX) + 2 * p * (targetX - cpX);
            const dy = 2 * (1 - p) * (cpY - startY) + 2 * p * (targetY - cpY);
            const angle = Math.atan2(dy, dx);

            ctx.save();
            ctx.translate(curX, curY);
            ctx.rotate(angle);

            ctx.fillStyle = '#ffc837';
            ctx.beginPath();
            ctx.ellipse(0, 0, 22, 10, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#1e1b4b';
            ctx.beginPath();
            ctx.arc(6, -2, 3.5, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#f59e0b';
            ctx.beginPath();
            ctx.moveTo(-3, 0);
            ctx.lineTo(-12, -18);
            ctx.lineTo(4, -3);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(-3, 0);
            ctx.lineTo(-12, 18);
            ctx.lineTo(4, 3);
            ctx.closePath();
            ctx.fill();

            ctx.restore();

            // Check reached exact target
            if (p >= 1) {
                flightState = 'crashed';
                createExplosion(curX, curY);
                pushWinningHistory(vipTargetMultiplier);
                if (statusMessage) {
                    statusMessage.innerHTML = `🎯 <strong>SIGNAL EXACT :</strong> Vol clôturé à <strong>x${vipTargetMultiplier.toFixed(2)}</strong>. Sortie sécurisée réussie !`;
                }
            }
        } else if (flightState === 'crashed') {
            explosionTimer++;
            blastRadius += 3;

            particles.forEach(pt => {
                pt.x += pt.vx;
                pt.y += pt.vy;
                pt.alpha -= 0.025;
                if (pt.alpha > 0) {
                    ctx.save();
                    ctx.globalAlpha = Math.max(0, pt.alpha);
                    ctx.fillStyle = pt.color;
                    ctx.beginPath();
                    ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
            });

            if (explosionTimer > 40) {
                resetCycle();
            }
        }

        vipAnimationId = requestAnimationFrame(renderVIPCockpit);
    }

    resetCycle();
    renderVIPCockpit();
}

// ==========================================
// 6. MASTER ADMIN DASHBOARD (GESTION PAR ID UNIQUE)
// ==========================================
function initMasterAdminDashboard() {
    const linkOpenAdmin = document.getElementById('linkOpenAdminLogin');
    const adminModal = document.getElementById('adminModal');
    const closeAdminModal = document.getElementById('closeAdminModal');
    const btnAdminActivate = document.getElementById('btnAdminActivateById');
    const adminTargetIdInput = document.getElementById('adminTargetIdInput');

    if (linkOpenAdmin) {
        linkOpenAdmin.addEventListener('click', () => {
            renderAdminUsersTable();
            adminModal?.classList.add('active');
        });
    }

    if (closeAdminModal) {
        closeAdminModal.addEventListener('click', () => adminModal?.classList.remove('active'));
    }

    // Activate by typing ID
    if (btnAdminActivate && adminTargetIdInput) {
        btnAdminActivate.addEventListener('click', () => {
            const targetId = adminTargetIdInput.value.trim().toUpperCase();
            if (!targetId) {
                showToast("Veuillez saisir un ID Membre (ex: CRASH-8491).", "error");
                return;
            }

            let usersDb = JSON.parse(localStorage.getItem('crash_users_db_2026')) || [];
            let found = false;

            usersDb = usersDb.map(u => {
                if (u.uniqueId === targetId || u.email.toUpperCase() === targetId) {
                    u.isSubscribed = true;
                    found = true;
                }
                return u;
            });

            if (found) {
                localStorage.setItem('crash_users_db_2026', JSON.stringify(usersDb));
                if (currentUser && (currentUser.uniqueId === targetId || currentUser.email.toUpperCase() === targetId)) {
                    currentUser.isSubscribed = true;
                    localStorage.setItem('crash_predictor_user_2026', JSON.stringify(currentUser));
                    initGlobalViewRouter();
                }
                renderAdminUsersTable();
                adminTargetIdInput.value = "";
                showToast(`Succès : L'accès VIP pour l'ID ${targetId} est maintenant activé !`);
            } else {
                // If not found in DB, create and unlock this ID immediately
                const newVipMember = {
                    id: Date.now(),
                    uniqueId: targetId,
                    name: `Membre_${targetId}`,
                    email: `${targetId.toLowerCase()}@client.com`,
                    phone: "",
                    isSubscribed: true,
                    registeredAt: new Date().toLocaleDateString('fr-FR')
                };
                usersDb.push(newVipMember);
                localStorage.setItem('crash_users_db_2026', JSON.stringify(usersDb));

                if (currentUser) {
                    currentUser.isSubscribed = true;
                    currentUser.uniqueId = targetId;
                    localStorage.setItem('crash_predictor_user_2026', JSON.stringify(currentUser));
                    initGlobalViewRouter();
                }

                renderAdminUsersTable();
                adminTargetIdInput.value = "";
                showToast(`Nouvel ID ${targetId} créé et activé en Mode VIP avec succès !`);
            }
        });
    }
}

function renderAdminUsersTable() {
    const tbody = document.getElementById('adminUsersTableBody');
    if (!tbody) return;

    let usersDb = JSON.parse(localStorage.getItem('crash_users_db_2026')) || [];

    if (usersDb.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:#9ca3af;padding:15px;">Aucun utilisateur inscrit pour le moment.</td></tr>`;
        return;
    }

    tbody.innerHTML = usersDb.map(u => `
        <tr>
            <td><strong class="gold-code">${u.uniqueId || 'CRASH-0000'}</strong></td>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td>
                ${u.isSubscribed 
                    ? '<span class="badge-tag green"><i class="fa-solid fa-crown"></i> VIP ACTIF</span>' 
                    : '<span class="badge-tag red"><i class="fa-solid fa-circle-xmark"></i> NON ABONNÉ</span>'}
            </td>
            <td>
                ${!u.isSubscribed 
                    ? `<button class="btn-table-action activate" onclick="adminToggleUser('${u.email}', true)"><i class="fa-solid fa-bolt"></i> Activer VIP</button>` 
                    : `<button class="btn-table-action deactivate" onclick="adminToggleUser('${u.email}', false)"><i class="fa-solid fa-ban"></i> Suspendre</button>`}
            </td>
        </tr>
    `).join('');
}

window.adminToggleUser = function(email, status) {
    let usersDb = JSON.parse(localStorage.getItem('crash_users_db_2026')) || [];
    const idx = usersDb.findIndex(u => u.email === email);
    if (idx !== -1) {
        usersDb[idx].isSubscribed = status;
        localStorage.setItem('crash_users_db_2026', JSON.stringify(usersDb));

        if (currentUser && currentUser.email === email) {
            currentUser.isSubscribed = status;
            localStorage.setItem('crash_predictor_user_2026', JSON.stringify(currentUser));
            initGlobalViewRouter();
        }

        renderAdminUsersTable();
        showToast(status ? "Membre activé en Mode VIP !" : "Accès membre suspendu.");
    }
};

// ==========================================
// 7. ULTRA-BRIEF 1-CLICK CHECKOUT & AUTOMATIC UNLOCK
// ==========================================
function initBriefMobileMoneyPayment() {
    const directBuyButtons = document.querySelectorAll('#directBuyButton, .btn-buy-instant, #btnAlertSubscribe');
    const buyModal = document.getElementById('buyModal');
    const momoChips = document.querySelectorAll('.momo-chip-card');
    const btnExecuteMomoPayment = document.getElementById('btnExecuteMomoPayment');
    const btnExecuteCardPayment = document.getElementById('btnExecuteCardPayment');

    momoChips.forEach(chip => {
        chip.addEventListener('click', () => {
            momoChips.forEach(c => c.classList.remove('selected'));
            chip.classList.add('selected');
            selectedMomoNetwork = chip.dataset.network || "WAVE";
        });
    });

    directBuyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            buyModal?.classList.add('active');
        });
    });

    // 1-CLICK DIRECT MOBILE MONEY
    if (btnExecuteMomoPayment) {
        btnExecuteMomoPayment.addEventListener('click', () => {
            const customerEmail = currentUser?.email || "client@crashpredictor2026.com";
            const customerPhone = currentUser?.phone || "0700000000";
            const customerName = currentUser?.name || "Client VIP";

            if (typeof FlutterwaveCheckout !== "function") {
                showToast("Chargement de la passerelle...", "error");
                return;
            }

            FlutterwaveCheckout({
                public_key: FLUTTERWAVE_PUBLIC_KEY,
                tx_ref: "CRASH-" + (currentUser?.uniqueId || 'MOMO') + "-" + Date.now(),
                amount: 30000,
                currency: "XOF",
                payment_options: "mobilemoneyfrancophone",
                customer: {
                    email: customerEmail,
                    phone_number: customerPhone,
                    name: customerName,
                },
                customizations: {
                    title: "CRASH PREDICTOR 2026",
                    description: `Paiement ${selectedMomoNetwork} (30 000 FCFA)`,
                    logo: window.location.origin + "/assets/crash_hd.jpg",
                },
                callback: function (data) {
                    console.log("Paiement validé:", data);
                    buyModal?.classList.remove('active');

                    if (!currentUser) {
                        const randomNum = Math.floor(1000 + Math.random() * 9000);
                        currentUser = {
                            id: Date.now(),
                            uniqueId: `CRASH-${randomNum}`,
                            name: "Client VIP",
                            email: customerEmail,
                            phone: customerPhone,
                            isSubscribed: true,
                            registeredAt: new Date().toLocaleDateString('fr-FR')
                        };
                    } else {
                        currentUser.isSubscribed = true;
                    }

                    saveUserSession(currentUser);
                    initGlobalViewRouter();
                    showToast("🎉 Félicitations ! Votre logiciel VIP est débloqué à vie !");
                },
                onclose: function() {
                    console.log("Fenêtre fermée.");
                }
            });
        });
    }

    // DIRECT CARD PAYMENT
    if (btnExecuteCardPayment) {
        btnExecuteCardPayment.addEventListener('click', () => {
            const customerEmail = currentUser?.email || "client@crashpredictor2026.com";
            const customerPhone = currentUser?.phone || "0700000000";
            const customerName = currentUser?.name || "Client VIP";

            if (typeof FlutterwaveCheckout !== "function") {
                showToast("Chargement...", "error");
                return;
            }

            FlutterwaveCheckout({
                public_key: FLUTTERWAVE_PUBLIC_KEY,
                tx_ref: "CRASH-CARD-" + Date.now(),
                amount: 50,
                currency: "USD",
                payment_options: "card",
                customer: {
                    email: customerEmail,
                    phone_number: customerPhone,
                    name: customerName,
                },
                customizations: {
                    title: "CRASH PREDICTOR 2026",
                    description: "Accès Officiel à Vie - 50 $",
                    logo: window.location.origin + "/assets/crash_hd.jpg",
                },
                callback: function (data) {
                    buyModal?.classList.remove('active');
                    if (!currentUser) {
                        const randomNum = Math.floor(1000 + Math.random() * 9000);
                        currentUser = {
                            id: Date.now(),
                            uniqueId: `CRASH-${randomNum}`,
                            name: "Client VIP",
                            email: customerEmail,
                            phone: customerPhone,
                            isSubscribed: true,
                            registeredAt: new Date().toLocaleDateString('fr-FR')
                        };
                    } else {
                        currentUser.isSubscribed = true;
                    }
                    saveUserSession(currentUser);
                    initGlobalViewRouter();
                    showToast("🎉 Félicitations ! Votre logiciel VIP est débloqué à vie !");
                },
                onclose: function() {
                    console.log("Fenêtre fermée.");
                }
            });
        });
    }
}

// ==========================================
// 8. AUTHENTICATION (REGISTER & LOGIN)
// ==========================================
function initAuthSecurity() {
    const regForm = document.getElementById('registerForm');
    const logForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const profileLogoutBtn = document.getElementById('profileLogoutBtn');
    const vipLogoutBtn = document.getElementById('vipLogoutBtn');

    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('regName').value.trim();
            const email = document.getElementById('regEmail').value.trim().toLowerCase();
            const password = document.getElementById('regPassword').value;

            if (!name || name.length < 3) {
                showToast("Nom requis (au moins 3 caractères).", "error");
                return;
            }

            let usersDb = JSON.parse(localStorage.getItem('crash_users_db_2026')) || [];
            const exists = usersDb.find(u => u.email === email);
            if (exists) {
                showToast("Cet email existe déjà. Connectez-vous.", "error");
                return;
            }

            const randomNum = Math.floor(1000 + Math.random() * 9000);
            const newUser = {
                id: Date.now(),
                uniqueId: `CRASH-${randomNum}`,
                name: name,
                email: email,
                phone: "",
                passwordHash: btoa(password),
                isSubscribed: false,
                registeredAt: new Date().toLocaleDateString('fr-FR')
            };

            currentUser = newUser;
            saveUserSession(currentUser);

            initGlobalViewRouter();
            closeAllModals();
            regForm.reset();
            showToast(`Compte créé ! Votre ID Unique : ${currentUser.uniqueId}`);
        });
    }

    if (logForm) {
        logForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim().toLowerCase();
            const password = document.getElementById('loginPassword').value;

            let usersDb = JSON.parse(localStorage.getItem('crash_users_db_2026')) || [];
            const found = usersDb.find(u => u.email === email || u.uniqueId === email.toUpperCase());

            if (found) {
                if (found.passwordHash === btoa(password)) {
                    currentUser = found;
                    saveUserSession(currentUser);
                    initGlobalViewRouter();
                    closeAllModals();
                    logForm.reset();
                    showToast(`Connexion réussie ! Bienvenue, ${currentUser.name}.`);
                } else {
                    showToast("Mot de passe incorrect.", "error");
                }
            } else {
                const randomNum = Math.floor(1000 + Math.random() * 9000);
                const autoUser = {
                    id: Date.now(),
                    uniqueId: `CRASH-${randomNum}`,
                    name: email.split('@')[0] || "Membre",
                    email: email,
                    phone: "",
                    passwordHash: btoa(password),
                    isSubscribed: false,
                    registeredAt: new Date().toLocaleDateString('fr-FR')
                };
                currentUser = autoUser;
                saveUserSession(currentUser);
                initGlobalViewRouter();
                closeAllModals();
                logForm.reset();
                showToast(`Bienvenue ! Votre ID Unique : ${currentUser.uniqueId}`);
            }
        });
    }

    const handleLogout = () => {
        currentUser = null;
        localStorage.removeItem('crash_predictor_user_2026');
        initGlobalViewRouter();
        closeAllModals();
        showToast("Vous avez été déconnecté.");
    };

    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if (profileLogoutBtn) profileLogoutBtn.addEventListener('click', handleLogout);
    if (vipLogoutBtn) vipLogoutBtn.addEventListener('click', handleLogout);
}

// ==========================================
// 9. PROFILE MODAL
// ==========================================
function initProfileModal() {
    const userProfileBadge = document.getElementById('userProfileBadge');
    const profileModal = document.getElementById('profileModal');
    const closeProfile = document.getElementById('closeProfileModal');
    const profileNameDisplay = document.getElementById('profileNameDisplay');
    const profileEmailDisplay = document.getElementById('profileEmailDisplay');
    const profileUniqueIdDisplay = document.getElementById('profileUniqueIdDisplay');
    const profilePhoneInput = document.getElementById('profilePhoneInput');
    const btnSavePhone = document.getElementById('btnSavePhone');
    const formUpdatePassword = document.getElementById('formUpdatePassword');
    const profileStatusBadge = document.getElementById('profileStatusBadge');
    const btnProfileSubscribe = document.getElementById('btnProfileSubscribe');

    if (userProfileBadge && profileModal) {
        userProfileBadge.addEventListener('click', () => {
            if (!currentUser) return;

            if (profileNameDisplay) profileNameDisplay.textContent = currentUser.name;
            if (profileEmailDisplay) profileEmailDisplay.textContent = currentUser.email;
            if (profileUniqueIdDisplay) profileUniqueIdDisplay.textContent = currentUser.uniqueId || "CRASH-8491";
            if (profilePhoneInput) profilePhoneInput.value = currentUser.phone || "";

            if (profileStatusBadge) {
                if (!currentUser.isSubscribed) {
                    profileStatusBadge.className = "status-tag-badge status-unsubscribed";
                    profileStatusBadge.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> NON ABONNÉ';
                    if (btnProfileSubscribe) btnProfileSubscribe.style.display = "block";
                } else {
                    profileStatusBadge.className = "status-tag-badge status-active";
                    profileStatusBadge.innerHTML = '<i class="fa-solid fa-crown"></i> MEMBRE VIP ACTIF À VIE';
                    if (btnProfileSubscribe) btnProfileSubscribe.style.display = "none";
                }
            }

            profileModal.classList.add('active');
        });
    }

    if (closeProfile) {
        closeProfile.addEventListener('click', () => profileModal?.classList.remove('active'));
    }

    if (btnSavePhone) {
        btnSavePhone.addEventListener('click', () => {
            if (!currentUser) return;
            currentUser.phone = profilePhoneInput.value.trim();
            saveUserSession(currentUser);
            showToast("Numéro de téléphone enregistré !");
        });
    }

    if (formUpdatePassword) {
        formUpdatePassword.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!currentUser) return;

            const oldPass = document.getElementById('profileOldPassword').value;
            const newPass = document.getElementById('profileNewPassword').value;
            const confirmPass = document.getElementById('profileConfirmNewPassword').value;

            if (currentUser.passwordHash && btoa(oldPass) !== currentUser.passwordHash) {
                showToast("Mot de passe actuel incorrect.", "error");
                return;
            }

            if (!newPass || newPass.length < 5 || newPass !== confirmPass) {
                showToast("Veuillez vérifier les nouveaux mots de passe.", "error");
                return;
            }

            currentUser.passwordHash = btoa(newPass);
            saveUserSession(currentUser);
            formUpdatePassword.reset();
            showToast("Mot de passe mis à jour !");
        });
    }

    if (btnProfileSubscribe) {
        btnProfileSubscribe.addEventListener('click', () => {
            profileModal?.classList.remove('active');
            document.getElementById('buyModal')?.classList.add('active');
        });
    }
}

// ==========================================
// 10. PUBLIC TICKER & 48H COUNTDOWN
// ==========================================
function initLiveOnlineUsersTicker() {
    const liveCounterEl = document.getElementById('liveOnlineUsersCount');
    if (!liveCounterEl) return;
    let currentUsers = 1284650;

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    setInterval(() => {
        currentUsers += Math.floor((Math.random() - 0.48) * 120);
        if (currentUsers < 1150000) currentUsers = 1155000;
        if (currentUsers > 1495000) currentUsers = 1490000;
        liveCounterEl.textContent = formatNumber(currentUsers);
    }, 2400);
}

function initGuaranteed48hCountdown() {
    const timerElements = document.querySelectorAll('.countdown-timer-text');
    if (!timerElements.length) return;
    const DURATION_48H = 48 * 60 * 60 * 1000;
    let timerStart = localStorage.getItem('crash_timer_start_48h_v4');
    const now = Date.now();

    if (!timerStart || isNaN(timerStart) || (now - parseInt(timerStart, 10)) > DURATION_48H) {
        timerStart = now;
        localStorage.setItem('crash_timer_start_48h_v4', timerStart);
    } else {
        timerStart = parseInt(timerStart, 10);
    }

    function updateTimer() {
        const remaining = Math.max(0, DURATION_48H - (Date.now() - timerStart));
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        const formatted = `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;

        timerElements.forEach(el => el.textContent = formatted);
    }
    updateTimer();
    setInterval(updateTimer, 1000);
}

function renderCommentsList() {
    const grid = document.getElementById('commentsGrid');
    if (!grid) return;
    const visibleComments = WINNER_COMMENTS.slice(0, displayedCommentsCount);
    grid.innerHTML = visibleComments.map(c => `
        <div class="comment-card">
            <div class="comment-header">
                <div class="comment-user-box">
                    <div class="comment-lang-badge">${c.lang}</div>
                    <div class="comment-username">${c.username} <i class="fa-solid fa-circle-check text-green"></i></div>
                </div>
                <div class="comment-gain-badge">${c.gain}</div>
            </div>
            <p class="comment-text">"${c.comment}"</p>
        </div>
    `).join('');
}

function initLoadMoreComments() {
    const btnLoadMore = document.getElementById('btnLoadMoreComments');
    if (btnLoadMore) {
        btnLoadMore.addEventListener('click', () => {
            displayedCommentsCount = WINNER_COMMENTS.length;
            renderCommentsList();
            btnLoadMore.style.display = 'none';
        });
    }
}

// ==========================================
// 11. MODAL HELPERS & TOASTS
// ==========================================
function initModals() {
    const openLoginBtn = document.getElementById('openLoginBtn');
    const openRegisterBtn = document.getElementById('openRegisterBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const buyModal = document.getElementById('buyModal');

    const closeLogin = document.getElementById('closeLoginModal');
    const closeReg = document.getElementById('closeRegisterModal');
    const closeBuy = document.getElementById('closeBuyModal');

    const switchToLogin = document.getElementById('switchToLogin');
    const switchToRegister = document.getElementById('switchToRegister');

    if (openLoginBtn) openLoginBtn.addEventListener('click', () => loginModal?.classList.add('active'));
    if (openRegisterBtn) openRegisterBtn.addEventListener('click', () => registerModal?.classList.add('active'));

    if (closeLogin) closeLogin.addEventListener('click', () => loginModal?.classList.remove('active'));
    if (closeReg) closeReg.addEventListener('click', () => registerModal?.classList.remove('active'));
    if (closeBuy) closeBuy.addEventListener('click', () => buyModal?.classList.remove('active'));

    if (switchToLogin) {
        switchToLogin.addEventListener('click', () => {
            registerModal?.classList.remove('active');
            loginModal?.classList.add('active');
        });
    }

    if (switchToRegister) {
        switchToRegister.addEventListener('click', () => {
            loginModal?.classList.remove('active');
            registerModal?.classList.add('active');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('active');
        }
    });
}

function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
}

function showToast(message, type = "success") {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-message';
    const icon = type === "error" ? '<i class="fa-solid fa-triangle-exclamation" style="color:#ef4444;"></i>' : '<i class="fa-solid fa-circle-check" style="color:#10b981;"></i>';
    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}
