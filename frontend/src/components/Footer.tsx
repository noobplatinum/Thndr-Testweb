import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  const footerLinks = {
    Product: ['Features', 'Pricing', 'Security', 'Integrations'],
    Resources: ['Documentation', 'Blog', 'Case Studies', 'Webinars'],
    Company: ['About', 'Careers', 'Contact', 'Privacy'],
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <a href="/" className="footer__logo" aria-label="Thndr AI Home">
              <svg width="100" height="30" viewBox="0 0 100 30" fill="none" aria-hidden="true">
                <text x="0" y="24" fontFamily="Inter, sans-serif" fontSize="26" fontWeight="800" fill="white">
                  <tspan fill="#00d4aa">T</tspan>hndr
                </text>
              </svg>
            </a>
            <p className="footer__tagline">
              AI Governance Automation for modern enterprises
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="footer__column">
              <h3 className="footer__heading">{category}</h3>
              <ul className="footer__list">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="footer__link">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2026 ThndrAI. All rights reserved.
          </p>
          <div className="footer__legal">
            <a href="#" className="footer__legal-link">Terms</a>
            <a href="#" className="footer__legal-link">Privacy</a>
            <a href="#" className="footer__legal-link">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
