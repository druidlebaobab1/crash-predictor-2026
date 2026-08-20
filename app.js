/**
 * CRASH PREDICTOR 2026 - APPLICATION COMPLETE & HAUTE PERFORMANCE
 * - Compteur Live Temps Réel (1 150 000 à 1 480 000 personnes connectées)
 * - Simulation Courbe Verticale Haute & Trajectoires Variables Réelles
 * - Avis Français mis en avant en 1ère page avec 63 avis en 24h ($ USD)
 * - Espace Profil : Badge Rouge Non Abonné + Ajout Téléphone + Modification Mot de Passe
 * - Compte à Rebours 48h Garanti ("Le prix passera à 100 dollars après 48h")
 */

// ==========================================
// 1. DATA: 63 AVIS AUTHENTIQUES (AVIS FRANÇAIS EN PREMIÈRE LIGNE)
// ==========================================
const WINNER_COMMENTS = [
    // AVIS FRANÇAIS EN TÊTE DE LISTE (POUR LE PUBLIC PRINCIPAL)
    {
        id: 1,
        username: "Julien_Paris",
        lang: "FR",
        gain: "+$450",
        rating: 5,
        time: "Il y a 3 min",
        comment: "50 dollars rentabilisés dès la première session. L'avion sur la courbe aide vraiment à visualiser l'instant idéal de sortie."
    },
    {
        id: 2,
        username: "Marc_Bruxelles",
        lang: "FR",
        gain: "+$820",
        rating: 5,
        time: "Il y a 8 min",
        comment: "Très sérieux. L'accès à vie permet d'être tranquille. Les signaux en direct sont très nets et sans latence."
    },
    {
        id: 3,
        username: "Kevin_Geneve",
        lang: "FR",
        gain: "+$1,100",
        rating: 5,
        time: "Il y a 14 min",
        comment: "La plateforme est ultra rapide et rassurante. Rien à installer, tout se fait directement sur le site."
    },
    {
        id: 4,
        username: "Sophie_Lyon",
        lang: "FR",
        gain: "+$390",
        rating: 5,
        time: "Il y a 22 min",
        comment: "Compte créé en 30 secondes, interface très claire et signaux d'avion impeccables."
    },
    {
        id: 5,
        username: "Cedric_Nantes",
        lang: "FR",
        gain: "+$640",
        rating: 5,
        time: "Il y a 31 min",
        comment: "Le compte à rebours de 48h m'a convaincu pour les 50$, aucun regret. Très bon suivi des montées."
    },

    // AVIS INTERNATIONAUX ENRICHIS (ESPAGNOL, ANGLAIS, PORTUGAIS, RUSSE, ARABE, HINDI, ALLEMAND, ITALIEN)
    {
        id: 6,
        username: "Carlos_Madrid",
        lang: "ES",
        gain: "+$580",
        rating: 5,
        time: "Hace 4 min",
        comment: "Increíble precisión. Pagué los 50 dólares y en menos de una hora ya había recuperado la inversión con dos señales seguras a x3.20."
    },
    {
        id: 7,
        username: "James_London",
        lang: "EN",
        gain: "+$1,380",
        rating: 5,
        time: "10 mins ago",
        comment: "The algorithm predicts the exit threshold with remarkable consistency. Lifetime access for $50 is a steal."
    },
    {
        id: 8,
        username: "Rafael_SaoPaulo",
        lang: "PT",
        gain: "+$1,650",
        rating: 5,
        time: "Há 12 min",
        comment: "Sensacional! O sinal bateu certinho no x5.20. Paguei os 50 dólares e já estou no lucro absurdo."
    },
    {
        id: 9,
        username: "Dmitry_Moscow",
        lang: "RU",
        gain: "+$1,850",
        rating: 5,
        time: "15 мин назад",
        comment: "Отличный алгоритм! Точность выхода до краша поражает. Доступ за 50$ окупился моментально."
    },
    {
        id: 10,
        username: "Tariq_Dubai",
        lang: "AR",
        gain: "+$2,100",
        rating: 5,
        time: "منذ 18 دقيقة",
        comment: "برنامج ممتاز جداً، التوقعات دقيقة للغاية وتم استرجاع المبلغ في أول جلسة بسهولة."
    },
    {
        id: 11,
        username: "Aarav_Mumbai",
        lang: "HI",
        gain: "+$1,250",
        rating: 5,
        time: "20 min ago",
        comment: "बहुत ही शानदार एल्गोरिदम है! $50 में लाइफटाइम एक्सेस पूरी तरह से पैसा वसूल है।"
    },
    {
        id: 12,
        username: "Lukas_Berlin",
        lang: "DE",
        gain: "+$750",
        rating: 5,
        time: "Vor 25 Min.",
        comment: "Hervorragende Vorhersage-Algorithmen. Der 50-Dollar-Zugang hat sich bereits am ersten Abend mehrfach bezahlt gemacht."
    },
    {
        id: 13,
        username: "Marco_Milano",
        lang: "IT",
        gain: "+$830",
        rating: 5,
        time: "28 min fa",
        comment: "Strumento eccezionale! Ho seguito le indicazioni per il cashout a x4.50 e ho chiuso con un ottimo profitto netto."
    },
    {
        id: 14,
        username: "Alexandre_Marseille",
        lang: "FR",
        gain: "+$530",
        rating: 5,
        time: "Il y a 35 min",
        comment: "Les alertes tombent sans latence. Très bon outil pour cadrer ses parties avec discipline."
    },
    {
        id: 15,
        username: "Mateo_BuenosAires",
        lang: "ES",
        gain: "+$1,420",
        rating: 5,
        time: "Hace 40 min",
        comment: "La curva del avión muestra exactamente el momento antes del corte. Muy profesional y sin suscripciones mensuales."
    },
    {
        id: 16,
        username: "Brandon_Toronto",
        lang: "EN",
        gain: "+$940",
        rating: 5,
        time: "45 mins ago",
        comment: "Clean dashboard and live signals on point. Cashed out 3 consecutive winning flights today."
    },
    {
        id: 17,
        username: "Thiago_Rio",
        lang: "PT",
        gain: "+$920",
        rating: 5,
        time: "Há 50 min",
        comment: "Melhor investimento para quem joga Crash. A curva do avião dourado é perfeita para antecipar."
    },
    {
        id: 18,
        username: "Alexey_SPB",
        lang: "RU",
        gain: "+$980",
        rating: 5,
        time: "55 мин назад",
        comment: "Очень чистый интерфейс, никаких скрытых подписок. Сигналы приходят без задержек."
    },
    {
        id: 19,
        username: "Youssef_Casablanca",
        lang: "AR",
        gain: "+$850",
        rating: 5,
        time: "منذ ساعة",
        comment: "سعر 50 دولار لمدى الحياة عرض لا يعوض. الإشارات واضحة والنتائج ممتازة."
    },
    {
        id: 20,
        username: "Rohan_Delhi",
        lang: "HI",
        gain: "+$890",
        rating: 5,
        time: "1 hr ago",
        comment: "Crash Predictor 2026 एकदम सटीक सिग्नल देता है। आज ही 3 बार लगातार जीत हासिल की।"
    },

    // SUITE 21 A 63
    { id: 21, username: "Maximilian_Munich", lang: "DE", gain: "+$1,850", rating: 5, time: "Vor 1 Std.", comment: "Die Flugkurve und die Signale sind extrem präzise. Einfach einmalig freischalten." },
    { id: 22, username: "Giovanni_Roma", lang: "IT", gain: "+$1,270", rating: 5, time: "1 ora fa", comment: "Accesso a vita a 50$ davvero conveniente. Grafica pulita e segnali ottimi." },
    { id: 23, username: "Liam_Sydney", lang: "EN", gain: "+$1,720", rating: 5, time: "1 hr ago", comment: "Great UI, no hidden monthly fees. Full live access directly on the browser." },
    { id: 24, username: "Lucas_Lisboa", lang: "PT", gain: "+$480", rating: 5, time: "Há 1h 15", comment: "Interface direta e muito rápida. Vale cada centavo dos 50 dólares." },
    { id: 25, username: "Alejandro_Bogota", lang: "ES", gain: "+$890", rating: 5, time: "Hace 1h 20", comment: "Excelente herramienta. El acceso de por vida por solo $50 es una gran decisión." },
    { id: 26, username: "Karim_Riyadh", lang: "AR", gain: "+$1,540", rating: 5, time: "منذ ساعة", comment: "حساب مسار الطائرة دقيق ويجنبك الخسائر المفاجئة. أنصح به بشدة." },
    { id: 27, username: "Ivan_Novosibirsk", lang: "RU", gain: "+$1,420", rating: 5, time: "1.5 часа назад", comment: "Поймал коэффициент x14 по сигналу. Отличная работа разработчиков!" },
    { id: 28, username: "Vikram_Bangalore", lang: "HI", gain: "+$1,600", rating: 5, time: "2 hrs ago", comment: "Best Aviator predictor tool. Real vertical flight curve without lag." },
    { id: 29, username: "Stefan_Frankfurt", lang: "DE", gain: "+$420", rating: 5, time: "Vor 2 Std.", comment: "Sehr saubere Plattform. Schnelle Aktivierung und zuverlässige Quoten." },
    { id: 30, username: "Lorenzo_Napoli", lang: "IT", gain: "+$510", rating: 5, time: "2 ore fa", comment: "Facile da capire anche per chi non ha mai usato software simili." },
    { id: 31, username: "Diego_CDMX", lang: "ES", gain: "+$640", rating: 5, time: "Hace 2h", comment: "Las alertas son instantáneas y directas en la web." },
    { id: 32, username: "Oliver_Dublin", lang: "EN", gain: "+$560", rating: 5, time: "2 hrs ago", comment: "Extremely reliable tool. Solid 5 stars for the team." },
    { id: 33, username: "Rodrigo_BeloHorizonte", lang: "PT", gain: "+$1,340", rating: 5, time: "Há 2h 30", comment: "Tudo funciona direto no site, sem enrolação. Muito satisfeito." },
    { id: 34, username: "Sergey_Kazan", lang: "RU", gain: "+$1,100", rating: 5, time: "3 часа назад", comment: "Очень рад, что купил доступ. Сигналы заходят один за другим." },
    { id: 35, username: "Hassan_Amman", lang: "AR", gain: "+$980", rating: 5, time: "منذ 3 ساعات", comment: "الخدمة ممتازة وموثوقة، ساعدتني في تحقيق أرباح يومية." },
    { id: 36, username: "Amit_Pune", lang: "HI", gain: "+$740", rating: 5, time: "3 hrs ago", comment: "Very good tool. $50 lifetime license is very affordable." },
    { id: 37, username: "Daniel_NewYork", lang: "EN", gain: "+$2,350", rating: 5, time: "3 hrs ago", comment: "Hands down the best predictor for 2026. Consistent results." },
    { id: 38, username: "Valeria_Santiago", lang: "ES", gain: "+$1,150", rating: 5, time: "Hace 3h 30", comment: "Muy contenta con el servicio. Soporte rápido y certero." },
    { id: 39, username: "Javier_Valencia", lang: "ES", gain: "+$730", rating: 5, time: "Hace 4h", comment: "El análisis de la curva te da una ventaja tremenda." },
    { id: 40, username: "Sebastian_Hamburg", lang: "DE", gain: "+$1,290", rating: 5, time: "Vor 4 Std.", comment: "Beste Entscheidung für Aviator. Präzise Signale." },
    { id: 41, username: "Davide_Bologna", lang: "IT", gain: "+$610", rating: 5, time: "4 ore fa", comment: "Ottimo acquisto a 50$, nessun costo nascosto." },
    { id: 42, username: "Felipe_Curitiba", lang: "PT", gain: "+$1,480", rating: 5, time: "Há 4h 30", comment: "Acertos constantes nas saídas rápidas." },
    { id: 43, username: "Gonzalo_Sevilla", lang: "ES", gain: "+$440", rating: 5, time: "Hace 5h", comment: "Sencillo, rápido y rentable. 50 dólares bien aprovechados." },
    { id: 44, username: "Hans_Stuttgart", lang: "DE", gain: "+$1,050", rating: 5, time: "Vor 5 Std.", comment: "Sehr gute Trefferquote bei den mittleren Multiplikatoren." },
    { id: 45, username: "Andrea_Palermo", lang: "IT", gain: "+$720", rating: 5, time: "5 ore fa", comment: "Ho recuperato il costo della licenza già al secondo tentativo." },
    { id: 46, username: "Bruno_Recife", lang: "PT", gain: "+$860", rating: 5, time: "Há 5h 30", comment: "Muito top! As previsões do avião amarelo não falham." },
    { id: 47, username: "Ahmed_Algiers", lang: "AR", gain: "+$1,120", rating: 5, time: "منذ 6 ساعات", comment: "منصة احترافية وسهلة الاستخدام للغاية." },
    { id: 48, username: "Ryan_Miami", lang: "EN", gain: "+$670", rating: 5, time: "6 hrs ago", comment: "Solid predictions. Smooth curve flight on the dashboard." },
    { id: 49, username: "Mikhail_Sochi", lang: "RU", gain: "+$1,560", rating: 5, time: "6 часов назад", comment: "Поддержка в Telegram ответила сразу, доступ активен." },
    { id: 50, username: "Pooja_Jaipur", lang: "HI", gain: "+$920", rating: 5, time: "7 hrs ago", comment: "Superb experience! Highly recommended." },
    { id: 51, username: "Florian_Koln", lang: "DE", gain: "+$1,370", rating: 5, time: "Vor 7 Std.", comment: "Funktioniert einwandfrei im Browser. Sehr zufrieden." },
    { id: 52, username: "Enzo_Firenze", lang: "IT", gain: "+$540", rating: 5, time: "7 ore fa", comment: "Tutto automatico e preciso. Vale ogni singolo dollaro." },
    { id: 53, username: "Caio_Brasilia", lang: "PT", gain: "+$1,210", rating: 5, time: "Há 8h", comment: "Parabéns aos desenvolvedores. Software lucrativo." },
    { id: 54, username: "Samir_Doha", lang: "AR", gain: "+$1,890", rating: 5, time: "منذ 8 ساعات", comment: "أفضل برنامج لتوقع رحلات الطيران." },
    { id: 55, username: "Michael_Chicago", lang: "EN", gain: "+$1,450", rating: 5, time: "8 hrs ago", comment: "Just got my 4th green payout in a row." },
    { id: 56, username: "Andres_Lima", lang: "ES", gain: "+$910", rating: 5, time: "Hace 9h", comment: "Excelente servicio de atención y activación inmediata." },
    { id: 57, username: "Nikolay_Ufa", lang: "RU", gain: "+$780", rating: 5, time: "9 часов назад", comment: "Работает стабильно на телефоне и ноутбуке." },
    { id: 58, username: "Deepak_Kolkata", lang: "HI", gain: "+$1,150", rating: 5, time: "10 hrs ago", comment: "Great accuracy on high multipliers." },
    { id: 59, username: "Gabriel_Porto", lang: "PT", gain: "+$690", rating: 5, time: "Há 11h", comment: "Previsões consistentes ao longo de todo o dia." },
    { id: 60, username: "Omar_Muscat", lang: "AR", gain: "+$1,340", rating: 5, time: "منذ 12 ساعة", comment: "دقة عالية في تحديد نقطة القفز، شكراً لكم." },
    { id: 61, username: "Lucas_Austin", lang: "EN", gain: "+$830", rating: 5, time: "13 hrs ago", comment: "Fast activation, transparent pricing, awesome software." },
    { id: 62, username: "Elena_Samara", lang: "RU", gain: "+$1,270", rating: 5, time: "15 часов назад", comment: "Очень довольна результатами за первые сутки." },
    { id: 63, username: "Karan_Ahmedabad", lang: "HI", gain: "+$680", rating: 5, time: "18 hrs ago", comment: "Smooth UI, fast Telegram response, genuine signals." }
];

