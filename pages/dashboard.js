// pages/dashboard.js
export default function Dashboard() {
  return (
    <div style={{ position: "fixed", inset: 0, margin: 0, padding: 0 }}>
      <iframe
        title="Power BI Dashboard"
        src="https://app.powerbi.com/groups/c6bdf6c9-db78-477f-ab0d-b695039d254c/reports/2943beca-0c86-4946-8ea2-c00dfd0d2368?ctid=0669333e-dace-48e9-86a7-f105c21644e1&pbi_source=linkShare"
        style={{ width: "100%", height: "100%", border: 0 }}
        allowFullScreen
      />
    </div>
  );
}
