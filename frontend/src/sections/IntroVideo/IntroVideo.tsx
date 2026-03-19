import React from 'react';
import { SectionHeader } from '../../components/SectionHeader';
import './IntroVideo.css';

export const IntroVideo: React.FC = () => {
  return (
    <section className="intro-video section" aria-labelledby="intro-heading">
      <div className="container">
        <div className="intro-video__header">
          <SectionHeader
            label="INTRODUCING THNDR AI"
            title="A Unified Approach to AI Governance"
            subtitle="Thndr AI connects your existing AI infrastructure and automates governance across models, agents, and environments."
            align="center"
            highlightColor="purple-cyan"
          />
        </div>

        <div className="intro-video__player">
          <iframe
            className="intro-video__iframe"
            src="https://www.youtube.com/embed/ipTXmBa8-Zc?autoplay=1&mute=1&loop=1&playlist=ipTXmBa8-Zc&controls=0&showinfo=0&rel=0"
            title="Watch How Thndr AI Works"
            allow="autoplay; encrypted-media"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};
