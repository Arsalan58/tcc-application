import { useState, useRef, useEffect } from "react";
import Restaurant from "./Restaurant";
import Light from "./TCCBooksLight";

const C = {
  primary: "#1B4332",
  primaryLight: "#2D6A4F",
  primaryDark: "#0D2B1F",
  accent: "#D4A853",
  accentLight: "#F0C87A",
  bg: "#FAFAF7",
  bgCard: "#FFFFFF",
  bgMuted: "#F2F0EB",
  text: "#1A1A1A",
  textMuted: "#6B7280",
  textLight: "#9CA3AF",
  border: "#E5E2DA",
  success: "#059669",
  warning: "#D97706",
  danger: "#DC2626",
  info: "#2563EB",
};

// ─── SHARED COMPONENTS ──────────────────────────────────────────────────────

function StatusBar() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  const h = time.getHours() % 12 || 12;
  const m = String(time.getMinutes()).padStart(2, "0");
  const ampm = time.getHours() >= 12 ? "PM" : "AM";
  return (
    <div style={{ background: C.primaryDark, padding: "10px 20px 6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ color: "white", fontSize: 13, fontWeight: 700, fontFamily: "monospace" }}>{h}:{m} {ampm}</span>
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        <span style={{ fontSize: 12 }}>📶</span>
        <span style={{ fontSize: 12 }}>🔋</span>
      </div>
    </div>
  );
}

function Header({ title, back, onBack, right }) {
  return (
    <div style={{ background: C.primary, padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
      {back && (
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "white", fontSize: 16, cursor: "pointer", width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
      )}
      <span style={{ color: "white", fontSize: 16, fontWeight: 800, flex: 1, fontFamily: "Georgia, serif" }}>{title}</span>
      {right}
    </div>
  );
}

function BottomNav({ active, onNav, badge }) {
  const tabs = [
    { id: "feed", icon: "🏠", label: "Feed" },
    { id: "search", icon: "🔍", label: "Search" },
    { id: "dashboard", icon: "📚", label: "Books" },
    { id: "chatbot", icon: "💬", label: "Chat" },
    { id: "profile", icon: "👤", label: "Me" },
  ];
  return (
    <div style={{ background: "white", borderTop: `1px solid ${C.border}`, display: "flex", padding: "8px 0 16px", flexShrink: 0 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onNav(t.id)} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, position: "relative" }}>
          <div style={{ width: 42, height: 32, display: "flex", alignItems: "center", justifyContent: "center", background: active === t.id ? C.primary + "15" : "transparent", borderRadius: 10, transition: "all 0.2s" }}>
            <span style={{ fontSize: 18 }}>{t.icon}</span>
            {t.id === "chatbot" && badge > 0 && (
              <div style={{ position: "absolute", top: 0, right: "calc(50% - 18px)", width: 16, height: 16, background: C.danger, borderRadius: 50, fontSize: 9, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", fontWeight: 700 }}>{badge}</div>
            )}
          </div>
          <span style={{ fontSize: 9, fontFamily: "sans-serif", fontWeight: active === t.id ? 800 : 400, color: active === t.id ? C.primary : C.textLight }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

function BookCard({ book, onPress, onFav, isFav }) {
  const statusColors = { Available: C.success, Borrowed: C.warning, Gifted: C.info, Sold: C.danger };
  const covers = { "The Alchemist": "🏜️", "Atomic Habits": "⚡", "Sapiens": "🦴", "Dune": "🌙", "The Midnight Library": "🌌", "Educated": "🎓", "The Kite Runner": "🪁", "1984": "👁️", "Pride and Prejudice": "💐", "Brave New World": "🧬" };
  const emoji = covers[book.title] || "📖";
  return (
    <div onClick={() => onPress(book)} style={{ background: "white", borderRadius: 16, padding: 14, display: "flex", gap: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", cursor: "pointer", border: `1px solid ${C.border}`, marginBottom: 10, transition: "transform 0.15s", active: { transform: "scale(0.98)" } }}>
      <div style={{ width: 60, height: 84, background: `linear-gradient(135deg, ${C.primaryLight}, ${C.primary})`, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30 }}>{emoji}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{book.title}</div>
        <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 8, fontFamily: "sans-serif" }}>by {book.author}</div>
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          <span style={{ background: C.bgMuted, color: C.textMuted, fontSize: 10, padding: "2px 8px", borderRadius: 20, fontFamily: "sans-serif" }}>{book.genre}</span>
          <span style={{ background: C.bgMuted, color: C.textMuted, fontSize: 10, padding: "2px 8px", borderRadius: 20, fontFamily: "sans-serif" }}>{book.condition}</span>
          <span style={{ background: (statusColors[book.status] || C.textMuted) + "20", color: statusColors[book.status] || C.textMuted, fontSize: 10, padding: "2px 8px", borderRadius: 20, fontFamily: "sans-serif", fontWeight: 700 }}>{book.status}</span>
        </div>
      </div>
      {onFav && (
        <button onClick={e => { e.stopPropagation(); onFav(book.id); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, padding: 4, color: isFav ? "#e74c3c" : C.textLight, flexShrink: 0, alignSelf: "center" }}>
          {isFav ? "❤️" : "🤍"}
        </button>
      )}
    </div>
  );
}

function Input({ label, placeholder, type = "text", value, onChange }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <div style={{ fontSize: 12, color: C.textMuted, fontFamily: "sans-serif", marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
        style={{ width: "100%", background: C.bgMuted, border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "sans-serif", outline: "none", boxSizing: "border-box", transition: "border-color 0.2s" }}
        onFocus={e => e.target.style.borderColor = C.primary}
        onBlur={e => e.target.style.borderColor = C.border}
      />
    </div>
  );
}

function Btn({ label, variant = "primary", icon, onClick, disabled, small }) {
  const styles = {
    primary: { background: disabled ? "#ccc" : C.primary, color: "white" },
    accent: { background: C.accent, color: "white" },
    outline: { background: "transparent", color: C.primary, border: `2px solid ${C.primary}` },
    ghost: { background: C.bgMuted, color: C.text },
    danger: { background: C.danger, color: "white" },
    success: { background: C.success, color: "white" },
  };
  return (
    <button onClick={!disabled ? onClick : undefined} style={{ ...styles[variant], borderRadius: 14, padding: small ? "10px 16px" : "14px 20px", textAlign: "center", fontFamily: "sans-serif", fontWeight: 700, fontSize: small ? 13 : 15, cursor: disabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginBottom: 10, width: "100%", border: styles[variant].border || "none", opacity: disabled ? 0.6 : 1, transition: "all 0.2s" }}>
      {icon && <span>{icon}</span>}{label}
    </button>
  );
}

function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2500); return () => clearTimeout(t); }, []);
  return (
    <div style={{ position: "absolute", bottom: 80, left: 16, right: 16, background: C.primaryDark, color: "white", borderRadius: 14, padding: "14px 18px", fontFamily: "sans-serif", fontSize: 13, zIndex: 999, boxShadow: "0 8px 24px rgba(0,0,0,0.3)", textAlign: "center", fontWeight: 600 }}>
      {msg}
    </div>
  );
}

// ─── APP DATA ────────────────────────────────────────────────────────────────

const INITIAL_BOOKS = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", condition: "Good", status: "Available", owner: "rashid_reads", ownerName: "Rashid Al-Farsi", description: "A magical story about Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure.", rating: 4.2, reviews: 12 },
  { id: 2, title: "Atomic Habits", author: "James Clear", genre: "Self-Help", condition: "Like New", status: "Available", owner: "ali_books", ownerName: "Ali Hassan", description: "Tiny changes, remarkable results. A proven way to build good habits and break bad ones.", rating: 4.8, reviews: 24 },
  { id: 3, title: "Sapiens", author: "Yuval Noah Harari", genre: "History", condition: "Fair", status: "Borrowed", owner: "fatima_reads", ownerName: "Fatima Al-Said", description: "A brief history of humankind — from the Stone Age to the present day.", rating: 4.5, reviews: 18 },
  { id: 4, title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", condition: "Good", status: "Available", owner: "community_lib", ownerName: "Community Library", description: "Set in the distant future, Dune is a sweeping epic about politics, religion, and power.", rating: 4.7, reviews: 31 },
  { id: 5, title: "1984", author: "George Orwell", genre: "Fiction", condition: "Good", status: "Available", owner: "rashid_reads", ownerName: "Rashid Al-Farsi", description: "A haunting dystopian novel about surveillance, repression, and the nature of truth.", rating: 4.6, reviews: 42 },
  { id: 6, title: "Educated", author: "Tara Westover", genre: "Biography", condition: "Like New", status: "Available", owner: "ali_books", ownerName: "Ali Hassan", description: "A memoir about a young girl who leaves her survivalist family to seek an education.", rating: 4.4, reviews: 15 },
  { id: 7, title: "The Kite Runner", author: "Khaled Hosseini", genre: "Fiction", condition: "Good", status: "Gifted", owner: "fatima_reads", ownerName: "Fatima Al-Said", description: "A powerful story of friendship, betrayal, and redemption set in Afghanistan.", rating: 4.5, reviews: 29 },
  { id: 8, title: "Brave New World", author: "Aldous Huxley", genre: "Sci-Fi", condition: "Fair", status: "Available", owner: "community_lib", ownerName: "Community Library", description: "A dystopian novel imagining a future of engineered happiness and loss of freedom.", rating: 4.1, reviews: 20 },
];

const MY_BOOKS_INITIAL = [
  { id: 101, title: "The Midnight Library", author: "Matt Haig", genre: "Fiction", condition: "Like New", status: "Available", description: "Between life and death there is a library — the Midnight Library. This is your story." },
  { id: 102, title: "Pride and Prejudice", author: "Jane Austen", genre: "Classic", condition: "Good", status: "Borrowed", description: "A timeless romantic novel about the Bennett sisters in 19th-century England." },
];

const BOT_FLOWS = {
  start: {
    msg: "Hi Sarah! 👋 I'm your Book Bot. I can help you:\n• List a new book\n• Update a book's status\n• Answer questions\n\nWhat would you like to do?",
    options: ["List a new book", "Update book status", "Something else"]
  },
  list_1: { msg: "Let's list your book! 📚\nWhat is the title?", input: true, next: "list_2" },
  list_2: { msg: "Great! Who is the author?", input: true, next: "list_3" },
  list_3: { msg: "What genre best describes it?", options: ["Fiction", "Non-Fiction", "Sci-Fi", "History", "Self-Help", "Biography", "Classic"] },
  list_4: { msg: "What condition is the book in?", options: ["Like New", "Good", "Fair", "Poor"] },
  list_5: { msg: "How would you like to offer it?", options: ["Borrow", "Gift", "Sell"] },
  list_done: { msg: "✅ Your book has been listed successfully! It's now visible to your community.", options: ["List another book", "Done"] },
  update_1: { msg: "Which book would you like to update? Type the title:", input: true, next: "update_2" },
  update_2: { msg: "What status would you like to set?", options: ["Available", "Borrowed", "Gifted", "Sold"] },
  update_done: { msg: "✅ Book status updated! Your community can see the change.", options: ["Update another", "Done"] },
  other: { msg: "I can help with:\n• Borrowing books\n• Reporting issues\n• Community guidelines\n\nFor more help, visit our FAQs!", options: ["OK, got it"] },
};

// ─── SCREENS ─────────────────────────────────────────────────────────────────

function SplashScreen({ onNav }) {
  return (
    <div style={{ background: `linear-gradient(160deg, ${C.primaryDark} 0%, ${C.primary} 50%, ${C.primaryLight} 100%)`, flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40 }}>
      <div style={{ width: 110, height: 110, background: "rgba(255,255,255,0.12)", borderRadius: 32, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28, fontSize: 56, boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>📚</div>
      <div style={{ color: "white", fontSize: 34, fontWeight: 900, letterSpacing: -1, marginBottom: 6, fontFamily: "Georgia, serif" }}>TCC Books</div>
      <div style={{ color: C.accentLight, fontSize: 15, letterSpacing: 2, fontFamily: "sans-serif", marginBottom: 16, textTransform: "uppercase", fontWeight: 600 }}>Network</div>
      <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, textAlign: "center", marginBottom: 64, fontFamily: "sans-serif", lineHeight: 1.6 }}>Share books. Discover stories.{"\n"}Connect your community.</div>
      <div style={{ width: "100%" }}>
        <button onClick={() => onNav("login")} style={{ width: "100%", background: "white", color: C.primary, borderRadius: 16, padding: "16px", border: "none", fontWeight: 800, fontSize: 16, marginBottom: 12, cursor: "pointer", fontFamily: "sans-serif" }}>Sign In</button>
        <button onClick={() => onNav("signup")} style={{ width: "100%", background: "rgba(255,255,255,0.12)", color: "white", border: "2px solid rgba(255,255,255,0.35)", borderRadius: 16, padding: "16px", fontWeight: 700, fontSize: 16, cursor: "pointer", fontFamily: "sans-serif" }}>Create Account</button>
      </div>
      <div style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, marginTop: 32, fontFamily: "sans-serif" }}>TCC Books Network © 2025</div>
    </div>
  );
}

function LoginScreen({ onNav, onLogin, state, setState }) {
  const [err, setErr] = useState("");
  const doLogin = () => {
    if (!state.email || !state.password) { setErr("Please fill all fields."); return; }
    if (state.password.length < 6) { setErr("Password must be at least 6 characters."); return; }
    setErr("");
    onLogin();
    onNav("feed");
  };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <div style={{ background: `linear-gradient(180deg, ${C.primaryDark}, ${C.primary})`, padding: "48px 24px 36px", textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>📚</div>
        <div style={{ color: "white", fontSize: 24, fontWeight: 800, marginBottom: 4, fontFamily: "Georgia, serif" }}>Welcome Back</div>
        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, fontFamily: "sans-serif" }}>Sign in to your TCC Books account</div>
      </div>
      <div style={{ flex: 1, padding: "28px 24px", background: C.bg, borderRadius: "22px 22px 0 0", marginTop: -20 }}>
        {err && <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px", marginBottom: 16, color: C.danger, fontSize: 13, fontFamily: "sans-serif" }}>{err}</div>}
        <Input label="Email" placeholder="email@example.com" value={state.email || ""} onChange={v => setState(s => ({ ...s, email: v }))} />
        <Input label="Password" type="password" placeholder="Your password" value={state.password || ""} onChange={v => setState(s => ({ ...s, password: v }))} />
        <div style={{ textAlign: "right", marginTop: -4, marginBottom: 20 }}>
          <span onClick={() => onNav("forgot")} style={{ color: C.primary, fontSize: 13, fontFamily: "sans-serif", cursor: "pointer", fontWeight: 600 }}>Forgot Password?</span>
        </div>
        <Btn label="Sign In" onClick={doLogin} />
        <div style={{ textAlign: "center", color: C.textMuted, fontSize: 13, fontFamily: "sans-serif", marginTop: 6 }}>
          New here? <span onClick={() => onNav("signup")} style={{ color: C.primary, fontWeight: 700, cursor: "pointer" }}>Create Account</span>
        </div>
      </div>
    </div>
  );
}

function SignupScreen({ onNav, state, setState }) {
  const [err, setErr] = useState("");
  const [checked, setChecked] = useState(false);
  const doSignup = () => {
    if (!state.signupName || !state.signupEmail || !state.signupPass) { setErr("Please fill all fields."); return; }
    if (state.signupPass.length < 6) { setErr("Password too short."); return; }
    if (!checked) { setErr("Please agree to Terms."); return; }
    setErr("");
    onNav("verify");
  };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Header title="Create Account" back onBack={() => onNav("splash")} />
      <div style={{ flex: 1, padding: "24px", overflowY: "auto" }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: C.primary, marginBottom: 4, fontFamily: "Georgia, serif" }}>Join the Community</div>
        <div style={{ fontSize: 14, color: C.textMuted, marginBottom: 24, fontFamily: "sans-serif" }}>Share books, discover stories</div>
        {err && <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: "10px 14px", marginBottom: 16, color: C.danger, fontSize: 13, fontFamily: "sans-serif" }}>{err}</div>}
        <Input label="Full Name" placeholder="Your name" value={state.signupName || ""} onChange={v => setState(s => ({ ...s, signupName: v }))} />
        <Input label="Email" placeholder="email@example.com" value={state.signupEmail || ""} onChange={v => setState(s => ({ ...s, signupEmail: v }))} />
        <Input label="Password" type="password" placeholder="Min. 6 characters" value={state.signupPass || ""} onChange={v => setState(s => ({ ...s, signupPass: v }))} />
        <div style={{ marginBottom: 20 }}>
          <div onClick={() => setChecked(c => !c)} style={{ background: C.bgMuted, borderRadius: 12, padding: "13px 16px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${checked ? C.primary : C.border}`, background: checked ? C.primary : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", flexShrink: 0 }}>
              {checked && <span style={{ color: "white", fontSize: 13, fontWeight: 700 }}>✓</span>}
            </div>
            <span style={{ fontSize: 13, color: C.textMuted, fontFamily: "sans-serif" }}>I agree to Terms & Privacy Policy</span>
          </div>
        </div>
        <Btn label="Create Account" onClick={doSignup} />
        <div style={{ textAlign: "center", color: C.textMuted, fontSize: 13, fontFamily: "sans-serif" }}>
          Already have an account? <span onClick={() => onNav("login")} style={{ color: C.primary, fontWeight: 700, cursor: "pointer" }}>Login</span>
        </div>
      </div>
    </div>
  );
}

