// pages/_app.js
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      {/* Footer (not shown on Landing Page) */}
      {typeof window !== "undefined" && window.location.pathname !== "/" && (
        <footer
          style={{
            borderTop: "1px solid #E5E7EB",
            padding: "3rem 1.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
            fontSize: ".9rem",
            color: "#111",
            background: "#fff",
            marginTop: "4rem",
          }}
        >
          {/* NAVIGATION */}
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: "1rem", fontSize: ".8rem", color: "#6B7280" }}>
              NAVIGATION
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "1.8" }}>
              <li><a href="/home" style={linkStyle}>Home</a></li>
              <li><a href="/about" style={linkStyle}>About</a></li>
              <li><a href="/works" style={linkStyle}>Works</a></li>
              <li><a href="/contact" style={linkStyle}>Contact</a></li>
            </ul>
          </div>

          {/* CONNECT */}
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: "1rem", fontSize: ".8rem", color: "#6B7280" }}>
              CONNECT
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "1.8" }}>
              <li><a href="https://www.linkedin.com" target="_blank" style={linkStyle}>LinkedIn</a></li>
              <li><a href="https://www.instagram.com" target="_blank" style={linkStyle}>Instagram</a></li>
              <li><a href="mailto:youremail@example.com" style={linkStyle}>Email</a></li>
            </ul>
          </div>

          {/* DOWNLOADS */}
          <div>
            <h4 style={{ fontWeight: 600, marginBottom: "1rem", fontSize: ".8rem", color: "#6B7280" }}>
              DOWNLOADS
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, lineHeight: "1.8" }}>
              <li><a href="/resume.pdf" target="_blank" style={linkStyle}>Resume</a></li>
              <li><a href="/portfolio.pdf" target="_blank" style={linkStyle}>Portfolio</a></li>
            </ul>
          </div>
        </footer>
      )}
    </>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#111",
  fontWeight: 400,
};
