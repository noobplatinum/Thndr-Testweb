import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import './Services.css';

const steps = [
  {
    number: 1,
    title: 'Assess',
    description: 'We analyze your environment and governance needs.',
    icon: '🔗',
    color: '#00d4aa',
  },
  {
    number: 2,
    title: 'Architect',
    description: 'We design governance aligned with your infrastructure.',
    icon: '🛡️',
    color: '#a855f7',
  },
  {
    number: 3,
    title: 'Deploy',
    description: 'We implement and deploy your governance platform.',
    icon: '🚀',
    color: '#3b82f6',
  },
];

export const Services: React.FC = () => {
  return (
    <section className="services section section--dark" aria-labelledby="services-heading">
      <div className="container">
        <SectionHeader
          title="We Don't Just Provide Software. We Help You Make It Work."
          titleHighlight="Provide Software."
          highlightColor="cyan"
        />
        <p className="services__desc">
          Forward deployed engineers partner with your team to implement governance faster, reduce risk, and ensure production-ready AI systems.
        </p>
        <div className="services__grid">
          {steps.map((step) => (
            <div
              key={step.number}
              className="services__card"
              style={{ '--step-color': step.color } as React.CSSProperties}
            >
              <div className="services__card-icon" style={{ background: `${step.color}15` }}>
                <span style={{ fontSize: '2.5rem' }} aria-hidden="true">{step.icon}</span>
              </div>
              <div className="services__card-number">{step.number}.</div>
              <h3 className="services__card-title">{step.title}</h3>
              <p className="services__card-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