function VerifyScreen({ onNav }) {
  const [code, setCode] = useState(["", "", "", ""]);
  const [err, setErr] = useState("");
  const refs = [useRef(), useRef(), useRef(), useRef()];
  const handleKey = (i, v) => {
    if (!/^\d?$/.test(v)) return;
    const n = [...code]; n[i] = v; setCode(n);
    if (v && i < 3) refs[i + 1].current.focus();
  };
  const verify = () => {
    if (code.join("").length < 4) { setErr("Enter the full code."); return; }
    onNav("feed");
  };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Header title="Verify Email" back onBack={() => onNav("signup")} />
      <div style={{ flex: 1, padding: 32, textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 20 }}>📬</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: C.primary, marginBottom: 10, fontFamily: "Georgia, serif" }}>Check Your Email</div>
        <div style={{ fontSize: 14, color: C.textMuted, marginBottom: 6, fontFamily: "sans-serif" }}>We've sent a 4-digit code to your email</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 32, fontFamily: "sans-serif" }}>Enter code: <span style={{ color: C.accent }}>1234</span> (demo)</div>
        {err && <div style={{ color: C.danger, fontSize: 13, fontFamily: "sans-serif", marginBottom: 12 }}>{err}</div>}
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 32 }}>
          {code.map((d, i) => (
            <input key={i} ref={refs[i]} maxLength={1} value={d} onChange={e => handleKey(i, e.target.value)} style={{ width: 60, height: 64, background: C.bgMuted, border: `2px solid ${d ? C.primary : C.border}`, borderRadius: 14, textAlign: "center", fontSize: 26, fontWeight: 800, color: C.text, outline: "none", fontFamily: "sans-serif" }} />
          ))}
        </div>
        <Btn label="Verify & Continue" onClick={verify} />
      </div>
    </div>
  );
}

