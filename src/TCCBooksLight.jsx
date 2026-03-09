import { useState, useRef, useEffect } from "react";

// ─── LIGHT MODE DESIGN TOKENS ─────────────────────────────────────────────
const C = {
  bg:           "#F7F3EE",
  bgCard:       "#FFFFFF",
  bgMuted:      "#F0EBE3",
  bgWarm:       "#EDE7DC",
  bgSoft:       "#FAF8F5",
  primary:      "#1D5E3A",
  primaryMid:   "#247A4C",
  primaryLight: "#2E9460",
  primaryPale:  "#D4EDE0",
  primaryFaint: "#EAF6EE",
  gold:         "#B8862A",
  goldLight:    "#D4A03C",
  goldPale:     "#FDF3DC",
  goldBorder:   "rgba(232,201,106,0.25)",
  text:         "#1A1A1A",
  textMid:      "#3D3D3D",
  textMuted:    "#7A7060",
  textLight:    "#A89E90",
  border:       "#E2D9CE",
  borderMid:    "#D0C5B8",
  success:      "#16A34A",
  warning:      "#D97706",
  danger:       "#DC2626",
  info:         "#2563EB",
  heroTop:      "#1A4F32",
  heroBot:      "#0F3321",
};

const F = {
  display: "'Playfair Display', Georgia, serif",
  body:    "'DM Sans', system-ui, sans-serif",
  mono:    "'JetBrains Mono', monospace",
};

const S_SM = "0 2px 8px rgba(0,0,0,0.07),0 0 0 1px rgba(0,0,0,0.04)";
const S_MD = "0 6px 24px rgba(0,0,0,0.10),0 1px 4px rgba(0,0,0,0.06)";
const S_LG = "0 16px 48px rgba(0,0,0,0.13),0 2px 8px rgba(0,0,0,0.07)";
const G_GREEN = "0 4px 20px rgba(29,94,58,0.22)";
const G_GOLD  = "0 4px 16px rgba(184,134,42,0.25)";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;}
::-webkit-scrollbar{width:0;}
input::placeholder{color:#5C6B63 !important;opacity:1 !important;}
textarea::placeholder{color:#5C6B63 !important;opacity:1 !important;}
input.white-search::placeholder{color:#6B7A72 !important;}
@keyframes fadeUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
@keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-7px);}}
@keyframes toastIn{from{opacity:0;transform:translateY(16px) scale(.96);}to{opacity:1;transform:translateY(0) scale(1);}}
@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.4;}}
.press:active{transform:scale(0.97);transition:transform .1s;}
.lift{transition:transform .2s ease,box-shadow .2s ease;}
.lift:hover{transform:translateY(-2px);}
`;

function Styles() { return <style>{CSS}</style>; }

// ─── STATUS BAR ──────────────────────────────────────────────────────────
function StatusBar() {
  const [t, setT] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setT(new Date()), 1000); return () => clearInterval(id); }, []);
  const h = t.getHours() % 12 || 12, m = String(t.getMinutes()).padStart(2, "0");
  return (
    <div style={{ background: C.heroTop, padding: "11px 22px 6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ color: "rgba(255,255,255,.9)", fontSize: 13, fontWeight: 700, fontFamily: F.mono }}>{h}:{m} <span style={{ fontSize: 10, opacity: .6 }}>{t.getHours() >= 12 ? "PM" : "AM"}</span></span>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <svg width="17" height="12" viewBox="0 0 17 12"><rect x="0" y="5" width="3" height="7" rx="1" fill="rgba(255,255,255,.5)"/><rect x="5" y="3" width="3" height="9" rx="1" fill="rgba(255,255,255,.7)"/><rect x="10" y="1" width="3" height="11" rx="1" fill="rgba(255,255,255,.9)"/><rect x="14" y="0" width="3" height="12" rx="1" fill="white"/></svg>
        <svg width="24" height="12" viewBox="0 0 24 12"><rect x=".5" y=".5" width="20" height="11" rx="3" stroke="rgba(255,255,255,.6)" strokeWidth="1"/><rect x="2" y="2" width="14" height="8" rx="1.5" fill="rgba(255,255,255,.9)"/><path d="M22 4v4a2 2 0 000-4z" fill="rgba(255,255,255,.5)"/></svg>
      </div>
    </div>
  );
}

// ─── HEADER ───────────────────────────────────────────────────────────────
function Header({ title, subtitle, back, onBack, right }) {
  return (
    <div style={{ background: C.bgCard, padding: "14px 18px", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
      {back && (
        <button onClick={onBack} className="press" style={{ width: 36, height: 36, background: C.bgMuted, border: `1px solid ${C.border}`, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 18 18"><path d="M11 14L6 9L11 4" stroke={C.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      )}
      <div style={{ flex: 1 }}>
        <div style={{ color: C.text, fontSize: 17, fontWeight: 700, fontFamily: F.display, letterSpacing: -.3 }}>{title}</div>
        {subtitle && <div style={{ color: C.textMuted, fontSize: 11, fontFamily: F.body, marginTop: 1 }}>{subtitle}</div>}
      </div>
      {right}
    </div>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────
function BottomNav({ active, onNav }) {
  const IC = "#5C6B63"; // visible dark grey-green for inactive icons
  const tabs = [
    { id: "feed",      label: "Feed",   icon: a => <svg width="22" height="22" viewBox="0 0 22 22"><path d="M3 9L11 2L19 9V19C19 19.55 18.55 20 18 20H14V14H8V20H4C3.45 20 3 19.55 3 19V9Z" fill={a ? C.primary : "none"} stroke={a ? C.primary : IC} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { id: "search",    label: "Search", icon: a => <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="10" cy="10" r="6.5" stroke={a ? C.primary : IC} strokeWidth="1.8"/><path d="M15 15L19 19" stroke={a ? C.primary : IC} strokeWidth="1.8" strokeLinecap="round"/></svg> },
    { id: "dashboard", label: "Shelf",  icon: a => <svg width="22" height="22" viewBox="0 0 22 22"><rect x="3" y="15" width="16" height="2" rx="1" fill={a ? C.primary : IC}/><rect x="5" y="5" width="3" height="10" rx="1" fill={a ? C.primary : IC}/><rect x="9.5" y="7" width="3" height="8" rx="1" fill={a ? C.primary : IC}/><rect x="14" y="4" width="3" height="11" rx="1" fill={a ? C.primary : IC}/></svg> },
    { id: "chatbot",   label: "Chat",   icon: a => <svg width="22" height="22" viewBox="0 0 22 22"><path d="M19 4H3C2.45 4 2 4.45 2 5V15C2 15.55 2.45 16 3 16H7L11 20L15 16H19C19.55 16 20 15.55 20 15V5C20 4.45 19.55 4 19 4Z" fill={a ? C.primary : "none"} stroke={a ? C.primary : IC} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="7.5" cy="10.5" r="1.2" fill={a ? "white" : IC}/><circle cx="11" cy="10.5" r="1.2" fill={a ? "white" : IC}/><circle cx="14.5" cy="10.5" r="1.2" fill={a ? "white" : IC}/></svg> },
    { id: "profile",   label: "Me",     icon: a => <svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="8" r="3.5" fill={a ? C.primary : "none"} stroke={a ? C.primary : IC} strokeWidth="1.8"/><path d="M4 19C4 15.69 7.13 13 11 13C14.87 13 18 15.69 18 19" stroke={a ? C.primary : IC} strokeWidth="1.8" strokeLinecap="round"/></svg> },
  ];
  return (
    <div style={{ background: C.bgCard, borderTop: `1.5px solid ${C.border}`, display: "flex", padding: "8px 0 20px", flexShrink: 0 }}>
      {tabs.map(t => {
        const a = active === t.id;
        return (
          <button key={t.id} onClick={() => onNav(t.id)} className="press" style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <div style={{ width: 44, height: 32, display: "flex", alignItems: "center", justifyContent: "center", background: a ? C.primaryFaint : "transparent", borderRadius: 12, transition: "all .2s" }}>{t.icon(a)}</div>
            <span style={{ fontSize: 9.5, fontFamily: F.body, fontWeight: a ? 700 : 500, color: a ? C.primary : IC, letterSpacing: .3 }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ─── BOOK COVER ───────────────────────────────────────────────────────────
function BookCover({ title = "", emoji = "📖", size = 60, height = 86 }) {
  const palettes = [["#1D5E3A","#2E9460"],["#1A4A70","#2171B5"],["#6B2D8B","#9B59B6"],["#8B3A3A","#C0392B"],["#5A4A1A","#B8860B"],["#1A5E5E","#2E9494"]];
  const [a, b] = palettes[Math.abs(title.charCodeAt(0) || 0) % palettes.length];
  return (
    <div style={{ width: size, height, background: `linear-gradient(150deg,${a},${b})`, borderRadius: 9, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * .44, position: "relative", overflow: "hidden", boxShadow: "3px 4px 14px rgba(0,0,0,0.22),-2px 0 6px rgba(0,0,0,0.15)" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 5, background: "rgba(0,0,0,0.25)", borderRadius: "9px 0 0 9px" }}/>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(130deg,rgba(255,255,255,.14) 0%,transparent 55%)" }}/>
      <span style={{ position: "relative", zIndex: 1 }}>{emoji}</span>
    </div>
  );
}

// ─── STATUS BADGE ─────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const cfg = { Available: { bg:"#D4EDE0",color:"#166534",dot:"#16A34A" }, Borrowed: { bg:"#FEF3C7",color:"#92400E",dot:"#D97706" }, Gifted: { bg:"#DBEAFE",color:"#1E40AF",dot:"#2563EB" }, Sold: { bg:"#FEE2E2",color:"#991B1B",dot:"#DC2626" } };
  const s = cfg[status] || cfg.Available;
  return <span style={{ background: s.bg, color: s.color, fontSize: 10, padding: "3px 10px", borderRadius: 20, fontFamily: F.body, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: 4 }}><span style={{ width: 5, height: 5, background: s.dot, borderRadius: "50%", display: "inline-block" }}/>{status}</span>;
}

// ─── BOOK CARD ────────────────────────────────────────────────────────────
function BookCard({ book, onPress, onFav, isFav }) {
  const emos = {"The Alchemist":"🏜️","Atomic Habits":"⚡","Sapiens":"🦴","Dune":"🌙","The Midnight Library":"🌌","Educated":"🎓","The Kite Runner":"🪁","1984":"👁️","Pride and Prejudice":"💐","Brave New World":"🧬"};
  return (
    <div onClick={() => onPress(book)} className="press lift" style={{ background: C.bgCard, borderRadius: 18, padding: "14px 14px", display: "flex", gap: 13, boxShadow: S_SM, cursor: "pointer", border: `1px solid ${C.border}`, marginBottom: 10 }}>
      <BookCover title={book.title} emoji={emos[book.title] || "📖"} size={56} height={80}/>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14.5, color: C.text, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: F.display }}>{book.title}</div>
          <div style={{ fontSize: 12, color: C.textMuted, fontFamily: F.body, marginBottom: 8 }}>by {book.author}</div>
        </div>
        <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ background: C.primaryFaint, color: C.primary, fontSize: 10, padding: "3px 9px", borderRadius: 20, fontFamily: F.body, fontWeight: 600 }}>{book.genre}</span>
          <StatusBadge status={book.status}/>
        </div>
      </div>
      {onFav && <button onClick={e => { e.stopPropagation(); onFav(book.id); }} className="press" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 19, padding: "4px 2px", color: isFav ? "#E74C3C" : C.textLight, flexShrink: 0, alignSelf: "center", transition: "color .2s" }}>{isFav ? "❤️" : "🤍"}</button>}
    </div>
  );
}

// ─── INPUT ────────────────────────────────────────────────────────────────
function GInput({ label, placeholder, type = "text", value, onChange, icon }) {
  const [foc, setFoc] = useState(false);
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <div style={{ fontSize: 11, color: C.textMid, fontFamily: F.body, marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: .9 }}>{label}</div>}
      <div style={{ position: "relative" }}>
        {icon && <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", fontSize: 16, lineHeight: 1 }}>{icon}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={e => onChange && onChange(e.target.value)}
          onFocus={() => setFoc(true)}
          onBlur={() => setFoc(false)}
          style={{ width: "100%", background: foc ? "#FFFFFF" : C.bgMuted, border: `2px solid ${foc ? C.primary : C.borderMid}`, borderRadius: 14, padding: icon ? "13px 16px 13px 44px" : "13px 16px", fontSize: 14, color: C.text, fontFamily: F.body, outline: "none", boxSizing: "border-box", transition: "all .2s", boxShadow: foc ? `0 0 0 3px ${C.primaryPale}` : "none" }}
        />
      </div>
    </div>
  );
}

// ─── BUTTON ───────────────────────────────────────────────────────────────
function Btn({ label, variant = "primary", icon, onClick, disabled, small }) {
  const v = ({
    primary: { background: `linear-gradient(135deg,${C.primary},${C.primaryMid})`, color: "white", border: "none", shadow: G_GREEN },
    gold:    { background: `linear-gradient(135deg,${C.gold},${C.goldLight})`,     color: "white", border: "none", shadow: G_GOLD  },
    outline: { background: "transparent", color: C.primary, border: `1.8px solid ${C.primary}`, shadow: "none" },
    ghost:   { background: C.bgMuted,     color: C.textMid, border: `1px solid ${C.border}`,   shadow: "none" },
    danger:  { background: `linear-gradient(135deg,#DC2626,#EF4444)`, color: "white", border: "none", shadow: "none" },
  })[variant] || {};
  return (
    <button onClick={!disabled ? onClick : undefined} className="press" style={{ ...v, borderRadius: 15, padding: small ? "10px 18px" : "15px 20px", fontFamily: F.body, fontWeight: 700, fontSize: small ? 13 : 15, cursor: disabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10, width: "100%", opacity: disabled ? .4 : 1, transition: "all .2s", boxShadow: disabled ? "none" : v.shadow, letterSpacing: .2 }}>
      {icon && <span style={{ fontSize: 16 }}>{icon}</span>}{label}
    </button>
  );
}

