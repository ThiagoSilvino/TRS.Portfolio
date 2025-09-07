// components/footer.js
export default function Footer() {
  return (
    <footer
      style={{
        background: "#f8f8f8",
        borderTop: "1px solid #e5e7eb",
        padding: "3rem 1.5rem 2rem",
        marginTop: "4rem",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "2rem",
        }}
      >
        {/* EXPLORE */}
        <div>
          <h4 style={heading}>EXPLORE</h4>
          <ul style={list}>
            <li><a href="/home" style={link}>Home</a></li>
            <li><a href="/home#projects" style={link}>Work</a></li>
            <li><a href="/process" style={link}>Process</a></li>
            <li><a href="/about" style={link}>About</a></li>
          </ul>
        </div>

        {/* CONNECT */}
        <div>
          <h4 style={heading}>CONNECT</h4>
          <ul style={list}>
            <li><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" style={link}>LinkedIn</a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noreferrer" style={link}>Instagram</a></li>
            <li><a href="https://www.pinterest.com" target="_blank" rel="noreferrer" style={link}>Pinterest</a></li>
            <li><a href="https://vimeo.com" target="_blank" rel="noreferrer" style={link}>Vimeo</a></li>
          </ul>
        </div>

        {/* RESOURCES (was Downloads) */}
        <div>
          <h4 style={heading}>RESOURCES</h4>
          <ul style={list}>
            <li><a href="/resume.pdf" style={link}>Resume</a></li>
            <li><a href="/portfolio.pdf" style={link}>Portfolios</a></li>
            <li><a href="/cv.pdf" style={link}>CV</a></li>
          </ul>
        </div>

        {/* COPYRIGHT */}
        <div style={{ alignSelf: "end", textAlign: "right", fontSize: ".9rem", color: "#555" }}>
          @2025 SILVINO
        </div>
      </div>

      {/* Bottom logo bar */}
      <div style={{ marginTop: "2rem", borderTop: "1px solid #e5e7eb", paddingTop: "1.5rem" }}>
        <img
          src="/meganametext.png"
          alt="Thiago Rocha Silvino"
          style={{
            display: "block",
            width: "25%",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </div>
    </footer>
  );
}

/* ---- simple inline style helpers ---- */
const heading = {
  fontSize: ".9rem",
  fontWeight: 700,
  letterSpacing: ".08em",
  margin: "0 0 .75rem",
  color: "#111",
};

const list = {
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "grid",
  gap: ".4rem",
};

const link = {
  textDecoration: "none",
  color: "#374151",
  fontSize: ".95rem",
};
