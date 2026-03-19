import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import './PainPoints.css';

const painPoints = [
  {
    icon: '🔌',
    title: 'Disconnected ML Tools',
    description: 'Too many vendors, no seamless integration.',
    color: '#f97316',
  },
  {
    icon: '🔀',
    title: 'Scattered Systems',
    description: 'Data, models, and infrastructure are fragmented.',
    color: '#00d4aa',
  },
  {
    icon: '🔄',
    title: 'Complex AI Lifecycle',
    description: 'Manual workflows slow delivery and scaling.',
    color: '#a855f7',
  },
  {
    icon: '👥',
    title: 'Team Silos',
    description: 'Teams operate without shared visibility.',
    color: '#ef4444',
  },
  {
    icon: '📈',
    title: 'Rising Accountability',
    description: 'Regulations demand control and explainability.',
    color: '#3b82f6',
  },
  {
    icon: '🏛️',
    title: 'Customer Governance Requirements',
    description: 'Trust requires transparency and proof.',
    color: '#eab308',
  },
];

export const PainPoints: React.FC = () => {
  return (
    <section className="pain-points section" aria-labelledby="pain-points-heading">
      <div className="container">
        <SectionHeader
          title="AI is scaling fast. Governance isn't."
          subtitle="Six structural challenges preventing safe, scalable AI."
        />
        <div className="pain-points__grid">
          {painPoints.map((point, index) => (
            <div
              key={point.title}
              className={`pain-points__card animate-fade-in-up animate-delay-${(index + 1) * 100}`}
              style={{ '--card-accent': point.color } as React.CSSProperties}
            >
              <div className="pain-points__card-header">
                <span className="pain-points__icon" aria-hidden="true" style={{ background: `${point.color}20` }}>
                  {point.icon}
                </span>
                <h3 className="pain-points__card-title">{point.title}</h3>
              </div>
              <p className="pain-points__card-desc">{point.description}</p>
            </div>
          ))}
        </div>
        <p className="pain-points__footer">
          We understand the frustration, with over 15 years of experience, we help teams deliver AI products
        </p>
      </div>
    </section>
  );
};
