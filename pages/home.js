// pages/home.js
export default function HomePage() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem 1.5rem' }}>
        <section style={{ padding: 'min(6vw,5rem) 0 1rem' }}>
          <div style={kicker}>Practice</div>
          <h1 style={display}>Lets build something beautiful.</h1>
          <p style={lede}>Selected works exploring craft, context, and clarity. Scroll to browse or jump directly to projects below.</p>
        </section>

        <section>
          <div style={grid}>
            {/* Large feature tile */}
            <Tile
              title="Manitoba Curling Centre"
              tags="Cultural · 2024 · Concept → Build"
              image="https://images.unsplash.com/photo-1510146758428-e5e4b17b8b6b?q=80&w=1974&auto=format&fit=crop"
              span={2}
            />
            {/* Standard tiles */}
            <Tile
              title="C7 House"
              tags="Residential · 2023"
              image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2069&auto=format&fit=crop"
            />
            <Tile
              title="Atrium Commons"
              tags="Public · 2022"
              image="https://images.unsplash.com/photo-1529429612777-9a3424fd0d46?q=80&w=1974&auto=format&fit=crop"
            />
            <Tile
              title="Timber Library"
              tags="Institutional · 2024"
              image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2069&auto=format&fit=crop"
            />
            <Tile
              title="East Hall"
              tags="Education · 2021"
              image="https://images.unsplash.com/photo-1465804575741-338df8554e38?q=80&w=2070&auto=format&fit=crop"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <a href="#" style={btn}>View All Projects</a>
          </div>
        </section>
      </main>

      <footer style={{ borderTop: '1px solid #E5E7EB', color: '#6B7280', textAlign: 'center', padding: '2rem 1rem' }}>
        © {new Date().getFullYear()} Your Name — All rights reserved.
      </footer>
    </>
  );
}

function Header() {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 5, backdropFilter: 'blur(8px)',
      background: 'rgba(247,247,245,.75)', borderBottom: '1px solid #E5E7EB'
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '.8rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontWeight: 700, letterSpacing: '.02em' }}>Your Name</div>
        <nav>
          <a href="/home" style={navLink}>Projects</a>
          <a href="/about" style={navLink}>About / Contact</a>
          <a href="/resume.pdf" style={navLink} download>Resume</a>
        </nav>
      </div>
    </header>
  );
}

function Tile({ title, tags, image, span = 1 }) {
  return (
    <article style={{
      ...tile,
      gridColumn: span === 2 ? 'span 2' : 'auto'
    }}>
      <img src={image} alt={title} style={tileMedia} />
      <div style={tileCap}>
        <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>{title}</h3>
        <div style={{ opacity: .85, fontSize: '.95rem' }}>{tags}</div>
      </div>
    </article>
  );
}

/* styles (kept inline for now so you don’t need Tailwind yet) */
const kicker = { textTransform: 'uppercase', letterSpacing: '.12em', fontSize: '.8rem', color: '#6B7280' };
const display = { fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.1, margin: '.5rem 0 1rem' };
const lede = { maxWidth: '70ch', color: '#374151', fontSize: '1.05rem' };
const grid = {
  display: 'grid',
  gap: 'clamp(1rem, 2.8vw, 2rem)',
  gridTemplateColumns: '1fr',
};
const tile = {
  background: '#FFFFFF',
  borderRadius: 14,
  overflow: 'hidden',
  boxShadow: '0 2px 24px rgba(0,0,0,.08)',
  position: 'relative',
};
const tileMedia = { aspectRatio: '16 / 10', width: '100%', objectFit: 'cover', display: 'block' };
const tileCap = {
  position: 'absolute', left: 0, right: 0, bottom: 0,
  padding: '1rem 1rem 1.2rem',
  color: '#fff',
  background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.65) 85%)',
};
const btn = { display: 'inline-block', padding: '.85rem 1.2rem', borderRadius: 999, border: '1px solid #E5E7EB', background: '#fff', textDecoration: 'none', color: '#111', fontWeight: 600 };
const navLink = { color: '#111', textDecoration: 'none', marginLeft: '1.25rem', fontWeight: 500 };
