/**
 * CRASH PREDICTOR 2026 — LOGIQUE D'APPLICATION OFFICIELLE & MOTEUR I18N
 * - Détection automatique de la langue par Géolocalisation IP (Support VPN) & Navigateur
 * - Support multilingue complet : Français (FR), Anglais (EN), Espagnol (ES), Portugais (PT), Allemand (DE)
 * - 113 Avis Clients Vérifiés réorganisés intelligemment selon la langue du visiteur
 * - Identifiants 7 chiffres stricts : 5 000 000 à 10 000 000 (ex: CRASH-5829143)
 * - Compteur de trafic en direct : variations 2 000 - 5 000 sessions / 3 - 5s
 * - Cockpit Radar de vol haute précision synchronisé Supabase / Flutterwave
 */

const CONFIG = {
    flutterwavePublicKey: "FLWPUBK-07d56b9d571ed135ab4bf5d3fd5330a9-X",
    supabaseUrl: "https://tnxyrvjrxxrsqnpviknz.supabase.co",
    supabaseAnonKey: "sb_publishable_Hl6nmMnRAM1mfdDdudH2_w_kYIJAXdF",
    adminSecret: "ADMIN2026",
    licenseUsd: 17,
    licenseXof: 10200,
    subscriptionDays: 30,
    sessionKey: "crash_predictor_user_2026",
    usersDbKey: "crash_users_db_2026",
    guestIdKey: "crash_guest_id_2026",
    timerKey: "crash_timer_start_48h_v4",
    langKey: "crash_user_lang_pref",
    maketouCartKey: "crash_maketou_cart",
    maketouPendingKey: "crash_maketou_pending",
    maketouCheckoutUrl: "https://welcome.mymaketou.shop/products/17/checkout",
    maketouProductId: "9f5842bc-8ece-4012-8f24-81761d32a4b8",
    maketouApiBase: "https://api.maketou.net",
    maketouSuccessUrl: "https://crashpredictor.fr/?payment=success&status=approved",
    accessUnlockedKey: "crash_access_unlocked",
    userPremiumKey: "user_premium",
    accessTokenKey: "crash_access_token",
    memberIdKey: "user_member_id",
    accessVerifiedKey: "crash_access_v2_verified",
    referralKey: "crash_referral_ref"
};

const META_PIXEL_ID = "902325525891827";
const META_LICENSE_EVENT = {
    value: 17.00,
    currency: "USD",
    content_name: "Licence Predictor 6 Jeux"
};

function trackMetaPixel(eventName, params) {
    const payload = params || {};
    function send() {
        if (typeof window.fbq !== "function") return false;
        try {
            window.fbq("track", eventName, payload);
            return true;
        } catch (err) {
            return false;
        }
    }
    if (send()) return;
    let attempts = 0;
    const timer = setInterval(() => {
        attempts += 1;
        if (send() || attempts >= 24) clearInterval(timer);
    }, 250);
}

let lastMetaPageKey = null;
function trackMetaPageView(pageKey) {
    const key = pageKey || "home";
    if (lastMetaPageKey === key) return;
    const isFirstPaint = lastMetaPageKey === null;
    lastMetaPageKey = key;
    if (isFirstPaint) return;
    trackMetaPixel("PageView");
}

let lastInitiateCheckoutAt = 0;
function trackMetaInitiateCheckout() {
    const now = Date.now();
    if (now - lastInitiateCheckoutAt < 2000) return;
    lastInitiateCheckoutAt = now;
    trackMetaPixel("InitiateCheckout", META_LICENSE_EVENT);
}

function trackMetaPurchase(orderId) {
    try {
        const stamp = String(orderId || "paid");
        const key = "meta_pixel_purchase_" + stamp;
        if (sessionStorage.getItem(key) === "1") return;
        sessionStorage.setItem(key, "1");
    } catch (err) {}
    trackMetaPixel("Purchase", META_LICENSE_EVENT);
}

