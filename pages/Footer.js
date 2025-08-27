// components/Footer.js
export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #e5e7eb",
        color: "#6B7280",
        textAlign: "center",
        padding: "2rem 1rem",
        background: "transparent",
      }}
    >
      © {new Date().getFullYear()} Thiago Rocha Silvino — All rights reserved.
    </footer>
  );
}
