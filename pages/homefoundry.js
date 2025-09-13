// pages/homefoundry.js
import Head from "next/head";
import { useEffect, useRef } from "react";
import NavBar from "../components/nav-bar.js";
import Footer from "../components/footer.js";

export default function HomeFoundry() {
  // simple parallax band
  const bandRef = useRef(null);
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduceMotion) return;

    let rafId;
    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        if (bandRef.current) {
          bandRef.current.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
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
        <title>Foundry Collective — Home</title>
        <meta
          name="description"
          content="Foundry Collective — concept, craft, and clarity. Architecture & design."
        />
      </Head>

      <main style={{ background: "#111", color: "#fff", minHeight: "100vh" }}>
        {/* Global nav (shared) */}
        <NavBar showCenterTitle={true} />

        {/* ===== Fullscreen Background Hero ===== */}
        <section
          style={{
            position: "relative",
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* background image */}
          <img
            src="/foundrybau.png"
            alt="Foundry Collective hero background"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: -1,
            }}
            draggable={false}
          />

          {/* overlay text */}
          <div
            style={{
              textAlign: "center",
              padding: "0 1rem",
            }}
          >
            <h1
              style={{
                fontFamily: "Space Grotesk, Inter, system-ui",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
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
              }}
            >
              Concept, Craft, Clarity.
            </p>
          </div>
        </section>

        {/* ===== Single Parallax Section ===== */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "6rem 0 5rem",
            marginBottom: "3rem",
            background: "#F7F7F5",
            color: "#111",
          }}
        >
          {/* moving band */}
          <div
            ref={bandRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "-22vh",
              height: "44vh",
              background:
                "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.07) 100%)",
              opacity: 0.25,
              borderTop: "1px solid #e5e7eb",
              borderBottom: "1px solid #e5e7eb",
              willChange: "transform",
              zIndex: 0,
            }}
          />

          {/* content on top */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: 1100,
              margin: "0 auto",
              padding: "0 clamp(16px, 3vw, 24px)",
              textAlign: "center",
              display: "grid",
              gap: "1rem",
            }}
          >
            <small
              style={{
                letterSpacing: ".12em",
                textTransform: "uppercase",
                color: "#6B7280",
              }}
            >
              Foundry Collective
            </small>
            <h2
              style={{
                margin: 0,
                fontFamily: "Space Grotesk, Inter, system-ui",
                fontSize: "clamp(1.8rem, 4.6vw, 2.6rem)",
                fontWeight: 700,
              }}
            >
              Building ideas with precision & poetry
            </h2>
            <p style={{ margin: 0, color: "#374151", maxWidth: 820, marginInline: "auto" }}>
              A focused studio exploring systems, materials, and human scale—bridging poetic
              ideas with precise delivery.
            </p>
          </div>
        </section>

        {/* Shared footer */}
        <Footer />
      </main>
    </>
  );
}