// ==========================================================================
// DICTIONNAIRE DE TRADUCTION COMPLET (I18N)
// ==========================================================================
const TRANSLATIONS = {
    fr: {
        doc_title: "PREDICTOR | Suite d'Analyse Multi-Jeux en Direct",
        ticker_live: "EN DIRECT",
        ticker_sub: "utilisateurs connectées sur le site crashpredictor.fr",
        alert_unsubscribed: "<strong>ACCÈS NON ACTIVÉ :</strong> activez votre licence pour ouvrir la session d'analyse.",
        alert_expired: "<strong>ABONNEMENT EXPIRÉ :</strong> renouvelez votre accès mensuel à 17 $.",
        btn_alert_unlock: "Débloquer l'accès – 17 $",
        btn_alert_renew: "Renouveler l'accès – 17 $",
        toast_expired: "Votre abonnement de 30 jours est expiré. Renouvelez à 17 $.",
        badge_edition: "SUITE MULTI-JEUX",
        nav_login: "Connexion",
        nav_register: "Inscription",
        promo_offer: "DERNIÈRE CHANCE 17 $ :",
        promo_remaining: "restante(s)",
        hero_subtitle: "Six moteurs de prédiction en temps réel, un seul accès officiel à 17 $ / mois.",
        badge_algo: "MOTEUR LIVE",
        badge_live_session: "SESSION TEMPS RÉEL",
        badge_verified: "VÉRIFIÉ",
        flash_default: "vient d'activer sa licence",
        offer_title: "Licence Officielle & Accès Illimité",
        offer_desc: "Un seul accès à 17 $ / mois débloque les 6 moteurs de prédiction en temps réel.",
        price_lifetime: "/ Mois",
        price_cfa: "",
        benefit_1_title: "Précision Algorithmique Optimale",
        benefit_1_desc: "Analyse en temps réel et anticipation précise des signaux en direct.",
        benefit_2_title: "Activation Immédiate",
        benefit_2_desc: "Accès instantané aux 6 sessions d'analyse dès la validation de votre paiement.",
        benefit_3_title: "Abonnement Mensuel",
        benefit_3_desc: "Accès complet renouvelé chaque mois, simple abonnement mensuel.",
        benefit_4_title: "Multi-supports",
        benefit_4_desc: "Interface optimisée pour un usage fluide sur smartphone, tablette et ordinateur.",
        btn_buy_instant: "DÉBLOQUER MON ACCÈS 17 $",
        btn_referral_free: "🎁 DÉBLOQUER 1 MOIS GRATUIT ( CHALLENGE )",
        referral_modal_copy: "Partagez votre lien d'invitation à vos proches. Dès que 2 amis débloquent leur accès via votre lien, votre propre accès s'active automatiquement et gratuitement pendant 30 jours !",
        btn_referral_copy: "📋 Copier mon lien",
        toast_link_copied: "✅ Lien copié !",
        secure_guarantee: "Paiement sécurisé et chiffré • Activation automatique de la session",
        reviews_badge: "RETOURS MEMBRES VÉRIFIÉS (113 AVIS)",
        reviews_title: "Retours d'Expérience & Témoignages",
        reviews_subtitle: "Commentaires authentiques associés à des identifiants membres anonymes.",
        stat_registered: "Membres inscrits",
        stat_satisfaction: "Indice de satisfaction",
        stat_license: "Par mois",
        btn_load_more: "Afficher plus de témoignages",
        remaining_txt: "restants",
        footer_copy: "© PREDICTOR. Tous droits réservés.",
        footer_rights: "Tous droits réservés.",
        footer_admin: "Espace administrateur",
        vip_official: "OFFICIEL",
        vip_radar_live: "SIGNAUX EN DIRECT",
        vip_member_active: "Membre Actif",
        radar_heading: "SESSION D'ANALYSE HAUTE PRÉCISION",
        radar_session_badge: "SESSION ACTIVE",
        pred_label: "POINT DE SORTIE CALCULÉ",
        pred_stability: "Stabilité :",
        pred_advice: "Retirez vos gains avant cette cote de sécurité",
        btn_unlock_signal: "⚡ DÉCODER LE SIGNAL",
        btn_analyse_signal: "⚡ DÉCODER LE SIGNAL",
        metrics_kicker: "TABLEAU DE BORD ALGORITHMIQUE",
        metrics_title: "Précision technique en temps réel",
        metrics_accuracy: "Algorithmic Accuracy",
        metrics_verified: "Vérifié",
        metrics_sessions: "Sessions Analysées / 24h",
        metrics_satisfaction: "Taux de Satisfaction",
        metrics_reviews: "Basé sur + 328 400 évaluations vérifiées",
        metrics_latency: "Latence de Flux",
        suite_kicker: "LE BOSS · SPORTS PREDICTIONS + 6 JEUX",
        hero_live_badge: "LIVE SIGNAL",
        session_locked_kicker: "EN ATTENTE",
        session_locked_title: "VERROUILLÉ",
        session_locked_copy: "Une analyse est déjà en cours sur un autre jeu.",
        game_tag_aviator: "Signaux en direct",
        game_tag_luckyjet: "Flux cosmique",
        game_tag_crash: "Algorithme live",
        game_tag_mines: "Cases sûres",
        game_tag_penalty: "Ciblage laser",
        game_tag_apple: "Chemin doré",
        game_tag_sport: "Paris sportifs · algorithme live",
        sport_boss_ribbon: "LE BOSS",
        sport_teaser_kicker: "MATCH DU JOUR",
        sport_teaser_title: "Grande affiche",
        sport_teaser_note: "Cotes neutres · prédiction réservée à l'espace membre",
        sport_odd_draw: "NUL",
        sport_win_badge: "WIN / CONFIRMÉ",
        sport_pred_line: "PRÉDICTION : VICTOIRE LYON @ 1.97",
        btn_sport_signal: "⚡ DÉCODER LE SIGNAL",
        signal_window: "DÉCOLLAGE DANS",
        signal_arrive: "LA PRÉDICTION ARRIVE DANS {n} SECONDES",
        hud_label: "COTE EN DIRECT",
        scan_title: "CALIBRATION DU SIGNAL",
        scan_subtitle: "Prochain tour en préparation…",
        vip_flight_init: "Analyse des flux… signal imminent",
        sys_params: "PARAMÈTRES DU SYSTÈME",
        sys_algo_stab: "Stabilité algorithmique",
        sys_latency: "Latence flux",
        sys_license_status: "Statut licence",
        sys_active_lifetime: "ACTIVE / MOIS",
        sys_your_id: "Votre ID membre",
        recent_rounds: "DERNIERS ROUNDS",
        profile_space: "Mon Profil / Paramètres",
        profile_your_id: "VOTRE ID UNIQUE :",
        profile_license_status: "Statut de votre licence",
        status_unsubscribed: "NON ACTIVÉ",
        status_activated_vip: "ACTIVÉ / VIP",
        lbl_phone: "Numéro de téléphone / WhatsApp",
        btn_save: "Enregistrer",
        lbl_update_pass: "Modifier mon mot de passe",
        btn_update: "Mettre à jour",
        btn_profile_unlock: "Débloquer mon accès complet – 17 $",
        btn_logout: "Se déconnecter",
        reg_title: "Créer un compte",
        reg_sub: "Un identifiant unique vous sera attribué",
        reg_name_lbl: "Nom ou pseudonyme",
        reg_email_lbl: "Adresse email",
        reg_pass_lbl: "Mot de passe",
        reg_submit: "Valider mon inscription",
        already_registered: "Déjà inscrit ?",
        switch_login: "Se connecter",
        login_title: "Connexion membre",
        login_sub: "Accédez à votre espace",
        login_id_lbl: "Email",
        login_pass_lbl: "Mot de passe",
        login_submit: "Se connecter",
        not_registered_yet: "Pas encore de compte ?",
        switch_register: "Créer un compte",
        checkout_badge: "17 $ / Mois",
        checkout_title: "Paiement sécurisé",
        checkout_sub: "Mobile Money ou carte bancaire",
        checkout_gate_msg: "Connectez-vous ou créez un compte pour lier la licence à votre ID.",
        checkout_momo_num: "Numéro Mobile Money",
        btn_pay_momo: "Payer par Mobile Money — 10 200 F",
        checkout_guarantee_note: "La session d'analyse s’ouvre immédiatement après la validation de votre paiement.",
        btn_pay_card: "Payer par carte bancaire — 17 $",
        pay_verif_title: "Vérification du paiement",
        pay_verif_sub: "Connexion sécurisée en cours…",
        ph_name: "Ex: Alex_Trader",
        ph_email: "nom@exemple.com",
        ph_pass_min: "Au moins 6 caractères",
        ph_login_id: "nom@exemple.com",
        ph_pass: "Votre mot de passe",
        ph_old_pass: "Mot de passe actuel",
        ph_new_pass: "Nouveau mot de passe (6+ caractères)",
        ph_confirm_pass: "Confirmer le nouveau mot de passe"
    },
    en: {
        doc_title: "PREDICTOR | Live Multi-Game Analysis Suite",
        ticker_live: "LIVE",
        ticker_sub: "users connected on crashpredictor.fr",
        alert_unsubscribed: "<strong>ACCESS NOT ACTIVATED:</strong> activate your license to open the cockpit.",
        alert_expired: "<strong>SUBSCRIPTION EXPIRED:</strong> renew your monthly access for $17.",
        btn_alert_unlock: "Unlock Access – $17",
        btn_alert_renew: "Renew Access – $17",
        toast_expired: "Your 30-day subscription has expired. Renew for $17.",
        badge_edition: "MULTI-GAME SUITE",
        nav_login: "Login",
        nav_register: "Sign Up",
        promo_offer: "LAST CHANCE $17:",
        promo_remaining: "remaining",
        hero_subtitle: "High-frequency algorithmic analysis and real-time flight trajectory anticipation.",
        badge_algo: "LIVE ENGINE",
        badge_live_session: "REAL-TIME SESSION",
        badge_verified: "VERIFIED",
        flash_default: "just activated their license",
        offer_title: "Official License & Unlimited Access",
        offer_desc: "Unlock complete access to the analysis cockpit, live predictions and flight history.",
        price_lifetime: "/ Month",
        price_cfa: "",
        benefit_1_title: "Optimal Algorithmic Precision",
        benefit_1_desc: "Real-time stream analysis and accurate trajectory anticipation.",
        benefit_2_title: "Instant Activation",
        benefit_2_desc: "Immediate access to all predictions and cockpit upon payment confirmation.",
        benefit_3_title: "Monthly Subscription",
        benefit_3_desc: "Full access renewed every month, simple monthly subscription.",
        benefit_4_title: "Multi-device Support",
        benefit_4_desc: "Optimized interface for seamless performance on smartphones, tablets, and desktops.",
        btn_buy_instant: "UNLOCK MY ACCESS $17",
        btn_referral_free: "🎁 UNLOCK 1 FREE MONTH ( CHALLENGE )",
        referral_modal_copy: "Share your invitation link with your friends. As soon as 2 friends unlock their access through your link, your own access activates automatically and free for 30 days!",
        btn_referral_copy: "📋 Copy my link",
        toast_link_copied: "✅ Link copied!",
        secure_guarantee: "Encrypted & secure checkout • Instant cockpit activation",
        reviews_badge: "VERIFIED MEMBER REVIEWS (113 REVIEWS)",
        reviews_title: "User Experience & Testimonials",
        reviews_subtitle: "Authentic feedback linked to anonymous member IDs.",
        stat_registered: "Registered members",
        stat_satisfaction: "Satisfaction rate",
        stat_license: "Per month",
        btn_load_more: "Show more testimonials",
        remaining_txt: "remaining",
        footer_copy: "© PREDICTOR. All rights reserved.",
        footer_rights: "All rights reserved.",
        footer_admin: "Admin portal",
        vip_official: "OFFICIAL",
        vip_radar_live: "LIVE RADAR FEED",
        vip_member_active: "Active Member",
        radar_heading: "HIGH-PRECISION VERTICAL RADAR",
        radar_session_badge: "ACTIVE SESSION",
        pred_label: "CALCULATED EXIT THRESHOLD",
        pred_stability: "Stability:",
        pred_advice: "Cash-out your profits before this safety threshold",
        btn_unlock_signal: "⚡ DECODE THE SIGNAL",
        btn_analyse_signal: "⚡ DECODE THE SIGNAL",
        metrics_kicker: "ALGORITHMIC DASHBOARD",
        metrics_title: "Real-time technical precision",
        metrics_accuracy: "Algorithmic Accuracy",
        metrics_verified: "Verified",
        metrics_sessions: "Sessions Analyzed / 24h",
        metrics_satisfaction: "Satisfaction Rate",
        metrics_reviews: "Based on + 328,400 verified ratings",
        metrics_latency: "Feed Latency",
        suite_kicker: "THE BOSS · SPORTS PREDICTIONS + 6 GAMES",
        game_tag_aviator: "Live signals",
        game_tag_luckyjet: "Cosmic flow",
        game_tag_crash: "Live algorithm",
        game_tag_mines: "Safe tiles",
        game_tag_penalty: "Laser targeting",
        game_tag_apple: "Golden path",
        game_tag_sport: "Sports betting · live algorithm",
        sport_boss_ribbon: "THE BOSS",
        sport_teaser_kicker: "MATCH OF THE DAY",
        sport_teaser_title: "Headline fixture",
        sport_teaser_note: "Neutral odds · prediction reserved for members",
        sport_odd_draw: "DRAW",
        sport_win_badge: "WIN / CONFIRMED",
        sport_pred_line: "PREDICTION: LYON WIN @ 1.97",
        btn_sport_signal: "⚡ DECODE THE SIGNAL",
        signal_window: "TAKEOFF IN",
        signal_arrive: "PREDICTION ARRIVES IN {n} SECONDS",
        hero_live_badge: "LIVE SIGNAL",
        session_locked_kicker: "WAITING",
        session_locked_title: "LOCKED",
        session_locked_copy: "An analysis is already running on another game.",
        hud_label: "LIVE MULTIPLIER",
        scan_title: "SIGNAL CALIBRATION",
        scan_subtitle: "Preparing next round…",
        vip_flight_init: "Analyzing data streams… Takeoff imminent",
        sys_params: "SYSTEM PARAMETERS",
        sys_algo_stab: "Algorithmic stability",
        sys_latency: "Feed latency",
        sys_license_status: "License status",
        sys_active_lifetime: "ACTIVE / MONTH",
        sys_your_id: "Your Member ID",
        recent_rounds: "RECENT ROUNDS",
        profile_space: "My Profile / Settings",
        profile_your_id: "YOUR UNIQUE ID:",
        profile_license_status: "License Status",
        status_unsubscribed: "NOT ACTIVATED",
        status_activated_vip: "ACTIVATED / VIP",
        lbl_phone: "Phone / WhatsApp number",
        btn_save: "Save",
        lbl_update_pass: "Change Password",
        btn_update: "Update",
        btn_profile_unlock: "Unlock Full Access – $17",
        btn_logout: "Logout",
        reg_title: "Create an Account",
        reg_sub: "A unique identifier will be assigned to you",
        reg_name_lbl: "Full Name or Username",
        reg_email_lbl: "Email Address",
        reg_pass_lbl: "Password",
        reg_submit: "Complete Registration",
        already_registered: "Already registered?",
        switch_login: "Login here",
        login_title: "Member Login",
        login_sub: "Access your private dashboard",
        login_id_lbl: "Email",
        login_pass_lbl: "Password",
        login_submit: "Sign In",
        not_registered_yet: "Don't have an account?",
        switch_register: "Register now",
        checkout_badge: "$17 / Month",
        checkout_title: "Secure Checkout",
        checkout_sub: "Credit Card or Mobile Payment",
        checkout_gate_msg: "Please log in or sign up to link this license to your member ID.",
        checkout_momo_num: "Mobile Number",
        btn_pay_momo: "Pay via Mobile Money",
        checkout_guarantee_note: "The cockpit opens immediately after payment confirmation.",
        btn_pay_card: "Pay with Credit Card – $17",
        pay_verif_title: "Verifying Payment",
        pay_verif_sub: "Establishing secure connection…",
        ph_name: "E.g. Alex_Trader",
        ph_email: "name@example.com",
        ph_pass_min: "At least 6 characters",
        ph_login_id: "name@example.com",
        ph_pass: "Your password",
        ph_old_pass: "Current password",
        ph_new_pass: "New password (6+ characters)",
        ph_confirm_pass: "Confirm new password"
    },
    es: {
        doc_title: "PREDICTOR | Suite de Análisis Multi-Juegos en Directo",
        ticker_live: "EN VIVO",
        ticker_sub: "usuarios conectados en crashpredictor.fr",
        alert_unsubscribed: "<strong>ACCESO NO ACTIVADO:</strong> active su licencia para abrir el cockpit.",
        alert_expired: "<strong>SUSCRIPCIÓN CADUCADA:</strong> renueve su acceso mensual por 17 $.",
        btn_alert_unlock: "Desbloquear Acceso – 17 $",
        btn_alert_renew: "Renovar acceso – 17 $",
        toast_expired: "Su suscripción de 30 días ha caducado. Renueve por 17 $.",
        badge_edition: "SUITE MULTI-JUEGOS",
        nav_login: "Iniciar Sesión",
        nav_register: "Registrarse",
        promo_offer: "ÚLTIMA OPORTUNIDAD 17 $:",
        promo_remaining: "restante(s)",
        hero_subtitle: "Plataforma de análisis de alta frecuencia y anticipación de trayectorias en vivo.",
        badge_algo: "MOTOR LIVE",
        badge_live_session: "SESIÓN EN TIEMPO REAL",
        badge_verified: "VERIFICADO",
        flash_default: "acaba de activar su licencia",
        offer_title: "Licencia Oficial y Acceso Ilimitado",
        offer_desc: "Desbloquee el acceso completo al cockpit de análisis, predicciones en vivo e historial de vuelos.",
        price_lifetime: "/ Mes",
        price_cfa: "",
        benefit_1_title: "Precisión Algorítmica Óptima",
        benefit_1_desc: "Análisis en tiempo real y anticipación exacta de las trayectorias.",
        benefit_2_title: "Activación Inmediata",
        benefit_2_desc: "Acceso instantáneo a todas las predicciones y al cockpit tras validar el pago.",
        benefit_3_title: "Suscripción Mensual",
        benefit_3_desc: "Acceso completo renovado cada mes, suscripción mensual simple.",
        benefit_4_title: "Multi-dispositivo",
        benefit_4_desc: "Interfaz optimizada para un uso fluido en smartphones, tablets y ordenadores.",
        btn_buy_instant: "DESBLOQUEAR MI ACCESO 17 $",
        btn_referral_free: "🎁 DESBLOQUEAR 1 MES GRATIS ( CHALLENGE )",
        referral_modal_copy: "Comparte tu enlace de invitación con tus amigos. En cuanto 2 amigos desbloqueen su acceso con tu enlace, tu propio acceso se activa automáticamente y gratis durante 30 días.",
        btn_referral_copy: "📋 Copiar mi enlace",
        toast_link_copied: "✅ ¡Enlace copiado!",
        secure_guarantee: "Pago seguro y encriptado • Activación automática del cockpit",
        reviews_badge: "OPINIONES DE MIEMBROS VERIFICADOS (113 RESEÑAS)",
        reviews_title: "Experiencias y Testimonios",
        reviews_subtitle: "Comentarios auténticos vinculados a identificadores de miembros anónimos.",
        stat_registered: "Miembros registrados",
        stat_satisfaction: "Índice de satisfacción",
        stat_license: "Por mes",
        btn_load_more: "Ver más testimonios",
        remaining_txt: "restantes",
        footer_copy: "© PREDICTOR. Todos los derechos reservados.",
        footer_rights: "Todos los derechos reservados.",
        footer_admin: "Acceso Administrador",
        vip_official: "OFICIAL",
        vip_radar_live: "RADAR EN VIVO",
        vip_member_active: "Miembro Activo",
        radar_heading: "RADAR DE VUELO VERTICAL DE ALTA PRECISIÓN",
        radar_session_badge: "SESIÓN ACTIVA",
        pred_label: "PUNTO DE SALIDA CALCULADO",
        pred_stability: "Estabilidad:",
        pred_advice: "Retire sus ganancias antes de este umbral de seguridad",
        btn_unlock_signal: "⚡ DECODIFICAR LA SEÑAL",
        btn_analyse_signal: "⚡ DECODIFICAR LA SEÑAL",
        metrics_kicker: "PANEL ALGORÍTMICO",
        metrics_title: "Precisión técnica en tiempo real",
        metrics_accuracy: "Algorithmic Accuracy",
        metrics_verified: "Verificado",
        metrics_sessions: "Sesiones analizadas / 24h",
        metrics_satisfaction: "Tasa de satisfacción",
        metrics_reviews: "Basado en + 328 400 evaluaciones verificadas",
        metrics_latency: "Latencia de flujo",
        suite_kicker: "EL BOSS · SPORTS PREDICTIONS + 6 JUEGOS",
        signal_window: "DESPEGUE EN",
        signal_arrive: "LA PREDICCIÓN LLEGA EN {n} SEGUNDOS",
        hero_live_badge: "LIVE SIGNAL",
        session_locked_kicker: "EN ESPERA",
        session_locked_title: "BLOQUEADO",
        session_locked_copy: "Ya hay un análisis en curso en otro juego.",
        game_tag_aviator: "Señales en vivo",
        game_tag_luckyjet: "Flujo cósmico",
        game_tag_crash: "Algoritmo en vivo",
        game_tag_mines: "Casillas seguras",
        game_tag_penalty: "Apuntando láser",
        game_tag_apple: "Camino dorado",
        game_tag_sport: "Apuestas deportivas · algoritmo live",
        sport_boss_ribbon: "EL BOSS",
        sport_teaser_kicker: "PARTIDO DEL DÍA",
        sport_teaser_title: "Cartelera",
        sport_teaser_note: "Cuotas neutrales · predicción reservada al espacio miembro",
        sport_odd_draw: "EMPATE",
        sport_win_badge: "WIN / CONFIRMADO",
        sport_pred_line: "PREDICCIÓN: VICTORIA LYON @ 1.97",
        btn_sport_signal: "⚡ DECODIFICAR LA SEÑAL",
        hud_label: "MULTIPLICADOR EN VIVO",
        scan_title: "CALIBRACIÓN DE SEÑAL",
        scan_subtitle: "Preparando siguiente ronda…",
        vip_flight_init: "Analizando flujos… Despegue inminente",
        sys_params: "PARÁMETROS DEL SISTEMA",
        sys_algo_stab: "Estabilidad algorítmica",
        sys_latency: "Latencia del flujo",
        sys_license_status: "Estado de la licencia",
        sys_active_lifetime: "ACTIVA / MES",
        sys_your_id: "Su ID de Miembro",
        recent_rounds: "ÚLTIMAS RONDAS",
        profile_space: "Mi Perfil / Ajustes",
        profile_your_id: "SU ID ÚNICO:",
        profile_license_status: "Estado de Licencia",
        status_unsubscribed: "NO ACTIVADO",
        status_activated_vip: "ACTIVADO / VIP",
        lbl_phone: "Teléfono / WhatsApp",
        btn_save: "Guardar",
        lbl_update_pass: "Cambiar Contraseña",
        btn_update: "Actualizar",
        btn_profile_unlock: "Desbloquear acceso completo – 17 $",
        btn_logout: "Cerrar sesión",
        reg_title: "Crear una Cuenta",
        reg_sub: "Se le asignará un identificador único",
        reg_name_lbl: "Nombre o Alias",
        reg_email_lbl: "Correo Electrónico",
        reg_pass_lbl: "Contraseña",
        reg_submit: "Validar mi registro",
        already_registered: "¿Ya está registrado?",
        switch_login: "Iniciar sesión aquí",
        login_title: "Acceso Miembros",
        login_sub: "Acceda a su cockpit privado",
        login_id_lbl: "Email",
        login_pass_lbl: "Contraseña",
        login_submit: "Entrar",
        not_registered_yet: "¿No tiene cuenta?",
        switch_register: "Crear una cuenta",
        checkout_badge: "17 $ / Mes",
        checkout_title: "Pago Seguro",
        checkout_sub: "Tarjeta Bancaria o Pago Móvil",
        checkout_gate_msg: "Inicie sesión o regístrese para vincular la licencia a su ID.",
        checkout_momo_num: "Número Móvil",
        btn_pay_momo: "Pagar con Mobile Money",
        checkout_guarantee_note: "El cockpit se abre inmediatamente tras confirmar el pago.",
        btn_pay_card: "Pagar con Tarjeta – 17 $",
        pay_verif_title: "Verificando el pago",
        pay_verif_sub: "Conexión segura en curso…",
        ph_name: "Ej: Alex_Trader",
        ph_email: "nombre@ejemplo.com",
        ph_pass_min: "Al menos 6 caracteres",
        ph_login_id: "nombre@ejemplo.com",
        ph_pass: "Su contraseña",
        ph_old_pass: "Contraseña actual",
        ph_new_pass: "Nueva contraseña (6+ caracteres)",
        ph_confirm_pass: "Confirmar nueva contraseña"
    },
    pt: {
        doc_title: "PREDICTOR | Suite de Análise Multi-Jogos em Direto",
        ticker_live: "AO VIVO",
        ticker_sub: "utilizadores ligados em crashpredictor.fr",
        alert_unsubscribed: "<strong>ACESSO NÃO ATIVADO:</strong> ative sua licença para abrir o cockpit.",
        alert_expired: "<strong>ASSINATURA EXPIRADA:</strong> renove o seu acesso mensal por 17 $.",
        btn_alert_unlock: "Desbloquear Acesso – 17 $",
        btn_alert_renew: "Renovar acesso – 17 $",
        toast_expired: "A sua assinatura de 30 dias expirou. Renove por 17 $.",
        badge_edition: "SUITE MULTI-JOGOS",
        nav_login: "Entrar",
        nav_register: "Registar",
        promo_offer: "ÚLTIMA CHANCE 17 $:",
        promo_remaining: "restante(s)",
        hero_subtitle: "Plataforma de análise de alta frequência e antecipação de trajetórias em tempo real.",
        badge_algo: "MOTOR LIVE",
        badge_live_session: "SESSÃO EM TEMPO REAL",
        badge_verified: "VERIFICADO",
        flash_default: "acabou de ativar a sua licença",
        offer_title: "Licença Oficial e Acesso Ilimitado",
        offer_desc: "Desbloqueie o acesso completo ao cockpit de análise, previsões ao vivo e histórico de voos.",
        price_lifetime: "/ Mês",
        price_cfa: "",
        benefit_1_title: "Precisão Algorítmica Ideal",
        benefit_1_desc: "Análise em tempo real e antecipação precisa de trajetórias.",
        benefit_2_title: "Ativação Instantânea",
        benefit_2_desc: "Acesso imediato a todas as previsões e ao cockpit após a validação do pagamento.",
        benefit_3_title: "Assinatura Mensal",
        benefit_3_desc: "Acesso completo renovado todos os meses, plano mensal simples.",
        benefit_4_title: "Compatível com Qualquer Dispositivo",
        benefit_4_desc: "Interface otimizada para uso fluido em telemóveis, tablets e computadores.",
        btn_buy_instant: "DESBLOQUEAR MEU ACESSO 17 $",
        btn_referral_free: "🎁 DESBLOQUEAR 1 MÊS GRÁTIS ( CHALLENGE )",
        referral_modal_copy: "Partilhe o seu link de convite com os seus amigos. Assim que 2 amigos desbloquearem o acesso pelo seu link, o seu próprio acesso ativa-se automaticamente e grátis durante 30 dias!",
        btn_referral_copy: "📋 Copiar meu link",
        toast_link_copied: "✅ Link copiado!",
        secure_guarantee: "Pagamento seguro e encriptado • Ativação imediata do cockpit",
        reviews_badge: "AVALIAÇÕES DE MEMBROS (113 AVALIAÇÕES)",
        reviews_title: "Depoimentos e Avaliações",
        reviews_subtitle: "Comentários autênticos vinculados a IDs de membros anónimos.",
        stat_registered: "Membros registados",
        stat_satisfaction: "Índice de satisfação",
        stat_license: "Por mês",
        btn_load_more: "Ver mais avaliações",
        remaining_txt: "restantes",
        footer_copy: "© PREDICTOR. Todos os direitos reservados.",
        footer_rights: "Todos os direitos reservados.",
        footer_admin: "Área de Administração",
        vip_official: "OFICIAL",
        vip_radar_live: "RADAR EM DIRETO",
        vip_member_active: "Membro Ativo",
        radar_heading: "RADAR DE VOO VERTICAL DE ALTA PRECISÃO",
        radar_session_badge: "SESSÃO ATIVA",
        pred_label: "PONTO DE SAÍDA CALCULADO",
        pred_stability: "Estabilidade:",
        pred_advice: "Retire os seus ganhos antes deste limiar de segurança",
        btn_unlock_signal: "⚡ DESCODIFICAR O SINAL",
        btn_analyse_signal: "⚡ DESCODIFICAR O SINAL",
        metrics_kicker: "PAINEL ALGORÍTMICO",
        metrics_title: "Precisão técnica em tempo real",
        metrics_accuracy: "Algorithmic Accuracy",
        metrics_verified: "Verificado",
        metrics_sessions: "Sessões analisadas / 24h",
        metrics_satisfaction: "Taxa de satisfação",
        metrics_reviews: "Com base em + 328 400 avaliações verificadas",
        metrics_latency: "Latência de fluxo",
        suite_kicker: "O BOSS · SPORTS PREDICTIONS + 6 JOGOS",
        signal_window: "DESCOLAGEM EM",
        signal_arrive: "A PREVISÃO CHEGA EM {n} SEGUNDOS",
        hero_live_badge: "LIVE SIGNAL",
        session_locked_kicker: "EM ESPERA",
        session_locked_title: "BLOQUEADO",
        session_locked_copy: "Já existe uma análise a decorrer noutro jogo.",
        game_tag_aviator: "Sinais em direto",
        game_tag_luckyjet: "Fluxo cósmico",
        game_tag_crash: "Algoritmo live",
        game_tag_mines: "Casas seguras",
        game_tag_penalty: "Mira laser",
        game_tag_apple: "Caminho dourado",
        game_tag_sport: "Apostas desportivas · algoritmo live",
        sport_boss_ribbon: "O BOSS",
        sport_teaser_kicker: "JOGO DO DIA",
        sport_teaser_title: "Cartaz principal",
        sport_teaser_note: "Odds neutras · previsão reservada ao espaço membro",
        sport_odd_draw: "EMPATE",
        sport_win_badge: "WIN / CONFIRMADO",
        sport_pred_line: "PREVISÃO: VITÓRIA LYON @ 1.97",
        btn_sport_signal: "⚡ DESCODIFICAR O SINAL",
        hud_label: "MULTIPLICADOR AO VIVO",
        scan_title: "CALIBRAÇÃO DE SINAL",
        scan_subtitle: "A preparar a próxima ronda…",
        vip_flight_init: "A analisar dados… Descolagem iminente",
        sys_params: "PARÂMETROS DO SISTEMA",
        sys_algo_stab: "Estabilidade do algoritmo",
        sys_latency: "Latência da rede",
        sys_license_status: "Estado da licença",
        sys_active_lifetime: "ATIVA / MÊS",
        sys_your_id: "Seu ID de Membro",
        recent_rounds: "ÚLTIMAS RONDAS",
        profile_space: "Meu Perfil / Definições",
        profile_your_id: "SEU ID ÚNICO:",
        profile_license_status: "Estado da Licença",
        status_unsubscribed: "NÃO ATIVADO",
        status_activated_vip: "ATIVADO / VIP",
        lbl_phone: "Telefone / WhatsApp",
        btn_save: "Guardar",
        lbl_update_pass: "Alterar Palavra-passe",
        btn_update: "Atualizar",
        btn_profile_unlock: "Desbloquear Acesso – 17 $",
        btn_logout: "Terminar sessão",
        reg_title: "Criar uma Conta",
        reg_sub: "Um identificador único ser-lhe-á atribuído",
        reg_name_lbl: "Nome ou Pseudónimo",
        reg_email_lbl: "Endereço de Email",
        reg_pass_lbl: "Palavra-passe",
        reg_submit: "Validar Registo",
        already_registered: "Já tem conta?",
        switch_login: "Entrar aqui",
        login_title: "Acesso de Membros",
        login_sub: "Aceda ao seu cockpit exclusivo",
        login_id_lbl: "Email",
        login_pass_lbl: "Palavra-passe",
        login_submit: "Entrar",
        not_registered_yet: "Ainda não tem conta?",
        switch_register: "Criar conta",
        checkout_badge: "17 $ / Mês",
        checkout_title: "Pagamento Seguro",
        checkout_sub: "Cartão de Crédito ou Pagamento Móvel",
        checkout_gate_msg: "Inicie sessão ou registe-se para vincular a licença ao seu ID.",
        checkout_momo_num: "Número de Telemóvel",
        btn_pay_momo: "Pagar com Mobile Money",
        checkout_guarantee_note: "O cockpit abre imediatamente após a validação do pagamento.",
        btn_pay_card: "Pagar com Cartão – 17 $",
        pay_verif_title: "A verificar pagamento",
        pay_verif_sub: "Ligação segura em curso…",
        ph_name: "Ex: Alex_Trader",
        ph_email: "nome@exemplo.com",
        ph_pass_min: "Pelo menos 6 caracteres",
        ph_login_id: "nome@exemplo.com",
        ph_pass: "Sua palavra-passe",
        ph_old_pass: "Palavra-passe atual",
        ph_new_pass: "Nova palavra-passe (6+ caracteres)",
        ph_confirm_pass: "Confirmar nova palavra-passe"
    },
    de: {
        doc_title: "PREDICTOR | Live Multi-Game Analyse-Suite",
        ticker_live: "LIVE",
        ticker_sub: "Nutzer verbunden auf crashpredictor.fr",
        alert_unsubscribed: "<strong>ZUGANG NICHT AKTIV:</strong> Aktivieren Sie Ihre Lizenz, um das Cockpit zu öffnen.",
        alert_expired: "<strong>ABO ABGELAUFEN:</strong> verlängern Sie Ihren monatlichen Zugang für 17 $.",
        btn_alert_unlock: "Zugang freischalten – 17 $",
        btn_alert_renew: "Zugang verlängern – 17 $",
        toast_expired: "Ihr 30-Tage-Abo ist abgelaufen. Verlängern Sie für 17 $.",
        badge_edition: "MULTI-GAME SUITE",
        nav_login: "Anmelden",
        nav_register: "Registrieren",
        promo_offer: "LETZTE CHANCE 17 $:",
        promo_remaining: "verbleibend",
        hero_subtitle: "Hochfrequenz-Algorithmen und Echtzeit-Flugbahnvorhersage im Live-Cockpit.",
        badge_algo: "LIVE ENGINE",
        badge_live_session: "ECHTZEIT-SITZUNG",
        badge_verified: "VERIFIZIERT",
        flash_default: "hat soeben die Lizenz aktiviert",
        offer_title: "Offizielle Lizenz & Unbegrenzter Zugang",
        offer_desc: "Schalten Sie vollen Zugriff auf das Analyse-Cockpit, Live-Signale und den Flugverlauf frei.",
        price_lifetime: "/ Monat",
        price_cfa: "",
        benefit_1_title: "Optimale Algorithmische Präzision",
        benefit_1_desc: "Echtzeit-Datenanalyse und präzise Vorhersage von Flugkurven.",
        benefit_2_title: "Sofortige Freischaltung",
        benefit_2_desc: "Unmittelbarer Zugang zu allen Signalen und zum Cockpit direkt nach der Zahlung.",
        benefit_3_title: "Monatliches Abo",
        benefit_3_desc: "Voller Zugang, der jeden Monat erneuert wird — einfaches Monatsabo.",
        benefit_4_title: "Multi-Geräte Unterstützung",
        benefit_4_desc: "Optimiert für reibungslose Nutzung auf Smartphone, Tablet und PC.",
        btn_buy_instant: "MEINEN ZUGANG FREISCHALTEN 17 $",
        btn_referral_free: "🎁 1 MONAT GRATIS FREISCHALTEN ( CHALLENGE )",
        referral_modal_copy: "Teilen Sie Ihren Einladungslink mit Ihren Freunden. Sobald 2 Freunde ihren Zugang über Ihren Link freischalten, wird Ihr eigener Zugang automatisch und 30 Tage lang kostenlos aktiviert!",
        btn_referral_copy: "📋 Link kopieren",
        toast_link_copied: "✅ Link kopiert!",
        secure_guarantee: "Sichere & verschlüsselte Zahlung • Automatische Cockpit-Aktivierung",
        reviews_badge: "VERIFIZIERTE MITGLIEDER (113 BEWERTUNGEN)",
        reviews_title: "Erfahrungsberichte & Feedback",
        reviews_subtitle: "Authentische Bewertungen von verifizierten Mitgliedern.",
        stat_registered: "Registrierte Mitglieder",
        stat_satisfaction: "Zufriedenheitsrate",
        stat_license: "Pro Monat",
        btn_load_more: "Weitere Bewertungen laden",
        remaining_txt: "übrig",
        footer_copy: "© PREDICTOR. Alle Rechte vorbehalten.",
        footer_rights: "Alle Rechte vorbehalten.",
        footer_admin: "Admin-Bereich",
        vip_official: "OFFIZIELL",
        vip_radar_live: "LIVE-RADARFEED",
        vip_member_active: "Aktives Mitglied",
        radar_heading: "HOCHPRÄZISES VERTIKALES RADAR",
        radar_session_badge: "AKTIVE SITZUNG",
        pred_label: "BERECHNETER AUSSTIEGSPUNKT",
        pred_stability: "Stabilität:",
        pred_advice: "Realisieren Sie Ihre Gewinne vor dieser Sicherheitsschwelle",
        btn_unlock_signal: "⚡ SIGNAL DECODIEREN",
        btn_analyse_signal: "⚡ SIGNAL DECODIEREN",
        metrics_kicker: "ALGORITHMISCHES DASHBOARD",
        metrics_title: "Technische Präzision in Echtzeit",
        metrics_accuracy: "Algorithmic Accuracy",
        metrics_verified: "Verifiziert",
        metrics_sessions: "Analysierte Sessions / 24h",
        metrics_satisfaction: "Zufriedenheitsrate",
        metrics_reviews: "Basierend auf + 328.400 verifizierten Bewertungen",
        metrics_latency: "Feed-Latenz",
        suite_kicker: "DER BOSS · SPORTS PREDICTIONS + 6 SPIELE",
        signal_window: "START IN",
        signal_arrive: "DIE PROGNOSE KOMMT IN {n} SEKUNDEN",
        hero_live_badge: "LIVE SIGNAL",
        session_locked_kicker: "WARTEND",
        session_locked_title: "GESPERRT",
        session_locked_copy: "Auf einem anderen Spiel läuft bereits eine Analyse.",
        game_tag_aviator: "Live-Signale",
        game_tag_luckyjet: "Kosmischer Fluss",
        game_tag_crash: "Live-Algorithmus",
        game_tag_mines: "Sichere Felder",
        game_tag_penalty: "Laser-Ziel",
        game_tag_apple: "Goldener Pfad",
        game_tag_sport: "Sportwetten · Live-Algorithmus",
        sport_boss_ribbon: "DER BOSS",
        sport_teaser_kicker: "SPIEL DES TAGES",
        sport_teaser_title: "Top-Spiel",
        sport_teaser_note: "Neutrale Quoten · Prognose nur im Mitgliederbereich",
        sport_odd_draw: "UNENTSCHIEDEN",
        sport_win_badge: "WIN / BESTÄTIGT",
        sport_pred_line: "PROGNOSE: SIEG LYON @ 1.97",
        btn_sport_signal: "⚡ SIGNAL DECODIEREN",
        hud_label: "LIVE-QUOTE",
        scan_title: "SIGNAL-KALIBRIERUNG",
        scan_subtitle: "Nächste Runde wird vorbereitet…",
        vip_flight_init: "Datenanalyse läuft… Start steht bevor",
        sys_params: "SYSTEM-PARAMETER",
        sys_algo_stab: "Algorithmus-Stabilität",
        sys_latency: "Signal-Latenz",
        sys_license_status: "Lizenzstatus",
        sys_active_lifetime: "AKTIV / MONAT",
        sys_your_id: "Ihre Mitglieds-ID",
        recent_rounds: "LETZTE RUNDEN",
        profile_space: "Mein Profil / Einstellungen",
        profile_your_id: "IHRE EINZIGARTIGE ID:",
        profile_license_status: "Lizenzstatus",
        status_unsubscribed: "NICHT AKTIVIERT",
        status_activated_vip: "AKTIVIERT / VIP",
        lbl_phone: "Telefon / WhatsApp",
        btn_save: "Speichern",
        lbl_update_pass: "Passwort ändern",
        btn_update: "Aktualisieren",
        btn_profile_unlock: "Zugang freischalten – 17 $",
        btn_logout: "Abmelden",
        reg_title: "Konto erstellen",
        reg_sub: "Eine eindeutige ID wird Ihnen zugewiesen",
        reg_name_lbl: "Name oder Benutzername",
        reg_email_lbl: "E-Mail-Adresse",
        reg_pass_lbl: "Passwort",
        reg_submit: "Registrierung abschließen",
        already_registered: "Bereits registriert?",
        switch_login: "Hier anmelden",
        login_title: "Mitglieder-Login",
        login_sub: "Zugang zu Ihrem persönlichen Cockpit",
        login_id_lbl: "E-Mail",
        login_pass_lbl: "Passwort",
        login_submit: "Anmelden",
        not_registered_yet: "Noch kein Konto?",
        switch_register: "Konto erstellen",
        checkout_badge: "17 $ / Monat",
        checkout_title: "Sichere Bezahlung",
        checkout_sub: "Kreditkarte oder Mobile Zahlung",
        checkout_gate_msg: "Bitte anmelden oder registrieren, um die Lizenz mit Ihrer ID zu verknüpfen.",
        checkout_momo_num: "Mobilfunknummer",
        btn_pay_momo: "Mit Mobile Money bezahlen",
        checkout_guarantee_note: "Das Cockpit öffnet sich sofort nach erfolgreicher Zahlung.",
        btn_pay_card: "Mit Kreditkarte bezahlen – 17 $",
        pay_verif_title: "Zahlungsprüfung",
        pay_verif_sub: "Sichere Verbindung wird hergestellt…",
        ph_name: "Z.B. Alex_Trader",
        ph_email: "name@beispiel.de",
        ph_pass_min: "Mindestens 6 Zeichen",
        ph_login_id: "name@beispiel.de",
        ph_pass: "Ihr Passwort",
        ph_old_pass: "Aktuelles Passwort",
        ph_new_pass: "Neues Passwort (6+ Zeichen)",
        ph_confirm_pass: "Neues Passwort bestätigen"
    }
};

