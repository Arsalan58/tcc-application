import { useState } from "react";

const COLORS = {
  primary: "#1B4332",
  primaryLight: "#2D6A4F",
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

const screens = [
  "splash", "signup", "verify", "login", "forgot",
  "feed", "search", "bookDetail", "review",
  "profile", "editProfile", "favourites",
  "dashboard", "myBooks",
  "chatbot",
  "notifications",
  "badges",
  "about", "faqs"
];

const screenLabels = {
  splash: "Splash", signup: "Sign Up", verify: "Verify Email", login: "Login", forgot: "Forgot Password",
  feed: "Community Feed", search: "Search", bookDetail: "Book Detail", review: "Leave Review",
  profile: "My Profile", editProfile: "Edit Profile", favourites: "Favourites",
  dashboard: "Dashboard", myBooks: "My Books",
  chatbot: "ChatBot",
  notifications: "Notifications",
  badges: "Badges & Levels",
  about: "About Us", faqs: "FAQs"
};

const screenGroups = [
  { label: "Auth", screens: ["splash","signup","verify","login","forgot"] },
  { label: "Discover", screens: ["feed","search","bookDetail","review"] },
  { label: "Profile", screens: ["profile","editProfile","favourites","badges"] },
  { label: "Books", screens: ["dashboard","myBooks"] },
  { label: "Chat & Notif", screens: ["chatbot","notifications"] },
  { label: "Info", screens: ["about","faqs"] },
];

function Phone({ children, statusBar = true }) {
  return (
    <div style={{
      width: 375, minHeight: 700, background: COLORS.bg, borderRadius: 40,
      boxShadow: "0 30px 80px rgba(0,0,0,0.25), inset 0 0 0 2px #333",
      overflow: "hidden", position: "relative", fontFamily: "'Georgia', serif",
      display: "flex", flexDirection: "column"
    }}>
      {statusBar && (
        <div style={{ background: COLORS.primary, padding: "12px 24px 8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "white", fontSize: 12, fontFamily: "monospace" }}>9:41</span>
          <div style={{ width: 80, height: 14, background: "rgba(255,255,255,0.15)", borderRadius: 10 }} />
          <div style={{ display: "flex", gap: 4 }}>
            {[1,2,3].map(i => <div key={i} style={{ width: 4, height: 4+i*2, background: "white", borderRadius: 1 }} />)}
          </div>
        </div>
      )}
      <div style={{ flex: 1, overflow: "auto" }}>{children}</div>
    </div>
  );
}

function Header({ title, back, onBack, action }) {
  return (
    <div style={{ background: COLORS.primary, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
      {back && <button onClick={onBack} style={{ background: "none", border: "none", color: "white", fontSize: 20, cursor: "pointer", padding: 0 }}>←</button>}
      <span style={{ color: "white", fontSize: 17, fontWeight: 700, flex: 1, fontFamily: "'Georgia', serif" }}>{title}</span>
      {action && <span style={{ color: COLORS.accentLight, fontSize: 13 }}>{action}</span>}
    </div>
  );
}

function BottomNav({ active, onNav }) {
  const tabs = [
    { id: "feed", icon: "🏠", label: "Feed" },
    { id: "search", icon: "🔍", label: "Search" },
    { id: "dashboard", icon: "📚", label: "Books" },
    { id: "chatbot", icon: "💬", label: "Chat" },
    { id: "profile", icon: "👤", label: "Profile" },
  ];
  return (
    <div style={{ background: "white", borderTop: `1px solid ${COLORS.border}`, display: "flex", padding: "8px 0 12px" }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onNav(t.id)} style={{
          flex: 1, background: "none", border: "none", cursor: "pointer",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
          color: active === t.id ? COLORS.primary : COLORS.textLight,
        }}>
          <span style={{ fontSize: 20 }}>{t.icon}</span>
          <span style={{ fontSize: 10, fontFamily: "sans-serif", fontWeight: active === t.id ? 700 : 400 }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

function BookCard({ title, author, genre, condition, status, cover, onPress }) {
  const statusColors = { Available: COLORS.success, Borrowed: COLORS.warning, Gifted: COLORS.info, Sold: COLORS.danger };
  return (
    <div onClick={onPress} style={{
      background: "white", borderRadius: 14, padding: 14, display: "flex", gap: 12,
      boxShadow: "0 2px 8px rgba(0,0,0,0.07)", cursor: "pointer", border: `1px solid ${COLORS.border}`,
      marginBottom: 12
    }}>
      <div style={{ width: 64, height: 88, background: cover || COLORS.primaryLight, borderRadius: 8, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 28 }}>📖</span>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.text, marginBottom: 3 }}>{title}</div>
        <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 6 }}>by {author}</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ background: COLORS.bgMuted, color: COLORS.textMuted, fontSize: 10, padding: "3px 8px", borderRadius: 20, fontFamily: "sans-serif" }}>{genre}</span>
          <span style={{ background: COLORS.bgMuted, color: COLORS.textMuted, fontSize: 10, padding: "3px 8px", borderRadius: 20, fontFamily: "sans-serif" }}>{condition}</span>
          <span style={{ background: statusColors[status] + "20", color: statusColors[status], fontSize: 10, padding: "3px 8px", borderRadius: 20, fontFamily: "sans-serif", fontWeight: 600 }}>{status}</span>
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, label, icon, color }) {
  return (
    <div style={{ background: "white", borderRadius: 14, padding: "16px 12px", textAlign: "center", border: `1px solid ${COLORS.border}`, flex: 1 }}>
      <div style={{ fontSize: 24, marginBottom: 4 }}>{icon}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: color || COLORS.primary, fontFamily: "sans-serif" }}>{value}</div>
      <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: "sans-serif", marginTop: 2 }}>{label}</div>
    </div>
  );
}

