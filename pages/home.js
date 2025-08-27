{/* ===================== NAV ===================== */}
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
    {/* Left: search icon (unchanged) */}
    <div style={{ fontSize: "1rem" }}>🔍</div>

    {/* Center: brand (unchanged) */}
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

    {/* Right: hamburger menu (replaces Work/Process/About) */}
    <div style={{ justifySelf: "end" }}>
      <button
        aria-label="Open menu"
        style={{
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
        }}
      >
        {/* simple hamburger glyph */}
        ☰
      </button>
    </div>
  </nav>
</header>