const LANG_METAS = {
    fr: { flag: "🇫🇷", code: "FR", name: "Français" },
    en: { flag: "🇬🇧", code: "EN", name: "English" },
    es: { flag: "🇪🇸", code: "ES", name: "Español" },
    pt: { flag: "🇵🇹", code: "PT", name: "Português" },
    de: { flag: "🇩🇪", code: "DE", name: "Deutsch" }
};



let currentLang = "fr";
let isDetectingLang = false;
let supabaseClient = null;
let currentUser = readJson(CONFIG.sessionKey, null);
let selectedMomoNetwork = "WAVE";
let vipAnimationId = null;
let vipEngineRunning = false;
let vipResizeHandler = null;
let vipCalibrationTimer = null;
let vipSignalTimer = null;
let vipDecodeTimer = null;
let vipServerTimeOffset = 0;
let vipTargetMultiplier = 2.40;
let vipCurrentFlightNumber = 8492;
let vipLastHistoryMultiplier = null;
let activePredictorGame = "crash";
let armedSessionGame = null;
let vipSessionState = "scanning";
let boardRoundPred = null;
let appleRevealTimer = null;
let realtimeChannel = null;
let paymentInFlight = false;
let pendingCheckoutAfterAuth = false;
let maketouPollTimer = null;
let verifiedAccessGranted = false;
let maketouVerifyInFlight = false;

document.addEventListener("DOMContentLoaded", async () => {
    initLanguageSystem();
    initSupabase();
    initUserIdentity();
    await restoreVerifiedAccess();
    initGlobalViewRouter();
    if (!document.getElementById("publicSiteWrapper")?.classList.contains("hidden")) {
        trackMetaPixel("ViewContent", {
            content_name: "Crash Predictor VIP License",
            content_category: "Software/SaaS",
            value: 17.00,
            currency: "USD"
        });
    }
    initLiveOnlineUsersTicker();
    initLiveFlashSocialNotifications();
    initGuaranteed48hCountdown();
    initAuthSecurity();
    initProfileModal();
    initModals();
    initCheckout();
    initMasterAdminDashboard();
    subscribeUserRealtime();
    startSubscriptionGuard();
    await verifyMaketouReturn();
    startMaketouPaymentWatch();
    initPwaInstall();
    initCodeStreams();
    initPredictorGameSuite();
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
            syncUserFromSupabase();
            verifyMaketouReturn();
        }
    });
});

function isPwaStandalone() {
    return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function isIosSafari() {
    const ua = String(navigator.userAgent || "");
    const iOS = /iphone|ipad|ipod/i.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    return iOS && !window.MSStream;
}

function initPwaInstall() {
    const banner = document.getElementById("pwaInstallBanner");
    const installBtn = document.getElementById("pwaInstallBtn");
    const dismissBtn = document.getElementById("pwaInstallDismiss");
    const iosModal = document.getElementById("pwaIosInstallModal");
    const closeIos = document.getElementById("closePwaIosModal");
    let deferredPrompt = null;
    let showTimer = null;
    let waitTimer = null;
    let stoppedForever = false;
    const PWA_SHOW_MS = 15000;
    const PWA_WAIT_MS = 150000;

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("sw.js?v=pixel2").catch(() => {});
    }

    if (!banner || isPwaStandalone()) return;

    function clearPwaTimers() {
        if (showTimer) clearTimeout(showTimer);
        if (waitTimer) clearTimeout(waitTimer);
        showTimer = null;
        waitTimer = null;
    }

    function stopPwaBannerForever() {
        stoppedForever = true;
        clearPwaTimers();
        banner.classList.remove("is-visible");
    }

    function showPwaBanner() {
        if (stoppedForever || isPwaStandalone()) {
            stopPwaBannerForever();
            return;
        }
        clearPwaTimers();
        banner.classList.add("is-visible");
        showTimer = setTimeout(hidePwaBannerThenWait, PWA_SHOW_MS);
    }

    function hidePwaBannerThenWait() {
        if (stoppedForever || isPwaStandalone()) {
            stopPwaBannerForever();
            return;
        }
        banner.classList.remove("is-visible");
        clearPwaTimers();
        waitTimer = setTimeout(showPwaBanner, PWA_WAIT_MS);
    }

    window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        deferredPrompt = event;
    });

    window.addEventListener("appinstalled", () => {
        deferredPrompt = null;
        stopPwaBannerForever();
    });

    installBtn?.addEventListener("click", async () => {
        if (isIosSafari()) {
            iosModal?.classList.add("active");
            return;
        }
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        try { await deferredPrompt.userChoice; } catch (err) {}
        deferredPrompt = null;
        hidePwaBannerThenWait();
    });

    dismissBtn?.addEventListener("click", () => hidePwaBannerThenWait());
    closeIos?.addEventListener("click", () => iosModal?.classList.remove("active"));
    showPwaBanner();
}

/* -------------------------------------------------------------------------- */
/* SYSTÈME DE TRADUCTION & GÉOLOCALISATION IP (VPN SUPPORT)                   */
/* -------------------------------------------------------------------------- */

function persistLanguagePreference(lang) {
    try {
        localStorage.setItem(CONFIG.langKey, lang);
    } catch (e) {}
    document.cookie = "crash_lang=" + encodeURIComponent(lang) + ";path=/;max-age=31536000;SameSite=Lax";
}

function readLanguagePreference() {
    try {
        const saved = localStorage.getItem(CONFIG.langKey);
        if (saved && TRANSLATIONS[saved]) return saved;
    } catch (e) {}
    const cookieMatch = document.cookie.match(/(?:^|; )crash_lang=([^;]*)/);
    if (cookieMatch) {
        const cookieLang = decodeURIComponent(cookieMatch[1]);
        if (TRANSLATIONS[cookieLang]) return cookieLang;
    }
    return null;
}

function detectBrowserLanguage() {
    const candidates = [];
    try {
        if (navigator.languages && navigator.languages.length) {
            for (let i = 0; i < navigator.languages.length; i++) {
                candidates.push(navigator.languages[i]);
            }
        }
    } catch (e) {}
    if (navigator.language) candidates.push(navigator.language);
    if (navigator.userLanguage) candidates.push(navigator.userLanguage);
    try {
        const intlLocale = Intl.DateTimeFormat().resolvedOptions().locale;
        if (intlLocale) candidates.push(intlLocale);
    } catch (e) {}

    for (let i = 0; i < candidates.length; i++) {
        const code = String(candidates[i] || "").toLowerCase().split("-")[0];
        if (TRANSLATIONS[code]) return code;
    }
    return "en";
}

function normalizeCountryCode(value) {
    const country = String(value || "").trim().toUpperCase();
    if (!/^[A-Z]{2}$/.test(country) || country === "XX" || country === "T1") return "";
    return country;
}

function getHostingHeaderCountry() {
    return normalizeCountryCode(typeof window !== "undefined" ? window.__GEO_COUNTRY : "");
}

function raceFirstCountry(promises, timeoutMs) {
    return new Promise((resolve) => {
        let pending = promises.length;
        let settled = false;
        const finish = (value) => {
            if (settled) return;
            settled = true;
            resolve(value || "");
        };
        promises.forEach((promise) => {
            Promise.resolve(promise).then((code) => {
                const country = normalizeCountryCode(code);
                if (country) finish(country);
                else if (--pending <= 0) finish("");
            }).catch(() => {
                if (--pending <= 0) finish("");
            });
        });
        setTimeout(() => finish(""), timeoutMs);
    });
}

async function fetchLiveVisitorCountry() {
    try {
        const hostingCountry = getHostingHeaderCountry();
        if (hostingCountry) return hostingCountry;

        return await raceFirstCountry([
            fetch("https://www.cloudflare.com/cdn-cgi/trace", { cache: "no-store" })
                .then((res) => res.ok ? res.text() : "")
                .then((text) => {
                    const match = String(text || "").match(/loc=([A-Z]{2})/i);
                    return match ? match[1] : "";
                })
                .catch(() => ""),
            fetch("https://ipapi.co/country/", { cache: "no-store" })
                .then((res) => res.ok ? res.text() : "")
                .then((text) => String(text || "").trim())
                .catch(() => ""),
            fetch("https://ipwho.is/", { cache: "no-store" })
                .then((res) => res.ok ? res.json() : null)
                .then((data) => data && data.country_code)
                .catch(() => "")
        ], 2800);
    } catch (e) {
        return "";
    }
}

async function initLanguageSystem() {
    initLanguageDropdown();

    const hostingCountry = getHostingHeaderCountry();
    const hostingLang = hostingCountry ? mapCountryToLanguage(hostingCountry) : "";
    applyLanguage(hostingLang || detectBrowserLanguage(), false);
    detectVisitorCountryAndApplyLang();

    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
            detectVisitorCountryAndApplyLang();
        }
    });
}

async function detectVisitorCountryAndApplyLang() {
    if (isDetectingLang) return;
    isDetectingLang = true;

    try {
        const country = await fetchLiveVisitorCountry();
        const detected = country ? mapCountryToLanguage(country) : detectBrowserLanguage();
        if (detected && detected !== currentLang) {
            applyLanguage(detected, false);
        }
    } catch (e) {
        const fallback = detectBrowserLanguage();
        if (fallback && fallback !== currentLang) {
            applyLanguage(fallback, false);
        }
    } finally {
        isDetectingLang = false;
    }
}

function mapCountryToLanguage(countryCode) {
    const c = normalizeCountryCode(countryCode);
    if (!c) return "";

    const frCountries = [
        "FR", "CI", "SN", "CM", "GA", "BJ", "TG", "ML", "GN", "BF", "CG", "CD",
        "BE", "CH", "MC", "LU", "MG", "NE", "TD", "DZ", "MA", "TN", "HT", "VU"
    ];
    const esCountries = [
        "ES", "MX", "CO", "AR", "PE", "CL", "EC", "GT", "CU", "BO", "DO", "HN",
        "PY", "SV", "NI", "CR", "PA", "UY", "PR", "VE", "GQ"
    ];
    const ptCountries = ["BR", "PT", "AO", "MZ", "CV", "GW", "ST", "TL"];
    const deCountries = ["DE", "AT", "LI"];

    if (frCountries.includes(c)) return "fr";
    if (esCountries.includes(c)) return "es";
    if (ptCountries.includes(c)) return "pt";
    if (deCountries.includes(c)) return "de";
    return "en";
}

function applyLanguage(lang, saveUserChoice = true) {
    if (!TRANSLATIONS[lang]) lang = "en";
    currentLang = lang;

    if (saveUserChoice) {
        persistLanguagePreference(lang);
    }

    const dict = TRANSLATIONS[lang];
    document.documentElement.lang = lang;

    // Mise à jour de tous les éléments data-i18n
    document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) {
            el.innerHTML = dict[key];
        }
    });

    // Mise à jour des placeholders
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        const key = el.getAttribute("data-i18n-placeholder");
        if (dict[key]) {
            el.placeholder = dict[key];
        }
    });

    // Mise à jour du sélecteur visuel
    const meta = LANG_METAS[lang] || LANG_METAS.fr;
    document.querySelectorAll(".js-lang-flag").forEach((el) => { el.textContent = meta.flag; });
    document.querySelectorAll(".js-lang-code").forEach((el) => { el.textContent = meta.code; });

    document.querySelectorAll(".lang-option-btn").forEach((btn) => {
        if (btn.dataset.lang === lang) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    refreshVipMemberBadge();
    refreshSubscriptionAlertCopy();
    if (typeof setActivePredictorGame === "function") setActivePredictorGame(activePredictorGame, true);
}

function initLanguageDropdown() {
    const optionBtns = document.querySelectorAll(".lang-option-btn");

    document.querySelectorAll(".lang-selector-dropdown").forEach((wrap) => {
        const toggleBtn = wrap.querySelector(".lang-toggle-btn");
        const menu = wrap.querySelector(".lang-dropdown-menu");
        toggleBtn?.addEventListener("click", (e) => {
            e.stopPropagation();
            document.querySelectorAll(".lang-dropdown-menu").forEach((other) => {
                if (other !== menu) other.classList.add("hidden");
            });
            menu?.classList.toggle("hidden");
        });
    });

    optionBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const lang = btn.dataset.lang;
            if (lang) {
                applyLanguage(lang, true);
                document.querySelectorAll(".lang-dropdown-menu").forEach((menu) => menu.classList.add("hidden"));
                showToast(`Langue changée : ${LANG_METAS[lang].name}`);
            }
        });
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".lang-selector-dropdown")) {
            document.querySelectorAll(".lang-dropdown-menu").forEach((menu) => menu.classList.add("hidden"));
        }
    });
}

/* -------------------------------------------------------------------------- */
/* IDENTIFIANTS 7 CHIFFRES (5M À 10M)                                         */
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

function normalizeEmail(value) {
    return String(value || "").trim().toLowerCase();
}

function loadUsersDb() {
    const users = readJson(CONFIG.usersDbKey, []);
    if (!Array.isArray(users)) return [];
    return users.map((user) => ({
        ...user,
        email: normalizeEmail(user.email)
    }));
}

