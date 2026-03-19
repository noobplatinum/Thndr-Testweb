import React from 'react';
import './TrustedBy.css';

const LOGOS = [
  { name: 'UnitedHealth Group', src: '/Companies/unitedhealthcare.png', height: 28 },
  { name: 'Apple', src: '/Companies/apple.png', height: 32 },
  { name: 'CVS Health', src: '/Companies/cvs.png', height: 26 },
  { name: 'Amazon', src: '/Companies/amazon.png', height: 24 },
  { name: 'McKesson', src: '/Companies/mckesson.png', height: 26 },
];

export const TrustedBy: React.FC = () => {
  // Duplicate for seamless infinite scroll
  const allLogos = [...LOGOS, ...LOGOS];

  return (
    <section className="trusted-by" aria-label="Trusted by leading organizations">
      <div className="container">
        <p className="trusted-by__label">Trusted by AI-Driven Teams</p>
        <div className="trusted-by__marquee-mask">
          <div className="trusted-by__marquee-track">
            {allLogos.map((logo, i) => (
              <div key={`${logo.name}-${i}`} className="trusted-by__logo" aria-label={logo.name}>
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="trusted-by__img"
                  style={{ height: `${logo.height}px` }}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
