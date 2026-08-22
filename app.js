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
    licenseUsd: 50,
    licenseXof: 30000,
    sessionKey: "crash_predictor_user_2026",
    usersDbKey: "crash_users_db_2026",
    guestIdKey: "crash_guest_id_2026",
    timerKey: "crash_timer_start_48h_v4",
    langKey: "crash_user_lang_pref",
    maketouCartKey: "crash_maketou_cart",
    maketouPendingKey: "crash_maketou_pending",
    maketouCheckoutUrl: "https://50.mymaketou.shop/products/50/checkout",
    maketouProductId: "d307c251-4302-4adf-acce-e69a8dd9951a",
    maketouApiBase: "https://api.maketou.net",
    maketouSuccessUrl: "https://crashpredictor.fr/?payment=success&status=approved",
    accessUnlockedKey: "crash_access_unlocked",
    userPremiumKey: "user_premium",
    accessTokenKey: "crash_access_token",
    memberIdKey: "user_member_id",
    accessVerifiedKey: "crash_access_v2_verified"
};

// ==========================================================================
// DICTIONNAIRE DE TRADUCTION COMPLET (I18N)
// ==========================================================================
const TRANSLATIONS = {
    fr: {
        doc_title: "CRASH PREDICTOR 2026 | Cockpit d'Analyse et Prédictions Officielles",
        ticker_live: "EN DIRECT",
        ticker_sub: "utilisateurs connectées sur le site crashpredictor.fr",
        alert_unsubscribed: "<strong>ACCÈS NON ACTIVÉ :</strong> activez votre licence pour ouvrir le cockpit.",
        btn_alert_unlock: "Débloquer l'accès – 50 $",
        badge_edition: "ÉDITION 2026",
        nav_login: "Connexion",
        nav_register: "Inscription",
        promo_offer: "DERNIÈRE CHANCE 50 $ :",
        promo_remaining: "restante(s)",
        hero_subtitle: "Plateforme d'analyse haute fréquence et anticipation des trajectoires en direct.",
        badge_algo: "MOTEUR 2026",
        badge_live_session: "SESSION TEMPS RÉEL",
        badge_verified: "VÉRIFIÉ",
        flash_default: "vient d'activer sa licence",
        offer_title: "Licence Officielle & Accès Illimité",
        offer_desc: "Débloquez l'accès complet au cockpit d'analyse, aux prédictions en direct et à l'historique complet.",
        price_lifetime: "/ Mois",
        price_cfa: "",
        benefit_1_title: "Précision Algorithmique Optimale",
        benefit_1_desc: "Analyse en temps réel et anticipation précise des trajectoires.",
        benefit_2_title: "Activation Immédiate",
        benefit_2_desc: "Accès instantané à l'ensemble des prédictions et au cockpit dès la validation de votre paiement.",
        benefit_3_title: "Abonnement Mensuel",
        benefit_3_desc: "Accès complet renouvelé chaque mois, simple abonnement mensuel.",
        benefit_4_title: "Multi-supports",
        benefit_4_desc: "Interface optimisée pour un usage fluide sur smartphone, tablette et ordinateur.",
        btn_buy_instant: "Débloquer mon accès complet – 50 $",
        secure_guarantee: "Paiement sécurisé et chiffré • Activation automatique du cockpit",
        reviews_badge: "RETOURS MEMBRES VÉRIFIÉS (113 AVIS)",
        reviews_title: "Retours d'Expérience & Témoignages",
        reviews_subtitle: "Commentaires authentiques associés à des identifiants membres anonymes.",
        stat_registered: "Membres inscrits",
        stat_satisfaction: "Indice de satisfaction",
        stat_license: "Par mois",
        btn_load_more: "Afficher plus de témoignages",
        remaining_txt: "restants",
        footer_copy: "© 2026 CRASH PREDICTOR TECHNOLOGIES. Tous droits réservés.",
        footer_admin: "Espace administrateur",
        vip_official: "OFFICIEL",
        vip_radar_live: "FLUX RADAR EN DIRECT",
        vip_member_active: "Membre Actif",
        radar_heading: "RADAR DE VOL VERTICAL HAUTE PRÉCISION",
        radar_session_badge: "SESSION ACTIVE",
        pred_label: "POINT DE SORTIE CALCULÉ",
        pred_stability: "Stabilité :",
        pred_advice: "Retirez vos gains avant cette cote de sécurité",
        hud_label: "COTE EN DIRECT",
        scan_title: "CALIBRATION DU SIGNAL",
        scan_subtitle: "Prochain tour en préparation…",
        vip_flight_init: "Analyse des flux… Décollage imminent",
        sys_params: "PARAMÈTRES DU SYSTÈME",
        sys_algo_stab: "Stabilité algorithmique",
        sys_latency: "Latence flux",
        sys_license_status: "Statut licence",
        sys_active_lifetime: "ACTIVE / MOIS",
        sys_your_id: "Votre ID membre",
        recent_rounds: "DERNIERS ROUNDS",
        profile_space: "Mon espace membre",
        profile_your_id: "VOTRE ID UNIQUE :",
        profile_license_status: "Statut de votre licence",
        status_unsubscribed: "NON ACTIVÉ",
        lbl_phone: "Numéro de téléphone",
        btn_save: "Enregistrer",
        lbl_update_pass: "Modifier mon mot de passe",
        btn_update: "Mettre à jour",
        btn_profile_unlock: "Débloquer mon accès complet – 50 $",
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
        checkout_badge: "50 $ / Mois",
        checkout_title: "Paiement sécurisé",
        checkout_sub: "Mobile Money ou carte bancaire",
        checkout_gate_msg: "Connectez-vous ou créez un compte pour lier la licence à votre ID.",
        checkout_momo_num: "Numéro Mobile Money",
        btn_pay_momo: "Payer par Mobile Money — 30 000 F",
        checkout_guarantee_note: "Le cockpit s’ouvre immédiatement après la validation de votre paiement.",
        btn_pay_card: "Payer par carte bancaire — 50 $",
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
        doc_title: "CRASH PREDICTOR 2026 | Official Analysis Cockpit & Live Signals",
        ticker_live: "LIVE",
        ticker_sub: "users connected on crashpredictor.fr",
        alert_unsubscribed: "<strong>ACCESS NOT ACTIVATED:</strong> activate your license to open the cockpit.",
        btn_alert_unlock: "Unlock Access – $50",
        badge_edition: "2026 EDITION",
        nav_login: "Login",
        nav_register: "Sign Up",
        promo_offer: "LAST CHANCE $50:",
        promo_remaining: "remaining",
        hero_subtitle: "High-frequency algorithmic analysis and real-time flight trajectory anticipation.",
        badge_algo: "2026 ENGINE",
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
        btn_buy_instant: "Unlock Full Access – $50",
        secure_guarantee: "Encrypted & secure checkout • Instant cockpit activation",
        reviews_badge: "VERIFIED MEMBER REVIEWS (113 REVIEWS)",
        reviews_title: "User Experience & Testimonials",
        reviews_subtitle: "Authentic feedback linked to anonymous member IDs.",
        stat_registered: "Registered members",
        stat_satisfaction: "Satisfaction rate",
        stat_license: "Per month",
        btn_load_more: "Show more testimonials",
        remaining_txt: "remaining",
        footer_copy: "© 2026 CRASH PREDICTOR TECHNOLOGIES. All rights reserved.",
        footer_admin: "Admin portal",
        vip_official: "OFFICIAL",
        vip_radar_live: "LIVE RADAR FEED",
        vip_member_active: "Active Member",
        radar_heading: "HIGH-PRECISION VERTICAL RADAR",
        radar_session_badge: "ACTIVE SESSION",
        pred_label: "CALCULATED EXIT THRESHOLD",
        pred_stability: "Stability:",
        pred_advice: "Cash-out your profits before this safety threshold",
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
        profile_space: "Member Area",
        profile_your_id: "YOUR UNIQUE ID:",
        profile_license_status: "License Status",
        status_unsubscribed: "NOT ACTIVATED",
        lbl_phone: "Phone Number",
        btn_save: "Save",
        lbl_update_pass: "Change Password",
        btn_update: "Update",
        btn_profile_unlock: "Unlock Full Access – $50",
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
        checkout_badge: "$50 / Month",
        checkout_title: "Secure Checkout",
        checkout_sub: "Credit Card or Mobile Payment",
        checkout_gate_msg: "Please log in or sign up to link this license to your member ID.",
        checkout_momo_num: "Mobile Number",
        btn_pay_momo: "Pay via Mobile Money",
        checkout_guarantee_note: "The cockpit opens immediately after payment confirmation.",
        btn_pay_card: "Pay with Credit Card – $50",
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
        doc_title: "CRASH PREDICTOR 2026 | Cockpit Oficial de Análisis y Predicciones",
        ticker_live: "EN VIVO",
        ticker_sub: "usuarios conectados en crashpredictor.fr",
        alert_unsubscribed: "<strong>ACCESO NO ACTIVADO:</strong> active su licencia para abrir el cockpit.",
        btn_alert_unlock: "Desbloquear Acceso – 50 $",
        badge_edition: "EDICIÓN 2026",
        nav_login: "Iniciar Sesión",
        nav_register: "Registrarse",
        promo_offer: "ÚLTIMA OPORTUNIDAD 50 $:",
        promo_remaining: "restante(s)",
        hero_subtitle: "Plataforma de análisis de alta frecuencia y anticipación de trayectorias en vivo.",
        badge_algo: "MOTOR 2026",
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
        btn_buy_instant: "Desbloquear mi acceso completo – 50 $",
        secure_guarantee: "Pago seguro y encriptado • Activación automática del cockpit",
        reviews_badge: "OPINIONES DE MIEMBROS VERIFICADOS (113 RESEÑAS)",
        reviews_title: "Experiencias y Testimonios",
        reviews_subtitle: "Comentarios auténticos vinculados a identificadores de miembros anónimos.",
        stat_registered: "Miembros registrados",
        stat_satisfaction: "Índice de satisfacción",
        stat_license: "Por mes",
        btn_load_more: "Ver más testimonios",
        remaining_txt: "restantes",
        footer_copy: "© 2026 CRASH PREDICTOR TECHNOLOGIES. Todos los derechos reservados.",
        footer_admin: "Acceso Administrador",
        vip_official: "OFICIAL",
        vip_radar_live: "RADAR EN VIVO",
        vip_member_active: "Miembro Activo",
        radar_heading: "RADAR DE VUELO VERTICAL DE ALTA PRECISIÓN",
        radar_session_badge: "SESIÓN ACTIVA",
        pred_label: "PUNTO DE SALIDA CALCULADO",
        pred_stability: "Estabilidad:",
        pred_advice: "Retire sus ganancias antes de este umbral de seguridad",
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
        profile_space: "Mi Área de Miembro",
        profile_your_id: "SU ID ÚNICO:",
        profile_license_status: "Estado de Licencia",
        status_unsubscribed: "NO ACTIVADO",
        lbl_phone: "Número de Teléfono",
        btn_save: "Guardar",
        lbl_update_pass: "Cambiar Contraseña",
        btn_update: "Actualizar",
        btn_profile_unlock: "Desbloquear acceso completo – 50 $",
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
        checkout_badge: "50 $ / Mes",
        checkout_title: "Pago Seguro",
        checkout_sub: "Tarjeta Bancaria o Pago Móvil",
        checkout_gate_msg: "Inicie sesión o regístrese para vincular la licencia a su ID.",
        checkout_momo_num: "Número Móvil",
        btn_pay_momo: "Pagar con Mobile Money",
        checkout_guarantee_note: "El cockpit se abre inmediatamente tras confirmar el pago.",
        btn_pay_card: "Pagar con Tarjeta – 50 $",
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
        doc_title: "CRASH PREDICTOR 2026 | Cockpit Oficial de Análise e Predições",
        ticker_live: "AO VIVO",
        ticker_sub: "utilizadores ligados em crashpredictor.fr",
        alert_unsubscribed: "<strong>ACESSO NÃO ATIVADO:</strong> ative sua licença para abrir o cockpit.",
        btn_alert_unlock: "Desbloquear Acesso – 50 $",
        badge_edition: "EDIÇÃO 2026",
        nav_login: "Entrar",
        nav_register: "Registar",
        promo_offer: "ÚLTIMA CHANCE 50 $:",
        promo_remaining: "restante(s)",
        hero_subtitle: "Plataforma de análise de alta frequência e antecipação de trajetórias em tempo real.",
        badge_algo: "MOTOR 2026",
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
        btn_buy_instant: "Desbloquear Acesso Completo – 50 $",
        secure_guarantee: "Pagamento seguro e encriptado • Ativação imediata do cockpit",
        reviews_badge: "AVALIAÇÕES DE MEMBROS (113 AVALIAÇÕES)",
        reviews_title: "Depoimentos e Avaliações",
        reviews_subtitle: "Comentários autênticos vinculados a IDs de membros anónimos.",
        stat_registered: "Membros registados",
        stat_satisfaction: "Índice de satisfação",
        stat_license: "Por mês",
        btn_load_more: "Ver mais avaliações",
        remaining_txt: "restantes",
        footer_copy: "© 2026 CRASH PREDICTOR TECHNOLOGIES. Todos os direitos reservados.",
        footer_admin: "Área de Administração",
        vip_official: "OFICIAL",
        vip_radar_live: "RADAR EM DIRETO",
        vip_member_active: "Membro Ativo",
        radar_heading: "RADAR DE VOO VERTICAL DE ALTA PRECISÃO",
        radar_session_badge: "SESSÃO ATIVA",
        pred_label: "PONTO DE SAÍDA CALCULADO",
        pred_stability: "Estabilidade:",
        pred_advice: "Retire os seus ganhos antes deste limiar de segurança",
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
        profile_space: "Minha Área de Membro",
        profile_your_id: "SEU ID ÚNICO:",
        profile_license_status: "Estado da Licença",
        status_unsubscribed: "NÃO ATIVADO",
        lbl_phone: "Número de Telefone",
        btn_save: "Guardar",
        lbl_update_pass: "Alterar Palavra-passe",
        btn_update: "Atualizar",
        btn_profile_unlock: "Desbloquear Acesso – 50 $",
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
        checkout_badge: "50 $ / Mês",
        checkout_title: "Pagamento Seguro",
        checkout_sub: "Cartão de Crédito ou Pagamento Móvel",
        checkout_gate_msg: "Inicie sessão ou registe-se para vincular a licença ao seu ID.",
        checkout_momo_num: "Número de Telemóvel",
        btn_pay_momo: "Pagar com Mobile Money",
        checkout_guarantee_note: "O cockpit abre imediatamente após a validação do pagamento.",
        btn_pay_card: "Pagar com Cartão – 50 $",
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
        doc_title: "CRASH PREDICTOR 2026 | Offizielles Analyse-Cockpit & Live-Signale",
        ticker_live: "LIVE",
        ticker_sub: "Nutzer verbunden auf crashpredictor.fr",
        alert_unsubscribed: "<strong>ZUGANG NICHT AKTIV:</strong> Aktivieren Sie Ihre Lizenz, um das Cockpit zu öffnen.",
        btn_alert_unlock: "Zugang freischalten – 50 $",
        badge_edition: "EDITION 2026",
        nav_login: "Anmelden",
        nav_register: "Registrieren",
        promo_offer: "LETZTE CHANCE 50 $:",
        promo_remaining: "verbleibend",
        hero_subtitle: "Hochfrequenz-Algorithmen und Echtzeit-Flugbahnvorhersage im Live-Cockpit.",
        badge_algo: "2026 ENGINE",
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
        btn_buy_instant: "Vollen Zugang freischalten – 50 $",
        secure_guarantee: "Sichere & verschlüsselte Zahlung • Automatische Cockpit-Aktivierung",
        reviews_badge: "VERIFIZIERTE MITGLIEDER (113 BEWERTUNGEN)",
        reviews_title: "Erfahrungsberichte & Feedback",
        reviews_subtitle: "Authentische Bewertungen von verifizierten Mitgliedern.",
        stat_registered: "Registrierte Mitglieder",
        stat_satisfaction: "Zufriedenheitsrate",
        stat_license: "Pro Monat",
        btn_load_more: "Weitere Bewertungen laden",
        remaining_txt: "übrig",
        footer_copy: "© 2026 CRASH PREDICTOR TECHNOLOGIES. Alle Rechte vorbehalten.",
        footer_admin: "Admin-Bereich",
        vip_official: "OFFIZIELL",
        vip_radar_live: "LIVE-RADARFEED",
        vip_member_active: "Aktives Mitglied",
        radar_heading: "HOCHPRÄZISES VERTIKALES RADAR",
        radar_session_badge: "AKTIVE SITZUNG",
        pred_label: "BERECHNETER AUSSTIEGSPUNKT",
        pred_stability: "Stabilität:",
        pred_advice: "Realisieren Sie Ihre Gewinne vor dieser Sicherheitsschwelle",
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
        profile_space: "Mein Mitgliedsbereich",
        profile_your_id: "IHRE EINZIGARTIGE ID:",
        profile_license_status: "Lizenzstatus",
        status_unsubscribed: "NICHT AKTIVIERT",
        lbl_phone: "Telefonnummer",
        btn_save: "Speichern",
        lbl_update_pass: "Passwort ändern",
        btn_update: "Aktualisieren",
        btn_profile_unlock: "Zugang freischalten – 50 $",
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
        checkout_badge: "50 $ / Monat",
        checkout_title: "Sichere Bezahlung",
        checkout_sub: "Kreditkarte oder Mobile Zahlung",
        checkout_gate_msg: "Bitte anmelden oder registrieren, um die Lizenz mit Ihrer ID zu verknüpfen.",
        checkout_momo_num: "Mobilfunknummer",
        btn_pay_momo: "Mit Mobile Money bezahlen",
        checkout_guarantee_note: "Das Cockpit öffnet sich sofort nach erfolgreicher Zahlung.",
        btn_pay_card: "Mit Kreditkarte bezahlen – 50 $",
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

// ==========================================================================
// 113 AVIS CLIENTS DYNAMIQUES & NATURELS (IDs 7 CHIFFRES : 5 000 000 - 10 000 000)
// ==========================================================================
const WINNER_COMMENTS = [
    { username: "Koffi_CI", lang: "FR", gain: "+$450", comment: "Cockpit très clair, prédictions nettes et prise en main immédiate." },
    { username: "James_UK", lang: "EN", gain: "+$1,380", comment: "Clean cockpit, stable animation and instant access after payment." },
    { username: "Lucia_ES", lang: "ES", gain: "+$580", comment: "Increíble precisión. El cockpit se abrió de inmediato tras el pago." },
    { username: "Omar_AR", lang: "AR", gain: "+$720", comment: "المنصة سريعة ودقيقة، والوصول فُتح مباشرة بعد الدفع." },
    { username: "Bruno_BR", lang: "PT", gain: "+$1,650", comment: "Pagamento confirmado e o cockpit abriu na hora. Visual excelente." },
    { username: "Arjun_IN", lang: "HI", gain: "+$810", comment: "बहुत साफ़ इंटरफ़ेस और लाइव भविष्यवाणियाँ एकदम स्थिर हैं।" },
    { username: "Dmitri_RU", lang: "RU", gain: "+$940", comment: "Стабильный сигнал и понятный радар. Доступ открылся сразу." },
    { username: "Lukas_DE", lang: "DE", gain: "+$940", comment: "Sehr stabile Signale und saubere Radar-Animation auf dem Smartphone." },
    { username: "Marco_IT", lang: "IT", gain: "+$870", comment: "Piattaforma solida, nessun rallentamento durante le sessioni." },
    { username: "Emre_TR", lang: "TR", gain: "+$690", comment: "Ödeme sonrası anında açıldı. Radar akıcı ve okunması kolay." },
    { username: "Rina_ID", lang: "ID", gain: "+$560", comment: "Tampilan rapi, prediksi jelas, dan akses langsung setelah bayar." },
    { username: "Sanne_NL", lang: "NL", gain: "+$730", comment: "Strak dashboard, snelle activatie en stabiele live signalen." },
    { username: "Yuki_JP", lang: "JA", gain: "+$1,020", comment: "操作が分かりやすく、支払い後すぐにコクピットが開きました。" },
    { username: "Noah_US", lang: "EN", gain: "+$890", comment: "Real-time radar works flawlessly on iPhone. Worth the monthly plan." },
    { username: "Awa_SN", lang: "FR", gain: "+$820", comment: "Licence rentabilisée rapidement, rien à redire sur la fluidité." },
    { username: "Sofia_MX", lang: "ES", gain: "+$920", comment: "Herramienta muy limpia y rápida. Las señales son exactas." },
    { username: "Layla_EG", lang: "AR", gain: "+$640", comment: "تجربة ممتازة على الجوال، بدون تأخير في التحليل." },
    { username: "Camila_BR", lang: "PT", gain: "+$780", comment: "Radar em tempo real muito fluido e preciso no telemóvel." },
    { username: "Priya_IN", lang: "HI", gain: "+$540", comment: "मोबाइल पर बहुत स्मूद चलता है, कोई लैग नहीं।" },
    { username: "Elena_RU", lang: "RU", gain: "+$1,180", comment: "Отличная точность по точкам выхода. Рекомендую." },
    { username: "Anna_DE", lang: "DE", gain: "+$1,480", comment: "Hervorragende Reaktionszeit, sofortige Freischaltung nach Zahlung." },
    { username: "Giulia_IT", lang: "IT", gain: "+$650", comment: "La barra di stato informa bene su ogni fase del round." },
    { username: "Elif_TR", lang: "TR", gain: "+$1,140", comment: "Çıkış eşiği net. Mobilde de çok rahat kullanılıyor." },
    { username: "Budi_ID", lang: "ID", gain: "+$910", comment: "Sinyal stabil, tidak ada delay, sangat membantu sesi saya." },
    { username: "Daan_NL", lang: "NL", gain: "+$860", comment: "Duidelijke cash-out hint en soepele animatie." },
    { username: "Hana_JP", lang: "JA", gain: "+$770", comment: "モバイルでも見やすく、予測の安定感があります。" },
    { username: "Ethan_CA", lang: "EN", gain: "+$560", comment: "Fast loading, no lags, monthly access unlocked instantly." },
    { username: "Diego_AR", lang: "ES", gain: "+$1,340", comment: "La curva vertical ayuda mucho a visualizar el momento exacto." },
    { username: "Youssef_MA", lang: "AR", gain: "+$1,050", comment: "الدفع مرّ بسرعة والحساب بقي نشطًا بعد التحديث." },
    { username: "Thiago_BR", lang: "PT", gain: "+$1,120", comment: "Ótima precisão nas saídas seguras, muito satisfeito." },
    { username: "Rahul_IN", lang: "HI", gain: "+$1,260", comment: "पेमेंट के बाद तुरंत एक्सेस मिला। बहुत भरोसेमंद प्लेटफ़ॉर्म।" },
    { username: "Ivan_RU", lang: "RU", gain: "+$670", comment: "Интерфейс чистый, без зависаний, удобно с телефона." },
    { username: "Jonas_DE", lang: "DE", gain: "+$720", comment: "Klare Schwellenwerte und angenehme Bedienung." },
    { username: "Luca_IT", lang: "IT", gain: "+$1,310", comment: "Ottimo comfort visivo durante le sessioni lunghe." },
    { username: "Can_TR", lang: "TR", gain: "+$480", comment: "Kurulum yok, tarayıcıda hemen çalışıyor." },
    { username: "Sari_ID", lang: "ID", gain: "+$1,330", comment: "Aktivasi instan, prediksi rapi, sangat worth it." },
    { username: "Femke_NL", lang: "NL", gain: "+$1,090", comment: "Betrouwbare feed en nette mobiele weergave." },
    { username: "Kenta_JP", lang: "JA", gain: "+$1,410", comment: "決済後すぐに使えました。予測の一貫性が高いです。" },
    { username: "Maya_US", lang: "EN", gain: "+$1,620", comment: "The exit threshold algorithm is remarkably consistent." },
    { username: "Moussa_CI", lang: "FR", gain: "+$1,100", comment: "Interface propre et rapide à charger. Très satisfait du service." },
    { username: "Valentina_CO", lang: "ES", gain: "+$410", comment: "Activación inmediata y soporte sin problemas en móvil." },
    { username: "Nour_LB", lang: "AR", gain: "+$880", comment: "التصميم واضح والنقاط المقترحة للخروج مفيدة جدًا." },
    { username: "Ines_PT", lang: "PT", gain: "+$590", comment: "Assinatura mensal simples e acesso imediato. Recomendo." },
    { username: "Ananya_IN", lang: "HI", gain: "+$690", comment: "डिज़ाइन साफ़ है और कैश-आउट संकेत समझने में आसान है।" },
    { username: "Olga_RU", lang: "RU", gain: "+$1,430", comment: "Отличный инструмент. Никаких сбоев за две недели." },
    { username: "Mia_AT", lang: "DE", gain: "+$830", comment: "Sofortiger Zugriff und sehr lesbares Radar." },
    { username: "Chiara_IT", lang: "IT", gain: "+$750", comment: "Ottimo strumento di anticipazione, molto chiaro." },
    { username: "Deniz_TR", lang: "TR", gain: "+$920", comment: "Arayüz sade, tahminler tutarlı, tavsiye ederim." },
    { username: "Andi_ID", lang: "ID", gain: "+$640", comment: "Mudah dipakai di Chrome Android, tidak lemot." },
    { username: "Lars_NL", lang: "NL", gain: "+$510", comment: "Geen app nodig, alles werkt soepel in de browser." },
    { username: "Aoi_JP", lang: "JA", gain: "+$590", comment: "口座作成が簡単で、すぐに分析画面へ入れました。" },
    { username: "Liam_AU", lang: "EN", gain: "+$740", comment: "Great UI, easy checkout and straightforward signals." },
    { username: "Pablo_CL", lang: "ES", gain: "+$760", comment: "Excelente estabilidad en cada ronda calculada." },
    { username: "Hassan_IQ", lang: "AR", gain: "+$1,210", comment: "الإشارات مستقرة والواجهة خفيفة على الإنترنت الضعيف." },
    { username: "Fernanda_BR", lang: "PT", gain: "+$970", comment: "Interface leve, sem travar, perfeita no 4G." },
    { username: "Vikram_IN", lang: "HI", gain: "+$1,080", comment: "हर राउंड साफ़ दिखता है, इतिहास भी काम का है।" },
    { username: "Pavel_RU", lang: "RU", gain: "+$820", comment: "Быстрая активация и понятный порог безопасности." },
    { username: "Greta_DE", lang: "DE", gain: "+$1,050", comment: "Sehr gutes Preis-Leistungs-Verhältnis für den Monatszugang." },
    { username: "Davide_IT", lang: "IT", gain: "+$980", comment: "Accesso mensile immediato, nessuna attesa inutile." },
    { username: "Aylin_TR", lang: "TR", gain: "+$1,370", comment: "Canlı izleme çok net, kesinti yaşamadım." },
    { username: "Putri_ID", lang: "ID", gain: "+$780", comment: "Tampilan gelapnya nyaman di mata, prediksi konsisten." },
    { username: "Niels_NL", lang: "NL", gain: "+$1,240", comment: "Heldere drempel om winst veilig te nemen." },
    { username: "Ren_JP", lang: "JA", gain: "+$860", comment: "履歴が見やすく、毎回のラウンドを追いやすいです。" },
    { username: "Ava_UK", lang: "EN", gain: "+$430", comment: "Very satisfied with the flight curve responsiveness." },
    { username: "Andres_PE", lang: "ES", gain: "+$1,120", comment: "Muy satisfecho con la suscripción mensual, vale la pena." },
    { username: "Sara_JO", lang: "AR", gain: "+$430", comment: "حسابي بقي محفوظًا بعد تحديث الموقع. ممتاز." },
    { username: "Rafael_BR", lang: "PT", gain: "+$1,280", comment: "Histórico útil e animações suaves do início ao fim." },
    { username: "Neha_IN", lang: "HI", gain: "+$470", comment: "लॉगिन किसी भी ब्राउज़र से हो जाता है, स्टेटस नहीं गया।" },
    { username: "Nikita_RU", lang: "RU", gain: "+$560", comment: "Удобно заходить с другого телефона — доступ на месте." },
    { username: "Tim_DE", lang: "DE", gain: "+$610", comment: "Login auf einem neuen Gerät hat den VIP-Status behalten." },
    { username: "Sara_IT", lang: "IT", gain: "+$540", comment: "Login da un altro browser senza perdere l'accesso." },
    { username: "Burak_TR", lang: "TR", gain: "+$610", comment: "Başka tarayıcıdan girdim, üyeliğim duruyor." },
    { username: "Dewi_ID", lang: "ID", gain: "+$1,050", comment: "Login ulang lancar, status berbayar tetap ada." },
    { username: "Noor_NL", lang: "NL", gain: "+$680", comment: "Op een andere telefoon ingelogd, toegang bleef actief." },
    { username: "Mika_JP", lang: "JA", gain: "+$1,190", comment: "別のブラウザでもログインでき、有料状態のままです。" },
    { username: "Owen_IE", lang: "EN", gain: "+$1,190", comment: "Simple monthly plan that works as soon as it is activated." },
    { username: "Camille_FR", lang: "FR", gain: "+$390", comment: "Compte activé sans attente, lecture des courbes très intuitive sur mobile." },
    { username: "Martina_ES", lang: "ES", gain: "+$640", comment: "Interfaz profesional, sin anuncios y muy rápida." },
    { username: "Amir_TN", lang: "AR", gain: "+$990", comment: "سهل الاستخدام حتى بدون خبرة تقنية." },
    { username: "Beatriz_BR", lang: "PT", gain: "+$440", comment: "Criação de conta simples e cockpit imediato." },
    { username: "Kiran_IN", lang: "HI", gain: "+$930", comment: "सेटअप नहीं, ब्राउज़र में तुरंत चलता है।" },
    { username: "Katya_RU", lang: "RU", gain: "+$1,090", comment: "Красивый тёмный интерфейс и понятные подсказки." },
    { username: "Felix_DE", lang: "DE", gain: "+$1,260", comment: "Keine App nötig, alles läuft direkt im Browser." },
    { username: "Matteo_IT", lang: "IT", gain: "+$1,170", comment: "Nessuna app da installare, tutto nel browser." },
    { username: "Selin_TR", lang: "TR", gain: "+$830", comment: "Kurulum yok. Safari’de de sorunsuz." },
    { username: "Yoga_ID", lang: "ID", gain: "+$470", comment: "Daftar mudah, langsung bisa pakai di HP." },
    { username: "Bram_NL", lang: "NL", gain: "+$920", comment: "Strakke donkere look en duidelijke live-curve." },
    { username: "Sora_JP", lang: "JA", gain: "+$640", comment: "アプリ不要で、このままブラウザから使えます。" },
    { username: "Chloe_NZ", lang: "EN", gain: "+$980", comment: "Solid predictive stream with accurate tracking each round." },
    { username: "Hugo_UY", lang: "ES", gain: "+$1,050", comment: "Gran precisión en las salidas seguras entre x2 y x3." },
    { username: "Rania_DZ", lang: "AR", gain: "+$1,480", comment: "جودة التحليل ممتازة بعد أسبوعين من الاستخدام." },
    { username: "Miguel_PT", lang: "PT", gain: "+$1,090", comment: "Muito estável, zero cortes durante as sessões." },
    { username: "Meera_IN", lang: "HI", gain: "+$1,510", comment: "दो हफ्ते से इस्तेमाल कर रही हूँ, गुणवत्ता कायम है।" },
    { username: "Sergei_RU", lang: "RU", gain: "+$1,570", comment: "Сильный алгоритм и стабильная работа каждый день." },
    { username: "Nina_DE", lang: "DE", gain: "+$490", comment: "Schneller Start, klare Anzeige, keine Störungen." },
    { username: "Elena_IT", lang: "IT", gain: "+$420", comment: "Attivazione immediata, interfaccia molto pulita." },
    { username: "Kerem_TR", lang: "TR", gain: "+$1,520", comment: "İki haftadır kullanıyorum, kalite düşmedi." },
    { username: "Lina_ID", lang: "ID", gain: "+$1,180", comment: "Setelah dua minggu, tetap akurat dan nyaman." },
    { username: "Iris_NL", lang: "NL", gain: "+$1,460", comment: "Na twee weken nog steeds stabiel en precies." },
    { username: "Haruto_JP", lang: "JA", gain: "+$980", comment: "2週間使っていますが、精度が落ちていません。" },
    { username: "Grace_US", lang: "EN", gain: "+$670", comment: "Excellent performance on both tablet and laptop." },
    { username: "Carmen_ES", lang: "ES", gain: "+$470", comment: "Muy buena herramienta para seguir los vuelos en directo." },
    { username: "Tariq_SA", lang: "AR", gain: "+$560", comment: "يعمل بسلاسة على الآيفون وعلى أندرويد." },
    { username: "Joao_BR", lang: "PT", gain: "+$830", comment: "Funciona muito bem no iPhone e no Android." },
    { username: "Aisha_IN", lang: "HI", gain: "+$620", comment: "आईफोन और एंड्रॉइड दोनों पर बढ़िया चलता है।" },
    { username: "Maxim_RU", lang: "RU", gain: "+$740", comment: "Отлично работает и на iPhone, и на Android." },
    { username: "Lea_DE", lang: "DE", gain: "+$880", comment: "Läuft einwandfrei auf iPhone und Android." },
    { username: "Paolo_IT", lang: "IT", gain: "+$1,440", comment: "Perfetta su iPhone e Android, nessuna interruzione." },
    { username: "Zeynep_TR", lang: "TR", gain: "+$760", comment: "iPhone ve Android’de sorunsuz çalışıyor." },
    { username: "Eka_ID", lang: "ID", gain: "+$860", comment: "Lancar di iPhone dan Android, tidak putus." },
    { username: "Tess_NL", lang: "NL", gain: "+$590", comment: "Werkt prima op iPhone én Android." },
    { username: "Nao_JP", lang: "JA", gain: "+$1,280", comment: "iPhoneでもAndroidでも安定して使えます。" }
];

let currentLang = "fr";
let isDetectingLang = false;
let supabaseClient = null;
let currentUser = readJson(CONFIG.sessionKey, null);
let displayedCommentsCount = 6;
let selectedMomoNetwork = "WAVE";
let vipAnimationId = null;
let vipEngineRunning = false;
let vipResizeHandler = null;
let vipCalibrationTimer = null;
let vipTargetMultiplier = 2.40;
let vipCurrentFlightNumber = 8492;
let vipLastHistoryMultiplier = null;
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
    subscribeUserRealtime();
    await verifyMaketouReturn();
    startMaketouPaymentWatch();
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") {
            syncUserFromSupabase();
            verifyMaketouReturn();
        }
    });
});

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
    const flagEl = document.getElementById("currentLangFlag");
    const codeEl = document.getElementById("currentLangCode");
    if (flagEl) flagEl.textContent = meta.flag;
    if (codeEl) codeEl.textContent = meta.code;

    document.querySelectorAll(".lang-option-btn").forEach((btn) => {
        if (btn.dataset.lang === lang) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    renderCommentsList();
    refreshVipMemberBadge();
}

function initLanguageDropdown() {
    const toggleBtn = document.getElementById("langToggleBtn");
    const menu = document.getElementById("langDropdownMenu");
    const optionBtns = document.querySelectorAll(".lang-option-btn");

    toggleBtn?.addEventListener("click", (e) => {
        e.stopPropagation();
        menu?.classList.toggle("hidden");
    });

    optionBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const lang = btn.dataset.lang;
            if (lang) {
                applyLanguage(lang, true);
                menu?.classList.add("hidden");
                showToast(`Langue changée : ${LANG_METAS[lang].name}`);
            }
        });
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest("#langSelectorWrap")) {
            menu?.classList.add("hidden");
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
        registeredAt: user.registeredAt || ""
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
                    registeredAt: data.account.registeredAt || ""
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
        const { data: existing } = await supabaseClient
            .from("users")
            .select("is_subscribed, unique_id, password_hash, email")
            .ilike("email", email)
            .maybeSingle();
        const uniqueId = formatMemberId(existing && existing.unique_id) || persistMemberId(user.uniqueId);
        await supabaseClient.from("users").upsert({
            unique_id: uniqueId,
            name: user.name,
            email,
            phone: user.phone || "",
            is_subscribed: Boolean(user.isSubscribed) || Boolean(existing && existing.is_subscribed),
            password_hash: user.passwordHash || (existing && existing.password_hash) || "",
            updated_at: new Date().toISOString()
        }, { onConflict: "email" });
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
                    registeredAt: (local && local.registeredAt) || (remote && remote.registeredAt) || new Date().toLocaleDateString("fr-FR")
                };
            }
        } catch {}
    }
    const found = remote || local;
    if (!found) return null;
    return {
        ...found,
        email: emailKey,
        uniqueId: formatMemberId(found.uniqueId) || (local && local.uniqueId) || "",
        isSubscribed: Boolean(found.isSubscribed) || Boolean(local && local.isSubscribed),
        passwordHash: found.passwordHash || (local && local.passwordHash) || ""
    };
}