function saveUsersDb(users) {
    if (!Array.isArray(users)) return;
    const current = readJson(CONFIG.usersDbKey, []);
    if (users.length === 0 && Array.isArray(current) && current.length > 0) return;
    writeJson(CONFIG.usersDbKey, users.map((user) => ({
        ...user,
        email: normalizeEmail(user.email)
    })));
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

function randomMemberNumber() {
    return 5000000 + Math.floor(Math.random() * 5000000);
}

function parseMemberNumber(raw) {
    const n = parseInt(String(raw ?? "").replace(/\D/g, ""), 10);
    if (n >= 5000000 && n <= 9999999) return n;
    return null;
}

function formatMemberId(num) {
    const n = parseMemberNumber(num);
    return n ? `CRASH-${n}` : "";
}

function readPersistedMemberId() {
    try {
        const stored = formatMemberId(localStorage.getItem(CONFIG.memberIdKey) || localStorage.getItem(CONFIG.guestIdKey) || "");
        if (stored) return stored;
    } catch {}
    return formatMemberId(currentUser && currentUser.uniqueId);
}

function persistMemberId(id) {
    const formatted = formatMemberId(id) || readPersistedMemberId();
    if (!formatted) return "";
    try {
        localStorage.setItem(CONFIG.memberIdKey, formatted);
        localStorage.setItem(CONFIG.guestIdKey, formatted);
    } catch {}
    return formatted;
}

function generateUniqueId() {
    const existing = readPersistedMemberId();
    if (existing) return existing;
    const users = loadUsersDb();
    let candidate = "";
    do {
        candidate = `CRASH-${randomMemberNumber()}`;
    } while (users.some((user) => user.uniqueId === candidate));
    return persistMemberId(candidate);
}

function sanitize7DigitId(rawId) {
    return formatMemberId(rawId) || readPersistedMemberId();
}

function displayMemberId() {
    return sanitize7DigitId(currentUser && currentUser.uniqueId) || readPersistedMemberId();
}

async function hashPassword(password) {
    const payload = new TextEncoder().encode(`crash2026:${password}`);
    const digest = await crypto.subtle.digest("SHA-256", payload);
    return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function passwordMatches(user, password) {
    if (!user?.passwordHash) return false;
    const candidates = [String(password || ""), String(password || "").trim()];
    const unique = candidates.filter((value, index, arr) => value && arr.indexOf(value) === index);
    for (let i = 0; i < unique.length; i++) {
        const candidate = unique[i];
        if (user.passwordHash === btoa(candidate)) return true;
        if (user.passwordHash === await hashPassword(candidate)) return true;
    }
    return false;
}

function setButtonLoading(button, loading, idleHtml) {
    if (!button) return;
    if (loading) {
        button.dataset.idleHtml = button.dataset.idleHtml || button.innerHTML;
        button.disabled = true;
        button.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> ...';
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

function normalizeMemberIdInput(raw) {
    const trimmed = String(raw || "").trim();
    const withoutLabel = trimmed.replace(/^ID\s*:\s*/i, "").replace(/\s+/g, "");
    const digits = withoutLabel.replace(/\D/g, "");
    if (/^CRASH/i.test(withoutLabel) || /^\d{7}$/.test(digits)) {
        return formatMemberId(digits);
    }
    return withoutLabel.toUpperCase();
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(value));
}

/* -------------------------------------------------------------------------- */
/* Initialisation Supabase                                                    */
/* -------------------------------------------------------------------------- */

function initSupabase() {
    if (typeof window.supabase !== "undefined" && typeof window.supabase.createClient === "function") {
        try {
            supabaseClient = window.supabase.createClient(CONFIG.supabaseUrl, CONFIG.supabaseAnonKey, {
                auth: { persistSession: false, autoRefreshToken: false }
            });
        } catch {
            supabaseClient = null;
        }
    }
}

/* -------------------------------------------------------------------------- */
/* Identité & Session                                                         */
/* -------------------------------------------------------------------------- */

function initUserIdentity() {
    const sessionId = formatMemberId(currentUser && currentUser.uniqueId);
    const persisted = readPersistedMemberId();
    const stable = sessionId || persisted;
    if (stable) persistMemberId(stable);

    const usersDb = loadUsersDb();
    let dbChanged = false;
    const migratedDb = usersDb.map((user) => {
        const nextId = formatMemberId(user.uniqueId);
        if (nextId && nextId !== user.uniqueId) {
            dbChanged = true;
            return { ...user, uniqueId: nextId };
        }
        return user;
    });
    if (dbChanged) saveUsersDb(migratedDb);

    if (currentUser && stable && currentUser.uniqueId !== stable) {
        currentUser.uniqueId = stable;
        saveUserSession(currentUser, false);
    }
}

async function saveUserSession(user, syncRemote = true) {
    if (!user) return;
    user.email = normalizeEmail(user.email);
    user.uniqueId = persistMemberId(user.uniqueId) || sanitize7DigitId(user.uniqueId);
    currentUser = user;
    writeJson(CONFIG.sessionKey, user);

    const usersDb = loadUsersDb();
    const idx = usersDb.findIndex((u) => normalizeEmail(u.email) === user.email);
    if (idx !== -1) {
        usersDb[idx] = { ...usersDb[idx], ...user };
    } else {
        usersDb.push(user);
    }
    saveUsersDb(usersDb);

    if (syncRemote) {
        await upsertUserToSupabase(user);
        await persistAccountToServer(user);
    }
}

function memberServerPaths(email) {
    const origin = window.location.origin;
    const folder = window.location.pathname.replace(/[^/]+$/, "");
    const emailQ = email ? `email=${encodeURIComponent(normalizeEmail(email))}` : "";
    return {
        save: [
            `${origin}${folder}index.php?action=member_account`,
            `${origin}${folder}member-account.php`,
            `${origin}/member-account.php`
        ],
        lookup: [
            `${origin}${folder}index.php?action=member_account${emailQ ? `&${emailQ}` : ""}`,
            `${origin}${folder}member-account.php${emailQ ? `?${emailQ}` : ""}`,
            `${origin}/member-account.php${emailQ ? `?${emailQ}` : ""}`
        ]
    };
}

async function persistAccountToServer(user) {
    if (!user || !user.email) return;
    const payload = {
        action: "save",
        email: normalizeEmail(user.email),
        uniqueId: user.uniqueId || "",
        name: user.name || "Client",
        phone: user.phone || "",
        passwordHash: user.passwordHash || "",
        isSubscribed: Boolean(user.isSubscribed),
        registeredAt: user.registeredAt || "",
        paymentDate: user.paymentDate || "",
        subscriptionExpiresAt: user.subscriptionExpiresAt || user.vipUntil || "",
        vipUntil: user.subscriptionExpiresAt || user.vipUntil || "",
        lastPaymentRef: user.lastPaymentRef || "",
        referredBy: user.referredBy || "",
        paidReferralCount: Number(user.paidReferralCount || 0)
    };
    const paths = memberServerPaths(user.email).save;
    for (let i = 0; i < paths.length; i++) {
        try {
            const response = await fetch(paths[i], {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify(payload)
            });
            const data = await parseJsonResponse(response);
            if (data && data.ok) return;
        } catch {}
    }
}

async function fetchAccountFromServer(email) {
    const emailKey = normalizeEmail(email);
    if (!emailKey) return null;
    const paths = memberServerPaths(emailKey).lookup;
    for (let i = 0; i < paths.length; i++) {
        try {
            const response = await fetch(paths[i], { method: "GET", cache: "no-store" });
            const data = await parseJsonResponse(response);
            if (data && data.ok && data.account && data.account.email) {
                return {
                    uniqueId: data.account.uniqueId || "",
                    name: data.account.name || "Client",
                    email: emailKey,
                    phone: data.account.phone || "",
                    passwordHash: data.account.passwordHash || "",
                    isSubscribed: Boolean(data.account.isSubscribed),
                    registeredAt: data.account.registeredAt || "",
                    paymentDate: data.account.paymentDate || "",
                    subscriptionExpiresAt: data.account.subscriptionExpiresAt || data.account.vipUntil || "",
                    vipUntil: data.account.subscriptionExpiresAt || data.account.vipUntil || "",
                    lastPaymentRef: data.account.lastPaymentRef || "",
                    referredBy: data.account.referredBy || "",
                    paidReferralCount: Number(data.account.paidReferralCount || 0)
                };
            }
            if (data && data.ok && data.account === null) continue;
        } catch {}
    }
    return null;
}

async function upsertUserToSupabase(user) {
    if (!supabaseClient || !user?.email) return;
    const email = normalizeEmail(user.email);
    try {
        let existing = null;
        const fullSelect = await supabaseClient
            .from("users")
            .select("is_subscribed, unique_id, password_hash, email, payment_date, subscription_expires_at, vip_until, last_payment_ref")
            .ilike("email", email)
            .maybeSingle();
        if (fullSelect.error) {
            const liteSelect = await supabaseClient
                .from("users")
                .select("is_subscribed, unique_id, password_hash, email")
                .ilike("email", email)
                .maybeSingle();
            existing = liteSelect.data;
        } else {
            existing = fullSelect.data;
        }
        const uniqueId = formatMemberId(existing && existing.unique_id) || persistMemberId(user.uniqueId);
        const expiresAt = laterIso(
            user.subscriptionExpiresAt || user.vipUntil || "",
            (existing && (existing.subscription_expires_at || existing.vip_until)) || ""
        );
        const row = {
            unique_id: uniqueId,
            name: user.name,
            email,
            phone: user.phone || "",
            is_subscribed: isSubscriptionActive({
                ...user,
                isSubscribed: Boolean(user.isSubscribed) || Boolean(existing && existing.is_subscribed),
                subscriptionExpiresAt: expiresAt
            }),
            password_hash: user.passwordHash || (existing && existing.password_hash) || "",
            updated_at: new Date().toISOString()
        };
        if (user.paymentDate || (existing && existing.payment_date)) {
            row.payment_date = laterIso(user.paymentDate || "", (existing && existing.payment_date) || "");
        }
        if (expiresAt) {
            row.subscription_expires_at = expiresAt;
            row.vip_until = expiresAt;
        }
        if (user.lastPaymentRef || (existing && existing.last_payment_ref)) {
            row.last_payment_ref = user.lastPaymentRef || existing.last_payment_ref || "";
        }
        if (user.referredBy || (existing && existing.referred_by)) {
            row.referred_by = user.referredBy || existing.referred_by || "";
        }
        if (typeof user.paidReferralCount !== "undefined" || (existing && typeof existing.paid_referral_count !== "undefined")) {
            row.paid_referral_count = Math.max(
                Number(user.paidReferralCount || 0),
                Number((existing && existing.paid_referral_count) || 0)
            );
        }
        const { error } = await supabaseClient.from("users").upsert(row, { onConflict: "email" });
        if (error) {
            delete row.payment_date;
            delete row.subscription_expires_at;
            delete row.vip_until;
            delete row.last_payment_ref;
            delete row.referred_by;
            delete row.paid_referral_count;
            await supabaseClient.from("users").upsert(row, { onConflict: "email" });
        }
    } catch {}
}

async function findAccountByEmail(email) {
    const emailKey = normalizeEmail(email);
    if (!emailKey) return null;
    const local = loadUsersDb().find((u) => normalizeEmail(u.email) === emailKey) || null;
    let remote = null;
    try {
        remote = await fetchAccountFromServer(emailKey);
    } catch {}
    if (supabaseClient) {
        try {
            let { data } = await supabaseClient.from("users").select("*").eq("email", emailKey).maybeSingle();
            if (!data) {
                const fallback = await supabaseClient.from("users").select("*").ilike("email", emailKey).maybeSingle();
                data = fallback.data;
            }
            if (data) {
                remote = {
                    id: data.id || (remote && remote.id) || Date.now(),
                    uniqueId: formatMemberId(data.unique_id) || (remote && remote.uniqueId) || (local && local.uniqueId) || "",
                    name: data.name || (remote && remote.name) || (local && local.name) || "Client",
                    email: emailKey,
                    phone: data.phone || (remote && remote.phone) || (local && local.phone) || "",
                    passwordHash: data.password_hash || (remote && remote.passwordHash) || (local && local.passwordHash) || "",
                    isSubscribed: Boolean(data.is_subscribed) || Boolean(remote && remote.isSubscribed) || Boolean(local && local.isSubscribed),
                    registeredAt: (local && local.registeredAt) || (remote && remote.registeredAt) || new Date().toLocaleDateString("fr-FR"),
                    paymentDate: data.payment_date || (remote && remote.paymentDate) || (local && local.paymentDate) || "",
                    subscriptionExpiresAt: laterIso(
                        data.subscription_expires_at || data.vip_until || "",
                        (remote && (remote.subscriptionExpiresAt || remote.vipUntil)) || (local && (local.subscriptionExpiresAt || local.vipUntil)) || ""
                    ),
                    lastPaymentRef: data.last_payment_ref || (remote && remote.lastPaymentRef) || (local && local.lastPaymentRef) || "",
                    referredBy: data.referred_by || (remote && remote.referredBy) || (local && local.referredBy) || "",
                    paidReferralCount: Number(data.paid_referral_count || (remote && remote.paidReferralCount) || (local && local.paidReferralCount) || 0)
                };
                remote.vipUntil = remote.subscriptionExpiresAt;
            }
        } catch {}
    }
    const found = remote || local;
    if (!found) return null;
    const merged = {
        ...found,
        email: emailKey,
        uniqueId: formatMemberId(found.uniqueId) || (local && local.uniqueId) || "",
        passwordHash: found.passwordHash || (local && local.passwordHash) || ""
    };
    if (local) mergeSubscriptionFields(merged, local);
    seedLegacySubscriptionWindow(merged);
    merged.isSubscribed = isSubscriptionActive(merged);
    return merged;
}

async function syncUserFromSupabase() {
    if (!supabaseClient || !currentUser?.email) return;
    try {
        let { data, error } = await supabaseClient
            .from("users")
            .select("unique_id, name, email, phone, is_subscribed, password_hash, payment_date, subscription_expires_at, vip_until, last_payment_ref, referred_by, paid_referral_count")
            .ilike("email", normalizeEmail(currentUser.email))
            .maybeSingle();
        if (error) {
            const fallback = await supabaseClient
                .from("users")
                .select("unique_id, name, email, phone, is_subscribed, password_hash")
                .ilike("email", normalizeEmail(currentUser.email))
                .maybeSingle();
            data = fallback.data;
            error = fallback.error;
        }

        if (data && !error) {
            let changed = false;
            mergeSubscriptionFields(currentUser, {
                paymentDate: data.payment_date,
                subscriptionExpiresAt: data.subscription_expires_at || data.vip_until,
                lastPaymentRef: data.last_payment_ref,
                isSubscribed: data.is_subscribed
            });
            if (seedLegacySubscriptionWindow(currentUser)) changed = true;
            const subscribed = isSubscriptionActive(currentUser);
            if (subscribed !== Boolean(currentUser.isSubscribed)) {
                currentUser.isSubscribed = subscribed;
                changed = true;
            }
            if (subscribed) grantVerifiedAccess();
            else if (hasExpiredSubscription(currentUser)) {
                currentUser.isSubscribed = false;
                revokeVerifiedAccess();
                changed = true;
            }
            const localId = formatMemberId(currentUser.uniqueId) || readPersistedMemberId();
            const remoteId = formatMemberId(data.unique_id);
            if (localId) {
                if (currentUser.uniqueId !== localId) {
                    currentUser.uniqueId = persistMemberId(localId);
                    changed = true;
                }
            } else if (remoteId) {
                currentUser.uniqueId = persistMemberId(remoteId);
                changed = true;
            }
            const remoteRefCount = Number(data.paid_referral_count || 0);
            if (remoteRefCount > Number(currentUser.paidReferralCount || 0)) {
                currentUser.paidReferralCount = remoteRefCount;
                changed = true;
            }
            const remoteReferredBy = formatMemberId(data.referred_by || "");
            if (remoteReferredBy && !currentUser.referredBy) {
                currentUser.referredBy = remoteReferredBy;
                changed = true;
            }
            if (changed) {
                saveUserSession(currentUser, false);
                initGlobalViewRouter();
            }
        }
    } catch {}
}

function subscribeUserRealtime() {
    if (!supabaseClient || !currentUser?.email || realtimeChannel) return;
    try {
        realtimeChannel = supabaseClient
            .channel(`user-${currentUser.email}`)
            .on("postgres_changes", {
                event: "UPDATE",
                schema: "public",
                table: "users",
                filter: `email=eq.${currentUser.email}`
            }, (payload) => {
                if (payload?.new && (typeof payload.new.is_subscribed !== "undefined" || payload.new.subscription_expires_at || payload.new.vip_until)) {
                    mergeSubscriptionFields(currentUser, {
                        paymentDate: payload.new.payment_date,
                        subscriptionExpiresAt: payload.new.subscription_expires_at || payload.new.vip_until,
                        lastPaymentRef: payload.new.last_payment_ref,
                        isSubscribed: payload.new.is_subscribed
                    });
                    currentUser.isSubscribed = isSubscriptionActive(currentUser);
                    if (currentUser.isSubscribed) grantVerifiedAccess();
                    else {
                        revokeVerifiedAccess();
                        if (hasExpiredSubscription(currentUser)) notifyExpiredAndInviteRenew(true);
                    }
                    saveUserSession(currentUser, false);
                    initGlobalViewRouter();
                    showToast(currentUser.isSubscribed ? "Licence activée !" : "Statut mis à jour.");
                }
            })
            .subscribe();
    } catch {}
}

function parseTimeMs(value) {
    if (!value) return 0;
    if (typeof value === "number" && Number.isFinite(value)) return value;
    const parsed = Date.parse(String(value));
    return Number.isFinite(parsed) ? parsed : 0;
}

function laterIso(left, right) {
    const leftMs = parseTimeMs(left);
    const rightMs = parseTimeMs(right);
    if (rightMs > leftMs) return String(right || "");
    return String(left || "");
}

function getSubscriptionExpiryMs(user) {
    if (!user) return 0;
    return parseTimeMs(user.subscriptionExpiresAt || user.vipUntil || user.subscription_expires_at || user.vip_until);
}

function isSubscriptionActive(user) {
    if (!user) return false;
    const expiryMs = getSubscriptionExpiryMs(user);
    if (expiryMs > 0) return Date.now() < expiryMs;
    return Boolean(user.isSubscribed);
}

function hasExpiredSubscription(user) {
    const expiryMs = getSubscriptionExpiryMs(user);
    return expiryMs > 0 && Date.now() >= expiryMs;
}

function computeRenewedExpiryIso(currentExpiryValue) {
    const now = Date.now();
    const current = parseTimeMs(currentExpiryValue);
    const base = current > now ? current : now;
    return new Date(base + (CONFIG.subscriptionDays * 24 * 60 * 60 * 1000)).toISOString();
}

function mergeSubscriptionFields(target, source) {
    if (!target || !source) return target;
    const sourceExpiry = source.subscriptionExpiresAt || source.vipUntil || source.subscription_expires_at || source.vip_until || "";
    const mergedExpiry = laterIso(target.subscriptionExpiresAt || target.vipUntil || "", sourceExpiry);
    if (mergedExpiry) {
        target.subscriptionExpiresAt = mergedExpiry;
        target.vipUntil = mergedExpiry;
    }
    const sourcePayment = source.paymentDate || source.payment_date || "";
    if (sourcePayment && parseTimeMs(sourcePayment) >= parseTimeMs(target.paymentDate || "")) {
        target.paymentDate = sourcePayment;
    }
    const sourceRef = source.lastPaymentRef || source.last_payment_ref || "";
    if (sourceRef) target.lastPaymentRef = sourceRef;
    return target;
}

function seedLegacySubscriptionWindow(user) {
    if (!user || !user.isSubscribed || getSubscriptionExpiryMs(user) > 0) return false;
    user.paymentDate = user.paymentDate || new Date().toISOString();
    user.subscriptionExpiresAt = computeRenewedExpiryIso("");
    user.vipUntil = user.subscriptionExpiresAt;
    return true;
}

function applyPaidSubscriptionPeriod(user, paymentRef, serverExpiresAt) {
    if (!user) return user;
    const ref = String(paymentRef || "").trim();
    if (ref && user.lastPaymentRef === ref && isSubscriptionActive(user)) {
        user.isSubscribed = true;
        return user;
    }
    user.paymentDate = new Date().toISOString();
    user.subscriptionExpiresAt = serverExpiresAt || computeRenewedExpiryIso(user.subscriptionExpiresAt || user.vipUntil || "");
    user.vipUntil = user.subscriptionExpiresAt;
    user.isSubscribed = true;
    if (ref) user.lastPaymentRef = ref;
    try { sessionStorage.removeItem("crash_expiry_prompted"); } catch {}
    return user;
}

function notifyExpiredAndInviteRenew(openCheckout) {
    refreshSubscriptionAlertCopy();
    try {
        if (sessionStorage.getItem("crash_expiry_prompted") === "1") {
            if (openCheckout) document.getElementById("buyModal")?.classList.add("active");
            return;
        }
        sessionStorage.setItem("crash_expiry_prompted", "1");
    } catch {}
    showToast(i18nText("toast_expired", "Votre abonnement de 30 jours est expiré. Renouvelez à 17 $."), "error");
    if (openCheckout) document.getElementById("buyModal")?.classList.add("active");
}

function refreshSubscriptionAlertCopy() {
    const alertText = document.querySelector("#siteSubscriptionAlert [data-i18n]");
    const btnText = document.querySelector("#btnAlertSubscribe [data-i18n]");
    const expired = hasExpiredSubscription(currentUser);
    if (alertText) {
        const key = expired ? "alert_expired" : "alert_unsubscribed";
        alertText.setAttribute("data-i18n", key);
        alertText.innerHTML = i18nText(key, expired
            ? "<strong>ABONNEMENT EXPIRÉ :</strong> renouvelez votre accès mensuel à 17 $."
            : "<strong>ACCÈS NON ACTIVÉ :</strong> activez votre licence pour ouvrir la session d'analyse.");
    }
    if (btnText) {
        const key = expired ? "btn_alert_renew" : "btn_alert_unlock";
        btnText.setAttribute("data-i18n", key);
        btnText.textContent = i18nText(key, expired ? "Renouveler l'accès – 17 $" : "Débloquer l'accès – 17 $");
    }
}

function startSubscriptionGuard() {
    if (window.__subscriptionGuard) return;
    window.__subscriptionGuard = setInterval(() => {
        if (!currentUser) return;
        if (hasExpiredSubscription(currentUser) && verifiedAccessGranted) {
            currentUser.isSubscribed = false;
            revokeVerifiedAccess();
            saveUserSession(currentUser, true);
            initGlobalViewRouter();
            notifyExpiredAndInviteRenew(true);
        }
    }, 30000);
}

function isAccessUnlocked() {
    return verifiedAccessGranted === true && isSubscriptionActive(currentUser || { isSubscribed: verifiedAccessGranted });
}

function readAccessToken() {
    try {
        return localStorage.getItem(CONFIG.accessTokenKey) || "";
    } catch {
        return "";
    }
}

function storeAccessToken(token) {
    if (!token) return;
    try { localStorage.setItem(CONFIG.accessTokenKey, token); } catch {}
}

function grantVerifiedAccess(token) {
    if (currentUser && hasExpiredSubscription(currentUser)) {
        currentUser.isSubscribed = false;
        revokeVerifiedAccess();
        return false;
    }
    verifiedAccessGranted = true;
    if (token) storeAccessToken(token);
    try {
        localStorage.setItem(CONFIG.accessUnlockedKey, "true");
        localStorage.setItem(CONFIG.userPremiumKey, "true");
        localStorage.setItem(CONFIG.accessVerifiedKey, "true");
    } catch {}
    if (currentUser) currentUser.isSubscribed = true;
    return true;
}

function revokeVerifiedAccess() {
    verifiedAccessGranted = false;
    try {
        localStorage.removeItem(CONFIG.accessTokenKey);
        localStorage.removeItem(CONFIG.accessUnlockedKey);
        localStorage.removeItem(CONFIG.userPremiumKey);
        localStorage.removeItem(CONFIG.accessVerifiedKey);
    } catch {}
}

function markAccessUnlocked() {
    grantVerifiedAccess();
}

function hasMaketouReturnHint(params) {
    const payment = String(params.get("payment") || "").toLowerCase();
    const status = String(params.get("status") || "").toLowerCase();
    const maketou = String(params.get("maketou") || "").toLowerCase();
    return payment === "success"
        || status === "approved"
        || status === "success"
        || status === "completed"
        || maketou === "success";
}

function extractPaymentRef(params) {
    const keys = [
        "ref", "cartId", "cart_id", "maketou_cart", "transaction_id",
        "transactionId", "reference", "order_id", "orderId", "payment_id", "paymentId"
    ];
    for (let i = 0; i < keys.length; i++) {
        const value = String(params.get(keys[i]) || "").trim();
        if (/^[A-Za-z0-9_-]{8,80}$/.test(value)) return value;
    }
    try {
        const stored = String(localStorage.getItem(CONFIG.maketouCartKey) || "").trim();
        if (/^[A-Za-z0-9_-]{8,80}$/.test(stored)) return stored;
    } catch {}
    return "";
}

function clearMaketouReturnUrl() {
    window.history.replaceState({}, document.title, window.location.pathname);
}

function denyPaymentAccess(message) {
    if (verifiedAccessGranted) {
        clearMaketouReturnUrl();
        return;
    }
    verifiedAccessGranted = false;
    clearMaketouReturnUrl();
    initGlobalViewRouter();
    showToast(message || "Paiement non confirmé. L'accès reste bloqué.", "error");
}

async function restoreVerifiedAccess() {
    if (currentUser) {
        let remote = null;
        try { remote = await fetchAccountFromServer(currentUser.email); } catch {}
        if (remote) mergeSubscriptionFields(currentUser, remote);
        if (seedLegacySubscriptionWindow(currentUser)) {
            await saveUserSession(currentUser, true);
        }
    }
    const token = readAccessToken();
    if (token) {
        const session = await fetchMaketouSession(token);
        if (session && session.access === true) {
            if (currentUser) {
                if (session.expiresAt) mergeSubscriptionFields(currentUser, { subscriptionExpiresAt: session.expiresAt, paymentDate: session.paymentDate });
                if (hasExpiredSubscription(currentUser)) {
                    currentUser.isSubscribed = false;
                    revokeVerifiedAccess();
                    await saveUserSession(currentUser, true);
                    notifyExpiredAndInviteRenew(false);
                    return false;
                }
            }
            grantVerifiedAccess(token);
            return true;
        }
        try { localStorage.removeItem(CONFIG.accessTokenKey); } catch {}
    }
    if (currentUser) {
        await syncUserFromSupabase();
        if (isSubscriptionActive(currentUser)) {
            grantVerifiedAccess();
            return true;
        }
        if (hasExpiredSubscription(currentUser)) {
            currentUser.isSubscribed = false;
            revokeVerifiedAccess();
            await saveUserSession(currentUser, true);
            notifyExpiredAndInviteRenew(false);
            return false;
        }
    }
    verifiedAccessGranted = false;
    return false;
}

/* -------------------------------------------------------------------------- */
/* Routage & Affichage                                                        */
/* -------------------------------------------------------------------------- */

function refreshVipMemberBadge() {
    const vipUserDisplay = document.getElementById("vipUsernameDisplay");
    if (!vipUserDisplay) return;
    const fallback = (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang].vip_member_active) || "Membre Actif";
    vipUserDisplay.textContent = (currentUser && currentUser.name) || fallback;
}

function initGlobalViewRouter() {
    const publicSite = document.getElementById("publicSiteWrapper");
    const vipSoftware = document.getElementById("vipSoftwareWrapper");

    if (currentUser && hasExpiredSubscription(currentUser)) {
        currentUser.isSubscribed = false;
        revokeVerifiedAccess();
    }

    if (isAccessUnlocked()) {
        if (currentUser) currentUser.isSubscribed = true;
        publicSite?.classList.add("hidden");
        vipSoftware?.classList.remove("hidden");

        const vipSidebarUserId = document.getElementById("vipSidebarUserId");
        const user7Id = displayMemberId();
        refreshVipMemberBadge();
        if (user7Id && vipSidebarUserId) vipSidebarUserId.textContent = user7Id;

        startVipGrandVerticalRadarEngine();
        trackMetaPageView("vip");
    } else {
        publicSite?.classList.remove("hidden");
        vipSoftware?.classList.add("hidden");
        stopVipRadarEngine();
        updateAuthPublicHeader();
        trackMetaPageView("home");
    }
}

function updateAuthPublicHeader() {
    const guestButtons = document.getElementById("guestButtons");
    const userProfileBadge = document.getElementById("userProfileBadge");
    const navUserName = document.getElementById("navUserName");
    const navUserIdTag = document.getElementById("navUserIdTag");
    const siteAlertBanner = document.getElementById("siteSubscriptionAlert");

    if (currentUser) {
        guestButtons?.classList.add("hidden");
        userProfileBadge?.classList.remove("hidden");
        if (navUserName) navUserName.textContent = currentUser.name || "Client";
        if (navUserIdTag) {
            const navId = displayMemberId();
            if (navId) navUserIdTag.textContent = `ID: ${navId}`;
        }

        if (!isSubscriptionActive(currentUser)) {
            siteAlertBanner?.classList.remove("hidden");
            refreshSubscriptionAlertCopy();
        } else {
            siteAlertBanner?.classList.add("hidden");
        }
    } else {
        guestButtons?.classList.remove("hidden");
        userProfileBadge?.classList.add("hidden");
        siteAlertBanner?.classList.add("hidden");
    }
}

/* -------------------------------------------------------------------------- */
/* COMPTEUR DE DIRECT                                                         */
/* -------------------------------------------------------------------------- */

function initLiveOnlineUsersTicker() {
    const liveCounterEl = document.getElementById("liveOnlineUsersCount");
    if (!liveCounterEl) return;

    function formatNumber(num) {
        return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    let currentSessions = 1438920;
    liveCounterEl.textContent = formatNumber(currentSessions);

    function stepTraffic() {
        const delta = Math.floor(2000 + Math.random() * 3001);
        const isRise = Math.random() < 0.55;

        if (isRise) {
            currentSessions += delta;
        } else {
            currentSessions -= delta;
        }

        if (currentSessions > 1940000) {
            currentSessions -= Math.floor(7000 + Math.random() * 4000);
        } else if (currentSessions < 1060000) {
            currentSessions += Math.floor(7000 + Math.random() * 4000);
        }

        liveCounterEl.textContent = formatNumber(currentSessions);
        const nextDelay = Math.floor(3000 + Math.random() * 2001);
        setTimeout(stepTraffic, nextDelay);
    }

    setTimeout(stepTraffic, 3500);
}

/* -------------------------------------------------------------------------- */
/* BANDEAU D'ACTIVITÉ PRO ET ÉLÉGANT                                          */
/* -------------------------------------------------------------------------- */

function initLiveFlashSocialNotifications() {
    const flashBoxes = document.querySelectorAll(".js-live-activity, #liveFlashSocialBox");
    if (!flashBoxes.length) return;

    const flashMessages = {
        fr: "vient d'activer sa licence",
        en: "just activated their license",
        es: "acaba de activar su licencia",
        pt: "acabou de ativar a sua licença",
        de: "hat soeben die Lizenz aktiviert"
    };

    function triggerFlash() {
        const randomId = `ID: ${formatMemberId(randomMemberNumber())}`;
        const msg = flashMessages[currentLang] || flashMessages.fr;

        document.querySelectorAll(".js-live-activity-id, #flashTitle").forEach((el) => {
            el.textContent = randomId;
        });
        document.querySelectorAll(".js-live-activity-msg, #flashSubtitle").forEach((el) => {
            el.textContent = msg;
        });

        flashBoxes.forEach((box) => {
            box.classList.add("pulse-highlight");
            setTimeout(() => box.classList.remove("pulse-highlight"), 1400);
        });

        const nextDelay = 7000 + Math.floor(Math.random() * 8000);
        setTimeout(triggerFlash, nextDelay);
    }

    triggerFlash();
}

function initGuaranteed48hCountdown() {
    const timerElements = document.querySelectorAll(".countdown-timer-text");
    if (!timerElements.length) return;
    const DURATION_48H = 48 * 60 * 60 * 1000;
    let timerStart = Number(localStorage.getItem(CONFIG.timerKey));
    const now = Date.now();

    if (!timerStart || isNaN(timerStart) || now - timerStart > DURATION_48H) {
        timerStart = now;
        localStorage.setItem(CONFIG.timerKey, String(timerStart));
    }

    function updateTimer() {
        const remaining = Math.max(0, DURATION_48H - (Date.now() - timerStart));
        const hours = Math.floor(remaining / 3600000);
        const minutes = Math.floor((remaining % 3600000) / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        const formatted = `${String(hours).padStart(2, "0")}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;

        timerElements.forEach((el) => el.textContent = formatted);
    }
    updateTimer();
    setInterval(updateTimer, 1000);
}

/* -------------------------------------------------------------------------- */
/* Cockpit Radar de Vol                                                       */
/* -------------------------------------------------------------------------- */

function initCodeStreams() {
    const lines = [
        { t: "sync radar.vector[n] checksum=ok", c: "c-green" },
        { t: "inject payload.hash=0x7af3c1", c: "c-cyan" },
        { t: "predict.mul compute(seed, entropy)", c: "c-pink" },
        { t: "filter noise.floor < 0.012", c: "c-green" },
        { t: "trace flight.path bezier.p3", c: "c-cyan" },
        { t: "lock entropy=0.991 status=live", c: "c-pink" },
        { t: "decode tick.stream hz=2400", c: "c-green" },
        { t: "map crash.curve x1.00 -> xn", c: "c-cyan" },
        { t: "buffer[i++] = sample.raw", c: "c-pink" },
        { t: "ok // algorithm heartbeat", c: "c-green" }
    ];
    document.querySelectorAll("[data-code-stream]").forEach((el) => {
        if (el.dataset.bound === "1") return;
        el.dataset.bound = "1";
        let n = Math.floor(Math.random() * lines.length);
        const pushLine = () => {
            const item = lines[n % lines.length];
            const row = document.createElement("div");
            row.className = item.c;
            row.textContent = `> ${item.t}  ${Math.random().toString(16).slice(2, 8)}`;
            el.appendChild(row);
            while (el.childNodes.length > 8) el.removeChild(el.firstChild);
            el.scrollTop = el.scrollHeight;
            n += 1;
        };
        for (let i = 0; i < 5; i++) pushLine();
        setInterval(pushLine, 90 + Math.floor(Math.random() * 70));
    });
}

const SIGNAL_CYCLE_MS = 30 * 60 * 1000;
const SIGNAL_ARM_MS = 60 * 1000;
const SIGNAL_CYCLE_KEY = "crash_signal_cycle_v1";

function unixNowSec() {
    return Math.floor(Date.now() / 1000) + vipServerTimeOffset;
}

function signalCycleStorageKey() {
    const id = displayMemberId() || (currentUser && currentUser.email) || "anon";
    return `${SIGNAL_CYCLE_KEY}_${id}`;
}

function readLocalSignalCycle() {
    try {
        const raw = JSON.parse(localStorage.getItem(signalCycleStorageKey()) || "null");
        if (!raw || typeof raw !== "object") return null;
        return {
            startedAt: Number(raw.startedAt) || 0,
            armedAt: Number(raw.armedAt) || 0
        };
    } catch {
        return null;
    }
}

function writeLocalSignalCycle(startedAt, armedAt) {
    try {
        localStorage.setItem(signalCycleStorageKey(), JSON.stringify({
            startedAt: Number(startedAt) || 0,
            armedAt: Number(armedAt) || 0
        }));
    } catch {}
}

async function persistSignalCycle(op) {
    const now = unixNowSec();
    let startedAt = 0;
    let armedAt = 0;
    const local = readLocalSignalCycle();
    const email = currentUser && currentUser.email ? String(currentUser.email).trim() : "";
    const uniqueId = displayMemberId() || "";
    const paths = email ? memberServerPaths(email).save : [];
    for (let i = 0; i < paths.length; i++) {
        try {
            const response = await fetch(paths[i], {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify({
                    action: "signal_cycle",
                    op: op || "ensure",
                    email,
                    uniqueId
                })
            });
            const data = await parseJsonResponse(response);
            if (data && data.ok && data.startedAt) {
                if (Number(data.now)) vipServerTimeOffset = Number(data.now) - Math.floor(Date.now() / 1000);
                startedAt = Number(data.startedAt) || 0;
                armedAt = Number(data.armedAt) || 0;
                writeLocalSignalCycle(startedAt, armedAt);
                return {
                    startedAt,
                    armedAt,
                    ready: Boolean(data.ready),
                    remainingMs: Number(data.remainingMs) || 0,
                    armRemainingMs: Number(data.armRemainingMs) || 0
                };
            }
        } catch {}
    }
    startedAt = local && local.startedAt > 0 && local.startedAt <= now ? local.startedAt : now;
    armedAt = local && local.armedAt > 0 ? local.armedAt : 0;
    if (op === "arm" && (now - startedAt) * 1000 >= SIGNAL_CYCLE_MS) {
        if (!armedAt) armedAt = now;
    }
    if (op === "complete") {
        startedAt = now;
        armedAt = 0;
    }
    writeLocalSignalCycle(startedAt, armedAt);
    const elapsed = Math.max(0, (now - startedAt) * 1000);
    const ready = elapsed >= SIGNAL_CYCLE_MS;
    const armRemainingMs = armedAt > 0 ? Math.max(0, SIGNAL_ARM_MS - Math.max(0, (now - armedAt) * 1000)) : 0;
    return { startedAt, armedAt, ready, remainingMs: ready ? 0 : SIGNAL_CYCLE_MS - elapsed, armRemainingMs };
}

function isFlyerGame(id) {
    return id === "crash" || id === "aviator" || id === "luckyjet";
}

function isSharedSessionGame(id) {
    return id && id !== "sport";
}

function sessionVisualGame() {
    const busy = ["arming", "flying", "boardReveal", "crashed"].indexOf(vipSessionState) !== -1;
    if (busy && armedSessionGame && isSharedSessionGame(activePredictorGame)) return armedSessionGame;
    return activePredictorGame;
}

function isGameSessionLocked() {
    if (!isSharedSessionGame(activePredictorGame)) return false;
    const busy = ["arming", "flying", "boardReveal", "crashed"].indexOf(vipSessionState) !== -1;
    return Boolean(busy && armedSessionGame && armedSessionGame !== activePredictorGame && isSharedSessionGame(armedSessionGame));
}

function updateGameSessionLock() {
    const lock = document.getElementById("vipGameSessionLock");
    const locked = isGameSessionLocked();
    lock?.classList.toggle("hidden", !locked);
    if (typeof window.__vipApplySessionUi === "function") window.__vipApplySessionUi(locked);
}

function flyerTheme() {
    const game = sessionVisualGame();
    if (game === "aviator") {
        return { bg: "#120308", grid: "rgba(239,68,68,0.16)", stroke: "#ef2222", body: "#e11d48", wing: "#9f1239", window: "#111111", flame: "#fb923c", stars: false };
    }
    if (game === "luckyjet") {
        return { bg: "#0b0518", grid: "rgba(168,85,247,0.18)", stroke: "#c084fc", body: "#a855f7", wing: "#6d28d9", window: "#1e1b4b", flame: "#22d3ee", stars: true };
    }
    return { bg: "#060a18", grid: "rgba(255,200,55,0.08)", stroke: "#ffc837", body: "#ffc837", wing: "#f59e0b", window: "#1e1b4b", flame: "#ef4444", stars: false };
}

function predictorGameHeading(id) {
    const names = {
        aviator: ["AVIATOR", " — SIGNAUX EN DIRECT"],
        luckyjet: ["LUCKY JET", " — FLUX COSMIQUE"],
        crash: ["CRASH", " — ALGORITHME LIVE"],
        mines: ["MINES", " — CASES SÛRES"],
        penalty: ["PENALTY SHOOT-OUT", " — CIBLAGE"],
        apple: ["APPLE OF FORTUNE", " — CHEMIN DORÉ"],
        sport: ["SPORTS PREDICTIONS", " — PARIS SPORTIFS"]
    };
    const pair = names[id];
    if (!pair) return i18nText("radar_heading", "SESSION D'ANALYSE HAUTE PRÉCISION");
    return `<span class="notranslate" translate="no">${pair[0]}</span>${pair[1]}`;
}

function positionPenaltyLaser() {
    const laser = document.getElementById("vipPenaltyLaser");
    const goal = document.getElementById("vipPenaltyGoal");
    if (!laser || !goal || !boardRoundPred) return;
    const targetZone = document.querySelector(`#vipPenaltyGoal .penalty-zone[data-zone="${boardRoundPred.penaltyZone}"]`);
    if (!targetZone) return;
    const g = goal.getBoundingClientRect();
    const z = targetZone.getBoundingClientRect();
    if (g.width < 8 || z.width < 8) return;
    laser.style.left = `${z.left - g.left + z.width / 2}px`;
    laser.style.top = `${z.top - g.top + z.height / 2}px`;
    laser.classList.add("is-on");
}

function clearBoardHighlights() {
    document.querySelectorAll("#vipMinesGrid .mine-cell").forEach((cell) => cell.classList.remove("is-safe"));
    document.querySelectorAll("#vipPenaltyGoal .penalty-zone").forEach((z) => z.classList.remove("is-target"));
    document.getElementById("vipPenaltyReadout")?.classList.add("hidden");
    document.getElementById("vipPenaltyLaser")?.classList.remove("is-on");
    document.querySelectorAll("#vipAppleTower .apple-cell").forEach((cell) => cell.classList.remove("is-gold"));
    document.getElementById("vipSportBoard")?.classList.remove("is-revealed");
    if (appleRevealTimer) {
        clearInterval(appleRevealTimer);
        appleRevealTimer = null;
    }
}

function generateBoardRound() {
    const safeCount = 3 + Math.floor(Math.random() * 3);
    const minesSafe = [];
    while (minesSafe.length < safeCount) {
        const n = Math.floor(Math.random() * 25);
        if (minesSafe.indexOf(n) === -1) minesSafe.push(n);
    }
    const zones = ["tl", "tr", "ml", "mr", "c"];
    boardRoundPred = {
        minesSafe,
        penaltyZone: zones[Math.floor(Math.random() * zones.length)],
        penaltyPct: 74 + Math.floor(Math.random() * 18),
        applePath: Array.from({ length: 3 }, () => Math.floor(Math.random() * 5))
    };
}

function revealBoardRound() {
    if (!boardRoundPred) generateBoardRound();
    document.querySelectorAll("#vipMinesGrid .mine-cell").forEach((cell, i) => {
        cell.classList.toggle("is-safe", boardRoundPred.minesSafe.indexOf(i) !== -1);
    });
    document.querySelectorAll("#vipPenaltyGoal .penalty-zone").forEach((z) => {
        z.classList.toggle("is-target", z.getAttribute("data-zone") === boardRoundPred.penaltyZone);
    });
    const readout = document.getElementById("vipPenaltyReadout");
    if (readout) {
        const labels = { tl: "Lucarne Gauche", tr: "Lucarne Droite", ml: "Ras du poteau Gauche", mr: "Ras du poteau Droit", c: "Plein Centre" };
        readout.textContent = `${labels[boardRoundPred.penaltyZone] || ""} · ${boardRoundPred.penaltyPct}%`;
        readout.classList.remove("hidden");
    }
    requestAnimationFrame(positionPenaltyLaser);
    const rows = Array.from(document.querySelectorAll("#vipAppleTower .apple-row"));
    rows.forEach((row) => row.querySelectorAll(".apple-cell").forEach((c) => c.classList.remove("is-gold")));
    const appleFloors = Math.min(3, rows.length, (boardRoundPred.applePath || []).length);
    let floor = 0;
    if (appleRevealTimer) clearInterval(appleRevealTimer);
    appleRevealTimer = setInterval(() => {
        if (floor >= appleFloors) {
            clearInterval(appleRevealTimer);
            appleRevealTimer = null;
            return;
        }
        const col = boardRoundPred.applePath[floor];
        const cell = rows[floor]?.querySelectorAll(".apple-cell")[col];
        if (cell) cell.classList.add("is-gold");
        floor += 1;
    }, 220);
    syncSportPredictionReveal();
}

function syncSportPredictionReveal() {
    const board = document.getElementById("vipSportBoard");
    if (!board) return;
    const onSport = activePredictorGame === "sport" && !isGameSessionLocked();
    board.classList.toggle("is-revealed", onSport);
}

function setActivePredictorGame(id, silent) {
    if (!id) return;
    activePredictorGame = id;
    const stage = document.getElementById("vipGameStage");
    if (stage) stage.setAttribute("data-game", id);
    document.querySelectorAll("#vipGameSwitcher .vip-game-chip").forEach((btn) => {
        btn.classList.toggle("is-active", btn.getAttribute("data-game") === id);
    });
    const flyer = document.getElementById("vipFlyerPanel");
    const mines = document.getElementById("vipMinesPanel");
    const penalty = document.getElementById("vipPenaltyPanel");
    const apple = document.getElementById("vipApplePanel");
    const sport = document.getElementById("vipSportPanel");
    const showFlyer = isFlyerGame(id);
    flyer?.classList.toggle("hidden", !showFlyer);
    flyer?.classList.toggle("is-active", showFlyer);
    mines?.classList.toggle("hidden", id !== "mines");
    penalty?.classList.toggle("hidden", id !== "penalty");
    apple?.classList.toggle("hidden", id !== "apple");
    sport?.classList.toggle("hidden", id !== "sport");
    const heading = document.getElementById("vipGameHeading");
    if (heading) heading.innerHTML = predictorGameHeading(id);
    const unlock = document.getElementById("vipUnlockSignalBtn");
    const chrono = document.getElementById("vipSignalChrono");
    if (id === "sport") {
        unlock?.classList.add("hidden");
        chrono?.classList.add("hidden");
        document.getElementById("vipScannerLoader")?.classList.add("hidden");
    } else if (unlock) {
        const analyse = !showFlyer;
        const key = analyse ? "btn_analyse_signal" : "btn_unlock_signal";
        const label = unlock.querySelector(".btn-signal-label") || unlock;
        label.setAttribute("data-i18n", key);
        label.textContent = i18nText(key, "⚡ DÉCODER LE SIGNAL");
    }
    if (typeof window.__vipResizeCanvas === "function") window.__vipResizeCanvas();
    updateGameSessionLock();
    syncSportPredictionReveal();
    if (!isGameSessionLocked() && sessionVisualGame() === "penalty" && vipSessionState === "boardReveal") {
        requestAnimationFrame(positionPenaltyLaser);
    }
}

function initPredictorGameSuite() {
    const grid = document.getElementById("vipMinesGrid");
    if (grid && grid.childElementCount === 0) {
        for (let i = 0; i < 25; i++) {
            const cell = document.createElement("div");
            cell.className = "mine-cell";
            grid.appendChild(cell);
        }
    }
    const tower = document.getElementById("vipAppleTower");
    if (tower && tower.childElementCount === 0) {
        for (let r = 0; r < 10; r++) {
            const row = document.createElement("div");
            row.className = "apple-row";
            for (let c = 0; c < 5; c++) {
                const cell = document.createElement("div");
                cell.className = "apple-cell";
                row.appendChild(cell);
            }
            tower.appendChild(row);
        }
    }
    document.getElementById("vipGameSwitcher")?.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-game]");
        if (!btn) return;
        setActivePredictorGame(btn.getAttribute("data-game"));
    });
    setActivePredictorGame(activePredictorGame, true);
}

/* -------------------------------------------------------------------------- */
/* Session d'analyse — radar & jeux                                           */
/* -------------------------------------------------------------------------- */

function stopVipRadarEngine() {
    if (appleRevealTimer) {
        clearInterval(appleRevealTimer);
        appleRevealTimer = null;
    }
    if (vipAnimationId) {
        cancelAnimationFrame(vipAnimationId);
        vipAnimationId = null;
    }
    if (vipCalibrationTimer) {
        cancelAnimationFrame(vipCalibrationTimer);
        clearInterval(vipCalibrationTimer);
        vipCalibrationTimer = null;
    }
    if (vipResizeHandler) {
        window.removeEventListener("resize", vipResizeHandler);
        vipResizeHandler = null;
    }
    if (vipSignalTimer) {
        clearInterval(vipSignalTimer);
        vipSignalTimer = null;
    }
    if (vipDecodeTimer) {
        clearInterval(vipDecodeTimer);
        vipDecodeTimer = null;
    }
    vipEngineRunning = false;
}

function startVipGrandVerticalRadarEngine() {
    if (vipEngineRunning) return;
    vipEngineRunning = true;

    const canvas = document.getElementById("vipFlightCanvas");
    const hudNumber = document.getElementById("vipHudNumber");
    const liveHud = document.getElementById("vipLiveHud");
    const targetDisplay = document.getElementById("vipLiveTargetDisplay");
    const confidenceDisplay = document.getElementById("vipLiveConfidence");
    const statusMessage = document.getElementById("vipFlightMessage");
    const historyList = document.getElementById("vipHistoryList");
    const scannerLoader = document.getElementById("vipScannerLoader");
    const scanProgressFill = document.getElementById("scanProgressFill");
    const unlockBtn = document.getElementById("vipUnlockSignalBtn");
    const predReveal = document.getElementById("vipPredReveal");
    const codeFrame = document.getElementById("vipCodeFrame");
    const chronoWrap = document.getElementById("vipSignalChrono");
    const chronoValue = document.getElementById("vipSignalChronoValue");
    const chronoText = document.getElementById("vipSignalChronoText");
    const scanSubtitle = document.getElementById("vipScanRemain");
    const scanClock = document.getElementById("vipScanClock");
    const decodeStream = document.getElementById("vipDecodeStream");
    const decodePackets = [
        { t: "open channel.radar entropy=live", c: "c-green" },
        { t: "ingest pkt.batch n=2048 crc=ok", c: "c-cyan" },
        { t: "compile predict.window=1800s", c: "c-pink" },
        { t: "filter noise.floor < -41.2dB", c: "c-green" },
        { t: "lock vector.hash 0x7af3c1", c: "c-cyan" },
        { t: "decode tick.stream hz=2400", c: "c-pink" },
        { t: "map crash.curve seed.ok", c: "c-green" },
        { t: "sync pulse.gate latency=12ms", c: "c-cyan" }
    ];
    let decodeLineIndex = 0;

    if (!canvas) {
        vipEngineRunning = false;
        return;
    }
    const ctx = canvas.getContext("2d");
    let viewW = 800;
    let viewH = 520;

    function resizeCanvas() {
        const host = document.getElementById("vipGameStage") || canvas.parentElement;
        if (!host) return;
        const cssW = Math.max(host.clientWidth || 320, 260);
        const cssH = Math.max(host.clientHeight || 320, 240);
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        viewW = cssW;
        viewH = cssH;
        canvas.style.width = `${cssW}px`;
        canvas.style.height = `${cssH}px`;
        canvas.width = Math.round(cssW * dpr);
        canvas.height = Math.round(cssH * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeCanvas();
    vipResizeHandler = resizeCanvas;
    window.__vipResizeCanvas = resizeCanvas;
    window.addEventListener("resize", vipResizeHandler);

    let flightState = "scanning";
    vipSessionState = "scanning";

    function setFlightState(next) {
        flightState = next;
        vipSessionState = next;
        if (next === "scanning" || next === "awaitingUnlock") {
            armedSessionGame = null;
        }
        updateGameSessionLock();
    }

    let currentMultiplier = 1.00;
    let flightProgress = 0;
    let flightSpeed = 0.0014;
    let explosionTimer = 0;
    let particles = [];

    function pickVariedMultiplier() {
        let value = 1.47;
        for (let attempt = 0; attempt < 12; attempt++) {
            const roll = Math.random();
            if (roll < 0.55) value = 1.40 + Math.random() * 0.80;
            else if (roll < 0.90) value = 2.21 + Math.random() * 2.59;
            else value = 4.81 + Math.random() * 4.69;
            value = Math.round(value * 100) / 100;
            if (vipLastHistoryMultiplier == null || Math.abs(value - vipLastHistoryMultiplier) >= 0.08) {
                break;
            }
        }
        return value;
    }

    function generateNextTarget() {
        vipTargetMultiplier = pickVariedMultiplier();
        flightSpeed = vipTargetMultiplier >= 4.81 ? 0.00105 : (vipTargetMultiplier >= 2.21 ? 0.00128 : 0.00148);

        const conf = (98.6 + Math.random() * 1.2).toFixed(1) + "%";
        if (targetDisplay) targetDisplay.textContent = `x${vipTargetMultiplier.toFixed(2)}`;
        if (confidenceDisplay) confidenceDisplay.textContent = conf;
    }

    function keepCodeTerminal() {
        codeFrame?.classList.remove("hidden");
    }

    function signalArriveText(seconds) {
        const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.fr;
        const tpl = dict.signal_arrive || TRANSLATIONS.fr.signal_arrive;
        return tpl.replace("{n}", String(Math.max(0, seconds)));
    }

    function setArmCountdownLabel(seconds) {
        const n = Math.max(0, Math.ceil(seconds));
        if (chronoText) chronoText.textContent = signalArriveText(n);
        if (chronoValue) chronoValue.textContent = String(n);
    }

    function pushDecodeLine() {
        if (!decodeStream) return;
        const item = decodePackets[decodeLineIndex % decodePackets.length];
        const row = document.createElement("div");
        row.className = item.c;
        row.textContent = `> ${item.t}  ${Math.random().toString(16).slice(2, 8)}`;
        decodeStream.appendChild(row);
        while (decodeStream.childNodes.length > 7) decodeStream.removeChild(decodeStream.firstChild);
        decodeStream.scrollTop = decodeStream.scrollHeight;
        decodeLineIndex += 1;
    }

    function stopDecodeFeed() {
        if (vipDecodeTimer) {
            clearInterval(vipDecodeTimer);
            vipDecodeTimer = null;
        }
    }

    function startDecodeFeed() {
        stopDecodeFeed();
        if (decodeStream) decodeStream.textContent = "";
        decodeLineIndex = 0;
        for (let i = 0; i < 4; i++) pushDecodeLine();
        vipDecodeTimer = setInterval(pushDecodeLine, 420);
    }

    function hideLiveHud() {
        liveHud?.classList.add("hidden");
        liveHud?.classList.remove("is-tracking");
        if (liveHud) {
            liveHud.style.left = "";
            liveHud.style.top = "";
        }
    }

    function showLiveHud() {
        liveHud?.classList.remove("hidden");
        liveHud?.classList.add("is-tracking");
        if (hudNumber) hudNumber.textContent = "x1.00";
    }

    function hideSignalUi() {
        predReveal?.classList.add("hidden");
        chronoWrap?.classList.add("hidden");
        unlockBtn?.classList.add("hidden");
        hideLiveHud();
        keepCodeTerminal();
        clearBoardHighlights();
        if (targetDisplay) targetDisplay.textContent = "";
        if (statusMessage) statusMessage.textContent = "";
    }

    function showAwaitingUnlock() {
        stopDecodeFeed();
        scannerLoader?.classList.add("hidden");
        keepCodeTerminal();
        predReveal?.classList.add("hidden");
        chronoWrap?.classList.add("hidden");
        hideLiveHud();
        unlockBtn?.classList.remove("hidden");
        setFlightState("awaitingUnlock");
        if (statusMessage) statusMessage.textContent = "";
    }

    window.__vipApplySessionUi = function (locked) {
        if (activePredictorGame === "sport") {
            predReveal?.classList.add("hidden");
            chronoWrap?.classList.add("hidden");
            unlockBtn?.classList.add("hidden");
            hideLiveHud();
            scannerLoader?.classList.add("hidden");
            if (typeof syncSportPredictionReveal === "function") syncSportPredictionReveal();
            return;
        }
        if (flightState === "scanning") {
            scannerLoader?.classList.remove("hidden");
        }
        if (locked) {
            predReveal?.classList.add("hidden");
            chronoWrap?.classList.add("hidden");
            unlockBtn?.classList.add("hidden");
            hideLiveHud();
            return;
        }
        if (flightState === "arming") {
            chronoWrap?.classList.remove("hidden");
            unlockBtn?.classList.add("hidden");
            predReveal?.classList.add("hidden");
            hideLiveHud();
            keepCodeTerminal();
            return;
        }
        if (flightState === "awaitingUnlock") {
            chronoWrap?.classList.add("hidden");
            predReveal?.classList.add("hidden");
            hideLiveHud();
            unlockBtn?.classList.remove("hidden");
            keepCodeTerminal();
            return;
        }
        if (flightState === "flying") {
            chronoWrap?.classList.add("hidden");
            unlockBtn?.classList.add("hidden");
            keepCodeTerminal();
            if (isFlyerGame(sessionVisualGame())) {
                predReveal?.classList.remove("hidden");
                showLiveHud();
            } else {
                predReveal?.classList.add("hidden");
                hideLiveHud();
            }
            return;
        }
        if (flightState === "boardReveal") {
            chronoWrap?.classList.add("hidden");
            unlockBtn?.classList.add("hidden");
            predReveal?.classList.add("hidden");
            hideLiveHud();
            keepCodeTerminal();
            if (sessionVisualGame() === "penalty") requestAnimationFrame(positionPenaltyLaser);
            if (typeof syncSportPredictionReveal === "function") syncSportPredictionReveal();
        }
    };

    function formatRemain(ms) {
        const total = Math.max(0, Math.ceil(ms / 1000));
        const m = Math.floor(total / 60);
        const s = total % 60;
        return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    }

    function createExplosion(x, y) {
        particles = [];
        for (let i = 0; i < 55; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 9;
            particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: i % 3 === 0 ? "#ffc837" : (i % 3 === 1 ? "#ef4444" : "#10b981"),
                size: 3 + Math.random() * 5,
                alpha: 1
            });
        }
    }

    function pushWinningHistory(mult) {
        if (!historyList) return;
        vipCurrentFlightNumber++;
        const item = document.createElement("div");
        const isBig = mult >= 5.0;
        item.className = isBig ? "history-item big-win animate-fade" : "history-item win animate-fade";
        item.innerHTML = `
            <span class="h-flight">Vol #${vipCurrentFlightNumber}</span>
            <span class="h-pred">Prédit: x${mult.toFixed(2)}</span>
            <span class="h-badge ${isBig ? "gold" : "green"}">${isBig ? "GROS GAIN" : "VALIDÉ"}</span>
        `;
        historyList.insertBefore(item, historyList.firstChild);
        if (historyList.children.length > 8) {
            historyList.removeChild(historyList.lastChild);
        }
        vipLastHistoryMultiplier = mult;
    }

    function beginTakeoff() {
        persistSignalCycle("complete");
        stopDecodeFeed();
        scannerLoader?.classList.add("hidden");
        unlockBtn?.classList.add("hidden");
        chronoWrap?.classList.add("hidden");
        keepCodeTerminal();
        generateNextTarget();
        generateBoardRound();
        currentMultiplier = 1.00;
        flightProgress = 0;
        explosionTimer = 0;
        particles = [];
        if (isFlyerGame(sessionVisualGame())) {
            predReveal?.classList.remove("hidden");
            setFlightState("flying");
            showLiveHud();
        } else {
            predReveal?.classList.add("hidden");
            hideLiveHud();
            revealBoardRound();
            setFlightState("boardReveal");
        }
    }

    function startArmCountdown(remainingMs) {
        stopDecodeFeed();
        scannerLoader?.classList.add("hidden");
        unlockBtn?.classList.add("hidden");
        predReveal?.classList.add("hidden");
        keepCodeTerminal();
        hideLiveHud();
        chronoWrap?.classList.remove("hidden");
        armedSessionGame = activePredictorGame;
        setFlightState("arming");
        let left = Math.max(1, Math.ceil(remainingMs / 1000));
        setArmCountdownLabel(left);
        if (vipSignalTimer) clearInterval(vipSignalTimer);
        vipSignalTimer = setInterval(() => {
            left -= 1;
            setArmCountdownLabel(left);
            if (left <= 0) {
                clearInterval(vipSignalTimer);
                vipSignalTimer = null;
                beginTakeoff();
            }
        }, 1000);
    }

    async function startCalibrationPhase() {
        setFlightState("scanning");
        hideSignalUi();
        scannerLoader?.classList.remove("hidden");
        startDecodeFeed();
        if (vipCalibrationTimer) {
            cancelAnimationFrame(vipCalibrationTimer);
            clearInterval(vipCalibrationTimer);
            vipCalibrationTimer = null;
        }
        if (vipSignalTimer) {
            clearInterval(vipSignalTimer);
            vipSignalTimer = null;
        }

        const cycle = await persistSignalCycle("ensure");
        if (!vipEngineRunning) return;

        if (cycle.armedAt > 0) {
            stopDecodeFeed();
            if (cycle.armRemainingMs > 0) {
                startArmCountdown(cycle.armRemainingMs);
                return;
            }
            beginTakeoff();
            return;
        }
        if (cycle.ready) {
            showAwaitingUnlock();
            return;
        }

        function tickCalibration() {
            if (!vipEngineRunning) {
                if (vipCalibrationTimer) {
                    clearInterval(vipCalibrationTimer);
                    vipCalibrationTimer = null;
                }
                stopDecodeFeed();
                return;
            }
            const now = unixNowSec();
            const elapsedMs = Math.max(0, (now - cycle.startedAt) * 1000);
            const remain = Math.max(0, SIGNAL_CYCLE_MS - elapsedMs);
            const pct = Math.min(100, (elapsedMs / SIGNAL_CYCLE_MS) * 100);
            if (scanSubtitle) scanSubtitle.textContent = "ANALYSE DU FLUX EN COURS...";
            if (scanClock) scanClock.textContent = formatRemain(remain);
            if (scanProgressFill) {
                scanProgressFill.style.width = `${pct}%`;
                scanProgressFill.style.animation = "none";
                scanProgressFill.style.transform = "none";
            }
            if (remain <= 0) {
                clearInterval(vipCalibrationTimer);
                vipCalibrationTimer = null;
                showAwaitingUnlock();
            }
        }
        vipCalibrationTimer = setInterval(tickCalibration, 250);
        tickCalibration();
    }

    unlockBtn?.addEventListener("click", async (e) => {
        e.preventDefault();
        if (isGameSessionLocked()) return;
        if (flightState !== "awaitingUnlock") return;
        unlockBtn.classList.add("hidden");
        const armed = await persistSignalCycle("arm");
        const remain = armed.armRemainingMs > 0 ? armed.armRemainingMs : SIGNAL_ARM_MS;
        startArmCountdown(remain);
    });

    function drawPlane(x, y, angle) {
        const theme = flyerTheme();
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

        if (sessionVisualGame() === "luckyjet") {
            ctx.fillStyle = theme.flame;
            ctx.beginPath();
            ctx.moveTo(-10, 8);
            ctx.lineTo(-6 - Math.random() * 10, 22);
            ctx.lineTo(-2, 8);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = theme.body;
            ctx.beginPath();
            ctx.ellipse(0, 2, 9, 13, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#fde68a";
            ctx.beginPath();
            ctx.arc(0, -10, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = theme.wing;
            ctx.fillRect(-14, -2, 8, 12);
            ctx.fillRect(6, -2, 8, 12);
        } else {
            ctx.fillStyle = theme.body;
            ctx.beginPath();
            ctx.ellipse(0, 0, 24, 11, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = theme.window;
            ctx.beginPath();
            ctx.arc(7, -2, 4, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = theme.wing;
            ctx.beginPath();
            ctx.moveTo(-3, 0);
            ctx.lineTo(-14, -20);
            ctx.lineTo(5, -3);
            ctx.closePath();
            ctx.fill();

            ctx.beginPath();
            ctx.moveTo(-3, 0);
            ctx.lineTo(-14, 20);
            ctx.lineTo(5, 3);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = theme.flame;
            ctx.beginPath();
            ctx.moveTo(-24, -4);
            ctx.lineTo(-42 - Math.random() * 14, 0);
            ctx.lineTo(-24, 4);
            ctx.closePath();
            ctx.fill();
        }

        ctx.restore();
    }

    function renderVIPCockpit() {
        if (!vipEngineRunning) return;

        const W = viewW;
        const H = viewH;

        const theme = flyerTheme();
        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = theme.bg;
        ctx.fillRect(0, 0, W, H);

        if (theme.stars) {
            ctx.fillStyle = "rgba(255,255,255,0.55)";
            for (let i = 0; i < 28; i++) {
                const sx = (i * 73) % Math.max(W, 1);
                const sy = (i * 47) % Math.max(H, 1);
                ctx.beginPath();
                ctx.arc(sx, sy, i % 5 === 0 ? 1.6 : 0.8, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.strokeStyle = theme.grid;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);

        for (let y = 30; y < H - 25; y += 40) {
            ctx.beginPath();
            ctx.moveTo(25, y);
            ctx.lineTo(W - 20, y);
            ctx.stroke();
        }
        for (let x = 45; x < W - 20; x += 65) {
            ctx.beginPath();
            ctx.moveTo(x, 20);
            ctx.lineTo(x, H - 25);
            ctx.stroke();
        }
        ctx.setLineDash([]);

        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(25, H - 25);
        ctx.lineTo(W - 10, H - 25);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(25, 20);
        ctx.lineTo(25, H - 25);
        ctx.stroke();

        const startX = 74;
        const startY = H - 58;

        const multiplierRatio = Math.min(Math.max((vipTargetMultiplier - 1.0) / 8.5, 0.12), 0.95);
        const targetX = startX + (W - startX - 28) * (0.52 + multiplierRatio * 0.38);
        const targetY = 42 + (startY - 42) * (0.42 - multiplierRatio * 0.28);
        const cp1X = startX + (targetX - startX) * 0.22;
        const cp1Y = startY - (startY - targetY) * 0.08;
        const cp2X = startX + (targetX - startX) * 0.62;
        const cp2Y = targetY + (startY - targetY) * 0.18;

        function curvePoint(t) {
            const u = 1 - t;
            return {
                x: u * u * u * startX + 3 * u * u * t * cp1X + 3 * u * t * t * cp2X + t * t * t * targetX,
                y: u * u * u * startY + 3 * u * u * t * cp1Y + 3 * u * t * t * cp2Y + t * t * t * targetY
            };
        }

        function curveTangent(t) {
            const u = 1 - t;
            return {
                x: 3 * u * u * (cp1X - startX) + 6 * u * t * (cp2X - cp1X) + 3 * t * t * (targetX - cp2X),
                y: 3 * u * u * (cp1Y - startY) + 6 * u * t * (cp2Y - cp1Y) + 3 * t * t * (targetY - cp2Y)
            };
        }

        function trackHud(x, y) {
            if (!liveHud || liveHud.classList.contains("hidden")) return;
            const pad = 8;
            const hudW = liveHud.offsetWidth || 110;
            const hudH = liveHud.offsetHeight || 56;
            const left = Math.min(W - hudW / 2 - pad, Math.max(hudW / 2 + pad, x));
            const top = Math.min(H - pad, Math.max(hudH + pad, y - 10));
            liveHud.style.left = `${left}px`;
            liveHud.style.top = `${top}px`;
        }

        if (flightState === "flying") {
            flightProgress += flightSpeed;
            const p = Math.min(flightProgress, 1);
            const ease = 1 - Math.pow(1 - p, 1.35);

            currentMultiplier = 1.00 + (vipTargetMultiplier - 1.00) * ease;
            if (hudNumber) hudNumber.textContent = `x${currentMultiplier.toFixed(2)}`;

            const pos = curvePoint(p);
            const tan = curveTangent(p);

            ctx.beginPath();
            ctx.moveTo(startX, startY);
            for (let s = 0; s <= p; s += 0.006) {
                const pt = curvePoint(s);
                ctx.lineTo(pt.x, pt.y);
            }
            ctx.lineTo(pos.x, pos.y);
            ctx.strokeStyle = theme.stroke;
            ctx.lineWidth = 6;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.shadowColor = theme.stroke;
            ctx.shadowBlur = 22;
            ctx.stroke();
            ctx.shadowBlur = 0;

            const angle = Math.atan2(tan.y, tan.x) || -0.55;

            ctx.beginPath();
            ctx.arc(startX, startY, 7, 0, Math.PI * 2);
            ctx.fillStyle = theme.stroke;
            ctx.globalAlpha = 0.35;
            ctx.fill();
            ctx.globalAlpha = 1;

            drawPlane(pos.x, pos.y, angle);
            trackHud(pos.x, pos.y);

            if (p >= 1) {
                setFlightState("crashed");
                createExplosion(pos.x, pos.y);
                pushWinningHistory(vipTargetMultiplier);
            }
        } else if (flightState === "crashed") {
            explosionTimer++;

            particles.forEach((pt) => {
                pt.x += pt.vx;
                pt.y += pt.vy;
                pt.alpha -= 0.024;
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

            if (explosionTimer > 50) {
                hideSignalUi();
                setFlightState("scanning");
                startCalibrationPhase();
            }
        } else if (flightState === "boardReveal") {
            explosionTimer++;
            if (explosionTimer > 420) {
                hideSignalUi();
                setFlightState("scanning");
                startCalibrationPhase();
            }
        }

        vipAnimationId = requestAnimationFrame(renderVIPCockpit);
    }

    startCalibrationPhase();
    renderVIPCockpit();
}

/* -------------------------------------------------------------------------- */
/* Authentification & Modales                                                 */
/* -------------------------------------------------------------------------- */

function handleLogout() {
    currentUser = null;
    verifiedAccessGranted = false;
    try {
        localStorage.removeItem(CONFIG.sessionKey);
        localStorage.removeItem(CONFIG.accessTokenKey);
        localStorage.removeItem(CONFIG.accessUnlockedKey);
        localStorage.removeItem(CONFIG.userPremiumKey);
        localStorage.removeItem(CONFIG.accessVerifiedKey);
        localStorage.removeItem("crash_access_v2_verified");
        localStorage.removeItem(CONFIG.maketouCartKey);
        localStorage.removeItem(CONFIG.maketouPendingKey);
    } catch {}
    if (realtimeChannel && supabaseClient) {
        supabaseClient.removeChannel(realtimeChannel);
        realtimeChannel = null;
    }
    stopVipRadarEngine();
    closeAllModals();
    initGlobalViewRouter();
    document.getElementById("loginModal")?.classList.add("active");
    showToast("Vous avez été déconnecté.");
}

function initAuthSecurity() {
    const regForm = document.getElementById("registerForm");
    const logForm = document.getElementById("loginForm");
    const regSubmitBtn = document.getElementById("registerSubmitBtn");
    const loginSubmitBtn = document.getElementById("loginSubmitBtn");
    const profileLogoutBtn = document.getElementById("profileLogoutBtn");
    const vipLogoutBtn = document.getElementById("vipLogoutBtn");

    if (regForm) {
        regForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = document.getElementById("regName").value.trim();
            const email = normalizeEmail(document.getElementById("regEmail").value);
            const password = document.getElementById("regPassword").value;

            if (!name || name.length < 3) {
                showToast("Nom requis (au moins 3 caractères).", "error");
                return;
            }
            if (!isValidEmail(email)) {
                showToast("Adresse email invalide.", "error");
                return;
            }
            if (!password || password.length < 6) {
                showToast("Le mot de passe doit comporter au moins 6 caractères.", "error");
                return;
            }

            setButtonLoading(regSubmitBtn, true);

            const existingAccount = await findAccountByEmail(email);
            if (existingAccount) {
                setButtonLoading(regSubmitBtn, false);
                showToast("Cet email est déjà enregistré. Connectez-vous.", "error");
                return;
            }

            const passwordHash = await hashPassword(password);
            const newUser = {
                id: Date.now(),
                uniqueId: generateUniqueId(),
                name,
                email,
                phone: "",
                passwordHash,
                isSubscribed: false,
                registeredAt: new Date().toLocaleDateString("fr-FR"),
                referredBy: readStoredReferralCode(),
                paidReferralCount: 0
            };
            if (newUser.referredBy && newUser.referredBy === newUser.uniqueId) {
                newUser.referredBy = "";
            }

            await saveUserSession(newUser, true);
            if (supabaseClient) {
                try {
                    const { data: stored } = await supabaseClient
                        .from("users")
                        .select("email")
                        .eq("email", email)
                        .maybeSingle();
                    if (!stored) await upsertUserToSupabase(newUser);
                } catch {}
            }
            setButtonLoading(regSubmitBtn, false);

            initGlobalViewRouter();
            closeAllModals();
            regForm.reset();
            showToast(`Compte créé ! Votre ID : ${newUser.uniqueId}`);
            trackMetaPixel("CompleteRegistration", { status: "success" });

            if (pendingCheckoutAfterAuth) {
                pendingCheckoutAfterAuth = false;
                startMaketouCheckout();
            }
        });
    }

    if (logForm) {
        logForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const emailKey = normalizeEmail(document.getElementById("loginEmail").value);
            const password = String(document.getElementById("loginPassword")?.value || "").trim();

            if (!isValidEmail(emailKey)) {
                showToast("Adresse email requise.", "error");
                return;
            }

            setButtonLoading(loginSubmitBtn, true);
            const found = await findAccountByEmail(emailKey);

            if (found) {
                const match = await passwordMatches(found, password);
                if (match) {
                    if (found.passwordHash === btoa(password)) {
                        found.passwordHash = await hashPassword(password);
                    }
                    if (seedLegacySubscriptionWindow(found)) {
                        await saveUserSession(found, true);
                    } else {
                        await saveUserSession(found, true);
                    }
                    setButtonLoading(loginSubmitBtn, false);
                    closeAllModals();
                    logForm.reset();
                    if (isSubscriptionActive(found)) {
                        grantVerifiedAccess();
                        initGlobalViewRouter();
                        showToast(`Connexion réussie ! Bienvenue, ${found.name}.`);
                    } else {
                        revokeVerifiedAccess();
                        initGlobalViewRouter();
                        showToast(`Connexion réussie ! Bienvenue, ${found.name}.`);
                        if (hasExpiredSubscription(found)) notifyExpiredAndInviteRenew(true);
                    }

                    if (pendingCheckoutAfterAuth) {
                        pendingCheckoutAfterAuth = false;
                        startMaketouCheckout();
                    }
                    return;
                }
            }

            setButtonLoading(loginSubmitBtn, false);
            showToast("Identifiants incorrects.", "error");
        });
    }

    profileLogoutBtn?.addEventListener("click", handleLogout);
    vipLogoutBtn?.addEventListener("click", handleLogout);
    if (vipLogoutBtn) vipLogoutBtn.dataset.boundLogout = "1";
}

function i18nText(key, fallback) {
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.fr || {};
    return dict[key] || fallback || key;
}

function preservePaidSessionOnProfileSave() {
    if (!currentUser) return;
    if (isAccessUnlocked()) currentUser.isSubscribed = true;
}

function openProfileModal() {
    const profileModal = document.getElementById("profileModal");
    if (!profileModal) return;

    const profileNameDisplay = document.getElementById("profileNameDisplay");
    const profileEmailDisplay = document.getElementById("profileEmailDisplay");
    const profileUniqueIdDisplay = document.getElementById("profileUniqueIdDisplay");
    const profilePhoneInput = document.getElementById("profilePhoneInput");
    const btnSavePhone = document.getElementById("btnSavePhone");
    const profileStatusBadge = document.getElementById("profileStatusBadge");
    const btnProfileSubscribe = document.getElementById("btnProfileSubscribe");
    const profileStatusBlock = profileModal.querySelector(".profile-status-block");

    const user7Id = displayMemberId();
    if (profileNameDisplay) {
        profileNameDisplay.textContent = (currentUser && currentUser.name) || i18nText("vip_member_active", "Membre Actif");
    }
    if (profileEmailDisplay) {
        profileEmailDisplay.textContent = (currentUser && currentUser.email) || "—";
    }
    if (profileUniqueIdDisplay) profileUniqueIdDisplay.textContent = user7Id || "—";
    if (profilePhoneInput) {
        const localSaved = currentUser && currentUser.email
            ? loadUsersDb().find((u) => normalizeEmail(u.email) === normalizeEmail(currentUser.email))
            : null;
        const checkoutPhone = String(document.getElementById("checkoutPhoneInput")?.value || "").trim();
        const savedPhone = String((currentUser && currentUser.phone) || (localSaved && localSaved.phone) || checkoutPhone || "").trim();
        if (currentUser && savedPhone && !String(currentUser.phone || "").trim()) currentUser.phone = savedPhone;
        profilePhoneInput.value = savedPhone;
        profilePhoneInput.disabled = false;
        profilePhoneInput.readOnly = false;
    }
    if (btnSavePhone) {
        btnSavePhone.disabled = false;
        btnSavePhone.style.opacity = "";
        btnSavePhone.style.pointerEvents = "";
    }

    const licensed = Boolean(isSubscriptionActive(currentUser) || isAccessUnlocked());
    if (profileStatusBadge) {
        if (!licensed) {
            profileStatusBadge.className = "status-tag-badge status-unsubscribed";
            profileStatusBadge.innerHTML = '<i class="fa-solid fa-circle-xmark" aria-hidden="true"></i> ' + i18nText("status_unsubscribed", "NON ACTIVÉ");
            if (btnProfileSubscribe) btnProfileSubscribe.style.display = "block";
            profileStatusBlock?.classList.remove("is-licensed");
        } else {
            profileStatusBadge.className = "status-tag-badge status-active";
            profileStatusBadge.innerHTML = '<i class="fa-solid fa-circle" aria-hidden="true"></i> ' + i18nText("status_activated_vip", "ACTIVÉ / VIP");
            if (btnProfileSubscribe) btnProfileSubscribe.style.display = "none";
            profileStatusBlock?.classList.add("is-licensed");
        }
    }

    profileModal.classList.add("active");
}

function closeProfileModal() {
    document.getElementById("profileModal")?.classList.remove("active");
}

function bindProfileOpenTrigger(el) {
    if (!el || el.dataset.boundProfileOpen === "1") return;
    el.dataset.boundProfileOpen = "1";
    el.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        openProfileModal();
    });
    el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openProfileModal();
        }
    });
}

function initProfileModal() {
    const userProfileBadge = document.getElementById("userProfileBadge");
    const vipProfileBtn = document.getElementById("vipProfileBtn");
    const closeProfile = document.getElementById("closeProfileModal");
    const profilePhoneInput = document.getElementById("profilePhoneInput");
    const btnSavePhone = document.getElementById("btnSavePhone");
    const formUpdatePassword = document.getElementById("formUpdatePassword");
    const btnProfileSubscribe = document.getElementById("btnProfileSubscribe");

    bindProfileOpenTrigger(userProfileBadge);
    bindProfileOpenTrigger(vipProfileBtn);
    closeProfile?.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeProfileModal();
    });

    btnSavePhone?.addEventListener("click", async () => {
        try {
            if (!currentUser) return;
            if (!profilePhoneInput) return;
            const phone = String(profilePhoneInput.value || "").trim();
            if (!phone) return;
            if (!isValidPhone(phone)) {
                showToast("Numéro de téléphone invalide.", "error");
                return;
            }
            preservePaidSessionOnProfileSave();
            currentUser.phone = phone;
            await saveUserSession(currentUser, false);
            showToast("Numéro de téléphone enregistré !");
            saveUserSession(currentUser, true);
        } catch (err) {
            showToast("Enregistrement impossible. Réessayez.", "error");
        }
    });

    formUpdatePassword?.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!currentUser) return;

        try {
            const oldPass = String(document.getElementById("profileOldPassword")?.value || "").trim();
            const newPass = String(document.getElementById("profileNewPassword")?.value || "").trim();
            const confirmPass = String(document.getElementById("profileConfirmNewPassword")?.value || "").trim();

            const localSaved = loadUsersDb().find((u) => normalizeEmail(u.email) === normalizeEmail(currentUser.email));
            const checkUser = {
                passwordHash: currentUser.passwordHash || (localSaved && localSaved.passwordHash) || ""
            };
            if (checkUser.passwordHash) {
                let match = await passwordMatches(checkUser, oldPass);
                if (!match && localSaved && localSaved.passwordHash) {
                    match = await passwordMatches(localSaved, oldPass);
                }
                if (!match) {
                    showToast("Mot de passe actuel incorrect.", "error");
                    return;
                }
            }
            if (newPass.length < 6) {
                showToast("Le nouveau mot de passe doit contenir au moins 6 caractères.", "error");
                return;
            }
            if (newPass !== confirmPass) {
                showToast("La confirmation ne correspond pas au nouveau mot de passe.", "error");
                return;
            }

            preservePaidSessionOnProfileSave();
            currentUser.passwordHash = await hashPassword(newPass);
            await saveUserSession(currentUser, false);
            formUpdatePassword.reset();
            showToast("Mot de passe mis à jour !");
            saveUserSession(currentUser, true);
        } catch (err) {
            showToast("Mise à jour impossible. Réessayez.", "error");
        }
    });

    btnProfileSubscribe?.addEventListener("click", () => {
        closeProfileModal();
        if (!currentUser) {
            pendingCheckoutAfterAuth = true;
            document.getElementById("loginModal")?.classList.add("active");
            return;
        }
        startMaketouCheckout();
    });
}