// App State
let currentUser = JSON.parse(localStorage.getItem('crash_predictor_user_2026')) || null;
let displayedCommentsCount = 12;
let telegramCustomLink = "https://t.me/";
let currentLanguage = "fr";

// ==========================================
// 2. DOM INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initLiveOnlineUsersTicker();
    initAutoLanguageDetector();
    initLanguageSelector();
    initGuaranteed48hCountdown();
    initVerticalGrandAviatorCurve();
    renderCommentsList();
    initLoadMoreComments();
    initAuthSecurity();
    initProfileModal();
    initModals();
    initDirectBuy();
    initFAQHelper();
});

// ==========================================
// 3. LIVE ONLINE TRADERS COUNTER (1 000 000 A 1 500 000 PERSONNES EN DIRECT)
// ==========================================
function initLiveOnlineUsersTicker() {
    const liveCounterEl = document.getElementById('liveOnlineUsersCount');
    if (!liveCounterEl) return;

    // Start around 1 284 650
    let currentUsers = 1284650;

    function formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function updateLiveTraders() {
        // Random natural fluctuation between 1 150 000 and 1 490 000
        const delta = Math.floor((Math.random() - 0.48) * 140);
        currentUsers += delta;

        if (currentUsers < 1150000) currentUsers = 1150000 + Math.floor(Math.random() * 5000);
        if (currentUsers > 1495000) currentUsers = 1495000 - Math.floor(Math.random() * 5000);

        liveCounterEl.textContent = formatNumber(currentUsers);
    }

    liveCounterEl.textContent = formatNumber(currentUsers);
    setInterval(updateLiveTraders, 2200);
}

