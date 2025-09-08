// components/nav-bar.js
import { useEffect, useRef, useState } from "react";

export default function NavBar() {
  const [mode, setMode] = useState(null); // null | 'search' | 'menu'
  const searchInputRef = useRef(null);

  // Auto-focus search field when opened
  useEffect(() => {
    if (mode === "search" && searchInputRef.current) {
      // delay ensures mount complete
      const t = setTimeout(() => searchInputRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
  }, [mode]);

  // ESC to close
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMode(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openSearch = () => setMode("search");
  const openMenu = () => setMode("menu");
  const closeOverlay = () => setMode(null);

  return (
    <>
      {/* Sticky header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(8px)",
          background: "rgba(247,247,245,.85)",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <nav
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: ".8rem 1.5rem",
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
          }}
        >
          {/* Left: Search */}
          <button
            onClick={openSearch}
            aria-label="Open search"
            style={iconBtn}
          >
            <img
              src="/magnify-icon.png"
              alt=""
              width={22}
              height={22}
              draggable={false}
              style={{ display: "block" }}
            />
          </button>

          {/* Center: SILVINO */}
          <div
            style={{
              textAlign: "center",
              letterSpacing: ".18em",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            SILVINO
          </div>

          {/* Right: Hamburger */}
          <div style={{ justifySelf: "end" }}>
            <button
              onClick={openMenu}
              aria-label="Open menu"
              style={iconBtn}
            >
              <img
                src="/ham-icon.png"
                alt=""
                width={22}
                height={22}
                draggable={false}
                style={{ display: "block" }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Shared full-screen overlay */}
      {mode && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={closeOverlay}
          style={overlayWrap}
        >
          {/* inner content area (clicks inside should not close) */}
          <div onClick={(e) => e.stopPropagation()} style={overlayInner}>
            {/* Close button (top-right) */}
            <button
              onClick={closeOverlay}
              aria-label="Close overlay"
              style={closeBtn}
            >
              <img
                src="/esc-icon.png"
                alt=""
                width={18}
                height={18}
                draggable={false}
                style={{ display: "block" }}
              />
            </button>

            {/* SEARCH MODE */}
            {mode === "search" && (
              <div style={searchBox}>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Ask me anything…"
                  aria-label="Search"
                  style={searchInput}
                />
                <p style={hintText}>
                  Hit <kbd style={kbd}>Enter</kbd> to submit · <kbd style={kbd}>Esc</kbd> to close
                </p>
              </div>
            )}

            {/* MENU MODE */}
            {mode === "menu" && (
              <div style={menuWrap}>
                <div style={menuCol}>
                  <h3 style={colTitle}>Explore</h3>
                  <a href="/home" style={menuLink}>Home</a>
                  <a href="/projects/manitoba-curling" style={menuLink}>Work</a>
                  <a href="/process" style={menuLink}>Process</a>
                  <a href="/about" style={menuLink}>About</a>
                </div>
                <div style={menuCol}>
                  <h3 style={colTitle}>Connect</h3>
                  <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" style={menuLink}>LinkedIn</a>
                  <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" style={menuLink}>Instagram</a>
                  <a href="https://www.pinterest.com/" target="_blank" rel="noreferrer" style={menuLink}>Pinterest</a>
                  <a href="https://vimeo.com/" target="_blank" rel="noreferrer" style={menuLink}>Vimeo</a>
                </div>
                <div style={menuCol}>
                  <h3 style={colTitle}>Materials</h3>
                  <a href="/resume.pdf" style={menuLink} download>Resume</a>
                  <a href="/portfolio.pdf" style={menuLink} download>Portfolio</a>
                  <a href="/resume.pdf" style={menuLink} download>CV</a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- styles ---------- */
const iconBtn = {
  appearance: "none",
  border: "1px solid #d1d5db",
  background: "#fff",
  color: "#111",
  width: 40,
  height: 40,
  borderRadius: 10,
  fontSize: 20,
  lineHeight: 1,
  display: "grid",
  placeItems: "center",
  cursor: "pointer",
};

const overlayWrap = {
  position: "fixed",
  inset: 0,
  zIndex: 80,
  background: "rgba(10,10,10,.35)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  display: "grid",
  placeItems: "center",
  padding: "3.5vh 1.5rem",
};

const overlayInner = {
  position: "relative",
  width: "min(1000px, 96vw)",
  borderRadius: 16,
  background: "rgba(255,255,255,.8)",
  border: "1px solid #e5e7eb",
  boxShadow: "0 20px 80px rgba(0,0,0,.25)",
  padding: "clamp(16px, 3.5vw, 28px)",
};

const closeBtn = {
  position: "absolute",
  top: 12,
  right: 12,
  width: 36,
  height: 36,
  borderRadius: 10,
  border: "1px solid #d1d5db",
  background: "#fff",
  cursor: "pointer",
  display: "grid",
  placeItems: "center",
};

const searchBox = {
  display: "grid",
  gap: "0.75rem",
  padding: "clamp(24px, 5vw, 40px) clamp(16px, 4vw, 36px)",
};

const searchInput = {
  width: "100%",
  fontSize: "clamp(20px, 5vw, 46px)",
  lineHeight: 1.2,
  fontWeight: 600,
  border: "none",
  outline: "none",
  background: "transparent",
  padding: "0 0 .25rem 0",
  borderBottom: "2px solid #111",
};

const hintText = {
  margin: 0,
  color: "#6B7280",
  fontSize: 14,
};

const kbd = {
  background: "#111",
  color: "#fff",
  borderRadius: 6,
  padding: "2px 6px",
  fontSize: 12,
};

const menuWrap = {
  display: "grid",
  gap: "2.2rem",
  gridTemplateColumns: "repeat(3, 1fr)",
  padding: "clamp(24px, 5vw, 40px) clamp(16px, 4vw, 36px)",
};

const menuCol = {
  display: "grid",
  gap: ".6rem",
};

const colTitle = {
  margin: 0,
  color: "#9CA3AF",
  textTransform: "uppercase",
  letterSpacing: ".14em",
  fontSize: 12,
};

const menuLink = {
  textDecoration: "none",
  color: "#111",
  fontWeight: 600,
  fontSize: "clamp(16px, 2.6vw, 20px)",
};