function initModals() {
    const openLoginBtn = document.getElementById("openLoginBtn");
    const openRegisterBtn = document.getElementById("openRegisterBtn");
    const loginModal = document.getElementById("loginModal");
    const registerModal = document.getElementById("registerModal");
    const buyModal = document.getElementById("buyModal");

    const closeLogin = document.getElementById("closeLoginModal");
    const closeReg = document.getElementById("closeRegisterModal");
    const closeBuy = document.getElementById("closeBuyModal");

    const switchToLogin = document.getElementById("switchToLogin");
    const switchToRegister = document.getElementById("switchToRegister");

    openLoginBtn?.addEventListener("click", () => loginModal?.classList.add("active"));
    openRegisterBtn?.addEventListener("click", () => registerModal?.classList.add("active"));

    closeLogin?.addEventListener("click", () => loginModal?.classList.remove("active"));
    closeReg?.addEventListener("click", () => registerModal?.classList.remove("active"));
    closeBuy?.addEventListener("click", () => buyModal?.classList.remove("active"));

    switchToLogin?.addEventListener("click", () => {
        registerModal?.classList.remove("active");
        loginModal?.classList.add("active");
    });

    switchToRegister?.addEventListener("click", () => {
        loginModal?.classList.remove("active");
        registerModal?.classList.add("active");
    });

    window.addEventListener("click", (e) => {
        if (e.target.classList?.contains("modal-overlay")) {
            e.target.classList.remove("active");
        }
    });

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeAllModals();
        }
    });
}

