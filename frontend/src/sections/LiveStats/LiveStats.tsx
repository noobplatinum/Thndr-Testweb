import React, { useEffect, useState, useRef } from 'react';
import { useStats } from '../../hooks/useStats';
import './LiveStats.css';

const iconMap: Record<string, string> = {
  uptime: '📊',
  predictions: '🔮',
  audit: '📋',
};

function useCountUp(target: string, shouldAnimate: boolean): string {
  const [display, setDisplay] = useState(target);

  useEffect(() => {
    if (!shouldAnimate) return;

    const numMatch = target.match(/(\d+\.?\d*)/);
    if (!numMatch) {
      setDisplay(target);
      return;
    }

    const num = parseFloat(numMatch[1]);
    const suffix = target.replace(numMatch[1], '');
    const duration = 2000;
    const steps = 60;
    const increment = num / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, num);
      const formatted = num % 1 !== 0 ? current.toFixed(1) : Math.floor(current).toString();
      setDisplay(formatted + suffix);

      if (step >= steps) {
        setDisplay(target);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [target, shouldAnimate]);

  return display;
}

const StatItem: React.FC<{ value: string; label: string; icon: string | null; animate: boolean }> = ({
  value, label, icon, animate,
}) => {
  const displayValue = useCountUp(value, animate);

  return (
    <div className="live-stats__item">
      <div className="live-stats__icon" aria-hidden="true">
        {icon ? iconMap[icon] || '📊' : '📊'}
      </div>
      <div className="live-stats__value">{displayValue}</div>
      <div className="live-stats__label">{label}</div>
    </div>
  );
};

export const LiveStats: React.FC = () => {
  const { stats } = useStats();
  const [animate, setAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="live-stats section" aria-labelledby="live-stats-heading" ref={ref}>
      <div className="live-stats__bg" aria-hidden="true" />
      <div className="container live-stats__container">
        <h2 id="live-stats-heading" className="live-stats__heading">
          AI governance, <span className="text-cyan">live in production.</span>
        </h2>
        <p className="live-stats__subtitle">
          Helping organizations automate governance and manage AI risk at scale.
        </p>
        <div className="live-stats__graph" aria-hidden="true">
          <svg viewBox="0 0 600 200" className="live-stats__chart">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(0, 212, 170, 0.3)" />
                <stop offset="100%" stopColor="rgba(0, 212, 170, 0)" />
              </linearGradient>
            </defs>
            <path
              d="M0 180 Q50 170 100 160 T200 120 T300 90 T400 60 T500 40 T600 20"
              stroke="var(--color-accent-cyan)"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M0 180 Q50 170 100 160 T200 120 T300 90 T400 60 T500 40 T600 20 V200 H0 Z"
              fill="url(#chartGradient)"
            />
          </svg>
        </div>
        <div className="live-stats__grid">
          {stats.map((stat: any) => (
            <StatItem
              key={stat.id}
              value={stat.value}
              label={stat.label}
              icon={stat.icon}
              animate={animate}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
