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

      <main style={{ position: "relative", color: "#111", minHeight: "100vh" }}>
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

        {/* Navigation (not Foundry version) */}
        <NavBar variant="home" />

        {/* Hero section with MegaNameText image */}
        <section
          style={{
            position: "relative",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 1.5rem",
            height: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <img
            src="/Projects/MegaNameText.png"
            alt="Thiago Rocha Silvino"
            draggable={false}
            style={{
              maxWidth: "96%",
              height: "auto",
              imageRendering: "auto",
              userSelect: "none",
            }}
          />
        </section>

        {/* Featured foreground image */}
        <section
          style={{
            position: "relative",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 1.5rem",
            height: 600,
            zIndex: 10,
          }}
          aria-label="Featured project"
        >
          <img
            src="/Projects/featuredforeground.png"
            alt="Featured foreground"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 12,
              pointerEvents: "none",
            }}
          />
        </section>

        {/* Footer (not Foundry version) */}
        <Footer />
      </main>
    </>
  );
}