function ForgotScreen({ onNav }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Header title="Forgot Password" back onBack={() => onNav("login")} />
      <div style={{ flex: 1, padding: 32, textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>{sent ? "✅" : "🔑"}</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: C.primary, marginBottom: 10, fontFamily: "Georgia, serif" }}>{sent ? "Email Sent!" : "Reset Password"}</div>
        <div style={{ fontSize: 14, color: C.textMuted, marginBottom: 32, fontFamily: "sans-serif", lineHeight: 1.7 }}>{sent ? `We've sent reset instructions to ${email}.` : "Enter your email and we'll send you instructions to reset your password."}</div>
        {!sent && <>
          <Input label="Email Address" placeholder="email@example.com" value={email} onChange={setEmail} />
          <Btn label="Send Reset Link" onClick={() => email && setSent(true)} disabled={!email} />
        </>}
        {sent && <Btn label="Back to Login" variant="outline" onClick={() => onNav("login")} />}
      </div>
    </div>
  );
}

function FeedScreen({ onNav, books, favs, onFav, user, notifCount, onBookSelect }) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const filters = ["All", "Available", "Fiction", "Self-Help", "Sci-Fi", "History"];
  const filtered = books.filter(b => {
    if (filter === "All") return true;
    if (filter === "Available") return b.status === "Available";
    return b.genre === filter;
  }).filter(b => !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()));
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: C.primary, padding: "14px 18px 0", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <div style={{ color: C.accentLight, fontSize: 12, fontFamily: "sans-serif" }}>Good day,</div>
            <div style={{ color: "white", fontSize: 19, fontWeight: 800, fontFamily: "Georgia, serif" }}>{user.name} 👋</div>
          </div>
          <button onClick={() => onNav("notifications")} style={{ width: 38, height: 38, background: "rgba(255,255,255,0.15)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18, border: "none", position: "relative" }}>
            🔔
            {notifCount > 0 && <div style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, background: C.danger, borderRadius: 50, fontSize: 9, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", fontWeight: 700 }}>{notifCount}</div>}
          </button>
        </div>
        <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 14, padding: "12px 14px", marginBottom: 12, display: "flex", gap: 0 }}>
          <div style={{ flex: 1, textAlign: "center", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
            <div style={{ color: "white", fontSize: 20, fontWeight: 800, fontFamily: "sans-serif" }}>{books.length}</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontFamily: "sans-serif" }}>Community Books</div>
          </div>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ color: "white", fontSize: 20, fontWeight: 800, fontFamily: "sans-serif" }}>{books.filter(b => b.status === "Available").length}</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontFamily: "sans-serif" }}>Available Now</div>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 12, padding: "10px 14px", marginBottom: 10, display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 14 }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search books..." style={{ background: "transparent", border: "none", color: "white", fontSize: 13, fontFamily: "sans-serif", flex: 1, outline: "none" }} />
        </div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 14 }}>
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{ background: filter === f ? C.accent : "rgba(255,255,255,0.12)", color: "white", border: "none", borderRadius: 20, padding: "6px 14px", fontSize: 12, fontFamily: "sans-serif", whiteSpace: "nowrap", cursor: "pointer", fontWeight: filter === f ? 700 : 400 }}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 14 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.textMuted, fontFamily: "sans-serif", marginBottom: 12 }}>{filtered.length} books found</div>
        {filtered.length === 0 && <div style={{ textAlign: "center", padding: 40, color: C.textMuted, fontFamily: "sans-serif" }}>No books found 🔍</div>}
        {filtered.map(b => <BookCard key={b.id} book={b} onPress={book => { onBookSelect(book); onNav("bookDetail"); }} onFav={onFav} isFav={favs.includes(b.id)} />)}
      </div>
      <BottomNav active="feed" onNav={onNav} />
    </div>
  );
}