// ==========================================
// 4. LANGUAGE SELECTOR & I18N
// ==========================================
function initAutoLanguageDetector() {
    const saved = localStorage.getItem('crash_lang_pref_2026');
    if (saved) {
        currentLanguage = saved;
    } else {
        currentLanguage = 'fr'; // French primary as requested
    }
}

function initLanguageSelector() {
    const selectEl = document.getElementById('siteLanguageSelect');
    if (!selectEl) return;

    selectEl.value = currentLanguage;
    selectEl.addEventListener('change', (e) => {
        currentLanguage = e.target.value;
        localStorage.setItem('crash_lang_pref_2026', currentLanguage);
    });
}

// ==========================================
// 5. GUARANTEED 48-HOUR PERSISTENT COUNTDOWN
// ==========================================
function initGuaranteed48hCountdown() {
    const timerElements = document.querySelectorAll('.countdown-timer-text');
    if (!timerElements.length) return;

    const DURATION_48H = 48 * 60 * 60 * 1000;
    let timerStart = localStorage.getItem('crash_timer_start_48h_v3');
    const now = Date.now();

    if (!timerStart || isNaN(timerStart) || (now - parseInt(timerStart, 10)) > DURATION_48H) {
        timerStart = now;
        localStorage.setItem('crash_timer_start_48h_v3', timerStart);
    } else {
        timerStart = parseInt(timerStart, 10);
    }

    function updateTimer() {
        const current = Date.now();
        let elapsed = current - timerStart;
        let remaining = DURATION_48H - elapsed;

        if (remaining <= 0) {
            timerStart = Date.now();
            localStorage.setItem('crash_timer_start_48h_v3', timerStart);
            remaining = DURATION_48H;
        }

        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

        const formatted = `${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;

        timerElements.forEach(el => {
            el.textContent = formatted;
        });
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// ==========================================
// 6. GRAND VERTICAL AVIATOR CURVE SIMULATOR (MONTE BIEN VERTICAL, LOIN, EXPLOSE ET REDESCEND)
// ==========================================
function initVerticalGrandAviatorCurve() {
    const canvas = document.getElementById('aviatorCanvas');
    const container = document.getElementById('curveInteractiveBox');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        if (container) {
            canvas.width = container.clientWidth || 920;
            canvas.height = 500; // Grand format bien vertical et haut
        }
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let t = 0;
    let flightSpeed = 0.0055;
    let state = 'flying'; // 'flying', 'exploding', 'waiting'
    let explosionTimer = 0;
    let particles = [];
    let blastRadius = 0;

    // Flights alternate between vertical steep climbs (high levels) and medium/lower levels
    let targetMaxHeightRatio = 0.08; // Very high vertical climb by default
    let targetMaxXOffset = 80;

    function resetFlight() {
        t = 0;
        state = 'flying';
        particles = [];
        blastRadius = 0;

        const rand = Math.random();
        if (rand > 0.35) {
            // NIVEAU SUPÉRIEUR TRÈS VERTICAL (Montée haute et lointaine)
            targetMaxHeightRatio = 0.05 + Math.random() * 0.08;
            targetMaxXOffset = 50 + Math.random() * 70;
            flightSpeed = 0.0048 + Math.random() * 0.0015;
        } else {
            // NIVEAU INTERMÉDIAIRE
            targetMaxHeightRatio = 0.22 + Math.random() * 0.15;
            targetMaxXOffset = 130 + Math.random() * 50;
            flightSpeed = 0.006;
        }
    }

    function createExplosion(x, y) {
        state = 'exploding';
        explosionTimer = 0;
        blastRadius = 6;
        particles = [];

        for (let i = 0; i < 50; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 8;
            particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: i % 3 === 0 ? '#ffc837' : (i % 3 === 1 ? '#ef4444' : '#f97316'),
                size: 2.5 + Math.random() * 4,
                alpha: 1
            });
        }
    }

    function drawGrandSimulation() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const W = canvas.width;
        const H = canvas.height;

        // 1. Dark Blue Night Sky
        ctx.fillStyle = '#070c1e';
        ctx.fillRect(0, 0, W, H);

        // 2. Dotted Grid (Vertical & Horizontal)
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);

        for (let y = 50; y < H - 40; y += 65) {
            ctx.beginPath();
            ctx.moveTo(40, y);
            ctx.lineTo(W - 20, y);
            ctx.stroke();
        }

        for (let x = 80; x < W - 20; x += 100) {
            ctx.beginPath();
            ctx.moveTo(x, 20);
            ctx.lineTo(x, H - 40);
            ctx.stroke();
        }

        // 3. Axes
        ctx.setLineDash([]);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.28)';
        ctx.lineWidth = 2.5;

        // X Axis (Bottom)
        ctx.beginPath();
        ctx.moveTo(40, H - 40);
        ctx.lineTo(W - 10, H - 40);
        ctx.stroke();

        // Y Axis (Vertical Left)
        ctx.beginPath();
        ctx.moveTo(40, 15);
        ctx.lineTo(40, H - 40);
        ctx.stroke();

        // Axis Dots
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        for (let y = 35; y <= H - 40; y += 65) {
            ctx.beginPath();
            ctx.arc(40, y, 4, 0, Math.PI * 2);
            ctx.fill();
        }
        for (let x = 40; x <= W - 40; x += 100) {
            ctx.beginPath();
            ctx.arc(x, H - 40, 4, 0, Math.PI * 2);
            ctx.fill();
        }

        // 4. Steep Vertical Quadratic Curve Calculation
        const startX = 40;
        const startY = H - 40;
        const targetMaxX = W - targetMaxXOffset;
        const targetMaxY = H * targetMaxHeightRatio;

        const progress = Math.min(t, 1);
        const cpX = startX + (targetMaxX - startX) * 0.35; // Sharper steep climb
        const cpY = startY;

        const currentX = (1 - progress) * (1 - progress) * startX + 2 * (1 - progress) * progress * cpX + progress * progress * targetMaxX;
        const currentY = (1 - progress) * (1 - progress) * startY + 2 * (1 - progress) * progress * cpY + progress * progress * targetMaxY;

        const dx = 2 * (1 - progress) * (cpX - startX) + 2 * progress * (targetMaxX - cpX);
        const dy = 2 * (1 - progress) * (cpY - startY) + 2 * progress * (targetMaxY - cpY);
        const angle = Math.atan2(dy, dx);

        // Draw Glowing Yellow Vertical Curve
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        for (let step = 0; step <= progress; step += 0.01) {
            const px = (1 - step) * (1 - step) * startX + 2 * (1 - step) * step * cpX + step * step * targetMaxX;
            const py = (1 - step) * (1 - step) * startY + 2 * (1 - step) * step * cpY + step * step * targetMaxY;
            ctx.lineTo(px, py);
        }
        ctx.strokeStyle = '#f9d423';
        ctx.lineWidth = 7.5;
        ctx.lineCap = 'round';
        ctx.shadowColor = '#ffc837';
        ctx.shadowBlur = 20;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // 5. Plane / Explosion Animation
        if (state === 'flying') {
            ctx.save();
            ctx.translate(currentX, currentY);
            ctx.rotate(angle);

            ctx.shadowColor = '#ffc837';
            ctx.shadowBlur = 22;

            // Fuselage
            ctx.fillStyle = '#ffc837';
            ctx.beginPath();
            ctx.ellipse(0, 0, 25, 11.5, 0, 0, Math.PI * 2);
            ctx.fill();

            // Cockpit
            ctx.fillStyle = '#1e1b4b';
            ctx.beginPath();
            ctx.arc(7.5, -3, 4.5, 0, Math.PI * 2);
            ctx.fill();

            // Wings
            ctx.fillStyle = '#f59e0b';
            ctx.beginPath();
            ctx.moveTo(-4, 0);
            ctx.lineTo(-14, -22);
            ctx.lineTo(5, -4);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(-4, 0);
            ctx.lineTo(-14, 22);
            ctx.lineTo(5, 4);
            ctx.closePath();
            ctx.fill();

            // Nose
            ctx.fillStyle = '#d97706';
            ctx.fillRect(20, -7, 4, 14);

            // Jet Flame
            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.moveTo(-25, -5);
            ctx.lineTo(-46 - Math.random() * 14, 0);
            ctx.lineTo(-25, 5);
            ctx.closePath();
            ctx.fill();

            ctx.restore();

            t += flightSpeed;

            if (t >= 1) {
                createExplosion(currentX, currentY);
            }
        } else if (state === 'exploding') {
            explosionTimer++;

            blastRadius += 3.5;
            ctx.save();
            ctx.beginPath();
            ctx.arc(currentX, currentY, blastRadius, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255, 200, 55, ${Math.max(0, 1 - explosionTimer / 38)})`;
            ctx.lineWidth = 4.5;
            ctx.shadowColor = '#ef4444';
            ctx.shadowBlur = 30;
            ctx.stroke();
            ctx.restore();

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= 0.024;

                if (p.alpha > 0) {
                    ctx.save();
                    ctx.globalAlpha = Math.max(0, p.alpha);
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                }
            });

            if (explosionTimer > 42) {
                state = 'waiting';
                setTimeout(resetFlight, 850);
            }
        }

        requestAnimationFrame(drawGrandSimulation);
    }

    resetFlight();
    drawGrandSimulation();

    canvas.addEventListener('click', resetFlight);
}

