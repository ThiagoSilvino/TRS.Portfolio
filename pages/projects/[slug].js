// pages/projects/[slug].js
import { useRouter } from "next/router";
import Head from "next/head";
import NavBar from "../../components/nav-bar.js";
import Footer from "../../components/footer.js";
import projects from "../../data/projects.js";

export default function ProjectPage() {
  const router = useRouter();
  const { slug } = router.query;

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <main style={{ background: "#F7F7F5", minHeight: "100vh", color: "#111" }}>
        <NavBar />
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1.5rem" }}>
          <h1 style={{ marginTop: 0 }}>Project not found</h1>
          <p>Check the URL or return to <a href="/home">Home</a>.</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>{project.title} — Thiago Rocha Silvino</title>
        <meta name="description" content={project.summary || project.title} />
      </Head>

      <main style={{ background: "#F7F7F5", minHeight: "100vh", color: "#111" }}>
        <NavBar />

        {/* Hero */}
        <section style={{ maxWidth: 1280, margin: "0 auto", padding: "1.5rem" }}>
          <h1 style={{ margin: "0 0 .5rem", fontWeight: 800, letterSpacing: ".01em" }}>
            {project.title}
          </h1>
          <p style={{ color: "#6B7280", marginTop: 0 }}>
            {project.category} · {project.year}{project.location ? ` · ${project.location}` : ""}
          </p>
          {project.hero && (
            <img
              src={project.hero}
              alt={project.title}
              style={{ width: "100%", height: "auto", borderRadius: 12, border: "1px solid #e5e7eb" }}
            />
          )}
        </section>

        {/* Summary */}
        {project.summary && (
          <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem 1.5rem" }}>
            <p style={{ maxWidth: 820, color: "#374151", lineHeight: 1.7 }}>{project.summary}</p>
          </section>
        )}

        {/* Gallery */}
        {project.gallery?.length > 0 && (
          <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem 2rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1rem" }}>
              {project.gallery.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${project.title} image ${i + 1}`}
                  style={{ width: "100%", height: "auto", borderRadius: 12, border: "1px solid #e5e7eb" }}
                  loading="lazy"
                />
              ))}
            </div>
          </section>
        )}

        {/* Credits / Resources */}
        {(project.credits?.length || project.downloads?.length) && (
          <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.5rem 3rem" }}>
            <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "1fr", alignItems: "start" }}>
              {!!project.credits?.length && (
                <div>
                  <h3 style={{ margin: "0 0 .5rem" }}>Credits</h3>
                  <ul style={{ margin: 0, paddingLeft: "1.1rem", color: "#374151" }}>
                    {project.credits.map((line, i) => <li key={i}>{line}</li>)}
                  </ul>
                </div>
              )}
              {!!project.downloads?.length && (
                <div>
                  <h3 style={{ margin: "0 0 .5rem" }}>Resources</h3>
                  <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
                    {project.downloads.map((d, i) => (
                      <a key={i} href={d.href} style={btnSecondary} download>
                        {d.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        <Footer />
      </main>
    </>
  );
}

const btnSecondary = {
  display: "inline-block",
  padding: ".65rem 1rem",
  borderRadius: 999,
  fontWeight: 600,
  color: "#111",
  background: "#fff",
  border: "1px solid #e5e7eb",
  textDecoration: "none",
};
