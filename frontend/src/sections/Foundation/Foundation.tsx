import React from 'react';
import { SectionHeader } from '../../components/SectionHeader';
import { Button } from '../../components/Button';
import { useCmsContent } from '../../hooks/useCmsContent';
import { cmsDefaults } from '../../cms/managedSections';
import type { FoundationContent } from '../../types';
import './Foundation.css';

export const Foundation: React.FC = () => {
  const content = useCmsContent<FoundationContent>('foundation', cmsDefaults.foundation);

  const scrollToDemoRequest = () => {
    const element = document.getElementById('demo-request');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="foundation section section--dark" aria-labelledby="foundation-heading">
      <div className="container">
        <SectionHeader
          title={content.title}
          subtitle={content.subtitle}
        />
        <div className="foundation__grid">
          {content.pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="foundation__card"
              style={{ '--pillar-color': pillar.color } as React.CSSProperties}
            >
              <h3 className="foundation__card-title">{pillar.title}</h3>
              <p className="foundation__card-desc">{pillar.description}</p>
              <div
                className="foundation__card-icon"
                style={{ background: `${pillar.color}15`, color: pillar.color }}
              >
                <span style={{ fontSize: '1.15rem', fontWeight: 700 }} aria-hidden="true">{pillar.icon}</span>
              </div>
              <ul className="foundation__features">
                {pillar.features.map((feature) => (
                  <li key={feature} className="foundation__feature">
                    <span className="foundation__feature-dot" style={{ background: pillar.color }} aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="foundation__cta">
          <Button variant="primary" size="md" ariaLabel="Book a demo" onClick={scrollToDemoRequest}>
            {content.ctaLabel} <span className="btn__arrow" aria-hidden="true">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
};
