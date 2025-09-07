// pages/process.js
import Head from "next/head";
import NavBar from "../components/nav-bar.js";
import Footer from "../components/footer.js";

export default function ProcessPage() {
  return (
    <>
      <Head>
        <title>Process — Thiago Rocha Silvino</title>
        <meta
          name="description"
          content="Process — context, constraints, models, sketches, and iterative craft."
        />
      </Head>

      <main style={{ background: "#F7F7F5", color: "#111" }}>
        {/* Nav bar (brand always visible on non-home pages) */}
        <NavBar />

        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "2rem 1.5rem" }}>
          <section style={{ padding: "min(6vw,5rem) 0 1rem" }}>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "1rem" }}>Process</h1>
            <p style={{ maxWidth: "70ch", color: "#374151" }}>
              We begin with context and constraints, then build clarity through models, sketches, and iteration.
              This is placeholder copy; paste the Process section you had in About here.
            </p>
            <ol style={{ maxWidth: "70ch", color: "#374151", lineHeight: 1.7 }}>
              <li>Discovery & context</li>
              <li>Concept & narrative</li>
              <li>Iteration & testing</li>
              <li>Detail & delivery</li>
            </ol>
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
}
