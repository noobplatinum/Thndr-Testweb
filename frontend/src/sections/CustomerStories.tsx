import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { useCustomerStories } from '../hooks/useCustomerStories';
import './CustomerStories.css';

export const CustomerStories: React.FC = () => {
  const { stories, loading } = useCustomerStories();

  return (
    <section className="customer-stories section" aria-labelledby="stories-heading">
      <div className="container">
        <SectionHeader
          title="Customer Stories"
          subtitle="How organizations use Thndr AI to govern with clarity and control."
        />
        {loading ? (
          <div className="customer-stories__loading" role="status">
            <p>Loading stories...</p>
          </div>
        ) : (
          <div className="customer-stories__grid">
            {stories.map((story) => (
              <article key={story.id} className="customer-stories__card">
                <div className="customer-stories__img-wrapper">
                  <div className="customer-stories__img-placeholder" aria-hidden="true">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1">
                      <rect x="2" y="2" width="20" height="20" rx="4" />
                      <circle cx="12" cy="10" r="3" />
                      <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                    </svg>
                  </div>
                </div>
                <blockquote className="customer-stories__quote">
                  "{story.quote}"
                </blockquote>
                <div className="customer-stories__author">
                  <p className="customer-stories__name">{story.authorName}</p>
                  <p className="customer-stories__company">{story.company}</p>
                </div>
                {story.metricLabel && (
                  <div className="customer-stories__metric">
                    <span>{story.metricLabel}</span>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
