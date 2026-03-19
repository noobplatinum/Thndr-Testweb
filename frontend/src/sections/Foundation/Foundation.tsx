import React from 'react';
import type { IconType } from 'react-icons';
import { FiActivity, FiShield, FiZap } from 'react-icons/fi';
import { SectionHeader } from '../../components/SectionHeader';
import { Button } from '../../components/Button';
import { useCmsContent } from '../../hooks/useCmsContent';
import { cmsDefaults } from '../../cms/managedSections';
import type { FoundationContent } from '../../types';
import './Foundation.css';

const foundationIconMap: Record<string, IconType> = {
  UN: FiActivity,
  TR: FiShield,
  AU: FiZap,
};

interface FoundationProps {
  onBookDemo: () => void;
}

export const Foundation: React.FC<FoundationProps> = ({ onBookDemo }) => {
  const content = useCmsContent<FoundationContent>('foundation', cmsDefaults.foundation);

  return (
    <section className="foundation section section--dark" aria-labelledby="foundation-heading">
      <div className="container">
        <SectionHeader
          title={content.title}
          subtitle={content.subtitle}
        />
        <div className="foundation__grid">
          {content.pillars.map((pillar) => {
            const Icon = foundationIconMap[pillar.icon] ?? FiActivity;

            return (
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
                <Icon className="foundation__icon-glyph" aria-hidden="true" />
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
            );
          })}
        </div>
        <div className="foundation__cta">
          <Button variant="primary" size="md" ariaLabel="Book a demo" onClick={onBookDemo}>
            {content.ctaLabel} <span className="btn__arrow" aria-hidden="true">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
};
