<main style={{ background: "#F7F7F5", color: "#111" }}>
<div style={{ height: "6vh" }} />

      {/* === MEGA HEADLINE === */}
      {/* === MEGA HEADLINE (single line, never wraps) === */}
<section style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem" }}>
<h1
style={{
@@ -62,27 +62,53 @@ export default function HomePage() {
letterSpacing: "-0.01em",
fontFamily:
"Space Grotesk, Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
            fontSize: "clamp(3.2rem, 16vw, 12rem)",
            // Keep on one line: shrink before wrap
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            // Max huge, scales down on smaller screens, never wraps
            fontSize: "clamp(2.2rem, 10vw, 12rem)",
textAlign: "center",
position: "relative",
            zIndex: 2,
            zIndex: 2, // above bg image, below fg image if they overlap
}}
>
THIAGO ROCHA SILVINO
</h1>
</section>

      {/* === DIVIDER / BREAK between name and layered image === */}
      <div
        aria-hidden="true"
        style={{
          maxWidth: 1280,
          margin: "1.25rem auto 1.75rem",
          padding: "0 1.5rem",
        }}
      >
        <div
          style={{
            height: 8,                    // thicker band for emphasis
            background: "#E7E7E7",
            borderRadius: 999,
            boxShadow: "inset 0 -1px 0 #e3e3e3, inset 0 1px 0 #efefef",
          }}
        />
      </div>

{/* === LAYERED IMAGE PARALLAX === */}
<section
style={{
position: "relative",
maxWidth: 1280,
          margin: "2rem auto 4rem",
          margin: "0 auto 4rem",
padding: "0 1.5rem",
height: "clamp(260px, 55vw, 520px)",
          zIndex: 1, // sits under the foreground image and divider above
}}
aria-label="Featured architecture image with layered parallax"
>
        {/* Background image (behind text) */}
<img
ref={bgRef}
src="/Projects/FeaturedBackground.png"
@@ -99,6 +125,8 @@ export default function HomePage() {
willChange: "transform",
}}
/>

        {/* Foreground image (over text) */}
<img
ref={fgRef}
src="/Projects/FeaturedForeground.png"
@@ -110,14 +138,14 @@ export default function HomePage() {
height: "100%",
objectFit: "cover",
borderRadius: 12,
            zIndex: 3,
            zIndex: 3, // foremost
willChange: "transform",
pointerEvents: "none",
}}
/>
</section>

      {/* === NEW SECTION: PARALLAX STRIPE BEHIND CONTENT === */}
      {/* === PARALLAX STRIPE BEHIND CONTENT (next section) === */}
<section
style={{
position: "relative",
@@ -126,7 +154,7 @@ export default function HomePage() {
marginBottom: "4rem",
}}
>
        {/* The band that parallax-scrolls behind */}
        {/* Band that moves behind */}
<div
ref={bandRef}
aria-hidden="true"
@@ -135,17 +163,16 @@ export default function HomePage() {
left: 0,
right: 0,
top: "-20vh",
            height: "40vh",                       // thickness of the stripe
            background:
              "linear-gradient(180deg, #EDEDED 0%, #E7E7E7 50%, #EDEDED 100%)",
            height: "40vh",
            background: "linear-gradient(180deg, #EDEDED 0%, #E7E7E7 50%, #EDEDED 100%)",
borderTop: "1px solid #e3e3e3",
borderBottom: "1px solid #e3e3e3",
            zIndex: 0,                            // sits behind the content box
            zIndex: 0, // behind content
willChange: "transform",
}}
/>

        {/* Content that appears in front of the band */}
        {/* Content over the stripe */}
<div
style={{
position: "relative",
@@ -179,7 +206,6 @@ export default function HomePage() {
</h2>
</div>

          {/* Placeholder content row (swap with cards/projects later) */}
<div
style={{
display: "grid",
@@ -197,9 +223,8 @@ export default function HomePage() {
}}
>
<p style={{ margin: 0, color: "#374151" }}>
                This band scrolls **at a different speed** behind the content, creating depth
                without being flashy. Replace this with a short studio statement, a CTA, or a
                slim grid of two more projects.
                This stripe scrolls at a different speed behind the content, creating depth
                without distraction. Replace with a short studio statement or additional project teasers.
</p>
</div>
</div>
