// pages/home.js
import Head from "next/head";
import { useEffect, useRef } from "react";
import NavBar from "../components/nav-bar.js";
import Footer from "../components/footer.js";

export default function HomePage() {
  // Refs for parallax pieces
  const bgRef = useRef(null);
  const fgRef = useRef(null);
  const bandRef = useRef(null);

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduceMotion) return;

    let rafId;
    const speedBg = 0.15;   // background image (behind)
    const speedFg = 0.35;   // foreground image (in front)
    const speedBand = 0.22; // parallax stripe
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY || 0;

        if (bgRef.current) {
          const t = clamp(y * speedBg, -160, 220);
          bgRef.current.style.transform = `translate3d(0, ${t}px, 0)`;
        }
        if (fgRef.current) {
          const t = clamp(y * speedFg - 60, -60, 360);
          fgRef.current.style.transform = `translate3d(0, ${t}px, 0)`;
        }
        if (bandRef.current) {
          const t = clamp(y * speedBand, -200, 400);
          bandRef.current.style.transform = `translate3d(0, ${t}px, 0)`;
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduceMotion]);

  return (
    <>
      <Head>
        <title>Home — Thiago Rocha Silvino</title>
        <meta
          name="description"
          content="Selected works by Thiago Rocha Silvino — elegant, simple, and creative architecture & design."
        />
      </Head>

      <main style={{ background: "#F7F7F5", color: "#111", minHeight: "100vh" }}>
        {/* ===== Reusable Nav (brand reveals after scroll on home) ===== */}
        <NavBar variant="home" />

        {/* small spacer so the hero isn’t glued to the nav */}
        <div style={{ height: "5vh" }} />

        {/* ===================== HERO NAME IMAGE ===================== */}
        <section
          style={{
            position: "relative",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 1.5rem",
          }}
        >
          <img
            src="/meganametext.png"
            alt="Thiago Rocha Silvino"
            draggable={false}
            style={{
              display: "block",
              margin: "0 auto",
              width: "min(1800px, 96%)",
              height: "auto",
              imageRendering: "auto",
              userSelect: "none",
            }}
          />
        </section>

        {/* Divider / break */}
        <div aria-hidden="true" style={{ maxWidth: 1280, margin: "1.25rem auto 1.75rem", padding: "0 1.5rem" }}>
          <div
            style={{
              height: 8,
              background: "#E7E7E7",
              borderRadius: 999,
              boxShadow: "inset 0 -1px 0 #e3e3e3, inset 0 1px 0 #efefef",
            }}
          />
        </div>

        {/* ===================== LAYERED PARALLAX FEATURE ===================== */}
        <section
          id="projects"
          style={{
            position: "relative",
            maxWidth: 1280,
            margin: "0 auto 4rem",
            padding: "0 1.5rem",
            height: "clamp(260px, 55vw, 520px)",
            zIndex: 1,
            background: "#EEE",
            borderRadius: 12,
            overflow: "hidden",
          }}
          aria-label="Featured architecture image with layered parallax"
        >
          <img
            ref={bgRef}
            src="/featuredbackground.png"
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 12,
              zIndex: 1,
              filter: "grayscale(20%)",
              willChange: "transform",
            }}
          />
          <img
            ref={fgRef}
            src="/featuredforeground.png"
            alt="Featured project foreground"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 12,
              zIndex: 3,
              willChange: "transform",
              pointerEvents: "none",
            }}
          />
        </section>

        {/* ===================== PARALLAX STRIPE SECTION ===================== */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "4rem 0",
            marginBottom: "3rem",
          }}
        >
          <div
            ref={bandRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "-20vh",
              height: "120vh",
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.06) 100%), url('/rainbowtess.png') center/cover no-repeat",
              opacity: 0.25,
              borderTop: "1px solid #e3e3e3",
              borderBottom: "1px solid #e3e3e3",
              zIndex: 0,
              willChange: "transform",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: 1100,
              margin: "0 auto",
              padding: "0 1.5rem",
              textAlign: "center",
              display: "grid",
              gap: "1rem",
            }}
          >
            <small style={{ letterSpacing: ".12em", textTransform: "uppercase", color: "#6B7280" }}>
              Welcome
            </small>
            <h2
              style={{
                margin: 0,
                fontFamily: "Space Grotesk, Inter, system-ui",
                fontSize: "clamp(1.6rem, 4.2vw, 2.4rem)",
                fontWeight: 700,
              }}
            >
              Hello
            </h2>
            <p style={{ margin: 0, color: "#374151", maxWidth: 820, marginInline: "auto" }}>
              Context, Calm and Clarity
            </p>
          </div>
        </section>

        {/* ===================== OTHER PROJECTS ===================== */}
        <section
          aria-label="Other projects"
          style={{ maxWidth: 1280, margin: "0 auto 4rem", padding: "0 1.5rem" }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
            <article style={card}>
              <img src="/poster.jpg" alt="Project thumbnail" style={thumb} loading="lazy" />
              <div style={cardMeta}>
                <h3 style={{ margin: 0 }}>Courtyard House</h3>
                <small style={{ color: "#6B7280" }}>Residential · 2023</small>
              </div>
            </article>

            <article style={card}>
              <img
                src="/Thiago_Silvino_SML_ABOUT.JPG"
                alt="Project thumbnail"
                style={thumb}
                loading="lazy"
              />
              <div style={cardMeta}>
                <h3 style={{ margin: 0 }}>Atrium Pavilion</h3>
                <small style={{ color: "#6B7280" }}>Public · 2022</small>
              </div>
            </article>
          </div>
        </section>

        {/* ===================== FOOTER (shared) ===================== */}
        <Footer />
      </main>
    </>
  );
}

/* ---------- tiny style helpers ---------- */
const card = {
  display: "grid",
  gridTemplateColumns: "220px 1fr",
  gap: "1rem",
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: "1rem",
  boxShadow: "0 2px 12px rgba(0,0,0,.04)",
};

const thumb = {
  width: "100%",
  height: "160px",
  objectFit: "cover",
  borderRadius: 10,
  background: "#eee",
};

const cardMeta = {
  display: "grid",
  alignContent: "center",
  gap: ".35rem",
};