// ─── TOAST ────────────────────────────────────────────────────────────────
function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t); }, []);
  return (
    <div style={{ position: "absolute", bottom: 88, left: 16, right: 16, background: C.primary, color: "white", borderRadius: 18, padding: "15px 20px", fontFamily: F.body, fontSize: 13, zIndex: 999, boxShadow: `${S_LG},${G_GREEN}`, textAlign: "center", fontWeight: 600, animation: "toastIn .35s cubic-bezier(.34,1.56,.64,1) forwards", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
      {msg}
    </div>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────
const BOOKS0 = [
  {id:1,title:"The Alchemist",author:"Paulo Coelho",genre:"Fiction",condition:"Good",status:"Available",owner:"rashid_reads",ownerName:"Rashid Al-Farsi",description:"A magical story about Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure.",rating:4.2,reviews:12},
  {id:2,title:"Atomic Habits",author:"James Clear",genre:"Self-Help",condition:"Like New",status:"Available",owner:"ali_books",ownerName:"Ali Hassan",description:"Tiny changes, remarkable results. A proven way to build good habits and break bad ones.",rating:4.8,reviews:24},
  {id:3,title:"Sapiens",author:"Yuval Noah Harari",genre:"History",condition:"Fair",status:"Borrowed",owner:"fatima_reads",ownerName:"Fatima Al-Said",description:"A brief history of humankind from the Stone Age to the present day.",rating:4.5,reviews:18},
  {id:4,title:"Dune",author:"Frank Herbert",genre:"Sci-Fi",condition:"Good",status:"Available",owner:"community_lib",ownerName:"Community Library",description:"Set in the distant future, Dune is a sweeping epic about politics, religion, and power.",rating:4.7,reviews:31},
  {id:5,title:"1984",author:"George Orwell",genre:"Fiction",condition:"Good",status:"Available",owner:"rashid_reads",ownerName:"Rashid Al-Farsi",description:"A haunting dystopian novel about surveillance, repression, and the nature of truth.",rating:4.6,reviews:42},
  {id:6,title:"Educated",author:"Tara Westover",genre:"Biography",condition:"Like New",status:"Available",owner:"ali_books",ownerName:"Ali Hassan",description:"A memoir about a young girl who leaves her survivalist family to seek an education.",rating:4.4,reviews:15},
  {id:7,title:"The Kite Runner",author:"Khaled Hosseini",genre:"Fiction",condition:"Good",status:"Gifted",owner:"fatima_reads",ownerName:"Fatima Al-Said",description:"A powerful story of friendship, betrayal, and redemption set in Afghanistan.",rating:4.5,reviews:29},
  {id:8,title:"Brave New World",author:"Aldous Huxley",genre:"Sci-Fi",condition:"Fair",status:"Available",owner:"community_lib",ownerName:"Community Library",description:"A dystopian novel imagining a future of engineered happiness and loss of freedom.",rating:4.1,reviews:20},
];
const MYBOOKS0 = [
  {id:101,title:"The Midnight Library",author:"Matt Haig",genre:"Fiction",condition:"Like New",status:"Available",description:"Between life and death there is a library."},
  {id:102,title:"Pride and Prejudice",author:"Jane Austen",genre:"Classic",condition:"Good",status:"Borrowed",description:"A timeless romantic novel."},
];
const BOT = {
  start:   {msg:"Hi Sarah! 👋 I'm your Book Bot.\n\nWhat would you like to do?", opts:["List a new book","Update book status","Something else"]},
  list1:   {msg:"Let's list your book! 📚\nWhat is the title?",input:true},
  list2:   {msg:"Great! Who is the author?",input:true},
  list3:   {msg:"What genre best describes it?",opts:["Fiction","Non-Fiction","Sci-Fi","History","Self-Help","Biography","Classic"]},
  list4:   {msg:"What condition is the book in?",opts:["Like New","Good","Fair","Poor"]},
  list5:   {msg:"How would you like to offer it?",opts:["Borrow","Gift","Sell"]},
  listOk:  {msg:"✅ Your book is live! The community can see it now.",opts:["List another","Done"]},
  upd1:    {msg:"Which book to update? Type its title:",input:true},
  upd2:    {msg:"Set its new status:",opts:["Available","Borrowed","Gifted","Sold"]},
  updOk:   {msg:"✅ Status updated successfully!",opts:["Update another","Done"]},
  other:   {msg:"I can help with borrowing, reporting issues, or community guidelines.",opts:["Got it"]},
};

// ─── HERO SECTION (shared top bar) ───────────────────────────────────────
function GreenHero({ children, minH = 0 }) {
  return (
    <div style={{ background: `linear-gradient(175deg,${C.heroTop},${C.primaryMid})`, padding: "14px 18px 0", flexShrink: 0, position: "relative", overflow: "hidden", minHeight: minH }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)", backgroundSize: "22px 22px" }}/>
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

// ─── SCREENS ──────────────────────────────────────────────────────────────

function SplashScreen({ onNav }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: `linear-gradient(175deg,${C.heroTop},${C.heroBot})`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -80, right: -80, width: 280, height: 280, background: "rgba(255,255,255,0.04)", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)" }}/>
      <div style={{ position: "absolute", bottom: 180, left: -60, width: 200, height: 200, background: "rgba(184,134,42,0.1)", borderRadius: "50%" }}/>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "28px 28px", opacity: .6 }}/>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 30px", position: "relative", zIndex: 1 }}>
        <div style={{ animation: "float 4s ease-in-out infinite", marginBottom: 30 }}>
          <div style={{ width: 96, height: 96, background: "rgba(255,255,255,0.13)", borderRadius: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 50, boxShadow: "0 8px 32px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.18)" }}>📚</div>
        </div>
        <div style={{ textAlign: "center", marginBottom: 52, animation: "fadeUp .5s ease forwards" }}>
          <div style={{ color: "white", fontSize: 38, fontWeight: 900, letterSpacing: -1.5, fontFamily: F.display, lineHeight: 1.05, marginBottom: 8 }}>TCC Books</div>
          <div style={{ color: C.goldLight, fontSize: 11, letterSpacing: 3.5, fontFamily: F.body, fontWeight: 600, textTransform: "uppercase", marginBottom: 18 }}>Community Network</div>
          <div style={{ color: "rgba(255,255,255,0.58)", fontSize: 14, fontFamily: F.body, lineHeight: 1.75, maxWidth: 260, margin: "0 auto" }}>Share books. Discover stories. Build community — one page at a time.</div>
        </div>
        <div style={{ width: "100%", animation: "fadeUp .7s ease forwards" }}>
          <button onClick={() => onNav("login")} className="press" style={{ width: "100%", background: "white", color: C.primary, borderRadius: 16, padding: "16px", border: "none", fontWeight: 800, fontSize: 16, marginBottom: 12, cursor: "pointer", fontFamily: F.body, boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>Sign In</button>
          <button onClick={() => onNav("signup")} className="press" style={{ width: "100%", background: "rgba(255,255,255,0.1)", color: "white", border: "1.5px solid rgba(255,255,255,0.3)", borderRadius: 16, padding: "16px", fontWeight: 700, fontSize: 16, cursor: "pointer", fontFamily: F.body }}>Create Account</button>
        </div>
        <div style={{ marginTop: 28, display: "flex", gap: 24, animation: "fadeUp .9s ease forwards" }}>
          {[["1.2K","Books"],["342","Readers"],["15","Cities"]].map(([v,l],i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ color: "white", fontSize: 15, fontWeight: 800, fontFamily: F.body }}>{v}</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, fontFamily: F.body, textTransform: "uppercase", letterSpacing: .5 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ textAlign: "center", padding: "0 0 14px", color: "rgba(255,255,255,0.25)", fontSize: 11, fontFamily: F.body }}>TCC Books Network © 2025</div>
    </div>
  );
}

function LoginScreen({ onNav, onLogin, state, setState }) {
  const [err, setErr] = useState("");
  const go = () => { if (!state.email || !state.password) { setErr("Please fill all fields."); return; } setErr(""); onLogin(); onNav("feed"); };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg, overflowY: "auto" }}>
      <GreenHero>
        <div style={{ paddingTop: 32, paddingBottom: 52, textAlign: "center" }}>
          <div style={{ fontSize: 46, marginBottom: 14, animation: "float 4s ease-in-out infinite" }}>📚</div>
          <div style={{ color: "white", fontSize: 27, fontWeight: 700, fontFamily: F.display, marginBottom: 6 }}>Welcome Back</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontFamily: F.body }}>Sign in to your TCC Books account</div>
        </div>
      </GreenHero>
      <div style={{ flex: 1, background: C.bg, borderRadius: "24px 24px 0 0", marginTop: -20, padding: "28px 24px 24px" }}>
        {err && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 12, padding: "11px 15px", marginBottom: 18, color: C.danger, fontSize: 13, fontFamily: F.body }}>⚠️ {err}</div>}
        <GInput label="Email Address" placeholder="you@example.com" value={state.email || ""} onChange={v => setState(s => ({...s, email: v}))} icon="✉️"/>
        <GInput label="Password" type="password" placeholder="Your password" value={state.password || ""} onChange={v => setState(s => ({...s, password: v}))} icon="🔒"/>
        <div style={{ textAlign: "right", marginTop: -6, marginBottom: 22 }}>
          <span onClick={() => onNav("forgot")} style={{ color: C.primary, fontSize: 13, fontFamily: F.body, cursor: "pointer", fontWeight: 600 }}>Forgot Password?</span>
        </div>
        <Btn label="Sign In" onClick={go} icon="→"/>
        <div style={{ textAlign: "center", color: C.textMuted, fontSize: 13, fontFamily: F.body, marginTop: 6 }}>New here? <span onClick={() => onNav("signup")} style={{ color: C.primary, fontWeight: 700, cursor: "pointer" }}>Create Account</span></div>
      </div>
    </div>
  );
}

