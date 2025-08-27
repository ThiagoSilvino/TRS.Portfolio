// pages/_app.js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [chatOpen, setChatOpen]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [showBrand, setShowBrand] = useState(false);

  // Show "SILVINO" in header only after the hero name scrolls out of view.
  // Looks for an element with id="hero-name" (added on the Home page).
  useEffect(() => {
    const el = document.getElementById("hero-name");
    if (!el) { setShowBrand(true); return; } // no hero sentinel on this page → always show
    const obs = new IntersectionObserver(
      ([entry]) => setShowBrand(!entry.isIntersecting),
      { threshold: 0.01 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [router.pathname]);

  // ESC closes overlays
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setChatOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onOpenChat = () => { setMenuOpen(false); setChatOpen(true); };
  const onOpenMenu = () => { setChatOpen(false); setMenuOpen(true); };

  const isLanding  = router.pathname === "/";
  const showFooter = !isLanding;

  return (
    <>
      <Head>
        {/* Global favicon */}
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
      </Head>

      {/* Header is hidden on the landing page */}
      {!isLanding && (
        <SiteHeader
          showBrand={showBrand}
          onOpenChat={onOpenChat}
          onOpenMenu={onOpenMenu}
        />
      )}

      {/* blur content when an overlay is open */}
      <div style={{ transition: "filter .2s ease", filter: (chatOpen || menuOpen) ? "blur(6px)" : "none" }}>
        <Component {...pageProps} />
      </div>

      {showFooter && <SiteFooter />}

      {chatOpen && <ChatOverlay onClose={() => setChatOpen(false)} />}
      {menuOpen && <MegaMenu   onClose={() => setMenuOpen(false)} />}
    </>
  );
}

/* ========================= Header ========================= */
function SiteHeader({ showBrand, onOpenChat, onOpenMenu }) {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      backdropFilter: "blur(8px)",
      background: "rgba(247,247,245,.75)",
      borderBottom: "1px solid #E5E7EB"
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: ".7rem 1.2rem",
        display: "grid",
        gridTemplateColumns: "120px 1fr 120px", // L:icon  C:brand  R:icon
        alignItems: "center"
      }}>
        {/* LEFT: SEARCH */}
        <button aria-label="Search" onClick={onOpenChat} style={iconBtn}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>
          </svg>
        </button>

        {/* CENTER: SILVINO (shows after passing hero) */}
        <div style={{ textAlign: "center", visibility: showBrand ? "visible" : "hidden" }}>
          <a href="/home" style={{ textDecoration: "none", color: "#111", letterSpacing: ".16em", fontWeight: 700 }}>
            SILVINO
          </a>
        </div>

        {/* RIGHT: HAMBURGER */}
        <button aria-label="Menu" onClick={onOpenMenu} style={iconBtn}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18"/>
          </svg>
        </button>
      </div>

      {/* Primary nav (text links) */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 .9rem .6rem", display: "flex", gap: "1.1rem", justifyContent: "flex-end" }}>
        <a href="/home"    style={navLink}>WORK</a>
        <a href="/process" style={navLink}>PROCESS</a>
        <a href="/about"   style={navLink}>ABOUT</a>
      </div>
    </header>
  );
}

const navLink = { color: "#111", textDecoration: "none", fontWeight: 500, letterSpacing: ".06em" };
const iconBtn = {
  border: "none", background: "transparent", borderRadius: 0,
  width: 36, height: 36, display: "inline-grid", placeItems: "center", color: "#111", cursor: "pointer"
};