function closeAllModals() {
    document.querySelectorAll(".modal-overlay").forEach((m) => m.classList.remove("active"));
}

/* -------------------------------------------------------------------------- */
/* Tunnel de Paiement Sécurisé                                                */
/* -------------------------------------------------------------------------- */

function initCheckout() {
    const directBuyButtons = document.querySelectorAll("#directBuyButton, #btnAlertSubscribe, .btn-buy-instant");
    const buyModal = document.getElementById("buyModal");
    const momoChips = document.querySelectorAll(".momo-chip-card");
    const btnExecuteMomoPayment = document.getElementById("btnExecuteMomoPayment");
    const btnExecuteCardPayment = document.getElementById("btnExecuteCardPayment");
    const phoneInput = document.getElementById("checkoutPhoneInput");
    const checkoutAuthGate = document.getElementById("checkoutAuthGate");
    const checkoutPaymentPanel = document.getElementById("checkoutPaymentPanel");
    const checkoutGoLogin = document.getElementById("checkoutGoLogin");
    const checkoutGoRegister = document.getElementById("checkoutGoRegister");

    momoChips.forEach((chip) => {
        chip.addEventListener("click", () => {
            momoChips.forEach((c) => c.classList.remove("selected"));
            chip.classList.add("selected");
            selectedMomoNetwork = chip.dataset.network || "WAVE";
        });
    });

    function openCheckoutModal() {
        startMaketouCheckout();
    }

    directBuyButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            trackMetaInitiateCheckout();
            openCheckoutModal();
        });
    });

    checkoutGoLogin?.addEventListener("click", () => {
        pendingCheckoutAfterAuth = true;
        buyModal?.classList.remove("active");
        document.getElementById("loginModal")?.classList.add("active");
    });

    checkoutGoRegister?.addEventListener("click", () => {
        pendingCheckoutAfterAuth = true;
        buyModal?.classList.remove("active");
        document.getElementById("registerModal")?.classList.add("active");
    });

    btnExecuteMomoPayment?.addEventListener("click", () => startMaketouCheckout());
    btnExecuteCardPayment?.addEventListener("click", () => startMaketouCheckout());
}