function SearchScreen({ onNav, books, onBookSelect, onFav, favs }) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const results = books.filter(b => {
    const q = query.toLowerCase();
    const matchQ = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
    const matchG = !genre || b.genre === genre;
    return matchQ && matchG;
  });
  const genres = [...new Set(books.map(b => b.genre))];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: C.primary, padding: "14px 18px", flexShrink: 0 }}>
        <div style={{ color: "white", fontSize: 17, fontWeight: 800, marginBottom: 12, fontFamily: "Georgia, serif" }}>Search Books</div>
        <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 12, padding: "11px 14px", display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 16 }}>🔍</span>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Title, author..." style={{ background: "transparent", border: "none", color: "white", fontSize: 14, fontFamily: "sans-serif", flex: 1, outline: "none" }} />
          {query && <button onClick={() => setQuery("")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: 16 }}>✕</button>}
        </div>
      </div>
      <div style={{ padding: "12px 14px 8px", flexShrink: 0 }}>
        <div style={{ fontSize: 12, color: C.textMuted, fontFamily: "sans-serif", fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>Genre</div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
          <button onClick={() => setGenre("")} style={{ background: !genre ? C.primary : C.bgMuted, color: !genre ? "white" : C.textMuted, border: "none", borderRadius: 20, padding: "6px 14px", fontSize: 12, fontFamily: "sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>All</button>
          {genres.map(g => <button key={g} onClick={() => setGenre(g)} style={{ background: genre === g ? C.primary : C.bgMuted, color: genre === g ? "white" : C.textMuted, border: "none", borderRadius: 20, padding: "6px 14px", fontSize: 12, fontFamily: "sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>{g}</button>)}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 14px 14px" }}>
        <div style={{ fontSize: 13, color: C.textMuted, fontFamily: "sans-serif", marginBottom: 12 }}>{results.length} result{results.length !== 1 ? "s" : ""}</div>
        {results.map(b => <BookCard key={b.id} book={b} onPress={book => { onBookSelect(book); onNav("bookDetail"); }} onFav={onFav} isFav={favs.includes(b.id)} />)}
      </div>
      <BottomNav active="search" onNav={onNav} />
    </div>
  );
}

function BookDetailScreen({ onNav, book, onFav, isFav, onRequest, toast }) {
  const covers = { "The Alchemist": "🏜️", "Atomic Habits": "⚡", "Sapiens": "🦴", "Dune": "🌙", "The Midnight Library": "🌌", "Educated": "🎓", "The Kite Runner": "🪁", "1984": "👁️", "Pride and Prejudice": "💐", "Brave New World": "🧬" };
  const emoji = covers[book?.title] || "📖";
  if (!book) return null;
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: C.primary, padding: "14px 18px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <button onClick={() => onNav("back")} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "white", fontSize: 16, cursor: "pointer", width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
        <span style={{ color: "white", fontSize: 16, fontWeight: 800, flex: 1, fontFamily: "Georgia, serif" }}>Book Details</span>
        <button onClick={() => { onFav(book.id); }} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer" }}>{isFav ? "❤️" : "🤍"}</button>
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ background: `linear-gradient(160deg, ${C.primaryDark}, ${C.primaryLight})`, padding: "24px 20px", display: "flex", gap: 18, alignItems: "flex-end" }}>
          <div style={{ width: 86, height: 118, background: "rgba(255,255,255,0.15)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, flexShrink: 0 }}>{emoji}</div>
          <div>
            <div style={{ color: "white", fontSize: 19, fontWeight: 800, marginBottom: 4, fontFamily: "Georgia, serif" }}>{book.title}</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginBottom: 10, fontFamily: "sans-serif" }}>by {book.author}</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <span style={{ background: "rgba(255,255,255,0.18)", color: "white", fontSize: 11, padding: "3px 10px", borderRadius: 20, fontFamily: "sans-serif" }}>{book.genre}</span>
              <span style={{ background: "rgba(255,255,255,0.18)", color: "white", fontSize: 11, padding: "3px 10px", borderRadius: 20, fontFamily: "sans-serif" }}>{book.condition}</span>
            </div>
          </div>
        </div>
        <div style={{ padding: 18 }}>
          <div style={{ background: "white", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, marginBottom: 16, border: `1px solid ${C.border}` }}>
            <div style={{ width: 42, height: 42, background: C.primary, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>👤</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{book.ownerName}</div>
              <div style={{ fontSize: 12, color: C.textMuted, fontFamily: "sans-serif" }}>@{book.owner}</div>
            </div>
            <div style={{ background: (book.status === "Available" ? C.success : C.warning) + "20", color: book.status === "Available" ? C.success : C.warning, fontSize: 11, padding: "4px 10px", borderRadius: 20, fontFamily: "sans-serif", fontWeight: 700 }}>{book.status}</div>
          </div>
          <div style={{ fontSize: 13, color: C.textMuted, fontFamily: "sans-serif", lineHeight: 1.7, marginBottom: 16 }}>{book.description}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: 15, color: i <= Math.round(book.rating) ? C.accent : C.border }}>★</span>)}</div>
            <span style={{ fontFamily: "sans-serif", fontSize: 13, color: C.textMuted }}>{book.rating} · {book.reviews} reviews</span>
            <span onClick={() => onNav("review")} style={{ marginLeft: "auto", color: C.primary, fontSize: 13, fontFamily: "sans-serif", fontWeight: 700, cursor: "pointer" }}>Write Review</span>
          </div>
          {book.status === "Available" ? <>
            <Btn label="Request to Borrow" icon="📤" onClick={() => onRequest("Borrow", book.title)} />
            <Btn label="Take as Gift" variant="outline" icon="🎁" onClick={() => onRequest("Gift", book.title)} />
            <Btn label="Request to Buy" variant="accent" icon="🛒" onClick={() => onRequest("Buy", book.title)} />
          </> : <div style={{ background: C.bgMuted, borderRadius: 14, padding: "16px", textAlign: "center", fontFamily: "sans-serif", color: C.textMuted, fontSize: 14 }}>This book is currently not available</div>}
        </div>
      </div>
    </div>
  );
}

function ReviewScreen({ onNav, book, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const covers = { "The Alchemist": "🏜️", "Atomic Habits": "⚡", "Sapiens": "🦴", "Dune": "🌙" };
  const ratingLabels = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Header title="Leave a Review" back onBack={() => onNav("back")} />
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
        {book && <div style={{ background: "white", borderRadius: 14, padding: 14, display: "flex", gap: 12, alignItems: "center", marginBottom: 24, border: `1px solid ${C.border}` }}>
          <div style={{ width: 52, height: 70, background: `linear-gradient(135deg, ${C.primaryLight}, ${C.primary})`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{covers[book.title] || "📖"}</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: C.text }}>{book.title}</div>
            <div style={{ fontSize: 13, color: C.textMuted, fontFamily: "sans-serif" }}>{book.author}</div>
          </div>
        </div>}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 14, fontFamily: "sans-serif" }}>How would you rate this book?</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
            {[1,2,3,4,5].map(i => <span key={i} onClick={() => setRating(i)} style={{ fontSize: 38, cursor: "pointer", color: i <= rating ? C.accent : C.border, transition: "color 0.15s" }}>★</span>)}
          </div>
          {rating > 0 && <div style={{ fontSize: 14, color: C.accent, fontWeight: 700, marginTop: 8, fontFamily: "sans-serif" }}>{ratingLabels[rating]}</div>}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 8, fontFamily: "sans-serif" }}>Your Review</div>
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Share your thoughts about this book..." style={{ width: "100%", background: C.bgMuted, border: `1.5px solid ${C.border}`, borderRadius: 14, padding: 16, minHeight: 120, fontSize: 13, color: C.text, fontFamily: "sans-serif", lineHeight: 1.6, resize: "none", outline: "none", boxSizing: "border-box" }} onFocus={e => e.target.style.borderColor = C.primary} onBlur={e => e.target.style.borderColor = C.border} />
        </div>
        <div style={{ marginTop: 20 }}>
          <Btn label="Submit Review" onClick={() => { if (rating && text) { onSubmit(); onNav("back"); } }} disabled={!rating || !text} />
          <Btn label="Cancel" variant="ghost" onClick={() => onNav("back")} />
        </div>
      </div>
    </div>
  );
}

