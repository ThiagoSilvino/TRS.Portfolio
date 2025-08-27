// pages/home.js
import { useEffect, useRef } from "react";

export default function HomePage() {
  const bgRef = useRef(null);
  const fgRef = useRef(null);
  const titleRef = useRef(null);
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduceMotion) return;

    let rafId;
    const speedBg = 0.15;   // lower = slower (behind)
    const speedFg = 0.35;   // higher = faster (in front)
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

    const onScroll = () => {
      // use rAF so we don’t thrash layout
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY || 0;

        // translate background slightly up as you scroll
        // (feels like it’s receding behind the headline)
        if (bgRef.current) {
          const t = clamp(y * speedBg, -160, 220);
          bgRef.current.style.transform = `translate3d(0, ${t}px, 0)`;
        }

        // translate foreground a bit more so it “overtakes” the headline
        if (fgRef.current) {
          const t = clamp(y * speedFg - 60, -60, 360);
          fgRef.current.style.transform = `translate3d(0, ${t}px, 0)`;
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
      {/* Top spacer so you land on the mega headline nicely */}
      <div style={{ height: "6vh" }} />

      {/* === MEGA HEADLINE === */}
      <section
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        <h1
          ref={titleRef}
          style={{
            margin: 0,
            lineHeight: 0.9,
            fontWeight: 800,
            letterSpacing: "-0.01em",
            fontFamily:
              "Space Grotesk, Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
            fontSize: "clamp(3.2rem, 16vw, 12rem)", // BIG like Archouse
            textAlign: "center",
            // keep it behind the foreground but above the background
            position: "relative",
            zIndex: 2,
          }}
        >
          THIAGO ROCHA SILVINO
        </h1>
      </section>

      {/* === LAYERED IMAGE STACK === */}
      <section
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "2rem auto 4rem",
          padding: "0 1.5rem",
          height: "clamp(260px, 55vw, 520px)", // responsive height
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
            zIndex: 1, // behind headline
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
            zIndex: 3, // in front of headline
            willChange: "transform",
            pointerEvents: "none",
          }}
        />
      </section>

      {/* Optional caption/intro block */}
      <section
        style={{
          maxWidth: 820,
          margin: "0 auto 6rem",
          padding: "0 1.5rem",
          color: "#374151",
          textAlign: "center",
        }}
      >
        <small
          style={{
            display: "block",
            letterSpacing: ".12em",
            textTransform: "uppercase",
            color: "#6B7280",
          }}
        >
          We Are TRS
        </small>
        <p style={{ marginTop: "0.75rem", fontSize: "1.05rem", lineHeight: 1.6 }}>
          For us, architecture is about connection. We shape each space with refined simplicity,
          bringing purpose and clarity together in a way that leaves a lasting impression.
        </p>
      </section>
    </main>
  );
}
