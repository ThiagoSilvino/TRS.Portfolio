// pages/home.js
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();
  const cameFromLanding = router.query.from === "landing";

  return (
    <main style={{ maxWidth: 1280, margin: "0 auto", padding: "2rem 1.5rem" }}>
      {/* Hero */}
      <section style={{ padding: "min(6vw,5rem) 0 1rem" }}>
        <div style={kicker}>Practice</div>
        <h1
          id="hero-name"
          style={{
            ...display,
            ...(cameFromLanding ? {} : animateIn)
          }}
        >
          THIAGO ROCHA SILVINO.
        </h1>
        <p style={lede}>Selected works exploring craft, context, and clarity.</p>
      </section>

      {/* Projects (simple demo grid) */}
      <section id="projects">
        <div style={grid}>
          <Tile title="Manitoba Curling Centre" tags="Cultural · 2024 · Concept → Build" image="/Projects/Featured.jpg" span={2} />
          <Tile title="USAG Dorms" tags="Residential · 2023" image="/Projects/HERO_USAG_Dorm1.jpg" />
          <Tile title="LSU Arena" tags="Public · 2022" image="/Projects/Hero_LSU_Arena 1.jpg" />
          <Tile title="Timber Library" tags="Institutional · 2024" image="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2069&auto=format&fit=crop" />
          <Tile title="East Hall" tags="Education · 2021" image="https://images.unsplash.com/photo-1465804575741-338df8554e38?q=80&w=2070&auto=format&fit=crop" />
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2rem" }}>
          <a href="#projects" className="btn">View All Projects</a>
          <a href="/viewer" className="btn">Open 3D Viewer</a>
        </div>
      </section>
    </main>
  );
}

function Tile({ title, tags, image, span = 1 }) {
  return (
    <article style={{ ...tile, gridColumn: span === 2 ? "span 2" : "auto" }}>
      <img src={image} alt={title} style={tileMedia} />
      <div style={tileCap}>
        <h3 style={{ margin: 0, fontSize: "1.15rem", fontWeight: 700 }}>{title}</h3>
        <div style={{ opacity: .85, fontSize: ".95rem" }}>{tags}</div>
      </div>
    </article>
  );
}

/* styles */
const kicker = { textTransform: "uppercase", letterSpacing: ".12em", fontSize: ".8rem", color: "#6B7280" };
const display = { fontSize: "clamp(2rem, 5vw, 3.2rem)", lineHeight: 1.1, margin: ".5rem 0 1rem", whiteSpace: "nowrap" };
const animateIn = { transform: "translateY(10px)", opacity: 0, animation: "fadeUp .6s ease forwards" };
const lede = { maxWidth: "70ch", color: "#374151", fontSize: "1.05rem" };
const grid = { display: "grid", gap: "clamp(1rem, 2.8vw, 2rem)", gridTemplateColumns: "1fr" };
const tile = { background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 2px 24px rgba(0,0,0,.08)", position: "relative" };
const tileMedia = { aspectRatio: "16 / 10", width: "100%", objectFit: "cover", display: "block" };
const tileCap = { position: "absolute", left: 0, right: 0, bottom: 0, padding: "1rem 1rem 1.2rem", color: "#fff", background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.65) 85%)" };

/* keyframes (inlined for simplicity) */
if (typeof document !== "undefined" && !document.getElementById("fadeUpKey")) {
  const style = document.createElement("style");
  style.id = "fadeUpKey";
  style.innerHTML = `@keyframes fadeUp { to { opacity: 1; transform: translateY(0) } }`;
  document.head.appendChild(style);
}