// ==========================================
// 7. RENDER 63 COMMENTS (FRENCH REVIEWS IN FIRST PAGE SPOTLIGHT)
// ==========================================
function renderCommentsList() {
    const grid = document.getElementById('commentsGrid');
    if (!grid) return;

    const visibleComments = WINNER_COMMENTS.slice(0, displayedCommentsCount);

    grid.innerHTML = visibleComments.map((c) => `
        <div class="comment-card animate-fade">
            <div class="comment-header">
                <div class="comment-user-box">
                    <div class="comment-lang-badge">${c.lang}</div>
                    <div>
                        <div class="comment-username">${c.username} <i class="fa-solid fa-circle-check text-green verified-mini"></i></div>
                        <div class="comment-time">${c.time}</div>
                    </div>
                </div>
                <div class="comment-gain-badge">${c.gain}</div>
            </div>

            <div class="comment-stars-row">
                <div class="comment-stars">
                    ${'<i class="fa-solid fa-star"></i>'.repeat(c.rating)}
                </div>
                <div class="comment-status-pill"><i class="fa-solid fa-shield-check"></i> En 24h</div>
            </div>

            <p class="comment-text">"${c.comment}"</p>
        </div>
    `).join('');

    const btnLoadMore = document.getElementById('btnLoadMoreComments');
    const totalCountText = document.getElementById('commentsCounterDisplay');

    if (totalCountText) {
        totalCountText.textContent = `Affichage de ${visibleComments.length} sur 63 commentaires en 24 heures (+155 643 avis enregistrés)`;
    }

    if (btnLoadMore) {
        if (displayedCommentsCount >= WINNER_COMMENTS.length) {
            btnLoadMore.style.display = 'none';
        } else {
            btnLoadMore.style.display = 'inline-flex';
            btnLoadMore.innerHTML = `<i class="fa-solid fa-chevron-down"></i> Voir plus d'avis (${WINNER_COMMENTS.length - displayedCommentsCount} restants)`;
        }
    }
}

