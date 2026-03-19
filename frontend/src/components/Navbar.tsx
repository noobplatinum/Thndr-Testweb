import React, { useState } from 'react';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="navbar" role="banner">
      <nav className="navbar__inner container" aria-label="Main navigation">
        <a href="/" className="navbar__logo" aria-label="Thndr AI Home">
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
          <li role="none"><a href="#" role="menuitem" className="navbar__link navbar__link--active">Home</a></li>
          <li role="none"><a href="#" role="menuitem" className="navbar__link">Product</a></li>
          <li role="none"><a href="#" role="menuitem" className="navbar__link">Solution</a></li>
          <li role="none"><a href="#" role="menuitem" className="navbar__link">Resources</a></li>
        </ul>

        <div className={`navbar__actions ${mobileOpen ? 'is-open' : ''}`}>
          <a href="#" className="navbar__action-link">Login</a>
          <a href="#" className="navbar__action-btn">Sign Up</a>
        </div>
      </nav>
    </header>
  );
};
