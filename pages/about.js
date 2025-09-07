// pages/about.js
import Head from "next/head";
import footer from "../components/footer";

export default function About() {
  return (
    <>
      <Head>
        <title>About — Thiago Rocha Silvino</title>
        <meta
          name="description"
          content="About & contact — background, skills, and quick ways to reach Thiago Rocha Silvino."
        />
      </Head>

      <main style={{ background: "#F7F7F5", color: "#111" }}>
        <header style={{ maxWidth: 1280, margin: "0 auto", padding: "2rem 1.5rem" }}>
          <h1 style={{ margin: 0, fontWeight: 800, letterSpacing: ".01em" }}>About & Contact</h1>
          <p style={{ maxWidth: 720, color: "#374151" }}>
            I create elegant, simple, and human-centered work. Below is a quick snapshot of who I am,
            what I do, and the easiest ways to reach me.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginTop: "0.75rem" }}>
            <a href="/portfolio.pdf" download style={btnSecondary}>Download Portfolio (PDF)</a>
            <a href="/resume.pdf" download style={btnSecondary}>Download Resume (PDF)</a>
          </div>
        </header>

        <section
          id="contact"
          style={{
            maxWidth: 1100,
            margin: "0 auto 4rem",
            padding: "0 1.5rem",
            display: "grid",
            gap: "1.5rem",
          }}
        >
          <article
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: 12,
              padding: "1.25rem 1.5rem",
              boxShadow: "0 2px 12px rgba(0,0,0,.04)",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Get in touch</h2>
            <form style={{ display: "grid", gap: "0.75rem", maxWidth: 520 }}>
              <input placeholder="Your Name" style={input} />
              <input placeholder="Your Email" type="email" style={input} />
              <input placeholder="Subject (optional)" style={input} />
              <textarea placeholder="Message" rows={5} style={input} />
              <button type="submit" style={btnPrimary}>Send Message</button>
            </form>
          </article>
        </section>

        <footer />
      </main>
    </>
  );
}

const btnPrimary = {
  display: "inline-block",
  padding: ".8rem 1.2rem",
  borderRadius: 10,
  fontWeight: 600,
  color: "#fff",
  background: "#4C7DFF",
  border: "1px solid #3b67d1",
};

const btnSecondary = {
  display: "inline-block",
  padding: ".65rem 1rem",
  borderRadius: 999,
  fontWeight: 600,
  color: "#111",
  background: "#fff",
  border: "1px solid #e5e7eb",
  textDecoration: "none",
};

const input = {
  width: "100%",
  border: "1px solid #e5e7eb",
  borderRadius: 8,
  padding: ".75rem",
  background: "#fff",
};