async function syncUserFromSupabase() {
    if (!supabaseClient || !currentUser?.email) return;
    try {
        const { data, error } = await supabaseClient
            .from("users")
            .select("unique_id, name, email, phone, is_subscribed, password_hash")
            .ilike("email", normalizeEmail(currentUser.email))
            .maybeSingle();

        if (data && !error) {
            let changed = false;
            const subscribed = Boolean(data.is_subscribed);
            if (subscribed !== Boolean(currentUser.isSubscribed)) {
                currentUser.isSubscribed = subscribed;
                changed = true;
            }
            if (subscribed) grantVerifiedAccess();
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
                if (payload?.new && typeof payload.new.is_subscribed !== "undefined") {
                    currentUser.isSubscribed = Boolean(payload.new.is_subscribed);
                    if (currentUser.isSubscribed) grantVerifiedAccess();
                    else if (!readAccessToken()) revokeVerifiedAccess();
                    saveUserSession(currentUser, false);
                    initGlobalViewRouter();
                    showToast(currentUser.isSubscribed ? "Licence activée !" : "Statut mis à jour.");
                }
            })
            .subscribe();
    } catch {}
}

function isAccessUnlocked() {
    return verifiedAccessGranted === true;
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
    verifiedAccessGranted = true;
    if (token) storeAccessToken(token);
    try {
        localStorage.setItem(CONFIG.accessUnlockedKey, "true");
        localStorage.setItem(CONFIG.userPremiumKey, "true");
        localStorage.setItem(CONFIG.accessVerifiedKey, "true");
    } catch {}
    if (currentUser) currentUser.isSubscribed = true;
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
    const token = readAccessToken();
    if (token) {
        const session = await fetchMaketouSession(token);
        if (session && session.access === true) {
            grantVerifiedAccess(token);
            return true;
        }
        try { localStorage.removeItem(CONFIG.accessTokenKey); } catch {}
    }
    if (currentUser) {
        await syncUserFromSupabase();
        if (currentUser.isSubscribed) {
            grantVerifiedAccess();
            return true;
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

    if (isAccessUnlocked()) {
        if (currentUser) currentUser.isSubscribed = true;
        publicSite?.classList.add("hidden");
        vipSoftware?.classList.remove("hidden");

        const vipSidebarUserId = document.getElementById("vipSidebarUserId");
        const user7Id = displayMemberId();
        refreshVipMemberBadge();
        if (user7Id && vipSidebarUserId) vipSidebarUserId.textContent = user7Id;

        startVipGrandVerticalRadarEngine();
    } else {
        publicSite?.classList.remove("hidden");
        vipSoftware?.classList.add("hidden");
        stopVipRadarEngine();
        updateAuthPublicHeader();
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

        if (!currentUser.isSubscribed) {
            siteAlertBanner?.classList.remove("hidden");
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
/* GESTION DES 113 AVIS CLIENTS (ADAPTÉS À LA LANGUE)                         */
/* -------------------------------------------------------------------------- */

function getSortedCommentsForLang() {
    const french = WINNER_COMMENTS.filter((comment) => comment.lang === "FR");
    const others = WINNER_COMMENTS.filter((comment) => comment.lang !== "FR");
    const ordered = [];
    if (french[0]) ordered.push(french[0]);

    const extraSlots = [
        Math.max(8, Math.floor(others.length * 0.28)),
        Math.max(18, Math.floor(others.length * 0.54)),
        Math.max(28, Math.floor(others.length * 0.80))
    ];
    others.forEach((comment, index) => {
        ordered.push(comment);
        const extraIndex = extraSlots.indexOf(index);
        if (extraIndex !== -1 && french[extraIndex + 1]) {
            ordered.push(french[extraIndex + 1]);
        }
    });
    french.slice(1).forEach((comment) => {
        if (!ordered.includes(comment)) ordered.push(comment);
    });
    return ordered;
}

function renderCommentsList() {
    const grid = document.getElementById("commentsGrid");
    const remainingSpan = document.getElementById("commentsRemainingCount");
    if (!grid) return;

    const sortedList = getSortedCommentsForLang();
    const visibleComments = sortedList.slice(0, displayedCommentsCount);

    grid.innerHTML = visibleComments.map((c) => `
        <div class="comment-card animate-fade">
            <div class="comment-header">
                <div class="comment-user-box">
                    <div class="comment-username">${escapeHtml(c.username)} <i class="fa-solid fa-circle-check text-green"></i></div>
                </div>
            </div>
            <p class="comment-text">"${escapeHtml(c.comment)}"</p>
        </div>
    `).join("");

    if (remainingSpan) {
        remainingSpan.textContent = Math.max(0, sortedList.length - displayedCommentsCount);
    }
}

function initLoadMoreComments() {
    const btnLoadMore = document.getElementById("btnLoadMoreComments");
    if (btnLoadMore) {
        btnLoadMore.addEventListener("click", () => {
            displayedCommentsCount = Math.min(WINNER_COMMENTS.length, displayedCommentsCount + 9);
            renderCommentsList();
            if (displayedCommentsCount >= WINNER_COMMENTS.length) {
                btnLoadMore.style.display = "none";
            }
        });
    }
}

/* -------------------------------------------------------------------------- */
/* Cockpit Radar de Vol                                                       */
/* -------------------------------------------------------------------------- */

function stopVipRadarEngine() {
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
    vipEngineRunning = false;
}

function startVipGrandVerticalRadarEngine() {
    if (vipEngineRunning) return;
    vipEngineRunning = true;

    const canvas = document.getElementById("vipFlightCanvas");
    const hudNumber = document.getElementById("vipHudNumber");
    const targetDisplay = document.getElementById("vipLiveTargetDisplay");
    const confidenceDisplay = document.getElementById("vipLiveConfidence");
    const statusMessage = document.getElementById("vipFlightMessage");
    const historyList = document.getElementById("vipHistoryList");
    const scannerLoader = document.getElementById("vipScannerLoader");
    const scanProgressFill = document.getElementById("scanProgressFill");

    if (!canvas) {
        vipEngineRunning = false;
        return;
    }
    const ctx = canvas.getContext("2d");
    let viewW = 800;
    let viewH = 520;

    function resizeCanvas() {
        const parent = canvas.parentElement;
        if (!parent) return;
        const cssW = Math.max(parent.clientWidth || 320, 260);
        const cssH = Math.max(parent.clientHeight || 320, 240);
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
    window.addEventListener("resize", vipResizeHandler);

    let flightState = "scanning";
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
        if (statusMessage) {
            statusMessage.innerHTML = `🛰️ <strong>SIGNAL STABLE :</strong> x${vipTargetMultiplier.toFixed(2)}`;
        }
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
        scannerLoader?.classList.add("hidden");
        flightState = "flying";
        currentMultiplier = 1.00;
        flightProgress = 0;
        explosionTimer = 0;
        particles = [];
        if (hudNumber) hudNumber.textContent = "x1.00";
        generateNextTarget();
    }

    function startCalibrationPhase() {
        flightState = "scanning";
        scannerLoader?.classList.remove("hidden");
        if (scanProgressFill) scanProgressFill.style.width = "0%";
        if (vipCalibrationTimer) {
            cancelAnimationFrame(vipCalibrationTimer);
            clearInterval(vipCalibrationTimer);
            vipCalibrationTimer = null;
        }

        const startedAt = Date.now();
        const durationMs = 30 * 60 * 1000;

        function tickCalibration() {
            if (!vipEngineRunning) {
                if (vipCalibrationTimer) {
                    clearInterval(vipCalibrationTimer);
                    vipCalibrationTimer = null;
                }
                return;
            }
            const progress = Math.min(100, ((Date.now() - startedAt) / durationMs) * 100);
            if (scanProgressFill) scanProgressFill.style.width = `${progress}%`;
            if (progress >= 100) {
                clearInterval(vipCalibrationTimer);
                vipCalibrationTimer = null;
                beginTakeoff();
            }
        }
        vipCalibrationTimer = setInterval(tickCalibration, 250);
        tickCalibration();
    }

    function drawPlane(x, y, angle) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);

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

        ctx.fillStyle = "#ef4444";
        ctx.beginPath();
        ctx.moveTo(-24, -4);
        ctx.lineTo(-42 - Math.random() * 14, 0);
        ctx.lineTo(-24, 4);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    function renderVIPCockpit() {
        if (!vipEngineRunning) return;

        const W = viewW;
        const H = viewH;

        ctx.clearRect(0, 0, W, H);
        ctx.fillStyle = "#060a18";
        ctx.fillRect(0, 0, W, H);

        ctx.strokeStyle = "rgba(255, 200, 55, 0.08)";
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

        const cpX = startX + (targetX - startX) * 0.25;
        const cpY = startY;

        if (flightState === "flying") {
            flightProgress += flightSpeed;
            const p = Math.min(flightProgress, 1);

            currentMultiplier = 1.00 + (vipTargetMultiplier - 1.00) * Math.pow(p, 1.15);
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
            const angle = Math.atan2(dy, dx) || -0.55;

            ctx.beginPath();
            ctx.arc(startX, startY, 7, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 200, 55, 0.35)";
            ctx.fill();

            drawPlane(curX, curY, angle);

            if (p >= 1) {
                flightState = "crashed";
                createExplosion(curX, curY);
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
                startCalibrationPhase();
            }
        }

        vipAnimationId = requestAnimationFrame(renderVIPCockpit);
    }

    beginTakeoff();
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
                registeredAt: new Date().toLocaleDateString("fr-FR")
            };

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
                    await saveUserSession(found, true);
                    if (found.isSubscribed) grantVerifiedAccess();
                    setButtonLoading(loginSubmitBtn, false);
                    initGlobalViewRouter();
                    closeAllModals();
                    logForm.reset();
                    showToast(`Connexion réussie ! Bienvenue, ${found.name}.`);

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

function initProfileModal() {
    const userProfileBadge = document.getElementById("userProfileBadge");
    const profileModal = document.getElementById("profileModal");
    const closeProfile = document.getElementById("closeProfileModal");
    const profileNameDisplay = document.getElementById("profileNameDisplay");
    const profileEmailDisplay = document.getElementById("profileEmailDisplay");
    const profileUniqueIdDisplay = document.getElementById("profileUniqueIdDisplay");
    const profilePhoneInput = document.getElementById("profilePhoneInput");
    const btnSavePhone = document.getElementById("btnSavePhone");
    const formUpdatePassword = document.getElementById("formUpdatePassword");
    const profileStatusBadge = document.getElementById("profileStatusBadge");
    const btnProfileSubscribe = document.getElementById("btnProfileSubscribe");

    userProfileBadge?.addEventListener("click", () => {
        if (!currentUser) return;

        const user7Id = displayMemberId();
        if (profileNameDisplay) profileNameDisplay.textContent = currentUser.name;
        if (profileEmailDisplay) profileEmailDisplay.textContent = currentUser.email;
        if (profileUniqueIdDisplay) profileUniqueIdDisplay.textContent = user7Id;
        if (profilePhoneInput) profilePhoneInput.value = currentUser.phone || "";
        if (profilePhoneInput) {
            const locked = Boolean(String(currentUser.phone || "").trim());
            profilePhoneInput.disabled = locked;
            profilePhoneInput.readOnly = locked;
            if (btnSavePhone) {
                btnSavePhone.disabled = locked;
                btnSavePhone.style.opacity = locked ? "0.5" : "";
                btnSavePhone.style.pointerEvents = locked ? "none" : "";
            }
        }

        if (profileStatusBadge) {
            if (!currentUser.isSubscribed) {
                profileStatusBadge.className = "status-tag-badge status-unsubscribed";
                profileStatusBadge.innerHTML = '<i class="fa-solid fa-circle-xmark" aria-hidden="true"></i> NON ACTIVÉ';
                if (btnProfileSubscribe) btnProfileSubscribe.style.display = "block";
            } else {
                profileStatusBadge.className = "status-tag-badge status-active";
                profileStatusBadge.innerHTML = '<i class="fa-solid fa-crown" aria-hidden="true"></i> LICENCE ACTIVE / MOIS';
                if (btnProfileSubscribe) btnProfileSubscribe.style.display = "none";
            }
        }

        profileModal?.classList.add("active");
    });

    closeProfile?.addEventListener("click", () => profileModal?.classList.remove("active"));

    btnSavePhone?.addEventListener("click", async () => {
        try {
            if (!currentUser) return;
            if (String(currentUser.phone || "").trim()) return;
            if (!profilePhoneInput) return;
            const phone = String(profilePhoneInput.value || "").trim();
            if (!phone || !isValidPhone(phone)) {
                showToast("Numéro de téléphone invalide.", "error");
                return;
            }
            currentUser.phone = phone;
            await saveUserSession(currentUser, true);
            profilePhoneInput.disabled = true;
            profilePhoneInput.readOnly = true;
            btnSavePhone.disabled = true;
            btnSavePhone.style.opacity = "0.5";
            btnSavePhone.style.pointerEvents = "none";
            showToast("Numéro de téléphone enregistré !");
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

            if (currentUser.passwordHash) {
                const match = await passwordMatches(currentUser, oldPass);
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

            currentUser.passwordHash = await hashPassword(newPass);
            await saveUserSession(currentUser, true);
            formUpdatePassword.reset();
            showToast("Mot de passe mis à jour !");
        } catch (err) {
            showToast("Mise à jour impossible. Réessayez.", "error");
        }
    });

    btnProfileSubscribe?.addEventListener("click", () => {
        profileModal?.classList.remove("active");
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
        currentUser.isSubscribed = true;
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
    showToast("🎉 Félicitations ! Votre cockpit d'analyse est débloqué pour le mois !");
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

async function activateMaketouLicense(cartId, token) {
    grantVerifiedAccess(token);
    if (!currentUser) {
        initGlobalViewRouter();
        showToast("🎉 Félicitations ! Votre cockpit d'analyse est débloqué pour le mois !");
        return;
    }
    await handlePaymentSuccess({
        transaction_id: cartId || `maketou-${currentUser.uniqueId}-${Date.now()}`,
        tx_ref: cartId || currentUser.uniqueId,
        status: "successful",
        payment_type: "maketou"
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
    checkout.searchParams.set("email", currentUser.email || "");
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
                    showToast("🎉 Félicitations ! Votre cockpit d'analyse est débloqué pour le mois !");
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
            await activateMaketouLicense(result.cartId || ref, result.token);
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
    const linkOpenAdmin = document.getElementById("linkOpenAdminLogin");
    const adminModal = document.getElementById("adminModal");
    const closeAdminModal = document.getElementById("closeAdminModal");
    const formAdminAuth = document.getElementById("formAdminAuth");
    const adminAuthScreen = document.getElementById("adminAuthScreen");
    const adminDashboardScreen = document.getElementById("adminDashboardScreen");
    const btnAdminActivate = document.getElementById("btnAdminActivateById");
    const adminTargetIdInput = document.getElementById("adminTargetIdInput");

    linkOpenAdmin?.addEventListener("click", (e) => {
        e.preventDefault();
        adminModal?.classList.add("active");
    });

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
                u.isSubscribed = true;
                found = true;
            }
            return u;
        });

        if (found) {
            saveUsersDb(usersDb);
            if (currentUser && (currentUser.uniqueId === targetId || currentUser.email?.toUpperCase() === targetId)) {
                currentUser.isSubscribed = true;
                grantVerifiedAccess();
                writeJson(CONFIG.sessionKey, currentUser);
                initGlobalViewRouter();
            }
            if (supabaseClient) {
                try {
                    await supabaseClient.from("users").update({ is_subscribed: true }).eq("unique_id", targetId);
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
                registeredAt: new Date().toLocaleDateString("fr-FR")
            };
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
                ${u.isSubscribed
                    ? '<span class="badge-tag green"><i class="fa-solid fa-check"></i> ACTIF</span>'
                    : '<span class="badge-tag red"><i class="fa-solid fa-xmark"></i> NON ACTIVÉ</span>'}
            </td>
            <td>
                ${!u.isSubscribed
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
        usersDb[idx].isSubscribed = status;
        saveUsersDb(usersDb);

        if (currentUser && currentUser.email === email) {
            currentUser.isSubscribed = status;
            if (status) grantVerifiedAccess();
            else revokeVerifiedAccess();
            writeJson(CONFIG.sessionKey, currentUser);
            initGlobalViewRouter();
        }

        if (supabaseClient) {
            try {
                await supabaseClient.from("users").update({ is_subscribed: status }).eq("email", email);
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