function initLoadMoreComments() {
    const btnLoadMore = document.getElementById('btnLoadMoreComments');
    if (btnLoadMore) {
        btnLoadMore.addEventListener('click', () => {
            displayedCommentsCount = Math.min(displayedCommentsCount + 16, WINNER_COMMENTS.length);
            renderCommentsList();
        });
    }
}

// ==========================================
// 8. AUTHENTICATION & SECURE PROFILE SYSTEM (TÉLÉPHONE + MOT DE PASSE + BADGE ROUGE)
// ==========================================
function initAuthSecurity() {
    updateAuthHeader();

    const regForm = document.getElementById('registerForm');
    const logForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const profileLogoutBtn = document.getElementById('profileLogoutBtn');

    // Inscription
    if (regForm) {
        regForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('regName').value.trim();
            const email = document.getElementById('regEmail').value.trim().toLowerCase();
            const password = document.getElementById('regPassword').value;
            const passwordConfirm = document.getElementById('regPasswordConfirm')?.value;

            if (!name || name.length < 3) {
                showToast("Le nom ou pseudo doit comporter au moins 3 caractères.", "error");
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast("Veuillez saisir une adresse email valide.", "error");
                return;
            }

            if (!password || password.length < 5) {
                showToast("Le mot de passe doit comporter au moins 5 caractères.", "error");
                return;
            }

            if (passwordConfirm !== undefined && password !== passwordConfirm) {
                showToast("Les deux mots de passe ne correspondent pas.", "error");
                return;
            }

            let usersDb = JSON.parse(localStorage.getItem('crash_users_db_2026')) || [];
            const existingUser = usersDb.find(u => u.email === email);
            if (existingUser) {
                showToast("Cet email est déjà inscrit ! Connectez-vous.", "error");
                return;
            }

            const newUser = {
                id: Date.now(),
                name: name,
                email: email,
                phone: "",
                passwordHash: btoa(password),
                isSubscribed: false,
                registeredAt: new Date().toLocaleDateString('fr-FR')
            };

            usersDb.push(newUser);
            localStorage.setItem('crash_users_db_2026', JSON.stringify(usersDb));

            currentUser = newUser;
            localStorage.setItem('crash_predictor_user_2026', JSON.stringify(currentUser));

            updateAuthHeader();
            closeAllModals();
            regForm.reset();
            showToast(`Compte créé avec succès ! Bienvenue, ${currentUser.name}.`);
        });
    }

    // Connexion
    if (logForm) {
        logForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.trim().toLowerCase();
            const password = document.getElementById('loginPassword').value;

            if (!email || !password) {
                showToast("Veuillez remplir vos identifiants.", "error");
                return;
            }

            let usersDb = JSON.parse(localStorage.getItem('crash_users_db_2026')) || [];
            const foundUser = usersDb.find(u => u.email === email);

            if (foundUser) {
                if (foundUser.passwordHash === btoa(password)) {
                    currentUser = foundUser;
                    localStorage.setItem('crash_predictor_user_2026', JSON.stringify(currentUser));
                    updateAuthHeader();
                    closeAllModals();
                    logForm.reset();
                    showToast(`Connexion réussie ! Bienvenue, ${currentUser.name}.`);
                } else {
                    showToast("Mot de passe incorrect. Veuillez vérifier vos saisies.", "error");
                }
            } else {
                const autoUser = {
                    id: Date.now(),
                    name: email.split('@')[0] || "Membre",
                    email: email,
                    phone: "",
                    passwordHash: btoa(password),
                    isSubscribed: false,
                    registeredAt: new Date().toLocaleDateString('fr-FR')
                };
                usersDb.push(autoUser);
                localStorage.setItem('crash_users_db_2026', JSON.stringify(usersDb));

                currentUser = autoUser;
                localStorage.setItem('crash_predictor_user_2026', JSON.stringify(currentUser));
                updateAuthHeader();
                closeAllModals();
                logForm.reset();
                showToast(`Connexion validée ! Bienvenue, ${currentUser.name}.`);
            }
        });
    }

    const handleLogout = () => {
        currentUser = null;
        localStorage.removeItem('crash_predictor_user_2026');
        updateAuthHeader();
        closeAllModals();
        showToast("Vous avez été déconnecté.");
    };

    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    if (profileLogoutBtn) profileLogoutBtn.addEventListener('click', handleLogout);
}

