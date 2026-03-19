import React from 'react';
import './TrustedBy.css';

const logos = [
  { name: 'Commonwealth', text: 'COMMONWEALTH GROUP' },
  { name: 'Apple', text: '' },
  { name: 'CVS Health', text: 'CVS Health' },
  { name: 'Amazon', text: 'amazon' },
  { name: 'McKesson', text: 'McKESSON' },
  { name: 'Cencora', text: 'cencora' },
];

export const TrustedBy: React.FC = () => {
  return (
    <section className="trusted-by" aria-label="Trusted by leading organizations">
      <div className="container">
        <p className="trusted-by__label">Trusted by AI-Driven Teams</p>
        <div className="trusted-by__logos">
          {logos.map((logo) => (
            <div key={logo.name} className="trusted-by__logo" aria-label={logo.name}>
              {logo.name === 'Apple' ? (
                <svg width="24" height="28" viewBox="0 0 24 28" fill="currentColor" aria-hidden="true">
                  <path d="M21.5 19.8c-.5 1.1-1.1 2.1-1.8 3-.9 1.3-1.8 2.2-2.5 2.7-.9.7-1.9 1.1-2.9 1.1-.7 0-1.6-.2-2.6-.6-1-.4-1.9-.6-2.7-.6-.9 0-1.8.2-2.8.6-.9.4-1.7.6-2.4.6-1.1 0-2.1-.4-3.1-1.1C.3 24.7-.3 23.5-.3 22c0-1.8.8-3.4 1.7-4.9 1.1-1.8 2.5-2.7 4.1-2.7.8 0 1.8.2 3.2.7 1.3.5 2.1.7 2.5.7.3 0 1.2-.2 2.8-.8 1.4-.5 2.6-.7 3.5-.6 2.6.2 4.6 1.4 5.8 3.6-2.4 1.4-3.5 3.4-3.4 5.9.1 2 .7 3.6 2 4.9-.6.7-1.2.5-.4-.9zm-5.2-18C17 2.7 17.4 3.7 17.4 5c0 1.3-.5 2.5-1.4 3.7-1.1 1.4-2.5 2.2-3.9 2.1 0-1.5.5-2.8 1.4-3.9.9-1.1 2-1.8 2.8-2.1z"/>
                </svg>
              ) : (
                <span className="trusted-by__text">{logo.text}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
