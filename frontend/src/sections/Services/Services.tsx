import React from 'react';
import type { IconType } from 'react-icons';
import { FiSearch, FiSettings, FiTool } from 'react-icons/fi';
import './Services.css';

const servicesIconMap: Record<string, IconType> = {
  AS: FiSearch,
  AR: FiTool,
  AU: FiSettings,
};

export const Services: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: 'Assess',
      description: 'We analyze your environment and governance needs.',
      icon: 'AS',
      color: '#00d4aa',
    },
    {
      number: 2,
      title: 'Architect',
      description: 'We design governance aligned with your infrastructure.',
      icon: 'AR',
      color: '#a855f7',
    },
    {
      number: 3,
      title: 'Deploy',
      description: 'We implement and deploy your governance platform.',
      icon: 'AU',
      color: '#3b82f6',
    },
  ];

  return (
    <section className="services" id="services">
      <div className="container">
        <div className="services__hero">
          <h2 className="services__title">
            We Don't Just <span className="services__title-accent services__title-accent--orange">Provide Software.</span>
            <br />
            We Help You <span className="services__title-accent services__title-accent--cyan">Make It Work.</span>
          </h2>
          <p className="services__lede">
            Forward deployed engineers partner with your team to
            implement governance faster, reduce risk, and ensure
            production-ready AI systems.
          </p>
        </div>

        <div className="services__steps">
          <h3 className="services__heading">Our Approach</h3>
          <div className="services__timeline">
            {steps.map((step) => {
              const Icon = servicesIconMap[step.icon] ?? FiSearch;

              return (
              <div key={step.number} className="services__step">
                <div className="services__step-top" style={{ '--step-color': step.color } as React.CSSProperties}>
                  <Icon className="services__step-top-icon" aria-hidden="true" />
                </div>
                <div className="services__step-content">
                  <div className="services__step-number">{step.number}.</div>
                  <h4 className="services__step-title">{step.title}</h4>
                  <p className="services__step-desc">{step.description}</p>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
