import { useState } from "react";

const WA_NUMBER = "598095300356";
const HS_PORTAL_ID = "51607770";
const HS_FORM_ID   = "494bb540-a871-49db-bf42-c1dfeee6e5c5";

async function submitToHubSpot(form, refCode) {
  const [firstName, ...rest] = form.fullName.trim().split(" ");
  const lastName = rest.join(" ") || "-";
  const fields = [
    { name: "firstname",   value: firstName },
    { name: "lastname",    value: lastName },
    { name: "email",       value: form.email },
    { name: "phone",       value: form.phone },
    { name: "message",     value: `[ServiUY REGISTRO] Categoría: ${form.category} | Departamento: ${form.department} | Ciudad: ${form.city} | Experiencia: ${form.experience} años | Emergencias: ${form.emergency} | Nocturno: ${form.nocturnal} | Ref: ${refCode} | Descripción: ${form.description}` },
  ];
  const payload = {
    fields,
    context: { pageUri: "https://serviuy.uy/registro", pageName: "ServiUY Registro Profesional" },
  };
  const res = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/submit/${HS_PORTAL_ID}/${HS_FORM_ID}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }
  );
  return res.ok;
}

const DEPARTMENTS_CITIES = {
  "Montevideo": ["Montevideo Centro","Ciudad Vieja","Pocitos","Punta Carretas","Carrasco","Buceo","Malvín","Prado","Cerro","La Teja","Paso Molino","Palermo","Parque Batlle","Jacinto Vera","Aguada"],
  "Canelones": ["Las Piedras","Canelones","Pando","La Paz","Progreso","Santa Lucía","San Jacinto","Sauce","Atlántida","Salinas","La Floresta","Ciudad de la Costa","Barros Blancos","Toledo","Migues"],
  "Maldonado": ["Punta del Este","Maldonado","San Carlos","Piriápolis","Pan de Azúcar","Aiguá","Garzón","José Ignacio","La Barra","Manantiales"],
  "Rocha": ["Rocha","Chuy","La Paloma","Lascano","Castillos","Velázquez","La Pedrera","Punta del Diablo","Aguas Dulces"],
  "Treinta y Tres": ["Treinta y Tres","Vergara","Cerro Chato","Santa Clara de Olimar","Río Branco"],
  "Cerro Largo": ["Melo","Río Branco","Aceguá","Fraile Muerto","Isidoro Noblía","Tupambaé"],
  "Rivera": ["Rivera","Tranqueras","Vichadero","Minas de Corrales","La Pedrera"],
  "Artigas": ["Artigas","Bella Unión","Tomás Gomensoro","Baltasar Brum","Cuareim"],
  "Salto": ["Salto","Constitución","Belén","Colonia Lavalleja","San Antonio","Termas del Arapey","Termas de Daymán"],
  "Paysandú": ["Paysandú","Guichón","Quebracho","Chapicuy","Tambores","Piedras Coloradas","Lorenzo Geyres"],
  "Río Negro": ["Fray Bentos","Young","Nuevo Berlín","San Javier","Algorta","Grecco"],
  "Soriano": ["Mercedes","Dolores","Cardona","José Enrique Rodó","Palmitas","Villanueva","Santa Catalina"],
  "Colonia": ["Colonia del Sacramento","Carmelo","Nueva Helvecia","Rosario","Juan Lacaze","Tarariras","Conchillas","Nueva Palmira","Florencio Sánchez"],
  "San José": ["San José de Mayo","Ciudad del Plata","Libertad","Ecilda Paullier","Rodríguez","Puntas de Valdéz","Capurro"],
  "Flores": ["Trinidad","Ismael Cortinas","Andresito","Cerro Colorado"],
  "Florida": ["Florida","Sarandí Grande","Casupá","Fray Marcos","Nico Pérez","Cerro Colorado","Mendoza"],
  "Lavalleja": ["Minas","José Pedro Varela","Pirarajá","Solís de Mataojo","Mariscala","Batlle y Ordóñez"],
  "Durazno": ["Durazno","Sarandí del Yí","Carmen","La Paloma","Blanquillo","Carlos Reyles","Villa del Carmen"],
  "Tacuarembó": ["Tacuarembó","Paso de los Toros","San Gregorio de Polanco","Curtina","Ansina","Tambores","Pueblo Centenario"],
};