function SignupScreen({ onNav, state, setState }) {
  const [err, setErr] = useState(""); const [ok, setOk] = useState(false);
  const go = () => { if (!state.signupName || !state.signupEmail || !state.signupPass) { setErr("Please fill all fields."); return; } if (!ok) { setErr("Please agree to Terms."); return; } setErr(""); onNav("verify"); };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg, overflowY: "auto" }}>
      <Header title="Create Account" back onBack={() => onNav("splash")}/>
      <div style={{ flex: 1, padding: "24px 24px" }}>
        <div style={{ marginBottom: 24 }}><div style={{ color: C.text, fontSize: 22, fontWeight: 700, fontFamily: F.display, marginBottom: 4 }}>Join the Community</div><div style={{ color: C.textMuted, fontSize: 13, fontFamily: F.body }}>Share books, discover stories</div></div>
        {err && <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 12, padding: "11px 15px", marginBottom: 16, color: C.danger, fontSize: 13, fontFamily: F.body }}>⚠️ {err}</div>}
        <GInput label="Full Name" placeholder="Your name" value={state.signupName || ""} onChange={v => setState(s => ({...s, signupName: v}))} icon="👤"/>
        <GInput label="Email" placeholder="email@example.com" value={state.signupEmail || ""} onChange={v => setState(s => ({...s, signupEmail: v}))} icon="✉️"/>
        <GInput label="Password" type="password" placeholder="Min. 6 characters" value={state.signupPass || ""} onChange={v => setState(s => ({...s, signupPass: v}))} icon="🔒"/>
        <div onClick={() => setOk(o => !o)} style={{ background: ok ? C.primaryFaint : C.bgMuted, border: `1.5px solid ${ok ? C.primary : C.border}`, borderRadius: 14, padding: "13px 15px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", marginBottom: 20, transition: "all .2s" }}>
          <div style={{ width: 22, height: 22, borderRadius: 7, border: `2px solid ${ok ? C.primary : C.borderMid}`, background: ok ? C.primary : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all .2s" }}>{ok && <span style={{ color: "white", fontSize: 13, fontWeight: 800 }}>✓</span>}</div>
          <span style={{ fontSize: 13, color: C.textMid, fontFamily: F.body }}>I agree to <span style={{ color: C.primary, fontWeight: 600 }}>Terms & Privacy Policy</span></span>
        </div>
        <Btn label="Create Account" onClick={go} icon="✨"/>
        <div style={{ textAlign: "center", color: C.textMuted, fontSize: 13, fontFamily: F.body }}>Have an account? <span onClick={() => onNav("login")} style={{ color: C.primary, fontWeight: 700, cursor: "pointer" }}>Login</span></div>
      </div>
    </div>
  );
}

function VerifyScreen({ onNav }) {
  const [code, setCode] = useState(["","","",""]); const [err, setErr] = useState("");
  const refs = [useRef(), useRef(), useRef(), useRef()];
  const key = (i, v) => { if (!/^\d?$/.test(v)) return; const n = [...code]; n[i] = v; setCode(n); if (v && i < 3) refs[i+1].current.focus(); };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg }}>
      <Header title="Verify Email" back onBack={() => onNav("signup")}/>
      <div style={{ flex: 1, padding: 32, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 62, marginBottom: 18, animation: "float 3s ease-in-out infinite" }}>📬</div>
        <div style={{ color: C.text, fontSize: 22, fontWeight: 700, marginBottom: 10, fontFamily: F.display }}>Check Your Email</div>
        <div style={{ color: C.textMuted, fontSize: 14, marginBottom: 8, fontFamily: F.body, lineHeight: 1.65 }}>We sent a 4-digit code to your inbox</div>
        <div style={{ background: C.goldPale, border: `1px solid ${C.goldBorder}`, borderRadius: 10, padding: "8px 18px", marginBottom: 32, display: "inline-block" }}>
          <span style={{ fontSize: 13, color: C.gold, fontFamily: F.body, fontWeight: 700 }}>Demo code: <strong>1234</strong></span>
        </div>
        {err && <div style={{ color: C.danger, fontSize: 13, marginBottom: 12, fontFamily: F.body }}>{err}</div>}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 32 }}>
          {code.map((d, i) => <input key={i} ref={refs[i]} maxLength={1} value={d} onChange={e => key(i, e.target.value)} style={{ width: 58, height: 66, background: d ? C.primaryFaint : C.bgMuted, border: `2px solid ${d ? C.primary : C.border}`, borderRadius: 16, textAlign: "center", fontSize: 26, fontWeight: 800, color: C.primary, outline: "none", fontFamily: F.mono, transition: "all .2s", boxShadow: d ? `0 0 0 3px ${C.primaryPale}` : "none" }}/>)}
        </div>
        <div style={{ width: "100%" }}><Btn label="Verify & Continue" onClick={() => { if (code.join("").length < 4) { setErr("Enter full code."); return; } onNav("feed"); }} icon="✓"/></div>
      </div>
    </div>
  );
}

function ForgotScreen({ onNav }) {
  const [email, setEmail] = useState(""); const [sent, setSent] = useState(false);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", background: C.bg }}>
      <Header title="Reset Password" back onBack={() => onNav("login")}/>
      <div style={{ flex: 1, padding: 32, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 58, marginBottom: 18, animation: "float 3s ease-in-out infinite" }}>{sent ? "✅" : "🔑"}</div>
        <div style={{ color: C.text, fontSize: 22, fontWeight: 700, marginBottom: 10, fontFamily: F.display }}>{sent ? "Link Sent!" : "Forgot Password?"}</div>
        <div style={{ color: C.textMuted, fontSize: 14, marginBottom: 36, fontFamily: F.body, lineHeight: 1.75, maxWidth: 280 }}>{sent ? `Check ${email} for instructions.` : "Enter your email and we'll send reset instructions."}</div>
        {!sent && <div style={{ width: "100%" }}><GInput placeholder="email@example.com" value={email} onChange={setEmail} icon="✉️"/><Btn label="Send Reset Link" onClick={() => email && setSent(true)} disabled={!email} icon="📤"/></div>}
        {sent && <div style={{ width: "100%" }}><Btn label="Back to Login" variant="outline" onClick={() => onNav("login")} icon="←"/></div>}
      </div>
    </div>
  );
}

