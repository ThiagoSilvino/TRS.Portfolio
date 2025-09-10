// pages/home.js
import Head from "next/head";
import { useEffect, useRef } from "react";
import NavBar from "../components/nav-bar";
import Footer from "../components/footer";

export default function HomePage() {
  // Refs for hero layers
  const bgRef = useRef(null);
  const nameRef = useRef(null);
  const fgRef = useRef(null);

  // Accessibility: respect reduced motion
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

        // Background moves the slowest
        if (bgRef.current) {
          bgRef.current.style.transform = `translate3d(0, ${y * 0.10}px, 0)`;
        }

        // Foreground moves a touch faster
        if (fgRef.current) {
          fgRef.current.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
        }

        // Mega name stays pinned until its bottom meets the bottom edge of the hero box
        if (nameRef.current) {
          // We keep the name fixed until the hero container would have scrolled past its bottom.
          // Because the hero is position:sticky, once we pass the sticky boundary the whole group scrolls together.
          // No transform needed for the name while inside the sticky range.
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
        {/* ========= NAV (kept above everything) ========= */}
        <NavBar page="home" />

        {/* small spacer so the hero isn’t glued to the nav */}
        <div style={{ height: "5vh" }} />

        {/* ========= PINNED / LAYERED HERO =========
            Order (back to front):
            1) featuredbackground.png  (zIndex: 0)
            2) meganametext.png        (zIndex: 1)
            3) featuredforeground.png  (zIndex: 2)
        */}
        <section
          aria-label="Featured image with layered parallax and pinned title"
          style={{
            position: "relative",
            maxWidth: 1280,
            margin: "0 auto 4rem",
            padding: "0 1.5rem",
          }}
        >
          {/* Sticky wrapper pins the stack until its bottom meets the viewport edge */}
          <div
            style={{
              position: "sticky",
              top: "72px", // keep clear of the sticky header height
              zIndex: 1, // the whole hero group stays under the header (header uses a higher z-index)
              height: "clamp(260px, 55vw, 520px)",
              borderRadius: 12,
              overflow: "hidden",
              background: "#EEE",
            }}
          >
            {/* Background (furthest back) */}
            <img
              ref={bgRef}
              src="/projects/featuredbg.png" /* optional fallback alias if you made one */
              onError={(e) => {
                // fallback to original path if you didn’t alias
                if (e.currentTarget.src.endsWith("featuredbg.png")) {
                  e.currentTarget.src = "/projects/featuredbg.png";
                }
              }}
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 0,
                willChange: "transform",
                pointerEvents: "none",
                filter: "grayscale(20%)",
              }}
            />

            {/* If you’re not using an alias above, keep the original names: */}
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
                zIndex: 0,
                willChange: "transform",
                pointerEvents: "none",
                filter: "grayscale(20%)",
              }}
            />

            {/* Mega name (middle) — pinned until the hero ends */}
            <div
              ref={nameRef}
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,            // << pin the lower edge
                zIndex: 1,            // << middle layer
                display: "grid",
                placeItems: "center",
                pointerEvents: "none",
              }}
            >
              <img
                src="/meganametext.png"
                alt="Thiago Rocha Silvino"
                draggable={false}
                style={{
                  display: "block",
                  width: "min(1800px, 96%)",
                  height: "auto",
                  userSelect: "none",
                }}
              />
            </div>

            {/* Foreground (front) — pinned by bottom edge as well */}
            <img
              ref={fgRef}
              src="/featuredforeground.png"
              alt="Featured project foreground"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 2,            // << on top
                willChange: "transform",
                pointerEvents: "none",
              }}
            />
          </div>
        </section>

        {/* ===== Divider (unchanged) ===== */}
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

        {/* ===== Remainder of page content (unchanged) ===== */}
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "4rem 0",
            marginBottom: "3rem",
          }}
        >
          <div
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
