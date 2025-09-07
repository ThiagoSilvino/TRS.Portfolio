// components/nav-bar.js
import { useEffect, useState } from "react";

/**
 * NavBar
 * - variant="home" → brand appears after scroll (hidden at top)
 * - default (no variant) → brand always visible
 */
export default function NavBar({ variant }) {
  const isHome = variant === "home";
  const [showBrand, setShowBrand] = useState(!isHome); // hidden initially on home
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Reveal brand on scroll (home only)
  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      const y = window.scrollY || 0;
      setShowBrand(y > 60); // adjust threshold if needed
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Lock body scroll when overlays are open
  useEffect(() => {
    const anyOpen = menuOpen || searchOpen;
    const { body } = document;
    if (!body) return;
    if (anyOpen) {
      const prev = body.style.overflow;
      body.style.overflow = "hidden";
      return () => {
        body.style.overflow = prev || "";
      };
    }
  }, [menuOpen, searchOpen]);

  const closeAll = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  };

  return (
    <>
      {/* Sticky header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 60,
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
          {/* Left: search button */}
          <div>
            <button
              aria-label="Open search"
              onClick={() => {
                setSearchOpen(true);
                setMenuOpen(false);
              }}
              style={iconButton}
            >
              <img
                src="/magnify-icon.png"
                alt="Search"
                style={iconImg}
                draggable={false}
              />
            </button>
          </div>

          {/* Center: brand */}
          <div
            aria-hidden={!showBrand}
            style={{
              textAlign: "center",
              letterSpacing: ".18em",
              textTransform: "uppercase",
              fontWeight: 700,
              opacity: showBrand ? 1 : 0,
              transform: showBrand ? "translateY(0px)" : "translateY(-6px)",
              transition: "opacity .25s ease, transform .25s ease",
              pointerEvents: showBrand ? "auto" : "none",
            }}
          >
            SILVINO
          </div>

          {/* Right: hamburger */}
          <div style={{ justifySelf: "end" }}>
            <button
              aria-label="Open menu"
              onClick={() => {
                setMenuOpen(true);
                setSearchOpen(false);
              }}
              style={iconButton}
            >
              <img
                src="/ham-icon.png"
                alt="Menu"
                style={iconImg}
                draggable={false}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* ======== SEARCH OVERLAY ======== */}
      {searchOpen && (
        <div style={overlay} onClick={closeAll}>
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            style={searchPanel}
          >
            <div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
              <img
                src="/magnify-icon.png"
                alt=""
                aria-hidden="true"
                style={{ width: 18, height: 18, display: "block" }}
                draggable={false}
              />
              <input
                autoFocus
                placeholder="Search…"
                onKeyDown={(e) => {
                  if (e.key === "Escape") closeAll();
                }}
                style={searchInput}
              />
              <button
                aria-label="Close search"
                onClick={closeAll}
                style={ghostButton}
              >
                <img
                  src="/esc-icon.png"
                  alt=""
                  aria-hidden="true"
                  style={{ width: 18, height: 18, display: "block" }}
                  draggable={false}
                />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======== MEGA MENU DRAWER (FULLSCREEN) ======== */}
      {menuOpen && (
        <div style={overlay} onClick={closeAll}>
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            style={menuPanel}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ letterSpacing: ".18em", textTransform: "uppercase", fontWeight: 700 }}>
                Menu
              </div>
              <button aria-label="Close menu" onClick={closeAll} style={ghostButton}>
                <img
                  src="/esc-icon.png"
                  alt=""
                  aria-hidden="true"
                  style={{ width: 18, height: 18, display: "block" }}
                  draggable={false}
                />
              </button>
            </div>

            <div style={{ display: "grid", gap: "1.25rem", marginTop: "1.25rem" }}>
              {/* Primary navigation (big targets) */}
              <a href="/home" style={menuLink}>Home</a>
              <a href="/home#projects" style={menuLink}>Work</a>
              <a href="/process" style={menuLink}>Process</a>
              <a href="/about" style={menuLink}>About</a>
            </div>

            {/* Secondary: downloads/social */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "2rem", color: "#6B7280" }}>
              <a href="/resume.pdf" style={miniLink}>Resume</a>
              <a href="/portfolio.pdf" style={miniLink}>Portfolio</a>
              <a href="/cv.pdf" style={miniLink}>CV</a>
              <span style={{ opacity: .4 }}>·</span>
              <a href="https://www.instagram.com" target="_blank" rel="noreferrer" style={miniLink}>Instagram</a>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" style={miniLink}>LinkedIn</a>
              <a href="https://www.pinterest.com" target="_blank" rel="noreferrer" style={miniLink}>Pinterest</a>
              <a href="https://vimeo.com" target="_blank" rel="noreferrer" style={miniLink}>Vimeo</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ===== styles ===== */
const iconButton = {
  appearance: "none",
  border: "1px solid #d1d5db",
  background: "#fff",
  color: "#111",
  width: 40,
  height: 40,
  borderRadius: 10,
  fontSize: 18,
  lineHeight: 1,
  display: "grid",
  placeItems: "center",
  cursor: "pointer",
};

const iconImg = {
  width: 18,
  height: 18,
  display: "block",
};

const overlay = {
  position: "fixed",
  inset: 0,
  zIndex: 70,
  background: "rgba(17, 17, 17, 0.5)",
  display: "grid",
  placeItems: "center",
  padding: "1rem",
};

const searchPanel = {
  width: "min(720px, 96vw)",
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 14,
  padding: "0.9rem 1rem",
  boxShadow: "0 10px 40px rgba(0,0,0,.12)",
};

const searchInput = {
  flex: 1,
  border: "1px solid #e5e7eb",
  borderRadius: 10,
  padding: ".65rem .8rem",
  outline: "none",
  fontSize: "1rem",
};

const ghostButton = {
  appearance: "none",
  border: "1px solid #e5e7eb",
  background: "#fff",
  color: "#111",
  width: 36,
  height: 36,
  borderRadius: 10,
  display: "grid",
  placeItems: "center",
  cursor: "pointer",
};

const menuPanel = {
  width: "min(900px, 94vw)",
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 16,
  padding: "1rem 1.1rem 1.25rem",
  boxShadow: "0 10px 40px rgba(0,0,0,.14)",
};

const menuLink = {
  display: "block",
  textDecoration: "none",
  color: "#111",
  fontWeight: 700,
  fontSize: "clamp(1.6rem, 4.2vw, 2.4rem)",
  letterSpacing: ".01em",
  padding: ".2rem 0",
};

const miniLink = {
  textDecoration: "none",
  color: "#374151",
  fontSize: ".95rem",
};
