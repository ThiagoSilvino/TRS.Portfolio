// pages/homefoundry.js
import Head from "next/head";
import NavBar from "../components/nav-bar.js";
import Footer from "../components/footer.js";

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

      {/* Keep text readable over the global background */}
      <main style={{ color: "#fff", minHeight: "100vh" }}>
        <NavBar showCenterTitle={true} />

        {/* Full-height hero text over the persistent background */}
        <section
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "0 1rem",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "Space Grotesk, Inter, system-ui",
                fontSize: "clamp(2.8rem, 6vw, 5rem)",
                fontWeight: 700,
                margin: 0,
              }}
            >
              Foundry Collective
            </h1>
            <p
              style={{
                marginTop: "1rem",
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                maxWidth: "40rem",
                marginInline: "auto",
                opacity: 0.95,
              }}
            >
              Concept, Craft, Clarity.
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
