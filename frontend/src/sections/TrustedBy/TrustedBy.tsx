import React from 'react';
import { useCmsContent } from '../../hooks/useCmsContent';
import { cmsDefaults } from '../../cms/managedSections';
import type { TrustedByContent } from '../../types';
import './TrustedBy.css';

export const TrustedBy: React.FC = () => {
  const content = useCmsContent<TrustedByContent>('trustedBy', cmsDefaults.trustedBy);

  return (
    <section className="trusted-by" aria-label="Trusted by leading organizations">
      <div className="container">
        <p className="trusted-by__label">{content.label}</p>
        <div className="trusted-by__logos">
          {content.logos.map((logo) => (
            <div key={logo.name} className="trusted-by__logo" aria-label={logo.name}>
              <span className="trusted-by__text">{logo.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
