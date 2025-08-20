// pages/index.js
export default function Landing() {
  return (
    <div style={wrap}>
      {/* Background video */}
      <video
        className="landing-video"
        autoPlay
        muted
        loop
        playsInline
        style={video}
      >
        {/* If you later upload /public/landing.mp4, this source will be used */}
        <source src="/landing.mp4" type="video/mp4" />
        {/* You uploaded landing.mov — some browsers accept this */}
        <source src="/landing.mov" type="video/quicktime" />
        {/* Fallback demo clip (safe to keep until your MP4 is ready) */}
        <source
          src="https://cdn.coverr.co/videos/coverr-modern-architecture-views-4051/1080p.mp4"
          type="video/mp4"
        />
      </video>

      {/* Soft overlay to keep text readable */}
      <div style={overlay} />

      {/* Quick "skip" link straight to projects */}
      <a href="/home" style={skip}>Skip</a>

      {/* Centered content */}
      <div style={inner}>
        <div style={wordmark}>Thiago Rocha Silvino — Portfolio</div>
        <nav style={ctaWrap} aria-label="Landing navigation">
          <a href="/home" style={ghostBtn}>Enter</a>
          <a href="/home" style={ghostBtn}>Work</a>
          <a href="/resume.pdf" style={ghostBtn} download>Resume</a>
        </nav>
      </div>
    </div>
  );
}

/* inline styles */
const wrap = {
  position: 'relative',
  height: '100vh',
  width: '100%',
  overflow: 'hidden',
  background: '#0E0E10',
  color: '#F8F8F8',
};

const video = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  filter: 'brightness(.45) saturate(.9)',
};

const overlay = {
  position: 'absolute',
  inset: 0,
  background: 'radial-gradient(ellipse at center, rgba(0,0,0,.15), rgba(0,0,0,.55))',
};

const inner = {
  position: 'relative',
  zIndex: 1,
  height: '100%',
  display: 'grid',
  placeItems: 'center',
  textAlign: 'center',
  padding: '2rem',
};

const wordmark = {
  letterSpacing: '.08em',
  textTransform: 'uppercase',
  fontWeight: 700,
  opacity: .92,
};

const ctaWrap = {
  marginTop: '1.25rem',
  display: 'inline-flex',
  gap: '0.85rem',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const ghostBtn = {
  padding: '.9rem 1.2rem',
  borderRadius: 999,
  border: '1px solid rgba(255,255,255,.3)',
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 600,
  backdropFilter: 'blur(6px)',
  background: 'rgba(255,255,255,.06)',
};

const skip = {
  position: 'absolute',
  top: 14,
  left: 14,
  zIndex: 1,
  padding: '.4rem .7rem',
  borderRadius: 999,
  border: '1px solid rgba(255,255,255,.25)',
  color: '#fff',
  textDecoration: 'none',
  background: 'rgba(255,255,255,.08)',
  fontSize: '.85rem',
};