function ProfileScreen({ onNav, user, myBooks, setUser }) {
  const listed = myBooks.length;
  const level = listed <= 5 ? { name: "Bronze Reader", icon: "🥉", lvl: 1 } : listed <= 20 ? { name: "Silver Reader", icon: "🥈", lvl: 2 } : listed <= 50 ? { name: "Gold Reader", icon: "🥇", lvl: 3 } : { name: "Diamond Reader", icon: "💎", lvl: 4 };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ overflowY: "auto", flex: 1 }}>
        <div style={{ background: `linear-gradient(160deg, ${C.primaryDark}, ${C.primaryLight})`, padding: "28px 24px 40px", textAlign: "center" }}>
          <div style={{ width: 78, height: 78, background: "rgba(255,255,255,0.18)", borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 10px" }}>👤</div>
          <div style={{ color: "white", fontSize: 20, fontWeight: 800, marginBottom: 4, fontFamily: "Georgia, serif" }}>{user.name}</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontFamily: "sans-serif", marginBottom: 18 }}>@{user.username} · Muscat Community</div>
          <div style={{ display: "flex", background: "rgba(255,255,255,0.1)", borderRadius: 16, padding: 4 }}>
            {[[myBooks.length, "Listed"], [myBooks.filter(b => b.status === "Borrowed").length, "Shared"], [2, "Borrowed"]].map(([v, l], i) => (
              <div key={i} style={{ flex: 1, textAlign: "center", padding: "10px 0", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.18)" : "none" }}>
                <div style={{ color: "white", fontSize: 18, fontWeight: 800, fontFamily: "sans-serif" }}>{v}</div>
                <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 11, fontFamily: "sans-serif" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "0 18px 18px", marginTop: -20, background: C.bg, borderRadius: "22px 22px 0 0" }}>
          <div onClick={() => onNav("badges")} style={{ background: "white", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, marginBottom: 16, border: `1px solid ${C.border}`, cursor: "pointer", marginTop: 20 }}>
            <span style={{ fontSize: 30 }}>{level.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{level.name}</div>
              <div style={{ fontSize: 12, color: C.textMuted, fontFamily: "sans-serif" }}>Level {level.lvl} · {myBooks.length} books listed</div>
            </div>
            <span style={{ background: C.primary + "15", color: C.primary, fontSize: 11, padding: "4px 10px", borderRadius: 20, fontFamily: "sans-serif", fontWeight: 600 }}>View →</span>
          </div>
          {[
            { icon: "✏️", label: "Edit Profile", action: () => onNav("editProfile") },
            { icon: "❤️", label: "Favourite Books", action: () => onNav("favourites") },
            { icon: "🏅", label: "Badges & Levels", action: () => onNav("badges") },
            { icon: "ℹ️", label: "About Us", action: () => onNav("about") },
            { icon: "❓", label: "FAQs", action: () => onNav("faqs") },
            { icon: "🚪", label: "Sign Out", action: () => onNav("splash"), danger: true },
          ].map((item, i) => (
            <div key={i} onClick={item.action} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: `1px solid ${C.border}`, cursor: "pointer" }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span style={{ fontFamily: "sans-serif", fontSize: 14, color: item.danger ? C.danger : C.text, fontWeight: item.danger ? 700 : 400 }}>{item.label}</span>
              <span style={{ marginLeft: "auto", color: C.textLight, fontSize: 18 }}>›</span>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="profile" onNav={onNav} />
    </div>
  );
}

function EditProfileScreen({ onNav, user, setUser, showToast }) {
  const [form, setForm] = useState({ name: user.name, username: user.username, email: user.email, bio: user.bio || "" });
  const save = () => { setUser(u => ({ ...u, ...form })); showToast("✅ Profile updated!"); onNav("back"); };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Header title="Edit Profile" back onBack={() => onNav("back")} right={<button onClick={save} style={{ background: C.accent, border: "none", color: "white", borderRadius: 10, padding: "8px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "sans-serif" }}>Save</button>} />
      <div style={{ flex: 1, overflowY: "auto", padding: 22 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ width: 78, height: 78, background: C.primaryLight, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 10px" }}>👤</div>
          <span style={{ color: C.primary, fontSize: 13, fontFamily: "sans-serif", fontWeight: 700, cursor: "pointer" }}>Change Photo</span>
        </div>
        <Input label="Full Name" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} />
        <Input label="Username" value={form.username} onChange={v => setForm(f => ({ ...f, username: v }))} />
        <Input label="Email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} />
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: C.textMuted, fontFamily: "sans-serif", marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>Bio</div>
          <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} placeholder="Tell us about yourself..." style={{ width: "100%", background: C.bgMuted, border: `1.5px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "sans-serif", resize: "none", outline: "none", boxSizing: "border-box", minHeight: 90, lineHeight: 1.6 }} />
        </div>
        <Btn label="Save Changes" onClick={save} />
      </div>
    </div>
  );
}

function FavouritesScreen({ onNav, books, favIds, onFav, onBookSelect }) {
  const favBooks = books.filter(b => favIds.includes(b.id));
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Header title="Favourite Books" back onBack={() => onNav("back")} />
      <div style={{ flex: 1, overflowY: "auto", padding: 14 }}>
        {favBooks.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: C.textMuted, fontFamily: "sans-serif" }}>
            <div style={{ fontSize: 48, marginBottom: 14 }}>🤍</div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: C.text }}>No favourites yet</div>
            <div style={{ fontSize: 13 }}>Tap the heart icon on any book to save it here</div>
          </div>
        ) : <>
          <div style={{ fontSize: 13, color: C.textMuted, fontFamily: "sans-serif", marginBottom: 12 }}>{favBooks.length} saved book{favBooks.length !== 1 ? "s" : ""}</div>
          {favBooks.map(b => <BookCard key={b.id} book={b} onPress={book => { onBookSelect(book); onNav("bookDetail"); }} onFav={onFav} isFav={true} />)}
        </>}
      </div>
    </div>
  );
}

function DashboardScreen({ onNav, myBooks, books }) {
  const all = [...myBooks, ...books.filter(b => b.owner === "me")];
  const stats = [
    [myBooks.length, "Listed", "📚", C.primary],
    [myBooks.filter(b => b.status === "Borrowed").length, "Borrowed Out", "🤝", C.info],
    [myBooks.filter(b => b.status === "Gifted").length, "Gifted", "🎁", C.success],
    [myBooks.filter(b => b.status === "Available").length, "Available", "✅", C.warning],
    [2, "Received", "📤", C.accent],
    [0, "Sold", "💰", C.danger],
  ];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Header title="My Dashboard" />
      <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 14 }}>Activity Summary</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
          {stats.map(([v, l, icon, c], i) => (
            <div key={i} style={{ background: "white", borderRadius: 14, padding: "14px 10px", textAlign: "center", border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: c, fontFamily: "sans-serif" }}>{v}</div>
              <div style={{ fontSize: 10, color: C.textMuted, fontFamily: "sans-serif", marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 14 }}>Quick Actions</div>
        <div onClick={() => onNav("chatbot")} style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.primaryLight})`, borderRadius: 16, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, marginBottom: 12, cursor: "pointer" }}>
          <span style={{ fontSize: 28 }}>➕</span>
          <div>
            <div style={{ color: "white", fontWeight: 700, fontSize: 15 }}>List a New Book</div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, fontFamily: "sans-serif" }}>Chat with our Book Bot</div>
          </div>
          <span style={{ marginLeft: "auto", color: "rgba(255,255,255,0.7)", fontSize: 20 }}>›</span>
        </div>
        <div onClick={() => onNav("myBooks")} style={{ background: "white", border: `2px solid ${C.primary}`, borderRadius: 16, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
          <span style={{ fontSize: 28 }}>📋</span>
          <div>
            <div style={{ color: C.primary, fontWeight: 700, fontSize: 15 }}>Manage My Books</div>
            <div style={{ color: C.textMuted, fontSize: 12, fontFamily: "sans-serif" }}>Update status or details</div>
          </div>
          <span style={{ marginLeft: "auto", color: C.textLight, fontSize: 20 }}>›</span>
        </div>
      </div>
      <BottomNav active="dashboard" onNav={onNav} />
    </div>
  );
}

function MyBooksScreen({ onNav, myBooks, setMyBooks, onBookSelect, showToast }) {
  const [filter, setFilter] = useState("All");
  const filtered = myBooks.filter(b => filter === "All" || b.status === filter);
  const updateStatus = (id, status) => { setMyBooks(bs => bs.map(b => b.id === id ? { ...b, status } : b)); showToast(`✅ Status updated to "${status}"`); };
  const [expandId, setExpandId] = useState(null);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Header title="My Books" back onBack={() => onNav("back")} right={<button onClick={() => onNav("chatbot")} style={{ background: C.accent, border: "none", color: "white", borderRadius: 10, padding: "8px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "sans-serif" }}>+ Add</button>} />
      <div style={{ padding: "12px 14px 8px", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
          {["All", "Available", "Borrowed", "Gifted", "Sold"].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ background: filter === f ? C.primary : C.bgMuted, color: filter === f ? "white" : C.textMuted, border: "none", borderRadius: 20, padding: "7px 14px", fontSize: 12, fontFamily: "sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 14px 14px" }}>
        {filtered.length === 0 && <div style={{ textAlign: "center", padding: 40, color: C.textMuted, fontFamily: "sans-serif" }}>No books here. <span onClick={() => onNav("chatbot")} style={{ color: C.primary, fontWeight: 700, cursor: "pointer" }}>Add one!</span></div>}
        {filtered.map(b => (
          <div key={b.id}>
            <div onClick={() => setExpandId(expandId === b.id ? null : b.id)} style={{ background: "white", borderRadius: 16, padding: 14, display: "flex", gap: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.06)", border: `1px solid ${C.border}`, marginBottom: expandId === b.id ? 0 : 10, borderBottomLeftRadius: expandId === b.id ? 0 : 16, borderBottomRightRadius: expandId === b.id ? 0 : 16, cursor: "pointer" }}>
              <div style={{ width: 50, height: 68, background: `linear-gradient(135deg, ${C.primaryLight}, ${C.primary})`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>📖</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.title}</div>
                <div style={{ fontSize: 12, color: C.textMuted, fontFamily: "sans-serif", marginBottom: 6 }}>{b.author}</div>
                <span style={{ background: (b.status === "Available" ? C.success : b.status === "Borrowed" ? C.warning : C.info) + "20", color: b.status === "Available" ? C.success : b.status === "Borrowed" ? C.warning : C.info, fontSize: 10, padding: "2px 8px", borderRadius: 20, fontFamily: "sans-serif", fontWeight: 700 }}>{b.status}</span>
              </div>
              <span style={{ color: C.textLight, fontSize: 16, alignSelf: "center" }}>{expandId === b.id ? "▲" : "▼"}</span>
            </div>
            {expandId === b.id && (
              <div style={{ background: C.bgMuted, borderRadius: "0 0 16px 16px", padding: "12px 14px", marginBottom: 10, border: `1px solid ${C.border}`, borderTop: "none", display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Available", "Borrowed", "Gifted", "Sold"].map(s => (
                  <button key={s} onClick={() => { updateStatus(b.id, s); setExpandId(null); }} style={{ background: b.status === s ? C.primary : "white", color: b.status === s ? "white" : C.text, border: `1px solid ${C.border}`, borderRadius: 10, padding: "7px 12px", fontSize: 12, fontFamily: "sans-serif", cursor: "pointer", fontWeight: b.status === s ? 700 : 400 }}>{s}</button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <BottomNav active="dashboard" onNav={onNav} />
    </div>
  );
}

function ChatbotScreen({ onNav, myBooks, setMyBooks, showToast }) {
  const [messages, setMessages] = useState([{ from: "bot", text: BOT_FLOWS.start.msg, options: BOT_FLOWS.start.options }]);
  const [flow, setFlow] = useState("start");
  const [collecting, setCollecting] = useState(null); // { step, data: {} }
  const [input, setInput] = useState("");
  const bottomRef = useRef();
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const addMsg = (from, text, options) => setMessages(m => [...m, { from, text, options }]);

  const handleOption = (opt) => {
    addMsg("user", opt);
    if (opt === "List a new book") {
      setCollecting({ step: "title", data: {} });
      setTimeout(() => addMsg("bot", BOT_FLOWS.list_1.msg), 400);
    } else if (opt === "Update book status") {
      setCollecting({ step: "update_title", data: {} });
      setTimeout(() => addMsg("bot", BOT_FLOWS.update_1.msg), 400);
    } else if (opt === "Something else") {
      setTimeout(() => addMsg("bot", BOT_FLOWS.other.msg, BOT_FLOWS.other.options), 400);
    } else if (opt === "OK, got it" || opt === "Done") {
      setCollecting(null);
      setTimeout(() => addMsg("bot", BOT_FLOWS.start.msg, BOT_FLOWS.start.options), 400);
    } else if (opt === "List another book") {
      setCollecting({ step: "title", data: {} });
      setTimeout(() => addMsg("bot", BOT_FLOWS.list_1.msg), 400);
    } else if (opt === "Update another") {
      setCollecting({ step: "update_title", data: {} });
      setTimeout(() => addMsg("bot", BOT_FLOWS.update_1.msg), 400);
    } else if (collecting?.step === "genre") {
      const d = { ...collecting.data, genre: opt };
      setCollecting({ step: "condition", data: d });
      setTimeout(() => addMsg("bot", BOT_FLOWS.list_4.msg, BOT_FLOWS.list_4.options), 400);
    } else if (collecting?.step === "condition") {
      const d = { ...collecting.data, condition: opt };
      setCollecting({ step: "offer", data: d });
      setTimeout(() => addMsg("bot", BOT_FLOWS.list_5.msg, BOT_FLOWS.list_5.options), 400);
    } else if (collecting?.step === "offer") {
      const d = { ...collecting.data, offer: opt };
      const newBook = { id: Date.now(), title: d.title, author: d.author, genre: d.genre, condition: d.condition, status: "Available", description: "Added via Book Bot." };
      setMyBooks(b => [...b, newBook]);
      setCollecting(null);
      showToast("📚 Book added successfully!");
      setTimeout(() => addMsg("bot", BOT_FLOWS.list_done.msg, BOT_FLOWS.list_done.options), 400);
    } else if (collecting?.step === "update_status") {
      const title = collecting.data.title;
      setMyBooks(bs => bs.map(b => b.title.toLowerCase() === title.toLowerCase() ? { ...b, status: opt } : b));
      setCollecting(null);
      showToast(`✅ "${title}" updated to ${opt}`);
      setTimeout(() => addMsg("bot", BOT_FLOWS.update_done.msg, BOT_FLOWS.update_done.options), 400);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const val = input.trim();
    setInput("");
    addMsg("user", val);
    if (collecting?.step === "title") {
      setCollecting({ step: "author", data: { title: val } });
      setTimeout(() => addMsg("bot", BOT_FLOWS.list_2.msg), 400);
    } else if (collecting?.step === "author") {
      setCollecting({ step: "genre", data: { ...collecting.data, author: val } });
      setTimeout(() => addMsg("bot", BOT_FLOWS.list_3.msg, BOT_FLOWS.list_3.options), 400);
    } else if (collecting?.step === "update_title") {
      const found = myBooks.find(b => b.title.toLowerCase().includes(val.toLowerCase()));
      if (found) {
        setCollecting({ step: "update_status", data: { title: found.title } });
        setTimeout(() => addMsg("bot", `Found "${found.title}"! What status should it be?`, BOT_FLOWS.update_2.options), 400);
      } else {
        setTimeout(() => addMsg("bot", `I couldn't find "${val}" in your books. Try the exact title.`), 400);
      }
    } else {
      setTimeout(() => addMsg("bot", "I'm not sure I understood. Let me show you what I can help with!", BOT_FLOWS.start.options), 400);
      setCollecting(null);
    }
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: C.primary, padding: "14px 18px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <div style={{ width: 38, height: 38, background: C.accent, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🤖</div>
        <div>
          <div style={{ color: "white", fontWeight: 700, fontSize: 15, fontFamily: "Georgia, serif" }}>Book Bot</div>
          <div style={{ color: C.accentLight, fontSize: 11, fontFamily: "sans-serif" }}>● Online · Here to help</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.map((m, i) => (
          <div key={i}>
            <div style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start", marginBottom: 4 }}>
              {m.from === "bot" && <div style={{ width: 28, height: 28, background: C.accent, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, marginRight: 8, flexShrink: 0, alignSelf: "flex-end" }}>🤖</div>}
              <div style={{ maxWidth: "78%", background: m.from === "user" ? C.primary : "white", color: m.from === "user" ? "white" : C.text, borderRadius: m.from === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", padding: "11px 15px", fontSize: 13, fontFamily: "sans-serif", lineHeight: 1.55, border: m.from === "bot" ? `1px solid ${C.border}` : "none", whiteSpace: "pre-line" }}>
                {m.text}
              </div>
            </div>
            {m.options && i === messages.length - 1 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingLeft: 36, marginTop: 6 }}>
                {m.options.map((opt, oi) => (
                  <button key={oi} onClick={() => handleOption(opt)} style={{ background: "white", border: `1.5px solid ${C.primary}`, color: C.primary, borderRadius: 20, padding: "8px 14px", fontSize: 12, fontFamily: "sans-serif", fontWeight: 700, cursor: "pointer" }}>{opt}</button>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div style={{ background: "white", padding: "10px 14px", display: "flex", gap: 10, alignItems: "center", borderTop: `1px solid ${C.border}`, flexShrink: 0 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()} placeholder="Type a reply..." style={{ flex: 1, background: C.bgMuted, border: "none", borderRadius: 22, padding: "11px 16px", fontSize: 13, fontFamily: "sans-serif", outline: "none", color: C.text }} />
        <button onClick={handleSend} style={{ width: 42, height: 42, background: C.primary, border: "none", borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16, flexShrink: 0 }}>➤</button>
      </div>
      <BottomNav active="chatbot" onNav={onNav} />
    </div>
  );
}

function NotificationsScreen({ onNav, notifs, setNotifs }) {
  const markAll = () => setNotifs(ns => ns.map(n => ({ ...n, unread: false })));
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Header title="Notifications" back onBack={() => onNav("back")} right={<button onClick={markAll} style={{ background: "none", border: "none", color: C.accentLight, fontSize: 12, cursor: "pointer", fontFamily: "sans-serif", fontWeight: 600 }}>Mark all read</button>} />
      <div style={{ flex: 1, overflowY: "auto", padding: 14 }}>
        {notifs.map((n, i) => (
          <div key={i} onClick={() => setNotifs(ns => ns.map((nn, ii) => ii === i ? { ...nn, unread: false } : nn))} style={{ background: n.unread ? C.primary + "08" : "white", borderRadius: 14, padding: "14px 14px", display: "flex", gap: 12, marginBottom: 10, border: `1px solid ${n.unread ? C.primary + "30" : C.border}`, cursor: "pointer", transition: "all 0.2s" }}>
            <div style={{ width: 44, height: 44, background: C.bgMuted, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{n.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 3 }}>{n.title}</div>
              <div style={{ fontSize: 12, color: C.textMuted, fontFamily: "sans-serif", lineHeight: 1.5 }}>{n.body}</div>
              <div style={{ fontSize: 11, color: C.textLight, fontFamily: "sans-serif", marginTop: 5 }}>{n.time}</div>
            </div>
            {n.unread && <div style={{ width: 9, height: 9, background: C.primary, borderRadius: 50, flexShrink: 0, marginTop: 4 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function BadgesScreen({ onNav, myBooks }) {
  const count = myBooks.length;
  const badges = [
    { icon: "🥉", name: "Bronze Reader", desc: "List 1–5 books", range: "1-5 books", earned: count >= 1, threshold: 1 },
    { icon: "🥈", name: "Silver Reader", desc: "List 6–20 books", range: "6-20 books", earned: count >= 6, threshold: 6 },
    { icon: "🥇", name: "Gold Reader", desc: "List 21–50 books", range: "21-50 books", earned: count >= 21, threshold: 21 },
    { icon: "💎", name: "Diamond Reader", desc: "List 51+ books", range: "51+ books", earned: count >= 51, threshold: 51 },
  ];
  const current = badges.filter(b => b.earned).slice(-1)[0] || badges[0];
  const next = badges.find(b => !b.earned);
  const progress = next ? Math.min((count / next.threshold) * 100, 100) : 100;
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Header title="Badges & Levels" back onBack={() => onNav("back")} />
      <div style={{ flex: 1, overflowY: "auto", padding: 18 }}>
        <div style={{ background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primaryLight})`, borderRadius: 20, padding: "22px 20px", textAlign: "center", marginBottom: 22 }}>
          <div style={{ fontSize: 50, marginBottom: 8 }}>{current.icon}</div>
          <div style={{ color: "white", fontSize: 20, fontWeight: 800, marginBottom: 4, fontFamily: "Georgia, serif" }}>{current.name}</div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, fontFamily: "sans-serif", marginBottom: 16 }}>You've listed {count} book{count !== 1 ? "s" : ""}</div>
          {next && <>
            <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 10, height: 10, marginBottom: 8, overflow: "hidden" }}>
              <div style={{ background: C.accent, height: 10, borderRadius: 10, width: `${progress}%`, transition: "width 0.5s" }} />
            </div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, fontFamily: "sans-serif" }}>{next.threshold - count} more books to reach {next.name}</div>
          </>}
          {!next && <div style={{ color: C.accentLight, fontSize: 13, fontFamily: "sans-serif", fontWeight: 700 }}>🏆 Maximum level reached!</div>}
        </div>
        {badges.map((b, i) => (
          <div key={i} style={{ background: b.earned ? "white" : C.bgMuted, borderRadius: 16, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, marginBottom: 12, border: `1.5px solid ${b.earned ? C.accent + "60" : C.border}`, opacity: b.earned ? 1 : 0.55 }}>
            <span style={{ fontSize: 36 }}>{b.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: C.text }}>{b.name}</div>
              <div style={{ fontSize: 12, color: C.textMuted, fontFamily: "sans-serif" }}>{b.range}</div>
            </div>
            {b.earned ? <div style={{ background: C.success + "20", color: C.success, fontSize: 11, padding: "5px 12px", borderRadius: 20, fontFamily: "sans-serif", fontWeight: 700 }}>Earned ✓</div>
              : <div style={{ background: C.bgMuted, color: C.textLight, fontSize: 11, padding: "5px 12px", borderRadius: 20, fontFamily: "sans-serif" }}>Locked</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutScreen({ onNav }) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Header title="About Us" back onBack={() => onNav("back")} />
      <div style={{ flex: 1, overflowY: "auto", padding: 24, textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 14 }}>📚</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: C.primary, marginBottom: 8, fontFamily: "Georgia, serif" }}>TCC Books Network</div>
        <div style={{ fontSize: 13, color: C.textMuted, fontFamily: "sans-serif", lineHeight: 1.8, marginBottom: 26 }}>TCC Books Network connects book lovers across communities. Share, borrow, gift, or sell books — and help stories find new readers. We believe every book deserves to be read more than once.</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          {[["1,247", "Books Listed"], ["342", "Active Readers"], ["15", "Communities"], ["892", "Books Shared"]].map(([v, l], i) => (
            <div key={i} style={{ background: "white", borderRadius: 14, padding: "16px", border: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: C.primary, fontFamily: "sans-serif" }}>{v}</div>
              <div style={{ fontSize: 12, color: C.textMuted, fontFamily: "sans-serif" }}>{l}</div>
            </div>
          ))}
        </div>
        <Btn label="Contact Us" variant="outline" icon="✉️" onClick={() => {}} />
      </div>
    </div>
  );
}

function FAQsScreen({ onNav }) {
  const [open, setOpen] = useState(null);
  const faqs = [
    { q: "How do I list a book?", a: "Go to Dashboard and tap 'List a New Book'. Our chatbot will guide you step-by-step through the listing process." },
    { q: "How does borrowing work?", a: "Tap 'Request to Borrow' on any available book. The owner receives a notification and you can coordinate through the chatbot." },
    { q: "What are the badges for?", a: "Badges reward you for listing books. Bronze (1-5), Silver (6-20), Gold (21-50), Diamond (51+)." },
    { q: "Can I sell my books?", a: "Yes! When listing via the chatbot, choose 'Sell' as your offer type to make the book available for purchase." },
    { q: "How do I save favourite books?", a: "Tap the heart icon ❤️ on any book to add it to your Favourites list, accessible from your Profile." },
  ];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Header title="FAQs" back onBack={() => onNav("back")} />
      <div style={{ flex: 1, overflowY: "auto", padding: 14 }}>
        {faqs.map((f, i) => (
          <div key={i} onClick={() => setOpen(open === i ? null : i)} style={{ background: "white", borderRadius: 14, padding: "14px 16px", marginBottom: 10, border: `1px solid ${open === i ? C.primary : C.border}`, cursor: "pointer", transition: "border-color 0.2s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: open === i ? C.primary : C.text, fontFamily: "sans-serif", flex: 1, marginRight: 8 }}>{f.q}</div>
              <span style={{ color: C.textLight, fontSize: 16, transition: "transform 0.2s", transform: open === i ? "rotate(180deg)" : "none" }}>▼</span>
            </div>
            {open === i && <div style={{ fontSize: 13, color: C.textMuted, fontFamily: "sans-serif", lineHeight: 1.7, marginTop: 10, borderTop: `1px solid ${C.border}`, paddingTop: 10 }}>{f.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("splash");
  const [history, setHistory] = useState(["splash"]);
  const [books, setBooks] = useState(INITIAL_BOOKS);
  const [myBooks, setMyBooks] = useState(MY_BOOKS_INITIAL);
  const [favs, setFavs] = useState([1, 4]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loginState, setLoginState] = useState({ email: "", password: "" });
  const [user, setUser] = useState({ name: "Sarah Ahmed", username: "sarah_reads", email: "sarah@example.com", bio: "Book lover & storyteller 📚" });
  const [notifs, setNotifs] = useState([
    { icon: "💬", title: "New Message", body: "Rashid wants to borrow 'The Alchemist'", time: "2m ago", unread: true },
    { icon: "✅", title: "Request Accepted", body: "Your borrow request for 'Dune' was approved", time: "1h ago", unread: true },
    { icon: "📚", title: "New Book in Community", body: "Ali listed 'Educated' by Tara Westover", time: "3h ago", unread: false },
    { icon: "⏰", title: "Return Reminder", body: "Please return 'Atomic Habits' by this Friday", time: "1d ago", unread: false },
    { icon: "🎁", title: "Gift Available", body: "Fatima is gifting 'The Kite Runner'", time: "2d ago", unread: false },
  ]);
  const [toast, setToast] = useState("");
  const [prevScreen, setPrevScreen] = useState(null);

  const showToast = (msg) => setToast(msg);

  const navigate = (s) => {
    if (s === "back") {
      const newHist = history.slice(0, -1);
      setHistory(newHist);
      setScreen(newHist[newHist.length - 1] || "feed");
    } else {
      setPrevScreen(screen);
      setHistory(h => [...h, s]);
      setScreen(s);
    }
  };

  const toggleFav = (id) => setFavs(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  const unreadCount = notifs.filter(n => n.unread).length;

  const handleRequest = (type, title) => {
    showToast(`✅ ${type} request sent for "${title}"!`);
    setNotifs(ns => [{ icon: type === "Borrow" ? "📤" : type === "Gift" ? "🎁" : "🛒", title: `${type} Request Sent`, body: `You requested to ${type.toLowerCase()} "${title}"`, time: "just now", unread: false }, ...ns]);
  };

  const allBooks = [...books, ...myBooks.map(b => ({ ...b, owner: "me", ownerName: user.name }))];

  const screenProps = { onNav: navigate, showToast };

  const renderScreen = () => {
    switch (screen) {
      case "splash": return <SplashScreen {...screenProps} />;
      case "login": return <LoginScreen {...screenProps} onLogin={() => {}} state={loginState} setState={setLoginState} />;
      case "signup": return <SignupScreen {...screenProps} state={loginState} setState={setLoginState} />;
      case "verify": return <VerifyScreen {...screenProps} />;
      case "forgot": return <ForgotScreen {...screenProps} />;
      case "feed": return <FeedScreen {...screenProps} books={allBooks} favs={favs} onFav={toggleFav} user={user} notifCount={unreadCount} onBookSelect={setSelectedBook} />;
      case "search": return <SearchScreen {...screenProps} books={allBooks} onBookSelect={setSelectedBook} onFav={toggleFav} favs={favs} />;
      case "bookDetail": return <BookDetailScreen {...screenProps} book={selectedBook} onFav={toggleFav} isFav={selectedBook && favs.includes(selectedBook.id)} onRequest={handleRequest} />;
      case "review": return <ReviewScreen {...screenProps} book={selectedBook} onSubmit={() => showToast("✅ Review submitted!")} />;
      case "profile": return <ProfileScreen {...screenProps} user={user} myBooks={myBooks} setUser={setUser} />;
      case "editProfile": return <EditProfileScreen {...screenProps} user={user} setUser={setUser} />;
      case "favourites": return <FavouritesScreen {...screenProps} books={allBooks} favIds={favs} onFav={toggleFav} onBookSelect={setSelectedBook} />;
      case "dashboard": return <DashboardScreen {...screenProps} myBooks={myBooks} books={books} />;
      case "myBooks": return <MyBooksScreen {...screenProps} myBooks={myBooks} setMyBooks={setMyBooks} onBookSelect={setSelectedBook} />;
      case "chatbot": return <ChatbotScreen {...screenProps} myBooks={myBooks} setMyBooks={setMyBooks} />;
      case "notifications": return <NotificationsScreen {...screenProps} notifs={notifs} setNotifs={setNotifs} />;
      case "badges": return <BadgesScreen {...screenProps} myBooks={myBooks} />;
      case "about": return <AboutScreen {...screenProps} />;
      case "faqs": return <FAQsScreen {...screenProps} />;
      default: return <SplashScreen {...screenProps} />;
    }
  };

  return (
  <Light/>  );
}
