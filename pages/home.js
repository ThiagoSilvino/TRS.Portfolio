// pages/home.js
import { useEffect, useRef } from "react";

export default function HomePage() {
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
    const speedBg = 0.15;   // behind text
    const speedFg = 0.35;   // in front of text
    const speedBand = 0.22; // stripe behind next section
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
    <main style={{ background: "#F7F7F5", color: "#111" }}>
      <div style={{ height: "6vh" }} />

      {/* === MEGA HEADLINE === */}
      <section style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <h1
          style={{
            margin: 0,
            lineHeight: 0.9,
            fontWeight: 800,
            letterSpacing: "-0.01em",
            fontFamily:
              "Space Grotesk, Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
            fontSize: "clamp(3.2rem, 16vw, 12rem)",
            textAlign: "center",
            position: "relative",
            zIndex: 2,
          }}
        >
          THIAGO ROCHA SILVINO
        </h1>
      </section>

      {/* === LAYERED IMAGE PARALLAX === */}
      <section
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "2rem auto 4rem",
          padding: "0 1.5rem",
          height: "clamp(260px, 55vw, 520px)",
        }}
        aria-label="Featured architecture image with layered parallax"
      >
        <img
          ref={bgRef}
          src="/Projects/FeaturedBackground.png"
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
          src="/Projects/FeaturedForeground.png"
          alt="Featured project foreground"
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

      {/* === NEW SECTION: PARALLAX STRIPE BEHIND CONTENT === */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "4rem 0",
          marginBottom: "4rem",
        }}
      >
        {/* The band that parallax-scrolls behind */}
        <div
          ref={bandRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "-20vh",
            height: "40vh",                       // thickness of the stripe
            background:
              "linear-gradient(180deg, #EDEDED 0%, #E7E7E7 50%, #EDEDED 100%)",
            borderTop: "1px solid #e3e3e3",
            borderBottom: "1px solid #e3e3e3",
            zIndex: 0,                            // sits behind the content box
            willChange: "transform",
          }}
        />

        {/* Content that appears in front of the band */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "grid",
            gap: "2rem",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <small
              style={{
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "#6B7280",
              }}
            >
              Studio Notes
            </small>
            <h2
              style={{
                margin: "0.5rem 0 0",
                fontFamily: "Space Grotesk, Inter, system-ui",
                fontSize: "clamp(1.6rem, 4.2vw, 2.4rem)",
                fontWeight: 700,
              }}
            >
              Clarity, proportion, and craft.
            </h2>
          </div>

          {/* Placeholder content row (swap with cards/projects later) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "1rem",
            }}
          >
            <div
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: "1.25rem 1.5rem",
                boxShadow: "0 2px 14px rgba(0,0,0,.05)",
              }}
            >
              <p style={{ margin: 0, color: "#374151" }}>
                This band scrolls **at a different speed** behind the content, creating depth
                without being flashy. Replace this with a short studio statement, a CTA, or a
                slim grid of two more projects.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