function Input({ label, placeholder, type = "text", value }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <div style={{ fontSize: 13, color: COLORS.textMuted, fontFamily: "sans-serif", marginBottom: 6, fontWeight: 600 }}>{label}</div>}
      <div style={{ background: COLORS.bgMuted, border: `1.5px solid ${COLORS.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: value ? COLORS.text : COLORS.textLight, fontFamily: "sans-serif" }}>
        {value || placeholder}
      </div>
    </div>
  );
}

function Btn({ label, variant = "primary", icon, small }) {
  const styles = {
    primary: { background: COLORS.primary, color: "white" },
    accent: { background: COLORS.accent, color: "white" },
    outline: { background: "transparent", color: COLORS.primary, border: `2px solid ${COLORS.primary}` },
    ghost: { background: COLORS.bgMuted, color: COLORS.text },
    danger: { background: COLORS.danger, color: "white" },
  };
  return (
    <div style={{ ...styles[variant], borderRadius: 14, padding: small ? "10px 16px" : "15px 20px", textAlign: "center", fontFamily: "sans-serif", fontWeight: 700, fontSize: small ? 13 : 15, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 10 }}>
      {icon && <span>{icon}</span>}{label}
    </div>
  );
}

// ─── SCREENS ────────────────────────────────────────────────────────────────

function SplashScreen({ onNav }) {
  return (
    <Phone statusBar={false}>
      <div style={{ background: `linear-gradient(160deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 60%, #52B788 100%)`, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, minHeight: 700 }}>
        <div style={{ width: 100, height: 100, background: "rgba(255,255,255,0.15)", borderRadius: 30, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 28, fontSize: 48 }}>📚</div>
        <div style={{ color: "white", fontSize: 30, fontWeight: 800, textAlign: "center", letterSpacing: -1, marginBottom: 8 }}>TCC Books</div>
        <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 16, textAlign: "center", marginBottom: 60, fontFamily: "sans-serif" }}>Network · Share · Discover</div>
        <div style={{ width: "100%" }}>
          <div onClick={() => onNav("login")} style={{ background: "white", color: COLORS.primary, borderRadius: 16, padding: "16px", textAlign: "center", fontWeight: 800, fontSize: 16, marginBottom: 12, cursor: "pointer", fontFamily: "sans-serif" }}>Login</div>
          <div onClick={() => onNav("signup")} style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "2px solid rgba(255,255,255,0.4)", borderRadius: 16, padding: "16px", textAlign: "center", fontWeight: 700, fontSize: 16, cursor: "pointer", fontFamily: "sans-serif" }}>Create Account</div>
        </div>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, marginTop: 40, fontFamily: "sans-serif" }}>TCC Books Network © 2025</div>
      </div>
    </Phone>
  );
}

function SignupScreen({ onNav }) {
  return (
    <Phone>
      <Header title="Create Account" />
      <div style={{ padding: 24 }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: COLORS.primary, marginBottom: 6 }}>Join the Community</div>
        <div style={{ fontSize: 14, color: COLORS.textMuted, marginBottom: 28, fontFamily: "sans-serif" }}>Share books, discover stories</div>
        <Input label="Full Name" placeholder="Your name" value="Sarah Ahmed" />
        <Input label="Email Address" placeholder="email@example.com" value="sarah@example.com" />
        <Input label="Password" placeholder="Min. 8 characters" value="••••••••" type="password" />
        <Input label="Confirm Password" placeholder="Repeat password" value="••••••••" type="password" />
        <div style={{ marginBottom: 20 }}>
          <div style={{ background: COLORS.bgMuted, borderRadius: 12, padding: "13px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${COLORS.primary}`, background: COLORS.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontSize: 12 }}>✓</span>
            </div>
            <span style={{ fontSize: 13, color: COLORS.textMuted, fontFamily: "sans-serif" }}>I agree to Terms & Privacy Policy</span>
          </div>
        </div>
        <Btn label="Create Account" variant="primary" />
        <div style={{ textAlign: "center", color: COLORS.textMuted, fontSize: 13, fontFamily: "sans-serif", marginTop: 8 }}>
          Already have an account? <span onClick={() => onNav("login")} style={{ color: COLORS.primary, fontWeight: 700, cursor: "pointer" }}>Login</span>
        </div>
      </div>
    </Phone>
  );
}

function VerifyScreen({ onNav }) {
  return (
    <Phone>
      <Header title="Verify Email" back onBack={() => onNav("signup")} />
      <div style={{ padding: 32, textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>📬</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.primary, marginBottom: 12 }}>Check Your Email</div>
        <div style={{ fontSize: 14, color: COLORS.textMuted, marginBottom: 8, fontFamily: "sans-serif" }}>We've sent a verification code to</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, marginBottom: 32, fontFamily: "sans-serif" }}>sarah@example.com</div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 32 }}>
          {["3","7","2","9"].map((d, i) => (
            <div key={i} style={{ width: 60, height: 64, background: COLORS.bgMuted, border: `2px solid ${i===2? COLORS.primary : COLORS.border}`, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, color: COLORS.text }}>{d}</div>
          ))}
        </div>
        <Btn label="Verify & Continue" variant="primary" />
        <div style={{ textAlign: "center", color: COLORS.textMuted, fontSize: 13, fontFamily: "sans-serif", marginTop: 12 }}>
          Didn't receive? <span style={{ color: COLORS.primary, fontWeight: 700, cursor: "pointer" }}>Resend Code</span>
        </div>
      </div>
    </Phone>
  );
}

function LoginScreen({ onNav }) {
  return (
    <Phone>
      <div style={{ background: `linear-gradient(180deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`, padding: "48px 24px 32px", textAlign: "center" }}>
        <div style={{ fontSize: 44, marginBottom: 10 }}>📚</div>
        <div style={{ color: "white", fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Welcome Back</div>
        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, fontFamily: "sans-serif" }}>Sign in to your TCC Books account</div>
      </div>
      <div style={{ padding: 24, marginTop: -16, background: COLORS.bg, borderRadius: "20px 20px 0 0" }}>
        <Input label="Email Address" placeholder="email@example.com" value="sarah@example.com" />
        <Input label="Password" placeholder="Your password" value="••••••••" />
        <div style={{ textAlign: "right", marginTop: -8, marginBottom: 20 }}>
          <span onClick={() => onNav("forgot")} style={{ color: COLORS.primary, fontSize: 13, fontFamily: "sans-serif", cursor: "pointer", fontWeight: 600 }}>Forgot Password?</span>
        </div>
        <Btn label="Sign In" variant="primary" />
        <div style={{ textAlign: "center", color: COLORS.textMuted, fontSize: 13, fontFamily: "sans-serif", marginTop: 8 }}>
          New here? <span onClick={() => onNav("signup")} style={{ color: COLORS.primary, fontWeight: 700, cursor: "pointer" }}>Create Account</span>
        </div>
      </div>
    </Phone>
  );
}

function ForgotScreen({ onNav }) {
  return (
    <Phone>
      <Header title="Forgot Password" back onBack={() => onNav("login")} />
      <div style={{ padding: 32, textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 20 }}>🔑</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: COLORS.primary, marginBottom: 10 }}>Reset Password</div>
        <div style={{ fontSize: 14, color: COLORS.textMuted, marginBottom: 32, fontFamily: "sans-serif", lineHeight: 1.6 }}>Enter your email and we'll send you instructions to reset your password.</div>
        <Input label="Email Address" placeholder="email@example.com" value="" />
        <Btn label="Send Reset Link" variant="primary" />
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <span onClick={() => onNav("login")} style={{ color: COLORS.primary, fontSize: 13, fontFamily: "sans-serif", cursor: "pointer", fontWeight: 600 }}>← Back to Login</span>
        </div>
      </div>
    </Phone>
  );
}