/* ========================= Footer ========================= */
function SiteFooter() {
  return (
    <footer style={{
      borderTop: "1px solid #E5E7EB",
      background: "#fff",
      color: "#111",
      marginTop: "3rem"
    }}>
      <div style={{
        maxWidth: 1280, margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr) 1fr",
        gap: "2rem",
        padding: "2rem 1.2rem"
      }}>
        <FooterCol title="NAVIGATION" items={[
          { label: "HOME", href: "/home" },
          { label: "ABOUT", href: "/about" },
          { label: "WORKS", href: "/home#projects" },
          { label: "CONTACT", href: "/about#contact" },
        ]} />
        <FooterCol title="CONNECT" items={[
          { label: "LINKEDIN",  href: "https://www.linkedin.com/", ext: true },
          { label: "INSTAGRAM", href: "https://instagram.com/",   ext: true },
          { label: "EMAIL",     href: "mailto:youremail@example.com" },
        ]} />
        <FooterCol title="DOWNLOADS" items={[
          { label: "RESUME",    href: "/resume.pdf" },
          { label: "PORTFOLIO", href: "/portfolio.pdf" },
        ]} />
        <div style={{ alignSelf: "start", textAlign: "right", opacity: .8 }}>
          ©{new Date().getFullYear()} SILVINO
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div>
      <div style={{ fontSize: ".8rem", letterSpacing: ".12em", color: "#6B7280", marginBottom: ".65rem" }}>{title}</div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: ".4rem" }}>
        {items.map((it) => (
          <li key={it.label}>
            <a
              href={it.href}
              target={it.ext ? "_blank" : undefined}
              rel={it.ext ? "noreferrer noopener" : undefined}
              style={{ textDecoration: "none", color: "#111" }}
            >
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ========================= Chat Overlay ========================= */
function ChatOverlay({ onClose }) {
  return (
    <div role="dialog" aria-modal="true" style={overlay}>
      <button onClick={onClose} aria-label="Close search" style={closeX}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
      <div style={modal}>
        <input
          autoFocus
          type="text"
          placeholder="Let’s talk… Ask anything"
          style={inputXL}
          onKeyDown={(e) => e.key === "Enter" && onClose()}
        />
      </div>
    </div>
  );
}

const overlay = { position: "fixed", inset: 0, zIndex: 60, background: "rgba(0,0,0,.35)", backdropFilter: "blur(10px)" };
const modal   = { height: "100%", display: "grid", placeItems: "center", textAlign: "center", color: "#fff" };
const inputXL = {
  width: "min(900px, 92vw)", fontSize: "clamp(28px, 6vw, 56px)", lineHeight: 1.15,
  padding: "1.1rem 1.4rem", borderRadius: 18, border: "1px solid rgba(255,255,255,.55)",
  background: "rgba(0,0,0,.25)", color: "#fff", outline: "none"
};
const closeX  = { position: "fixed", top: 14, right: 14, zIndex: 61, background: "none", border: "none", cursor: "pointer" };

/* ========================= Mega Menu ========================= */
function MegaMenu({ onClose }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 60,
      background: "rgba(255,255,255,.9)", backdropFilter: "blur(8px)"
    }}>
      <button
        onClick={onClose}
        aria-label="Close menu"
        style={{ position: "absolute", top: 14, right: 14, background: "none", border: "none", cursor: "pointer" }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div style={{
        maxWidth: 1280, margin: "0 auto", padding: "3.5rem 1.5rem",
        display: "grid", gap: "2.5rem", gridTemplateColumns: "repeat(4, minmax(180px, 1fr))"
      }}>
        <MenuColumn title="DESIGN"        items={["View All", "Furniture", "Technology", "Product", "Interior"]} />
        <MenuColumn title="ARCHITECTURE"  items={["View All", "Commercial", "Public Space", "Residential"]} />
        <MenuColumn title="PHOTOGRAPHY"   items={["View All", "Conceptual", "Documentary", "Editorial", "Landscape"]} />
        <MenuColumn title="ART"           items={["View All", "Digital", "Drawing", "Painting", "Sculpture"]} />
      </div>
    </div>
  );
}

function MenuColumn({ title, items }) {
  return (
    <div>
      <div style={{ fontSize: ".9rem", letterSpacing: ".12em", color: "#6B7280", marginBottom: ".8rem" }}>{title}</div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: ".55rem" }}>
        {items.map((label) => (
          <li key={label}>
            <a href="#" style={{ textDecoration: "none", color: "#111" }}>{label.toUpperCase()}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
