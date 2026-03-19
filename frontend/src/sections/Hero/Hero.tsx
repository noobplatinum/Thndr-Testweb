import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '../../components/Button';
import './Hero.css';

interface HeroProps {
  onBookDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookDemo }) => {
  const [showLogo, setShowLogo] = useState(false);
  const [textBlurred, setTextBlurred] = useState(false);

  const runCycle = useCallback(() => {
    // Step 1: blur out the text
    setTextBlurred(true);

    // Step 2: after blur completes (500ms), show logo
    setTimeout(() => {
      setShowLogo(true);
    }, 500);

    // Step 3: after 1s of logo display, start hiding logo
    setTimeout(() => {
      setShowLogo(false);
    }, 1500);

    // Step 4: after logo fades (400ms), un-blur text
    setTimeout(() => {
      setTextBlurred(false);
    }, 1900);
  }, []);

  useEffect(() => {
    const interval = setInterval(runCycle, 5000);
    return () => clearInterval(interval);
  }, [runCycle]);

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="container hero__container">
        <div className="hero__title-wrapper animate-fade-in-up">
          <h1
            id="hero-heading"
            className={`hero__title ${textBlurred ? 'hero__title--blurred' : ''}`}
          >
            <span className="text-gradient">Automated AI governance.</span>
            <br />
            End-to-end.
          </h1>
          <img
            src="/thndr-logo.png"
            alt="Thndr AI"
            className={`hero__logo-flash ${showLogo ? 'hero__logo-flash--visible' : ''}`}
          />
        </div>
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