function FeedScreen({ onNav }) {
  const books = [
    { title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", condition: "Good", status: "Available" },
    { title: "Atomic Habits", author: "James Clear", genre: "Self-Help", condition: "Like New", status: "Available" },
    { title: "Sapiens", author: "Yuval Noah Harari", genre: "History", condition: "Fair", status: "Borrowed" },
    { title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", condition: "Good", status: "Available" },
  ];
  return (
    <Phone>
      <div style={{ background: COLORS.primary, padding: "14px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div>
            <div style={{ color: COLORS.accentLight, fontSize: 12, fontFamily: "sans-serif" }}>Good Morning,</div>
            <div style={{ color: "white", fontSize: 18, fontWeight: 800 }}>Sarah 👋</div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <div onClick={() => onNav("notifications")} style={{ width: 38, height: 38, background: "rgba(255,255,255,0.15)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18 }}>🔔</div>
          </div>
        </div>
        {/* Community Summary */}
        <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 14, padding: "14px 16px", marginBottom: 14, display: "flex", gap: 0 }}>
          <div style={{ flex: 1, textAlign: "center", borderRight: "1px solid rgba(255,255,255,0.2)" }}>
            <div style={{ color: "white", fontSize: 22, fontWeight: 800, fontFamily: "sans-serif" }}>1,247</div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, fontFamily: "sans-serif" }}>Platform Books</div>
          </div>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ color: "white", fontSize: 22, fontWeight: 800, fontFamily: "sans-serif" }}>84</div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, fontFamily: "sans-serif" }}>My Community</div>
          </div>
        </div>
        {/* Filter chips */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 14 }}>
          {["All", "Available", "Fiction", "Self-Help", "Like New"].map((f, i) => (
            <div key={f} style={{ background: i === 0 ? COLORS.accent : "rgba(255,255,255,0.15)", color: "white", borderRadius: 20, padding: "6px 14px", fontSize: 12, fontFamily: "sans-serif", whiteSpace: "nowrap", cursor: "pointer", fontWeight: i===0 ? 700 : 400 }}>{f}</div>
          ))}
        </div>
      </div>
      <div style={{ padding: 16, flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, marginBottom: 14 }}>Community Books</div>
        {books.map((b, i) => <BookCard key={i} {...b} onPress={() => onNav("bookDetail")} />)}
      </div>
      <BottomNav active="feed" onNav={onNav} />
    </Phone>
  );
}

