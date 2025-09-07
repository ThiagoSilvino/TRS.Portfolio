// components/footer.js
export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #e5e7eb",
        background: "transparent",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "1.25rem 1.5rem",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: ".75rem",
        }}
      >
        {/* Left: quick contact (optional, minimal) */}
        <div style={{ fontSize: ".9rem", color: "#374151" }}>
          <a href="mailto:hello@thiagosilvino.com" style={link}>
            hello@thiagosilvino.com
          </a>
        </div>

        {/* Center: copyright */}
        <div
          style={{
            textAlign: "center",
            color: "#6B7280",
            fontSize: ".9rem",
            whiteSpace: "nowrap",
          }}
        >
          © {new Date().getFullYear()} Thiago Rocha Silvino
        </div>

        {/* Right: lightweight actions */}
        <div
          style={{
            justifySelf: "end",
            display: "flex",
            gap: "1rem",
            fontSize: ".9rem",
          }}
        >
          <a href="/portfolio.pdf" style={link}>
            Portfolio
          </a>
          <a href="/resume.pdf" style={link}>
            Resume
          </a>
        </div>
      </div>
    </footer>
  );
}

const link = {
  color: "#111",
  textDecoration: "none",
  borderBottom: "1px solid transparent",
  paddingBottom: 2,
  transition: "border-color .2s ease",
  cursor: "pointer",
};
