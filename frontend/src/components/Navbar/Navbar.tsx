import React, { useState } from 'react';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

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
    <header className="navbar" role="banner">
      <nav className="navbar__inner container" aria-label="Main navigation">
        <a href="/" className="navbar__logo" aria-label="Thndr AI Home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }}>
          <svg width="110" height="32" viewBox="0 0 110 32" fill="none" aria-hidden="true">
            <text x="0" y="26" fontFamily="Inter, sans-serif" fontSize="28" fontWeight="800" fill="white">
              <tspan fill="#00d4aa">T</tspan>hndr
            </text>
          </svg>
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
          <a href="#" className="navbar__action-btn">Sign Up</a>
        </div>
      </nav>
    </header>
  );
};
