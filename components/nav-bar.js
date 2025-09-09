// components/nav-bar.js
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  // Overlay state: 'none' | 'search' | 'menu'
  const [overlay, setOverlay] = useState("none");

  // Controls center title visibility
  const [showTitle, setShowTitle] = useState(true);

  // For smooth scroll checks
  const rafRef = useRef(null);

  // --- Determine when to show the centered SILVINO title ---
  useEffect(() => {
    // On home page, hide the title until we scroll past the hero image
    const onHome = router.pathname === "/home" || router.pathname === "/";
    if (!onHome) {
      setShowTitle(true);
      return;
    }

    // Home page: start hidden
    setShowTitle(false);

    const getHeroBottom = () => {
      // Try to find the hero name image
      const img = document.querySelector('img[src="/meganametext.png"]');
      if (img) {
        const rect = img.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        const bottom = top + rect.height;
        return bottom;
      }
      // Fallback: roughly one viewport tall
      return window.innerHeight * 0.85;
    };

    const handle = () => {
      const y = window.scrollY || 0;
      const threshold = getHeroBottom() - 80; // bias so it appears a bit earlier
      setShowTitle(y > threshold);
    };

    // rAF-ed scroll listener for smoother updates
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(handle);
    };

    handle(); // run once on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [router.pathname]);

  // --- Locks body scroll while overlay is open ---
  useEffect(() => {
    if (overlay !== "none") {
      const { overflow } = document.body.style;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = overflow;
      };
    }
  }, [overlay]);

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
            height: 60,
          }}
        >
          {/* Left: Search button */}
          <button
            aria-label="Open search"
            onClick={() => setOverlay("search")}
            style={iconBtn}
          >
            <img
              src="/magnify-icon.png"
              alt=""
              width={22}
              height={22}
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
              opacity: showTitle ? 1 : 0,
              transition: "opacity .28s ease",
              pointerEvents: showTitle ? "auto" : "none",
            }}
          >
            SILVINO
          </div>

          {/* Right: Hamburger */}
          <div style={{ justifySelf: "end" }}>
            <button
              aria-label="Open menu"
              onClick={() => setOverlay("menu")}
              style={iconBtn}
            >
              <img
                src="/ham-icon.png"
                alt=""
                width={22}
                height={22}
                style={{ display: "block" }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* ------------------- OVERLAYS ------------------- */}
      {overlay !== "none" && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 70,
            backdropFilter: "blur(16px)",
            background: "rgba(0,0,0,.35)",
            display: "grid",
            placeItems: "center",
          }}
        >
          {/* Close button (top-right) */}
          <button
            aria-label="Close overlay"
            onClick={() => setOverlay("none")}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              ...iconBtn,
              border: "1px solid rgba(255,255,255,.35)",
              background: "transparent",
            }}
          >
            <img
              src="/esc-icon.png"
              alt=""
              width={18}
              height={18}
              style={{ display: "block", filter: "invert(1)" }}
            />
          </button>

          {/* Content (transparent; text in white) */}
          <div
            style={{
              width: "min(1100px, 92vw)",
              margin: "0 auto",
              padding: "min(3vw, 24px)",
              color: "#fff",
            }}
          >
            {overlay === "search" ? (
              <SearchPane onClose={() => setOverlay("none")} />
            ) : (
              <MenuPane onClose={() => setOverlay("none")} />
            )}
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- Sub-components ---------- */

function SearchPane({ onClose }) {
  const inputRef = useRef(null);

  useEffect(() => {
    // focus input when opened
    const t = setTimeout(() => inputRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ textAlign: "center", display: "grid", gap: "1.2rem" }}>
      <label
        htmlFor="site-search"
        style={{
          fontSize: "clamp(1rem, 1.8vw, 1.2rem)",
          letterSpacing: ".12em",
          textTransform: "uppercase",
          opacity: 0.85,
        }}
      >
        Search
      </label>
      <input
        id="site-search"
        ref={inputRef}
        placeholder="Ask me anything…"
        style={{
          width: "min(900px, 90vw)",
          margin: "0 auto",
          padding: "1.1rem 1.2rem",
          fontSize: "clamp(1.4rem, 4.2vw, 2.8rem)",
          lineHeight: 1.2,
          color: "#fff",
          background: "transparent",
          border: "0",
          borderBottom: "2px solid rgba(255,255,255,.6)",
          outline: "none",
          textAlign: "center",
        }}
      />
      <p style={{ margin: 0, opacity: 0.8 }}>
        Try “courtyard”, “pavilion”, or “Winnipeg”
      </p>
    </div>
  );
}

function MenuPane({ onClose }) {
  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    fontSize: "clamp(1.1rem, 2vw, 1.25rem)",
    fontWeight: 600,
    letterSpacing: ".02em",
  };

  return (
    <div
      style={{
        display: "grid",
        gap: "2.25rem",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0,1fr))",
          gap: "1.5rem",
        }}
      >
        <Section title="Pages">
          <a href="/home" style={linkStyle} onClick={onClose}>
            Home
          </a>
          <a href="/#projects" style={linkStyle} onClick={onClose}>
            Work
          </a>
          <a href="/process" style={linkStyle} onClick={onClose}>
            Process
          </a>
          <a href="/about" style={linkStyle} onClick={onClose}>
            About
          </a>
        </Section>

        <Section title="Connect">
          <a href="http://linkedin.com/in/thiago-silvino-6250b818" target="_blank" rel="noreferrer" style={linkStyle}>
            LinkedIn
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer" style={linkStyle}>
            Instagram
          </a>
          <a href="https://www.pinterest.com" target="_blank" rel="noreferrer" style={linkStyle}>
            Pinterest
          </a>
          <a href="https://vimeo.com" target="_blank" rel="noreferrer" style={linkStyle}>
            Vimeo
          </a>
        </Section>

        <Section title="Downloads">
          <a href="/resume.pdf" style={linkStyle} onClick={onClose}>
            Résumé (PDF)
          </a>
          <a href="/portfolio.pdf" style={linkStyle} onClick={onClose}>
            Portfolio (PDF)
          </a>
          <a href="/resume.pdf" style={{ ...linkStyle, opacity: 0.8 }} onClick={onClose}>
            CV (PDF)
          </a>
        </Section>

        <div
          style={{
            display: "grid",
            alignContent: "space-between",
            justifyItems: "end",
            textAlign: "right",
          }}
        >
          <div style={{ letterSpacing: ".12em", textTransform: "uppercase", opacity: 0.85 }}>
            ©2025 Silvino
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ display: "grid", gap: ".75rem" }}>
      <div
        style={{
          textTransform: "uppercase",
          letterSpacing: ".14em",
          opacity: 0.7,
          fontSize: ".95rem",
        }}
      >
        {title}
      </div>
      <div style={{ display: "grid", gap: ".5rem" }}>{children}</div>
    </div>
  );
}

/* ---------- shared small styles ---------- */
const iconBtn = {
  appearance: "none",
  border: "1px solid #d1d5db",
  background: "#fff",
  color: "#111",
  width: 40,
  height: 40,
  borderRadius: 10,
  display: "grid",
  placeItems: "center",
  cursor: "pointer",
};