function FeedScreen({ onNav, books, favs, onFav, user, notifCount, onBookSelect }) {
  const [filter, setFilter] = useState("All"); const [search, setSearch] = useState("");
  const filters = ["All","Available","Fiction","Self-Help","Sci-Fi","History"];
  const filtered = books.filter(b => (filter === "All" || (filter === "Available" ? b.status === "Available" : b.genre === filter)) && (!search || b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase())));
  const emos = {"The Alchemist":"🏜️","Atomic Habits":"⚡","Sapiens":"🦴","Dune":"🌙","Educated":"🎓","1984":"👁️","Brave New World":"🧬"};
  const featured = books.find(b => b.status === "Available") || books[0];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: C.bg }}>
      <GreenHero>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontFamily: F.body, fontWeight: 500, textTransform: "uppercase", letterSpacing: 1 }}>Good day,</div>
            <div style={{ color: "white", fontSize: 20, fontWeight: 700, fontFamily: F.display, letterSpacing: -.4 }}>{user.name} 👋</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {/* Notification button */}
            <button onClick={() => onNav("notifications")} className="press" style={{ width: 42, height: 42, background: "white", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "none", position: "relative", boxShadow: "0 2px 10px rgba(0,0,0,0.18)" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2.5C7.1 2.5 4.8 4.8 4.8 7.7V12L3 13.8h14L15.2 12V7.7C15.2 4.8 12.9 2.5 10 2.5Z" fill={C.primaryFaint} stroke={C.primary} strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M8 14.5a2 2 0 004 0" stroke={C.primary} strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              {notifCount > 0 && <div style={{ position: "absolute", top: -5, right: -5, width: 18, height: 18, background: C.danger, borderRadius: "50%", fontSize: 9, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: F.body, fontWeight: 800, border: "2.5px solid white" }}>{notifCount}</div>}
            </button>
            {/* Profile / Account button */}
            <button onClick={() => onNav("profile")} className="press" style={{ width: 42, height: 42, background: "white", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "none", boxShadow: "0 2px 10px rgba(0,0,0,0.18)" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="7.5" r="3.2" fill={C.primaryFaint} stroke={C.primary} strokeWidth="1.5"/>
                <path d="M3.5 17c0-3.04 2.91-5.5 6.5-5.5s6.5 2.46 6.5 5.5" stroke={C.primary} strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          {[{v:books.length,l:"Community Books",i:"📚"},{v:books.filter(b=>b.status==="Available").length,l:"Available Now",i:"✅"}].map((s,i) => (
            <div key={i} style={{ flex: 1, background: "rgba(255,255,255,0.12)", borderRadius: 14, padding: "10px 14px", display: "flex", gap: 10, alignItems: "center", border: "1px solid rgba(255,255,255,0.1)" }}>
              <span style={{ fontSize: 18 }}>{s.i}</span>
              <div><div style={{ color: "white", fontSize: 18, fontWeight: 800, fontFamily: F.body, lineHeight: 1 }}>{s.v}</div><div style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, fontFamily: F.body, marginTop: 2 }}>{s.l}</div></div>
            </div>
          ))}
        </div>
        <div style={{ background: "white", borderRadius: 14, padding: "11px 15px", marginBottom: 12, display: "flex", gap: 10, alignItems: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.14)" }}>
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><circle cx="7.5" cy="7.5" r="5.5" stroke="#3D5C4A" strokeWidth="2"/><path d="M12 12L15.5 15.5" stroke="#3D5C4A" strokeWidth="2" strokeLinecap="round"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search books or authors..." style={{ background: "transparent", border: "none", color: C.text, fontSize: 13, fontFamily: F.body, flex: 1, outline: "none" }} />
          {search && <button onClick={() => setSearch("")} style={{ background: "none", border: "none", color: C.textMid, cursor: "pointer", fontSize: 15, fontWeight: 700 }}>✕</button>}
        </div>
        <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 14, scrollbarWidth: "none" }}>
          {filters.map(f => <button key={f} onClick={() => setFilter(f)} className="press" style={{ background: filter === f ? "white" : "rgba(255,255,255,0.12)", color: filter === f ? C.primary : "rgba(255,255,255,0.8)", border: `1px solid ${filter === f ? "transparent" : "rgba(255,255,255,0.18)"}`, borderRadius: 22, padding: "7px 16px", fontSize: 12, fontFamily: F.body, whiteSpace: "nowrap", cursor: "pointer", fontWeight: filter === f ? 700 : 500, transition: "all .2s" }}>{f}</button>)}
        </div>
      </GreenHero>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 14px" }}>
        {!search && filter === "All" && featured && (
          <div onClick={() => { onBookSelect(featured); onNav("bookDetail"); }} className="press lift" style={{ background: `linear-gradient(135deg,${C.primary},${C.primaryMid})`, borderRadius: 22, padding: "18px 18px", marginBottom: 18, cursor: "pointer", display: "flex", gap: 16, alignItems: "center", boxShadow: `${S_MD},${G_GREEN}` }}>
            <BookCover title={featured.title} emoji={emos[featured.title] || "📖"} size={66} height={94}/>
            <div style={{ flex: 1 }}>
              <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: "3px 10px", display: "inline-block", marginBottom: 8 }}><span style={{ color: "white", fontSize: 10, fontFamily: F.body, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>⭐ Featured</span></div>
              <div style={{ color: "white", fontSize: 16, fontWeight: 700, fontFamily: F.display, marginBottom: 3, letterSpacing: -.3 }}>{featured.title}</div>
              <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, fontFamily: F.body, marginBottom: 8 }}>by {featured.author}</div>
              <div style={{ color: C.goldLight, fontSize: 12, fontFamily: F.body, fontWeight: 600 }}>{"★".repeat(Math.round(featured.rating))} {featured.rating} · {featured.reviews} reviews</div>
            </div>
          </div>
        )}
        <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, fontFamily: F.body, marginBottom: 12, textTransform: "uppercase", letterSpacing: .8 }}>{filtered.length} books found</div>
        {filtered.length === 0 && <div style={{ textAlign: "center", padding: "50px 20px", color: C.textMuted, fontFamily: F.body }}><div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>No books found</div>}
        {filtered.map(b => <BookCard key={b.id} book={b} onPress={book => { onBookSelect(book); onNav("bookDetail"); }} onFav={onFav} isFav={favs.includes(b.id)}/>)}
      </div>
      <BottomNav active="feed" onNav={onNav}/>
    </div>
  );
}

function SearchScreen({ onNav, books, onBookSelect, onFav, favs }) {
  const [query, setQuery] = useState(""); const [genre, setGenre] = useState("");
  const results = books.filter(b => (!query || b.title.toLowerCase().includes(query.toLowerCase()) || b.author.toLowerCase().includes(query.toLowerCase())) && (!genre || b.genre === genre));
  const genres = [...new Set(books.map(b => b.genre))];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: C.bg }}>
      <GreenHero>
        <div style={{ color: "white", fontSize: 18, fontWeight: 700, marginBottom: 14, fontFamily: F.display }}>Discover Books</div>
        <div style={{ background: "white", borderRadius: 14, padding: "11px 15px", display: "flex", gap: 10, alignItems: "center", marginBottom: 12, boxShadow: "0 2px 10px rgba(0,0,0,0.14)" }}>
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><circle cx="7.5" cy="7.5" r="5.5" stroke="#3D5C4A" strokeWidth="2"/><path d="M12 12L15.5 15.5" stroke="#3D5C4A" strokeWidth="2" strokeLinecap="round"/></svg>
          <input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Title, author..." style={{ background: "transparent", border: "none", color: C.text, fontSize: 14, fontFamily: F.body, flex: 1, outline: "none" }}/>
          {query && <button onClick={() => setQuery("")} style={{ background: "none", border: "none", color: C.textMid, cursor: "pointer", fontSize: 15, fontWeight: 700 }}>✕</button>}
        </div>
        <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 14, scrollbarWidth: "none" }}>
          {["All", ...genres].map(g => <button key={g} onClick={() => setGenre(g === "All" ? "" : g)} className="press" style={{ background: (g === "All" && !genre) || genre === g ? "white" : "rgba(255,255,255,0.12)", color: (g === "All" && !genre) || genre === g ? C.primary : "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 22, padding: "7px 16px", fontSize: 12, fontFamily: F.body, cursor: "pointer", whiteSpace: "nowrap", fontWeight: (g === "All" && !genre) || genre === g ? 700 : 500 }}>{g}</button>)}
        </div>
      </GreenHero>
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px" }}>
        <div style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body, marginBottom: 12, textTransform: "uppercase", letterSpacing: .8 }}>{results.length} result{results.length !== 1 ? "s" : ""}</div>
        {results.map(b => <BookCard key={b.id} book={b} onPress={book => { onBookSelect(book); onNav("bookDetail"); }} onFav={onFav} isFav={favs.includes(b.id)}/>)}
      </div>
      <BottomNav active="search" onNav={onNav}/>
    </div>
  );
}

