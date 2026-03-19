import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { Button } from '../components/Button';
import './Foundation.css';

const pillars = [
  {
    title: 'Unified',
    description: 'Eliminate fragmented AI oversight across tools, teams, and vendors.',
    icon: '🔗',
    color: '#00d4aa',
    features: [
      '300+ integrations',
      'Vendor- and environment-agnostic',
      'Central AI governance registry',
    ],
  },
  {
    title: 'Trusted AI',
    description: 'Deploy AI with confidence across the organization and ecosystem.',
    icon: '🛡️',
    color: '#a855f7',
    features: [
      'Continuous security, compliance, risk monitoring',
      'Organization-wide interpretability and transparency',
      'Centralized internal and external AI risk oversight',
    ],
  },
  {
    title: 'Automated',
    description: 'Reduce manual governance effort while accelerating compliant AI development.',
    icon: '⚡',
    color: '#3b82f6',
    features: [
      'Automated enforcement, reporting, auditing',
      'AI Governance committee workflows automated',
      'Faster AI development with governance controls',
    ],
  },
];

export const Foundation: React.FC = () => {
  return (
    <section className="foundation section section--dark" aria-labelledby="foundation-heading">
      <div className="container">
        <SectionHeader
          title="The complete foundation for AI governance"
          subtitle="Eliminate fragmentation, establish trust, and scale AI with automation."
        />
        <div className="foundation__grid">
          {pillars.map((pillar) => (
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
                <span style={{ fontSize: '2rem' }} aria-hidden="true">{pillar.icon}</span>
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
          <Button variant="primary" size="md" ariaLabel="Book a demo">
            Book a Demo <span className="btn__arrow" aria-hidden="true">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
};
