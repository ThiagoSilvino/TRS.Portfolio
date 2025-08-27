// pages/home.js (or app/page.js equivalent)
// Implements: MegaNameText sticky + locked featured foreground/background stack + parallax bar
// Assumptions:
// - Public folder contains: /MegaNameText.png, /featuredforeground.png, /featuredbackground.png, /rainbowtess.png
// - You may set --nav-height in :root (or leave default below) to match your actual fixed nav height.

import React from "react";

export default function Home() {
  return (
    <main>
      <style jsx global>{`
        :root { --nav-height: 64px; }
        .intro-section {
          position: relative;
          min-height: 180vh; /* gives room for the sticky effect */
        }
        .mega-sticky {
          position: sticky;
          top: calc(var(--nav-height) + 30px); /* 30px below nav bar */
          z-index: 30; /* above the featured images */
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none; /* purely decorative; let scroll pass through */
        }
        .mega-img {
          max-width: min(92vw, 1400px);
          height: auto;
          display: block;
          margin: 0 auto;
          user-select: none;
        }
        .feature-stack-wrapper {
          position: relative;
          max-width: min(92vw, 1400px);
          margin: 10px auto 0; /* 10px below MegaNameText per spec */
        }
        .feature-stack-aspect {
          position: relative;
          width: 100%;
          /* establish an aspect ratio so both images lock perfectly; adjust as needed */
          aspect-ratio: 16/9;
          overflow: visible;
        }
        .feature-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain; /* preserves same dimensions/ratio for both */
          image-rendering: auto;
          user-select: none;
          pointer-events: none;
        }
        .bg { z-index: 5; }
        .fg { z-index: 20; }

        /* Parallax bar */
        .parallax-section {
          position: relative;
          width: 100%;
          height: 60vh;
          background-image: url('/rainbowtess.png');
          background-size: cover;
          background-position: center center;
          background-attachment: fixed; /* simple parallax */
        }

        /* Optional: breathing space around sections */
        .section-pad { padding: 0 4vw; }
      `}</style>

      {/* Intro / Mega + Featured Stack */}
      <section className="intro-section section-pad" aria-label="Intro Mega Stack">
        {/* Sticky MegaNameText PNG (replaces prior text) */}
        <div className="mega-sticky">
          <img
            src="/MegaNameText.png"
            alt="Thiago Rocha Silvino — Mega Name"
            className="mega-img"
            draggable={false}
          />
        </div>

        {/* Flow content below the sticky mega —
            The foreground & background are LOCKED by sharing a single absolute container.
            They scroll together and meet the lower edge of the sticky MegaName. */}
        <div className="feature-stack-wrapper" aria-label="Locked Featured Images">
          <div className="feature-stack-aspect">
            {/* Always-to-the-very-back background image */}
            <img
              src="/featuredbackground.png"
              alt="Featured background"
              className="feature-img bg"
              draggable={false}
            />
            {/* Foreground overlays both the background and the mega text (z via stacking context) */}
            <img
              src="/featuredforeground.png"
              alt="Featured foreground"
              className="feature-img fg"
              draggable={false}
            />
          </div>
        </div>

        {/* Spacer so the sticky has room to release after the stack meets it */}
        <div style={{ height: "70vh" }} />
      </section>

      {/* 20px padding below pair before the parallax bar */}
      <div style={{ height: 20 }} aria-hidden="true" />

      {/* Parallax bar section using rainbowtess.png */}
      <section className="parallax-section" aria-label="Parallax Bar" />

      {/* Optional content below for testing scroll */}
      <section className="section-pad" style={{ paddingTop: "8vh", paddingBottom: "12vh" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", lineHeight: 1.6 }}>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", marginBottom: 12 }}>Welcome</h2>
          <p>
            This is placeholder content beneath the parallax bar. Remove or replace with your real sections.
            The key behaviors implemented above are: (1) the MegaNameText is a sticky PNG that replaces the
            prior text, (2) the featured background and foreground images are locked to one another in a single
            absolute stack that scrolls together, and (3) a simple parallax bar using <code>background-attachment: fixed</code>.
          </p>
        </div>
      </section>
    </main>
  );
}