function SearchScreen({ onNav }) {
  return (
    <Phone>
      <Header title="Search Books" />
      <div style={{ padding: 16 }}>
        <div style={{ background: COLORS.bgMuted, border: `1.5px solid ${COLORS.border}`, borderRadius: 14, padding: "13px 16px", display: "flex", gap: 10, marginBottom: 20, alignItems: "center" }}>
          <span style={{ fontSize: 18 }}>🔍</span>
          <span style={{ color: COLORS.textLight, fontFamily: "sans-serif", fontSize: 14 }}>Search by title, author, or user ID...</span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.textMuted, fontFamily: "sans-serif", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Recent Searches</div>
        {["The Hobbit", "James Clear", "User: @rashid_reads"].map((s, i) => (
          <div key={i} onClick={() => {}} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: `1px solid ${COLORS.border}`, cursor: "pointer" }}>
            <span style={{ fontSize: 16 }}>{i===2 ? "👤" : "🕐"}</span>
            <span style={{ fontFamily: "sans-serif", fontSize: 14, color: COLORS.text }}>{s}</span>
            <span style={{ marginLeft: "auto", color: COLORS.textLight }}>→</span>
          </div>
        ))}
        <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.textMuted, fontFamily: "sans-serif", marginTop: 24, marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Browse by Genre</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {["Fiction 📖","Non-Fiction 📰","Sci-Fi 🚀","History 🏛️","Self-Help 💡","Biography 🧑"].map((g, i) => (
            <div key={i} style={{ background: "white", border: `1.5px solid ${COLORS.border}`, borderRadius: 12, padding: "10px 16px", fontFamily: "sans-serif", fontSize: 13, color: COLORS.text, cursor: "pointer" }}>{g}</div>
          ))}
        </div>
      </div>
      <BottomNav active="search" onNav={onNav} />
    </Phone>
  );
}

function BookDetailScreen({ onNav }) {
  return (
    <Phone>
      <Header title="Book Details" back onBack={() => onNav("feed")} action="♡ Save" />
      <div style={{ flex: 1 }}>
        <div style={{ background: `linear-gradient(160deg, ${COLORS.primary}, ${COLORS.primaryLight})`, padding: "28px 24px", display: "flex", gap: 20, alignItems: "flex-end" }}>
          <div style={{ width: 90, height: 124, background: "rgba(255,255,255,0.2)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, flexShrink: 0 }}>📖</div>
          <div>
            <div style={{ color: "white", fontSize: 20, fontWeight: 800, marginBottom: 4 }}>The Alchemist</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginBottom: 10, fontFamily: "sans-serif" }}>Paulo Coelho</div>
            <div style={{ display: "flex", gap: 6 }}>
              <span style={{ background: "rgba(255,255,255,0.2)", color: "white", fontSize: 11, padding: "4px 10px", borderRadius: 20, fontFamily: "sans-serif" }}>Fiction</span>
              <span style={{ background: "rgba(255,255,255,0.2)", color: "white", fontSize: 11, padding: "4px 10px", borderRadius: 20, fontFamily: "sans-serif" }}>Like New</span>
            </div>
          </div>
        </div>
        <div style={{ padding: 20 }}>
          {/* Owner */}
          <div style={{ background: "white", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, marginBottom: 16, border: `1px solid ${COLORS.border}` }}>
            <div style={{ width: 42, height: 42, background: COLORS.primary, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>👤</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.text }}>Rashid Al-Farsi</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: "sans-serif" }}>@rashid_reads · Muscat Community</div>
            </div>
            <div style={{ marginLeft: "auto", background: COLORS.success+"20", color: COLORS.success, fontSize: 11, padding: "4px 10px", borderRadius: 20, fontFamily: "sans-serif", fontWeight: 600 }}>Available</div>
          </div>
          {/* Description */}
          <div style={{ fontSize: 13, color: COLORS.textMuted, fontFamily: "sans-serif", lineHeight: 1.7, marginBottom: 16 }}>
            A magical story about Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. A beautiful and inspiring read about following your dreams.
          </div>
          {/* Ratings */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
            <div style={{ display: "flex", gap: 2 }}>{[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: 16, color: i<=4 ? COLORS.accent : COLORS.border }}>★</span>)}</div>
            <span style={{ fontFamily: "sans-serif", fontSize: 13, color: COLORS.textMuted }}>4.0 · 12 reviews</span>
            <span onClick={() => onNav("review")} style={{ marginLeft: "auto", color: COLORS.primary, fontSize: 13, fontFamily: "sans-serif", fontWeight: 700, cursor: "pointer" }}>Write Review</span>
          </div>
          {/* Action buttons */}
          <Btn label="Request to Borrow" variant="primary" icon="📤" />
          <Btn label="Request to Buy" variant="accent" icon="🛒" />
          <Btn label="Take as Gift" variant="outline" icon="🎁" />
        </div>
      </div>
      <BottomNav active="feed" onNav={onNav} />
    </Phone>
  );
}

function ReviewScreen({ onNav }) {
  return (
    <Phone>
      <Header title="Leave a Review" back onBack={() => onNav("bookDetail")} />
      <div style={{ padding: 24 }}>
        <div style={{ background: "white", borderRadius: 14, padding: 16, display: "flex", gap: 14, alignItems: "center", marginBottom: 24, border: `1px solid ${COLORS.border}` }}>
          <div style={{ width: 56, height: 76, background: COLORS.primaryLight, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>📖</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.text }}>The Alchemist</div>
            <div style={{ fontSize: 13, color: COLORS.textMuted, fontFamily: "sans-serif" }}>Paulo Coelho</div>
          </div>
        </div>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 14, fontFamily: "sans-serif" }}>Tap to rate</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
            {[1,2,3,4,5].map(i => <span key={i} style={{ fontSize: 36, cursor: "pointer", color: i<=4 ? COLORS.accent : COLORS.border }}>★</span>)}
          </div>
          <div style={{ fontSize: 14, color: COLORS.accent, fontWeight: 700, marginTop: 8, fontFamily: "sans-serif" }}>Very Good</div>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, marginBottom: 10, fontFamily: "sans-serif" }}>Write your review</div>
          <div style={{ background: COLORS.bgMuted, border: `1.5px solid ${COLORS.border}`, borderRadius: 14, padding: 16, minHeight: 120, fontSize: 14, color: COLORS.textLight, fontFamily: "sans-serif", lineHeight: 1.6 }}>
            Share your thoughts about this book...
          </div>
        </div>
        <div style={{ marginTop: 24 }}>
          <Btn label="Submit Review" variant="primary" />
          <Btn label="Cancel" variant="ghost" />
        </div>
      </div>
    </Phone>
  );
}

