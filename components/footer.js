// components/footer.js
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ borderTop: "1px solid #e5e7eb", background: "transparent" }}>
      {/* Top grid: 3 columns + right-aligned copyright */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "2.25rem 1.5rem 1.5rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr) auto",
            gap: "2rem 3rem",
            alignItems: "start",
          }}
        >
          {/* EXPLORE */}
          <div>
            <div style={colTitle}>EXPLORE</div>
            <ul style={list}>
              <li><a href="/home" style={link}>Home</a></li>
              <li><a href="/home#projects" style={link}>Work</a></li>
              <li><a href="/process" style={link}>Process</a></li>
              <li><a href="/about" style={link}>About</a></li>
            </ul>
          </div>

          {/* CONNECT */}
          <div>
            <div style={colTitle}>CONNECT</div>
            <ul style={list}>
              <li><a href="https://www.linkedin.com" target="_blank" rel="noreferrer" style={link}>LinkedIn</a></li>
              <li><a href="https://www.instagram.com" target="_blank" rel="noreferrer" style={link}>Instagram</a></li>
              <li><a href="https://www.pinterest.com" target="_blank" rel="noreferrer" style={link}>Pinterest</a></li>
              <li><a href="https://vimeo.com" target="_blank" rel="noreferrer" style={link}>Vimeo</a></li>
            </ul>
          </div>

          {/* DOWNLOADS */}
          <div>
            <div style={colTitle}>DOWNLOADS</div>
            <ul style={list}>
              <li><a href="/resume.pdf" style={link}>Resume</a></li>
              <li><a href="/portfolio.pdf" style={link}>Portfolios</a></li>
              <li><a href="/cv.pdf" style={link}>CV</a></li>
            </ul>
          </div>

          {/* Copyright on the far right */}
          <div style={{ justifySelf: "end", alignSelf: "start", whiteSpace: "nowrap" }}>
            <span style={{ letterSpacing: ".06em" }}>@{year} SILVINO</span>
          </div>
        </div>

        {/* Name image below, left-aligned & scaled down */}
        <div style={{ marginTop: "2.25rem" }}>
          <img
            src="/meganametext.png"
            alt="Thiago Rocha Silvino"
            style={{
              display: "block",
              width: "min(72%, 900px)", // ~25% smaller feel
              height: "auto",
              opacity: 0.95,
              userSelect: "none",
            }}
            draggable={false}
          />
        </div>
      </div>
    </footer>
  );
}

/* ------- tiny style helpers ------- */
const colTitle = {
  fontSize: ".9rem",
  color: "#9CA3AF", // muted gray
  letterSpacing: ".18em",
  textTransform: "uppercase",
  marginBottom: ".6rem",
};

const list = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "grid",
  gap: ".45rem",
};

const link = {
  color: "#111",
  textDecoration: "none",
  borderBottom: "1px solid transparent",
  paddingBottom: 1,
  transition: "border-color .18s ease",
  cursor: "pointer",
};
