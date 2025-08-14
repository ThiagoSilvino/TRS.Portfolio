// pages/index.js
export default function Landing() {
  return (
    <div style={{ height: '100vh', width: '100%', position: 'relative', background: '#0E0E10', color: '#F8F8F8', overflow: 'hidden' }}>
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1529429612777-9a3424fd0d46?q=80&w=1974&auto=format&fit=crop"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(.45) saturate(.9)' }}
      >
        <source src="https://cdn.coverr.co/videos/coverr-modern-architecture-views-4051/1080p.mp4" type="video/mp4" />
      </video>

      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(0,0,0,.12), rgba(0,0,0,.55))' }} />

      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'grid', placeItems: 'center', textAlign: 'center', padding: '2rem' }}>
        <div>
          <div style={{ letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 700, opacity: .9, fontFamily: 'system-ui, sans-serif' }}>
            Thiago Silvino — Portfolio
          </div>
          <div style={{ marginTop: '1.25rem', display: 'inline-flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            <a href="/home" style={ghostBtn}>Enter</a>
            <a href="/home" style={ghostBtn}>Work</a>
            <a href="/cv.pdf" download style={ghostBtn}>CV</a>
          </div>
        </div>
      </div>
      <a href="/home" style={{ position: 'absolute', left: 14, top: 14, zIndex: 1, padding: '.4rem .7rem', borderRadius: 999, border: '1px solid rgba(255,255,255,.25)', color: '#fff', textDecoration: 'none', background: 'rgba(255,255,255,.08)', fontSize: '.85rem' }}>Skip</a>
    </div>
  );
}

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
