import { useEffect, useState } from "react";

export default function NavBarFoundry() {
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showCenterTitle, setShowCenterTitle] = useState(true); // default true for non-home pages

  // Show the centered title only after the hero image has scrolled out of view
  useEffect(() => {
    // Try to find the Foundry hero image on the page
    const heroImg =
      typeof window !== "undefined"
        ? document.querySelector('img[src="/foundrybau.png"]')
        : null;

    // If no hero is present (e.g., other pages), just show the title
    if (!heroImg) {
      setShowCenterTitle(true);
      return;
    }

    // If hero *is* present, hide the title while the hero is visible
    // and show it once the hero is out of view
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // When hero is intersecting (visible), hide the title
        // When it’s gone, show the title
        setShowCenterTitle(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.01,
      }
    );

    io.observe(heroImg);

    // Safety fallback in case IntersectionObserver fails
    const onScroll = () => {
      const rect = heroImg.getBoundingClientRect();
      // If bottom of hero is at or above the top of the viewport, show title
      setShowCenterTitle(rect.bottom <= 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close overlays on ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setShowMenu(false);
        setShowSearch(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* Sticky header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
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
          {/* Left: Search trigger */}
          <div>
            <button
              aria-label="Open search"
              onClick={() => {
                setShowSearch(true);
                setShowMenu(false);
              }}
              style={iconBtn}
            >
              <img
                src="/magnify-icon.png"
                alt=""
                width={18}
                height={18}
                style={{ display: "block", opacity: 0.9 }}
              />
            </button>
          </div>

          {/* Center title (only after passing hero) */}
          <div
            style={{
              textAlign: "center",
              letterSpacing: ".18em",
              textTransform: "uppercase",
              fontWeight: 700,
              opacity: showCenterTitle ? 1 : 0,
              transition: "opacity 220ms ease",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            FOUNDRY
          </div>

          {/* Right: Menu trigger */}
          <div style={{ justifySelf: "end" }}>
            <button
              aria-label="Open menu"
              onClick={() => {
                setShowMenu(true);
                setShowSearch(false);
              }}
              style={iconBtn}
            >
              <img
                src="/ham-icon.png"
                alt=""
                width={18}
                height={18}
                style={{ display: "block", opacity: 0.9 }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* SEARCH OVERLAY */}
      {showSearch && (
        <div style={overlay}>
          {/* Close (top-left to match the magnifier location) */}
          <button
            aria-label="Close"
            onClick={() => setShowSearch(false)}
            style={{ ...closeBtn, left: 12, right: "auto" }}
          >
            ×
          </button>

          <div style={overlayInner}>
            <input
              autoFocus
              placeholder="ask me anything"
              style={searchInput}
            />
            <div style={copyright}>©2025 SILVINO</div>
          </div>
        </div>
      )}

      {/* MENU OVERLAY */}
      {showMenu && (
        <div style={overlay}>
          {/* Close (top-right to match the hamburger location) */}
          <button
            aria-label="Close"
            onClick={() => setShowMenu(false)}
            style={{ ...closeBtn, right: 12, left: "auto" }}
          >
            ×
          </button>

          <div style={overlayInner}>
            <div style={menuGrid}>
              <div>
                <div style={menuHead}>Explore</div>
                <a style={menuLink} href="/homefoundry">
                  Home
                </a>
                <a style={menuLink} href="/process">
                  Process
                </a>
                <a style={menuLink} href="/about">
                  About
                </a>
              </div>
              <div>
                <div style={menuHead}>Connect</div>
                <a style={menuLink} href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a style={menuLink} href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                  Instagram
                </a>
                <a style={menuLink} href="https://www.pinterest.com/" target="_blank" rel="noreferrer">
                  Pinterest
                </a>
                <a style={menuLink} href="https://vimeo.com/" target="_blank" rel="noreferrer">
                  Vimeo
                </a>
              </div>
              <div>
                <div style={menuHead}>Materials</div>
                <a style={menuLink} href="/resume.pdf" download>
                  Resume
                </a>
                <a style={menuLink} href="/portfolio.pdf" download>
                  Portfolio
                </a>
                <a style={menuLink} href="/resume.pdf" download>
                  CV
                </a>
              </div>
            </div>

            <div style={copyright}>©2025 SILVINO</div>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- tiny styles ---------- */

const iconBtn = {
  appearance: "none",
  border: "none",          // remove border
  background: "transparent", // remove background
  color: "#111",           // text color if needed
  width: 40,
  height: 40,
  borderRadius: 0,         // no rounded box anymore
  fontSize: 18,
  lineHeight: 1,
  display: "grid",
  placeItems: "center",
  cursor: "pointer",
  padding: 0,              // make sure no extra space
};

const overlay = {
  position: "fixed",
  inset: 0,
  zIndex: 200,
  background: "rgba(0,0,0,.45)", // darker + no white panel
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  color: "#fff",
  display: "grid",
  placeItems: "center",
  padding: "2rem 1.25rem",
};

const overlayInner = {
  display: "grid",
  gap: "2rem",
  justifyItems: "center",
  textAlign: "center",
  width: "min(1100px, 96vw)",
};

const closeBtn = {
  position: "absolute",
  top: 12,
  width: 40,
  height: 40,
  borderRadius: 10,
  fontSize: 24,
  lineHeight: 1,
  display: "grid",
  placeItems: "center",
  border: "1px solid rgba(255,255,255,.35)",
  background: "rgba(255,255,255,.08)",
  color: "#fff",
  cursor: "pointer",
};

const searchInput = {
  width: "min(900px, 92vw)",
  fontSize: "clamp(28px, 5vw, 72px)",
  fontWeight: 700,
  letterSpacing: ".02em",
  textAlign: "center",
  color: "#fff",
  background: "transparent",
  border: "none",
  outline: "none",
  caretColor: "#fff",
};

const menuGrid = {
  display: "grid",
  gap: "2.5rem",
  gridTemplateColumns: "repeat(3, minmax(180px, 1fr))",
  alignItems: "start",
  justifyItems: "center",
};

const menuHead = {
  fontSize: 12,
  letterSpacing: ".22em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,.7)",
  marginBottom: ".75rem",
};

const menuLink = {
  display: "block",
  fontSize: "clamp(18px, 2.4vw, 26px)",
  fontWeight: 600,
  textDecoration: "none",
  color: "#fff",
  margin: ".35rem 0",
};

const copyright = {
  marginTop: "2.5rem",
  fontSize: 12,
  letterSpacing: ".22em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,.7)",
};
