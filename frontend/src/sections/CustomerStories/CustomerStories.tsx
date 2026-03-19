import React from 'react';
import { SectionHeader } from '../../components/SectionHeader';
import { useCustomerStories } from '../../hooks/useCustomerStories';
import './CustomerStories.css';

const customerImages = ['/Customers/c1.jpg', '/Customers/c2.jpg', '/Customers/c3.jpg', '/Customers/c4.jpg'];

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
            {stories.map((story: any, index: number) => (
              <article key={story.id} className="customer-stories__card">
                <div className="customer-stories__img-wrapper">
                  <img
                    className="customer-stories__img"
                    src={story.imageUrl || customerImages[index % customerImages.length]}
                    alt={`${story.authorName} from ${story.company}`}
                    loading="lazy"
                  />
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
