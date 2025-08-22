// pages/_app.js
import { useEffect, useState } from "react";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  const [chatOpen, setChatOpen] = useState(false);

  // close on ESC
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setChatOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <SiteHeader onOpenChat={() => setChatOpen(true)} />
      {/* content area; optional subtle blur when chat is open */}
      <div style={{ transition: "filter .2s ease", filter: chatOpen ? "blur(4px)" : "none" }}>
        <Component {...pageProps} />
      </div>
      {chatOpen && <ChatOverlay onClose={() => setChatOpen(false)} />}
    </>
  );
}

function SiteHeader({ onOpenChat }) {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      backdropFilter: "blur(8px)",
      background: "rgba(247,247,245,.75)",
      borderBottom: "1px solid #E5E7EB"
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: ".7rem 1.2rem",
        display: "grid", gridTemplateColumns: "120px 1fr 320px", alignItems: "center"
      }}>
        {/* Left: hamburger (no menu yet) */}
        <button aria-label="Menu" style={iconBtn}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18"/>
          </svg>
        </button>

        {/* Center: brand → home */}
        <div style={{ textAlign: "center" }}>
          <a href="/home" style={{ textDecoration: "none", color: "#111", letterSpacing: ".16em", fontWeight: 700 }}>
            SILVINO
          </a>
        </div>

        {/* Right: nav + search */}
        <nav style={{ display: "flex", justifyContent: "flex-end", gap: "1.1rem", alignItems: "center" }}>
          <a href="/home"   style={navLink}>WORK</a>
          <a href="/about#process" style={navLink}>PROCESS</a>
          <a href="/about"  style={navLink}>ABOUT</a>

          <button aria-label="Search" onClick={onOpenChat} style={iconBtn}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}

const navLink = { color: "#111", textDecoration: "none", fontWeight: 600, letterSpacing: ".06em" };
const iconBtn = {
  border: "1px solid #E5E7EB", background: "#fff", borderRadius: 999,
  width: 36, height: 36, display: "inline-grid", placeItems: "center", color: "#111", cursor: "pointer"
};

function ChatOverlay({ onClose }) {
  // Basic front-end “chat/search” shell — we’ll plug logic later
  return (
    <div role="dialog" aria-modal="true" style={overlay}>
      <div style={modal}>
        <input
          autoFocus
          type="text"
          placeholder="Ask about my work…"
          style={inputXL}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // Placeholder behavior for now
              // Later: call your API / search / chatbot
              onClose();
            }
          }}
        />
        <div style={{ marginTop: ".75rem", fontSize: ".85rem", opacity: .75 }}>
          Press <kbd>Enter</kbd> to submit · <button onClick={onClose} style={linkBtn}>Close</button>
        </div>
      </div>
    </div>
  );
}

const overlay = {
  position: "fixed", inset: 0, zIndex: 60,
  background: "rgba(0,0,0,.35)",
  backdropFilter: "blur(8px)"
};
const modal = {
  height: "100%", display: "grid", placeItems: "center", textAlign: "center", color: "#fff"
};
const inputXL = {
  width: "min(900px, 92vw)", fontSize: "clamp(28px, 6vw, 56px)", lineHeight: 1.15,
  padding: "1.1rem 1.4rem", borderRadius: 18, border: "1px solid rgba(255,255,255,.35)",
  background: "rgba(255,255,255,.08)", color: "#fff", outline: "none"
};
const linkBtn = { background: "none", border: "none", color: "#fff", textDecoration: "underline", cursor: "pointer" };
