// pages/dashboard.js
export default function Dashboard() {
  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <iframe
        title="Speckle Viewer"
        // paste your exact Speckle EMBED url on ONE LINE below:
        src="<iframe title="Speckle" src="https://app.speckle.systems/projects/9ea7c06f1f/models/301f093a88#embed=%7B%22isEnabled%22%3Atrue%7D" width="600" height="400" frameborder="0"></iframe>"
        style={{ width: "100%", height: "100%", border: 0 }}
        allow="fullscreen; clipboard-write; xr-spatial-tracking"
      />
    </div>
  );
}
