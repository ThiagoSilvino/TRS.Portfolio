// components/nav-bar.js
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  const [overlay, setOverlay] = useState("none"); // 'none' | 'search' | 'menu'
  const [showTitle, setShowTitle] = useState(true);
  const rafRef = useRef(null);

  // --- Show SILVINO after scrolling past hero (home only) ---
  useEffect(() => {
    const onHome = router.pathname === "/home" || router.pathname === "/";
    if (!onHome) {
      setShowTitle(true);
      return;
    }

    setShowTitle(false);

    const getHeroBottom = () => {
      const img = document.querySelector('img[src="/meganametext.png"]');
      if (img) {
        const rect = img.getBoundingClientRect();
        const top = rect.top + window.scrollY;
        return top + rect.height;
      }
      return window.innerHeight * 0.85;
    };

    const handle = () => {
      const y = window.scrollY || 0;
      const threshold = getHeroBottom() - 80;
      setShowTitle(y > threshold);
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(handle);
    };

    handle();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [router.pathname]);

  // Lock body scroll while overlay open
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
            padding: "2rem",
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
              color: "#fff",
              display: "grid",
              gap: "3rem",
              justifyItems: "center",
            }}
          >
            {overlay === "search" ? (
              <SearchPane />
            ) : (
              <MenuPane />
            )}
            <div
              style={{
                fontSize: 14,
                letterSpacing: ".12em",
                textTransform: "uppercase",
                opacity: 0.8,
              }}
            >
              ©2025 Silvino
            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- Sub-components ---------- */

function SearchPane() {
  const inputRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ textAlign: "center", display: "grid", gap: "1.2rem" }}>
      <input
        ref={inputRef}
        placeholder="Ask me anything…"
        style={{
          width: "min(900px, 90vw)",
          margin: "0 auto",
          padding: "1rem",
          fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
          lineHeight: 1.2,
          color: "#fff",
          background: "transparent",
          border: "0",
          borderBottom: "2px solid rgba(255,255,255,.6)",
          outline: "none",
          textAlign: "center",
        }}
      />
    </div>
  );
}

function MenuPane() {
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
        gap: "2rem",
        justifyItems: "center",
      }}
    >
      <div
        style={{
          display: "grid",
          gap: "2rem",
          gridTemplateColumns: "repeat(3, minmax(0,1fr))",
          textAlign: "center",
        }}
      >
        <Section title="Explore">
          <a href="/home" style={linkStyle}>
            Home
          </a>
          <a href="/#projects" style={linkStyle}>
            Work
          </a>
          <a href="/process" style={linkStyle}>
            Process
          </a>
          <a href="/about" style={linkStyle}>
            About
          </a>
        </Section>

        <Section title="Connect">
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" style={linkStyle}>
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

        <Section title="Materials">
          <a href="/resume.pdf" style={linkStyle}>
            Résumé
          </a>
          <a href="/portfolio.pdf" style={linkStyle}>
            Portfolio
          </a>
          <a href="/resume.pdf" style={{ ...linkStyle, opacity: 0.8 }}>
            CV
          </a>
        </Section>
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
