// pages/homefoundry.js
import Head from "next/head";
import NavBarFoundry from "../components/nav-bar-foundry.js";
import FooterFoundry from "../components/footer-foundry.js";

export default function HomeFoundry() {
  return (
    <>
      <Head>
        <title>Foundry Collective — Home</title>
        <meta
          name="description"
          content="Foundry Collective — concept, craft, and clarity. Architecture & design."
        />
      </Head>

      <main style={{ minHeight: "100vh", background: "#F7F7F5", color: "#111" }}>
        {/* Foundry-specific nav */}
        <NavBarFoundry />

        {/* ===== Hero image at the top (no parallax, no persistent background) ===== */}
        <section
          style={{
            position: "relative",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "2rem 1.5rem 0",
          }}
        >
          <img
            src="/foundrybau.png"     // ensure this file is in /public (exact case)
            alt="Foundry Collective hero"
            draggable={false}
            style={{
              display: "block",
              width: "min(1800px, 100%)",
              height: "auto",
              borderRadius: 12,
              background: "#eaeaea",
            }}
          />
        </section>

        {/* (Optional) small spacer below the hero */}
        <div style={{ height: "4rem" }} />

        {/* Foundry-specific footer */}
        <FooterFoundry />
      </main>
    </>
  );
}
