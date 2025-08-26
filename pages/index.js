// pages/index.js
export default function Landing() {
  return (
    <main style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Background video */}
      <video
        src="/landing.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", filter: "grayscale(20%) contrast(105%) opacity(.75)"
        }}
      />

      {/* Foreground content */}
      <div style={{
        position: "relative", zIndex: 1,
        maxWidth: 1280, margin: "0 auto", padding: "2rem 1.5rem",
        height: "100%", display: "grid", alignContent: "center", gap: "2rem"
      }}>
        {/* Name aligned as on Home */}
        <h1
          style={{
            margin: 0,
            fontWeight: 800,
            letterSpacing: ".02em",
            lineHeight: 1.1,
            // Keep on one line; scale down only if absolutely necessary
            whiteSpace: "nowrap",
            fontSize: "clamp(1.6rem, 6vw, 3.2rem)",
            mixBlendMode: "difference",  // “alive” against video
            color: "#fff"
          }}
        >
          THIAGO ROCHA SILVINO.
        </h1>

        {/* Text links */}
        <nav style={{ display: "flex", gap: "2rem", fontWeight: 600 }}>
          <a href="/home?from=landing"                style={link}>Enter</a>
          <a href="/home?from=landing#projects"       style={link}>Work</a>
          <a href="/about?from=landing#contact"       style={link}>Contact</a>
        </nav>
      </div>
    </main>
  );
}

const link = { color: "#fff", textDecoration: "none" };
