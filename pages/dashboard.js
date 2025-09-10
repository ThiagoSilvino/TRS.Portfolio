// pages/dashboard.js
import React from "react";

export default function Dashboard() {
  return (
    <main style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
      <iframe
        title="Power BI Dashboard"
        width="1000"
        height="700"
        src="https://app.powerbi.com/groups/c6bdf6c9-db78-477f-ab0d-b695039d254c/reports/2943beca-0c86-4946-8ea2-c00dfd0d2368?ctid=0669333e-dace-48e9-86a7-f105c21644e1&pbi_source=linkShare"
        frameBorder="0"
        allowFullScreen={true}
      ></iframe>
    </main>
  );
}
