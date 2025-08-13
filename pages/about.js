export default function AboutPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>About & Contact</h1>
      <p>Short bio and contact form will be here.</p>
      <div style={{ marginTop: '1rem' }}>
        <a href="/portfolio.pdf" download>Download Portfolio</a><br/>
        <a href="/resume.pdf" download>Download Resume</a>
      </div>
    </div>
  )
}