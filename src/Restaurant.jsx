import { useState, useRef, useEffect } from "react";

// ── DESIGN TOKENS ──────────────────────────────────────────────────────────
const C = {
  bg: "#0E0B07",
  bgCard: "#1A1510",
  bgElevated: "#231E17",
  bgInput: "#2A2218",
  surface: "#302820",
  primary: "#FF6B2C",
  primaryDark: "#CC5520",
  primaryGlow: "rgba(255,107,44,0.18)",
  gold: "#F5C842",
  goldLight: "#FDE68A",
  green: "#22C55E",
  red: "#EF4444",
  blue: "#3B82F6",
  text: "#FAF7F2",
  textMuted: "#9C8E7E",
  textLight: "#6B5E50",
  border: "rgba(255,255,255,0.07)",
  borderStrong: "rgba(255,255,255,0.12)",
};

// ── DATA ────────────────────────────────────────────────────────────────────
const RESTAURANTS = [
  { id: 1, name: "Ember & Oak", cuisine: "Modern Grill", rating: 4.9, reviews: 842, time: "20–30", delivery: 1.99, minOrder: 15, promo: "20% OFF", hero: "🔥", tags: ["Popular", "Grill"], open: true },
  { id: 2, name: "Sakura Garden", cuisine: "Japanese · Sushi", rating: 4.8, reviews: 631, time: "25–40", delivery: 0, minOrder: 20, promo: "Free Delivery", hero: "🍱", tags: ["Trending", "Healthy"], open: true },
  { id: 3, name: "Casa Milano", cuisine: "Italian · Pizza", rating: 4.7, reviews: 1204, time: "15–25", delivery: 2.49, minOrder: 12, promo: null, hero: "🍕", tags: ["Fast"], open: true },
  { id: 4, name: "Spice Route", cuisine: "Indian · Curry", rating: 4.6, reviews: 473, time: "30–45", delivery: 0, minOrder: 18, promo: "Free Delivery", hero: "🍛", tags: ["Spicy"], open: true },
  { id: 5, name: "The Ramen Lab", cuisine: "Japanese · Noodles", rating: 4.8, reviews: 389, time: "20–35", delivery: 1.49, minOrder: 15, promo: null, hero: "🍜", tags: ["Cozy"], open: false },
  { id: 6, name: "Green Bowl Co.", cuisine: "Healthy · Vegan", rating: 4.5, reviews: 267, time: "15–25", delivery: 0, minOrder: 10, promo: "15% OFF", hero: "🥗", tags: ["Healthy", "Vegan"], open: true },
];

const MENUS = {
  1: [
    { id: 101, name: "Wagyu Smash Burger", desc: "200g wagyu patty, aged cheddar, truffle aioli, brioche bun", price: 24.99, cal: 820, emoji: "🍔", category: "Mains", popular: true, spicy: false },
    { id: 102, name: "Ember Ribeye 300g", desc: "Dry-aged 300g ribeye, charred bone marrow butter, chimichurri", price: 52.99, cal: 1100, emoji: "🥩", category: "Mains", popular: true, spicy: false },
    { id: 103, name: "Crispy Calamari", desc: "House-fried squid, lemon zest aioli, micro herbs", price: 14.99, cal: 480, emoji: "🦑", category: "Starters", popular: false, spicy: false },
    { id: 104, name: "Truffle Fries", desc: "Hand-cut fries, black truffle oil, parmesan, rosemary salt", price: 9.99, cal: 620, emoji: "🍟", category: "Sides", popular: true, spicy: false },
    { id: 105, name: "Spicy Chorizo Flatbread", desc: "House dough, spiced chorizo, roasted peppers, whipped feta", price: 16.99, cal: 740, emoji: "🫓", category: "Starters", popular: false, spicy: true },
    { id: 106, name: "Dark Chocolate Lava", desc: "Warm valrhona chocolate fondant, vanilla bean ice cream", price: 11.99, cal: 560, emoji: "🍫", category: "Desserts", popular: true, spicy: false },
  ],
  2: [
    { id: 201, name: "Dragon Roll (8pc)", desc: "Shrimp tempura, avocado, cucumber, eel sauce, tobiko", price: 18.99, cal: 540, emoji: "🐉", category: "Rolls", popular: true, spicy: false },
    { id: 202, name: "Wagyu Nigiri Set", desc: "6-piece A5 wagyu nigiri, pickled ginger, house wasabi", price: 34.99, cal: 480, emoji: "🍣", category: "Nigiri", popular: true, spicy: false },
    { id: 203, name: "Spicy Tuna Tataki", desc: "Sashimi-grade tuna, yuzu ponzu, crispy shallots", price: 22.99, cal: 390, emoji: "🐟", category: "Starters", popular: false, spicy: true },
    { id: 204, name: "Miso Ramen", desc: "Rich miso broth, chashu pork belly, soft egg, nori", price: 17.99, cal: 780, emoji: "🍜", category: "Hot", popular: true, spicy: false },
    { id: 205, name: "Matcha Tiramisu", desc: "Ceremonial matcha, mascarpone, ladyfinger, cocoa dust", price: 9.99, cal: 420, emoji: "🍵", category: "Desserts", popular: false, spicy: false },
  ],
  3: [
    { id: 301, name: "Margherita DOC", desc: "San Marzano tomatoes, buffalo mozzarella, fresh basil, EVOO", price: 15.99, cal: 680, emoji: "🍕", category: "Pizza", popular: true, spicy: false },
    { id: 302, name: "Truffle & Burrata Pizza", desc: "Black truffle cream, burrata, rucola, prosciutto, honey", price: 22.99, cal: 820, emoji: "🍕", category: "Pizza", popular: true, spicy: false },
    { id: 303, name: "Spaghetti Cacio e Pepe", desc: "Bronze-die pasta, aged pecorino, black pepper, pasta water", price: 17.99, cal: 720, emoji: "🍝", category: "Pasta", popular: false, spicy: false },
    { id: 304, name: "Burrata Caprese", desc: "Fresh burrata, heirloom tomatoes, basil oil, aged balsamic", price: 13.99, cal: 420, emoji: "🧀", category: "Starters", popular: true, spicy: false },
    { id: 305, name: "Tiramisu Classico", desc: "Savoiardi, espresso mascarpone, dark cocoa — made daily", price: 8.99, cal: 510, emoji: "🍰", category: "Desserts", popular: true, spicy: false },
  ],
  4: [
    { id: 401, name: "Butter Chicken", desc: "Free-range chicken, rich tomato-cream masala, house naan", price: 16.99, cal: 680, emoji: "🍛", category: "Mains", popular: true, spicy: false },
    { id: 402, name: "Lamb Rogan Josh", desc: "Slow-braised lamb, Kashmiri chilli, aromatic spices", price: 19.99, cal: 740, emoji: "🍖", category: "Mains", popular: true, spicy: true },
    { id: 403, name: "Paneer Tikka", desc: "Tandoor-charred paneer, mint chutney, pickled onion", price: 13.99, cal: 520, emoji: "🧀", category: "Starters", popular: false, spicy: false },
    { id: 404, name: "Garlic Naan (3pc)", desc: "Freshly baked naan, roasted garlic butter, coriander", price: 5.99, cal: 340, emoji: "🫓", category: "Sides", popular: true, spicy: false },
  ],
  5: [],
  6: [
    { id: 601, name: "Açaí Power Bowl", desc: "Açaí base, banana, granola, chia, mango, almond butter drizzle", price: 14.99, cal: 520, emoji: "🫐", category: "Bowls", popular: true, spicy: false },
    { id: 602, name: "Green Goddess Salad", desc: "Kale, avocado, cucumber, hemp seeds, tahini lemon dressing", price: 12.99, cal: 380, emoji: "🥗", category: "Salads", popular: true, spicy: false },
    { id: 603, name: "Protein Smoothie", desc: "Vanilla plant protein, almond milk, dates, banana, cinnamon", price: 8.99, cal: 320, emoji: "🥤", category: "Drinks", popular: false, spicy: false },
  ],
};

const CATEGORIES = ["All", "🔥 Trending", "🍕 Pizza", "🍣 Sushi", "🍔 Burgers", "🥗 Healthy", "🍛 Curry", "🍜 Noodles"];