function ProfileScreen({ onNav }) {
  return (
    <Phone>
      <div style={{ background: `linear-gradient(160deg, ${COLORS.primary}, ${COLORS.primaryLight})`, padding: "28px 24px 40px", textAlign: "center" }}>
        <div style={{ width: 80, height: 80, background: "rgba(255,255,255,0.2)", borderRadius: 40, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 12px" }}>👤</div>
        <div style={{ color: "white", fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Sarah Ahmed</div>
        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, fontFamily: "sans-serif", marginBottom: 16 }}>@sarah_reads · Muscat Community</div>
        <div style={{ display: "flex", gap: 0, background: "rgba(255,255,255,0.12)", borderRadius: 16, padding: 4, justifyContent: "center" }}>
          {[["12","Listed"],["5","Shared"],["3","Borrowed"]].map(([v,l],i) => (
            <div key={i} style={{ flex: 1, textAlign: "center", padding: "10px 0", borderRight: i<2?"1px solid rgba(255,255,255,0.2)":"none" }}>
              <div style={{ color: "white", fontSize: 18, fontWeight: 800, fontFamily: "sans-serif" }}>{v}</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 11, fontFamily: "sans-serif" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: 20, marginTop: -20, background: COLORS.bg, borderRadius: "20px 20px 0 0" }}>
        {/* Badge */}
        <div onClick={() => onNav("badges")} style={{ background: "white", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, marginBottom: 16, border: `1px solid ${COLORS.border}`, cursor: "pointer" }}>
          <span style={{ fontSize: 28 }}>🥈</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.text }}>Silver Reader</div>
            <div style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: "sans-serif" }}>Level 2 · 12 books listed</div>
          </div>
          <div style={{ background: COLORS.primary+"15", color: COLORS.primary, fontSize: 11, padding: "4px 10px", borderRadius: 20, fontFamily: "sans-serif", fontWeight: 600 }}>View All</div>
        </div>
        {[
          { icon: "✏️", label: "Edit Profile", action: () => onNav("editProfile") },
          { icon: "❤️", label: "Favourite Books", action: () => onNav("favourites") },
          { icon: "📋", label: "Terms & Conditions", action: () => {} },
          { icon: "🔒", label: "Privacy Policy", action: () => {} },
          { icon: "ℹ️", label: "About Us", action: () => onNav("about") },
          { icon: "❓", label: "FAQs", action: () => onNav("faqs") },
          { icon: "🚫", label: "Deactivate Account", action: () => {}, danger: true },
        ].map((item, i) => (
          <div key={i} onClick={item.action} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: `1px solid ${COLORS.border}`, cursor: "pointer" }}>
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            <span style={{ fontFamily: "sans-serif", fontSize: 14, color: item.danger ? COLORS.danger : COLORS.text, fontWeight: item.danger ? 700 : 400 }}>{item.label}</span>
            <span style={{ marginLeft: "auto", color: COLORS.textLight }}>›</span>
          </div>
        ))}
      </div>
      <BottomNav active="profile" onNav={onNav} />
    </Phone>
  );
}

function EditProfileScreen({ onNav }) {
  return (
    <Phone>
      <Header title="Edit Profile" back onBack={() => onNav("profile")} action="Save" />
      <div style={{ padding: 24 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 80, height: 80, background: COLORS.primaryLight, borderRadius: 40, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 10px" }}>👤</div>
          <span style={{ color: COLORS.primary, fontSize: 13, fontFamily: "sans-serif", fontWeight: 700, cursor: "pointer" }}>Change Photo</span>
        </div>
        <Input label="Full Name" value="Sarah Ahmed" />
        <Input label="Username" value="@sarah_reads" />
        <Input label="Email" value="sarah@example.com" />
        <Input label="Community" value="Muscat Community" />
        <Input label="Bio" placeholder="Tell us about yourself..." value="Book lover & storyteller 📚" />
        <Btn label="Save Changes" variant="primary" />
      </div>
    </Phone>
  );
}

function FavouritesScreen({ onNav }) {
  const books = [
    { title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", condition: "Good", status: "Available" },
    { title: "Atomic Habits", author: "James Clear", genre: "Self-Help", condition: "Like New", status: "Borrowed" },
    { title: "Dune", author: "Frank Herbert", genre: "Sci-Fi", condition: "Good", status: "Available" },
  ];
  return (
    <Phone>
      <Header title="Favourite Books" back onBack={() => onNav("profile")} />
      <div style={{ padding: 16 }}>
        <div style={{ fontSize: 13, color: COLORS.textMuted, fontFamily: "sans-serif", marginBottom: 16 }}>{books.length} saved books</div>
        {books.map((b, i) => <BookCard key={i} {...b} onPress={() => onNav("bookDetail")} />)}
      </div>
    </Phone>
  );
}

function DashboardScreen({ onNav }) {
  const stats = [
    ["12","Listed","📚",COLORS.primary],
    ["5","Shared","🤝",COLORS.info],
    ["3","Borrowed","📤",COLORS.warning],
    ["2","Gifted","🎁",COLORS.success],
    ["1","Sold","💰",COLORS.accent],
    ["0","Bought","🛒",COLORS.danger],
  ];
  return (
    <Phone>
      <Header title="My Dashboard" />
      <div style={{ padding: 16 }}>
        {/* Activity grid */}
        <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, marginBottom: 14 }}>Activity Summary</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
          {stats.map(([v,l,icon,c], i) => <StatCard key={i} value={v} label={l} icon={icon} color={c} />)}
        </div>
        {/* Quick actions */}
        <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, marginBottom: 14 }}>Quick Actions</div>
        <div onClick={() => onNav("chatbot")} style={{ background: COLORS.primary, borderRadius: 16, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, marginBottom: 12, cursor: "pointer" }}>
          <span style={{ fontSize: 28 }}>➕</span>
          <div>
            <div style={{ color: "white", fontWeight: 700, fontSize: 15 }}>List a New Book</div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, fontFamily: "sans-serif" }}>Chat with our book bot</div>
          </div>
        </div>
        <div onClick={() => onNav("myBooks")} style={{ background: "white", border: `2px solid ${COLORS.primary}`, borderRadius: 16, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
          <span style={{ fontSize: 28 }}>📋</span>
          <div>
            <div style={{ color: COLORS.primary, fontWeight: 700, fontSize: 15 }}>Manage My Books</div>
            <div style={{ color: COLORS.textMuted, fontSize: 12, fontFamily: "sans-serif" }}>Update status or details</div>
          </div>
        </div>
      </div>
      <BottomNav active="dashboard" onNav={onNav} />
    </Phone>
  );
}

