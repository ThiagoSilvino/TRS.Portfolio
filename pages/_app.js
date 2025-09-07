// pages/_app.js
import Head from "next/head";
import "../styles/globals.css";

export default function MyApp({ Component, pageProps }) {
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

        {/* Open Graph */}
        <meta property="og:title" content="Thiago Rocha Silvino — Portfolio" />
        <meta
          property="og:description"
          content="Elegant, simple, and creative architecture & design work."
        />
        <meta property="og:type" content="website" />
        {/* Update to your primary domain if different */}
        <meta property="og:url" content="https://thiagosilvino.com" />
        {/* Optional preview image if/when you add one to /public */}
        {/* <meta property="og:image" content="/og-image.jpg" /> */}
      </Head>

      {/* Render current page as-is (no global nav/footer injected here) */}
      <Component {...pageProps} />
    </>
  );
}