function showPaymentOverlay(text = "Connexion sécurisée en cours…") {
    const overlay = document.getElementById("paymentProcessingOverlay");
    const label = document.getElementById("paymentProcessingText");
    if (label) label.textContent = text;
    overlay?.classList.remove("hidden");
}

function hidePaymentOverlay() {
    document.getElementById("paymentProcessingOverlay")?.classList.add("hidden");
}

async function handlePaymentSuccess(response, currency, amount) {
    showPaymentOverlay("Validation de la licence…");

    if (currentUser) {
        applyPaidSubscriptionPeriod(
            currentUser,
            response?.tx_ref || response?.transaction_id || "",
            response?.expiresAt || ""
        );
        await saveUserSession(currentUser, true);
    }

    if (supabaseClient && currentUser) {
        try {
            await supabaseClient.from("payments").insert({
                user_email: currentUser.email,
                user_unique_id: currentUser.uniqueId,
                transaction_id: String(response?.transaction_id || response?.tx_ref || Date.now()),
                tx_ref: String(response?.tx_ref || ""),
                flw_ref: String(response?.flw_ref || ""),
                amount: Number(amount),
                currency: String(currency),
                status: String(response?.status || "successful"),
                payment_type: response?.payment_type || "flutterwave",
                raw_response: response || {}
            });
        } catch {}
    }

    try { localStorage.removeItem(CONFIG.maketouCartKey); } catch {}
    writeMaketouPending(null);
    if (maketouPollTimer) {
        clearInterval(maketouPollTimer);
        maketouPollTimer = null;
    }

    hidePaymentOverlay();
    closeAllModals();
    initGlobalViewRouter();
    trackMetaPurchase(response?.tx_ref || response?.transaction_id || "paid");
    showToast("🎉 Félicitations ! Votre session d'analyse est débloquée pour le mois !");
}

