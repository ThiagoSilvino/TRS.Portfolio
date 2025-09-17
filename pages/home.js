// pages/home.js
import Head from "next/head";
import NavBar from "../components/nav-bar";
import Footer from "../components/footer";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Home — Thiago Rocha Silvino</title>
        <meta
          name="description"
          content="Selected works by Thiago Rocha Silvino — elegant, simple, and creative architecture & design."
        />
      </Head>

      <main style={{ position: "relative", color: "#111" }}>
        {/* Fixed full-page scroll background */}
        <img
          src="/website-background.jpg"
          alt="Background"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />

        {/* Navigation (original, not Foundry version) */}
        <NavBar variant="home" />

        {/* Full-height content wrapper */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            minHeight: "2600px", // forces scroll height
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {/* Hero section (800px tall) */}
          <section
            style={{
              height: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <img
              src="/Projects/MegaNameText.png"
              alt="Thiago Rocha Silvino"
              draggable={false}
              style={{
                maxWidth: "90%",
                height: "auto",
                userSelect: "none",
              }}
            />
          </section>

          {/* 3 stacked project highlights (3x600px) */}
          <section
            style={{
              height: 600,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 1.5rem",
            }}
          >
            <img
              src="/Projects/featuredforeground.png"
              alt="Featured project"
              style={{
                width: "100%",
                maxWidth: 1280,
                height: "100%",
                objectFit: "cover",
                borderRadius: 12,
              }}
            />
          </section>

          <section style={{ height: 600 }} />
          <section style={{ height: 600 }} />
        </div>

        <Footer />
      </main>
    </>
  );
}
