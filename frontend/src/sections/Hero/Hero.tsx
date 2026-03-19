import React from 'react';
import { Button } from '../../components/Button';
import './Hero.css';

interface HeroProps {
  onBookDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookDemo }) => {

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero__bg-glow" aria-hidden="true" />
      <div className="container hero__container">
        <h1 id="hero-heading" className="hero__title animate-fade-in-up">
          <span className="text-gradient">Automated AI governance.</span>
          <br />
          End-to-end.
        </h1>
        <p className="hero__subtitle animate-fade-in-up animate-delay-200">
          Fast. Flexible. Trusted. Built for regulated AI organizations
        </p>
        <div className="hero__cta animate-fade-in-up animate-delay-300">
          <Button variant="primary" size="lg" ariaLabel="Book a demo" onClick={onBookDemo}>
            Book a Demo <span className="btn__arrow" aria-hidden="true">→</span>
          </Button>
        </div>
      </div>
    </section>
  );
};
