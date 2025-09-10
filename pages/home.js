// pages/home.js
import Head from "next/head";
import { useEffect, useRef } from "react";
import Footer from "../components/footer";

export default function HomePage() {
  // Only keep the parallax stripe motion (unchanged)
  const bandRef = useRef(null);
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduceMotion) return;
    let rafId;
    const speedBand = 0.22;
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
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
        {/* ======= LAYERED, BOTTOM-PINNED HERO STACK (BG • NAME • FG) ======= */}
        <section
          aria-label="Layered hero"
          // Tall enough to allow a 'pinned' moment before releasing
          style={{ position: "relative", height: "140vh", marginBottom: "2rem" }}
        >
          {/* Sticky viewport frame */}
          <div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              maxWidth: 1280,
              margin: "0 auto",
              borderRadius: 12,
              overflow: "hidden",
              // Optional soft background to match your current card look
              background: "#EEE",
            }}
          >
            {/* BACKGROUND (furthest back) */}
            <img
              src="/projects/featuredbackground.png"
              alt=""
              draggable={false}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,              // bottom pin
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center bottom",
                zIndex: 1,
                filter: "grayscale(20%)",
                userSelect: "none",
                pointerEvents: "none",
              }}
            />

            {/* MEGA NAME (middle) */}
            <img
              src="/meganametext.png"
              alt="Thiago Rocha Silvino"
              draggable={false}
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                // Vertically place it as you have it now; it stays fixed while pinned
                top: "8vh",
                width: "min(1800px, 96%)",
                height: "auto",
                zIndex: 2,
                userSelect: "none",
                pointerEvents: "none",
              }}
            />

            {/* FOREGROUND (front) */}
            <img
              src="/projects/featuredforeground.png"
              alt="Featured project foreground"
              draggable={false}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,              // bottom pin
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center bottom",
                zIndex: 3,
                userSelect: "none",
                pointerEvents: "none",
              }}
            />
          </div>
        </section>

        {/* ===================== PARALLAX STRIPE SECTION (unchanged) ===================== */}
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
              height: "40vh",
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
              Studio Notes
            </small>
            <h2
              style={{
                margin: 0,
                fontFamily: "Space Grotesk, Inter, system-ui",
                fontSize: "clamp(1.6rem, 4.2vw, 2.4rem)",
                fontWeight: 700,
              }}
            >
              Clarity, proportion, and craft.
            </h2>
            <p style={{ margin: 0, color: "#374151", maxWidth: 820, marginInline: "auto" }}>
              A calm, minimal surface—built for browsing selected work quickly and elegantly.
            </p>
          </div>
        </section>

        {/* ===================== OTHER PROJECTS (unchanged) ===================== */}
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

/* ---------- tiny style helpers (unchanged) ---------- */
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
