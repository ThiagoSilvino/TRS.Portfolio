// pages/gantt.js
// Arena Project Schedule — simplified 3-section Mermaid Gantt (Dec 2026 → Jan 2027)

import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";

import NavBarFoundry from "../components/nav-bar-foundry";
import FooterFoundry from "../components/footer-foundry";

export default function GanttPage() {
  const mermaidContainerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // Minimal Gantt for troubleshooting alignment
  const ganttCode = `
gantt
  dateFormat  YYYY-MM-DD
  title       Arena Project Schedule
  axisFormat  %b %d, %Y

  %% Keep the range explicit across Dec 2026 → Jan 2027
  %% (anchor tasks define the visible window)
  section Concept Phase
  Kickoff & Brief         :c1, 2026-12-01, 5d
  Concept Options         :c2, 2026-12-06, 10d

  section Design Delivery
  Schematic Package       :d1, 2027-01-03, 10d
  DD Set                  :d2, 2027-01-13, 12d

  section Documentation
  Notes & Redlines        :e1, 2026-12-20, 4d
  Issue For Construction  :e2, 2027-01-25, 7d
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
      script.onerror = () => console.error("Failed to load Mermaid.");
      document.head.appendChild(script);
    };

    const initializeMermaid = () => {
      if (!window.mermaid) return;
      try {
        window.mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          theme: "default",
          gantt: { axisFormat: "%b %d" },
          // Lock font to Mermaid defaults to avoid text/grid misalignment
          themeVariables: {
            fontFamily: "trebuchet ms, verdana, arial",
            fontSize: "16px",
            ganttBarHeight: 26,
            ganttBarPadding: 6,
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

    // Re-render on resize to keep widths crisp
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
        /* Full page with 100px gutters */
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
        /* Keep the SVG crisp and full-width without CSS transforms */
        .mermaid-target :global(svg) {
          display: block;
          max-width: 100%;
          height: auto;
        }
        @media (max-width: 640px) {
          .container { padding-left: 24px; padding-right: 24px; }
        }
      `}</style>
    </>
  );
}
