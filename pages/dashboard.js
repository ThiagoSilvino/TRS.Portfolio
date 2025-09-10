// pages/dashboard.js
export default function Dashboard() {
  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <iframe
        title="Speckle Viewer"
        // paste your exact Speckle EMBED url on ONE LINE below:
        src="PASTE_YOUR_SPECKLE_EMBED_URL_HERE"
        style={{ width: "100%", height: "100%", border: 0 }}
        allow="fullscreen; clipboard-write; xr-spatial-tracking"
      />
    </div>
  );
}
