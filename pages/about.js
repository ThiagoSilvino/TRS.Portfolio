// pages/about.js
export default function About() {
  return (
    <>
      <header style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 700 }}>Your Name</div>
          <nav>
            <a href="/home" style={{ marginLeft: 16 }}>Projects</a>
            <a href="/about" style={{ marginLeft: 16 }}>About / Contact</a>
          </nav>
        </div>
      </header>

      <main style={{ maxWidth: 1120, margin: '0 auto', padding: '2rem 1.5rem' }}>
        <h1 style={{ fontSize: '2rem', margin: '0 0 1rem' }}>About & Contact</h1>
        <p style={{ maxWidth: '65ch' }}>
          Short bio about your practice, approach, and the outcomes you care about. Keep it clear and confident.
        </p>

        <div style={{ marginTop: '1.2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a href="/portfolio.pdf" download style={pillBtn}>Download Portfolio (PDF)</a>
          <a href="/resume.pdf" download style={pillBtn}>Download Resume (PDF)</a>
        </div>

        <section style={{ marginTop: '2rem' }}>
          <h2>Contact</h2>
          <form style={{ display: 'grid', gap: '1rem', maxWidth: 520 }}>
            <input placeholder="Your name" required style={field} />
            <input type="email" placeholder="you@example.com" required style={field} />
            <input placeholder="Subject" style={field} />
            <textarea placeholder="Message" required style={{ ...field, minHeight: 140 }} />
            <button type="submit" style={primaryBtn}>Send Message</button>
          </form>

          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', marginTop: '1rem' }}>
            <Meta title="Email" value={<a href="mailto:hello@example.com">hello@example.com</a>} />
            <Meta title="Location" value="City, State (remote & on-site)" />
            <Meta title="Availability" value="Open for select projects" />
          </div>
        </section>
      </main>

      <footer style={{ borderTop: '1px solid #E5E7EB', color: '#6B7280', textAlign: 'center', padding: '2rem 1rem' }}>
        © {new Date().getFullYear()} Your Name — All rights reserved.
      </footer>
    </>
  );
}

function Meta({ title, value }) {
  return (
    <div style={{ border: '1px solid #E5E7EB', borderRadius: 12, padding: '1rem', background: '#fff' }}>
      <div style={{ fontWeight: 700, marginBottom: 4 }}>{title}</div>
      <div>{value}</div>
    </div>
  );
}

const field = { width: '100%', padding: '.75rem', border: '1px solid #E5E7EB', borderRadius: 8 };
const primaryBtn = { padding: '.8rem 1.2rem', borderRadius: 10, border: 'none', background: '#4C7DFF', color: '#fff', fontWeight: 600 };
const pillBtn = { padding: '.65rem 1rem', borderRadius: 999, border: '1px solid #E5E7EB', textDecoration: 'none', color: '#111', fontWeight: 600, background: '#fff' };
