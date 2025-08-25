// pages/index.js
export default function Landing() {
  return (
    <div style={wrap}>
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={video}
      >
        {/* Prefer MP4 (h264) when you upload it */}
        <source src="/landing.mp4" type="video/mp4" />
        <source src="/landing.mov" type="video/quicktime" />
      </video>

      {/* Soft darken for readability */}
      <div style={overlay} />

      {/* Main content matches Home spacing so the hero name doesn't jump */}
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "2rem 1.5rem" }}>
        <section style={{ padding: "min(6vw,5rem) 0 1rem", textAlign: "center" }}>
          <h1 id="hero-name" style={displayLanding}>THIAGO ROCHA SILVINO.</h1>

          <nav style={landingNav}>
            <a href="/home"        style={landingLink}>Enter</a>
            <a href="/home"        style={landingLink}>Work</a>
            <a href="/about"       style={landingLink}>Contact</a>
          </nav>
        </section>
      </main>

      {/* animation keyframes */}
      <style jsx global>{`
        @keyframes rise {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

/* styles */
const wrap = { position: "relative", minHeight: "100vh", background: "#0E0E10", color: "#F8F8F8" };

const video = {
  position: "fixed", inset: 0, width: "100%", height: "100%",
  objectFit: "cover", zIndex: -2
};

const overlay = {
  position: "fixed", inset: 0, zIndex: -1,
  background: "radial-gradient(ellipse at center, rgba(0,0,0,.15), rgba(0,0,0,.55))"
};

const displayBase = {
  lineHeight: 1.05,
  margin: "0.25rem auto 1.25rem",
  fontWeight: 800,
  letterSpacing: "-0.01em",
  whiteSpace: "nowrap",      // never wrap to two lines
  animation: "rise .6s ease-out both"
};

// Landing adds blend mode so it reacts to the video
const displayLanding = {
  ...displayBase,
  fontSize: "clamp(3rem, 12vw, 6rem)",
  color: "#fff",
  mixBlendMode: "difference"
};

const landingNav = {
  display: "inline-flex",
  gap: "1.25rem",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff"
};

const landingLink = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: 600,
  letterSpacing: ".06em"
};
