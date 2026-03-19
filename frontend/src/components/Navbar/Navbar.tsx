import React, { useEffect, useState } from 'react';
import { AuthModal } from '../AuthModal';
import './Navbar.css';

type AuthMode = 'signup' | 'login';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('signup');
  const [welcomeName, setWelcomeName] = useState<string | null>(null);

  useEffect(() => {
    if (!welcomeName) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setWelcomeName(null);
    }, 2600);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [welcomeName]);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="navbar" role="banner">
        <nav className="navbar__inner container" aria-label="Main navigation">
          <a href="/" className="navbar__logo" aria-label="Thndr AI Home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>
            <img src="/thndr-title-gradient.png" alt="Thndr" className="brand-wordmark brand-wordmark--nav" />
          </a>

          <button
            className={`navbar__toggle ${mobileOpen ? 'is-active' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="nav-menu"
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul id="nav-menu" className={`navbar__links ${mobileOpen ? 'is-open' : ''}`} role="menubar">
            <li role="none"><a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }} role="menuitem" className={`navbar__link ${activeSection === 'home' ? 'navbar__link--active' : ''}`}>Home</a></li>
            <li role="none"><a href="#product" onClick={(e) => { e.preventDefault(); scrollTo('product'); }} role="menuitem" className={`navbar__link ${activeSection === 'product' ? 'navbar__link--active' : ''}`}>Product</a></li>
            <li role="none"><a href="#solution" onClick={(e) => { e.preventDefault(); scrollTo('solution'); }} role="menuitem" className={`navbar__link ${activeSection === 'solution' ? 'navbar__link--active' : ''}`}>Solution</a></li>
            <li role="none"><a href="#resources" onClick={(e) => { e.preventDefault(); scrollTo('resources'); }} role="menuitem" className={`navbar__link ${activeSection === 'resources' ? 'navbar__link--active' : ''}`}>Resources</a></li>
          </ul>

          <div className={`navbar__actions ${mobileOpen ? 'is-open' : ''}`}>
            <a href="/admin" className="navbar__action-link">Admin CMS</a>
            <button
              type="button"
              className="navbar__action-link"
              onClick={() => {
                setAuthMode('login');
                setAuthModalOpen(true);
                setMobileOpen(false);
              }}
            >
              Login
            </button>
            <button
              type="button"
              className="navbar__action-btn"
              onClick={() => {
                setAuthMode('signup');
                setAuthModalOpen(true);
                setMobileOpen(false);
              }}
            >
              Sign Up
            </button>
          </div>
        </nav>
      </header>

      <AuthModal
        open={authModalOpen}
        mode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onModeChange={setAuthMode}
        onAuthSuccess={(username) => {
          setWelcomeName(username);
        }}
      />

      {welcomeName ? (
        <div className="welcome-toast" role="status" aria-live="polite">
          Welcome {welcomeName}
        </div>
      ) : null}
    </>
  );
};