function BookDetailScreen({ onNav, book, onFav, isFav, onRequest }) {
  const emos = {"The Alchemist":"🏜️","Atomic Habits":"⚡","Sapiens":"🦴","Dune":"🌙","The Midnight Library":"🌌","Educated":"🎓","The Kite Runner":"🪁","1984":"👁️","Pride and Prejudice":"💐","Brave New World":"🧬"};
  if (!book) return null;
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: C.bg }}>
      <GreenHero>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 0 }}>
          <button onClick={() => onNav("back")} className="press" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", width: 36, height: 36, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><svg width="18" height="18" viewBox="0 0 18 18"><path d="M11 14L6 9L11 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
          <span style={{ color: "white", fontSize: 16, fontWeight: 700, flex: 1, fontFamily: F.display }}>Book Details</span>
          <button onClick={() => onFav(book.id)} className="press" style={{ background: isFav ? "rgba(220,38,38,0.2)" : "rgba(255,255,255,0.15)", border: `1px solid ${isFav ? "rgba(220,38,38,0.4)" : "rgba(255,255,255,0.2)"}`, width: 36, height: 36, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 17 }}>{isFav ? "❤️" : "🤍"}</button>
        </div>
        <div style={{ display: "flex", gap: 18, alignItems: "flex-end", paddingTop: 18, paddingBottom: 28 }}>
          <BookCover title={book.title} emoji={emos[book.title] || "📖"} size={88} height={124}/>
          <div style={{ flex: 1 }}>
            <div style={{ color: "white", fontSize: 20, fontWeight: 700, marginBottom: 5, fontFamily: F.display, lineHeight: 1.2 }}>{book.title}</div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginBottom: 12, fontFamily: F.body }}>by {book.author}</div>
            <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
              <span style={{ background: "rgba(255,255,255,0.2)", color: "white", fontSize: 11, padding: "4px 11px", borderRadius: 20, fontFamily: F.body, fontWeight: 600 }}>{book.genre}</span>
              <span style={{ background: "rgba(255,255,255,0.2)", color: "white", fontSize: 11, padding: "4px 11px", borderRadius: 20, fontFamily: F.body, fontWeight: 600 }}>{book.condition}</span>
            </div>
          </div>
        </div>
      </GreenHero>
      <div style={{ flex: 1, overflowY: "auto", background: C.bg, borderRadius: "22px 22px 0 0", marginTop: -18, padding: "20px 16px 16px" }}>
        <div style={{ background: C.bgCard, borderRadius: 18, padding: "14px 16px", display: "flex", alignItems: "center", gap: 13, marginBottom: 14, boxShadow: S_SM, border: `1px solid ${C.border}` }}>
          <div style={{ width: 44, height: 44, background: `linear-gradient(135deg,${C.primary},${C.primaryMid})`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>👤</div>
          <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 14, color: C.text, fontFamily: F.body }}>{book.ownerName}</div><div style={{ fontSize: 12, color: C.textMuted, fontFamily: F.body }}>@{book.owner}</div></div>
          <StatusBadge status={book.status}/>
        </div>
        <div style={{ background: C.bgCard, borderRadius: 16, padding: "14px 16px", marginBottom: 14, border: `1px solid ${C.border}`, boxShadow: S_SM }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, fontFamily: F.body, textTransform: "uppercase", letterSpacing: .9, marginBottom: 8 }}>About this book</div>
          <div style={{ color: C.textMid, fontSize: 13, fontFamily: F.body, lineHeight: 1.8 }}>{book.description}</div>
        </div>
        <div style={{ background: C.bgCard, borderRadius: 16, padding: "12px 16px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10, border: `1px solid ${C.border}`, boxShadow: S_SM }}>
          <div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: 16, color: i <= Math.round(book.rating) ? C.gold : C.border }}>{i <= Math.round(book.rating) ? "★" : "☆"}</span>)}</div>
          <span style={{ fontFamily: F.body, fontSize: 14, color: C.text, fontWeight: 700 }}>{book.rating}</span>
          <span style={{ fontFamily: F.body, fontSize: 12, color: C.textMuted }}>· {book.reviews} reviews</span>
          <span onClick={() => onNav("review")} style={{ marginLeft: "auto", color: C.primary, fontSize: 12, fontFamily: F.body, fontWeight: 700, cursor: "pointer" }}>+ Review</span>
        </div>
        {book.status === "Available" ? <>
          <Btn label="Request to Borrow" icon="📤" onClick={() => onRequest("Borrow", book.title)}/>
          <Btn label="Take as Gift" variant="outline" icon="🎁" onClick={() => onRequest("Gift", book.title)}/>
          <Btn label="Request to Buy" variant="gold" icon="🛒" onClick={() => onRequest("Buy", book.title)}/>
        </> : <div style={{ background: C.bgMuted, borderRadius: 14, padding: "16px", textAlign: "center", fontFamily: F.body, color: C.textMuted, fontSize: 14, border: `1px solid ${C.border}` }}>📭 This book is currently unavailable</div>}
      </div>
    </div>
  );
}

function ReviewScreen({ onNav, book, onSubmit }) {
  const [rating, setRating] = useState(0); const [text, setText] = useState("");
  const labels = ["","Poor","Fair","Good","Very Good","Excellent"];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: C.bg }}>
      <Header title="Leave a Review" back onBack={() => onNav("back")}/>
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
        {book && <div style={{ background: C.bgCard, borderRadius: 18, padding: 14, display: "flex", gap: 13, alignItems: "center", marginBottom: 24, border: `1px solid ${C.border}`, boxShadow: S_SM }}>
          <BookCover title={book.title} size={50} height={70} emoji="📖"/>
          <div><div style={{ fontWeight: 700, fontSize: 15, color: C.text, fontFamily: F.display }}>{book.title}</div><div style={{ fontSize: 12, color: C.textMuted, fontFamily: F.body }}>{book.author}</div></div>
        </div>}
        <div style={{ textAlign: "center", background: C.bgCard, borderRadius: 18, padding: "22px 20px", marginBottom: 20, border: `1px solid ${C.border}`, boxShadow: S_SM }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.textMuted, marginBottom: 14, fontFamily: F.body }}>How would you rate this book?</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>{[1,2,3,4,5].map(i => <span key={i} onClick={() => setRating(i)} style={{ fontSize: 36, cursor: "pointer", color: i <= rating ? C.gold : "#D1C5B8", transition: "all .2s", display: "inline-block", transform: i <= rating ? "scale(1.12)" : "scale(1)" }}>★</span>)}</div>
          {rating > 0 && <div style={{ color: C.gold, fontWeight: 700, marginTop: 10, fontFamily: F.body, fontSize: 13 }}>{labels[rating]}</div>}
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, marginBottom: 8, fontFamily: F.body, textTransform: "uppercase", letterSpacing: .9 }}>Your Review</div>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Share your thoughts..." style={{ width: "100%", background: C.bgCard, border: `1.5px solid ${C.border}`, borderRadius: 14, padding: 15, minHeight: 120, fontSize: 13, color: C.text, fontFamily: F.body, lineHeight: 1.7, resize: "none", outline: "none", boxSizing: "border-box" }} onFocus={e => { e.target.style.borderColor = C.primary; e.target.style.boxShadow = `0 0 0 3px ${C.primaryPale}`; }} onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }}/>
        </div>
        <Btn label="Submit Review" onClick={() => { if (rating && text) { onSubmit(); onNav("back"); } }} disabled={!rating || !text} icon="✓"/>
        <Btn label="Cancel" variant="ghost" onClick={() => onNav("back")}/>
      </div>
    </div>
  );
}

function ProfileScreen({ onNav, user, myBooks }) {
  const cnt = myBooks.length;
  const lvl = cnt <= 5 ? {n:"Bronze Reader",i:"🥉",l:1} : cnt <= 20 ? {n:"Silver Reader",i:"🥈",l:2} : {n:"Gold Reader",i:"🥇",l:3};
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: C.bg }}>
      <div style={{ overflowY: "auto", flex: 1 }}>
        <GreenHero>
          <div style={{ paddingTop: 16, paddingBottom: 48, textAlign: "center" }}>
            <div style={{ width: 80, height: 80, background: "rgba(255,255,255,0.15)", borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 12px", border: "2px solid rgba(255,255,255,0.2)", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>👤</div>
            <div style={{ color: "white", fontSize: 21, fontWeight: 700, marginBottom: 4, fontFamily: F.display }}>{user.name}</div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, fontFamily: F.body, marginBottom: 20 }}>@{user.username} · Muscat Community</div>
            <div style={{ display: "flex", background: "rgba(255,255,255,0.12)", borderRadius: 16, padding: 4, border: "1px solid rgba(255,255,255,0.12)" }}>
              {[[myBooks.length,"Listed"],[myBooks.filter(b=>b.status==="Borrowed").length,"Shared"],[2,"Borrowed"]].map(([v,l],i) => (
                <div key={i} style={{ flex: 1, textAlign: "center", padding: "10px 0", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.15)" : "none" }}>
                  <div style={{ color: "white", fontSize: 19, fontWeight: 800, fontFamily: F.body }}>{v}</div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, fontFamily: F.body, textTransform: "uppercase", letterSpacing: .5 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </GreenHero>
        <div style={{ background: C.bg, borderRadius: "22px 22px 0 0", marginTop: -20, padding: "20px 16px 20px" }}>
          <div onClick={() => onNav("badges")} className="press lift" style={{ background: `linear-gradient(135deg,${C.primaryFaint},${C.bgCard})`, borderRadius: 18, padding: "15px 18px", display: "flex", alignItems: "center", gap: 14, marginBottom: 18, border: `1.5px solid ${C.primaryPale}`, cursor: "pointer", boxShadow: S_SM }}>
            <span style={{ fontSize: 32 }}>{lvl.i}</span>
            <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 15, color: C.primary, fontFamily: F.body }}>{lvl.n}</div><div style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body }}>Level {lvl.l} · {myBooks.length} books listed</div></div>
            <div style={{ background: C.primary, color: "white", fontSize: 11, padding: "5px 12px", borderRadius: 20, fontFamily: F.body, fontWeight: 700 }}>View →</div>
          </div>
          {[
            {icon:"✏️",label:"Edit Profile",action:()=>onNav("editProfile")},
            {icon:"❤️",label:"Favourite Books",action:()=>onNav("favourites")},
            {icon:"🏅",label:"Badges & Levels",action:()=>onNav("badges")},
            {icon:"ℹ️",label:"About TCC Books",action:()=>onNav("about")},
            {icon:"❓",label:"FAQs",action:()=>onNav("faqs")},
            {icon:"🚪",label:"Sign Out",action:()=>onNav("splash"),danger:true},
          ].map((item, i) => (
            <div key={i} onClick={item.action} className="press" style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 4px", borderBottom: `1px solid ${C.border}`, cursor: "pointer" }}>
              <div style={{ width: 38, height: 38, background: item.danger ? "#FEF2F2" : C.bgMuted, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, border: `1px solid ${item.danger ? "#FECACA" : C.border}` }}>{item.icon}</div>
              <span style={{ fontFamily: F.body, fontSize: 14, color: item.danger ? C.danger : C.text, fontWeight: 500, flex: 1 }}>{item.label}</span>
              <svg width="16" height="16" viewBox="0 0 16 16"><path d="M6 12L10 8L6 4" stroke={item.danger ? C.danger : C.textLight} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="profile" onNav={onNav}/>
    </div>
  );
}

function EditProfileScreen({ onNav, user, setUser, showToast }) {
  const [form, setForm] = useState({name:user.name,username:user.username,email:user.email,bio:user.bio||""});
  const save = () => { setUser(u => ({...u,...form})); showToast("✅ Profile updated!"); onNav("back"); };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: C.bg }}>
      <Header title="Edit Profile" back onBack={() => onNav("back")} right={<button onClick={save} className="press" style={{ background: `linear-gradient(135deg,${C.primary},${C.primaryMid})`, border: "none", color: "white", borderRadius: 11, padding: "9px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: F.body, boxShadow: G_GREEN }}>Save</button>}/>
      <div style={{ flex: 1, overflowY: "auto", padding: 22 }}>
        <div style={{ textAlign: "center", marginBottom: 26 }}>
          <div style={{ width: 80, height: 80, background: `linear-gradient(135deg,${C.primary},${C.primaryMid})`, borderRadius: 24, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 10px", boxShadow: G_GREEN }}>👤</div>
          <span style={{ color: C.primary, fontSize: 13, fontFamily: F.body, fontWeight: 600, cursor: "pointer" }}>Change Photo</span>
        </div>
        <GInput label="Full Name" value={form.name} onChange={v => setForm(f => ({...f,name:v}))} icon="👤"/>
        <GInput label="Username" value={form.username} onChange={v => setForm(f => ({...f,username:v}))} icon="@"/>
        <GInput label="Email" value={form.email} onChange={v => setForm(f => ({...f,email:v}))} icon="✉️"/>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: C.textMuted, fontFamily: F.body, marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: .9 }}>Bio</div>
          <textarea value={form.bio} onChange={e => setForm(f => ({...f,bio:e.target.value}))} placeholder="Tell us about yourself..." style={{ width: "100%", background: C.bgCard, border: `1.5px solid ${C.border}`, borderRadius: 13, padding: "13px 15px", fontSize: 14, color: C.text, fontFamily: F.body, resize: "none", outline: "none", boxSizing: "border-box", minHeight: 90, lineHeight: 1.6 }} onFocus={e => { e.target.style.borderColor = C.primary; e.target.style.boxShadow = `0 0 0 3px ${C.primaryPale}`; }} onBlur={e => { e.target.style.borderColor = C.border; e.target.style.boxShadow = "none"; }}/>
        </div>
        <Btn label="Save Changes" onClick={save} icon="✓"/>
      </div>
    </div>
  );
}

function FavouritesScreen({ onNav, books, favIds, onFav, onBookSelect }) {
  const favBooks = books.filter(b => favIds.includes(b.id));
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: C.bg }}>
      <Header title="Favourite Books" subtitle={`${favBooks.length} saved`} back onBack={() => onNav("back")}/>
      <div style={{ flex: 1, overflowY: "auto", padding: 14 }}>
        {favBooks.length === 0 ? <div style={{ textAlign: "center", padding: "70px 20px" }}><div style={{ fontSize: 50, marginBottom: 14, animation: "float 3s ease-in-out infinite" }}>🤍</div><div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: C.text, fontFamily: F.display }}>No favourites yet</div><div style={{ fontSize: 13, color: C.textMuted, fontFamily: F.body }}>Tap ❤️ on any book to save it here</div></div>
        : favBooks.map(b => <BookCard key={b.id} book={b} onPress={book => { onBookSelect(book); onNav("bookDetail"); }} onFav={onFav} isFav/>)}
      </div>
    </div>
  );
}

