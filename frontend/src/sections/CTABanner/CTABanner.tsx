import React from 'react';
import { Button } from '../../components/Button';
import './CTABanner.css';

interface CTABannerProps {
  onBookDemo: () => void;
}

export const CTABanner: React.FC<CTABannerProps> = ({ onBookDemo }) => {

  return (
    <section className="cta-banner section" aria-labelledby="cta-heading">
      <div className="cta-banner__bg" aria-hidden="true" />
      <div className="container cta-banner__container">
        <div className="cta-banner__panel" id="demo-request">
          <h2 id="cta-heading" className="cta-banner__title">
            Govern your AI with confidence
          </h2>
          <p className="cta-banner__subtitle">
            Deploy governance across your AI systems today with ThndrAI.
          </p>
          <div className="cta-banner__action">
            <Button variant="primary" size="lg" ariaLabel="Book a demo" onClick={onBookDemo}>
              Book a Demo <span className="btn__arrow" aria-hidden="true">→</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