const DEPARTMENTS = Object.keys(DEPARTMENTS_CITIES);

const CATEGORIES = [
  { id:"construccion", label:"Construcción" },
  { id:"fontaneria",   label:"Fontanería" },
  { id:"electricidad", label:"Electricidad" },
  { id:"jardineria",   label:"Jardinería" },
  { id:"piscinas",     label:"Piscinas" },
  { id:"mecanica",     label:"Mecánica" },
  { id:"grua",         label:"Grúa / Remolque" },
  { id:"limpieza",     label:"Limpieza" },
  { id:"pintura",      label:"Pintura" },
  { id:"techado",      label:"Techado" },
];

const BANK_INFO = {
  bank: "BROU (Banco República)",
  account: "001-XXXXXX-X",
  holder: "ServiUY UY S.A.",
};

const S = {
  app:        { fontFamily:"'Inter','Segoe UI',sans-serif", background:"#f5f5f7", minHeight:"100vh", maxWidth:430, margin:"0 auto" },
  header:     { background:"#1E3A5F", padding:"18px 16px 16px", position:"relative" },
  logoRow:    { display:"flex", alignItems:"center", gap:10, marginBottom:8 },
  logoBox:    { width:38, height:38, background:"#111", borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 },
  logoText:   { fontSize:10, fontWeight:800, letterSpacing:2, color:"#111" },
  headerTitle:{ fontSize:21, fontWeight:800, color:"#111", lineHeight:1.2 },
  headerSub:  { fontSize:13, color:"#333", marginTop:2 },
  priceBanner:{ background:"#1E3A5F", padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" },
  priceAmount:{ fontSize:20, fontWeight:800, color:"#2563EB" },
  priceNote:  { fontSize:12, color:"#aaa" },
  benefitsBox:{ background:"#fff", padding:"12px 16px", borderBottom:"1px solid #eee" },
  benefitItem:{ fontSize:13, color:"#444", marginBottom:4 },
  progressWrap:{ padding:"16px 16px 0", background:"#fff" },
  stepsRow:   { display:"flex", alignItems:"flex-start" },
  stepItem:   { display:"flex", flexDirection:"column", alignItems:"center", gap:4, flex:1 },
  stepLine:   (done) => ({ flex:1, height:2, background:done?"#2563EB":"#eee", marginTop:13, alignSelf:"flex-start" }),
  stepCircle: (active, done) => ({
    width:28, height:28, borderRadius:"50%",
    background: done?"#2563EB": active?"#111":"#eee",
    color:       done?"#111":  active?"#2563EB":"#aaa",
    display:"flex", alignItems:"center", justifyContent:"center",
    fontSize:13, fontWeight:800,
  }),
  stepLabel:  (active) => ({ fontSize:10, color:active?"#111":"#aaa", fontWeight:active?700:400, textAlign:"center" }),
  formWrap:   { padding:"16px" },
  sectionTitle:{ fontSize:17, fontWeight:800, color:"#111", marginBottom:14 },
  fieldGroup: { marginBottom:14 },
  label:      { fontSize:13, fontWeight:600, color:"#444", marginBottom:5, display:"block" },
  input:      { width:"100%", border:"1.5px solid #ddd", borderRadius:10, padding:"11px 13px", fontSize:14, background:"#fff", color:"#111", outline:"none", boxSizing:"border-box" },
  inputErr:   { width:"100%", border:"1.5px solid #f00", borderRadius:10, padding:"11px 13px", fontSize:14, background:"#fff", color:"#111", outline:"none", boxSizing:"border-box" },
  select:     { width:"100%", border:"1.5px solid #ddd", borderRadius:10, padding:"11px 13px", fontSize:14, background:"#fff", color:"#111", outline:"none", boxSizing:"border-box" },
  selectErr:  { width:"100%", border:"1.5px solid #f00", borderRadius:10, padding:"11px 13px", fontSize:14, background:"#fff", color:"#111", outline:"none", boxSizing:"border-box" },
  textarea:   { width:"100%", border:"1.5px solid #ddd", borderRadius:10, padding:"11px 13px", fontSize:14, background:"#fff", color:"#111", outline:"none", boxSizing:"border-box", minHeight:90, resize:"vertical" },
  textareaErr:{ width:"100%", border:"1.5px solid #f00", borderRadius:10, padding:"11px 13px", fontSize:14, background:"#fff", color:"#111", outline:"none", boxSizing:"border-box", minHeight:90, resize:"vertical" },
  errorMsg:   { fontSize:12, color:"#d00", marginTop:4 },
  toggleRow:  { display:"flex", gap:8, marginTop:2 },
  toggleBtn:  (on) => ({ flex:1, padding:"10px 0", borderRadius:10, border:"1.5px solid", borderColor:on?"#2563EB":"#ddd", background:on?"#EFF6FF":"#fff", color:on?"#111":"#888", fontWeight:on?800:400, fontSize:14, cursor:"pointer" }),
  payBox:     { background:"#fff", borderRadius:14, padding:"16px", marginBottom:14, border:"2px solid #2563EB" },
  payTitle:   { fontSize:16, fontWeight:800, color:"#111", marginBottom:12 },
  payRow:     { display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:"1px solid #f5f5f5", fontSize:14 },
  payKey:     { color:"#888" },
  payVal:     { fontWeight:700, color:"#111" },
  payNote:    { fontSize:13, color:"#666", lineHeight:1.6, marginTop:10, background:"#f9f9f9", borderRadius:8, padding:"10px 12px" },
  uploadBox:  { border:"2px dashed #2563EB", borderRadius:12, padding:"20px", textAlign:"center", cursor:"pointer", background:"#EFF6FF", marginTop:8, display:"block" },
  uploadBoxErr:{ border:"2px dashed #f00", borderRadius:12, padding:"20px", textAlign:"center", cursor:"pointer", background:"#fff5f5", marginTop:8, display:"block" },
  navRow:     { display:"flex", gap:10, paddingBottom:20 },
  backBtn:    { flex:1, background:"#eee", border:"none", borderRadius:12, padding:"13px 0", fontSize:14, fontWeight:700, cursor:"pointer", color:"#555" },
  nextBtn:    { flex:2, background:"#2563EB", border:"none", borderRadius:12, padding:"13px 0", fontSize:15, fontWeight:800, cursor:"pointer", color:"#fff" },
  submitBtn:  { flex:2, background:"#111", border:"none", borderRadius:12, padding:"13px 0", fontSize:15, fontWeight:800, cursor:"pointer", color:"#2563EB" },
  waBox:      { background:"#e8f5e9", borderRadius:12, padding:"14px", marginBottom:14, textAlign:"center" },
  waBtn:      { background:"#25D366", border:"none", borderRadius:10, padding:"12px 20px", fontSize:14, fontWeight:800, cursor:"pointer", color:"#fff", display:"inline-flex", alignItems:"center", gap:8 },
  successPage:{ padding:"40px 24px", textAlign:"center", minHeight:"100vh" },
  successIcon:{ fontSize:72, marginBottom:16 },
  successTitle:{ fontSize:24, fontWeight:800, color:"#111", marginBottom:12 },
  successMsg: { fontSize:15, color:"#555", lineHeight:1.7, marginBottom:12 },
  successWA:  { fontSize:14, color:"#2a7a2a", fontWeight:600, marginBottom:28, background:"#e8f5e9", borderRadius:10, padding:"10px 14px" },
  refBox:     { background:"#111", borderRadius:10, padding:"10px 16px", display:"inline-block", color:"#2563EB", fontWeight:800, fontSize:16, margin:"14px 0" },
  successBtn: { background:"#2563EB", border:"none", borderRadius:12, padding:"14px 32px", fontSize:16, fontWeight:800, cursor:"pointer", color:"#fff" },
};

const WA_ICON = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.11 1.523 5.832L.057 23.925a.75.75 0 00.918.918l6.093-1.466A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.5-5.24-1.375l-.373-.215-3.867.931.947-3.867-.229-.381A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

function StepIndicator({ step }) {
  const steps = ["Info Personal", "Tu Servicio", "Pago", "¡Listo!"];
  return (
    <div style={S.progressWrap}>
      <div style={S.stepsRow}>
        {steps.map((label, i) => (
          <div key={i} style={{display:"flex", alignItems:"flex-start", flex:1}}>
            <div style={S.stepItem}>
              <div style={S.stepCircle(i === step, i < step)}>
                {i < step ? "✓" : i + 1}
              </div>
              <span style={S.stepLabel(i === step)}>{label}</span>
            </div>
            {i < steps.length - 1 && <div style={S.stepLine(i < step)} />}
          </div>
        ))}
      </div>
      <div style={{height:14}} />
    </div>
  );
}

export default function RegistroForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [refCode] = useState("REG-" + Math.floor(10000 + Math.random() * 90000));

  const [form, setForm] = useState({
    fullName:"", email:"", phone:"",
    category:"", department:"", city:"",
    experience:"", description:"",
    emergency:"si", nocturnal:"no",
    receipt:null, receiptName:"",
  });
  const [errors, setErrors] = useState({});

  const set = (key, val) => {
    setForm(f => ({...f, [key]: val}));
    setErrors(e => ({...e, [key]: ""}));
  };

  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!form.fullName.trim()) e.fullName = "Este campo es requerido";
      if (!form.email.trim() || !form.email.includes("@")) e.email = "Ingresa un correo válido";
      if (!form.phone.trim() || form.phone.length < 8) e.phone = "Ingresa un teléfono válido";
    }
    if (step === 1) {
      if (!form.category) e.category = "Este campo es requerido";
      if (!form.department) e.department = "Este campo es requerido";
      if (!form.city) e.city = "Este campo es requerido";
      if (!form.description.trim()) e.description = "Este campo es requerido";
    }
    if (step === 2) {
      if (!form.receipt) e.receipt = "Debes subir el comprobante de pago";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);
  const [submitting, setSubmitting] = useState(false);
  const [hsError, setHsError]       = useState(false);

  const submit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setHsError(false);
    try {
      const ok = await submitToHubSpot(form, refCode);
      if (ok) {
        setSubmitted(true);
      } else {
        setHsError(true);
      }
    } catch (e) {
      setHsError(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) { set("receipt", file); set("receiptName", file.name); }
  };

  const openWA = () => {
    const msg = encodeURIComponent("Hola ServiUY, quiero registrarme como profesional y tengo algunas preguntas");
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank");
  };

  if (submitted) {
    return (
      <div style={S.app}>
        <div style={S.successPage}>
          <div style={S.successIcon}>🎉</div>
          <div style={S.successTitle}>¡Registro enviado!</div>
          <div style={S.refBox}>{refCode}</div>
          <p style={S.successMsg}>
            Gracias por registrarte en ServiUY. Revisaremos tu comprobante de pago
            y activaremos tu perfil dentro de las próximas 24 horas hábiles.
          </p>
          <div style={S.successWA}>📲 Te contactaremos por WhatsApp al número registrado.</div>
          <button style={S.successBtn} onClick={() => { setStep(0); setSubmitted(false); setForm({ fullName:"", email:"", phone:"", category:"", department:"", city:"", experience:"", description:"", emergency:"si", nocturnal:"no", receipt:null, receiptName:"" }); }}>
            Volver al inicio →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={S.app}>

      {/* Header */}
      <div style={S.header}>
        <div style={S.logoRow}>
          <div style={S.logoBox}>🤝</div>
          <span style={S.logoText}>ServiUY</span>
        </div>
        <div style={S.headerTitle}>Regístrate como Profesional</div>
        <div style={S.headerSub}>Llega a miles de clientes en Uruguay</div>
      </div>

      {/* Price Banner */}
      <div style={S.priceBanner}>
        <div>
          <div style={S.priceAmount}>UYU $2.000 / mes</div>
          <div style={S.priceNote}>Sin contratos. Cancela cuando quieras.</div>
        </div>
        <span style={{fontSize:28}}>💼</span>
      </div>

      {/* Benefits — step 0 only */}
      {step === 0 && (
        <div style={S.benefitsBox}>
          {["✅ Perfil visible para miles de usuarios","✅ Recibe reservas directamente","✅ Reseñas verificadas","✅ Soporte 24/7 vía WhatsApp"].map((b,i) => (
            <div key={i} style={S.benefitItem}>{b}</div>
          ))}
        </div>
      )}

      {/* Steps */}
      <StepIndicator step={step} />

      {/* Form */}
      <div style={S.formWrap}>

        {/* ── STEP 0 ── */}
        {step === 0 && (
          <>
            <div style={S.sectionTitle}>👤 Información Personal</div>

            <div style={S.fieldGroup}>
              <label style={S.label}>Nombre completo o Empresa *</label>
              <input style={errors.fullName ? S.inputErr : S.input}
                placeholder="Ej: Juan Pérez o Construcciones Pérez"
                value={form.fullName} onChange={e => set("fullName", e.target.value)} />
              {errors.fullName && <div style={S.errorMsg}>{errors.fullName}</div>}
            </div>

            <div style={S.fieldGroup}>
              <label style={S.label}>Correo electrónico *</label>
              <input style={errors.email ? S.inputErr : S.input}
                type="email" placeholder="tu@email.com"
                value={form.email} onChange={e => set("email", e.target.value)} />
              {errors.email && <div style={S.errorMsg}>{errors.email}</div>}
            </div>

            <div style={S.fieldGroup}>
              <label style={S.label}>Teléfono / WhatsApp *</label>
              <input style={errors.phone ? S.inputErr : S.input}
                type="tel" placeholder="+598 9X XXX XXX"
                value={form.phone} onChange={e => set("phone", e.target.value)} />
              {errors.phone && <div style={S.errorMsg}>{errors.phone}</div>}
            </div>

            <div style={S.navRow}>
              <button style={S.nextBtn} onClick={next}>Continuar →</button>
            </div>
          </>
        )}

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <>
            <div style={S.sectionTitle}>🔧 Tu Servicio</div>

            <div style={S.fieldGroup}>
              <label style={S.label}>Categoría de servicio *</label>
              <select style={errors.category ? S.selectErr : S.select}
                value={form.category} onChange={e => set("category", e.target.value)}>
                <option value="">Selecciona tu servicio</option>
                {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
              {errors.category && <div style={S.errorMsg}>{errors.category}</div>}
            </div>

            <div style={S.fieldGroup}>
              <label style={S.label}>Departamento *</label>
              <select style={errors.department ? S.selectErr : S.select}
                value={form.department}
                onChange={e => { set("department", e.target.value); set("city", ""); }}>
                <option value="">Selecciona departamento</option>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              {errors.department && <div style={S.errorMsg}>{errors.department}</div>}
            </div>

            <div style={S.fieldGroup}>
              <label style={S.label}>Ciudad / Localidad *</label>
              <select style={errors.city ? S.selectErr : S.select}
                value={form.city} onChange={e => set("city", e.target.value)}
                disabled={!form.department}>
                <option value="">{form.department ? "Selecciona tu ciudad" : "Primero selecciona un departamento"}</option>
                {form.department && DEPARTMENTS_CITIES[form.department].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              {errors.city && <div style={S.errorMsg}>{errors.city}</div>}
            </div>

            <div style={S.fieldGroup}>
              <label style={S.label}>Años de experiencia</label>
              <input style={S.input} type="number" min="0" max="50"
                placeholder="Ej: 5"
                value={form.experience} onChange={e => set("experience", e.target.value)} />
            </div>

            <div style={S.fieldGroup}>
              <label style={S.label}>Descripción de tus servicios *</label>
              <textarea style={errors.description ? S.textareaErr : S.textarea}
                placeholder="Cuéntale a los clientes qué haces y por qué elegirte..."
                value={form.description} onChange={e => set("description", e.target.value)} />
              {errors.description && <div style={S.errorMsg}>{errors.description}</div>}
            </div>

            <div style={S.fieldGroup}>
              <label style={S.label}>¿Atiendes emergencias?</label>
              <div style={S.toggleRow}>
                <button style={S.toggleBtn(form.emergency === "si")} onClick={() => set("emergency","si")}>✅ Sí</button>
                <button style={S.toggleBtn(form.emergency === "no")} onClick={() => set("emergency","no")}>❌ No</button>
              </div>
            </div>

            <div style={S.fieldGroup}>
              <label style={S.label}>¿Trabajas en horario nocturno?</label>
              <div style={S.toggleRow}>
                <button style={S.toggleBtn(form.nocturnal === "si")} onClick={() => set("nocturnal","si")}>🌙 Sí</button>
                <button style={S.toggleBtn(form.nocturnal === "no")} onClick={() => set("nocturnal","no")}>❌ No</button>
              </div>
            </div>

            {/* WhatsApp help button */}
            <div style={S.waBox}>
              <div style={{fontSize:13, color:"#555", marginBottom:10}}>¿Tienes dudas antes de registrarte?</div>
              <button style={S.waBtn} onClick={openWA}>
                {WA_ICON} Hablar con ServiUY por WhatsApp
              </button>
            </div>

            <div style={S.navRow}>
              <button style={S.backBtn} onClick={back}>← Atrás</button>
              <button style={S.nextBtn} onClick={next}>Continuar →</button>
            </div>
          </>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <>
            <div style={S.sectionTitle}>💳 Pago</div>

            <div style={S.payBox}>
              <div style={S.payTitle}>Instrucciones de Pago</div>
              <div style={{display:"flex", justifyContent:"space-between", padding:"10px 0", fontSize:16}}>
                <span style={S.payKey}>Monto a transferir:</span>
                <span style={{fontWeight:800, fontSize:18, color:"#2563EB", background:"#111", borderRadius:8, padding:"4px 12px"}}>UYU $2.000</span>
              </div>
              <div style={S.payRow}><span style={S.payKey}>Banco:</span><span style={S.payVal}>{BANK_INFO.bank}</span></div>
              <div style={S.payRow}><span style={S.payKey}>Cuenta:</span><span style={S.payVal}>{BANK_INFO.account}</span></div>
              <div style={S.payRow}><span style={S.payKey}>Titular:</span><span style={S.payVal}>{BANK_INFO.holder}</span></div>
              <div style={S.payRow}>
                <span style={S.payKey}>Referencia:</span>
                <span style={{fontWeight:800, color:"#2563EB", background:"#111", borderRadius:6, padding:"2px 8px", fontSize:13}}>{refCode}</span>
              </div>
              <div style={S.payNote}>⚠️ Realiza la transferencia y sube el comprobante. Tu perfil será activado dentro de las 24 horas hábiles.</div>
            </div>

            <div style={S.fieldGroup}>
              <label style={S.label}>Subir comprobante de pago *</label>
              <label style={errors.receipt ? S.uploadBoxErr : S.uploadBox}>
                <input type="file" accept="image/*,application/pdf" style={{display:"none"}} onChange={handleFile} />
                <div style={{fontSize:32, marginBottom:6}}>📄</div>
                <span style={{fontSize:14, fontWeight:700, color:"#111", display:"block", marginBottom:4}}>📎 Seleccionar archivo</span>
                <span style={{fontSize:12, color:"#888"}}>JPG, PNG o PDF</span>
                {form.receiptName && (
                  <div style={{fontSize:13, color:"#2a7a2a", marginTop:8, fontWeight:600}}>✅ Archivo: {form.receiptName}</div>
                )}
              </label>
              {errors.receipt && <div style={S.errorMsg}>{errors.receipt}</div>}
            </div>

            <div style={S.navRow}>
              <button style={S.backBtn} onClick={back}>← Atrás</button>
              <button style={{...S.submitBtn, opacity: submitting ? 0.7 : 1}} onClick={submit} disabled={submitting}>
                {submitting ? "⏳ Enviando..." : "Enviar Registro →"}
              </button>
            </div>
            {hsError && (
              <div style={{background:"#fff0f0", border:"1.5px solid #f00", borderRadius:10, padding:"12px 14px", marginBottom:14, fontSize:13, color:"#d00"}}>
                ⚠️ Hubo un problema al enviar. Por favor intenta de nuevo o escríbenos por WhatsApp.
                <br/>
                <button onClick={()=>window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hola ServiUY, tuve problemas al registrarme en el formulario")}`, "_blank")}
                  style={{marginTop:8, background:"#25D366", border:"none", borderRadius:8, padding:"8px 14px", color:"#fff", fontWeight:700, cursor:"pointer", fontSize:13}}>
                  💬 Contactar por WhatsApp
                </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
