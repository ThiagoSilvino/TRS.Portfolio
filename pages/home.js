// pages/home.js (Next.js pages router)
// Implements: MegaNameText sticky + locked featured foreground/background stack + parallax bar
// Assets expected:
// - /Projects/MegaNameText.png
// - /Projects/featuredforeground.png
// - /Projects/featuredbackground.png
// - /rainbowtess.png

import React from "react";
// Robust asset paths: import images so Next resolves correct URL (works with basePath/assetPrefix)
import megaNamePng from "../public/Projects/MegaNameText.png";
import featuredBg   from "../public/Projects/featuredbackground.png";
import featuredFg   from "../public/Projects/featuredforeground.png";
import rainbowTess  from "../public/rainbowtess.png";

export default function Home() {
  return (
    <main>
      <style jsx global>{`
        :root { --nav-height: 64px; }

        .intro-section {
          position: relative;
          min-height: 170vh; /* room so sticky can hold until images meet it */
        }

        /* MEGA NAME (middle layer) */
        .mega-sticky {
          position: sticky;
          top: calc(var(--nav-height) + 30px); /* 30px below nav */
          z-index: 15; /* between background (5) and foreground (25) */
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none; /* decorative */
        }
        .mega-img {
          max-width: min(92vw, 1400px);
          height: auto;
          display: block;
          margin: 0 auto;
          user-select: none;
        }

        /* FEATURED STACK (back + front locked together) */
        .feature-stack-wrapper {
          position: relative;
          max-width: min(92vw, 1400px);
          margin: 10px auto 0; /* 10px below MegaNameText */
        }
        .feature-stack-aspect {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9; /* adjust if your art has a different ratio */
        }
        .feature-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain; /* ensures perfect overlap / lock */
          user-select: none;
          pointer-events: none;
        }
        .bg { z-index: 5; }
        .fg { z-index: 25; }

        /* Spacer inside the section so the sticky can release gracefully
           after the stack meets the MegaNameText */
        .release-space { height: 60vh; }

        /* Parallax bar (image set inline so basePath is respected) */
        .parallax-section {
          position: relative;
          width: 100%;
          height: 60vh;
          background-size: cover;
          background-position: center center;
          background-attachment: fixed; /* simple parallax */
        }

        /* Utility */
        .section-pad { padding: 0 4vw; }
      `}</style>

      {/* Intro / Mega + Featured Stack */}
      <section className="intro-section section-pad" aria-label="Intro Mega Stack">
        {/* Sticky MegaNameText PNG (replaces prior text) */}
        <div className="mega-sticky" id="hero-name">
          <img
            src={megaNamePng.src}
            alt="Thiago Rocha Silvino — Mega Name"
            className="mega-img"
            draggable={false}
          />
        </div>

        {/* Foreground & background locked to one another */}
        <div className="feature-stack-wrapper" aria-label="Locked Featured Images">
          <div className="feature-stack-aspect">
            {/* BACK (always the very back) */}
            <img
              src={featuredBg.src}
              alt="Featured background"
              className="feature-img bg"
              draggable={false}
            />
            {/* FRONT (overlays Mega + back) */}
            <img
              src={featuredFg.src}
              alt="Featured foreground"
              className="feature-img fg"
              draggable={false}
            />
          </div>
        </div>

        {/* Give the sticky room to release after they meet */}
        <div className="release-space" />
      </section>

      {/* 20px padding below pair before the parallax bar */}
      <div style={{ height: 20 }} aria-hidden="true" />

      {/* Parallax bar section using rainbowtess.png (inline bg so basePath works) */}
      <section
        className="parallax-section"
        aria-label="Parallax Bar"
        style={{ backgroundImage: `url(${rainbowTess.src})` }}
      />

      {/* Optional content below for testing scroll */}
      <section className="section-pad" style={{ paddingTop: "8vh", paddingBottom: "12vh" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", lineHeight: 1.6 }}>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", marginBottom: 12 }}>Welcome</h2>
          <p>
            Replace this with real content. Behaviors above: MegaNameText is sticky 30px below the nav,
            featured background & foreground are perfectly overlapped and scroll together (no slip),
            then all scroll together once they meet. A simple parallax bar follows using
            <code> background-attachment: fixed</code>.
          </p>
        </div>
      </section>
    </main>
  );
}
