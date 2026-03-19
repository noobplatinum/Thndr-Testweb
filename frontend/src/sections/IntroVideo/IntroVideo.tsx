import React from 'react';
import { SectionHeader } from '../../components/SectionHeader';
import { useCmsContent } from '../../hooks/useCmsContent';
import { cmsDefaults } from '../../cms/managedSections';
import type { IntroVideoContent } from '../../types';
import './IntroVideo.css';

export const IntroVideo: React.FC = () => {
  const content = useCmsContent<IntroVideoContent>('introVideo', cmsDefaults.introVideo);

  return (
    <section className="intro-video section" aria-labelledby="intro-heading">
      <div className="container">
        <div className="intro-video__header">
          <SectionHeader
            label={content.label}
            title={content.title}
            subtitle={content.subtitle}
            align="center"
          />
        </div>

        <div className="intro-video__player">
          {content.videoUrl ? (
            <video className="intro-video__thumbnail" controls playsInline preload="metadata" src={content.videoUrl}>
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="intro-video__thumbnail">
              <div className="intro-video__overlay">
                <button
                  className="intro-video__play-btn"
                  aria-label="Watch how Thndr AI works"
                  disabled
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <p className="intro-video__play-text">{content.fallbackText}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
