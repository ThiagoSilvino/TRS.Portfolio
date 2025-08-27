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

      {/* === MEGA HEADLINE (single line, never wraps) === */}
      <section style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
        <h1
          style={{
            margin: 0,
            lineHeight: 0.9,
            fontWeight: 800,
            letterSpacing: "-0.01em",
            fontFamily:
              "Space Grotesk, Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
            // Keep on one line: shrink before wrap
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            // Max huge, scales down on smaller screens, never wraps
            fontSize: "clamp(2.2rem, 10vw, 12rem)",
            textAlign: "center",
            position: "relative",
            zIndex: 2, // above bg image, below fg image if they overlap
          }}
        >
          THIAGO ROCHA SILVINO
        </h1>
      </section>

      {/* === DIVIDER / BREAK between name and layered image === */}
      <div
        aria-hidden="true"
        style={{
          maxWidth: 1280,
          margin: "1.25rem auto 1.75rem",
          padding: "0 1.5rem",
        }}
      >
        <div
          style={{
            height: 8,                    // thicker band for emphasis
            background: "#E7E7E7",
            borderRadius: 999,
            boxShadow: "inset 0 -1px 0 #e3e3e3, inset 0 1px 0 #efefef",
          }}
        />
      </div>

      {/* === LAYERED IMAGE PARALLAX === */}
      <section
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto 4rem",
          padding: "0 1.5rem",
          height: "clamp(260px, 55vw, 520px)",
          zIndex: 1, // sits under the foreground image and divider above
        }}
        aria-label="Featured architecture image with layered parallax"
      >
        {/* Background image (behind text) */}
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

        {/* Foreground image (over text) */}
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
            zIndex: 3, // foremost
            willChange: "transform",
            pointerEvents: "none",
          }}
        />
      </section>

      {/* === PARALLAX STRIPE BEHIND CONTENT (next section) === */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "4rem 0",
          marginBottom: "4rem",
        }}
      >
        {/* Band that moves behind */}
        <div
          ref={bandRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "-20vh",
            height: "40vh",
            background: "linear-gradient(180deg, #EDEDED 0%, #E7E7E7 50%, #EDEDED 100%)",
            borderTop: "1px solid #e3e3e3",
            borderBottom: "1px solid #e3e3e3",
            zIndex: 0, // behind content
            willChange: "transform",
          }}
        />

        {/* Content over the stripe */}
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
                This stripe scrolls at a different speed behind the content, creating depth
                without distraction. Replace with a short studio statement or additional project teasers.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