function DashboardScreen({ onNav, myBooks }) {
  const stats = [[myBooks.length,"Listed","📚",C.primary],[myBooks.filter(b=>b.status==="Borrowed").length,"Borrowed Out","🤝",C.info],[myBooks.filter(b=>b.status==="Gifted").length,"Gifted","🎁",C.success],[myBooks.filter(b=>b.status==="Available").length,"Available","✅",C.warning],[2,"Received","📤",C.gold],[0,"Sold","💰",C.danger]];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: C.bg }}>
      <GreenHero><div style={{ paddingBottom: 18 }}><div style={{ color: "white", fontSize: 18, fontWeight: 700, fontFamily: F.display }}>My Dashboard</div><div style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, fontFamily: F.body, marginTop: 2 }}>Track your book activity</div></div></GreenHero>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 14px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, marginBottom: 12, fontFamily: F.body, textTransform: "uppercase", letterSpacing: .8 }}>Activity Summary</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
          {stats.map(([v,l,icon,c],i) => <div key={i} style={{ background: C.bgCard, borderRadius: 16, padding: "14px 10px", textAlign: "center", border: `1px solid ${C.border}`, boxShadow: S_SM }}><div style={{ fontSize: 22, marginBottom: 6 }}>{icon}</div><div style={{ fontSize: 22, fontWeight: 800, color: c, fontFamily: F.body, lineHeight: 1 }}>{v}</div><div style={{ fontSize: 10, color: C.textMuted, fontFamily: F.body, marginTop: 4, lineHeight: 1.3 }}>{l}</div></div>)}
        </div>
        <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, marginBottom: 12, fontFamily: F.body, textTransform: "uppercase", letterSpacing: .8 }}>Quick Actions</div>
        <div onClick={() => onNav("chatbot")} className="press lift" style={{ background: `linear-gradient(135deg,${C.primary},${C.primaryMid})`, borderRadius: 20, padding: "18px 20px", display: "flex", alignItems: "center", gap: 16, marginBottom: 12, cursor: "pointer", boxShadow: `${S_MD},${G_GREEN}` }}>
          <div style={{ width: 48, height: 48, background: "rgba(255,255,255,0.15)", borderRadius: 15, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, border: "1px solid rgba(255,255,255,0.2)" }}>➕</div>
          <div style={{ flex: 1 }}><div style={{ color: "white", fontWeight: 700, fontSize: 15, fontFamily: F.body }}>List a New Book</div><div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontFamily: F.body, marginTop: 2 }}>Chat with our Book Bot</div></div>
          <svg width="18" height="18" viewBox="0 0 18 18"><path d="M6 14L12 9L6 4" stroke="rgba(255,255,255,.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <div onClick={() => onNav("myBooks")} className="press lift" style={{ background: C.bgCard, border: `1.5px solid ${C.primaryPale}`, borderRadius: 20, padding: "18px 20px", display: "flex", alignItems: "center", gap: 16, cursor: "pointer", boxShadow: S_SM }}>
          <div style={{ width: 48, height: 48, background: C.primaryFaint, borderRadius: 15, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, border: `1px solid ${C.primaryPale}` }}>📋</div>
          <div style={{ flex: 1 }}><div style={{ color: C.primary, fontWeight: 700, fontSize: 15, fontFamily: F.body }}>Manage My Books</div><div style={{ color: C.textMuted, fontSize: 12, fontFamily: F.body, marginTop: 2 }}>Update status or details</div></div>
          <svg width="18" height="18" viewBox="0 0 18 18"><path d="M6 14L12 9L6 4" stroke={C.textLight} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </div>
      <BottomNav active="dashboard" onNav={onNav}/>
    </div>
  );
}

function MyBooksScreen({ onNav, myBooks, setMyBooks, showToast }) {
  const [filter, setFilter] = useState("All"); const [expandId, setExpandId] = useState(null);
  const filtered = myBooks.filter(b => filter === "All" || b.status === filter);
  const upd = (id, status) => { setMyBooks(bs => bs.map(b => b.id === id ? {...b,status} : b)); showToast(`✅ Status → "${status}"`); };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: C.bg }}>
      <Header title="My Books" subtitle={`${myBooks.length} books`} back onBack={() => onNav("back")} right={<button onClick={() => onNav("chatbot")} className="press" style={{ background: `linear-gradient(135deg,${C.gold},${C.goldLight})`, border: "none", color: "white", borderRadius: 11, padding: "9px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: F.body, boxShadow: G_GOLD }}>+ Add</button>}/>
      <div style={{ padding: "12px 14px 0", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 7, overflowX: "auto", paddingBottom: 12, scrollbarWidth: "none" }}>
          {["All","Available","Borrowed","Gifted","Sold"].map(f => <button key={f} onClick={() => setFilter(f)} className="press" style={{ background: filter === f ? C.primary : C.bgMuted, color: filter === f ? "white" : C.textMuted, border: `1px solid ${filter === f ? "transparent" : C.border}`, borderRadius: 22, padding: "7px 16px", fontSize: 12, fontFamily: F.body, cursor: "pointer", whiteSpace: "nowrap", fontWeight: filter === f ? 700 : 400, transition: "all .2s" }}>{f}</button>)}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "4px 14px 14px" }}>
        {filtered.length === 0 && <div style={{ textAlign: "center", padding: 50, color: C.textMuted, fontFamily: F.body }}>No books here. <span onClick={() => onNav("chatbot")} style={{ color: C.primary, fontWeight: 700, cursor: "pointer" }}>Add one!</span></div>}
        {filtered.map(b => (
          <div key={b.id}>
            <div onClick={() => setExpandId(expandId === b.id ? null : b.id)} style={{ background: C.bgCard, borderRadius: expandId === b.id ? "18px 18px 0 0" : 18, padding: 14, display: "flex", gap: 12, border: `1px solid ${C.border}`, borderBottom: expandId === b.id ? "none" : undefined, marginBottom: expandId === b.id ? 0 : 10, cursor: "pointer", boxShadow: expandId === b.id ? "none" : S_SM }}>
              <BookCover title={b.title} size={50} height={70} emoji="📖"/>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: F.display }}>{b.title}</div>
                <div style={{ fontSize: 12, color: C.textMuted, fontFamily: F.body, marginBottom: 7 }}>{b.author}</div>
                <StatusBadge status={b.status}/>
              </div>
              <div style={{ color: C.textLight, fontSize: 13, alignSelf: "center", transition: "transform .2s", transform: expandId === b.id ? "rotate(180deg)" : "none" }}>▼</div>
            </div>
            {expandId === b.id && <div style={{ background: C.bgMuted, borderRadius: "0 0 18px 18px", padding: "12px 14px", marginBottom: 10, border: `1px solid ${C.border}`, borderTop: `1px solid ${C.primaryPale}`, display: "flex", gap: 8, flexWrap: "wrap" }}>
              <div style={{ fontSize: 10, color: C.textMuted, fontFamily: F.body, width: "100%", marginBottom: 5, textTransform: "uppercase", letterSpacing: .8 }}>Set Status:</div>
              {["Available","Borrowed","Gifted","Sold"].map(s => <button key={s} onClick={() => { upd(b.id, s); setExpandId(null); }} className="press" style={{ background: b.status === s ? C.primary : C.bgCard, color: b.status === s ? "white" : C.textMid, border: `1px solid ${b.status === s ? "transparent" : C.border}`, borderRadius: 11, padding: "8px 13px", fontSize: 12, fontFamily: F.body, cursor: "pointer", fontWeight: b.status === s ? 700 : 400, transition: "all .15s" }}>{s}</button>)}
            </div>}
          </div>
        ))}
      </div>
      <BottomNav active="dashboard" onNav={onNav}/>
    </div>
  );
}