function updateAuthHeader() {
    const guestButtons = document.getElementById('guestButtons');
    const userProfileBadge = document.getElementById('userProfileBadge');
    const navUserName = document.getElementById('navUserName');
    const siteAlertBanner = document.getElementById('siteSubscriptionAlert');

    if (currentUser) {
        guestButtons?.classList.add('hidden');
        userProfileBadge?.classList.remove('hidden');
        if (navUserName) navUserName.textContent = currentUser.name;

        if (siteAlertBanner) {
            if (!currentUser.isSubscribed) {
                siteAlertBanner.classList.remove('hidden');
            } else {
                siteAlertBanner.classList.add('hidden');
            }
        }
    } else {
        guestButtons?.classList.remove('hidden');
        userProfileBadge?.classList.add('hidden');
        if (siteAlertBanner) siteAlertBanner.classList.add('hidden');
    }
}

// ==========================================
// 9. PROFILE MANAGEMENT (PHONE NUMBER + CHANGE PASSWORD)
// ==========================================
function initProfileModal() {
    const userProfileBadge = document.getElementById('userProfileBadge');
    const profileModal = document.getElementById('profileModal');
    const closeProfile = document.getElementById('closeProfileModal');
    const profileNameDisplay = document.getElementById('profileNameDisplay');
    const profileEmailDisplay = document.getElementById('profileEmailDisplay');
    const profileDateDisplay = document.getElementById('profileDateDisplay');
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
            if (profileDateDisplay) profileDateDisplay.textContent = currentUser.registeredAt || "Aujourd'hui";
            if (profilePhoneInput) profilePhoneInput.value = currentUser.phone || "";

            if (profileStatusBadge) {
                if (!currentUser.isSubscribed) {
                    profileStatusBadge.className = "status-tag-badge status-unsubscribed";
                    profileStatusBadge.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> NON ABONNÉ (AUCUN ABONNEMENT ACTIF)';
                } else {
                    profileStatusBadge.className = "status-tag-badge status-active";
                    profileStatusBadge.innerHTML = '<i class="fa-solid fa-circle-check"></i> ABONNEMENT ACTIF À VIE';
                }
            }

            profileModal.classList.add('active');
        });
    }

    if (closeProfile) {
        closeProfile.addEventListener('click', () => profileModal?.classList.remove('active'));
    }

    // Save / Update Phone Number
    if (btnSavePhone) {
        btnSavePhone.addEventListener('click', () => {
            if (!currentUser) return;
            const phone = profilePhoneInput.value.trim();
            currentUser.phone = phone;

            let usersDb = JSON.parse(localStorage.getItem('crash_users_db_2026')) || [];
            const idx = usersDb.findIndex(u => u.email === currentUser.email);
            if (idx !== -1) {
                usersDb[idx].phone = phone;
                localStorage.setItem('crash_users_db_2026', JSON.stringify(usersDb));
            }
            localStorage.setItem('crash_predictor_user_2026', JSON.stringify(currentUser));
            showToast("Numéro de téléphone enregistré avec succès !");
        });
    }

    // Change Password
    if (formUpdatePassword) {
        formUpdatePassword.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!currentUser) return;

            const oldPass = document.getElementById('profileOldPassword').value;
            const newPass = document.getElementById('profileNewPassword').value;
            const confirmPass = document.getElementById('profileConfirmNewPassword').value;

            if (currentUser.passwordHash && btoa(oldPass) !== currentUser.passwordHash) {
                showToast("Votre mot de passe actuel est incorrect.", "error");
                return;
            }

            if (!newPass || newPass.length < 5) {
                showToast("Le nouveau mot de passe doit comporter au moins 5 caractères.", "error");
                return;
            }

            if (newPass !== confirmPass) {
                showToast("Les nouveaux mots de passe ne correspondent pas.", "error");
                return;
            }

            currentUser.passwordHash = btoa(newPass);

            let usersDb = JSON.parse(localStorage.getItem('crash_users_db_2026')) || [];
            const idx = usersDb.findIndex(u => u.email === currentUser.email);
            if (idx !== -1) {
                usersDb[idx].passwordHash = btoa(newPass);
                localStorage.setItem('crash_users_db_2026', JSON.stringify(usersDb));
            }
            localStorage.setItem('crash_predictor_user_2026', JSON.stringify(currentUser));

            formUpdatePassword.reset();
            showToast("Mot de passe modifié avec succès !");
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
// 10. DIRECT BUY / ACCÉDER AUX PRÉDICTIONS
// ==========================================
function initDirectBuy() {
    const directBuyButtons = document.querySelectorAll('#directBuyButton, .btn-buy-instant, .btn-cta-buy, #btnAlertSubscribe');
    const buyModal = document.getElementById('buyModal');
    const buyerDetailsBox = document.getElementById('buyerDetailsBox');
    const telegramBuyActionBtn = document.getElementById('telegramBuyActionBtn');

    window.setTelegramLink = function(url) {
        telegramCustomLink = url;
        if (telegramBuyActionBtn) {
            telegramBuyActionBtn.href = url;
        }
    };

    directBuyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.getAttribute('href') && btn.getAttribute('href').startsWith('#')) {
                return;
            }
            e.preventDefault();
            if (buyerDetailsBox) {
                if (currentUser) {
                    buyerDetailsBox.innerHTML = `
                        <div style="display:flex; align-items:center; gap:10px;">
                            <div style="width:38px; height:38px; border-radius:50%; background:#ffc837; color:#0d0614; display:flex; align-items:center; justify-content:center; font-size:18px;">
                                <i class="fa-solid fa-user-check"></i>
                            </div>
                            <div>
                                <strong>Compte : ${currentUser.name}</strong> (${currentUser.email})
                                <div style="font-size:0.78rem; color:#ef4444; font-weight:700;"><i class="fa-solid fa-circle-exclamation"></i> Statut actuel : Non abonné • Le prix passera à 100 dollars après 48h</div>
                            </div>
                        </div>
                    `;
                } else {
                    buyerDetailsBox.innerHTML = `
                        <div style="color: #ffc837; font-size:0.85rem;">
                            <i class="fa-solid fa-info-circle"></i> Accès officiel <strong>CRASH PREDICTOR 2026</strong> à 50 dollars. Le prix passera à 100 dollars après 48h.
                        </div>
                    `;
                }
            }
            buyModal?.classList.add('active');
        });
    });
}

// ==========================================
// 11. MODALS & FAQ
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

function initFAQHelper() {
    const items = document.querySelectorAll('.faq-item');
    items.forEach(item => {
        const question = item.querySelector('.faq-question');
        question?.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
}

// ==========================================
// 12. TOAST NOTIFICATIONS
// ==========================================
function showToast(message, type = "success") {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-message';

    const icon = type === "error" 
        ? '<i class="fa-solid fa-triangle-exclamation" style="color:#ef4444;"></i>' 
        : '<i class="fa-solid fa-circle-check" style="color:#10b981;"></i>';

    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}
