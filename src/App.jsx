import { useState } from "react";

// ── RESPONSIVE STYLES ─────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', 'Segoe UI', sans-serif; background: #f0f4f8; }

    /* Desktop navbar */
    .desk-nav {
      display: none;
      position: fixed; top: 0; left: 0; right: 0;
      background: #1E3A5F; z-index: 1000;
      padding: 0 40px; height: 64px;
      align-items: center; justify-content: space-between;
      box-shadow: 0 2px 12px rgba(0,0,0,0.15);
    }
    .desk-nav-links { display: flex; gap: 32px; align-items: center; }
    .desk-nav-link { color: #93C5FD; font-size: 14px; font-weight: 600; cursor: pointer; text-decoration: none; transition: color 0.2s; }
    .desk-nav-link:hover { color: #fff; }
    .desk-nav-btn { background: #2563EB; color: #fff; border: none; border-radius: 8px; padding: 9px 20px; font-size: 14px; font-weight: 700; cursor: pointer; }
    .desk-nav-btn:hover { background: #1d4ed8; }

    /* Desktop hero */
    .desk-hero {
      display: none;
      background: linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%);
      padding: 120px 40px 60px;
      text-align: center; color: #fff;
    }
    .desk-hero h1 { font-size: 48px; font-weight: 900; margin-bottom: 16px; }
    .desk-hero p { font-size: 20px; opacity: 0.85; margin-bottom: 32px; }
    .desk-hero-search {
      display: flex; max-width: 600px; margin: 0 auto;
      background: #fff; border-radius: 14px; padding: 8px 8px 8px 20px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    }
    .desk-hero-search input { flex: 1; border: none; outline: none; font-size: 16px; color: #111; background: transparent; }
    .desk-hero-search button { background: #2563EB; color: #fff; border: none; border-radius: 10px; padding: 12px 24px; font-size: 15px; font-weight: 700; cursor: pointer; }

    /* Desktop grid */
    .desk-grid { display: none; max-width: 1200px; margin: 0 auto; padding: 40px; }
    .desk-grid-title { font-size: 28px; font-weight: 800; color: #111; margin-bottom: 6px; }
    .desk-grid-sub { font-size: 15px; color: #888; margin-bottom: 28px; }
    .desk-cat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 48px; }
    .desk-cat-card {
      border-radius: 16px; overflow: hidden; position: relative;
      height: 200px; cursor: pointer; background-size: cover; background-position: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .desk-cat-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.15); }
    .desk-cat-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 100%);
      display: flex; flex-direction: column; justify-content: flex-end; padding: 16px;
    }
    .desk-cat-name { font-size: 18px; font-weight: 800; color: #fff; margin-bottom: 4px; }
    .desk-cat-desc { font-size: 12px; color: rgba(255,255,255,0.8); }

    /* Desktop provider grid */
    .desk-prov-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .desk-prov-card {
      background: #fff; border-radius: 16px; padding: 20px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.07);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .desk-prov-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }

    /* Desktop two-col layout for inner pages */
    .desk-two-col { display: none; max-width: 1200px; margin: 80px auto 0; padding: 40px; gap: 32px; }
    .desk-sidebar { width: 300px; flex-shrink: 0; }
    .desk-main { flex: 1; }

    /* Desktop WA section */
    .desk-wa-section { display: none; background: #1E3A5F; padding: 60px 40px; text-align: center; }
    .desk-wa-btns { display: flex; gap: 16px; justify-content: center; margin-top: 24px; flex-wrap: wrap; }

    /* Desktop footer */
    .desk-footer { display: none; background: #111; color: #aaa; padding: 40px; text-align: center; font-size: 13px; }

    /* Mobile bottom nav */
    .mob-nav { display: flex; }

    /* ── RESPONSIVE BREAKPOINTS ── */
    @media (min-width: 768px) {
      .desk-nav { display: flex; }
      .desk-hero { display: block; }
      .desk-grid { display: block; }
      .desk-wa-section { display: block; }
      .desk-footer { display: block; }
      .mob-nav { display: none !important; }
      .mob-header { display: none !important; }
      .mob-search { display: none !important; }
      .mob-cats { display: none !important; }
      .mob-wa { display: none !important; }
      .mob-about-cta { display: none !important; }
      .desk-two-col { display: flex; }
    }

    @media (max-width: 767px) {
      .desk-nav { display: none !important; }
      .desk-hero { display: none !important; }
      .desk-grid { display: none !important; }
      .desk-wa-section { display: none !important; }
      .desk-footer { display: none !important; }
      .desk-two-col { display: none !important; }
    }

    /* Smooth scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: #f0f4f8; }
    ::-webkit-scrollbar-thumb { background: #2563EB; border-radius: 3px; }
  `}</style>
);



// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const WA_NUMBER = "598095300356";

const T = {
  es: {
    appName: "ServiUY",
    tagline: "¿Qué servicio necesitas hoy?",
    search: "Buscar servicios...",
    serviceCategories: "Categorías de Servicio",
    selectService: "Selecciona el servicio que necesitas",
    services: "servicios",
    mapView: "Mapa de Profesionales",
    professionalsNearby: "Profesionales Cercanos",
    available: "Disponible", emergency: "Emergencia",
    viewProfile: "Ver Perfil →", reviews: "reseñas", yearsExp: "años",
    estimatedPrices: "Precios Estimados",
    priceNote: "Precios base para trabajos estándar, pueden variar según complejidad",
    bookService: "Reservar Servicio →", book: "Reservar →",
    emergencies: "Emergencias", nocturnal: "Nocturno",
    filterEmergency: "Emergencias", filterNocturnal: "Nocturnos",
    searchPro: "Buscar profesional...", back: "←",
    favorites: "Favoritos", messages: "Mensajes",
    myBookings: "Mis Reservas", profile: "Perfil", home: "Inicio",
    profInArea: "profesionales en tu área",
    mapNote: "Integra tu Google Maps API key para ver el mapa real",
    allDepts: "Todos los departamentos", allCities: "Todas las ciudades",
    allServices: "Todos los servicios", radius: "Radio (km)",
    perHour: "/hr", searchBtn: "Buscar",
    waProviderLabel: "¿Eres profesional?",
    waProviderBtn: "💬 Quiero registrarme",
    waProviderMsg: "Hola ServiUY, quiero registrarme como profesional",
    waCustomerLabel: "¿Necesitas ayuda?",
    waCustomerBtn: "💬 Necesito ayuda",
    waCustomerMsg: "Hola ServiUY, necesito ayuda con la app",
    waSectionTitle: "¿Tienes preguntas?",
    waSectionSub: "Escríbenos por WhatsApp, te respondemos enseguida",
    registerProvider: "¿Eres profesional? Regístrate",
    // Auth
    loginTitle: "Bienvenido a ServiUY", loginSub: "Inicia sesión para continuar",
    email: "Correo electrónico", password: "Contraseña",
    loginBtn: "Iniciar sesión", orRegister: "¿No tienes cuenta?",
    registerBtn: "Regístrate gratis", forgotPass: "¿Olvidaste tu contraseña?",
    registerTitle: "Crear cuenta", registerSub: "Es gratis para clientes",
    name: "Nombre completo", confirmPass: "Confirmar contraseña",
    createBtn: "Crear cuenta →", alreadyHave: "¿Ya tienes cuenta?", loginLink: "Inicia sesión",
    // About
    aboutTitle: "¿Cómo funciona ServiUY?",
    aboutSub: "Encuentra el profesional que necesitas en minutos",
    howStep1Title: "Busca el servicio", howStep1Desc: "Selecciona la categoría y tu ubicación en Uruguay.",
    howStep2Title: "Elige un profesional", howStep2Desc: "Compara perfiles, reseñas y precios antes de decidir.",
    howStep3Title: "Reserva y listo", howStep3Desc: "Contacta directamente o reserva desde la app.",
    forProviders: "¿Eres profesional?",
    forProvidersSub: "Únete a ServiUY y llega a miles de clientes en todo Uruguay por solo UYU $2.000/mes.",
    registerNow: "Registrarme ahora →",
    aboutMission: "Nuestra misión",
    aboutMissionText: "Conectar a los uruguayos con profesionales de confianza de forma rápida, transparente y segura.",
    freeForCustomers: "Gratis para clientes",
    verifiedProviders: "Profesionales verificados",
    allUruguay: "Cobertura en todo Uruguay",
    // Dashboard
    dashTitle: "Mi Panel", dashWelcome: "Bienvenido de vuelta",
    dashStatus: "Estado de tu suscripción",
    dashActive: "✅ Activo", dashInactive: "⏸ Inactivo",
    dashExpires: "Próximo pago:",
    dashViews: "Visitas a tu perfil", dashBookings: "Reservas este mes",
    dashRating: "Tu calificación",
    dashEditProfile: "Editar perfil →",
    dashReviews: "Últimas reseñas",
    dashRenew: "Renovar suscripción →",
    dashLogout: "Cerrar sesión",
    dashStats: "Estadísticas",
    dashNoReviews: "Aún no tienes reseñas",
  },
  en: {
    appName: "ServiUY",
    tagline: "What service do you need today?",
    search: "Search services...",
    serviceCategories: "Service Categories",
    selectService: "Select the service you need",
    services: "services",
    mapView: "Professionals Map",
    professionalsNearby: "Nearby Professionals",
    available: "Available", emergency: "Emergency",
    viewProfile: "View Profile →", reviews: "reviews", yearsExp: "yrs",
    estimatedPrices: "Estimated Prices",
    priceNote: "Base prices for standard work, may vary by complexity",
    bookService: "Book Service →", book: "Book →",
    emergencies: "Emergencies", nocturnal: "Overnight",
    filterEmergency: "Emergencies", filterNocturnal: "Overnight",
    searchPro: "Search professional...", back: "←",
    favorites: "Favorites", messages: "Messages",
    myBookings: "My Bookings", profile: "Profile", home: "Home",
    profInArea: "professionals in your area",
    mapNote: "Integrate your Google Maps API key to see the real map",
    allDepts: "All departments", allCities: "All cities",
    allServices: "All services", radius: "Radius (km)",
    perHour: "/hr", searchBtn: "Search",
    waProviderLabel: "Are you a professional?",
    waProviderBtn: "💬 I want to register",
    waProviderMsg: "Hello ServiUY, I want to register as a professional",
    waCustomerLabel: "Need help with the app?",
    waCustomerBtn: "💬 I need help",
    waCustomerMsg: "Hello ServiUY, I need help with the app",
    waSectionTitle: "Have questions?",
    waSectionSub: "Message us on WhatsApp, we respond right away",
    registerProvider: "Are you a professional? Register",
    loginTitle: "Welcome to ServiUY", loginSub: "Sign in to continue",
    email: "Email address", password: "Password",
    loginBtn: "Sign in", orRegister: "Don't have an account?",
    registerBtn: "Register for free", forgotPass: "Forgot your password?",
    registerTitle: "Create account", registerSub: "Free for customers",
    name: "Full name", confirmPass: "Confirm password",
    createBtn: "Create account →", alreadyHave: "Already have an account?", loginLink: "Sign in",
    aboutTitle: "How does ServiUY work?",
    aboutSub: "Find the professional you need in minutes",
    howStep1Title: "Search for a service", howStep1Desc: "Select the category and your location in Uruguay.",
    howStep2Title: "Choose a professional", howStep2Desc: "Compare profiles, reviews and prices before deciding.",
    howStep3Title: "Book and done", howStep3Desc: "Contact directly or book through the app.",
    forProviders: "Are you a professional?",
    forProvidersSub: "Join ServiUY and reach thousands of customers across Uruguay for only UYU $2,000/month.",
    registerNow: "Register now →",
    aboutMission: "Our mission",
    aboutMissionText: "Connecting Uruguayans with trusted professionals quickly, transparently and safely.",
    freeForCustomers: "Free for customers",
    verifiedProviders: "Verified professionals",
    allUruguay: "Coverage across Uruguay",
    dashTitle: "My Dashboard", dashWelcome: "Welcome back",
    dashStatus: "Subscription status",
    dashActive: "✅ Active", dashInactive: "⏸ Inactive",
    dashExpires: "Next payment:",
    dashViews: "Profile views", dashBookings: "Bookings this month",
    dashRating: "Your rating",
    dashEditProfile: "Edit profile →",
    dashReviews: "Latest reviews",
    dashRenew: "Renew subscription →",
    dashLogout: "Sign out",
    dashStats: "Statistics",
    dashNoReviews: "No reviews yet",
  },
};

const CATEGORIES = [
  { id:"construccion", es:"Construcción", en:"Construction", descEs:"Albañilería, pintura, yeso, techados", descEn:"Masonry, painting, plaster, roofing", icon:"🔨", bg:"https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80", count:4 },
  { id:"fontaneria",   es:"Fontanería",   en:"Plumbing",      descEs:"Reparación de fugas, limpieza de drenajes", descEn:"Leak repair, drain cleaning", icon:"💧", bg:"https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80", count:4 },
  { id:"electricidad", es:"Electricidad", en:"Electrical",    descEs:"Instalaciones, reparaciones, paneles", descEn:"Installations, repairs, panels", icon:"⚡", bg:"https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&q=80", count:5 },
  { id:"jardineria",   es:"Jardinería",   en:"Gardening",     descEs:"Diseño, mantenimiento, poda, riego", descEn:"Design, maintenance, pruning", icon:"🌿", bg:"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80", count:3 },
  { id:"piscinas",     es:"Piscinas",     en:"Pool Service",  descEs:"Limpieza, mantenimiento, reparaciones", descEn:"Cleaning, maintenance, repairs", icon:"🏊", bg:"https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=600&q=80", count:2 },
  { id:"mecanica",     es:"Mecánica",     en:"Mechanic",      descEs:"Reparación de vehículos, diagnóstico", descEn:"Vehicle repair, diagnostics", icon:"🔧", bg:"https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=600&q=80", count:6 },
  { id:"grua",         es:"Grúa / Remolque", en:"Towing",     descEs:"Servicio de grúa 24/7", descEn:"24/7 towing service", icon:"🚛", bg:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", count:3 },
  { id:"limpieza",     es:"Limpieza",     en:"Cleaning",      descEs:"Hogar, oficinas, post-obra", descEn:"Home, office, post-construction", icon:"🧹", bg:"https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80", count:5 },
];

const DEPARTMENTS = ["Montevideo","Canelones","Maldonado","Rocha","Treinta y Tres","Cerro Largo","Rivera","Artigas","Salto","Paysandú","Río Negro","Soriano","Colonia","San José","Flores","Florida","Lavalleja","Durazno","Tacuarembó"];

const PROVIDERS = [
  { id:1, name:"Ana García",          serviceId:"fontaneria",   dept:"Montevideo", city:"Pocitos",          rating:4.8, reviews:18, desc:"Fontanera certificada con especialización en emergencias.", descEn:"Certified plumber specializing in emergencies.", years:9,  price:48, emergency:true,  nocturnal:true,  kmAway:4.8 },
  { id:2, name:"Carlos Rodríguez",    serviceId:"electricidad", dept:"Montevideo", city:"Buceo",            rating:5.0, reviews:1,  desc:"Electricista profesional con 10 años de experiencia.",   descEn:"Professional electrician, 10 years experience.",  years:10, price:35, emergency:true,  nocturnal:true,  kmAway:1.2 },
  { id:3, name:"Miguel Fernández",    serviceId:"fontaneria",   dept:"Canelones",  city:"Las Piedras",      rating:3.8, reviews:2,  desc:"Fontanero disponible 24/7 para emergencias.",            descEn:"Plumber available 24/7 for emergencies.",         years:5,  price:30, emergency:true,  nocturnal:false, kmAway:8.4 },
  { id:4, name:"Laura Suárez",        serviceId:"jardineria",   dept:"Maldonado",  city:"Punta del Este",   rating:4.9, reviews:34, desc:"Paisajista especializada en jardines costeros.",         descEn:"Landscape designer, coastal gardens specialist.",  years:12, price:25, emergency:false, nocturnal:false, kmAway:2.1 },
  { id:5, name:"Roberto Silva",       serviceId:"mecanica",     dept:"Montevideo", city:"Carrasco",         rating:4.6, reviews:12, desc:"Mecánico automotriz certificado, diagnóstico comp.",     descEn:"Certified mechanic, computerized diagnostics.",    years:15, price:55, emergency:true,  nocturnal:false, kmAway:3.7 },
  { id:6, name:"Construcciones Pérez",serviceId:"construccion", dept:"Montevideo", city:"Punta Carretas",   rating:4.7, reviews:27, desc:"Empresa constructora familiar con 20 años.",             descEn:"Family construction company, 20 years.",          years:20, price:65, emergency:false, nocturnal:false, kmAway:5.2 },
  { id:7, name:"AquaPool UY",         serviceId:"piscinas",     dept:"Canelones",  city:"Pando",            rating:4.5, reviews:9,  desc:"Especialistas en piscinas residenciales y comerciales.", descEn:"Residential and commercial pool specialists.",    years:8,  price:40, emergency:false, nocturnal:false, kmAway:12.0 },
  { id:8, name:"Grúas 24 Rivera",     serviceId:"grua",         dept:"Montevideo", city:"Montevideo Centro", rating:4.3, reviews:45, desc:"Servicio de grúa 24h, cobertura todo Montevideo.",      descEn:"24h towing, full Montevideo coverage.",           years:7,  price:80, emergency:true,  nocturnal:true,  kmAway:0.8 },
];

const MOCK_REVIEWS = [
  { name:"Carlos M.", rating:5, text:"Excelente servicio, muy puntual y profesional.", date:"Hace 2 días" },
  { name:"María G.",  rating:4, text:"Buen trabajo, llegó rápido ante la emergencia.", date:"Hace 1 semana" },
  { name:"Pedro L.",  rating:5, text:"Lo recomiendo totalmente, precio justo.",         date:"Hace 2 semanas" },
];

// ── LOGO SVG ──────────────────────────────────────────────────────────────────
function Logo({ size = 40, dark = false }) {
  const bg = dark ? "#2563EB" : "#1E3A5F";
  const fg = dark ? "#fff" : "#2563EB";
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="10" fill={bg} />
      {/* Handshake */}
      <path d="M10 22 C10 22 14 18 17 18 L20 18 L23 15 L26 15" stroke={fg} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M30 18 C30 18 26 22 23 22 L20 22 L17 25 L14 25" stroke={fg} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="20" cy="20" r="3" fill={fg} opacity="0.9"/>
      {/* House outline */}
      <path d="M15 28 L15 23 L20 19 L25 23 L25 28 Z" stroke={fg} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6"/>
    </svg>
  );
}

function LogoFull({ dark = false }) {
  return (
    <div style={{display:"flex", alignItems:"center", gap:8}}>
      <Logo size={38} dark={dark} />
      <div>
        <div style={{fontSize:9, fontWeight:800, letterSpacing:3, color: dark?"#111":"#111", opacity:0.6}}>SERVICIOS</div>
        <div style={{fontSize:18, fontWeight:900, color: dark?"#111":"#111", letterSpacing:1, lineHeight:1}}>ServiUY</div>
      </div>
    </div>
      </div>
    </div>
  );
}

// ── WHATSAPP ICON ─────────────────────────────────────────────────────────────
function WAIcon({ color = "white", size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.11 1.523 5.832L.057 23.925a.75.75 0 00.918.918l6.093-1.466A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.5-5.24-1.375l-.373-.215-3.867.931.947-3.867-.229-.381A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  );
}

// ── SHARED COMPONENTS ─────────────────────────────────────────────────────────
function Stars({ rating, big }) {
  return (
    <div style={{display:"flex", gap:big?4:2}}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{color:"#f5a623", fontSize:big?22:14}}>{i <= Math.round(rating) ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

function ProviderCard({ p, lang, t, onProfile }) {
  const [fav, setFav] = useState(false);
  return (
    <div style={{background:"#fff", borderRadius:16, margin:"10px 14px", padding:"14px", boxShadow:"0 1px 6px rgba(0,0,0,0.07)"}}>
      <div style={{display:"flex", gap:12, alignItems:"flex-start", marginBottom:8}}>
        <div style={{width:52, height:52, background:"#e3eaf4", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0}}>👤</div>
        <div style={{flex:1}}>
          <div style={{display:"flex", alignItems:"flex-start"}}>
            <span style={{fontSize:16, fontWeight:800, color:"#111", flex:1}}>{p.name}</span>
            <button style={{fontSize:20, cursor:"pointer", background:"none", border:"none", color:fav?"#f06":"#ddd", padding:0}} onClick={() => setFav(f => !f)}>♥</button>
          </div>
          <Stars rating={p.rating} />
          <span style={{fontSize:13, color:"#555"}}>⭐ {p.rating} ({p.reviews} {t.reviews})</span>
        </div>
      </div>
      <p style={{fontSize:13, color:"#666", marginBottom:8, lineHeight:1.5}}>{lang==="es" ? p.desc : p.descEn}</p>
      <div style={{display:"flex", gap:6, flexWrap:"wrap", marginBottom:10, alignItems:"center"}}>
        {p.emergency && <span style={{background:"#fff0f0", color:"#d00", borderRadius:20, padding:"4px 12px", fontSize:12}}>🚨 {t.emergencies}</span>}
        {p.nocturnal  && <span style={{background:"#f0f0ff", color:"#446", borderRadius:20, padding:"4px 12px", fontSize:12}}>🌙 {t.nocturnal}</span>}
        <span style={{color:"#2a7a2a", fontWeight:800, fontSize:14, marginLeft:"auto"}}>${p.price}{t.perHour}</span>
      </div>
      <button style={{background:"#2563EB", border:"none", borderRadius:10, padding:"11px 0", width:"100%", fontSize:15, fontWeight:800, cursor:"pointer", color:"#fff"}} onClick={() => onProfile(p)}>
        {t.book}
      </button>
    </div>
  );
}

function PageHeader({ title, onBack, right }) {
  return (
    <div style={{display:"flex", alignItems:"center", padding:"16px", background:"#fff", borderBottom:"1px solid #eee", gap:12}}>
      <button style={{fontSize:20, cursor:"pointer", color:"#111", background:"none", border:"none", padding:"0 4px"}} onClick={onBack}>←</button>
      <span style={{fontSize:18, fontWeight:800, color:"#111", flex:1}}>{title}</span>
      {right}
    </div>
  );
}

function WhatsAppButtons({ t }) {
  const open = (msg) => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  return (
    <div style={{margin:"14px 16px 4px"}}>
      <div style={{fontSize:15, fontWeight:800, color:"#111", marginBottom:4}}>{t.waSectionTitle}</div>
      <div style={{fontSize:12, color:"#888", marginBottom:12}}>{t.waSectionSub}</div>
      <div style={{background:"#fff", borderRadius:14, padding:"14px", marginBottom:10, boxShadow:"0 1px 6px rgba(0,0,0,0.07)"}}>
        <div style={{fontSize:12, color:"#888", marginBottom:8}}>🔧 {t.waProviderLabel}</div>
        <button onClick={() => open(t.waProviderMsg)} style={{width:"100%", background:"#25D366", border:"none", borderRadius:10, padding:"12px 0", fontSize:14, fontWeight:800, cursor:"pointer", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", gap:8}}>
          <WAIcon /> {t.waProviderBtn}
        </button>
      </div>
      <div style={{background:"#fff", borderRadius:14, padding:"14px", boxShadow:"0 1px 6px rgba(0,0,0,0.07)"}}>
        <div style={{fontSize:12, color:"#888", marginBottom:8}}>❓ {t.waCustomerLabel}</div>
        <button onClick={() => open(t.waCustomerMsg)} style={{width:"100%", background:"#111", border:"none", borderRadius:10, padding:"12px 0", fontSize:14, fontWeight:800, cursor:"pointer", color:"#2563EB", display:"flex", alignItems:"center", justifyContent:"center", gap:8}}>
          <WAIcon color="#2563EB" /> {t.waCustomerBtn}
        </button>
      </div>
    </div>
  );
}

// ── LOGIN PAGE ────────────────────────────────────────────────────────────────
function LoginPage({ t, onLogin, onRegister }) {
  const [email, setEmail] = useState("");
  const [pass, setPass]   = useState("");
  const [err, setErr]     = useState("");
  const inp = { width:"100%", border:"1.5px solid #ddd", borderRadius:10, padding:"12px 14px", fontSize:15, outline:"none", boxSizing:"border-box", marginBottom:12 };
  const handle = () => {
    if (!email || !pass) { setErr("Por favor completa todos los campos"); return; }
    onLogin({ name: email.split("@")[0], email });
  };
  return (
    <div style={{minHeight:"100vh", background:"#f5f5f7", display:"flex", flexDirection:"column"}}>
      {/* Top branding */}
      <div style={{background:"#1E3A5F", padding:"40px 24px 32px", textAlign:"center"}}>
        <div style={{display:"flex", justifyContent:"center", marginBottom:12}}><Logo size={56} /></div>
        <div style={{fontSize:26, fontWeight:900, color:"#111", letterSpacing:1}}>ServiUY</div>
        <div style={{fontSize:13, color:"#333", marginTop:4}}>{t.loginSub}</div>
      </div>
      {/* Form card */}
      <div style={{background:"#fff", margin:"0", padding:"28px 24px", flex:1}}>
        <div style={{fontSize:20, fontWeight:800, color:"#111", marginBottom:20}}>{t.loginTitle}</div>
        <label style={{fontSize:13, fontWeight:600, color:"#555", marginBottom:4, display:"block"}}>{t.email}</label>
        <input style={inp} type="email" placeholder="tu@email.com" value={email} onChange={e => setEmail(e.target.value)} />
        <label style={{fontSize:13, fontWeight:600, color:"#555", marginBottom:4, display:"block"}}>{t.password}</label>
        <input style={inp} type="password" placeholder="••••••••" value={pass} onChange={e => setPass(e.target.value)} />
        {err && <div style={{color:"#d00", fontSize:13, marginBottom:10}}>{err}</div>}
        <div style={{textAlign:"right", marginBottom:16}}>
          <span style={{fontSize:13, color:"#666", cursor:"pointer"}}>{t.forgotPass}</span>
        </div>
        <button onClick={handle} style={{width:"100%", background:"#2563EB", border:"none", borderRadius:12, padding:"14px 0", fontSize:16, fontWeight:800, cursor:"pointer", color:"#fff", marginBottom:16}}>
          {t.loginBtn}
        </button>
        <div style={{textAlign:"center", fontSize:14, color:"#888"}}>
          {t.orRegister} <span style={{color:"#111", fontWeight:700, cursor:"pointer"}} onClick={onRegister}>{t.registerBtn}</span>
        </div>
      </div>
    </div>
  );
}

// ── SIGNUP PAGE ───────────────────────────────────────────────────────────────
function SignupPage({ t, onSignup, onLogin }) {
  const [form, setForm] = useState({ name:"", email:"", pass:"", confirm:"" });
  const [err, setErr]   = useState("");
  const inp = { width:"100%", border:"1.5px solid #ddd", borderRadius:10, padding:"12px 14px", fontSize:15, outline:"none", boxSizing:"border-box", marginBottom:12 };
  const set = (k,v) => setForm(f => ({...f, [k]:v}));
  const handle = () => {
    if (!form.name || !form.email || !form.pass) { setErr("Por favor completa todos los campos"); return; }
    if (form.pass !== form.confirm) { setErr("Las contraseñas no coinciden"); return; }
    onSignup({ name: form.name, email: form.email });
  };
  return (
    <div style={{minHeight:"100vh", background:"#f5f5f7", display:"flex", flexDirection:"column"}}>
      <div style={{background:"#1E3A5F", padding:"32px 24px 24px", textAlign:"center"}}>
        <div style={{display:"flex", justifyContent:"center", marginBottom:10}}><Logo size={48} /></div>
        <div style={{fontSize:22, fontWeight:900, color:"#111"}}>ServiUY</div>
        <div style={{fontSize:13, color:"#333", marginTop:4}}>{t.registerSub}</div>
      </div>
      <div style={{background:"#fff", padding:"28px 24px", flex:1}}>
        <div style={{fontSize:20, fontWeight:800, color:"#111", marginBottom:20}}>{t.registerTitle}</div>
        {[["name", t.name, "text", "Juan Pérez"], ["email", t.email, "email", "tu@email.com"], ["pass", t.password, "password", "••••••••"], ["confirm", t.confirmPass, "password", "••••••••"]].map(([k, label, type, ph]) => (
          <div key={k}>
            <label style={{fontSize:13, fontWeight:600, color:"#555", marginBottom:4, display:"block"}}>{label}</label>
            <input style={inp} type={type} placeholder={ph} value={form[k]} onChange={e => set(k, e.target.value)} />
          </div>
        ))}
        {err && <div style={{color:"#d00", fontSize:13, marginBottom:10}}>{err}</div>}
        <button onClick={handle} style={{width:"100%", background:"#2563EB", border:"none", borderRadius:12, padding:"14px 0", fontSize:16, fontWeight:800, cursor:"pointer", color:"#fff", marginBottom:16}}>
          {t.createBtn}
        </button>
        <div style={{textAlign:"center", fontSize:14, color:"#888"}}>
          {t.alreadyHave} <span style={{color:"#111", fontWeight:700, cursor:"pointer"}} onClick={onLogin}>{t.loginLink}</span>
        </div>
      </div>
    </div>
  );
}

// ── ABOUT PAGE ────────────────────────────────────────────────────────────────
function AboutPage({ t, onBack, onRegisterProvider }) {
  const steps = [
    { icon:"🔍", title:t.howStep1Title, desc:t.howStep1Desc, num:"01" },
    { icon:"👤", title:t.howStep2Title, desc:t.howStep2Desc, num:"02" },
    { icon:"✅", title:t.howStep3Title, desc:t.howStep3Desc, num:"03" },
  ];
  return (
    <div style={{background:"#f5f5f7", minHeight:"100vh", paddingBottom:80}}>
      <PageHeader title={t.aboutTitle} onBack={onBack} />
      {/* Hero */}
      <div style={{background:"#1E3A5F", padding:"28px 20px 24px", textAlign:"center"}}>
        <div style={{display:"flex", justifyContent:"center", marginBottom:12}}><Logo size={56} /></div>
        <div style={{fontSize:22, fontWeight:800, color:"#111", marginBottom:6}}>{t.aboutTitle}</div>
        <div style={{fontSize:14, color:"#333"}}>{t.aboutSub}</div>
      </div>
      {/* How it works steps */}
      <div style={{padding:"20px 16px 0"}}>
        {steps.map((s, i) => (
          <div key={i} style={{background:"#fff", borderRadius:16, padding:"18px", marginBottom:12, display:"flex", gap:14, alignItems:"flex-start", boxShadow:"0 1px 6px rgba(0,0,0,0.06)"}}>
            <div style={{width:44, height:44, background:"#2563EB", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0}}>{s.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:10, fontWeight:800, color:"#aaa", letterSpacing:2, marginBottom:2}}>{s.num}</div>
              <div style={{fontSize:16, fontWeight:800, color:"#111", marginBottom:4}}>{s.title}</div>
              <div style={{fontSize:13, color:"#666", lineHeight:1.6}}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Mission */}
      <div style={{margin:"4px 16px 12px", background:"#111", borderRadius:16, padding:"20px"}}>
        <div style={{fontSize:14, fontWeight:800, color:"#2563EB", marginBottom:8}}>💡 {t.aboutMission}</div>
        <div style={{fontSize:14, color:"#ddd", lineHeight:1.7}}>{t.aboutMissionText}</div>
      </div>
      {/* Benefits pills */}
      <div style={{padding:"0 16px", display:"flex", gap:8, flexWrap:"wrap", marginBottom:16}}>
        {[t.freeForCustomers, t.verifiedProviders, t.allUruguay].map((b,i) => (
          <span key={i} style={{background:"#fff", border:"1.5px solid #2563EB", borderRadius:20, padding:"6px 14px", fontSize:12, fontWeight:700, color:"#111"}}>✅ {b}</span>
        ))}
      </div>
      {/* Provider CTA */}
      <div style={{margin:"0 16px 20px", background:"#fff", borderRadius:16, padding:"20px", boxShadow:"0 1px 6px rgba(0,0,0,0.07)"}}>
        <div style={{fontSize:16, fontWeight:800, color:"#111", marginBottom:6}}>🔧 {t.forProviders}</div>
        <div style={{fontSize:13, color:"#666", lineHeight:1.6, marginBottom:14}}>{t.forProvidersSub}</div>
        <button onClick={onRegisterProvider} style={{width:"100%", background:"#2563EB", border:"none", borderRadius:12, padding:"13px 0", fontSize:15, fontWeight:800, cursor:"pointer", color:"#fff"}}>
          {t.registerNow}
        </button>
      </div>
    </div>
  );
}

// ── PROVIDER DASHBOARD ────────────────────────────────────────────────────────
function DashboardPage({ t, user, onBack, onLogout }) {
  const stats = [
    { label:t.dashViews,    value:"142", icon:"👁️" },
    { label:t.dashBookings, value:"8",   icon:"📅" },
    { label:t.dashRating,   value:"4.8 ★", icon:"⭐" },
  ];
  return (
    <div style={{background:"#f5f5f7", minHeight:"100vh", paddingBottom:80}}>
      <PageHeader title={t.dashTitle} onBack={onBack} right={
        <button onClick={onLogout} style={{fontSize:12, color:"#888", background:"none", border:"none", cursor:"pointer"}}>{t.dashLogout}</button>
      } />
      {/* Welcome bar */}
      <div style={{background:"#1E3A5F", padding:"20px 16px"}}>
        <div style={{display:"flex", alignItems:"center", gap:12}}>
          <div style={{width:52, height:52, background:"#111", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24}}>👤</div>
          <div>
            <div style={{fontSize:13, color:"#333"}}>{t.dashWelcome},</div>
            <div style={{fontSize:20, fontWeight:800, color:"#111"}}>{user?.name || "Profesional"}</div>
          </div>
        </div>
      </div>
      {/* Subscription status */}
      <div style={{margin:"14px 16px 0", background:"#fff", borderRadius:14, padding:"16px", boxShadow:"0 1px 6px rgba(0,0,0,0.07)"}}>
        <div style={{fontSize:13, color:"#888", marginBottom:6}}>{t.dashStatus}</div>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <span style={{fontSize:16, fontWeight:800, color:"#2a7a2a"}}>{t.dashActive}</span>
          <span style={{fontSize:12, color:"#888"}}>{t.dashExpires} 15/07/2026</span>
        </div>
        <div style={{height:6, background:"#eee", borderRadius:3, marginTop:10}}>
          <div style={{width:"75%", height:6, background:"#2563EB", borderRadius:3}} />
        </div>
        <div style={{fontSize:11, color:"#aaa", marginTop:4}}>22 días restantes</div>
      </div>
      {/* Stats */}
      <div style={{margin:"12px 16px 0"}}>
        <div style={{fontSize:14, fontWeight:800, color:"#111", marginBottom:8}}>{t.dashStats}</div>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8}}>
          {stats.map((s,i) => (
            <div key={i} style={{background:"#fff", borderRadius:12, padding:"14px 10px", textAlign:"center", boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
              <div style={{fontSize:22}}>{s.icon}</div>
              <div style={{fontSize:20, fontWeight:800, color:"#111", margin:"4px 0"}}>{s.value}</div>
              <div style={{fontSize:10, color:"#888"}}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Edit profile */}
      <div style={{margin:"12px 16px 0", background:"#111", borderRadius:14, padding:"16px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer"}}>
        <div>
          <div style={{fontSize:14, fontWeight:800, color:"#2563EB"}}>🔧 {t.dashEditProfile}</div>
          <div style={{fontSize:12, color:"#aaa", marginTop:2}}>Actualiza tu perfil y servicios</div>
        </div>
        <span style={{color:"#2563EB", fontSize:22}}>→</span>
      </div>
      {/* Reviews */}
      <div style={{margin:"12px 16px 0"}}>
        <div style={{fontSize:14, fontWeight:800, color:"#111", marginBottom:8}}>{t.dashReviews}</div>
        {MOCK_REVIEWS.map((r,i) => (
          <div key={i} style={{background:"#fff", borderRadius:12, padding:"12px 14px", marginBottom:8, boxShadow:"0 1px 4px rgba(0,0,0,0.05)"}}>
            <div style={{display:"flex", justifyContent:"space-between", marginBottom:4}}>
              <span style={{fontWeight:700, fontSize:14, color:"#111"}}>{r.name}</span>
              <span style={{fontSize:12, color:"#aaa"}}>{r.date}</span>
            </div>
            <Stars rating={r.rating} />
            <div style={{fontSize:13, color:"#666", marginTop:6}}>{r.text}</div>
          </div>
        ))}
      </div>
      {/* Renew */}
      <div style={{margin:"12px 16px 20px"}}>
        <button style={{width:"100%", background:"#2563EB", border:"none", borderRadius:12, padding:"14px 0", fontSize:15, fontWeight:800, cursor:"pointer", color:"#fff"}}>
          {t.dashRenew}
        </button>
      </div>
    </div>
  );
}

// ── HOME PAGE ─────────────────────────────────────────────────────────────────
function HomePage({ lang, t, user, onCategory, onMap, onAbout, onDashboard }) {
  const [search, setSearch] = useState("");
  const filtered = CATEGORIES.filter(c => !search || (lang==="es"?c.es:c.en).toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={{paddingBottom:80}}>
      {/* Header */}
      <div style={{background:"#1E3A5F", padding:"18px 16px 14px", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
        <div>
          <LogoFull />
          <div style={{fontSize:13, color:"#333", marginTop:6}}>
            {user ? `👋 Hola, ${user.name}!` : t.tagline}
          </div>
        </div>
        {user ? (
          <div onClick={onDashboard} style={{width:42, height:42, background:"#111", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, cursor:"pointer"}}>👤</div>
        ) : null}
      </div>
      {/* Search */}
      <div style={{padding:"14px 16px", background:"#fff"}}>
        <div style={{display:"flex", alignItems:"center", gap:8, border:"2px solid #2563EB", borderRadius:12, padding:"10px 14px"}}>
          <span style={{fontSize:18, color:"#aaa"}}>🔍</span>
          <input style={{flex:1, border:"none", outline:"none", fontSize:15, background:"transparent"}} placeholder={t.search} value={search} onChange={e => setSearch(e.target.value)} />
          <button onClick={onMap} style={{background:"#2563EB", border:"none", borderRadius:8, width:36, height:36, cursor:"pointer", fontSize:18}}>🗺️</button>
        </div>
      </div>
      {/* Categories */}
      <div style={{padding:"16px 16px 0"}}>
        <div style={{fontSize:20, fontWeight:800, color:"#111", marginBottom:2}}>{t.serviceCategories}</div>
        <div style={{fontSize:13, color:"#888", marginBottom:14}}>{t.selectService}</div>
        {filtered.map(cat => (
          <div key={cat.id} onClick={() => onCategory(cat)} style={{borderRadius:16, overflow:"hidden", marginBottom:12, position:"relative", height:150, cursor:"pointer", backgroundSize:"cover", backgroundPosition:"center", backgroundImage:`url(${cat.bg})`}}>
            <div style={{position:"absolute", inset:0, background:"linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 100%)", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"14px 16px"}}>
              <div style={{width:38, height:38, background:"rgba(255,255,255,0.15)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, marginBottom:6}}>{cat.icon}</div>
              <div style={{fontSize:22, fontWeight:800, color:"#fff", marginBottom:2}}>{lang==="es"?cat.es:cat.en}</div>
              <div style={{fontSize:12, color:"rgba(255,255,255,0.85)", marginBottom:4}}>{lang==="es"?cat.descEs:cat.descEn}</div>
              <div style={{fontSize:12, color:"rgba(255,255,255,0.65)"}}>{cat.count} {t.services}</div>
            </div>
            <div style={{position:"absolute", right:14, bottom:14, color:"#2563EB", fontSize:20}}>›</div>
          </div>
        ))}
      </div>
      {/* WhatsApp */}
      <WhatsAppButtons t={t} />
      {/* About CTA */}
      <div style={{padding:"14px 16px 0"}}>
        <div onClick={onAbout} style={{background:"#111", borderRadius:14, padding:"14px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", cursor:"pointer", marginBottom:8}}>
          <div>
            <div style={{color:"#2563EB", fontSize:13, fontWeight:800}}>ℹ️ ¿Cómo funciona ServiUY?</div>
            <div style={{color:"#aaa", fontSize:12, marginTop:2}}>Conoce más sobre la plataforma</div>
          </div>
          <span style={{color:"#2563EB", fontSize:20}}>→</span>
        </div>
      </div>
    </div>
  );
}

// ── CATEGORY PAGE ─────────────────────────────────────────────────────────────
function CategoryPage({ cat, lang, t, onBack, onProfile }) {
  const [filterE, setFE] = useState(false);
  const [filterN, setFN] = useState(false);
  const [search, setSearch] = useState("");
  const providers = PROVIDERS.filter(p => {
    if (p.serviceId !== cat.id) return false;
    if (filterE && !p.emergency) return false;
    if (filterN && !p.nocturnal) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });
  const chipStyle = (on) => ({ border:`1.5px solid ${on?"#2563EB":"#ddd"}`, borderRadius:20, padding:"6px 14px", fontSize:13, cursor:"pointer", background:on?"#EFF6FF":"#fff", fontWeight:on?700:400, display:"flex", alignItems:"center", gap:5 });
  return (
    <div style={{background:"#f5f5f7", minHeight:"100vh", paddingBottom:80}}>
      <PageHeader title={lang==="es"?cat.es:cat.en} onBack={onBack} />
      <div style={{padding:"10px 16px 6px", background:"#fff"}}>
        <div style={{display:"flex", alignItems:"center", gap:8, border:"1.5px solid #eee", borderRadius:12, padding:"10px 14px"}}>
          <span style={{fontSize:16, color:"#aaa"}}>🔍</span>
          <input style={{flex:1, border:"none", outline:"none", fontSize:15}} placeholder={t.searchPro} value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div style={{display:"flex", gap:8, padding:"10px 16px", background:"#fff", borderBottom:"1px solid #f0f0f0"}}>
        <button style={chipStyle(filterE)} onClick={() => setFE(f => !f)}>🚨 {t.filterEmergency}</button>
        <button style={chipStyle(filterN)} onClick={() => setFN(f => !f)}>🌙 {t.filterNocturnal}</button>
      </div>
      {providers.length === 0
        ? <div style={{textAlign:"center", color:"#aaa", padding:40}}>No hay profesionales con estos filtros.</div>
        : providers.map(p => <ProviderCard key={p.id} p={p} lang={lang} t={t} onProfile={onProfile} />)
      }
    </div>
  );
}

// ── MAP PAGE ──────────────────────────────────────────────────────────────────
function MapPage({ lang, t, onBack, onProfile }) {
  const pins = [{x:"30%",y:"35%"},{x:"55%",y:"22%"},{x:"68%",y:"40%"},{x:"75%",y:"55%"},{x:"22%",y:"58%"},{x:"45%",y:"65%"}];
  return (
    <div style={{background:"#f5f5f7", minHeight:"100vh", paddingBottom:80}}>
      <PageHeader title={t.mapView} onBack={onBack} />
      <div style={{background:"#e0e8f0", height:260, position:"relative", display:"flex", alignItems:"center", justifyContent:"center"}}>
        {pins.map((p,i) => <div key={i} style={{position:"absolute", left:p.x, top:p.y, fontSize:24, transform:"translateX(-50%)"}}>📍</div>)}
        <div style={{zIndex:2, textAlign:"center", background:"rgba(255,255,255,0.85)", borderRadius:12, padding:"10px 20px"}}>
          <div style={{fontSize:16, fontWeight:800}}>{pins.length} {t.profInArea}</div>
          <div style={{fontSize:11, color:"#888", marginTop:4}}>{t.mapNote}</div>
        </div>
      </div>
      <div style={{padding:"14px 16px 6px"}}>
        <div style={{fontSize:17, fontWeight:800, color:"#111", marginBottom:6}}>{t.professionalsNearby}</div>
        <div style={{display:"flex", gap:16, fontSize:13, color:"#555", marginBottom:10}}>
          <span>📍 {t.available}</span><span style={{color:"#d00"}}>📍 {t.emergency}</span>
        </div>
      </div>
      {PROVIDERS.slice(0,5).map(p => (
        <div key={p.id} style={{background:"#fff", borderRadius:14, margin:"6px 14px", padding:"14px", boxShadow:"0 1px 5px rgba(0,0,0,0.07)"}}>
          <div style={{display:"flex", gap:12, marginBottom:8}}>
            <div style={{width:46, height:46, background:"#e3eaf4", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22}}>👤</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:800, fontSize:15}}>{p.name}</div>
              <Stars rating={p.rating} />
              <div style={{fontSize:12, color:"#888"}}>📍 {p.kmAway} km</div>
            </div>
          </div>
          <button style={{width:"100%", background:"#f0f0f0", border:"none", borderRadius:10, padding:"10px 0", fontSize:14, fontWeight:700, cursor:"pointer", color:"#446"}} onClick={() => onProfile(p)}>
            {t.viewProfile}
          </button>
        </div>
      ))}
    </div>
  );
}

// ── PROFILE PAGE ──────────────────────────────────────────────────────────────
function ProfilePage({ provider, lang, t, onBack }) {
  const prices = lang==="es"
    ? [["Diagnóstico básico","$25–$40"],["Reparación estándar","$48–$80"],["Instalación completa","$120–$200"],["Servicio de emergencia","$80–$150"]]
    : [["Basic diagnosis","$25–$40"],["Standard repair","$48–$80"],["Full installation","$120–$200"],["Emergency service","$80–$150"]];
  return (
    <div style={{background:"#f5f5f7", minHeight:"100vh", paddingBottom:100}}>
      <PageHeader title={t.profile} onBack={onBack} right={<span style={{fontSize:22, color:"#f06", cursor:"pointer"}}>♡</span>} />
      <div style={{background:"#fff", padding:"20px 16px", display:"flex", flexDirection:"column", alignItems:"center", borderBottom:"1px solid #eee"}}>
        <div style={{width:90, height:90, background:"#e3eaf4", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:44, marginBottom:12, position:"relative"}}>
          👤
          <div style={{position:"absolute", bottom:2, right:2, background:"#f00", borderRadius:"50%", width:20, height:20, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:"#fff", fontWeight:800}}>!</div>
        </div>
        <div style={{fontSize:22, fontWeight:800, color:"#111", textAlign:"center", marginBottom:8}}>{provider.name}</div>
        <Stars rating={provider.rating} big />
        <div style={{fontSize:14, color:"#888", marginBottom:10}}>{provider.rating} ({provider.reviews} {t.reviews})</div>
        <p style={{fontSize:14, color:"#666", textAlign:"center", lineHeight:1.6, marginBottom:12}}>{lang==="es"?provider.desc:provider.descEn}</p>
        <div style={{display:"flex", gap:20, justifyContent:"center", marginBottom:10}}>
          <span style={{fontSize:14, color:"#444"}}>💼 {provider.years} {t.yearsExp}</span>
          <span style={{fontSize:14, color:"#444"}}>💵 ${provider.price}{t.perHour}</span>
          <span style={{fontSize:14, color:"#444"}}>📍 {provider.city}</span>
        </div>
        <div style={{display:"flex", gap:6, flexWrap:"wrap", justifyContent:"center"}}>
          {provider.emergency && <span style={{background:"#fff0f0", color:"#d00", borderRadius:20, padding:"4px 12px", fontSize:12}}>🚨 {t.emergencies}</span>}
          {provider.nocturnal  && <span style={{background:"#f0f0ff", color:"#446", borderRadius:20, padding:"4px 12px", fontSize:12}}>🌙 {t.nocturnal} (+$70)</span>}
        </div>
      </div>
      <div style={{background:"#fff", margin:"10px 14px", borderRadius:14, padding:"14px"}}>
        <div style={{fontSize:16, fontWeight:800, marginBottom:4}}>{t.estimatedPrices}</div>
        <div style={{fontSize:12, color:"#999", marginBottom:10}}>{t.priceNote}</div>
        {prices.map(([label,price],i) => (
          <div key={i} style={{display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:"1px solid #f5f5f5", fontSize:14}}>
            <span>{label}</span><span style={{fontWeight:700, color:"#2a7a2a"}}>{price}</span>
          </div>
        ))}
      </div>
      <div style={{position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, padding:"12px 16px 20px", background:"#fff", borderTop:"1px solid #eee"}}>
        <button style={{background:"#2563EB", border:"none", borderRadius:12, padding:"15px 0", width:"100%", fontSize:16, fontWeight:800, cursor:"pointer", color:"#fff"}}>{t.bookService}</button>
      </div>
    </div>
  );
}

// ── SEARCH PAGE ───────────────────────────────────────────────────────────────
function SearchPage({ lang, t, onBack, onProfile }) {
  const [dept, setDept] = useState("");
  const [service, setService] = useState("");
  const [radius, setRadius] = useState(20);
  const [results, setResults] = useState(null);
  const sel = { width:"100%", border:"1.5px solid #ddd", borderRadius:10, padding:"11px 13px", fontSize:14, background:"#fff", color:"#111", outline:"none", boxSizing:"border-box" };
  const doSearch = () => {
    let r = PROVIDERS;
    if (dept) r = r.filter(p => p.dept === dept);
    if (service) r = r.filter(p => p.serviceId === service);
    setResults(r);
  };
  return (
    <div style={{background:"#f5f5f7", minHeight:"100vh", paddingBottom:80}}>
      <PageHeader title={t.searchBtn} onBack={onBack} />
      <div style={{padding:"16px", display:"flex", flexDirection:"column", gap:10}}>
        <select style={sel} value={dept} onChange={e => setDept(e.target.value)}>
          <option value="">{t.allDepts}</option>
          {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select style={sel} value={service} onChange={e => setService(e.target.value)}>
          <option value="">{t.allServices}</option>
          {CATEGORIES.map(c => <option key={c.id} value={c.id}>{lang==="es"?c.es:c.en}</option>)}
        </select>
        <div style={{display:"flex", alignItems:"center", gap:10}}>
          <span style={{fontSize:13, color:"#555", whiteSpace:"nowrap"}}>{t.radius}: <strong>{radius} km</strong></span>
          <input type="range" min={5} max={100} step={5} value={radius} onChange={e => setRadius(Number(e.target.value))} style={{flex:1, accentColor:"#2563EB"}} />
        </div>
        <button onClick={doSearch} style={{background:"#2563EB", border:"none", borderRadius:10, padding:"13px 0", fontSize:15, fontWeight:800, cursor:"pointer", color:"#fff"}}>{t.searchBtn} 🔍</button>
      </div>
      {results !== null && (
        results.length === 0
          ? <div style={{textAlign:"center", color:"#aaa", padding:40}}>No se encontraron profesionales.</div>
          : results.map(p => <ProviderCard key={p.id} p={p} lang={lang} t={t} onProfile={onProfile} />)
      )}
    </div>
  );
}

// ── BOTTOM NAV ────────────────────────────────────────────────────────────────
function BottomNav({ tab, setTab, t, onHome, onMap, onSearch, onProfile }) {
  const items = [
    { id:"home",    icon:"🏠", label:t.home },
    { id:"search",  icon:"🔍", label:t.searchBtn },
    { id:"map",     icon:"🗺️", label:"Mapa" },
    { id:"messages",icon:"💬", label:t.messages },
    { id:"profile", icon:"👤", label:t.profile },
  ];
  const handle = (id) => {
    setTab(id);
    if (id==="home") onHome();
    else if (id==="map") onMap();
    else if (id==="search") onSearch();
    else if (id==="profile") onProfile();
  };
  return (
    <div style={{position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:430, background:"#fff", borderTop:"1px solid #eee", display:"flex", justifyContent:"space-around", padding:"10px 0 14px", zIndex:100}}>
      {items.map(item => (
        <div key={item.id} onClick={() => handle(item.id)} style={{display:"flex", flexDirection:"column", alignItems:"center", gap:3, cursor:"pointer", flex:1}}>
          <span style={{fontSize:22}}>{item.icon}</span>
          <span style={{fontSize:10, color:tab===item.id?"#2563EB":"#999", fontWeight:tab===item.id?800:400}}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang]           = useState("es");
  const [authPage, setAuthPage]   = useState(null); // null | "login" | "signup"
  const [user, setUser]           = useState(null);
  const [page, setPage]           = useState("home");
  const [selectedCat, setCat]     = useState(null);
  const [selectedProv, setProv]   = useState(null);
  const [prevPage, setPrev]       = useState("home");
  const [navTab, setNavTab]       = useState("home");
  const t = T[lang];

  const go = (p) => { setPrev(page); setPage(p); };
  const goBack = () => setPage(prevPage || "home");

  // Auth handlers
  const handleLogin   = (u) => { setUser(u); setAuthPage(null); };
  const handleSignup  = (u) => { setUser(u); setAuthPage(null); };
  const handleLogout  = () => { setUser(null); setPage("home"); };

  // Auth screens take over full app
  if (authPage === "login")  return <LoginPage  t={t} onLogin={handleLogin}  onRegister={() => setAuthPage("signup")} />;
  if (authPage === "signup") return <SignupPage t={t} onSignup={handleSignup} onLogin={() => setAuthPage("login")} />;

  return (
    <div style={{minHeight:"100vh", background:"#f0f4f8"}}>
      <GlobalStyles />

      {/* ── DESKTOP NAVBAR ── */}
      <nav className="desk-nav">
        <div style={{display:"flex", alignItems:"center", gap:12}}>
          <Logo size={36} />
          <span style={{fontSize:20, fontWeight:900, color:"#fff", letterSpacing:1}}>ServiUY</span>
        </div>
        <div className="desk-nav-links">
          <span className="desk-nav-link" onClick={() => { setPage("home"); setNavTab("home"); }}>Inicio</span>
          <span className="desk-nav-link" onClick={() => go("about")}>¿Cómo funciona?</span>
          <span className="desk-nav-link" onClick={() => go("search")}>Buscar</span>
          <span className="desk-nav-link" onClick={() => go("map")}>Mapa</span>
          <button className="desk-nav-btn" onClick={() => user ? go("dashboard") : setAuthPage("login")}>
            {user ? `👤 ${user.name}` : "Iniciar sesión"}
          </button>
          <button onClick={() => setLang(l => l==="es"?"en":"es")} style={{background:"rgba(255,255,255,0.1)", border:"none", borderRadius:20, padding:"6px 14px", cursor:"pointer", color:"#fff", fontSize:13, fontWeight:700}}>
            {lang==="es" ? "🇺🇸 EN" : "🇺🇾 ES"}
          </button>
        </div>
      </nav>

      {/* ── DESKTOP HERO ── */}
      {page === "home" && (
        <div className="desk-hero">
          <div style={{display:"flex", justifyContent:"center", marginBottom:20}}><Logo size={64} /></div>
          <h1>{lang==="es" ? "Encuentra profesionales de confianza en Uruguay" : "Find trusted professionals in Uruguay"}</h1>
          <p>{lang==="es" ? "Fontaneros, electricistas, jardineros, mecánicos y más — cerca tuyo" : "Plumbers, electricians, gardeners, mechanics and more — near you"}</p>
          <div className="desk-hero-search">
            <input placeholder={t.search} />
            <button onClick={() => go("search")}>{lang==="es" ? "Buscar" : "Search"} 🔍</button>
          </div>
          <div style={{display:"flex", gap:32, justifyContent:"center", marginTop:40, flexWrap:"wrap"}}>
            {["✅ Gratis para clientes","🔧 +500 profesionales","⭐ Reseñas verificadas","📍 Todo Uruguay"].map((b,i) => (
              <span key={i} style={{color:"rgba(255,255,255,0.85)", fontSize:14}}>{b}</span>
            ))}
          </div>
        </div>
      )}

      {/* ── DESKTOP GRID (home only) ── */}
      {page === "home" && (
        <div className="desk-grid">
          <div className="desk-grid-title">{t.serviceCategories}</div>
          <div className="desk-grid-sub">{t.selectService}</div>
          <div className="desk-cat-grid">
            {CATEGORIES.map(cat => (
              <div key={cat.id} className="desk-cat-card" style={{backgroundImage:`url(${cat.bg})`}} onClick={() => { setCat(cat); go("category"); }}>
                <div className="desk-cat-overlay">
                  <div style={{fontSize:28, marginBottom:6}}>{cat.icon}</div>
                  <div className="desk-cat-name">{lang==="es"?cat.es:cat.en}</div>
                  <div className="desk-cat-desc">{lang==="es"?cat.descEs:cat.descEn}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop featured providers */}
          <div className="desk-grid-title" style={{marginBottom:6}}>{lang==="es" ? "Profesionales Destacados" : "Featured Professionals"}</div>
          <div className="desk-grid-sub" style={{marginBottom:20}}>{lang==="es" ? "Los mejor calificados cerca tuyo" : "Top rated near you"}</div>
          <div className="desk-prov-grid">
            {PROVIDERS.slice(0,6).map(p => (
              <div key={p.id} className="desk-prov-card" onClick={() => { setProv(p); go("profile"); }}>
                <div style={{display:"flex", gap:12, marginBottom:12, alignItems:"flex-start"}}>
                  <div style={{width:50, height:50, background:"#e3eaf4", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0}}>👤</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:800, fontSize:15, color:"#111", marginBottom:2}}>{p.name}</div>
                    <div style={{display:"flex", gap:2}}>{[1,2,3,4,5].map(i => <span key={i} style={{color:"#f5a623", fontSize:13}}>{i<=Math.round(p.rating)?"★":"☆"}</span>)}</div>
                    <div style={{fontSize:12, color:"#888"}}>{p.rating} ({p.reviews} {t.reviews})</div>
                  </div>
                  <div style={{fontWeight:800, color:"#2563EB", fontSize:14}}>${p.price}{t.perHour}</div>
                </div>
                <div style={{fontSize:13, color:"#666", lineHeight:1.5, marginBottom:10}}>{lang==="es"?p.desc:p.descEn}</div>
                <div style={{display:"flex", gap:6, flexWrap:"wrap", marginBottom:12}}>
                  {p.emergency && <span style={{background:"#fff0f0", color:"#d00", borderRadius:20, padding:"3px 10px", fontSize:11}}>🚨 {t.emergencies}</span>}
                  {p.nocturnal  && <span style={{background:"#f0f0ff", color:"#446", borderRadius:20, padding:"3px 10px", fontSize:11}}>🌙 {t.nocturnal}</span>}
                </div>
                <button onClick={(e) => { e.stopPropagation(); setProv(p); go("profile"); }} style={{width:"100%", background:"#2563EB", border:"none", borderRadius:10, padding:"10px 0", fontSize:14, fontWeight:700, cursor:"pointer", color:"#fff"}}>
                  {t.viewProfile}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── DESKTOP WA SECTION ── */}
      {page === "home" && (
        <div className="desk-wa-section">
          <div style={{fontSize:13, fontWeight:800, color:"#2563EB", letterSpacing:2, marginBottom:8}}>CONTACTO</div>
          <div style={{fontSize:32, fontWeight:800, color:"#fff", marginBottom:8}}>{t.waSectionTitle}</div>
          <div style={{fontSize:16, color:"#93C5FD"}}>{t.waSectionSub}</div>
          <div className="desk-wa-btns">
            <button onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t.waProviderMsg)}`,"_blank")} style={{background:"#25D366", border:"none", borderRadius:12, padding:"14px 28px", fontSize:15, fontWeight:800, cursor:"pointer", color:"#fff", display:"flex", alignItems:"center", gap:10}}>
              <WAIcon /> 🔧 {t.waProviderBtn}
            </button>
            <button onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t.waCustomerMsg)}`,"_blank")} style={{background:"rgba(255,255,255,0.1)", border:"2px solid rgba(255,255,255,0.3)", borderRadius:12, padding:"14px 28px", fontSize:15, fontWeight:800, cursor:"pointer", color:"#fff", display:"flex", alignItems:"center", gap:10}}>
              <WAIcon color="#fff" /> ❓ {t.waCustomerBtn}
            </button>
          </div>
        </div>
      )}

      {/* ── DESKTOP FOOTER ── */}
      {page === "home" && (
        <div className="desk-footer">
          <div style={{fontSize:18, fontWeight:800, color:"#fff", marginBottom:8}}>ServiUY</div>
          <div style={{marginBottom:16}}>Conectando uruguayos con profesionales de confianza</div>
          <div style={{display:"flex", gap:24, justifyContent:"center", marginBottom:16}}>
            <span style={{cursor:"pointer", color:"#2563EB"}} onClick={() => go("about")}>¿Cómo funciona?</span>
            <span style={{cursor:"pointer", color:"#2563EB"}} onClick={() => go("search")}>Buscar</span>
            <span style={{cursor:"pointer", color:"#2563EB"}} onClick={() => setAuthPage("login")}>Registrarse</span>
          </div>
          <div>© 2026 ServiUY · Todos los derechos reservados</div>
        </div>
      )}

      {/* ── MOBILE WRAPPER ── */}
      <div style={{maxWidth:430, margin:"0 auto", position:"relative", background:"#f5f5f7", minHeight:"100vh"}}>

      {/* Lang toggle — fixed top right on all pages */}
      <div style={{position:"fixed", top:12, right:12, zIndex:300}}>
        <button onClick={() => setLang(l => l==="es"?"en":"es")} style={{background:"#1E3A5F", border:"none", borderRadius:20, padding:"5px 11px", cursor:"pointer", color:"#fff", fontSize:12, fontWeight:700}}>
          {lang==="es" ? "🇺🇸 EN" : "🇺🇾 ES"}
        </button>
      </div>

      {/* Pages */}
      {page==="home"      && <HomePage      lang={lang} t={t} user={user} onCategory={cat=>{setCat(cat); go("category");}} onMap={()=>go("map")} onAbout={()=>go("about")} onDashboard={()=>go("dashboard")} />}
      {page==="category"  && selectedCat && <CategoryPage cat={selectedCat} lang={lang} t={t} onBack={()=>setPage("home")} onProfile={p=>{setProv(p); go("profile");}} />}
      {page==="map"       && <MapPage       lang={lang} t={t} onBack={()=>setPage("home")} onProfile={p=>{setProv(p); go("profile");}} />}
      {page==="profile"   && selectedProv && <ProfilePage provider={selectedProv} lang={lang} t={t} onBack={goBack} />}
      {page==="search"    && <SearchPage    lang={lang} t={t} onBack={()=>setPage("home")} onProfile={p=>{setProv(p); go("profile");}} />}
      {page==="about"     && <AboutPage     t={t} onBack={()=>setPage("home")} onRegisterProvider={()=>window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t.waProviderMsg)}`,"_blank")} />}
      {page==="dashboard" && <DashboardPage t={t} user={user} onBack={()=>setPage("home")} onLogout={handleLogout} />}

      {/* Bottom nav — hide on profile */}
      {page !== "profile" && (
        <BottomNav
          tab={navTab} setTab={setNavTab} t={t}
          onHome={()=>{ setPage("home"); setNavTab("home"); }}
          onMap={()=>{ setPage("map"); setNavTab("map"); }}
          onSearch={()=>{ setPage("search"); setNavTab("search"); }}
          onProfile={()=>{ if (user) { setPage("dashboard"); setNavTab("profile"); } else setAuthPage("login"); }}
        />
      )}
    </div>
  );
}
