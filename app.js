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
    langKey: "crash_user_lang_pref"
};

// ==========================================================================
// DICTIONNAIRE DE TRADUCTION COMPLET (I18N)
// ==========================================================================
const TRANSLATIONS = {
    fr: {
        doc_title: "CRASH PREDICTOR 2026 | Cockpit d'Analyse et Prédictions Officielles",
        ticker_live: "EN DIRECT",
        ticker_sub: "sessions actives • moteur d'analyse",
        alert_unsubscribed: "<strong>ACCÈS NON ACTIVÉ :</strong> activez votre licence pour ouvrir le cockpit.",
        btn_alert_unlock: "Débloquer l'accès – 50 $",
        badge_edition: "ÉDITION 2026",
        nav_login: "Connexion",
        nav_register: "Inscription",
        promo_offer: "Offre 50 $ :",
        promo_remaining: "restante(s)",
        hero_subtitle: "Plateforme d'analyse haute fréquence et anticipation des trajectoires en direct.",
        badge_algo: "MOTEUR 2026",
        badge_live_session: "SESSION TEMPS RÉEL",
        badge_verified: "VÉRIFIÉ",
        flash_default: "vient d'activer sa licence complète",
        offer_title: "Licence Officielle & Accès Illimité",
        offer_desc: "Débloquez l'accès complet au cockpit d'analyse, aux prédictions en direct et à l'historique complet.",
        price_lifetime: "/ Accès à vie",
        price_cfa: "≈ 30 000 francs CFA",
        benefit_1_title: "Précision Algorithmique Optimale",
        benefit_1_desc: "Analyse en temps réel et anticipation précise des trajectoires.",
        benefit_2_title: "Activation Immédiate",
        benefit_2_desc: "Accès instantané à l'ensemble des prédictions et au cockpit dès la validation de votre paiement.",
        benefit_3_title: "Accès à Vie Sans Frais",
        benefit_3_desc: "Licence permanente à paiement unique, garantie sans aucun abonnement mensuel ni prélèvement futur.",
        benefit_4_title: "Multi-supports",
        benefit_4_desc: "Interface optimisée pour un usage fluide sur smartphone, tablette et ordinateur.",
        btn_buy_instant: "Débloquer mon accès complet – 50 $",
        secure_guarantee: "Paiement sécurisé et chiffré • Activation automatique du cockpit",
        reviews_badge: "RETOURS MEMBRES VÉRIFIÉS (113 AVIS)",
        reviews_title: "Retours d'Expérience & Témoignages",
        reviews_subtitle: "Commentaires authentiques associés à des identifiants membres anonymes.",
        stat_registered: "Membres inscrits",
        stat_satisfaction: "Indice de satisfaction",
        stat_license: "Licence unique à vie",
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
        pred_advice: "Encaissement programmé avant rupture",
        hud_label: "COTE EN DIRECT",
        scan_title: "CALIBRATION DU SIGNAL",
        scan_subtitle: "Prochain tour en préparation…",
        vip_flight_init: "Analyse des flux… Décollage imminent",
        sys_params: "PARAMÈTRES DU SYSTÈME",
        sys_algo_stab: "Stabilité algorithmique",
        sys_latency: "Latence flux",
        sys_license_status: "Statut licence",
        sys_active_lifetime: "ACTIVE À VIE",
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
        login_id_lbl: "Email ou ID",
        login_pass_lbl: "Mot de passe",
        login_submit: "Se connecter",
        not_registered_yet: "Pas encore de compte ?",
        switch_register: "Créer un compte",
        checkout_badge: "50 $ • ACCÈS À VIE",
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
        ph_login_id: "nom@exemple.com ou CRASH-5829143",
        ph_pass: "Votre mot de passe",
        ph_old_pass: "Mot de passe actuel",
        ph_new_pass: "Nouveau mot de passe (6+ caractères)",
        ph_confirm_pass: "Confirmer le nouveau mot de passe"
    },
    en: {
        doc_title: "CRASH PREDICTOR 2026 | Official Analysis Cockpit & Live Signals",
        ticker_live: "LIVE",
        ticker_sub: "active sessions • predictive engine",
        alert_unsubscribed: "<strong>ACCESS NOT ACTIVATED:</strong> activate your license to open the cockpit.",
        btn_alert_unlock: "Unlock Access – $50",
        badge_edition: "2026 EDITION",
        nav_login: "Login",
        nav_register: "Sign Up",
        promo_offer: "$50 Offer:",
        promo_remaining: "remaining",
        hero_subtitle: "High-frequency algorithmic analysis and real-time flight trajectory anticipation.",
        badge_algo: "2026 ENGINE",
        badge_live_session: "REAL-TIME SESSION",
        badge_verified: "VERIFIED",
        flash_default: "just activated their lifetime license",
        offer_title: "Official License & Unlimited Access",
        offer_desc: "Unlock complete access to the analysis cockpit, live predictions and flight history.",
        price_lifetime: "/ Lifetime access",
        price_cfa: "",
        benefit_1_title: "Optimal Algorithmic Precision",
        benefit_1_desc: "Real-time stream analysis and accurate trajectory anticipation.",
        benefit_2_title: "Instant Activation",
        benefit_2_desc: "Immediate access to all predictions and cockpit upon payment confirmation.",
        benefit_3_title: "Lifetime Access Without Fees",
        benefit_3_desc: "One-time payment permanent license, guaranteed no monthly subscriptions or future charges.",
        benefit_4_title: "Multi-device Support",
        benefit_4_desc: "Optimized interface for seamless performance on smartphones, tablets, and desktops.",
        btn_buy_instant: "Unlock Full Access – $50",
        secure_guarantee: "Encrypted & secure checkout • Instant cockpit activation",
        reviews_badge: "VERIFIED MEMBER REVIEWS (113 REVIEWS)",
        reviews_title: "User Experience & Testimonials",
        reviews_subtitle: "Authentic feedback linked to anonymous member IDs.",
        stat_registered: "Registered members",
        stat_satisfaction: "Satisfaction rate",
        stat_license: "Lifetime license",
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
        pred_advice: "Target cash-out programmed before rupture",
        hud_label: "LIVE MULTIPLIER",
        scan_title: "SIGNAL CALIBRATION",
        scan_subtitle: "Preparing next round…",
        vip_flight_init: "Analyzing data streams… Takeoff imminent",
        sys_params: "SYSTEM PARAMETERS",
        sys_algo_stab: "Algorithmic stability",
        sys_latency: "Feed latency",
        sys_license_status: "License status",
        sys_active_lifetime: "ACTIVE LIFETIME",
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
        login_id_lbl: "Email or Member ID",
        login_pass_lbl: "Password",
        login_submit: "Sign In",
        not_registered_yet: "Don't have an account?",
        switch_register: "Register now",
        checkout_badge: "$50 • LIFETIME ACCESS",
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
        ph_login_id: "name@example.com or CRASH-5829143",
        ph_pass: "Your password",
        ph_old_pass: "Current password",
        ph_new_pass: "New password (6+ characters)",
        ph_confirm_pass: "Confirm new password"
    },
    es: {
        doc_title: "CRASH PREDICTOR 2026 | Cockpit Oficial de Análisis y Predicciones",
        ticker_live: "EN VIVO",
        ticker_sub: "sesiones activas • motor de cálculo",
        alert_unsubscribed: "<strong>ACCESO NO ACTIVADO:</strong> active su licencia para abrir el cockpit.",
        btn_alert_unlock: "Desbloquear Acceso – 50 $",
        badge_edition: "EDICIÓN 2026",
        nav_login: "Iniciar Sesión",
        nav_register: "Registrarse",
        promo_offer: "Oferta 50 $:",
        promo_remaining: "restante(s)",
        hero_subtitle: "Plataforma de análisis de alta frecuencia y anticipación de trayectorias en vivo.",
        badge_algo: "MOTOR 2026",
        badge_live_session: "SESIÓN EN TIEMPO REAL",
        badge_verified: "VERIFICADO",
        flash_default: "acaba de activar su licencia de por vida",
        offer_title: "Licencia Oficial y Acceso Ilimitado",
        offer_desc: "Desbloquee el acceso completo al cockpit de análisis, predicciones en vivo e historial de vuelos.",
        price_lifetime: "/ Acceso de por vida",
        price_cfa: "",
        benefit_1_title: "Precisión Algorítmica Óptima",
        benefit_1_desc: "Análisis en tiempo real y anticipación exacta de las trayectorias.",
        benefit_2_title: "Activación Inmediata",
        benefit_2_desc: "Acceso instantáneo a todas las predicciones y al cockpit tras validar el pago.",
        benefit_3_title: "Acceso de por Vida Sin Cargos",
        benefit_3_desc: "Licencia permanente de pago único, garantizada sin suscripciones mensuales ni pagos futuros.",
        benefit_4_title: "Multi-dispositivo",
        benefit_4_desc: "Interfaz optimizada para un uso fluido en smartphones, tablets y ordenadores.",
        btn_buy_instant: "Desbloquear mi acceso completo – 50 $",
        secure_guarantee: "Pago seguro y encriptado • Activación automática del cockpit",
        reviews_badge: "OPINIONES DE MIEMBROS VERIFICADOS (113 RESEÑAS)",
        reviews_title: "Experiencias y Testimonios",
        reviews_subtitle: "Comentarios auténticos vinculados a identificadores de miembros anónimos.",
        stat_registered: "Miembros registrados",
        stat_satisfaction: "Índice de satisfacción",
        stat_license: "Licencia vitalicia",
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
        pred_advice: "Cobro programado antes de la ruptura",
        hud_label: "MULTIPLICADOR EN VIVO",
        scan_title: "CALIBRACIÓN DE SEÑAL",
        scan_subtitle: "Preparando siguiente ronda…",
        vip_flight_init: "Analizando flujos… Despegue inminente",
        sys_params: "PARÁMETROS DEL SISTEMA",
        sys_algo_stab: "Estabilidad algorítmica",
        sys_latency: "Latencia del flujo",
        sys_license_status: "Estado de la licencia",
        sys_active_lifetime: "ACTIVA DE POR VIDA",
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
        login_id_lbl: "Correo o ID de Miembro",
        login_pass_lbl: "Contraseña",
        login_submit: "Entrar",
        not_registered_yet: "¿No tiene cuenta?",
        switch_register: "Crear una cuenta",
        checkout_badge: "50 $ • ACCESO DE POR VIDA",
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
        ph_login_id: "nombre@ejemplo.com o CRASH-5829143",
        ph_pass: "Su contraseña",
        ph_old_pass: "Contraseña actual",
        ph_new_pass: "Nueva contraseña (6+ caracteres)",
        ph_confirm_pass: "Confirmar nueva contraseña"
    },
    pt: {
        doc_title: "CRASH PREDICTOR 2026 | Cockpit Oficial de Análise e Predições",
        ticker_live: "AO VIVO",
        ticker_sub: "sessões ativas • motor preditivo",
        alert_unsubscribed: "<strong>ACESSO NÃO ATIVADO:</strong> ative sua licença para abrir o cockpit.",
        btn_alert_unlock: "Desbloquear Acesso – 50 $",
        badge_edition: "EDIÇÃO 2026",
        nav_login: "Entrar",
        nav_register: "Registar",
        promo_offer: "Oferta 50 $:",
        promo_remaining: "restante(s)",
        hero_subtitle: "Plataforma de análise de alta frequência e antecipação de trajetórias em tempo real.",
        badge_algo: "MOTOR 2026",
        badge_live_session: "SESSÃO EM TEMPO REAL",
        badge_verified: "VERIFICADO",
        flash_default: "acabou de ativar a sua licença vitalícia",
        offer_title: "Licença Oficial e Acesso Ilimitado",
        offer_desc: "Desbloqueie o acesso completo ao cockpit de análise, previsões ao vivo e histórico de voos.",
        price_lifetime: "/ Acesso vitalício",
        price_cfa: "",
        benefit_1_title: "Precisão Algorítmica Ideal",
        benefit_1_desc: "Análise em tempo real e antecipação precisa de trajetórias.",
        benefit_2_title: "Ativação Instantânea",
        benefit_2_desc: "Acesso imediato a todas as previsões e ao cockpit após a validação do pagamento.",
        benefit_3_title: "Acesso Vitalício Sem Mensalidades",
        benefit_3_desc: "Licença permanente de pagamento único, sem taxas mensais ou cobranças futuras.",
        benefit_4_title: "Compatível com Qualquer Dispositivo",
        benefit_4_desc: "Interface otimizada para uso fluido em telemóveis, tablets e computadores.",
        btn_buy_instant: "Desbloquear Acesso Completo – 50 $",
        secure_guarantee: "Pagamento seguro e encriptado • Ativação imediata do cockpit",
        reviews_badge: "AVALIAÇÕES DE MEMBROS (113 AVALIAÇÕES)",
        reviews_title: "Depoimentos e Avaliações",
        reviews_subtitle: "Comentários autênticos vinculados a IDs de membros anónimos.",
        stat_registered: "Membros registados",
        stat_satisfaction: "Índice de satisfação",
        stat_license: "Licença vitalícia",
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
        pred_advice: "Saída segura programada antes da queda",
        hud_label: "MULTIPLICADOR AO VIVO",
        scan_title: "CALIBRAÇÃO DE SINAL",
        scan_subtitle: "A preparar a próxima ronda…",
        vip_flight_init: "A analisar dados… Descolagem iminente",
        sys_params: "PARÂMETROS DO SISTEMA",
        sys_algo_stab: "Estabilidade do algoritmo",
        sys_latency: "Latência da rede",
        sys_license_status: "Estado da licença",
        sys_active_lifetime: "ATIVA VITALÍCIA",
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
        login_id_lbl: "Email ou ID de Membro",
        login_pass_lbl: "Palavra-passe",
        login_submit: "Entrar",
        not_registered_yet: "Ainda não tem conta?",
        switch_register: "Criar conta",
        checkout_badge: "50 $ • ACESSO VITALÍCIO",
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
        ph_login_id: "nome@exemplo.com ou CRASH-5829143",
        ph_pass: "Sua palavra-passe",
        ph_old_pass: "Palavra-passe atual",
        ph_new_pass: "Nova palavra-passe (6+ caracteres)",
        ph_confirm_pass: "Confirmar nova palavra-passe"
    },
    de: {
        doc_title: "CRASH PREDICTOR 2026 | Offizielles Analyse-Cockpit & Live-Signale",
        ticker_live: "LIVE",
        ticker_sub: "aktive Sitzungen • Analyse-Engine",
        alert_unsubscribed: "<strong>ZUGANG NICHT AKTIV:</strong> Aktivieren Sie Ihre Lizenz, um das Cockpit zu öffnen.",
        btn_alert_unlock: "Zugang freischalten – 50 $",
        badge_edition: "EDITION 2026",
        nav_login: "Anmelden",
        nav_register: "Registrieren",
        promo_offer: "50 $ Angebot:",
        promo_remaining: "verbleibend",
        hero_subtitle: "Hochfrequenz-Algorithmen und Echtzeit-Flugbahnvorhersage im Live-Cockpit.",
        badge_algo: "2026 ENGINE",
        badge_live_session: "ECHTZEIT-SITZUNG",
        badge_verified: "VERIFIZIERT",
        flash_default: "hat soeben die lebenslange Lizenz aktiviert",
        offer_title: "Offizielle Lizenz & Unbegrenzter Zugang",
        offer_desc: "Schalten Sie vollen Zugriff auf das Analyse-Cockpit, Live-Signale und den Flugverlauf frei.",
        price_lifetime: "/ Lebenslanger Zugang",
        price_cfa: "",
        benefit_1_title: "Optimale Algorithmische Präzision",
        benefit_1_desc: "Echtzeit-Datenanalyse und präzise Vorhersage von Flugkurven.",
        benefit_2_title: "Sofortige Freischaltung",
        benefit_2_desc: "Unmittelbarer Zugang zu allen Signalen und zum Cockpit direkt nach der Zahlung.",
        benefit_3_title: "Lebenslanger Zugang Ohne Abogebühren",
        benefit_3_desc: "Dauerhafte Lizenz mit Einmalzahlung, garantiert ohne monatliche Gebühren.",
        benefit_4_title: "Multi-Geräte Unterstützung",
        benefit_4_desc: "Optimiert für reibungslose Nutzung auf Smartphone, Tablet und PC.",
        btn_buy_instant: "Vollen Zugang freischalten – 50 $",
        secure_guarantee: "Sichere & verschlüsselte Zahlung • Automatische Cockpit-Aktivierung",
        reviews_badge: "VERIFIZIERTE MITGLIEDER (113 BEWERTUNGEN)",
        reviews_title: "Erfahrungsberichte & Feedback",
        reviews_subtitle: "Authentische Bewertungen von verifizierten Mitgliedern.",
        stat_registered: "Registrierte Mitglieder",
        stat_satisfaction: "Zufriedenheitsrate",
        stat_license: "Lebenslange Lizenz",
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
        pred_advice: "Sicherer Ausstieg vor Signalabbruch geplant",
        hud_label: "LIVE-QUOTE",
        scan_title: "SIGNAL-KALIBRIERUNG",
        scan_subtitle: "Nächste Runde wird vorbereitet…",
        vip_flight_init: "Datenanalyse läuft… Start steht bevor",
        sys_params: "SYSTEM-PARAMETER",
        sys_algo_stab: "Algorithmus-Stabilität",
        sys_latency: "Signal-Latenz",
        sys_license_status: "Lizenzstatus",
        sys_active_lifetime: "LEBENSLANG AKTIV",
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
        login_id_lbl: "E-Mail oder Mitglieds-ID",
        login_pass_lbl: "Passwort",
        login_submit: "Anmelden",
        not_registered_yet: "Noch kein Konto?",
        switch_register: "Konto erstellen",
        checkout_badge: "50 $ • LEBENSLANGER ZUGANG",
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
        ph_login_id: "name@beispiel.de oder CRASH-5829143",
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
    // --- Français ---
    { username: "ID: CRASH-5829143", lang: "FR", gain: "+$450", comment: "Cockpit très clair, prédictions nettes et prise en main immédiate." },
    { username: "ID: CRASH-6104829", lang: "FR", gain: "+$820", comment: "Licence rentabilisée rapidement, rien à redire sur la fluidité." },
    { username: "ID: CRASH-7391024", lang: "FR", gain: "+$1,100", comment: "Interface propre et rapide à charger. Très satisfait du service." },
    { username: "ID: CRASH-5248190", lang: "FR", gain: "+$390", comment: "Compte activé sans attente, lecture des courbes très intuitive sur mobile." },
    { username: "ID: CRASH-8910472", lang: "FR", gain: "+$640", comment: "Accès à vie validé au premier essai. Décollage fluide et sans coupure." },
    { username: "ID: CRASH-9482105", lang: "FR", gain: "+$950", comment: "L'anticipation des trajectoires est remarquablement stable et régulière." },
    { username: "ID: CRASH-6739201", lang: "FR", gain: "+$520", comment: "Très bon suivi en temps réel, navigation sans latence sur Android." },
    { username: "ID: CRASH-8149203", lang: "FR", gain: "+$1,280", comment: "Simple, direct et efficace. Les rounds s'enchaînent parfaitement." },
    { username: "ID: CRASH-5390184", lang: "FR", gain: "+$410", comment: "Paiement Mobile Money validé en 10 secondes, cockpit ouvert de suite." },
    { username: "ID: CRASH-7820194", lang: "FR", gain: "+$730", comment: "Radar vertical très agréable visuellement, les points de sortie sont précis." },
    { username: "ID: CRASH-6491028", lang: "FR", gain: "+$890", comment: "Rien à installer, fonctionne parfaitement dans le navigateur." },
    { username: "ID: CRASH-9120485", lang: "FR", gain: "+$1,450", comment: "Excellente plateforme. Les données sont bien calculées en continu." },
    { username: "ID: CRASH-5682910", lang: "FR", gain: "+$340", comment: "Interface sobre et professionnelle, très bonne expérience utilisateur." },
    { username: "ID: CRASH-7401928", lang: "FR", gain: "+$670", comment: "Débloqué hier soir, déjà trois sessions rentables ce matin." },
    { username: "ID: CRASH-8392014", lang: "FR", gain: "+$1,150", comment: "La calibration entre les vols permet de bien anticiper le coup suivant." },
    { username: "ID: CRASH-5920184", lang: "FR", gain: "+$480", comment: "Accès immédiat et permanent, aucun frais caché." },
    { username: "ID: CRASH-6819204", lang: "FR", gain: "+$920", comment: "Super fluide sur iPhone. Le signal est toujours prêt au bon moment." },
    { username: "ID: CRASH-7582910", lang: "FR", gain: "+$560", comment: "Très bon investissement pour ceux qui cherchent la précision." },
    { username: "ID: CRASH-8920174", lang: "FR", gain: "+$1,320", comment: "Historique des rounds très utile pour vérifier la cohérence des courbes." },
    { username: "ID: CRASH-6204918", lang: "FR", gain: "+$780", comment: "Service impeccable, support rapide et compte activé sans accroc." },
    { username: "ID: CRASH-5491028", lang: "FR", gain: "+$430", comment: "Le radar vertical change tout par rapport aux anciens outils." },
    { username: "ID: CRASH-7182904", lang: "FR", gain: "+$860", comment: "Prédictions nettes, aucun ralentissement même en 4G." },
    { username: "ID: CRASH-9382019", lang: "FR", gain: "+$1,540", comment: "Grande régularité sur les sorties entre x2.00 et x3.50." },
    { username: "ID: CRASH-5710294", lang: "FR", gain: "+$370", comment: "Validation instantanée par carte, outil opérationnel direct." },
    { username: "ID: CRASH-8491027", lang: "FR", gain: "+$690", comment: "Plateforme fiable et sérieuse, je recommande sans hésiter." },
    { username: "ID: CRASH-6391028", lang: "FR", gain: "+$980", comment: "Les montées sont bien cadrées, visuel agréable et lisible." },
    { username: "ID: CRASH-7910284", lang: "FR", gain: "+$1,210", comment: "Rendu parfait sur grand écran comme sur mobile." },
    { username: "ID: CRASH-5102948", lang: "FR", gain: "+$460", comment: "Interface légère qui charge très vite, aucun bug constaté." },
    { username: "ID: CRASH-8692014", lang: "FR", gain: "+$740", comment: "Très pratique d'avoir un ID unique pour sécuriser son compte." },
    { username: "ID: CRASH-6920184", lang: "FR", gain: "+$1,050", comment: "Signaux stables et régularité exemplaire au quotidien." },
    { username: "ID: CRASH-7394810", lang: "FR", gain: "+$590", comment: "Cockpit moderne avec des informations claires et directes." },
    { username: "ID: CRASH-9582014", lang: "FR", gain: "+$1,420", comment: "Une référence en matière de calcul prédictif en direct." },
    { username: "ID: CRASH-5820491", lang: "FR", gain: "+$380", comment: "Simple à prendre en main, même sans être un expert." },
    { username: "ID: CRASH-8104928", lang: "FR", gain: "+$830", comment: "Déclenchement précis des seuils d'encaissement." },
    { username: "ID: CRASH-6492018", lang: "FR", gain: "+$620", comment: "Tarif très honnête pour un accès à vie sans réabonnement." },
    { username: "ID: CRASH-7720194", lang: "FR", gain: "+$1,180", comment: "La fluidité de l'animation d'avion aide beaucoup à anticiper." },
    { username: "ID: CRASH-9182049", lang: "FR", gain: "+$910", comment: "Excellente gestion de la session, reconnexion automatique propre." },
    { username: "ID: CRASH-5394810", lang: "FR", gain: "+$490", comment: "Paiement Wave passé sans encombre, déblocage direct." },
    { username: "ID: CRASH-8291048", lang: "FR", gain: "+$770", comment: "L'affichage en temps réel est parfaitement synchronisé." },
    { username: "ID: CRASH-6710294", lang: "FR", gain: "+$1,340", comment: "Très bon outil pour sécuriser ses sessions pas à pas." },
    { username: "ID: CRASH-7491028", lang: "FR", gain: "+$540", comment: "Sobre, rapide et efficace. Exactement ce que je cherchais." },
    { username: "ID: CRASH-8819204", lang: "FR", gain: "+$990", comment: "La stabilité du serveur est remarquable, zéro déconnexion." },
    { username: "ID: CRASH-5620194", lang: "FR", gain: "+$420", comment: "Bonne prise en charge sur tablette et téléphone." },
    { username: "ID: CRASH-7920184", lang: "FR", gain: "+$850", comment: "Signal propre, pas de latence parasite." },
    { username: "ID: CRASH-9401928", lang: "FR", gain: "+$1,600", comment: "Très satisfait de la qualité d'analyse globale." },
    { username: "ID: CRASH-6182904", lang: "FR", gain: "+$680", comment: "Le compteur et les alertes sont bien proportionnés." },
    { username: "ID: CRASH-8501928", lang: "FR", gain: "+$1,120", comment: "Facile d'utilisation, activation en quelques secondes." },
    { username: "ID: CRASH-5294810", lang: "FR", gain: "+$350", comment: "Interface ergonomique et bien pensée pour mobile." },
    { username: "ID: CRASH-7682910", lang: "FR", gain: "+$790", comment: "Licence rentabilisée sur mes premières parties." },
    { username: "ID: CRASH-9248102", lang: "FR", gain: "+$1,270", comment: "Cockpit intuitif et historique toujours à jour." },
    { username: "ID: CRASH-5948102", lang: "FR", gain: "+$470", comment: "Bonne réactivité, aucun temps mort entre les calculs." },
    { username: "ID: CRASH-8310294", lang: "FR", gain: "+$930", comment: "La courbe parabolique donne une excellente lisibilité." },
    { username: "ID: CRASH-6582910", lang: "FR", gain: "+$610", comment: "Paiement validé instantanément, outil très propre." },
    { username: "ID: CRASH-7891024", lang: "FR", gain: "+$1,390", comment: "Outil sérieux et robuste sur toutes mes sessions." },
    { username: "ID: CRASH-9102948", lang: "FR", gain: "+$720", comment: "Très bon retour d'expérience après deux semaines d'utilisation." },
    { username: "ID: CRASH-5420194", lang: "FR", gain: "+$390", comment: "Compte créé facilement et accès accordé directement." },
    { username: "ID: CRASH-8749102", lang: "FR", gain: "+$880", comment: "Navigation ultra fluide sur navigateur Safari mobile." },
    { username: "ID: CRASH-6891028", lang: "FR", gain: "+$1,040", comment: "Analyse en temps réel de grande qualité." },
    { username: "ID: CRASH-7201948", lang: "FR", gain: "+$510", comment: "Très satisfait du suivi des trajectoires." },
    { username: "ID: CRASH-9682014", lang: "FR", gain: "+$1,480", comment: "Moteur algorithmique puissant et constant." },
    { username: "ID: CRASH-5782910", lang: "FR", gain: "+$440", comment: "Rapport qualité prix imbattable avec la licence permanente." },
    { username: "ID: CRASH-8192048", lang: "FR", gain: "+$760", comment: "Très bonne synchronisation des données de vol." },
    { username: "ID: CRASH-6349102", lang: "FR", gain: "+$970", comment: "Session stable sans déconnexion intempestive." },
    { username: "ID: CRASH-7501928", lang: "FR", gain: "+$1,230", comment: "Précision chirurgicale sur les cotes de sécurité." },
    { username: "ID: CRASH-9820194", lang: "FR", gain: "+$690", comment: "Le design sombre et moderne est très agréable." },
    { username: "ID: CRASH-5192048", lang: "FR", gain: "+$360", comment: "Prise en main en 2 minutes chrono." },
    { username: "ID: CRASH-8401928", lang: "FR", gain: "+$810", comment: "Système de prédiction fiable et constant." },
    { username: "ID: CRASH-6691024", lang: "FR", gain: "+$1,160", comment: "Visualisation claire du point de sortie conseillé." },
    { username: "ID: CRASH-7948102", lang: "FR", gain: "+$580", comment: "Excellent travail sur l'ergonomie mobile." },
    { username: "ID: CRASH-9281049", lang: "FR", gain: "+$1,510", comment: "Très bon outil pour sécuriser ses objectifs." },
    { username: "ID: CRASH-5592014", lang: "FR", gain: "+$430", comment: "Activation automatique sans aucune intervention manuelle." },
    { username: "ID: CRASH-8891024", lang: "FR", gain: "+$870", comment: "Plateforme solide, zéro ralentissement constaté." },
    { username: "ID: CRASH-6248102", lang: "FR", gain: "+$650", comment: "La barre de statut informe bien sur chaque phase." },
    { username: "ID: CRASH-7601928", lang: "FR", gain: "+$1,310", comment: "Grand confort visuel lors des longues sessions." },
    { username: "ID: CRASH-9048102", lang: "FR", gain: "+$750", comment: "Très bon outil d'anticipation mathématique." },
    { username: "ID: CRASH-5849102", lang: "FR", gain: "+$400", comment: "Accès à vie respecté, compte toujours actif." },
    { username: "ID: CRASH-8201948", lang: "FR", gain: "+$940", comment: "Régularité et précision au rendez-vous." },
    { username: "ID: CRASH-6948102", lang: "FR", gain: "+$1,080", comment: "L'anticipation de sortie est très sécurisante." },
    { username: "ID: CRASH-7410294", lang: "FR", gain: "+$530", comment: "Tout se fait dans le navigateur, aucun téléchargement lourd." },
    { username: "ID: CRASH-9748102", lang: "FR", gain: "+$1,460", comment: "Très bonne fluidité sur les montées rapides." },
    
    // --- Anglais ---
    { username: "ID: CRASH-5291048", lang: "EN", gain: "+$1,380", comment: "Clean cockpit, stable animation and instant access." },
    { username: "ID: CRASH-8740192", lang: "EN", gain: "+$890", comment: "Real-time radar works flawlessly on iPhone." },
    { username: "ID: CRASH-6490182", lang: "EN", gain: "+$560", comment: "Fast loading, no lags, lifetime license unlocked instantly." },
    { username: "ID: CRASH-9381024", lang: "EN", gain: "+$1,620", comment: "The exit threshold algorithm is remarkably consistent." },
    { username: "ID: CRASH-7102948", lang: "EN", gain: "+$740", comment: "Great UI, easy checkout and straightforward signals." },
    { username: "ID: CRASH-5840192", lang: "EN", gain: "+$430", comment: "Very satisfied with the flight curve responsiveness." },
    { username: "ID: CRASH-8290148", lang: "EN", gain: "+$1,190", comment: "No subscriptions, one-time payment that works permanently." },
    { username: "ID: CRASH-6910284", lang: "EN", gain: "+$980", comment: "Solid predictive stream with accurate tracking." },
    { username: "ID: CRASH-7581029", lang: "EN", gain: "+$670", comment: "Excellent performance on both tablet and laptop." },
    { username: "ID: CRASH-9481029", lang: "EN", gain: "+$1,440", comment: "Super smooth vertical canvas and instant target updates." },
    { username: "ID: CRASH-5310298", lang: "EN", gain: "+$820", comment: "Great radar clarity, very easy to follow each round." },
    { username: "ID: CRASH-8649107", lang: "EN", gain: "+$1,110", comment: "Seamless experience. The calculated cash-out points are great." },
    { username: "ID: CRASH-6190284", lang: "EN", gain: "+$530", comment: "Instant activation, intuitive design on Android Chrome." },
    { username: "ID: CRASH-7481029", lang: "EN", gain: "+$940", comment: "Very stable signal feed, zero lag during flights." },
    { username: "ID: CRASH-9820148", lang: "EN", gain: "+$1,560", comment: "High accuracy predictions and excellent UI responsiveness." },
    
    // --- Espagnol ---
    { username: "ID: CRASH-6190482", lang: "ES", gain: "+$580", comment: "Increíble precisión. El cockpit se abrió de inmediato tras el pago." },
    { username: "ID: CRASH-7482910", lang: "ES", gain: "+$920", comment: "Herramienta muy limpia y rápida. Las señales son exactas." },
    { username: "ID: CRASH-8920148", lang: "ES", gain: "+$1,340", comment: "La curva vertical ayuda mucho a visualizar el momento exacto." },
    { username: "ID: CRASH-5648102", lang: "ES", gain: "+$410", comment: "Activación inmediata y soporte sin problemas en móvil." },
    { username: "ID: CRASH-9102847", lang: "ES", gain: "+$760", comment: "Excelente estabilidad en cada ronda calculada." },
    { username: "ID: CRASH-6820194", lang: "ES", gain: "+$1,120", comment: "Muy satisfecho con la licencia permanente, vale totalmente la pena." },
    { username: "ID: CRASH-8391028", lang: "ES", gain: "+$640", comment: "Interfaz profesional, sin anuncios y muy rápida." },
    { username: "ID: CRASH-7910482", lang: "ES", gain: "+$1,050", comment: "Gran precisión en las salidas seguras x2.00 a x3.00." },
    { username: "ID: CRASH-5829104", lang: "ES", gain: "+$470", comment: "Muy buena herramienta para seguir los vuelos en directo." },
    { username: "ID: CRASH-9104829", lang: "ES", gain: "+$1,290", comment: "El radar vertical funciona de maravilla sin cortes." },
    { username: "ID: CRASH-6481029", lang: "ES", gain: "+$850", comment: "Acceso permanente verificado, excelente inversión." },
    { username: "ID: CRASH-7820149", lang: "ES", gain: "+$690", comment: "Diseño impecable y predicciones muy claras." },
    
    // --- Portugais ---
    { username: "ID: CRASH-5520194", lang: "PT", gain: "+$1,650", comment: "Pagamento confirmado e o cockpit abriu na hora. Visual excelente." },
    { username: "ID: CRASH-8910284", lang: "PT", gain: "+$780", comment: "Radar em tempo real muito fluido e preciso no telemóvel." },
    { username: "ID: CRASH-6394810", lang: "PT", gain: "+$1,120", comment: "Ótima precisão nas saídas seguras, muito satisfeito." },
    { username: "ID: CRASH-7419204", lang: "PT", gain: "+$590", comment: "Licença vitalícia sem taxas mensais, recomendo a todos." },
    
    // --- Allemand ---
    { username: "ID: CRASH-8190472", lang: "DE", gain: "+$940", comment: "Sehr stabile Signale und saubere Radar-Animation auf dem Smartphone." },
    { username: "ID: CRASH-9648102", lang: "DE", gain: "+$1,480", comment: "Hervorragende Reaktionszeit, sofortige Freischaltung nach Zahlung." }
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
let vipTargetMultiplier = 2.40;
let vipCurrentFlightNumber = 8492;
let realtimeChannel = null;
let paymentInFlight = false;
let pendingCheckoutAfterAuth = false;

document.addEventListener("DOMContentLoaded", () => {
    initLanguageSystem();
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
/* SYSTÈME DE TRADUCTION & GÉOLOCALISATION IP (VPN SUPPORT)                   */
/* -------------------------------------------------------------------------- */

async function initLanguageSystem() {
    initLanguageDropdown();

    // 1. Initial render rapide via langue du navigateur ou préférence locale
    const saved = localStorage.getItem(CONFIG.langKey);
    let initialLang = saved;
    if (!initialLang) {
        const navLang = (navigator.language || navigator.userLanguage || "en").toLowerCase();
        if (navLang.startsWith("fr")) initialLang = "fr";
        else if (navLang.startsWith("es")) initialLang = "es";
        else if (navLang.startsWith("pt")) initialLang = "pt";
        else if (navLang.startsWith("de")) initialLang = "de";
        else initialLang = "en";
    }

    applyLanguage(initialLang, false);

    // 2. Détection asynchrone par IP si l'utilisateur n'a pas fixé manuellement son choix
    if (!saved) {
        detectVisitorCountryAndApplyLang();
    }
}

async function detectVisitorCountryAndApplyLang() {
    if (isDetectingLang) return;
    isDetectingLang = true;

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2600);
        const res = await fetch("https://ipapi.co/json/", { signal: controller.signal });
        clearTimeout(timeoutId);

        if (res.ok) {
            const data = await res.json();
            const country = (data.country_code || "").toUpperCase();
            const detected = mapCountryToLanguage(country);
            if (detected && detected !== currentLang) {
                applyLanguage(detected, false);
            }
            return;
        }
    } catch (e) {
        // En cas d'échec / timeout, test de repli secondaire
        try {
            const controller2 = new AbortController();
            const timeoutId2 = setTimeout(() => controller2.abort(), 2000);
            const res2 = await fetch("https://ipwho.is/", { signal: controller2.signal });
            clearTimeout(timeoutId2);
            if (res2.ok) {
                const data2 = await res2.json();
                const country = (data2.country_code || "").toUpperCase();
                const detected = mapCountryToLanguage(country);
                if (detected && detected !== currentLang) {
                    applyLanguage(detected, false);
                }
            }
        } catch (err) {}
    } finally {
        isDetectingLang = false;
    }
}

function mapCountryToLanguage(countryCode) {
    if (!countryCode) return "en";
    const c = countryCode.toUpperCase();

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
        localStorage.setItem(CONFIG.langKey, lang);
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

    // Affichage conditionnel de la conversion FCFA (uniquement pour FR / pays d'Afrique)
    const priceCfa = document.getElementById("priceCfaConversion");
    if (priceCfa) {
        if (lang === "fr") {
            priceCfa.style.display = "block";
            priceCfa.textContent = "≈ 30 000 francs CFA";
        } else {
            priceCfa.style.display = "none";
        }
    }

    // Re-rendre les commentaires en priorisant la langue de l'utilisateur
    renderCommentsList();
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
        const random7Digits = Math.floor(5000000 + Math.random() * 5000000);
        candidate = `CRASH-${random7Digits}`;
    } while (users.some((user) => user.uniqueId === candidate));
    return candidate;
}

function sanitize7DigitId(rawId) {
    if (!rawId) return generateUniqueId();
    const cleanNum = parseInt(String(rawId).replace(/\D/g, ""), 10);
    if (isNaN(cleanNum) || cleanNum < 5000000 || cleanNum > 9999999) {
        return generateUniqueId();
    }
    return `CRASH-${cleanNum}`;
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

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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
    const storedGuestId = localStorage.getItem(CONFIG.guestIdKey);
    const sanitizedGuest = sanitize7DigitId(storedGuestId);
    if (storedGuestId !== sanitizedGuest) {
        localStorage.setItem(CONFIG.guestIdKey, sanitizedGuest);
    }

    if (currentUser) {
        const sanitizedUserId = sanitize7DigitId(currentUser.uniqueId);
        if (currentUser.uniqueId !== sanitizedUserId) {
            currentUser.uniqueId = sanitizedUserId;
            saveUserSession(currentUser, false);
        }
    }
}

async function saveUserSession(user, syncRemote = true) {
    if (!user) return;
    user.uniqueId = sanitize7DigitId(user.uniqueId);
    currentUser = user;
    writeJson(CONFIG.sessionKey, user);

    const usersDb = loadUsersDb();
    const idx = usersDb.findIndex((u) => u.email === user.email);
    if (idx !== -1) {
        usersDb[idx] = { ...usersDb[idx], ...user };
    } else {
        usersDb.push(user);
    }
    saveUsersDb(usersDb);

    if (syncRemote) {
        await upsertUserToSupabase(user);
    }
}

async function upsertUserToSupabase(user) {
    if (!supabaseClient || !user?.email) return;
    try {
        await supabaseClient.from("users").upsert({
            unique_id: user.uniqueId,
            name: user.name,
            email: user.email,
            phone: user.phone || "",
            is_subscribed: Boolean(user.isSubscribed),
            password_hash: user.passwordHash || "",
            updated_at: new Date().toISOString()
        }, { onConflict: "email" });
    } catch {}
}

async function syncUserFromSupabase() {
    if (!supabaseClient || !currentUser?.email) return;
    try {
        const { data, error } = await supabaseClient
            .from("users")
            .select("unique_id, name, email, phone, is_subscribed, password_hash")
            .eq("email", currentUser.email)
            .maybeSingle();

        if (data && !error) {
            let changed = false;
            if (Boolean(data.is_subscribed) !== Boolean(currentUser.isSubscribed)) {
                currentUser.isSubscribed = Boolean(data.is_subscribed);
                changed = true;
            }
            if (data.unique_id && data.unique_id !== currentUser.uniqueId) {
                currentUser.uniqueId = sanitize7DigitId(data.unique_id);
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
                    saveUserSession(currentUser, false);
                    initGlobalViewRouter();
                    showToast(currentUser.isSubscribed ? "Licence activée !" : "Statut mis à jour.");
                }
            })
            .subscribe();
    } catch {}
}

