// pages/dashboard.js
import React from "react";

export default function Dashboard() {
  return (
    <>
      <style jsx>{`
        /* If your layout has a fixed top nav, set its height here.
           If not, change this to 0px. */
        :root { --nav-height: 64px; }

        .wrap {
          position: relative;
          width: 100vw;
          height: calc(100dvh - var(--nav-height));
          margin: 0;
          padding: 0;
          overflow: hidden;
        }

        /* iOS/older browsers fallback (no dynamic viewport units) */
        @supports not (height: 100dvh) {
          .wrap { height: calc(100vh - var(--nav-height)); }
        }

        .frame {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
      `}</style>

      <main className="wrap" role="main" aria-label="Power BI Dashboard">
        <iframe
          className="frame"
          title="Power BI Dashboard"
          src="https://app.powerbi.com/groups/c6bdf6c9-db78-477f-ab0d-b6950
