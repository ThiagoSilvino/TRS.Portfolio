'use client';

import {useEffect, useRef, useState, useCallback} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

/**
 * NAV BAR — Spec-aligned implementation
 *
 * Props:
 * - heroHeight (number): scroll threshold in px for revealing brand on the home page.
 *                        Default 600 if not provided.
 * - solidBg (string): CSS color for solid header background after scroll (brand primary).
 *                     Default 'rgba(247,247,245,0.95)'.
 * - borderColor (string): CSS color for the bottom border. Default 'rgba(0,0,0,0.08)'.
 */
export default function NavBar({
  heroHeight = 600,
  solidBg = 'rgba(247,247,245,0.95)',
  borderColor = 'rgba(0,0,0,0.08)',
}) {
  const pathname = usePathname();
  const isHome = pathname === '/' || pathname === '/home';

  // UI state
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Derived: brand visible?
  const brandVisible = !isHome || scrolled;

  // Refs for focus management
  const menuCloseBtnRef = useRef(null);
  const searchCloseBtnRef = useRef(null);
  const lastFocusedRef = useRef(null);

  // Scroll handler — reveal brand after hero
  useEffect(() => {
    if (!isHome) return; // brand always visible on non-home
    const onScroll = () => setScrolled(window.scrollY >= heroHeight);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome, heroHeight]);

  // Body scroll lock while overlays are open
  useEffect(() => {
    const anyOpen = menuOpen || searchOpen;
    const original = document.body.style.overflow;
    document.body.style.overflow = anyOpen ? 'hidden' : original || '';
    return () => {
      document.body.style.overflow = original || '';
    };
  }, [menuOpen, searchOpen]);

  // Remember/restore focus
  const openOverlay = useCallback((type) => {
    lastFocusedRef.current = document.activeElement;
    if (type === 'menu') setMenuOpen(true);
    if (type === 'search') setSearchOpen(true);
    // Focus close button shortly after mount
    setTimeout(() => {
      if (type === 'menu' && menuCloseBtnRef.current) menuCloseBtnRef.current.focus();
      if (type === 'search' && searchCloseBtnRef.current) searchCloseBtnRef.current.focus();
    }, 0);
  }, []);

  const closeOverlays = useCallback(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    if (lastFocusedRef.current && lastFocusedRef.current.focus) {
      lastFocusedRef.current.focus();
    }
  }, []);

  // Global ESC to close overlays
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && (menuOpen || searchOpen)) {
        e.preventDefault();
        closeOverlays();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen, searchOpen, closeOverlays]);

  // Simple focus trap for open overlay
  const trapFocus = useCallback((e) => {
    const overlay = e.currentTarget;
    if (e.key !== 'Tab') return;
    const focusables = overlay.querySelectorAll(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  // Header background style per spec
  const headerStyle = {
    background: isHome && !scrolled ? 'transparent' : solidBg,
    backdropFilter: isHome && !scrolled ? 'none' : 'saturate(180%) blur(8px)',
    WebkitBackdropFilter: isHome && !scrolled ? 'none' : 'saturate(180%) blur(8px)',
    borderBottom: `1px solid ${borderColor}`,
    transition: 'background 0.3s ease, backdrop-filter 0.3s ease, -webkit-backdrop-filter 0.3s ease',
  };

  return (
    <>
      <header
        style={headerStyle}
        className="nav-root"
        role="banner"
        aria-label="Site navigation"
      >
        {/* Left: Hamburger (Menu) */}
        <button
          className="icon-btn left"
          aria-label="Open menu"
          onClick={() => openOverlay('menu')}
        >
          <HamburgerIcon />
        </button>

        {/* Center: Brand (appears after scroll on home) */}
        <div
          className={`brand ${brandVisible ? 'brand--visible' : 'brand--hidden'}`}
          aria-hidden={!brandVisible}
        >
          <Link href="/" aria-label="Go to homepage" className="brand-link">SILVINO</Link>
        </div>

        {/* Right: Search */}
        <button
          className="icon-btn right"
          aria-label="Open search"
          onClick={() => openOverlay('search')}
        >
          <SearchIcon />
        </button>
      </header>

      {/* MENU OVERLAY — fullscreen; close aligned with left (hamburger) */}
      {menuOpen && (
        <div
          className="overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          onKeyDown={trapFocus}
        >
          <div className="overlay-inner">
            <button
              ref={menuCloseBtnRef}
              className="overlay-close overlay-close--left"
              aria-label="Close menu"
              onClick={closeOverlays}
            >
              <CloseIcon />
            </button>

            <nav className="overlay-content">
              <div className="overlay-col">
                <h2 className="overlay-heading">Explore</h2>
                <OverlayLink href="/" onClick={closeOverlays}>Home</OverlayLink>
                <OverlayLink href="/work" onClick={closeOverlays}>Work</OverlayLink>
                <OverlayLink href="/process" onClick={closeOverlays}>Process</OverlayLink>
                <OverlayLink href="/about" onClick={closeOverlays}>About</OverlayLink>
              </div>

              <div className="overlay-col">
                <h2 className="overlay-heading">Connect</h2>
                <OverlayExternal href="https://www.linkedin.com" onClick={closeOverlays}>LinkedIn</OverlayExternal>
                <OverlayExternal href="https://www.instagram.com" onClick={closeOverlays}>Instagram</OverlayExternal>
                <OverlayExternal href="https://www.pinterest.com" onClick={closeOverlays}>Pinterest</OverlayExternal>
                <OverlayExternal href="https://vimeo.com" onClick={closeOverlays}>Vimeo</OverlayExternal>
              </div>

              <div className="overlay-col">
                <h2 className="overlay-heading">Resources</h2>
                <OverlayExternal href="/downloads/resume.pdf" onClick={closeOverlays}>Resume</OverlayExternal>
                <OverlayExternal href="/downloads/portfolio.pdf" onClick={closeOverlays}>Portfolio</OverlayExternal>
                <OverlayExternal href="/downloads/cv.pdf" onClick={closeOverlays}>CV</OverlayExternal>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* SEARCH OVERLAY — fullscreen; close aligned with right (magnifying glass) */}
      {searchOpen && (
        <div
          className="overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
          onKeyDown={trapFocus}
        >
          <div className="overlay-inner">
            <button
              ref={searchCloseBtnRef}
              className="overlay-close overlay-close--right"
              aria-label="Close search"
              onClick={closeOverlays}
            >
              <CloseIcon />
            </button>

            <div className="search-wrap" role="search">
              <label htmlFor="site-search" className="sr-only">Search</label>
              <input
                id="site-search"
                type="search"
                placeholder="Search…"
                className="search-input"
                autoFocus
              />
              <button className="search-submit" onClick={closeOverlays} aria-label="Submit search">
                <SearchIcon />
                <span className="search-submit-text">Search</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .nav-root {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          height: 64px;
          display: grid;
          grid-template-columns: 64px 1fr 64px;
          align-items: center;
          z-index: 1000;
        }
        .icon-btn {
          height: 64px;
          width: 64px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: 0;
          cursor: pointer;
        }
        .icon-btn:focus-visible,
        .overlay-close:focus-visible,
        .search-input:focus-visible,
        .search-submit:focus-visible,
        a:focus-visible {
          outline: 2px solid currentColor;
          outline-offset: 2px;
        }
        .left { justify-self: start; }
        .right { justify-self: end; }

        .brand {
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.3s ease, transform 0.3s ease;
          will-change: opacity, transform;
          pointer-events: auto;
        }
        .brand--hidden { opacity: 0; transform: translateY(-4px); pointer-events: none; }
        .brand--visible { opacity: 1; transform: translateY(0); }
        .brand-link {
          font-size: 14px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          text-decoration: none;
          color: inherit;
        }

        /* Overlay base */
        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: saturate(180%) blur(8px);
          -webkit-backdrop-filter: saturate(180%) blur(8px);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: overlayFade 180ms ease;
        }
        @keyframes overlayFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .overlay-inner {
          position: relative;
          width: min(1200px, 92vw);
          padding: 32px 20px;
        }
        /* Close buttons aligned with their triggers per spec */
        .overlay-close {
          position: absolute;
          top: 0;
          height: 64px;
          width: 64px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: 0;
          cursor: pointer;
        }
        .overlay-close--left { left: 0; }
        .overlay-close--right { right: 0; }

        /* Menu overlay content grid */
        .overlay-content {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 32px;
          padding-top: 64px; /* leave room for the close button row */
        }
        .overlay-col { display: flex; flex-direction: column; gap: 12px; }
        .overlay-heading {
          font-size: 14px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin: 0 0 8px 0;
        }
        .overlay-link {
          font-size: 18px;
          text-decoration: none;
          color: inherit;
          line-height: 1.5;
        }
        .overlay-link:hover { text-decoration: underline; }

        /* Search overlay UI */
        .search-wrap {
          display: flex;
          gap: 12px;
          align-items: center;
          padding-top: 64px; /* leave room for close */
        }
        .search-input {
          flex: 1;
          font-size: 18px;
          line-height: 1.4;
          padding: 14px 16px;
          border: 1px solid rgba(0,0,0,0.15);
          border-radius: 8px;
          background: #fff;
        }
        .search-submit {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(0,0,0,0.15);
          border-radius: 8px;
          padding: 12px 16px;
          background: #fff;
          cursor: pointer;
        }
        .search-submit-text { font-size: 16px; }

        /* Responsive */
        @media (max-width: 900px) {
          .overlay-content {
            grid-template-columns: 1fr;
          }
        }

        /* Screen reader only */
        .sr-only {
          border: 0 !important;
          clip: rect(1px, 1px, 1px, 1px) !important;
          -webkit-clip-path: inset(50%) !important;
          clip-path: inset(50%) !important;
          height: 1px !important;
          margin: -1px !important;
          overflow: hidden !important;
          padding: 0 !important;
          position: absolute !important;
          width: 1px !important;
          white-space: nowrap !important;
        }
      `}</style>
    </>
  );
}

/* ---------- Helpers / Icons ---------- */

function OverlayLink({href, children, onClick}) {
  return (
    <Link href={href} className="overlay-link" onClick={onClick}>
      {children}
    </Link>
  );
}

function OverlayExternal({href, children, onClick}) {
  return (
    <a
      href={href}
      className="overlay-link"
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {children}
    </a>
  );
}

function HamburgerIcon() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" aria-hidden="true">
      <path d="M1 1h20M1 8h20M1 15h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" fill="none"/>
      <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}