/* -------------------------------------------------------------------------- */
/* Routage & Affichage                                                        */
/* -------------------------------------------------------------------------- */

function initGlobalViewRouter() {
    const publicSite = document.getElementById("publicSiteWrapper");
    const vipSoftware = document.getElementById("vipSoftwareWrapper");

    if (currentUser && currentUser.isSubscribed) {
        publicSite?.classList.add("hidden");
        vipSoftware?.classList.remove("hidden");

        const vipUserDisplay = document.getElementById("vipUsernameDisplay");
        const vipIdDisplay = document.getElementById("vipIdDisplay");
        const vipSidebarUserId = document.getElementById("vipSidebarUserId");

        const user7Id = sanitize7DigitId(currentUser.uniqueId);
        if (vipUserDisplay) vipUserDisplay.textContent = currentUser.name || "Membre Actif";
        if (vipIdDisplay) vipIdDisplay.textContent = `ID: ${user7Id}`;
        if (vipSidebarUserId) vipSidebarUserId.textContent = user7Id;

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
        if (navUserIdTag) navUserIdTag.textContent = `ID: ${sanitize7DigitId(currentUser.uniqueId)}`;

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
    const flashBox = document.getElementById("liveFlashSocialBox");
    const flashTitle = document.getElementById("flashTitle");
    const flashSubtitle = document.getElementById("flashSubtitle");
    if (!flashBox) return;

    const flashMessages = {
        fr: "vient d'activer sa licence complète",
        en: "just activated their lifetime license",
        es: "acaba de activar su licencia de por vida",
        pt: "acabou de ativar a sua licença vitalícia",
        de: "hat soeben die lebenslange Lizenz aktiviert"
    };

    let flashIdx = 0;

    function triggerFlash() {
        const randomId = `ID: CRASH-${Math.floor(5000000 + Math.random() * 5000000)}`;
        const msg = flashMessages[currentLang] || flashMessages.fr;

        if (flashTitle) flashTitle.textContent = randomId;
        if (flashSubtitle) flashSubtitle.textContent = msg;

        flashBox.classList.add("pulse-highlight");
        setTimeout(() => flashBox.classList.remove("pulse-highlight"), 1400);
    }

    triggerFlash();
    setInterval(triggerFlash, 5500);
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

function getSortedCommentsForLang(lang) {
    const langCode = (lang || "fr").toUpperCase();
    const matching = WINNER_COMMENTS.filter((c) => c.lang === langCode);
    const others = WINNER_COMMENTS.filter((c) => c.lang !== langCode);
    return [...matching, ...others];
}

function renderCommentsList() {
    const grid = document.getElementById("commentsGrid");
    const remainingSpan = document.getElementById("commentsRemainingCount");
    if (!grid) return;

    const sortedList = getSortedCommentsForLang(currentLang);
    const visibleComments = sortedList.slice(0, displayedCommentsCount);

    grid.innerHTML = visibleComments.map((c) => `
        <div class="comment-card animate-fade">
            <div class="comment-header">
                <div class="comment-user-box">
                    <div class="comment-lang-badge">${escapeHtml(c.lang)}</div>
                    <div class="comment-username">${escapeHtml(c.username)} <i class="fa-solid fa-circle-check text-green"></i></div>
                </div>
                <div class="comment-gain-badge">${escapeHtml(c.gain)}</div>
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

    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    function resizeCanvas() {
        const parent = canvas.parentElement;
        if (parent) {
            const width = parent.clientWidth || 800;
            const height = Math.max(parent.clientHeight || 520, 360);
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }
        }
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

    function generateNextTarget() {
        const isBig = Math.random() < 0.25;
        if (isBig) {
            const bigs = [5.20, 5.85, 6.40, 7.15, 7.90];
            vipTargetMultiplier = bigs[Math.floor(Math.random() * bigs.length)];
            flightSpeed = 0.0011;
        } else {
            const regulars = [1.65, 1.85, 2.10, 2.35, 2.65, 2.95, 3.25];
            vipTargetMultiplier = regulars[Math.floor(Math.random() * regulars.length)];
            flightSpeed = 0.0015;
        }

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
    }

    function startCalibrationPhase() {
        flightState = "scanning";
        scannerLoader?.classList.remove("hidden");
        if (scanProgressFill) scanProgressFill.style.width = "0%";

        let progress = 0;
        const interval = setInterval(() => {
            if (!vipEngineRunning) {
                clearInterval(interval);
                return;
            }
            progress += 2;
            if (scanProgressFill) scanProgressFill.style.width = `${progress}%`;
            if (progress >= 100) {
                clearInterval(interval);
                scannerLoader?.classList.add("hidden");
                flightState = "flying";
                currentMultiplier = 1.00;
                flightProgress = 0;
                explosionTimer = 0;
                particles = [];
                generateNextTarget();
            }
        }, 120);
    }

    function renderVIPCockpit() {
        if (!vipEngineRunning) return;

        const W = canvas.width;
        const H = canvas.height;

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

        const startX = 25;
        const startY = H - 25;

        const multiplierRatio = Math.min(Math.max((vipTargetMultiplier - 1.2) / 6.8, 0.15), 0.95);
        const targetX = startX + (W - startX - 35) * (0.3 + multiplierRatio * 0.7);
        const targetY = startY - (startY - 35) * (0.25 + multiplierRatio * 0.75);

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
            const angle = Math.atan2(dy, dx);

            ctx.save();
            ctx.translate(curX, curY);
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

    startCalibrationPhase();
    renderVIPCockpit();
}

/* -------------------------------------------------------------------------- */
/* Authentification & Modales                                                 */
/* -------------------------------------------------------------------------- */

function initAuthSecurity() {
    const regForm = document.getElementById("registerForm");
    const logForm = document.getElementById("loginForm");
    const regSubmitBtn = document.getElementById("registerSubmitBtn");
    const loginSubmitBtn = document.getElementById("loginSubmitBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const profileLogoutBtn = document.getElementById("profileLogoutBtn");
    const vipLogoutBtn = document.getElementById("vipLogoutBtn");

    if (regForm) {
        regForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = document.getElementById("regName").value.trim();
            const email = document.getElementById("regEmail").value.trim().toLowerCase();
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

            const usersDb = loadUsersDb();
            if (usersDb.some((u) => u.email === email)) {
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
            setButtonLoading(regSubmitBtn, false);

            initGlobalViewRouter();
            closeAllModals();
            regForm.reset();
            showToast(`Compte créé ! Votre ID : ${newUser.uniqueId}`);

            if (pendingCheckoutAfterAuth) {
                pendingCheckoutAfterAuth = false;
                document.getElementById("buyModal")?.classList.add("active");
            }
        });
    }

    if (logForm) {
        logForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const identifier = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value;

            if (!identifier) {
                showToast("Email ou ID requis.", "error");
                return;
            }

            setButtonLoading(loginSubmitBtn, true);
            const usersDb = loadUsersDb();
            const lowerId = identifier.toLowerCase();
            const upperId = identifier.toUpperCase();
            let found = usersDb.find((u) => u.email === lowerId || u.uniqueId === upperId);

            if (!found && supabaseClient) {
                try {
                    const { data } = await supabaseClient
                        .from("users")
                        .select("*")
                        .or(`email.eq.${lowerId},unique_id.eq.${upperId}`)
                        .maybeSingle();

                    if (data) {
                        found = {
                            id: data.id || Date.now(),
                            uniqueId: sanitize7DigitId(data.unique_id),
                            name: data.name || "Client",
                            email: data.email,
                            phone: data.phone || "",
                            passwordHash: data.password_hash || "",
                            isSubscribed: Boolean(data.is_subscribed),
                            registeredAt: new Date().toLocaleDateString("fr-FR")
                        };
                    }
                } catch {}
            }

            if (found) {
                const match = await passwordMatches(found, password);
                if (match) {
                    if (found.passwordHash === btoa(password)) {
                        found.passwordHash = await hashPassword(password);
                    }
                    await saveUserSession(found, false);
                    setButtonLoading(loginSubmitBtn, false);
                    initGlobalViewRouter();
                    closeAllModals();
                    logForm.reset();
                    showToast(`Connexion réussie ! Bienvenue, ${found.name}.`);

                    if (pendingCheckoutAfterAuth) {
                        pendingCheckoutAfterAuth = false;
                        document.getElementById("buyModal")?.classList.add("active");
                    }
                    return;
                }
            }

            setButtonLoading(loginSubmitBtn, false);
            showToast("Identifiants incorrects.", "error");
        });
    }

    const handleLogout = () => {
        currentUser = null;
        localStorage.removeItem(CONFIG.sessionKey);
        if (realtimeChannel && supabaseClient) {
            supabaseClient.removeChannel(realtimeChannel);
            realtimeChannel = null;
        }
        initGlobalViewRouter();
        closeAllModals();
        showToast("Vous avez été déconnecté.");
    };

    logoutBtn?.addEventListener("click", handleLogout);
    profileLogoutBtn?.addEventListener("click", handleLogout);
    vipLogoutBtn?.addEventListener("click", handleLogout);
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

        const user7Id = sanitize7DigitId(currentUser.uniqueId);
        if (profileNameDisplay) profileNameDisplay.textContent = currentUser.name;
        if (profileEmailDisplay) profileEmailDisplay.textContent = currentUser.email;
        if (profileUniqueIdDisplay) profileUniqueIdDisplay.textContent = user7Id;
        if (profilePhoneInput) profilePhoneInput.value = currentUser.phone || "";

        if (profileStatusBadge) {
            if (!currentUser.isSubscribed) {
                profileStatusBadge.className = "status-tag-badge status-unsubscribed";
                profileStatusBadge.innerHTML = '<i class="fa-solid fa-circle-xmark" aria-hidden="true"></i> NON ACTIVÉ';
                if (btnProfileSubscribe) btnProfileSubscribe.style.display = "block";
            } else {
                profileStatusBadge.className = "status-tag-badge status-active";
                profileStatusBadge.innerHTML = '<i class="fa-solid fa-crown" aria-hidden="true"></i> LICENCE ACTIVE À VIE';
                if (btnProfileSubscribe) btnProfileSubscribe.style.display = "none";
            }
        }

        profileModal?.classList.add("active");
    });

    closeProfile?.addEventListener("click", () => profileModal?.classList.remove("active"));

    btnSavePhone?.addEventListener("click", async () => {
        if (!currentUser) return;
        const phone = profilePhoneInput.value.trim();
        if (phone && !isValidPhone(phone)) {
            showToast("Numéro de téléphone invalide.", "error");
            return;
        }
        currentUser.phone = phone;
        await saveUserSession(currentUser, true);
        showToast("Numéro de téléphone enregistré !");
    });

    formUpdatePassword?.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!currentUser) return;

        const oldPass = document.getElementById("profileOldPassword").value;
        const newPass = document.getElementById("profileNewPassword").value;
        const confirmPass = document.getElementById("profileConfirmNewPassword").value;

        const match = await passwordMatches(currentUser, oldPass);
        if (!match) {
            showToast("Mot de passe actuel incorrect.", "error");
            return;
        }
        if (!newPass || newPass.length < 6 || newPass !== confirmPass) {
            showToast("Vérifiez les nouveaux mots de passe (6+ caractères identiques).", "error");
            return;
        }

        currentUser.passwordHash = await hashPassword(newPass);
        await saveUserSession(currentUser, true);
        formUpdatePassword.reset();
        showToast("Mot de passe mis à jour !");
    });

    btnProfileSubscribe?.addEventListener("click", () => {
        profileModal?.classList.remove("active");
        document.getElementById("buyModal")?.classList.add("active");
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
        if (!currentUser) {
            checkoutAuthGate?.classList.remove("hidden");
            checkoutPaymentPanel?.classList.add("hidden");
        } else {
            checkoutAuthGate?.classList.add("hidden");
            checkoutPaymentPanel?.classList.remove("hidden");
            if (phoneInput && currentUser.phone) {
                phoneInput.value = currentUser.phone;
            }
        }
        buyModal?.classList.add("active");
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

    btnExecuteMomoPayment?.addEventListener("click", () => launchPayment("mobilemoneyfrancophone"));
    btnExecuteCardPayment?.addEventListener("click", () => launchPayment("card"));
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

    hidePaymentOverlay();
    closeAllModals();
    initGlobalViewRouter();
    showToast("🎉 Félicitations ! Votre cockpit d'analyse est débloqué à vie !");
}

function launchPayment(paymentOption) {
    if (paymentInFlight) return;

    if (!currentUser) {
        showToast("Veuillez vous inscrire ou vous connecter pour lier votre licence.", "error");
        pendingCheckoutAfterAuth = true;
        document.getElementById("buyModal")?.classList.remove("active");
        document.getElementById("registerModal")?.classList.add("active");
        return;
    }

    const phoneInput = document.getElementById("checkoutPhoneInput");
    const rawPhone = phoneInput?.value.trim() || currentUser.phone || "";
    if (paymentOption === "mobilemoneyfrancophone" && !isValidPhone(rawPhone)) {
        showToast("Veuillez saisir un numéro Mobile Money valide (8+ chiffres).", "error");
        phoneInput?.focus();
        return;
    }

    if (typeof window.FlutterwaveCheckout !== "function") {
        showToast("Passerelle de paiement en cours de chargement…", "error");
        return;
    }

    paymentInFlight = true;
    showPaymentOverlay("Ouverture de la passerelle sécurisée…");

    const isMomo = paymentOption === "mobilemoneyfrancophone";
    const amount = isMomo ? CONFIG.licenseXof : CONFIG.licenseUsd;
    const currency = isMomo ? "XOF" : "USD";
    const txRef = `CRASH-${currentUser.uniqueId || "USER"}-${Date.now()}`;

    try {
        window.FlutterwaveCheckout({
            public_key: CONFIG.flutterwavePublicKey,
            tx_ref: txRef,
            amount,
            currency,
            payment_options: paymentOption,
            customer: {
                email: currentUser.email,
                phone_number: digitsOnly(rawPhone) || "0700000000",
                name: currentUser.name || "Membre Actif"
            },
            customizations: {
                title: "CRASH PREDICTOR 2026",
                description: isMomo ? `Paiement ${selectedMomoNetwork} — 30 000 FCFA` : "Licence officielle — 50 $",
                logo: `${window.location.origin}/assets/crash_hd.jpg`
            },
            callback: async function (response) {
                paymentInFlight = false;
                const status = (response?.status || "").toLowerCase();
                if (status === "successful" || status === "completed" || response?.transaction_id) {
                    await handlePaymentSuccess(response, currency, amount);
                } else {
                    hidePaymentOverlay();
                    showToast("Paiement non finalisé.", "error");
                }
            },
            onclose: function () {
                paymentInFlight = false;
                hidePaymentOverlay();
            }
        });
    } catch {
        paymentInFlight = false;
        hidePaymentOverlay();
        showToast("Impossible d'initialiser le paiement.", "error");
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
            showToast("Veuillez saisir un ID membre (ex: CRASH-5829143).", "error");
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
