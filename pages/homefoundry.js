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
          // subtle translate for depth
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

      <main style={{ background: "#F7F7F5", color: "#111", minHeight: "100vh" }}>
        {/* Global nav (shared) */}
        <NavBar showCenterTitle={true} />

        {/* ===== Hero (foundrybau.png) ===== */}
        <section
          style={{
            position: "relative",
            maxWidth: 1440,
            margin: "0 auto",
            padding: "clamp(16px, 3vw, 24px)",
          }}
        >
          <div
            style={{
              position: "relative",
              borderRadius: 14,
              overflow: "hidden",
              border: "1px solid #e5e7eb",
              boxShadow: "0 8px 32px rgba(0,0,0,.06)",
              background: "#ddd",
              height: "clamp(360px, 60vw, 680px)",
            }}
            aria-label="Foundry Collective hero"
          >
            <img
              src="/foundrybau.png"
              alt="Foundry Collective — Bauhaus-inspired hero"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
              }}
              draggable={false}
            />
          </div>
        </section>

        {/* Divider */}
        <div
          aria-hidden="true"
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            padding: "0 clamp(16px, 3vw, 24px)",
          }}
        >
          <div
            style={{
              height: 8,
              borderRadius: 999,
              background: "#E7E7E7",
              boxShadow: "inset 0 -1px 0 #e3e3e3, inset 0 1px 0 #efefef",
              margin: "clamp(16px, 3vw, 24px) 0 clamp(20px, 3.5vw, 32px)",
            }}
          />
        </div>

        {/* ===== Single Parallax Section ===== */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "6rem 0 5rem",
            marginBottom: "3rem",
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
              Concept, Craft, Clarity.
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
