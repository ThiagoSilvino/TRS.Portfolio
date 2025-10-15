// pages/_app.js
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Core meta */}
        <title>Thiago Rocha Silvino — Portfolio</title>
        <meta
          name="description"
          content="Portfolio of Thiago Rocha Silvino — elegant, simple, and creative architecture & design work."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Favicon (all lowercase in /public) */}
        <link rel="icon" href="/favicon.png" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />

        {/* Open Graph (for link previews) */}
        <meta property="og:title" content="Thiago Rocha Silvino — Portfolio" />
        <meta
          property="og:description"
          content="Elegant, simple, and creative architecture & design work."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://thiagosilvino.com" />
        {/* Optional image for social preview */}
        {/* <meta property="og:image" content="/og-image.jpg" /> */}

        {/* Optional: Preload hero image for faster first paint */}
        <link
          rel="preload"
          as="image"
          href="/projects/featured/featuredbackground.png"
        />
      </Head>

      {/* Render page content */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
