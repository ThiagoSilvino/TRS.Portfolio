// pages/about.js
export default function AboutPage() {
  return (
    <main style={{ maxWidth: 1280, margin: "0 auto", padding: "2rem 1.5rem" }}>
      <section style={{ padding: "min(6vw,5rem) 0 1rem" }}>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "1rem" }}>About</h1>
        <p style={{ maxWidth: "70ch", color: "#374151" }}>
          Short bio placeholder. Architect and designer focused on context, craft, and clarity...
        </p>
      </section>

      {/* Contact section with portrait on the left */}
      <section id="contact" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "1.5rem", alignItems: "start", marginTop: "2rem" }}>
        <img
          src="/Thiago_Silvino_SML_ABOUT.JPG"
          alt="Thiago Rocha Silvino portrait"
          style={{ width: 220, height: "auto", borderRadius: 12, objectFit: "cover" }}
        />
        <div>
          <h2 style={{ marginTop: 0 }}>Contact</h2>
          <p>Email: <a href="mailto:youremail@example.com">youremail@example.com</a></p>
          <p>LinkedIn: <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">View profile</a></p>
          <p>Instagram: <a href="https://instagram.com/" target="_blank" rel="noreferrer">@yourhandle</a></p>
        </div>
      </section>
    </main>
  );
}