function ChatbotScreen({ onNav, myBooks, setMyBooks, showToast }) {
  const [messages, setMessages] = useState([{from:"bot",text:BOT.start.msg,opts:BOT.start.opts}]);
  const [collecting, setCollecting] = useState(null);
  const [input, setInput] = useState("");
  const ref = useRef();
  useEffect(() => { ref.current?.scrollIntoView({behavior:"smooth"}); }, [messages]);
  const add = (from, text, opts) => setMessages(m => [...m, {from,text,opts}]);
  const pick = (opt) => {
    add("user", opt);
    if (opt === "List a new book") { setCollecting({step:"title",data:{}}); setTimeout(() => add("bot", BOT.list1.msg), 400); }
    else if (opt === "Update book status") { setCollecting({step:"upd_title",data:{}}); setTimeout(() => add("bot", BOT.upd1.msg), 400); }
    else if (opt === "Something else") { setTimeout(() => add("bot", BOT.other.msg, BOT.other.opts), 400); }
    else if (["Got it","Done"].includes(opt)) { setCollecting(null); setTimeout(() => add("bot", BOT.start.msg, BOT.start.opts), 400); }
    else if (opt === "List another") { setCollecting({step:"title",data:{}}); setTimeout(() => add("bot", BOT.list1.msg), 400); }
    else if (opt === "Update another") { setCollecting({step:"upd_title",data:{}}); setTimeout(() => add("bot", BOT.upd1.msg), 400); }
    else if (collecting?.step === "genre") { const d = {...collecting.data,genre:opt}; setCollecting({step:"condition",data:d}); setTimeout(() => add("bot", BOT.list4.msg, BOT.list4.opts), 400); }
    else if (collecting?.step === "condition") { const d = {...collecting.data,condition:opt}; setCollecting({step:"offer",data:d}); setTimeout(() => add("bot", BOT.list5.msg, BOT.list5.opts), 400); }
    else if (collecting?.step === "offer") { const d = {...collecting.data,offer:opt}; setMyBooks(b => [...b,{id:Date.now(),title:d.title,author:d.author,genre:d.genre,condition:d.condition,status:"Available",description:"Added via Book Bot."}]); setCollecting(null); showToast("📚 Book listed!"); setTimeout(() => add("bot", BOT.listOk.msg, BOT.listOk.opts), 400); }
    else if (collecting?.step === "upd_status") { const t = collecting.data.title; setMyBooks(bs => bs.map(b => b.title.toLowerCase() === t.toLowerCase() ? {...b,status:opt} : b)); setCollecting(null); showToast(`✅ "${t}" → ${opt}`); setTimeout(() => add("bot", BOT.updOk.msg, BOT.updOk.opts), 400); }
  };
  const send = () => {
    if (!input.trim()) return;
    const val = input.trim(); setInput("");
    add("user", val);
    if (collecting?.step === "title") { setCollecting({step:"author",data:{title:val}}); setTimeout(() => add("bot", BOT.list2.msg), 400); }
    else if (collecting?.step === "author") { setCollecting({step:"genre",data:{...collecting.data,author:val}}); setTimeout(() => add("bot", BOT.list3.msg, BOT.list3.opts), 400); }
    else if (collecting?.step === "upd_title") { const found = myBooks.find(b => b.title.toLowerCase().includes(val.toLowerCase())); if (found) { setCollecting({step:"upd_status",data:{title:found.title}}); setTimeout(() => add("bot", `Found "${found.title}"! Set new status:`, BOT.upd2.opts), 400); } else { setTimeout(() => add("bot", `Couldn't find "${val}". Try exact title.`), 400); } }
    else { setTimeout(() => add("bot", BOT.start.msg, BOT.start.opts), 400); setCollecting(null); }
  };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: C.bg }}>
      <GreenHero>
        <div style={{ display: "flex", alignItems: "center", gap: 13, paddingBottom: 16 }}>
          <div style={{ width: 42, height: 42, background: `linear-gradient(135deg,${C.gold},${C.goldLight})`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, boxShadow: G_GOLD }}>🤖</div>
          <div>
            <div style={{ color: "white", fontWeight: 700, fontSize: 16, fontFamily: F.display }}>Book Bot</div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, fontFamily: F.body, display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 6, height: 6, background: "#4ADE80", borderRadius: "50%", display: "inline-block", animation: "pulse 2s infinite" }}/>Online · Here to help
            </div>
          </div>
        </div>
      </GreenHero>
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px", display: "flex", flexDirection: "column", gap: 10, background: C.bgSoft }}>
        {messages.map((m, i) => (
          <div key={i} style={{ animation: "fadeUp .25s ease forwards" }}>
            <div style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: 8 }}>
              {m.from === "bot" && <div style={{ width: 30, height: 30, background: `linear-gradient(135deg,${C.gold},${C.goldLight})`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>🤖</div>}
              <div style={{ maxWidth: "78%", background: m.from === "user" ? `linear-gradient(135deg,${C.primary},${C.primaryMid})` : C.bgCard, color: m.from === "user" ? "white" : C.text, borderRadius: m.from === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", padding: "11px 15px", fontSize: 13, fontFamily: F.body, lineHeight: 1.6, border: m.from === "bot" ? `1px solid ${C.border}` : "none", whiteSpace: "pre-line", boxShadow: m.from === "user" ? G_GREEN : S_SM }}>
                {m.text}
              </div>
            </div>
            {m.opts && i === messages.length - 1 && <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingLeft: 38, marginTop: 8 }}>
              {m.opts.map((opt, oi) => <button key={oi} onClick={() => pick(opt)} className="press" style={{ background: C.bgCard, border: `1.5px solid ${C.primary}`, color: C.primary, borderRadius: 22, padding: "9px 15px", fontSize: 12, fontFamily: F.body, fontWeight: 700, cursor: "pointer", boxShadow: S_SM }}>{opt}</button>)}
            </div>}
          </div>
        ))}
        <div ref={ref}/>
      </div>
      <div style={{ background: C.bgCard, padding: "11px 14px", display: "flex", gap: 10, alignItems: "center", borderTop: `1px solid ${C.border}` }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type a reply..." style={{ flex: 1, background: C.bgMuted, border: `2px solid ${C.borderMid}`, borderRadius: 24, padding: "12px 18px", fontSize: 13, fontFamily: F.body, outline: "none", color: C.text, transition: "border-color .2s" }} onFocus={e => { e.target.style.borderColor = C.primary; e.target.style.background = "#fff"; }} onBlur={e => { e.target.style.borderColor = C.borderMid; e.target.style.background = C.bgMuted; }}/>
        <button onClick={send} className="press" style={{ width: 44, height: 44, background: `linear-gradient(135deg,${C.primary},${C.primaryMid})`, border: "none", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: G_GREEN, flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 18 18"><path d="M16 9L2 2L5 9L2 16L16 9Z" fill="white"/></svg>
        </button>
      </div>
      <BottomNav active="chatbot" onNav={onNav}/>
    </div>
  );
}

function NotificationsScreen({ onNav, notifs, setNotifs }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: C.bg }}>
      <Header title="Notifications" back onBack={() => onNav("back")} right={<button onClick={() => setNotifs(ns => ns.map(n => ({...n,unread:false})))} style={{ background: "none", border: "none", color: C.primary, fontSize: 12, cursor: "pointer", fontFamily: F.body, fontWeight: 700 }}>Mark all read</button>}/>
      <div style={{ flex: 1, overflowY: "auto", padding: 14 }}>
        {notifs.map((n, i) => (
          <div key={i} onClick={() => setNotifs(ns => ns.map((nn, ii) => ii === i ? {...nn,unread:false} : nn))} className="press" style={{ background: n.unread ? C.primaryFaint : C.bgCard, borderRadius: 18, padding: "14px 14px", display: "flex", gap: 12, marginBottom: 10, border: `1px solid ${n.unread ? C.primaryPale : C.border}`, cursor: "pointer", boxShadow: S_SM }}>
            <div style={{ width: 44, height: 44, background: n.unread ? C.primaryPale : C.bgMuted, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{n.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 3, fontFamily: F.body }}>{n.title}</div>
              <div style={{ fontSize: 12, color: C.textMuted, fontFamily: F.body, lineHeight: 1.5 }}>{n.body}</div>
              <div style={{ fontSize: 11, color: C.textLight, fontFamily: F.body, marginTop: 5 }}>{n.time}</div>
            </div>
            {n.unread && <div style={{ width: 9, height: 9, background: C.primary, borderRadius: "50%", flexShrink: 0, marginTop: 5, boxShadow: G_GREEN }}/>}
          </div>
        ))}
      </div>
    </div>
  );
}

function BadgesScreen({ onNav, myBooks }) {
  const cnt = myBooks.length;
  const badges = [{icon:"🥉",name:"Bronze Reader",range:"1–5 books",earned:cnt>=1,threshold:1},{icon:"🥈",name:"Silver Reader",range:"6–20 books",earned:cnt>=6,threshold:6},{icon:"🥇",name:"Gold Reader",range:"21–50 books",earned:cnt>=21,threshold:21},{icon:"💎",name:"Diamond Reader",range:"51+ books",earned:cnt>=51,threshold:51}];
  const cur = badges.filter(b => b.earned).slice(-1)[0] || badges[0];
  const nxt = badges.find(b => !b.earned);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: C.bg }}>
      <Header title="Badges & Levels" back onBack={() => onNav("back")}/>
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <div style={{ background: `linear-gradient(135deg,${C.primary},${C.primaryMid})`, borderRadius: 22, padding: "26px 20px", textAlign: "center", marginBottom: 22, boxShadow: `${S_LG},${G_GREEN}`, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "20px 20px" }}/>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 54, marginBottom: 10, animation: "float 3s ease-in-out infinite" }}>{cur.icon}</div>
            <div style={{ color: "white", fontSize: 22, fontWeight: 700, marginBottom: 4, fontFamily: F.display }}>{cur.name}</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontFamily: F.body, marginBottom: 18 }}>You've listed {cnt} book{cnt !== 1 ? "s" : ""}</div>
            {nxt && <><div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 10, height: 8, marginBottom: 8, overflow: "hidden" }}><div style={{ background: "white", height: 8, borderRadius: 10, width: `${Math.min((cnt/nxt.threshold)*100, 100)}%`, transition: "width .6s" }}/></div><div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontFamily: F.body }}>{nxt.threshold - cnt} more books to reach {nxt.name}</div></>}
            {!nxt && <div style={{ color: C.goldLight, fontSize: 14, fontFamily: F.body, fontWeight: 700 }}>🏆 Maximum level reached!</div>}
          </div>
        </div>
        {badges.map((b, i) => <div key={i} style={{ background: b.earned ? C.bgCard : C.bgMuted, borderRadius: 18, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, marginBottom: 12, border: `1.5px solid ${b.earned ? C.goldBorder : C.border}`, opacity: b.earned ? 1 : .5, boxShadow: b.earned ? S_SM : "none" }}>
          <span style={{ fontSize: 34 }}>{b.icon}</span>
          <div style={{ flex: 1 }}><div style={{ fontWeight: 700, fontSize: 15, color: C.text, fontFamily: F.body }}>{b.name}</div><div style={{ fontSize: 12, color: C.textMuted, fontFamily: F.body }}>{b.range}</div></div>
          {b.earned ? <div style={{ background: C.primaryFaint, color: C.primary, fontSize: 11, padding: "5px 12px", borderRadius: 20, fontFamily: F.body, fontWeight: 700 }}>Earned ✓</div> : <div style={{ background: C.bgWarm, color: C.textLight, fontSize: 11, padding: "5px 12px", borderRadius: 20, fontFamily: F.body }}>Locked 🔒</div>}
        </div>)}
      </div>
    </div>
  );
}

