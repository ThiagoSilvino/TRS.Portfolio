// pages/gantt.js
// Mermaid Gantt page with Foundry nav/footer.
// Title: "Arena Project Schedule" and full-width layout with 100px gutters.

import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";

import NavBarFoundry from "../components/nav-bar-foundry";
import FooterFoundry from "../components/footer-foundry";

export default function GanttPage() {
  const mermaidContainerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // ✏️ Edit your Gantt here (Mermaid syntax)
  const ganttCode = `
gantt
  dateFormat  YYYY-MM-DD
  title       Sample Arena Project
  todayMarker stroke-width:2px,stroke:#999,opacity:0.6

  section Discovery and Concept
  Brief & Goals            :a1, 2025-09-18, 5d
  Stakeholder Interviews   :a2, after a1, 4d

  section Design
  Concept Options          :b1, after a2, 10d
  Preferred Direction      :b2, after b1, 5d
  Schematic Package        :b3, after b2, 14d

  section Documentation
  DD Set                   :c1, after b3, 14d
  CD Set                   :c2, after c1, 21d

  section Delivery
  Pricing/Value Eng        :d1, after c1, 7d
  Issue For Construction   :d2, after c2, 3d
`;

  useEffect(() => {
    const ensureMermaid = async () => {
      if (typeof window !== "undefined" && window.mermaid) {
        initializeMermaid();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js";
      script.async = true;
      script.onload = () => initializeMermaid();
      document.head.appendChild(script);
    };

    const initializeMermaid = () => {
      if (!window.mermaid) return;
      try {
        window.mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          theme: "default",
          gantt: {
            axisFormat: "%b %d",
          },
          // Scale up visuals
          themeVariables: {
            fontSize: "18px",
            lineColor: "#888",
            textColor: "#222",
            // bigger bars
            ganttBarHeight: 28,
            ganttBarPadding: 8,
            // thicker axes/grid for readability
            gridColor: "#e5e7eb",
          },
        });
        renderMermaid();
        setIsReady(true);
      } catch (e) {
        console.error("Mermaid init error:", e);
      }
    };

    const renderMermaid = async () => {
      if (!window.mermaid || !mermaidContainerRef.current) return;
      try {
        mermaidContainerRef.current.innerHTML = "";
        const { svg } = await window.mermaid.render("foundry-gantt", ganttCode.trim());
        mermaidContainerRef.current.innerHTML = svg;
      } catch (e) {
        console.error("Mermaid render error:", e);
      }
    };

    ensureMermaid();

    const onResize = () => {
      if (!window.mermaid || !mermaidContainerRef.current) return;
      mermaidContainerRef.current.innerHTML = "";
      window.mermaid.render("foundry-gantt", ganttCode.trim()).then(({ svg }) => {
        if (mermaidContainerRef.current) mermaidContainerRef.current.innerHTML = svg;
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [ganttCode]);

  return (
    <>
      <Head>
        <title>Foundry | Arena Project Schedule</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <NavBarFoundry />

      <main className="gantt-page">
        <div className="container">
          <h1 className="page-title">Arena Project Schedule</h1>

          <div className="gantt-wrap">
            {!isReady && <div className="loading">Loading timeline…</div>}
            <div ref={mermaidContainerRef} className="mermaid-target" />
          </div>
        </div>
      </main>

      <FooterFoundry />

      <style jsx>{`
        .gantt-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        /* Full width with 100px left/right padding */
        .container {
          width: 100%;
          padding: 24px 100px 64px;
          margin: 0;
          box-sizing: border-box;
          flex: 1 0 auto;
        }
        .page-title {
          margin: 16px 0 24px;
          line-height: 1.1;
          font-size: 40px;
        }
        .gantt-wrap {
          position: relative;
          width: 100%;
          overflow-x: auto;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 16px;
          padding: 16px;
          background: rgba(0, 0, 0, 0.02);
        }
        .loading {
          padding: 12px;
          font-size: 1rem;
          opacity: 0.7;
        }
        /* Make rendered SVG fill its container width */
        .mermaid-target :global(svg) {
          display: block;
          width: 100%;
          height: auto;
        }

        /* Optional: make page denser on very large screens */
        @media (min-width: 1600px) {
          .container {
            padding-left: 100px;
            padding-right: 100px;
          }
          .page-title {
            font-size: 44px;
          }
        }

        /* On small screens, keep gutters but allow scroll inside the gantt */
        @media (max-width: 640px) {
          .container {
            padding-left: 24px;
            padding-right: 24px;
          }
        }
      `}</style>
    </>
  );
}