function MyBooksScreen({ onNav }) {
  const books = [
    { title: "The Alchemist", author: "Paulo Coelho", genre: "Fiction", condition: "Good", status: "Available" },
    { title: "Atomic Habits", author: "James Clear", genre: "Self-Help", condition: "Like New", status: "Borrowed" },
    { title: "Sapiens", author: "Yuval Noah Harari", genre: "History", condition: "Fair", status: "Gifted" },
  ];
  return (
    <Phone>
      <Header title="My Books" back onBack={() => onNav("dashboard")} action="+ Add" />
      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {["All","Available","Borrowed","Gifted"].map((f, i) => (
            <div key={f} style={{ background: i===0 ? COLORS.primary : COLORS.bgMuted, color: i===0 ? "white" : COLORS.textMuted, borderRadius: 20, padding: "7px 14px", fontSize: 12, fontFamily: "sans-serif", cursor: "pointer" }}>{f}</div>
          ))}
        </div>
        {books.map((b, i) => <BookCard key={i} {...b} onPress={() => onNav("chatbot")} />)}
      </div>
      <BottomNav active="dashboard" onNav={onNav} />
    </Phone>
  );
}

function ChatbotScreen({ onNav }) {
  const messages = [
    { from: "bot", text: "Hi Sarah! 👋 I'm your Book Bot. I can help you list a book, update status, or process borrow/buy/gift requests. What would you like to do?" },
    { from: "user", text: "I want to list a new book" },
    { from: "bot", text: "Great! Let's list your book. What's the title of the book?" },
    { from: "user", text: "The Midnight Library" },
    { from: "bot", text: "Wonderful choice! Who is the author?" },
  ];
  return (
    <Phone>
      <div style={{ background: COLORS.primary, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 36, height: 36, background: COLORS.accent, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🤖</div>
        <div>
          <div style={{ color: "white", fontWeight: 700, fontSize: 15 }}>Book Bot</div>
          <div style={{ color: COLORS.accentLight, fontSize: 11, fontFamily: "sans-serif" }}>● Online</div>
        </div>
        <div style={{ marginLeft: "auto", color: "rgba(255,255,255,0.6)", fontSize: 11, fontFamily: "sans-serif" }}>Listing a Book</div>
      </div>
      {/* Intents bar */}
      <div style={{ background: COLORS.bgMuted, padding: "10px 16px", display: "flex", gap: 8, overflowX: "auto" }}>
        {["List Book","Update Status","Borrow","Buy","Gift"].map((i, idx) => (
          <div key={i} style={{ background: idx===0 ? COLORS.primary : "white", color: idx===0 ? "white" : COLORS.textMuted, borderRadius: 20, padding: "6px 14px", fontSize: 11, fontFamily: "sans-serif", whiteSpace: "nowrap", border: `1px solid ${COLORS.border}`, cursor: "pointer" }}>{i}</div>
        ))}
      </div>
      <div style={{ flex: 1, padding: 16, display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
            {m.from === "bot" && <div style={{ width: 28, height: 28, background: COLORS.accent, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, marginRight: 8, flexShrink: 0, alignSelf: "flex-end" }}>🤖</div>}
            <div style={{ maxWidth: "72%", background: m.from === "user" ? COLORS.primary : "white", color: m.from === "user" ? "white" : COLORS.text, borderRadius: m.from === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", padding: "12px 16px", fontSize: 13, fontFamily: "sans-serif", lineHeight: 1.5, border: m.from === "bot" ? `1px solid ${COLORS.border}` : "none" }}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      {/* Input */}
      <div style={{ background: "white", padding: "12px 16px", display: "flex", gap: 10, alignItems: "center", borderTop: `1px solid ${COLORS.border}` }}>
        <div style={{ flex: 1, background: COLORS.bgMuted, borderRadius: 24, padding: "12px 18px", fontSize: 14, color: COLORS.textLight, fontFamily: "sans-serif" }}>Type a reply...</div>
        <div style={{ width: 44, height: 44, background: COLORS.primary, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 18 }}>➤</div>
      </div>
      <BottomNav active="chatbot" onNav={onNav} />
    </Phone>
  );
}

function NotificationsScreen({ onNav }) {
  const notifs = [
    { icon: "💬", title: "New Message", body: "Rashid wants to borrow 'The Alchemist'", time: "2m ago", unread: true },
    { icon: "✅", title: "Request Accepted", body: "Your borrow request for 'Dune' was approved", time: "1h ago", unread: true },
    { icon: "📚", title: "New Book in Community", body: "Ali listed 'Educated' by Tara Westover", time: "3h ago", unread: false },
    { icon: "⏰", title: "Return Reminder", body: "Please return 'Atomic Habits' by this Friday", time: "1d ago", unread: false },
    { icon: "🎁", title: "Gift Available", body: "Fatima is gifting 'The Kite Runner'", time: "2d ago", unread: false },
  ];
  return (
    <Phone>
      <Header title="Notifications" back onBack={() => onNav("feed")} action="Mark all read" />
      <div style={{ padding: 16 }}>
        {notifs.map((n, i) => (
          <div key={i} style={{ background: n.unread ? COLORS.primary+"08" : "white", borderRadius: 14, padding: "14px 16px", display: "flex", gap: 12, marginBottom: 10, border: `1px solid ${n.unread ? COLORS.primary+"30" : COLORS.border}`, cursor: "pointer" }}>
            <div style={{ width: 44, height: 44, background: COLORS.bgMuted, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{n.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.text, marginBottom: 3 }}>{n.title}</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: "sans-serif", lineHeight: 1.5 }}>{n.body}</div>
              <div style={{ fontSize: 11, color: COLORS.textLight, fontFamily: "sans-serif", marginTop: 6 }}>{n.time}</div>
            </div>
            {n.unread && <div style={{ width: 8, height: 8, background: COLORS.primary, borderRadius: 50, flexShrink: 0, marginTop: 4 }} />}
          </div>
        ))}
      </div>
      <BottomNav active="feed" onNav={onNav} />
    </Phone>
  );
}

function BadgesScreen({ onNav }) {
  const badges = [
    { icon: "🥉", name: "Bronze Reader", desc: "List 1–5 books", range: "1-5 books", earned: true, level: 1 },
    { icon: "🥈", name: "Silver Reader", desc: "List 6–20 books", range: "6-20 books", earned: true, level: 2 },
    { icon: "🥇", name: "Gold Reader", desc: "List 21–50 books", range: "21-50 books", earned: false, level: 3 },
    { icon: "💎", name: "Diamond Reader", desc: "List 51+ books", range: "51+ books", earned: false, level: 4 },
  ];
  return (
    <Phone>
      <Header title="Badges & Levels" back onBack={() => onNav("profile")} />
      <div style={{ padding: 20 }}>
        <div style={{ background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.primaryLight})`, borderRadius: 20, padding: "24px", textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 52, marginBottom: 10 }}>🥈</div>
          <div style={{ color: "white", fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Silver Reader</div>
          <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, fontFamily: "sans-serif", marginBottom: 16 }}>You've listed 12 books</div>
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, height: 10, marginBottom: 8 }}>
            <div style={{ background: COLORS.accent, height: 10, borderRadius: 10, width: "60%" }} />
          </div>
          <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 12, fontFamily: "sans-serif" }}>8 more books to reach Gold</div>
        </div>
        {badges.map((b, i) => (
          <div key={i} style={{ background: b.earned ? "white" : COLORS.bgMuted, borderRadius: 16, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, marginBottom: 12, border: `1.5px solid ${b.earned ? COLORS.accent+"60" : COLORS.border}`, opacity: b.earned ? 1 : 0.6 }}>
            <span style={{ fontSize: 36 }}>{b.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: COLORS.text }}>{b.name}</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: "sans-serif" }}>{b.range}</div>
            </div>
            {b.earned ? <div style={{ background: COLORS.success+"20", color: COLORS.success, fontSize: 12, padding: "5px 12px", borderRadius: 20, fontFamily: "sans-serif", fontWeight: 700 }}>Earned ✓</div>
            : <div style={{ background: COLORS.bgMuted, color: COLORS.textLight, fontSize: 12, padding: "5px 12px", borderRadius: 20, fontFamily: "sans-serif" }}>Locked</div>}
          </div>
        ))}
      </div>
    </Phone>
  );
}

function AboutScreen({ onNav }) {
  return (
    <Phone>
      <Header title="About Us" back onBack={() => onNav("profile")} />
      <div style={{ padding: 28, textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>📚</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.primary, marginBottom: 8 }}>TCC Books Network</div>
        <div style={{ fontSize: 13, color: COLORS.textMuted, fontFamily: "sans-serif", lineHeight: 1.8, marginBottom: 28 }}>
          TCC Books Network connects book lovers across communities. Share, borrow, gift, or sell books — and help stories find new readers. We believe every book deserves to be read more than once.
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
          {[["1,247","Books Listed"],["342","Active Readers"],["15","Communities"],["892","Books Shared"]].map(([v,l],i) => (
            <div key={i} style={{ background: "white", borderRadius: 14, padding: 16, border: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.primary, fontFamily: "sans-serif" }}>{v}</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, fontFamily: "sans-serif" }}>{l}</div>
            </div>
          ))}
        </div>
        <Btn label="Contact Us" variant="outline" icon="✉️" />
      </div>
    </Phone>
  );
}

function FAQsScreen({ onNav }) {
  const faqs = [
    { q: "How do I list a book?", a: "Go to Dashboard and tap 'List a New Book'. Our chatbot will guide you through the process." },
    { q: "How does borrowing work?", a: "Tap 'Request to Borrow' on any book. The owner will receive a notification and respond via the chatbot." },
    { q: "What are the badges for?", a: "Badges reward you for listing books. Bronze (1-5), Silver (6-20), Gold (21-50), Diamond (51+)." },
    { q: "Can I sell my books?", a: "Yes! When listing or updating a book, you can mark it as available for sale and set a price." },
  ];
  return (
    <Phone>
      <Header title="FAQs" back onBack={() => onNav("profile")} />
      <div style={{ padding: 16 }}>
        {faqs.map((f, i) => (
          <div key={i} style={{ background: "white", borderRadius: 14, padding: 16, marginBottom: 12, border: `1px solid ${COLORS.border}` }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: COLORS.primary, marginBottom: 8 }}>Q: {f.q}</div>
            <div style={{ fontSize: 13, color: COLORS.textMuted, fontFamily: "sans-serif", lineHeight: 1.6 }}>{f.a}</div>
          </div>
        ))}
      </div>
    </Phone>
  );
}

const screenMap = {
  splash: SplashScreen,
  signup: SignupScreen,
  verify: VerifyScreen,
  login: LoginScreen,
  forgot: ForgotScreen,
  feed: FeedScreen,
  search: SearchScreen,
  bookDetail: BookDetailScreen,
  review: ReviewScreen,
  profile: ProfileScreen,
  editProfile: EditProfileScreen,
  favourites: FavouritesScreen,
  dashboard: DashboardScreen,
  myBooks: MyBooksScreen,
  chatbot: ChatbotScreen,
  notifications: NotificationsScreen,
  badges: BadgesScreen,
  about: AboutScreen,
  faqs: FAQsScreen,
};

export default function App() {
  const [activeScreen, setActiveScreen] = useState("splash");
  const [history, setHistory] = useState(["splash"]);

  const navigate = (screen) => {
    setActiveScreen(screen);
    setHistory(h => [...h, screen]);
  };

  const Screen = screenMap[activeScreen];

  return (
    <div style={{ minHeight: "100vh", background: "#1A1A2E", fontFamily: "Georgia, serif", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ background: "#111", borderBottom: "1px solid #333", padding: "16px 32px", display: "flex", alignItems: "center", gap: 20 }}>
        <span style={{ fontSize: 24 }}>📚</span>
        <div>
          <div style={{ color: "white", fontSize: 18, fontWeight: 800, letterSpacing: -0.5 }}>TCC Books Network</div>
          <div style={{ color: "#888", fontSize: 12, fontFamily: "sans-serif" }}>Interactive Wireframe Prototype · {Object.keys(screenMap).length} Screens</div>
        </div>
        <div style={{ marginLeft: "auto", background: COLORS.primary, color: "white", borderRadius: 10, padding: "8px 16px", fontSize: 12, fontFamily: "sans-serif", fontWeight: 700 }}>
          {screenLabels[activeScreen]}
        </div>
      </div>

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar nav */}
        <div style={{ width: 220, background: "#111", padding: "20px 0", overflowY: "auto", flexShrink: 0 }}>
          {screenGroups.map(g => (
            <div key={g.label} style={{ marginBottom: 8 }}>
              <div style={{ color: "#555", fontSize: 10, fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: 1, padding: "0 20px 8px", fontWeight: 700 }}>{g.label}</div>
              {g.screens.map(s => (
                <div key={s} onClick={() => navigate(s)} style={{
                  padding: "10px 20px", cursor: "pointer", fontFamily: "sans-serif", fontSize: 13,
                  color: activeScreen === s ? "white" : "#888",
                  background: activeScreen === s ? COLORS.primary : "transparent",
                  borderLeft: activeScreen === s ? `3px solid ${COLORS.accent}` : "3px solid transparent",
                  fontWeight: activeScreen === s ? 700 : 400
                }}>
                  {screenLabels[s]}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Phone display */}
        <div style={{ flex: 1, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "40px 20px", overflowY: "auto" }}>
          <Screen onNav={navigate} />
        </div>

        {/* Right panel: flow hints */}
        <div style={{ width: 200, background: "#111", padding: 20, overflowY: "auto", flexShrink: 0 }}>
          <div style={{ color: "#888", fontSize: 11, fontFamily: "sans-serif", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16, fontWeight: 700 }}>Prototype Flows</div>
          {[
            { flow: "Onboarding", steps: ["splash","signup","verify","login"] },
            { flow: "Discover", steps: ["feed","bookDetail","chatbot"] },
            { flow: "List Book", steps: ["dashboard","chatbot"] },
            { flow: "Profile", steps: ["profile","editProfile","badges"] },
          ].map(({ flow, steps }) => (
            <div key={flow} style={{ marginBottom: 20 }}>
              <div style={{ color: COLORS.accent, fontSize: 11, fontFamily: "sans-serif", fontWeight: 700, marginBottom: 8 }}>{flow}</div>
              {steps.map((s, i) => (
                <div key={s} onClick={() => navigate(s)} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4, cursor: "pointer" }}>
                  {i < steps.length - 1 && <div style={{ position: "absolute" }} />}
                  <div style={{ width: 6, height: 6, background: activeScreen === s ? COLORS.accent : "#444", borderRadius: 50, flexShrink: 0 }} />
                  <span style={{ color: activeScreen === s ? "white" : "#666", fontSize: 12, fontFamily: "sans-serif" }}>{screenLabels[s]}</span>
                </div>
              ))}
            </div>
          ))}
          <div style={{ marginTop: 20, padding: "12px", background: "#1a1a1a", borderRadius: 10, border: "1px solid #333" }}>
            <div style={{ color: "#888", fontSize: 11, fontFamily: "sans-serif", lineHeight: 1.7 }}>
              💡 Click any screen in the sidebar or tap interactive elements to navigate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
