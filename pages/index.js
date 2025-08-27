// pages/index.js
import Head from "next/head";

export default function Landing() {
  return (
    <>
      <Head>
        <title>Enter — Thiago Rocha Silvino</title>
        <meta name="description" content="Landing page — enter the portfolio." />
      </Head>

      <main style={{ position: "relative", minHeight: "100vh", overflow: "hidden", background: "#0E0E10" }}>
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/poster.jpg"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(.45)",
          }}
        >
          {/* If you add a WebM, put it above the MP4 */}
          {/* <source src="/landing.webm" type="video/webm" /> */}
          <source src="/landing.mp4" type="video/mp4" />
        </video>

        {/* Foreground content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1280,
            margin: "0 auto",
            padding: "2rem 1.5rem",
            height: "100%",
            display: "grid",
            placeItems: "center",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontWeight: 800,
                letterSpacing: ".02em",
                lineHeight: 1.1,
                whiteSpace: "nowrap",
                fontSize: "clamp(1.6rem, 6vw, 3.2rem)",
              }}
            >
              THIAGO ROCHA SILVINO.
            </h1>

            <nav style={{ display: "inline-flex", gap: "1rem", marginTop: "1.25rem", fontWeight: 600 }}>
              <a href="/home?from=landing" style={link}>Enter</a>
              <a href="/home?from=landing#projects" style={link}>Work</a>
              <a href="/about?from=landing#contact" style={link}>CV</a>
            </nav>
          </div>
        </div>
      </main>
    </>
  );
}

const link = {
  color: "#fff",
  textDecoration: "none",
  padding: ".6rem 1rem",
  borderRadius: "999px",
  border: "1px solid rgba(255,255,255,.35)",
  backdropFilter: "blur(6px)",
};
