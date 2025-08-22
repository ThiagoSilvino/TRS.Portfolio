// pages/about.js
export default function AboutPage() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: "3rem 1.5rem" }}>
      {/* Title */}
      <h1 style={{ fontSize: "clamp(2.2rem, 5vw, 3rem)", margin: 0, lineHeight: 1.1 }}>About / Contact</h1>
      <p style={{ color: "#6B7280", marginTop: ".4rem" }}>
        Studio notes, approach, and how to get in touch.
      </p>

      {/* Process anchor (so the top nav link “PROCESS” can jump here) */}
      <section id="process" style={{ marginTop: "2.5rem" }}>
        <h2 style={h2}>Process</h2>
        <p style={p}>
          I pursue architecture that balances craft, context, and clarity. Each project begins with a precise brief,
          followed by rapid iteration across physical models, 3D studies, and dialogue with fabricators. I value
          materials that age well and details that feel inevitable rather than decorative.
        </p>
        <ul style={list}>
          <li>Discovery → context, constraints, intent</li>
          <li>Concept → narrative, massing, light</li>
          <li>Development → systems, materials, interfaces</li>
          <li>Delivery → drawings, coordination, site</li>
        </ul>
      </section>

      {/* Contact */}
      <section style={{ marginTop: "2.5rem" }}>
        <h2 style={h2}>Contact</h2>
        <p style={p}>
          For commissions, collaborations, or portfolio requests:
        </p>
        <p style={p}>
          <a href="mailto:hello@thiagosilvino.com" style={link}>hello@thiagosilvino.com</a>
        </p>
        <div style={{ display: "flex", gap: ".75rem", marginTop: ".75rem" }}>
          <a href="/resume.pdf" style={btn} download>Download Resume</a>
          <a href="/portfolio.pdf" style={btn} download>Download Portfolio</a>
        </div>
      </section>
    </main>
  );
}

/* styles */
const h2 = { fontSize: "1.25rem", margin: "0 0 .6rem", letterSpacing: ".02em" };
const p = { fontSize: "1.05rem", color: "#374151", lineHeight: 1.6, margin: ".25rem 0" };
const list = { margin: ".25rem 0 0 1.25rem", color: "#374151", lineHeight: 1.6 };
const link = { color: "#111", textDecoration: "none", borderBottom: "1px solid #111" };
const btn = { display: "inline-block", padding: ".7rem 1rem", borderRadius: 999, border: "1px solid #E5E7EB", background: "#fff", textDecoration: "none", color: "#111", fontWeight: 600 };
