import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
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
          />
        </div>

        <div className="intro-video__player">
          <div className="intro-video__thumbnail">
            <div className="intro-video__overlay">
              <button
                className="intro-video__play-btn"
                aria-label="Watch how Thndr AI works"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <p className="intro-video__play-text">Watch How ThndrAI Works</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
