import React from 'react';
import { Button } from '../components/Button';
import './CTABanner.css';

export const CTABanner: React.FC = () => {
  return (
    <section className="cta-banner section" aria-labelledby="cta-heading">
      <div className="cta-banner__bg" aria-hidden="true" />
      <div className="container cta-banner__container">
        <h2 id="cta-heading" className="cta-banner__title">
          Govern your AI with confidence
        </h2>
        <p className="cta-banner__subtitle">
          Deploy governance across your AI systems today with ThndrAI.
        </p>
        <div className="cta-banner__action">
          <Button variant="primary" size="lg" ariaLabel="Book a demo">
            Book a Demo <span className="btn__arrow" aria-hidden="true">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
};
