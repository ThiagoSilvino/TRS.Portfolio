export default function Landing() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: '#000',
      color: '#fff'
    }}>
      <h1>Thiago Silvino Portfolio</h1>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <a href="/home" style={{ color: '#4C7DFF' }}>Enter</a>
        <a href="/home" style={{ color: '#4C7DFF' }}>Work</a>
        <a href="/cv.pdf" style={{ color: '#4C7DFF' }} download>CV</a>
      </div>
    </div>
  )
}