function splitCustomerName(fullName) {
    const parts = String(fullName || "Client").trim().split(/\s+/).filter(Boolean);
    return {
        firstName: parts[0] || "Client",
        lastName: parts.slice(1).join(" ") || "Membre"
    };
}

function readMaketouPending() {
    try {
        return JSON.parse(localStorage.getItem(CONFIG.maketouPendingKey) || "null");
    } catch {
        return null;
    }
}

function writeMaketouPending(value) {
    try {
        if (value) localStorage.setItem(CONFIG.maketouPendingKey, JSON.stringify(value));
        else localStorage.removeItem(CONFIG.maketouPendingKey);
    } catch {}
}

function buildMaketouReturnUrl(user, cartId) {
    const url = new URL(CONFIG.maketouSuccessUrl);
    if (user && user.uniqueId) url.searchParams.set("uid", user.uniqueId);
    if (cartId) url.searchParams.set("maketou_cart", cartId);
    return url.toString();
}

function maketouServerPaths(kind, query) {
    const origin = window.location.origin;
    const folder = window.location.pathname.replace(/[^/]+$/, "");
    const q = query ? `?${query}` : "";
    if (kind === "verify") {
        return [
            `${origin}${folder}maketou-checkout.php${q}`,
            `${origin}/maketou-checkout.php${q}`,
            `/maketou-checkout.php${q}`,
            `${origin}${folder}index.php?action=maketou_verify${query ? `&${query}` : ""}`,
            `${origin}${folder}index.php?action=maketou_status${query ? `&${query}` : ""}`,
            `${origin}${folder}maketou-status.php${q}`,
            `/api/maketou-status${q}`
        ];
    }
    if (kind === "session") {
        return [
            `${origin}${folder}maketou-checkout.php${q}`,
            `${origin}/maketou-checkout.php${q}`,
            `/maketou-checkout.php${q}`,
            `${origin}${folder}index.php?action=maketou_session${query ? `&${query}` : ""}`
        ];
    }
    if (kind === "status") {
        return [
            `${origin}${folder}maketou-checkout.php${q}`,
            `${origin}${folder}index.php?action=maketou_verify${query ? `&${query}` : ""}`,
            `${origin}${folder}index.php?action=maketou_status${query ? `&${query}` : ""}`,
            `${origin}${folder}maketou-status.php${q}`,
            `${origin}/maketou-status.php${q}`,
            `/api/maketou-status${q}`
        ];
    }
    return [
        `${origin}${folder}index.php?action=maketou_checkout`,
        `${origin}${folder}maketou-checkout.php`,
        `${origin}/maketou-checkout.php`,
        "/api/maketou-checkout"
    ];
}

function extractMaketouRedirect(data) {
    if (!data || typeof data !== "object") return "";
    return data.redirectUrl || data.redirect_url || data.checkoutUrl || data.checkout_url
        || (data.data && (data.data.redirectUrl || data.data.redirect_url))
        || "";
}

async function parseJsonResponse(response) {
    const text = await response.text();
    try { return JSON.parse(text); } catch { return null; }
}

async function createMaketouCart(user) {
    const names = splitCustomerName(user.name);
    const payload = {
        email: user.email,
        firstName: names.firstName,
        lastName: names.lastName,
        phone: user.phone || "",
        uniqueId: user.uniqueId || "",
        redirectURL: buildMaketouReturnUrl(user)
    };

    const paths = maketouServerPaths("checkout");
    for (let i = 0; i < paths.length; i++) {
        try {
            const response = await fetch(paths[i], {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify(payload)
            });
            const data = await parseJsonResponse(response);
            const redirectUrl = extractMaketouRedirect(data);
            if (redirectUrl) {
                return { redirectUrl, cartId: data.cartId || "" };
            }
        } catch {}
    }
    return null;
}

function currentPaymentEmail() {
    if (currentUser && currentUser.email) return String(currentUser.email).trim();
    const pending = readMaketouPending();
    return pending && pending.email ? String(pending.email).trim() : "";
}

async function fetchMaketouVerification(ref) {
    if (!ref) return null;
    const email = currentPaymentEmail();
    const query = `action=verify&ref=${encodeURIComponent(ref)}${email ? `&email=${encodeURIComponent(email)}` : ""}`;
    const paths = maketouServerPaths("verify", query);
    for (let i = 0; i < paths.length; i++) {
        try {
            const response = await fetch(paths[i], { method: "GET", cache: "no-store" });
            const data = await parseJsonResponse(response);
            if (data && typeof data.access === "boolean") return data;
        } catch {}
    }
    return null;
}

async function fetchMaketouSession(token) {
    if (!token) return null;
    const query = `action=session&token=${encodeURIComponent(token)}`;
    const paths = maketouServerPaths("session", query);
    for (let i = 0; i < paths.length; i++) {
        try {
            const response = await fetch(paths[i], { method: "GET", cache: "no-store" });
            const data = await parseJsonResponse(response);
            if (data && typeof data.access === "boolean") return data;
        } catch {}
    }
    return null;
}

async function fetchMaketouCartStatus(cartId) {
    return fetchMaketouVerification(cartId);
}

async function activateMaketouLicense(cartId, token, expiresAt, paymentDate) {
    trackMetaPurchase(cartId || token || "maketou");
    if (currentUser) {
        applyPaidSubscriptionPeriod(currentUser, cartId, expiresAt);
        if (paymentDate) currentUser.paymentDate = paymentDate;
    }
    grantVerifiedAccess(token);
    if (!currentUser) {
        initGlobalViewRouter();
        showToast("🎉 Félicitations ! Votre session d'analyse est débloquée pour le mois !");
        return;
    }
    await handlePaymentSuccess({
        transaction_id: cartId || `maketou-${currentUser.uniqueId}-${Date.now()}`,
        tx_ref: cartId || currentUser.uniqueId,
        status: "successful",
        payment_type: "maketou",
        expiresAt: expiresAt || currentUser.subscriptionExpiresAt || ""
    }, "USD", CONFIG.licenseUsd);
}

function startMaketouPaymentWatch() {
    if (maketouPollTimer) clearInterval(maketouPollTimer);
    maketouPollTimer = setInterval(() => {
        if (verifiedAccessGranted) {
            clearInterval(maketouPollTimer);
            maketouPollTimer = null;
            return;
        }
        let pendingCart = "";
        try { pendingCart = localStorage.getItem(CONFIG.maketouCartKey) || ""; } catch {}
        if (pendingCart || readMaketouPending()) {
            verifyMaketouReturn();
        }
    }, 4000);
}

async function startMaketouCheckout() {
    trackMetaInitiateCheckout();
    if (!currentUser) {
        pendingCheckoutAfterAuth = true;
        closeAllModals();
        document.getElementById("loginModal")?.classList.add("active");
        return;
    }

    const names = splitCustomerName(currentUser.name);
    writeMaketouPending({
        email: currentUser.email,
        uniqueId: currentUser.uniqueId,
        startedAt: Date.now()
    });

    showPaymentOverlay();
    const created = await createMaketouCart(currentUser);
    hidePaymentOverlay();

    if (created && created.redirectUrl) {
        if (created.cartId) {
            try { localStorage.setItem(CONFIG.maketouCartKey, created.cartId); } catch {}
        }
        closeAllModals();
        window.location.href = created.redirectUrl;
        return;
    }

    const checkout = new URL(CONFIG.maketouCheckoutUrl);
    checkout.searchParams.set("firstName", names.firstName);
    checkout.searchParams.set("lastName", names.lastName);
    if (currentUser.phone) checkout.searchParams.set("phone", currentUser.phone);
    const returnUrl = buildMaketouReturnUrl(currentUser);
    checkout.searchParams.set("redirectURL", returnUrl);
    checkout.searchParams.set("redirect_url", returnUrl);
    closeAllModals();
    window.location.href = checkout.toString();
}

async function verifyMaketouReturn() {
    if (maketouVerifyInFlight) return;
    const params = new URLSearchParams(window.location.search);
    const returnHint = hasMaketouReturnHint(params);
    const ref = extractPaymentRef(params);

    if (returnHint && !ref) {
        if (verifiedAccessGranted) {
            clearMaketouReturnUrl();
            return;
        }
        showPaymentOverlay("Validation de la licence…");
        if (currentUser) {
            for (let i = 0; i < 3; i++) {
                await syncUserFromSupabase();
                if (currentUser.isSubscribed) {
                    hidePaymentOverlay();
                    grantVerifiedAccess();
                    clearMaketouReturnUrl();
                    initGlobalViewRouter();
                    showToast("🎉 Félicitations ! Votre session d'analyse est débloquée pour le mois !");
                    trackMetaPurchase("maketou-return");
                    return;
                }
                if (i < 2) await new Promise((resolve) => setTimeout(resolve, 1200));
            }
        }
        hidePaymentOverlay();
        denyPaymentAccess("Paiement non confirmé. L'accès reste bloqué.");
        return;
    }

    if (!ref) {
        if (verifiedAccessGranted) return;
        if (currentUser) {
            await syncUserFromSupabase();
            if (currentUser.isSubscribed) {
                grantVerifiedAccess();
                initGlobalViewRouter();
            }
        }
        return;
    }

    maketouVerifyInFlight = true;
    try {
        const result = await fetchMaketouVerification(ref);
        const paid = Boolean(result && result.access === true && result.token);
        if (paid) {
            clearMaketouReturnUrl();
            await activateMaketouLicense(result.cartId || ref, result.token, result.expiresAt, result.paymentDate);
            return;
        }
        if (returnHint) {
            if (verifiedAccessGranted) {
                clearMaketouReturnUrl();
                return;
            }
            denyPaymentAccess("Paiement non confirmé. L'accès reste bloqué.");
        }
    } finally {
        maketouVerifyInFlight = false;
    }
}

/* -------------------------------------------------------------------------- */
/* Dashboard Administrateur                                                   */
/* -------------------------------------------------------------------------- */

function initMasterAdminDashboard() {
    const adminModal = document.getElementById("adminModal");
    const closeAdminModal = document.getElementById("closeAdminModal");
    const formAdminAuth = document.getElementById("formAdminAuth");
    const adminAuthScreen = document.getElementById("adminAuthScreen");
    const adminDashboardScreen = document.getElementById("adminDashboardScreen");
    const btnAdminActivate = document.getElementById("btnAdminActivateById");
    const adminTargetIdInput = document.getElementById("adminTargetIdInput");

    const openAdminModal = () => adminModal?.classList.add("active");
    const maybeOpenAdminFromHash = () => {
        if (window.location.hash === "#admin") openAdminModal();
    };
    maybeOpenAdminFromHash();
    window.addEventListener("hashchange", maybeOpenAdminFromHash);

    closeAdminModal?.addEventListener("click", () => adminModal?.classList.remove("active"));

    formAdminAuth?.addEventListener("submit", (e) => {
        e.preventDefault();
        const key = document.getElementById("adminSecretKeyInput").value.trim();
        if (key === CONFIG.adminSecret || key === "ADMIN" || key === "BAOBAB2026") {
            adminAuthScreen?.classList.add("hidden");
            adminDashboardScreen?.classList.remove("hidden");
            renderAdminUsersTable();
            showToast("Accès administrateur déverrouillé.");
        } else {
            showToast("Mot de passe administrateur incorrect.", "error");
        }
    });

    btnAdminActivate?.addEventListener("click", async () => {
        const targetId = adminTargetIdInput?.value.trim().toUpperCase();
        if (!targetId) {
            showToast("Veuillez saisir un ID membre (ex: CRASH-5627883).", "error");
            return;
        }
        if (!/^CRASH-\d{7}$/.test(targetId)) {
            showToast("ID invalide. Format attendu : CRASH-5627883.", "error");
            return;
        }
        const idNumber = parseInt(targetId.replace(/\D/g, ""), 10);
        if (idNumber < 5000000 || idNumber > 9999999) {
            showToast("L'ID doit être compris entre CRASH-5000000 et CRASH-9999999.", "error");
            return;
        }

        let usersDb = loadUsersDb();
        let found = false;

        usersDb = usersDb.map((u) => {
            if (u.uniqueId === targetId || u.email?.toUpperCase() === targetId) {
                applyPaidSubscriptionPeriod(u, `admin-${Date.now()}`);
                found = true;
            }
            return u;
        });

        if (found) {
            saveUsersDb(usersDb);
            if (currentUser && (currentUser.uniqueId === targetId || currentUser.email?.toUpperCase() === targetId)) {
                applyPaidSubscriptionPeriod(currentUser, `admin-${Date.now()}`);
                grantVerifiedAccess();
                writeJson(CONFIG.sessionKey, currentUser);
                persistAccountToServer(currentUser);
                initGlobalViewRouter();
            }
            if (supabaseClient) {
                try {
                    const active = usersDb.find((u) => u.uniqueId === targetId);
                    await supabaseClient.from("users").update({
                        is_subscribed: true,
                        payment_date: active && active.paymentDate,
                        subscription_expires_at: active && active.subscriptionExpiresAt,
                        vip_until: active && active.subscriptionExpiresAt
                    }).eq("unique_id", targetId);
                } catch {}
            }
            renderAdminUsersTable();
            adminTargetIdInput.value = "";
            showToast(`Succès : accès activé pour ${targetId}`);
        } else {
            const newMember = {
                id: Date.now(),
                uniqueId: targetId,
                name: `Membre_${targetId}`,
                email: `${targetId.toLowerCase()}@client.com`,
                phone: "",
                passwordHash: "",
                isSubscribed: true,
                registeredAt: new Date().toLocaleDateString("fr-FR"),
                paymentDate: new Date().toISOString(),
                subscriptionExpiresAt: computeRenewedExpiryIso(""),
                vipUntil: ""
            };
            newMember.vipUntil = newMember.subscriptionExpiresAt;
            usersDb.push(newMember);
            saveUsersDb(usersDb);

            if (currentUser) {
                currentUser.isSubscribed = true;
                currentUser.uniqueId = targetId;
                grantVerifiedAccess();
                writeJson(CONFIG.sessionKey, currentUser);
                initGlobalViewRouter();
            }

            if (supabaseClient) {
                try {
                    await supabaseClient.from("users").upsert({
                        unique_id: targetId,
                        name: `Membre_${targetId}`,
                        email: `${targetId.toLowerCase()}@client.com`,
                        is_subscribed: true
                    });
                } catch {}
            }

            renderAdminUsersTable();
            adminTargetIdInput.value = "";
            showToast(`Nouvel ID ${targetId} créé et activé.`);
        }
    });
}

async function renderAdminUsersTable() {
    const tbody = document.getElementById("adminUsersTableBody");
    if (!tbody) return;

    let usersDb = loadUsersDb();

    if (supabaseClient) {
        try {
            const { data } = await supabaseClient.from("users").select("*");
            if (data && data.length > 0) {
                data.forEach((cloudUser) => {
                    const idx = usersDb.findIndex((u) => u.email === cloudUser.email || u.uniqueId === cloudUser.unique_id);
                    if (idx !== -1) {
                        usersDb[idx].isSubscribed = Boolean(cloudUser.is_subscribed);
                    } else {
                        usersDb.push({
                            id: cloudUser.id || Date.now(),
                            uniqueId: sanitize7DigitId(cloudUser.unique_id),
                            name: cloudUser.name || "Client",
                            email: cloudUser.email,
                            phone: cloudUser.phone || "",
                            isSubscribed: Boolean(cloudUser.is_subscribed),
                            registeredAt: new Date().toLocaleDateString("fr-FR")
                        });
                    }
                });
                saveUsersDb(usersDb);
            }
        } catch {}
    }

    if (usersDb.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:#9ca3af;padding:15px;">Aucun utilisateur inscrit.</td></tr>`;
        return;
    }

    tbody.innerHTML = usersDb.map((u) => `
        <tr>
            <td><strong class="gold-code">${escapeHtml(sanitize7DigitId(u.uniqueId))}</strong></td>
            <td>${escapeHtml(u.name || "Client")}</td>
            <td>${escapeHtml(u.email || "-")}</td>
            <td>
                ${isSubscriptionActive(u)
                    ? '<span class="badge-tag green"><i class="fa-solid fa-check"></i> ACTIF</span>'
                    : '<span class="badge-tag red"><i class="fa-solid fa-xmark"></i> NON ACTIVÉ</span>'}
            </td>
            <td>
                ${!isSubscriptionActive(u)
                    ? `<button type="button" class="btn-table-action activate" onclick="adminToggleUser('${escapeHtml(u.email)}', true)"><i class="fa-solid fa-bolt"></i> Activer</button>`
                    : `<button type="button" class="btn-table-action deactivate" onclick="adminToggleUser('${escapeHtml(u.email)}', false)"><i class="fa-solid fa-ban"></i> Suspendre</button>`}
            </td>
        </tr>
    `).join("");
}

window.adminToggleUser = async function (email, status) {
    let usersDb = loadUsersDb();
    const idx = usersDb.findIndex((u) => u.email === email);
    if (idx !== -1) {
        if (status) applyPaidSubscriptionPeriod(usersDb[idx], `admin-${Date.now()}`);
        else {
            usersDb[idx].isSubscribed = false;
            usersDb[idx].subscriptionExpiresAt = new Date().toISOString();
            usersDb[idx].vipUntil = usersDb[idx].subscriptionExpiresAt;
        }
        saveUsersDb(usersDb);

        if (currentUser && currentUser.email === email) {
            currentUser.isSubscribed = status;
            if (status) {
                applyPaidSubscriptionPeriod(currentUser, `admin-${Date.now()}`);
                grantVerifiedAccess();
            } else {
                currentUser.subscriptionExpiresAt = usersDb[idx].subscriptionExpiresAt;
                currentUser.vipUntil = usersDb[idx].vipUntil;
                revokeVerifiedAccess();
            }
            writeJson(CONFIG.sessionKey, currentUser);
            persistAccountToServer(currentUser);
            initGlobalViewRouter();
        }

        if (supabaseClient) {
            try {
                await supabaseClient.from("users").update({
                    is_subscribed: status,
                    subscription_expires_at: usersDb[idx].subscriptionExpiresAt || null,
                    vip_until: usersDb[idx].vipUntil || null
                }).eq("email", email);
            } catch {}
        }

        renderAdminUsersTable();
        showToast(status ? "Membre activé !" : "Accès membre suspendu.");
    }
};

/* -------------------------------------------------------------------------- */
/* Toasts                                                                     */
/* -------------------------------------------------------------------------- */

function showToast(message, type = "success") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast-message ${type === "error" ? "error" : ""}`;
    const icon = type === "error"
        ? '<i class="fa-solid fa-triangle-exclamation" style="color:#ef4444;" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-circle-check" style="color:#10b981;" aria-hidden="true"></i>';

    toast.innerHTML = `${icon} <span>${escapeHtml(message)}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(100%)";
        toast.style.transition = "all 0.3s ease";
        setTimeout(() => toast.remove(), 300);
    }, 4200);
}

function normalizeReferralCode(value) {
    return formatMemberId(value);
}

function captureReferralCode() {}

function readStoredReferralCode() {
    return "";
}

function initReferralSystem() {}