const ORDERS_HISTORY = [
  { id: "ORD-4821", restaurant: "Ember & Oak", items: ["Wagyu Smash Burger", "Truffle Fries"], total: 34.98, date: "Today, 12:40 PM", status: "Delivered", emoji: "🔥" },
  { id: "ORD-4790", restaurant: "Sakura Garden", items: ["Dragon Roll (8pc)", "Miso Ramen"], total: 36.98, date: "Yesterday, 7:15 PM", status: "Delivered", emoji: "🍱" },
  { id: "ORD-4755", restaurant: "Casa Milano", items: ["Truffle & Burrata Pizza", "Tiramisu Classico"], total: 31.98, date: "Mar 3, 8:30 PM", status: "Delivered", emoji: "🍕" },
];

// ── SHARED COMPONENTS ───────────────────────────────────────────────────────

function StatusBar() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  const h = time.getHours() % 12 || 12, m = String(time.getMinutes()).padStart(2, "0");
  return (
    <div style={{ background: C.bg, padding: "12px 22px 6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ color: C.text, fontSize: 13, fontWeight: 700, fontFamily: "monospace", letterSpacing: 0.5 }}>{h}:{m} {time.getHours() >= 12 ? "PM" : "AM"}</span>
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <span style={{ fontSize: 11 }}>📶</span><span style={{ fontSize: 11 }}>🔋</span>
      </div>
    </div>
  );
}

function BottomNav({ active, onNav, cartCount }) {
  const tabs = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "explore", icon: "🔍", label: "Explore" },
    { id: "orders", icon: "📋", label: "Orders" },
    { id: "profile", icon: "👤", label: "Profile" },
  ];
  return (
    <div style={{ background: C.bgCard, borderTop: `1px solid ${C.border}`, display: "flex", padding: "8px 0 18px", flexShrink: 0 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onNav(t.id)} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, position: "relative" }}>
          <div style={{ width: 44, height: 32, display: "flex", alignItems: "center", justifyContent: "center", background: active === t.id ? C.primaryGlow : "transparent", borderRadius: 12, transition: "all 0.2s" }}>
            <span style={{ fontSize: 18 }}>{t.icon}</span>
            {t.id === "orders" && cartCount > 0 && (
              <div style={{ position: "absolute", top: 0, right: "calc(50% - 20px)", width: 16, height: 16, background: C.primary, borderRadius: 50, fontSize: 9, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", fontWeight: 700 }}>{cartCount}</div>
            )}
          </div>
          <span style={{ fontSize: 9, fontFamily: "sans-serif", fontWeight: active === t.id ? 700 : 400, color: active === t.id ? C.primary : C.textLight }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}

function Tag({ label, color }) {
  const colors = { Popular: C.primary, Trending: "#8B5CF6", Healthy: C.green, Vegan: C.green, Fast: C.gold, Spicy: "#EF4444", Cozy: C.blue };
  const bg = (colors[label] || C.primary) + "22";
  const fg = colors[label] || C.primary;
  return <span style={{ background: bg, color: fg, fontSize: 9, padding: "2px 7px", borderRadius: 20, fontFamily: "sans-serif", fontWeight: 700, letterSpacing: 0.3 }}>{label}</span>;
}

function Stars({ rating }) {
  return (
    <span style={{ color: C.gold, fontSize: 11 }}>
      {"★".repeat(Math.round(rating))}{"☆".repeat(5 - Math.round(rating))}
    </span>
  );
}

function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t); }, []);
  return (
    <div style={{ position: "absolute", bottom: 90, left: 14, right: 14, background: C.surface, color: C.text, borderRadius: 16, padding: "14px 18px", fontFamily: "sans-serif", fontSize: 13, zIndex: 999, boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${C.primary}40`, textAlign: "center", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
      {msg}
    </div>
  );
}

// ── SCREENS ─────────────────────────────────────────────────────────────────

function SplashScreen({ onNav }) {
  return (
    <div style={{ flex: 1, background: `radial-gradient(ellipse at 30% 20%, #3D1A08 0%, ${C.bg} 60%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 32px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, background: `radial-gradient(circle, ${C.primaryGlow} 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ width: 96, height: 96, background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`, borderRadius: 28, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, marginBottom: 28, boxShadow: `0 16px 48px ${C.primary}50` }}>🍽️</div>
      <div style={{ color: C.text, fontSize: 36, fontWeight: 900, letterSpacing: -1.5, marginBottom: 4, fontFamily: "Georgia, serif", textAlign: "center" }}>Crave</div>
      <div style={{ color: C.primary, fontSize: 13, letterSpacing: 4, fontFamily: "sans-serif", textTransform: "uppercase", fontWeight: 600, marginBottom: 16 }}>Premium Food Delivery</div>
      <div style={{ color: C.textMuted, fontSize: 14, textAlign: "center", fontFamily: "sans-serif", lineHeight: 1.7, marginBottom: 56 }}>Restaurant-quality meals,{"\n"}delivered to your door.</div>
      <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
        <button onClick={() => onNav("login")} style={{ background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`, color: "white", border: "none", borderRadius: 18, padding: "17px", fontWeight: 800, fontSize: 16, cursor: "pointer", fontFamily: "sans-serif", boxShadow: `0 8px 24px ${C.primary}40` }}>Sign In</button>
        <button onClick={() => onNav("signup")} style={{ background: C.bgElevated, color: C.text, border: `1px solid ${C.borderStrong}`, borderRadius: 18, padding: "17px", fontWeight: 700, fontSize: 16, cursor: "pointer", fontFamily: "sans-serif" }}>Create Account</button>
      </div>
      <div style={{ color: C.textLight, fontSize: 11, marginTop: 32, fontFamily: "sans-serif" }}>Crave Delivery © 2025</div>
    </div>
  );
}

function LoginScreen({ onNav, state, setState }) {
  const [err, setErr] = useState("");
  const doLogin = () => {
    if (!state.email || !state.password) { setErr("Please fill in all fields."); return; }
    if (state.password.length < 6) { setErr("Password must be at least 6 characters."); return; }
    setErr(""); onNav("home");
  };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: `linear-gradient(160deg, #2A1005, ${C.bg})`, padding: "44px 24px 32px", textAlign: "center" }}>
        <div style={{ fontSize: 42, marginBottom: 10 }}>🍽️</div>
        <div style={{ color: C.text, fontSize: 24, fontWeight: 800, fontFamily: "Georgia, serif", marginBottom: 4 }}>Welcome back</div>
        <div style={{ color: C.textMuted, fontSize: 13, fontFamily: "sans-serif" }}>Sign in to continue ordering</div>
      </div>
      <div style={{ flex: 1, background: C.bgCard, borderRadius: "22px 22px 0 0", marginTop: -16, padding: "28px 22px", overflowY: "auto" }}>
        {err && <div style={{ background: "#3F1515", border: "1px solid #7F2020", borderRadius: 12, padding: "10px 14px", marginBottom: 16, color: "#FCA5A5", fontSize: 13, fontFamily: "sans-serif" }}>{err}</div>}
        <FInput label="Email" placeholder="you@example.com" value={state.email || ""} onChange={v => setState(s => ({ ...s, email: v }))} />
        <FInput label="Password" type="password" placeholder="Your password" value={state.password || ""} onChange={v => setState(s => ({ ...s, password: v }))} />
        <div style={{ textAlign: "right", marginTop: -6, marginBottom: 22 }}>
          <span onClick={() => onNav("forgot")} style={{ color: C.primary, fontSize: 13, fontFamily: "sans-serif", cursor: "pointer", fontWeight: 600 }}>Forgot password?</span>
        </div>
        <FBtn label="Sign In" onClick={doLogin} />
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "16px 0" }}>
          <div style={{ flex: 1, height: 1, background: C.border }} />
          <span style={{ color: C.textLight, fontSize: 12, fontFamily: "sans-serif" }}>or continue with</span>
          <div style={{ flex: 1, height: 1, background: C.border }} />
        </div>
        <button onClick={() => onNav("home")} style={{ width: "100%", background: C.bgElevated, border: `1px solid ${C.borderStrong}`, borderRadius: 14, padding: "13px", fontFamily: "sans-serif", fontSize: 14, color: C.text, cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>🌐 Continue with Google</button>
        <div style={{ textAlign: "center", color: C.textMuted, fontSize: 13, fontFamily: "sans-serif", marginTop: 20 }}>
          No account? <span onClick={() => onNav("signup")} style={{ color: C.primary, fontWeight: 700, cursor: "pointer" }}>Sign up free</span>
        </div>
      </div>
    </div>
  );
}

function SignupScreen({ onNav, state, setState }) {
  const [err, setErr] = useState("");
  const doSignup = () => {
    if (!state.signupName || !state.signupEmail || !state.signupPass) { setErr("Please fill all fields."); return; }
    if (state.signupPass.length < 6) { setErr("Password too short (min 6)."); return; }
    setErr(""); onNav("home");
  };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <FHeader title="Create Account" back onBack={() => onNav("splash")} />
      <div style={{ flex: 1, overflowY: "auto", padding: "22px" }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 4, fontFamily: "Georgia, serif" }}>Let's get started</div>
        <div style={{ fontSize: 13, color: C.textMuted, fontFamily: "sans-serif", marginBottom: 24 }}>Create your Crave account</div>
        {err && <div style={{ background: "#3F1515", border: "1px solid #7F2020", borderRadius: 12, padding: "10px 14px", marginBottom: 16, color: "#FCA5A5", fontSize: 13, fontFamily: "sans-serif" }}>{err}</div>}
        <FInput label="Full Name" placeholder="Your name" value={state.signupName || ""} onChange={v => setState(s => ({ ...s, signupName: v }))} />
        <FInput label="Email" placeholder="you@example.com" value={state.signupEmail || ""} onChange={v => setState(s => ({ ...s, signupEmail: v }))} />
        <FInput label="Password" type="password" placeholder="Min. 6 characters" value={state.signupPass || ""} onChange={v => setState(s => ({ ...s, signupPass: v }))} />
        <FInput label="Delivery Address" placeholder="123 Main Street..." value={state.address || ""} onChange={v => setState(s => ({ ...s, address: v }))} />
        <FBtn label="Create Account" onClick={doSignup} />
        <div style={{ textAlign: "center", color: C.textMuted, fontSize: 13, fontFamily: "sans-serif" }}>
          Already have an account? <span onClick={() => onNav("login")} style={{ color: C.primary, fontWeight: 700, cursor: "pointer" }}>Sign in</span>
        </div>
      </div>
    </div>
  );
}

function ForgotScreen({ onNav }) {
  const [email, setEmail] = useState(""), [sent, setSent] = useState(false);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <FHeader title="Forgot Password" back onBack={() => onNav("login")} />
      <div style={{ flex: 1, padding: 28, textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>{sent ? "✅" : "🔐"}</div>
        <div style={{ color: C.text, fontSize: 20, fontWeight: 800, fontFamily: "Georgia, serif", marginBottom: 10 }}>{sent ? "Check your email" : "Reset password"}</div>
        <div style={{ color: C.textMuted, fontSize: 14, fontFamily: "sans-serif", lineHeight: 1.7, marginBottom: 28 }}>{sent ? `We've sent a reset link to ${email}.` : "Enter your email and we'll send a reset link."}</div>
        {!sent && <><FInput label="Email" placeholder="you@example.com" value={email} onChange={setEmail} /><FBtn label="Send Reset Link" onClick={() => email && setSent(true)} disabled={!email} /></>}
        {sent && <FBtn label="Back to Login" variant="outline" onClick={() => onNav("login")} />}
      </div>
    </div>
  );
}

function HomeScreen({ onNav, user, cart, onSelectRest, onAddToCart, favRests, onFavRest, showToast }) {
  const [category, setCategory] = useState("All");
  const filtered = RESTAURANTS.filter(r => {
    if (category === "All") return true;
    if (category === "🔥 Trending") return r.tags.includes("Trending") || r.tags.includes("Popular");
    if (category === "🍕 Pizza") return r.cuisine.includes("Pizza");
    if (category === "🍣 Sushi") return r.cuisine.includes("Sushi") || r.cuisine.includes("Japanese");
    if (category === "🍔 Burgers") return r.cuisine.includes("Grill");
    if (category === "🥗 Healthy") return r.tags.includes("Healthy") || r.tags.includes("Vegan");
    if (category === "🍛 Curry") return r.cuisine.includes("Indian");
    if (category === "🍜 Noodles") return r.cuisine.includes("Noodles") || r.cuisine.includes("Ramen");
    return true;
  });
  const cartTotal = Object.values(cart).reduce((s, { item, qty }) => s + item.price * qty, 0);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ background: C.bg, padding: "10px 18px 0", flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <div style={{ color: C.textMuted, fontSize: 11, fontFamily: "sans-serif", display: "flex", alignItems: "center", gap: 4 }}>📍 Delivering to</div>
            <div style={{ color: C.text, fontSize: 15, fontWeight: 800, fontFamily: "Georgia, serif", display: "flex", alignItems: "center", gap: 4 }}>{user.address || "123 Main Street"} <span style={{ color: C.primary, fontSize: 12 }}>▼</span></div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={() => onNav("notifications")} style={{ width: 38, height: 38, background: C.bgElevated, border: `1px solid ${C.border}`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16 }}>🔔</button>
          </div>
        </div>
        {/* Promo banner */}
        <div style={{ background: `linear-gradient(135deg, ${C.primaryDark}, ${C.primary})`, borderRadius: 18, padding: "16px 18px", marginBottom: 14, display: "flex", alignItems: "center", gap: 14, boxShadow: `0 8px 24px ${C.primary}30` }}>
          <div style={{ flex: 1 }}>
            <div style={{ color: C.goldLight, fontSize: 11, fontFamily: "sans-serif", fontWeight: 700, marginBottom: 2, textTransform: "uppercase", letterSpacing: 0.5 }}>Limited Time</div>
            <div style={{ color: "white", fontSize: 17, fontWeight: 800, fontFamily: "Georgia, serif", marginBottom: 2 }}>Free delivery on your first 3 orders</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontFamily: "sans-serif" }}>Use code CRAVE25 at checkout</div>
          </div>
          <div style={{ fontSize: 40 }}>🎁</div>
        </div>
        {/* Category pills */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 12 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} style={{ background: category === cat ? C.primary : C.bgElevated, color: category === cat ? "white" : C.textMuted, border: `1px solid ${category === cat ? C.primary : C.border}`, borderRadius: 22, padding: "7px 14px", fontSize: 12, fontFamily: "sans-serif", cursor: "pointer", whiteSpace: "nowrap", fontWeight: category === cat ? 700 : 400 }}>{cat}</button>
          ))}
        </div>
      </div>

      {/* Restaurant list */}
      <div style={{ flex: 1, overflowY: "auto", padding: "0 14px 14px" }}>
        <div style={{ color: C.textMuted, fontSize: 12, fontFamily: "sans-serif", marginBottom: 12, fontWeight: 600 }}>{filtered.length} restaurants nearby</div>
        {filtered.map(r => (
          <div key={r.id} onClick={() => { onSelectRest(r); onNav("restaurant"); }} style={{ background: C.bgCard, borderRadius: 20, marginBottom: 14, overflow: "hidden", border: `1px solid ${C.border}`, cursor: "pointer", opacity: r.open ? 1 : 0.6 }}>
            {/* Hero */}
            <div style={{ background: `linear-gradient(135deg, #1A0E06, #2D1A0A)`, height: 100, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, position: "relative" }}>
              {r.hero}
              {r.promo && <div style={{ position: "absolute", top: 10, left: 10, background: C.primary, color: "white", fontSize: 10, padding: "4px 10px", borderRadius: 20, fontFamily: "sans-serif", fontWeight: 800 }}>{r.promo}</div>}
              {!r.open && <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "white", fontFamily: "sans-serif", fontWeight: 800, fontSize: 13 }}>CLOSED</span></div>}
              <button onClick={e => { e.stopPropagation(); onFavRest(r.id); }} style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.4)", border: "none", borderRadius: 50, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16 }}>
                {favRests.includes(r.id) ? "❤️" : "🤍"}
              </button>
            </div>
            <div style={{ padding: "12px 14px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: C.text, fontFamily: "Georgia, serif" }}>{r.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <Stars rating={r.rating} />
                  <span style={{ color: C.textMuted, fontSize: 11, fontFamily: "sans-serif" }}> {r.rating}</span>
                </div>
              </div>
              <div style={{ color: C.textMuted, fontSize: 12, fontFamily: "sans-serif", marginBottom: 8 }}>{r.cuisine} · {r.reviews} ratings</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: 6 }}>{r.tags.map(t => <Tag key={t} label={t} />)}</div>
                <div style={{ display: "flex", gap: 12, fontSize: 11, color: C.textMuted, fontFamily: "sans-serif" }}>
                  <span>⏱ {r.time} min</span>
                  <span style={{ color: r.delivery === 0 ? C.green : C.textMuted }}>{r.delivery === 0 ? "Free delivery" : `$${r.delivery} delivery`}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating cart bar */}
      {Object.keys(cart).length > 0 && (
        <div style={{ position: "absolute", bottom: 72, left: 14, right: 14 }}>
          <button onClick={() => onNav("cart")} style={{ width: "100%", background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`, border: "none", borderRadius: 18, padding: "16px 20px", display: "flex", alignItems: "center", cursor: "pointer", boxShadow: `0 8px 32px ${C.primary}50` }}>
            <div style={{ width: 26, height: 26, background: "rgba(255,255,255,0.2)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "white", fontFamily: "sans-serif" }}>{Object.values(cart).reduce((s, { qty }) => s + qty, 0)}</div>
            <span style={{ flex: 1, color: "white", fontWeight: 800, fontSize: 15, fontFamily: "sans-serif", textAlign: "center" }}>View Cart</span>
            <span style={{ color: "white", fontWeight: 800, fontSize: 15, fontFamily: "sans-serif" }}>${cartTotal.toFixed(2)}</span>
          </button>
        </div>
      )}
      <BottomNav active="home" onNav={onNav} cartCount={Object.values(cart).reduce((s, { qty }) => s + qty, 0)} />
    </div>
  );
}

function RestaurantScreen({ onNav, restaurant, cart, onAddToCart, onRemoveFromCart }) {
  const [activeCategory, setActiveCategory] = useState("All");
  if (!restaurant) return null;
  const menu = MENUS[restaurant.id] || [];
  const categories = ["All", ...new Set(menu.map(i => i.category))];
  const filtered = activeCategory === "All" ? menu : menu.filter(i => i.category === activeCategory);
  const cartTotal = Object.values(cart).reduce((s, { item, qty }) => s + item.price * qty, 0);
  const cartQty = Object.values(cart).reduce((s, { qty }) => s + qty, 0);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Hero */}
      <div style={{ background: `linear-gradient(160deg, #200F04, #3D1F0A)`, padding: "0", flexShrink: 0, position: "relative" }}>
        <div style={{ height: 130, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 70 }}>{restaurant.hero}</div>
        <button onClick={() => onNav("back")} style={{ position: "absolute", top: 14, left: 14, background: "rgba(0,0,0,0.5)", border: "none", width: 36, height: 36, borderRadius: 12, color: "white", fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
        {restaurant.promo && <div style={{ position: "absolute", top: 14, right: 14, background: C.primary, color: "white", fontSize: 10, padding: "4px 10px", borderRadius: 20, fontFamily: "sans-serif", fontWeight: 800 }}>{restaurant.promo}</div>}
        <div style={{ background: C.bgCard, borderRadius: "22px 22px 0 0", padding: "18px 18px 12px", marginTop: -12 }}>
          <div style={{ fontWeight: 900, fontSize: 20, color: C.text, fontFamily: "Georgia, serif", marginBottom: 3 }}>{restaurant.name}</div>
          <div style={{ color: C.textMuted, fontSize: 12, fontFamily: "sans-serif", marginBottom: 10 }}>{restaurant.cuisine}</div>
          <div style={{ display: "flex", gap: 16, fontSize: 12, fontFamily: "sans-serif" }}>
            <span style={{ color: C.gold }}>★ {restaurant.rating}</span>
            <span style={{ color: C.textMuted }}>({restaurant.reviews} reviews)</span>
            <span style={{ color: C.textMuted }}>⏱ {restaurant.time} min</span>
            <span style={{ color: restaurant.delivery === 0 ? C.green : C.textMuted }}>{restaurant.delivery === 0 ? "Free delivery" : `$${restaurant.delivery}`}</span>
          </div>
        </div>
      </div>
      {/* Category tabs */}
      <div style={{ background: C.bgCard, borderBottom: `1px solid ${C.border}`, padding: "0 14px", display: "flex", gap: 4, overflowX: "auto", flexShrink: 0 }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{ background: "none", border: "none", borderBottom: `2px solid ${activeCategory === cat ? C.primary : "transparent"}`, color: activeCategory === cat ? C.primary : C.textMuted, padding: "10px 12px", fontSize: 12, fontFamily: "sans-serif", cursor: "pointer", whiteSpace: "nowrap", fontWeight: activeCategory === cat ? 700 : 400 }}>{cat}</button>
        ))}
      </div>
      {/* Menu items */}
      <div style={{ flex: 1, overflowY: "auto", padding: "10px 14px 14px" }}>
        {filtered.length === 0 && <div style={{ textAlign: "center", padding: 40, color: C.textMuted, fontFamily: "sans-serif" }}>Menu coming soon!</div>}
        {filtered.map(item => {
          const inCart = cart[item.id];
          return (
            <div key={item.id} style={{ background: C.bgCard, borderRadius: 18, padding: 14, marginBottom: 10, display: "flex", gap: 12, border: `1px solid ${inCart ? C.primary + "40" : C.border}`, transition: "border-color 0.2s" }}>
              <div style={{ width: 72, height: 72, background: `linear-gradient(135deg, #1A0E06, #2D1A0A)`, borderRadius: 14, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>{item.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 3, flexWrap: "wrap" }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: C.text, fontFamily: "sans-serif" }}>{item.name}</span>
                  {item.popular && <span style={{ background: C.primaryGlow, color: C.primary, fontSize: 9, padding: "2px 6px", borderRadius: 20, fontFamily: "sans-serif", fontWeight: 700 }}>POPULAR</span>}
                  {item.spicy && <span style={{ background: "#3F150822", color: "#EF4444", fontSize: 9, padding: "2px 6px", borderRadius: 20, fontFamily: "sans-serif", fontWeight: 700 }}>🌶 SPICY</span>}
                </div>
                <div style={{ color: C.textMuted, fontSize: 11, fontFamily: "sans-serif", lineHeight: 1.5, marginBottom: 8 }}>{item.desc}</div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{ color: C.primary, fontWeight: 800, fontSize: 15, fontFamily: "sans-serif" }}>${item.price}</span>
                    <span style={{ color: C.textLight, fontSize: 10, fontFamily: "sans-serif", marginLeft: 6 }}>{item.cal} cal</span>
                  </div>
                  {inCart ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button onClick={() => onRemoveFromCart(item.id)} style={{ width: 28, height: 28, background: C.bgElevated, border: `1px solid ${C.border}`, borderRadius: 8, color: C.primary, fontWeight: 800, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                      <span style={{ color: C.text, fontWeight: 700, fontFamily: "sans-serif", minWidth: 16, textAlign: "center" }}>{inCart.qty}</span>
                      <button onClick={() => onAddToCart(item)} style={{ width: 28, height: 28, background: C.primary, border: "none", borderRadius: 8, color: "white", fontWeight: 800, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                    </div>
                  ) : (
                    <button onClick={() => onAddToCart(item)} style={{ background: C.primary, border: "none", borderRadius: 10, padding: "7px 14px", color: "white", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "sans-serif" }}>Add +</button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {cartQty > 0 && (
        <div style={{ padding: "10px 14px", flexShrink: 0 }}>
          <button onClick={() => onNav("cart")} style={{ width: "100%", background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`, border: "none", borderRadius: 18, padding: "15px 20px", display: "flex", alignItems: "center", cursor: "pointer", boxShadow: `0 6px 20px ${C.primary}40` }}>
            <div style={{ width: 24, height: 24, background: "rgba(255,255,255,0.2)", borderRadius: 7, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "white", fontFamily: "sans-serif" }}>{cartQty}</div>
            <span style={{ flex: 1, color: "white", fontWeight: 800, fontSize: 15, fontFamily: "sans-serif", textAlign: "center" }}>View Cart</span>
            <span style={{ color: "white", fontWeight: 800, fontSize: 15, fontFamily: "sans-serif" }}>${cartTotal.toFixed(2)}</span>
          </button>
        </div>
      )}
    </div>
  );
}

function CartScreen({ onNav, cart, onAddToCart, onRemoveFromCart, restaurant, showToast, onPlaceOrder }) {
  const items = Object.values(cart);
  const subtotal = items.reduce((s, { item, qty }) => s + item.price * qty, 0);
  const delivery = restaurant?.delivery || 0;
  const tax = subtotal * 0.08;
  const total = subtotal + delivery + tax;
  const [note, setNote] = useState("");
  const [placing, setPlacing] = useState(false);

  const placeOrder = () => {
    setPlacing(true);
    setTimeout(() => { onPlaceOrder(); onNav("tracking"); setPlacing(false); }, 1200);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <FHeader title="Your Cart" back onBack={() => onNav("back")} right={items.length > 0 ? <span onClick={() => { onNav("back"); }} style={{ color: C.primary, fontSize: 13, fontFamily: "sans-serif", cursor: "pointer", fontWeight: 600 }}>+ Add more</span> : null} />
      {items.length === 0 ? (
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: 32 }}>
          <div style={{ fontSize: 64 }}>🛒</div>
          <div style={{ color: C.text, fontSize: 18, fontWeight: 800, fontFamily: "Georgia, serif" }}>Your cart is empty</div>
          <div style={{ color: C.textMuted, fontSize: 13, fontFamily: "sans-serif", textAlign: "center" }}>Browse restaurants and add some delicious food!</div>
          <FBtn label="Browse Restaurants" onClick={() => onNav("home")} />
        </div>
      ) : (
        <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px" }}>
          {/* From restaurant */}
          {restaurant && <div style={{ background: C.bgElevated, borderRadius: 14, padding: "10px 14px", marginBottom: 14, display: "flex", gap: 10, alignItems: "center", border: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 20 }}>{restaurant.hero}</span>
            <div>
              <div style={{ color: C.text, fontWeight: 700, fontSize: 13, fontFamily: "sans-serif" }}>{restaurant.name}</div>
              <div style={{ color: C.textMuted, fontSize: 11, fontFamily: "sans-serif" }}>⏱ {restaurant.time} min estimated</div>
            </div>
          </div>}
          {/* Items */}
          {items.map(({ item, qty }) => (
            <div key={item.id} style={{ background: C.bgCard, borderRadius: 16, padding: "12px 14px", marginBottom: 8, display: "flex", gap: 12, alignItems: "center", border: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 28 }}>{item.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: C.text, fontFamily: "sans-serif" }}>{item.name}</div>
                <div style={{ color: C.primary, fontWeight: 700, fontSize: 13, fontFamily: "sans-serif" }}>${(item.price * qty).toFixed(2)}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => onRemoveFromCart(item.id)} style={{ width: 28, height: 28, background: C.bgElevated, border: `1px solid ${C.border}`, borderRadius: 8, color: C.primary, fontWeight: 800, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                <span style={{ color: C.text, fontWeight: 700, fontFamily: "sans-serif", minWidth: 18, textAlign: "center" }}>{qty}</span>
                <button onClick={() => onAddToCart(item)} style={{ width: 28, height: 28, background: C.primary, border: "none", borderRadius: 8, color: "white", fontWeight: 800, fontSize: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
              </div>
            </div>
          ))}
          {/* Special instructions */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ color: C.textMuted, fontSize: 12, fontFamily: "sans-serif", marginBottom: 6, fontWeight: 600 }}>Special Instructions</div>
            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Any allergies or special requests?" style={{ width: "100%", background: C.bgElevated, border: `1px solid ${C.border}`, borderRadius: 12, padding: "12px 14px", fontSize: 13, color: C.text, fontFamily: "sans-serif", resize: "none", outline: "none", minHeight: 72, lineHeight: 1.5, boxSizing: "border-box" }} />
          </div>
          {/* Summary */}
          <div style={{ background: C.bgCard, borderRadius: 16, padding: "16px", border: `1px solid ${C.border}`, marginBottom: 14 }}>
            {[["Subtotal", `$${subtotal.toFixed(2)}`], ["Delivery", delivery === 0 ? <span style={{ color: C.green }}>Free</span> : `$${delivery.toFixed(2)}`], ["Tax (8%)", `$${tax.toFixed(2)}`]].map(([l, v], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ color: C.textMuted, fontSize: 13, fontFamily: "sans-serif" }}>{l}</span>
                <span style={{ color: C.text, fontSize: 13, fontFamily: "sans-serif", fontWeight: 600 }}>{v}</span>
              </div>
            ))}
            <div style={{ height: 1, background: C.border, margin: "8px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: C.text, fontSize: 15, fontFamily: "sans-serif", fontWeight: 800 }}>Total</span>
              <span style={{ color: C.primary, fontSize: 15, fontFamily: "sans-serif", fontWeight: 800 }}>${total.toFixed(2)}</span>
            </div>
          </div>
          <FBtn label={placing ? "Placing order..." : `Place Order · $${total.toFixed(2)}`} onClick={placeOrder} disabled={placing} />
        </div>
      )}
    </div>
  );
}

function TrackingScreen({ onNav, restaurant }) {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "Order Confirmed", icon: "✅", desc: "Restaurant received your order", done: true },
    { label: "Preparing Food", icon: "👨‍🍳", desc: "Chef is preparing your meal", done: step >= 1 },
    { label: "On the Way", icon: "🛵", desc: "Rider picked up your order", done: step >= 2 },
    { label: "Delivered!", icon: "🎉", desc: "Enjoy your meal!", done: step >= 3 },
  ];
  useEffect(() => { if (step < 3) { const t = setTimeout(() => setStep(s => s + 1), 3000); return () => clearTimeout(t); } }, [step]);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <FHeader title="Order Tracking" back onBack={() => onNav("home")} />
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 18px" }}>
        {/* Order ID */}
        <div style={{ background: C.bgCard, borderRadius: 16, padding: "14px 16px", marginBottom: 20, border: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: C.textMuted, fontSize: 11, fontFamily: "sans-serif" }}>Order ID</div>
            <div style={{ color: C.text, fontWeight: 800, fontSize: 14, fontFamily: "sans-serif" }}>ORD-{Date.now().toString().slice(-4)}</div>
          </div>
          <div>
            <div style={{ color: C.textMuted, fontSize: 11, fontFamily: "sans-serif" }}>Est. Arrival</div>
            <div style={{ color: C.primary, fontWeight: 800, fontSize: 14, fontFamily: "sans-serif" }}>
              {restaurant?.time || "25–35"} min
            </div>
          </div>
          <div style={{ background: C.green + "20", color: C.green, fontSize: 11, padding: "5px 12px", borderRadius: 20, fontFamily: "sans-serif", fontWeight: 700 }}>Active</div>
        </div>
        {/* Map placeholder */}
        <div style={{ background: `linear-gradient(135deg, #0A1A0A, #0F200F)`, borderRadius: 20, height: 180, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, border: `1px solid ${C.border}`, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 40% 60%, rgba(34,197,94,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255,107,44,0.06) 0%, transparent 50%)" }} />
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 36, marginBottom: 6 }}>🗺️</div>
            <div style={{ color: C.textMuted, fontSize: 12, fontFamily: "sans-serif" }}>Live tracking map</div>
            <div style={{ color: C.green, fontSize: 11, fontFamily: "sans-serif", fontWeight: 700, marginTop: 4 }}>● Rider en route</div>
          </div>
        </div>
        {/* Steps */}
        <div style={{ marginBottom: 24 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: 14, marginBottom: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: s.done ? (i === step && step < 3 ? C.primaryGlow : C.green + "20") : C.bgElevated, border: `2px solid ${s.done ? (i === step && step < 3 ? C.primary : C.green) : C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, transition: "all 0.5s" }}>{s.icon}</div>
                {i < steps.length - 1 && <div style={{ width: 2, flex: 1, background: s.done ? C.green + "40" : C.border, marginTop: 4, minHeight: 16 }} />}
              </div>
              <div style={{ paddingTop: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: s.done ? C.text : C.textLight, fontFamily: "sans-serif" }}>{s.label}</div>
                <div style={{ fontSize: 12, color: C.textMuted, fontFamily: "sans-serif" }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
        {step >= 3 && (
          <div style={{ background: `linear-gradient(135deg, ${C.green}15, ${C.green}08)`, border: `1px solid ${C.green}40`, borderRadius: 16, padding: "18px", textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 40, marginBottom: 8 }}>🎉</div>
            <div style={{ color: C.text, fontWeight: 800, fontSize: 16, fontFamily: "Georgia, serif", marginBottom: 4 }}>Order Delivered!</div>
            <div style={{ color: C.textMuted, fontSize: 13, fontFamily: "sans-serif" }}>Enjoy your meal! Rate your experience below.</div>
          </div>
        )}
        {step >= 3 && <FBtn label="Rate Your Order ⭐" onClick={() => { onNav("home"); }} />}
        <FBtn label="Back to Home" variant="ghost" onClick={() => onNav("home")} />
      </div>
    </div>
  );
}

function ExploreScreen({ onNav, onSelectRest, favRests, onFavRest }) {
  const [query, setQuery] = useState("");
  const results = RESTAURANTS.filter(r => !query || r.name.toLowerCase().includes(query.toLowerCase()) || r.cuisine.toLowerCase().includes(query.toLowerCase()));
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: C.bg, padding: "12px 16px", flexShrink: 0 }}>
        <div style={{ color: C.text, fontSize: 18, fontWeight: 800, fontFamily: "Georgia, serif", marginBottom: 12 }}>Explore</div>
        <div style={{ background: C.bgElevated, border: `1px solid ${C.border}`, borderRadius: 14, padding: "12px 14px", display: "flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
          <span style={{ fontSize: 16 }}>🔍</span>
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search restaurants, cuisines..." style={{ background: "transparent", border: "none", color: C.text, fontSize: 14, fontFamily: "sans-serif", flex: 1, outline: "none" }} />
          {query && <button onClick={() => setQuery("")} style={{ background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: 14 }}>✕</button>}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 14px 14px" }}>
        <div style={{ color: C.textMuted, fontSize: 12, fontFamily: "sans-serif", marginBottom: 12 }}>{results.length} restaurants</div>
        {results.map(r => (
          <div key={r.id} onClick={() => { onSelectRest(r); onNav("restaurant"); }} style={{ background: C.bgCard, borderRadius: 16, padding: "12px 14px", marginBottom: 10, display: "flex", gap: 12, border: `1px solid ${C.border}`, cursor: "pointer", opacity: r.open ? 1 : 0.6 }}>
            <div style={{ width: 56, height: 56, background: "#1A0E06", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, flexShrink: 0 }}>{r.hero}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: C.text, fontFamily: "sans-serif", marginBottom: 2 }}>{r.name}</div>
              <div style={{ color: C.textMuted, fontSize: 12, fontFamily: "sans-serif", marginBottom: 5 }}>{r.cuisine}</div>
              <div style={{ display: "flex", gap: 10, fontSize: 11, fontFamily: "sans-serif" }}>
                <span style={{ color: C.gold }}>★ {r.rating}</span>
                <span style={{ color: C.textLight }}>⏱ {r.time}m</span>
                <span style={{ color: r.delivery === 0 ? C.green : C.textMuted }}>{r.delivery === 0 ? "Free" : `$${r.delivery}`}</span>
              </div>
            </div>
            <button onClick={e => { e.stopPropagation(); onFavRest(r.id); }} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", alignSelf: "center" }}>{favRests.includes(r.id) ? "❤️" : "🤍"}</button>
          </div>
        ))}
      </div>
      <BottomNav active="explore" onNav={onNav} />
    </div>
  );
}

function OrdersScreen({ onNav, orders, cart, onSelectRest }) {
  const [tab, setTab] = useState("history");
  const cartItems = Object.values(cart);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: C.bg, padding: "12px 16px 0", flexShrink: 0 }}>
        <div style={{ color: C.text, fontSize: 18, fontWeight: 800, fontFamily: "Georgia, serif", marginBottom: 14 }}>Orders</div>
        <div style={{ display: "flex", background: C.bgElevated, borderRadius: 12, padding: 4, marginBottom: 14 }}>
          {[["history", "Past Orders"], ["active", "Active"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ flex: 1, background: tab === id ? C.primary : "transparent", border: "none", borderRadius: 10, padding: "9px", color: tab === id ? "white" : C.textMuted, fontSize: 13, fontFamily: "sans-serif", fontWeight: 700, cursor: "pointer" }}>{label}</button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "0 14px 14px" }}>
        {tab === "history" && (
          orders.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: C.textMuted, fontFamily: "sans-serif" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
              <div style={{ fontWeight: 700, color: C.text, marginBottom: 6 }}>No orders yet</div>
              <div style={{ fontSize: 13 }}>Your order history will appear here</div>
            </div>
          ) : orders.map((o, i) => (
            <div key={i} style={{ background: C.bgCard, borderRadius: 16, padding: "14px", marginBottom: 10, border: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ width: 40, height: 40, background: "#1A0E06", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{o.emoji}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: C.text, fontSize: 13, fontFamily: "sans-serif" }}>{o.restaurant}</div>
                    <div style={{ color: C.textMuted, fontSize: 11, fontFamily: "sans-serif" }}>{o.date}</div>
                  </div>
                </div>
                <div style={{ background: C.green + "20", color: C.green, fontSize: 10, padding: "3px 9px", borderRadius: 20, fontFamily: "sans-serif", fontWeight: 700, alignSelf: "flex-start" }}>{o.status}</div>
              </div>
              <div style={{ color: C.textMuted, fontSize: 12, fontFamily: "sans-serif", marginBottom: 10 }}>{o.items.join(" · ")}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: C.primary, fontWeight: 800, fontSize: 14, fontFamily: "sans-serif" }}>${o.total.toFixed(2)}</span>
                <button onClick={() => { const r = RESTAURANTS.find(r => r.name === o.restaurant); if (r) { onSelectRest(r); onNav("restaurant"); } }} style={{ background: C.bgElevated, border: `1px solid ${C.border}`, borderRadius: 10, padding: "7px 14px", color: C.text, fontSize: 12, fontFamily: "sans-serif", fontWeight: 600, cursor: "pointer" }}>Reorder</button>
              </div>
            </div>
          ))
        )}
        {tab === "active" && (
          cartItems.length > 0 ? (
            <div style={{ background: C.bgCard, borderRadius: 16, padding: "16px", border: `1px solid ${C.primary}40` }}>
              <div style={{ fontWeight: 700, color: C.text, fontSize: 14, fontFamily: "sans-serif", marginBottom: 10 }}>Items in Cart</div>
              {cartItems.map(({ item, qty }, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, color: C.textMuted, fontSize: 13, fontFamily: "sans-serif" }}><span>{item.name}</span><span style={{ color: C.primary, fontWeight: 700 }}>×{qty}</span></div>)}
              <FBtn label="Go to Cart" onClick={() => onNav("cart")} small />
            </div>
          ) : <div style={{ textAlign: "center", padding: "60px 20px", color: C.textMuted, fontFamily: "sans-serif" }}><div style={{ fontSize: 48, marginBottom: 12 }}>🛒</div><div style={{ fontWeight: 700, color: C.text, marginBottom: 6 }}>No active orders</div><div style={{ fontSize: 13 }}>Add items to get started</div></div>
        )}
      </div>
      <BottomNav active="orders" onNav={onNav} cartCount={cartItems.reduce((s, { qty }) => s + qty, 0)} />
    </div>
  );
}

function ProfileScreen({ onNav, user, setUser, orders, favRests }) {
  const totalSpent = orders.reduce((s, o) => s + o.total, 0);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ overflowY: "auto", flex: 1 }}>
        <div style={{ background: `linear-gradient(160deg, #200F04, #3D1F0A)`, padding: "28px 20px 44px", textAlign: "center" }}>
          <div style={{ width: 76, height: 76, background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, margin: "0 auto 12px", boxShadow: `0 8px 24px ${C.primary}40` }}>👤</div>
          <div style={{ color: C.text, fontSize: 20, fontWeight: 800, fontFamily: "Georgia, serif", marginBottom: 4 }}>{user.name || "Food Lover"}</div>
          <div style={{ color: C.textMuted, fontSize: 12, fontFamily: "sans-serif", marginBottom: 16 }}>{user.email || "user@crave.app"}</div>
          <div style={{ display: "flex", background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 4 }}>
            {[[orders.length, "Orders"], [favRests.length, "Favourites"], [`$${totalSpent.toFixed(0)}`, "Spent"]].map(([v, l], i) => (
              <div key={i} style={{ flex: 1, textAlign: "center", padding: "10px 0", borderRight: i < 2 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ color: C.text, fontSize: 17, fontWeight: 800, fontFamily: "sans-serif" }}>{v}</div>
                <div style={{ color: C.textMuted, fontSize: 10, fontFamily: "sans-serif" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: "0 16px 18px", marginTop: -20, background: C.bg, borderRadius: "22px 22px 0 0" }}>
          {/* Promo code */}
          <div style={{ background: `linear-gradient(135deg, ${C.primary}18, ${C.primary}08)`, border: `1px solid ${C.primary}30`, borderRadius: 16, padding: "14px 16px", marginTop: 20, marginBottom: 16, display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: 26 }}>🎁</span>
            <div>
              <div style={{ color: C.text, fontWeight: 700, fontSize: 13, fontFamily: "sans-serif" }}>Your Promo Code</div>
              <div style={{ color: C.primary, fontWeight: 800, fontSize: 16, fontFamily: "monospace", letterSpacing: 1 }}>CRAVE25</div>
              <div style={{ color: C.textMuted, fontSize: 11, fontFamily: "sans-serif" }}>Free delivery on your next 3 orders</div>
            </div>
          </div>
          {[
            { icon: "✏️", label: "Edit Profile", action: () => onNav("editProfile") },
            { icon: "📍", label: "Saved Addresses", action: () => {} },
            { icon: "💳", label: "Payment Methods", action: () => {} },
            { icon: "🔔", label: "Notifications", action: () => onNav("notifications") },
            { icon: "⭐", label: "Rate the App", action: () => {} },
            { icon: "❓", label: "Help & Support", action: () => onNav("support") },
            { icon: "🚪", label: "Sign Out", action: () => onNav("splash"), danger: true },
          ].map((item, i) => (
            <div key={i} onClick={item.action} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 0", borderBottom: `1px solid ${C.border}`, cursor: "pointer" }}>
              <div style={{ width: 36, height: 36, background: item.danger ? "#3F1515" : C.bgElevated, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{item.icon}</div>
              <span style={{ fontFamily: "sans-serif", fontSize: 14, color: item.danger ? "#EF4444" : C.text, fontWeight: item.danger ? 700 : 400, flex: 1 }}>{item.label}</span>
              <span style={{ color: C.textLight, fontSize: 18 }}>›</span>
            </div>
          ))}
        </div>
      </div>
      <BottomNav active="profile" onNav={onNav} />
    </div>
  );
}

function EditProfileScreen({ onNav, user, setUser, showToast }) {
  const [form, setForm] = useState({ name: user.name || "", email: user.email || "", phone: user.phone || "", address: user.address || "" });
  const save = () => { setUser(u => ({ ...u, ...form })); showToast("✅ Profile updated!"); onNav("back"); };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <FHeader title="Edit Profile" back onBack={() => onNav("back")} right={<button onClick={save} style={{ background: C.primary, border: "none", color: "white", borderRadius: 10, padding: "7px 14px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "sans-serif" }}>Save</button>} />
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ width: 76, height: 76, background: `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, margin: "0 auto 10px" }}>👤</div>
          <span style={{ color: C.primary, fontSize: 13, fontFamily: "sans-serif", fontWeight: 700, cursor: "pointer" }}>Change Photo</span>
        </div>
        <FInput label="Full Name" value={form.name} onChange={v => setForm(f => ({ ...f, name: v }))} placeholder="Your name" />
        <FInput label="Email" value={form.email} onChange={v => setForm(f => ({ ...f, email: v }))} placeholder="you@example.com" />
        <FInput label="Phone" value={form.phone} onChange={v => setForm(f => ({ ...f, phone: v }))} placeholder="+1 234 567 8900" />
        <FInput label="Default Address" value={form.address} onChange={v => setForm(f => ({ ...f, address: v }))} placeholder="123 Main Street..." />
        <FBtn label="Save Changes" onClick={save} />
      </div>
    </div>
  );
}

function NotificationsScreen({ onNav }) {
  const [notifs, setNotifs] = useState([
    { icon: "🛵", title: "Order on its way!", body: "Your Ember & Oak order is 5 minutes away", time: "5m ago", unread: true },
    { icon: "🎁", title: "New promo for you", body: "Free delivery all weekend — use code WEEKEND", time: "1h ago", unread: true },
    { icon: "⭐", title: "How was your order?", body: "Rate your Sakura Garden experience", time: "2h ago", unread: false },
    { icon: "🍕", title: "Casa Milano is back!", body: "Your favourite restaurant is open again", time: "1d ago", unread: false },
  ]);
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <FHeader title="Notifications" back onBack={() => onNav("back")} right={<button onClick={() => setNotifs(ns => ns.map(n => ({ ...n, unread: false })))} style={{ background: "none", border: "none", color: C.primary, fontSize: 12, cursor: "pointer", fontFamily: "sans-serif", fontWeight: 600 }}>Clear all</button>} />
      <div style={{ flex: 1, overflowY: "auto", padding: 14 }}>
        {notifs.map((n, i) => (
          <div key={i} onClick={() => setNotifs(ns => ns.map((nn, ii) => ii === i ? { ...nn, unread: false } : nn))} style={{ background: n.unread ? C.primaryGlow : C.bgCard, borderRadius: 16, padding: "14px", display: "flex", gap: 12, marginBottom: 10, border: `1px solid ${n.unread ? C.primary + "40" : C.border}`, cursor: "pointer" }}>
            <div style={{ width: 44, height: 44, background: C.bgElevated, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{n.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: C.text, marginBottom: 3, fontFamily: "sans-serif" }}>{n.title}</div>
              <div style={{ fontSize: 12, color: C.textMuted, fontFamily: "sans-serif", lineHeight: 1.5 }}>{n.body}</div>
              <div style={{ fontSize: 11, color: C.textLight, fontFamily: "sans-serif", marginTop: 5 }}>{n.time}</div>
            </div>
            {n.unread && <div style={{ width: 8, height: 8, background: C.primary, borderRadius: 50, flexShrink: 0, marginTop: 4 }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function SupportScreen({ onNav, showToast }) {
  const [messages, setMessages] = useState([{ from: "bot", text: "Hi there! 👋 I'm the Crave support assistant. How can I help you today?" }]);
  const [input, setInput] = useState("");
  const bottomRef = useRef();
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);
  const REPLIES = {
    "refund": "I can process a refund for you. Refunds take 3–5 business days to appear on your statement.",
    "late": "I'm sorry your order is late! I've notified the restaurant and your rider. You'll get a $5 credit for the wait.",
    "wrong": "I'm so sorry you received the wrong order! I'll arrange a replacement or full refund. Which do you prefer?",
    "cancel": "You can cancel an order within 2 minutes of placing it. Would you like me to cancel your current order?",
    "promo": "Your active promo code is CRAVE25 — use it for free delivery on your next 3 orders!",
  };
  const handleSend = () => {
    if (!input.trim()) return;
    const val = input.trim(); setInput("");
    setMessages(m => [...m, { from: "user", text: val }]);
    const key = Object.keys(REPLIES).find(k => val.toLowerCase().includes(k));
    const reply = key ? REPLIES[key] : "Thanks for reaching out! A support agent will be with you shortly. Average wait time: 2 minutes.";
    setTimeout(() => setMessages(m => [...m, { from: "bot", text: reply }]), 800);
  };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div style={{ background: C.bgCard, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
        <button onClick={() => onNav("back")} style={{ background: C.bgElevated, border: `1px solid ${C.border}`, color: C.text, fontSize: 16, cursor: "pointer", width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>
        <div style={{ width: 34, height: 34, background: C.primary, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🤖</div>
        <div>
          <div style={{ color: C.text, fontWeight: 700, fontSize: 14, fontFamily: "sans-serif" }}>Crave Support</div>
          <div style={{ color: C.green, fontSize: 10, fontFamily: "sans-serif" }}>● Online</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
        {/* Quick options */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {["refund", "late order", "wrong item", "cancel order", "promo code"].map((opt, i) => (
            <button key={i} onClick={() => { setInput(opt); }} style={{ background: C.bgElevated, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 20, padding: "6px 12px", fontSize: 11, fontFamily: "sans-serif", cursor: "pointer" }}>{opt}</button>
          ))}
        </div>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
            {m.from === "bot" && <div style={{ width: 26, height: 26, background: C.primary, borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, marginRight: 7, flexShrink: 0, alignSelf: "flex-end" }}>🤖</div>}
            <div style={{ maxWidth: "76%", background: m.from === "user" ? C.primary : C.bgCard, color: m.from === "user" ? "white" : C.text, borderRadius: m.from === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", padding: "11px 14px", fontSize: 13, fontFamily: "sans-serif", lineHeight: 1.55, border: m.from === "bot" ? `1px solid ${C.border}` : "none" }}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div style={{ background: C.bgCard, padding: "10px 14px", display: "flex", gap: 8, alignItems: "center", borderTop: `1px solid ${C.border}`, flexShrink: 0 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()} placeholder="Describe your issue..." style={{ flex: 1, background: C.bgElevated, border: `1px solid ${C.border}`, borderRadius: 22, padding: "11px 16px", fontSize: 13, fontFamily: "sans-serif", outline: "none", color: C.text }} />
        <button onClick={handleSend} style={{ width: 42, height: 42, background: C.primary, border: "none", borderRadius: 50, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 16, flexShrink: 0 }}>➤</button>
      </div>
    </div>
  );
}

// ── SHARED PRIMITIVES ────────────────────────────────────────────────────────
function FHeader({ title, back, onBack, right }) {
  return (
    <div style={{ background: C.bgCard, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10, borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
      {back && <button onClick={onBack} style={{ background: C.bgElevated, border: `1px solid ${C.border}`, color: C.text, fontSize: 16, cursor: "pointer", width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>←</button>}
      <span style={{ color: C.text, fontSize: 16, fontWeight: 800, flex: 1, fontFamily: "Georgia, serif" }}>{title}</span>
      {right}
    </div>
  );
}
function FInput({ label, placeholder, type = "text", value, onChange }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && <div style={{ fontSize: 11, color: C.textMuted, fontFamily: "sans-serif", marginBottom: 6, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>}
      <input type={type} placeholder={placeholder} value={value} onChange={e => onChange && onChange(e.target.value)} style={{ width: "100%", background: C.bgInput, border: `1px solid ${C.border}`, borderRadius: 12, padding: "13px 16px", fontSize: 14, color: C.text, fontFamily: "sans-serif", outline: "none", boxSizing: "border-box" }} onFocus={e => e.target.style.borderColor = C.primary} onBlur={e => e.target.style.borderColor = C.border} />
    </div>
  );
}
function FBtn({ label, variant = "primary", icon, onClick, disabled, small }) {
  const styles = {
    primary: { background: disabled ? "#555" : `linear-gradient(135deg, ${C.primary}, ${C.primaryDark})`, color: "white", boxShadow: disabled ? "none" : `0 6px 20px ${C.primary}35` },
    outline: { background: "transparent", color: C.primary, border: `1.5px solid ${C.primary}` },
    ghost: { background: C.bgElevated, color: C.text, border: `1px solid ${C.border}` },
  };
  return (
    <button onClick={!disabled ? onClick : undefined} style={{ ...styles[variant], borderRadius: 16, padding: small ? "10px 16px" : "14px 20px", textAlign: "center", fontFamily: "sans-serif", fontWeight: 700, fontSize: small ? 13 : 15, cursor: disabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginBottom: 10, width: "100%", border: styles[variant].border || "none", opacity: disabled ? 0.7 : 1 }}>
      {icon && <span>{icon}</span>}{label}
    </button>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────────────────────
export default function Restaurant() {
  const [screen, setScreen] = useState("splash");
  const [history, setHistory] = useState(["splash"]);
  const [user, setUser] = useState({ name: "Alex Carter", email: "alex@crave.app", phone: "+1 555 0123", address: "42 Oak Lane" });
  const [loginState, setLoginState] = useState({ email: "", password: "" });
  const [selectedRest, setSelectedRest] = useState(null);
  const [cart, setCart] = useState({});
  const [favRests, setFavRests] = useState([1, 2]);
  const [orders, setOrders] = useState(ORDERS_HISTORY);
  const [toast, setToast] = useState("");

  const showToast = (msg) => setToast(msg);

  const navigate = (s) => {
    if (s === "back") {
      const h = history.slice(0, -1);
      setHistory(h);
      setScreen(h[h.length - 1] || "home");
    } else {
      setHistory(h => [...h, s]);
      setScreen(s);
    }
  };

  const addToCart = (item) => {
    setCart(c => ({ ...c, [item.id]: { item, qty: (c[item.id]?.qty || 0) + 1 } }));
    showToast(`🛒 ${item.name} added to cart`);
  };
  const removeFromCart = (id) => {
    setCart(c => {
      const next = { ...c };
      if (next[id]?.qty > 1) next[id] = { ...next[id], qty: next[id].qty - 1 };
      else delete next[id];
      return next;
    });
  };
  const toggleFavRest = (id) => setFavRests(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  const placeOrder = () => {
    if (selectedRest) {
      const items = Object.values(cart).map(({ item }) => item.name);
      const total = Object.values(cart).reduce((s, { item, qty }) => s + item.price * qty, 0);
      setOrders(os => [{ id: `ORD-${Date.now().toString().slice(-4)}`, restaurant: selectedRest.name, items, total: total + (selectedRest.delivery || 0) + total * 0.08, date: "Just now", status: "Delivered", emoji: selectedRest.hero }, ...os]);
    }
    setCart({});
  };

  const p = { onNav: navigate, showToast };
  const renderScreen = () => {
    switch (screen) {
      case "splash": return <SplashScreen {...p} />;
      case "login": return <LoginScreen {...p} state={loginState} setState={setLoginState} />;
      case "signup": return <SignupScreen {...p} state={loginState} setState={setLoginState} />;
      case "forgot": return <ForgotScreen {...p} />;
      case "home": return <HomeScreen {...p} user={user} cart={cart} onSelectRest={setSelectedRest} onAddToCart={addToCart} favRests={favRests} onFavRest={toggleFavRest} />;
      case "restaurant": return <RestaurantScreen {...p} restaurant={selectedRest} cart={cart} onAddToCart={addToCart} onRemoveFromCart={removeFromCart} />;
      case "cart": return <CartScreen {...p} cart={cart} onAddToCart={addToCart} onRemoveFromCart={removeFromCart} restaurant={selectedRest} onPlaceOrder={placeOrder} />;
      case "tracking": return <TrackingScreen {...p} restaurant={selectedRest} />;
      case "explore": return <ExploreScreen {...p} onSelectRest={setSelectedRest} favRests={favRests} onFavRest={toggleFavRest} />;
      case "orders": return <OrdersScreen {...p} orders={orders} cart={cart} onSelectRest={setSelectedRest} />;
      case "profile": return <ProfileScreen {...p} user={user} setUser={setUser} orders={orders} favRests={favRests} />;
      case "editProfile": return <EditProfileScreen {...p} user={user} setUser={setUser} />;
      case "notifications": return <NotificationsScreen {...p} />;
      case "support": return <SupportScreen {...p} />;
      default: return <SplashScreen {...p} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#050505", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", padding: 20 }}>
      <div style={{ width: 390, height: 844, background: C.bg, borderRadius: 48, boxShadow: "0 50px 120px rgba(0,0,0,0.8), inset 0 0 0 2px rgba(255,255,255,0.06), 0 0 0 10px #111", overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }}>
        {/* Notch */}
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 120, height: 34, background: "#000", borderRadius: "0 0 22px 22px", zIndex: 100 }} />
        <div style={{ flexShrink: 0 }}><StatusBar /></div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
          {renderScreen()}
          {toast && <Toast msg={toast} onDone={() => setToast("")} />}
        </div>
        <div style={{ background: C.bg, padding: "6px 0 10px", display: "flex", justifyContent: "center", flexShrink: 0 }}>
          <div style={{ width: 130, height: 5, background: "#333", borderRadius: 3 }} />
        </div>
      </div>
    </div>
  );
}
