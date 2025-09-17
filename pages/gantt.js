// pages/gantt.js
// Public, link-viewable Gantt page using Mermaid.js + your Foundry nav/footer components
// Assumes you have: /components/nav-bar-foundry.js and /components/footer-foundry.js

import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";

// ⬇️ adjust these paths if your components live elsewhere
import NavBarFoundry from "../components/nav-bar-foundry";
import FooterFoundry from "../components/footer-foundry";

export default function GanttPage() {
  const mermaidContainerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // ✏️ Edit your Gantt here (Mermaid syntax)
  const ganttCode = `
gantt
  dateFormat  YYYY-MM-DD
  title       Foundry — Project Timeline
  %% todayMarker is supported in Mermaid 10+
  todayMarker stroke-width:2px,stroke:#999,opacity:0.6

  section Discovery
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
    // Load Mermaid from CDN only on the client
    const ensureMermaid = async () => {
      // If Mermaid already on window, reuse it
      if (typeof window !== "undefined" && window.mermaid) {
        initializeMermaid();
        return;
      }

      // Inject CDN script (UMD build so it attaches to window)
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js";
      script.async = true;
      script.onload = () => initializeMermaid();
      script.onerror = () => {
        console.error("Failed to load Mermaid from CDN.");
      };
      document.head.appendChild(script);
    };

    const initializeMermaid = () => {
      if (!window.mermaid) return;
      try {
        window.mermaid.initialize({
          startOnLoad: false,
          theme: "default", // or 'dark'
          securityLevel: "loose", // allows basic HTML in labels if you ever need it
          gantt: {
            axisFormat: "%b %d",
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
        // Clear container (re-render safe)
        mermaidContainerRef.current.innerHTML = "";
        const { svg } = await window.mermaid.render(
          "foundry-gantt",
          ganttCode.trim()
        );
        mermaidContainerRef.current.innerHTML = svg;
      } catch (e) {
        console.error("Mermaid render error:", e);
      }
    };

    ensureMermaid();

    // Re-render on window resize (optional, keeps it responsive)
    const onResize = () => {
      if (window.mermaid) {
        // simple re-render to fit container width
        const el = mermaidContainerRef.current;
        if (el) el.innerHTML = "";
        window.mermaid.render("foundry-gantt", ganttCode.trim()).then(({ svg }) => {
          if (mermaidContainerRef.current) mermaidContainerRef.current.innerHTML = svg;
        });
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [ganttCode]);

  return (
    <>
      <Head>
        <title>Foundry | Gantt</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Foundry project Gantt chart" />
      </Head>

      {/* Your site nav */}
      <NavBarFoundry />

      <main className="gantt-page">
        <div className="container">
          <h1 className="page-title">Project Gantt</h1>
          <p className="subtitle">
            Hosted with GitHub/Vercel. Edit <code>/pages/gantt.js</code> to update tasks and dates.
          </p>

          {/* Gantt container */}
          <div className="gantt-wrap">
            {!isReady && <div className="loading">Loading timeline…</div>}
            <div ref={mermaidContainerRef} className="mermaid-target" />
          </div>

          <details className="howto">
            <summary>How to update tasks</summary>
            <ol>
              <li>Open <code>/pages/gantt.js</code>.</li>
              <li>Edit the <code>ganttCode</code> string (Mermaid syntax).</li>
              <li>Commit &amp; push. Your public link updates automatically.</li>
            </ol>
            <p>
              Tip: Use IDs (e.g., <code>a1</code>, <code>b1</code>) and{" "}
              <code>after</code> dependencies to chain tasks.
            </p>
          </details>
        </div>
      </main>

      {/* Your site footer */}
      <FooterFoundry />

      {/* Local styles, minimal + responsive */}
      <style jsx>{`
        .gantt-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 24px 16px 64px;
          width: 100%;
          flex: 1 0 auto;
        }
        .page-title {
          margin: 16px 0 8px;
          line-height: 1.1;
        }
        .subtitle {
          margin: 0 0 24px;
          opacity: 0.75;
        }
        .gantt-wrap {
          position: relative;
          width: 100%;
          overflow-x: auto;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 12px;
          padding: 12px;
          background: rgba(0,0,0,0.02);
        }
        .loading {
          padding: 12px;
          font-size: 0.95rem;
          opacity: 0.7;
        }
        .howto {
          margin-top: 20px;
          background: rgba(0,0,0,0.03);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 10px;
          padding: 12px 14px;
        }
        .mermaid-target :global(svg) {
          display: block;
          height: auto;
          width: 100%;
        }
        code {
          background: rgba(0,0,0,0.06);
          padding: 0 6px;
          border-radius: 4px;
        }
      `}</style>
    </>
  );
}
