import React from 'react';
import { Button } from '../../components/Button';
import { useDemoRequest } from '../../hooks/useDemoRequest';
import { useState } from 'react';
import './CTABanner.css';

export const CTABanner: React.FC = () => {
  const { submit, loading, success, error, reset } = useDemoRequest();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    reset();
    await submit({ name, email, company, message });
  };

  return (
    <section className="cta-banner section" id="demo-request" aria-labelledby="cta-heading">
      <div className="cta-banner__bg" aria-hidden="true" />
      <div className="container cta-banner__container">
        <h2 id="cta-heading" className="cta-banner__title">
          Govern your AI with confidence
        </h2>
        <p className="cta-banner__subtitle">
          Deploy governance across your AI systems today with ThndrAI.
        </p>
        <form className="cta-banner__form" onSubmit={handleSubmit}>
          <input
            className="cta-banner__input"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
          <input
            className="cta-banner__input"
            type="email"
            placeholder="Work email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            className="cta-banner__input"
            type="text"
            placeholder="Company"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
            required
          />
          <textarea
            className="cta-banner__textarea"
            placeholder="What are you trying to govern?"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <div className="cta-banner__action">
            <Button variant="primary" size="lg" ariaLabel="Submit demo request" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Book a Demo'} <span className="btn__arrow" aria-hidden="true">→</span>
            </Button>
          </div>
          {success && <p className="cta-banner__status cta-banner__status--success">Demo request sent successfully.</p>}
          {error && <p className="cta-banner__status cta-banner__status--error">{error}</p>}
        </form>
      </div>
    </section>
  );
};