function AboutScreen({ onNav }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: C.bg }}>
      <Header title="About Us" back onBack={() => onNav("back")}/>
      <div style={{ flex: 1, overflowY: "auto", padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 58, marginBottom: 16, animation: "float 3s ease-in-out infinite" }}>📚</div>
        <div style={{ color: C.primary, fontSize: 24, fontWeight: 700, marginBottom: 10, fontFamily: F.display }}>TCC Books Network</div>
        <div style={{ color: C.textMid, fontSize: 14, fontFamily: F.body, lineHeight: 1.85, marginBottom: 28, padding: "0 8px" }}>Connecting book lovers across communities. Share, borrow, gift, or sell books — every book deserves a new reader.</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          {[["1,247","Books Listed"],["342","Active Readers"],["15","Communities"],["892","Books Shared"]].map(([v,l],i) => <div key={i} style={{ background: C.bgCard, borderRadius: 18, padding: "18px 14px", border: `1px solid ${C.border}`, boxShadow: S_SM }}><div style={{ fontSize: 22, fontWeight: 800, color: C.primary, fontFamily: F.body, marginBottom: 4 }}>{v}</div><div style={{ fontSize: 12, color: C.textMuted, fontFamily: F.body }}>{l}</div></div>)}
        </div>
        <Btn label="Contact Us" variant="outline" icon="✉️" onClick={() => {}}/>
      </div>
    </div>
  );
}

function FAQsScreen({ onNav }) {
  const [open, setOpen] = useState(null);
  const faqs = [
    {q:"How do I list a book?",a:"Go to Dashboard and tap 'List a New Book'. Our chatbot will guide you step-by-step."},
    {q:"How does borrowing work?",a:"Tap 'Request to Borrow' on any available book. The owner gets notified and you coordinate pick-up."},
    {q:"What are the badges for?",a:"Badges reward you for listing books: Bronze (1-5), Silver (6-20), Gold (21-50), Diamond (51+)."},
    {q:"Can I sell my books?",a:"Yes! When listing via chatbot, choose 'Sell' as your offer type to make the book purchasable."},
    {q:"How do I save favourite books?",a:"Tap the heart icon ❤️ on any book to add it to your Favourites list in your Profile."},
  ];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: C.bg }}>
      <Header title="FAQs" back onBack={() => onNav("back")}/>
      <div style={{ flex: 1, overflowY: "auto", padding: 14 }}>
        {faqs.map((f, i) => <div key={i} onClick={() => setOpen(open === i ? null : i)} className="press" style={{ background: C.bgCard, borderRadius: 18, padding: "16px 18px", marginBottom: 10, border: `1.5px solid ${open === i ? C.primary : C.border}`, cursor: "pointer", transition: "all .22s", boxShadow: open === i ? S_MD : S_SM }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: open === i ? C.primary : C.text, fontFamily: F.body, flex: 1, marginRight: 10 }}>{f.q}</div>
            <div style={{ color: C.textLight, fontSize: 13, transition: "transform .22s", transform: open === i ? "rotate(180deg)" : "none", flexShrink: 0 }}>▼</div>
          </div>
          {open === i && <div style={{ fontSize: 13, color: C.textMid, fontFamily: F.body, lineHeight: 1.75, marginTop: 12, borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>{f.a}</div>}
        </div>)}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────
export default function Light() {
  const [screen, setScreen] = useState("splash");
  const [history, setHistory] = useState(["splash"]);
  const [books] = useState(BOOKS0);
  const [myBooks, setMyBooks] = useState(MYBOOKS0);
  const [favs, setFavs] = useState([1, 4]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loginState, setLoginState] = useState({email:"",password:""});
  const [user, setUser] = useState({name:"Sidharth",username:"sidharth_reads",email:"sarah@example.com",bio:"Book lover & storyteller 📚"});
  const [notifs, setNotifs] = useState([
    {icon:"💬",title:"New Message",body:"Rashid wants to borrow 'The Alchemist'",time:"2m ago",unread:true},
    {icon:"✅",title:"Request Accepted",body:"Your borrow request for 'Dune' was approved",time:"1h ago",unread:true},
    {icon:"📚",title:"New Book Listed",body:"Ali listed 'Educated' by Tara Westover",time:"3h ago",unread:false},
    {icon:"⏰",title:"Return Reminder",body:"Please return 'Atomic Habits' by Friday",time:"1d ago",unread:false},
    {icon:"🎁",title:"Gift Available",body:"Fatima is gifting 'The Kite Runner'",time:"2d ago",unread:false},
  ]);
  const [toast, setToast] = useState("");
  const showToast = msg => setToast(msg);
  const nav = s => {
    if (s === "back") { const h = history.slice(0, -1); setHistory(h); setScreen(h[h.length-1] || "feed"); }
    else { setHistory(h => [...h, s]); setScreen(s); }
  };
  const toggleFav = id => setFavs(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  const unread = notifs.filter(n => n.unread).length;
  const handleRequest = (type, title) => { showToast(`✅ ${type} request sent for "${title}"!`); setNotifs(ns => [{icon:type==="Borrow"?"📤":"🎁",title:`${type} Request Sent`,body:`Requested to ${type.toLowerCase()} "${title}"`,time:"just now",unread:false},...ns]); };
  const allBooks = [...books, ...myBooks.map(b => ({...b,owner:"me",ownerName:user.name}))];
  const sp = {onNav:nav,showToast};
  const render = () => {
    switch (screen) {
      case "splash":        return <SplashScreen {...sp}/>;
      case "login":         return <LoginScreen {...sp} onLogin={() => {}} state={loginState} setState={setLoginState}/>;
      case "signup":        return <SignupScreen {...sp} state={loginState} setState={setLoginState}/>;
      case "verify":        return <VerifyScreen {...sp}/>;
      case "forgot":        return <ForgotScreen {...sp}/>;
      case "feed":          return <FeedScreen {...sp} books={allBooks} favs={favs} onFav={toggleFav} user={user} notifCount={unread} onBookSelect={setSelectedBook}/>;
      case "search":        return <SearchScreen {...sp} books={allBooks} onBookSelect={setSelectedBook} onFav={toggleFav} favs={favs}/>;
      case "bookDetail":    return <BookDetailScreen {...sp} book={selectedBook} onFav={toggleFav} isFav={selectedBook && favs.includes(selectedBook.id)} onRequest={handleRequest}/>;
      case "review":        return <ReviewScreen {...sp} book={selectedBook} onSubmit={() => showToast("✅ Review submitted!")}/>;
      case "profile":       return <ProfileScreen {...sp} user={user} myBooks={myBooks} setUser={setUser}/>;
      case "editProfile":   return <EditProfileScreen {...sp} user={user} setUser={setUser}/>;
      case "favourites":    return <FavouritesScreen {...sp} books={allBooks} favIds={favs} onFav={toggleFav} onBookSelect={setSelectedBook}/>;
      case "dashboard":     return <DashboardScreen {...sp} myBooks={myBooks} books={books}/>;
      case "myBooks":       return <MyBooksScreen {...sp} myBooks={myBooks} setMyBooks={setMyBooks} onBookSelect={setSelectedBook}/>;
      case "chatbot":       return <ChatbotScreen {...sp} myBooks={myBooks} setMyBooks={setMyBooks}/>;
      case "notifications": return <NotificationsScreen {...sp} notifs={notifs} setNotifs={setNotifs}/>;
      case "badges":        return <BadgesScreen {...sp} myBooks={myBooks}/>;
      case "about":         return <AboutScreen {...sp}/>;
      case "faqs":          return <FAQsScreen {...sp}/>;
      default:              return <SplashScreen {...sp}/>;
    }
  };
  return (
   <div style={{ minHeight: "100vh", background: "#", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", }}>
       <Styles/>
      <div style={{ width: 340, height: "95vh", background: C.bg, borderRadius: 48, boxShadow: "0 50px 120px rgba(0,0,0,0.8), inset 0 0 0 2px rgba(255,255,255,0.06), 0 0 0 10px #111", overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }}>
        {/* Dynamic island */}
        <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", width: 118, height: 34, background: "#111", borderRadius: 20, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
          <div style={{ width: 10, height: 10, background: "#2a2a2a", borderRadius: "50%", border: "2px solid #3a3a3a" }}/>
          <div style={{ width: 7, height: 7, background: "#0D3D1A", borderRadius: "50%", boxShadow: "0 0 5px #1D5E3A" }}/>
        </div>
        <div style={{ flexShrink: 0, paddingTop: 6 }}><StatusBar/></div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
          {render()}
          {toast && <Toast msg={toast} onDone={() => setToast("")}/>}
        </div>
        <div style={{ background: C.bgCard, padding: "6px 0 14px", display: "flex", justifyContent: "center", flexShrink: 0, borderTop: `1px solid ${C.border}` }}>
          <div style={{ width: 130, height: 5, background: "#C8C0B8", borderRadius: 3 }}/>
        </div>
      </div>
    </div>
  );
}