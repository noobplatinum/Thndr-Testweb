import React from 'react';
import { SectionHeader } from '../../components/SectionHeader';
import './Services.css';
import { useCmsContent } from '../../hooks/useCmsContent';
import { cmsDefaults, type ServiceOffering } from '../../cms/managedSections';

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
      title: 'Automate',
      description: 'We deploy unified controls across your models.',
      icon: 'AU',
      color: '#3b82f6',
    },
  ];

  const services = useCmsContent<ServiceOffering[]>("services", cmsDefaults.services);

  return (
    <section className="services" id="services">
      <div className="container">
        <SectionHeader 
          title="Enterprise services"
          subtitle="Beyond software. We help you establish trust at scale."
        />

        <div className="services__layout">
          <div className="services__steps">
            <h3 className="services__heading">Our Approach</h3>
            <div className="services__timeline">
              {steps.map((step) => (
                <div key={step.number} className="services__step">
                  <div className="services__step-number" style={{ background: step.color }}>
                    {step.number}
                  </div>
                  <div className="services__step-content">
                    <h4 className="services__step-title">{step.title}</h4>
                    <p className="services__step-desc">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="services__offerings">
            <h3 className="services__heading">Professional Services</h3>
            <div className="services__cards">
              {services.map((service, index) => (
                <div key={index} className="services__card">
                  <h4 className="services__card-title">{service.title}</h4>
                  <p className="services__card-desc">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
