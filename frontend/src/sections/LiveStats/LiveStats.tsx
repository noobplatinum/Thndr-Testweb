import React, { useEffect, useState, useRef, useCallback } from 'react';
import { LuRocket, LuBrain, LuDatabase } from 'react-icons/lu';
import type { IconType } from 'react-icons';
import { useStats } from '../../hooks/useStats';
import './LiveStats.css';

const iconMap: Record<string, { Icon: IconType; color: string }> = {
  uptime: { Icon: LuRocket, color: '#3b82f6' },
  predictions: { Icon: LuBrain, color: '#06b6d4' },
  audit: { Icon: LuDatabase, color: '#f97316' },
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
  const mapping = icon ? iconMap[icon] ?? iconMap.uptime : iconMap.uptime;
  const { Icon, color } = mapping;

  return (
    <div className="live-stats__item">
      <div className="live-stats__icon-container" style={{ '--icon-color': color } as React.CSSProperties}>
        <Icon className="live-stats__icon-glyph" />
      </div>
      <div className="live-stats__value" style={{ color }}>{displayValue}</div>
      <div className="live-stats__label">{label}</div>
    </div>
  );
};

/* Sophisticated graph with grids, multiple curves, data points, and hover spotlight */
const InteractiveGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [spotlight, setSpotlight] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 600;
    const y = ((e.clientY - rect.top) / rect.height) * 250;
    setSpotlight({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSpotlight(null);
  }, []);

  // Grid lines
  const hLines = [50, 100, 150, 200];
  const vLines = [100, 200, 300, 400, 500];

  // Main curve (teal)
  const mainPath = "M0 210 Q30 200 60 195 T120 180 T180 155 T240 130 T300 105 T360 80 T420 60 T480 42 T540 28 T600 15";
  const mainFillPath = mainPath + " V250 H0 Z";

  // Secondary curve (blue)
  const secondPath = "M0 220 Q40 215 80 210 T160 195 T240 175 T320 155 T400 140 T480 120 T560 105 T600 90";
  const secondFillPath = secondPath + " V250 H0 Z";

  // Data points on main curve
  const dataPoints = [
    { x: 0, y: 210 }, { x: 60, y: 195 }, { x: 120, y: 180 },
    { x: 180, y: 155 }, { x: 240, y: 130 }, { x: 300, y: 105 },
    { x: 360, y: 80 }, { x: 420, y: 60 }, { x: 480, y: 42 },
    { x: 540, y: 28 }, { x: 600, y: 15 },
  ];

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 250"
      className="live-stats__chart"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <defs>
        <linearGradient id="mainGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0, 212, 170, 0.25)" />
          <stop offset="100%" stopColor="rgba(0, 212, 170, 0)" />
        </linearGradient>
        <linearGradient id="secondGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.12)" />
          <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
        </linearGradient>
        <radialGradient id="spotlightGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(0, 212, 170, 0.15)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="mainStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00d4aa" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {hLines.map((y) => (
        <line key={`h-${y}`} x1="0" y1={y} x2="600" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 6" />
      ))}
      {vLines.map((x) => (
        <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="250" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 6" />
      ))}

      {/* Fills */}
      <path d={secondFillPath} fill="url(#secondGradient)" />
      <path d={mainFillPath} fill="url(#mainGradient)" />

      {/* Curves */}
      <path d={secondPath} stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1.5" fill="none" />
      <path d={mainPath} stroke="url(#mainStroke)" strokeWidth="2.5" fill="none" />

      {/* Data points */}
      {dataPoints.map((pt, i) => (
        <g key={i}>
          <circle cx={pt.x} cy={pt.y} r="5" fill="rgba(0, 212, 170, 0.15)" />
          <circle cx={pt.x} cy={pt.y} r="2.5" fill="#00d4aa" />
        </g>
      ))}

      {/* Hover spotlight */}
      {spotlight && (
        <>
          <circle cx={spotlight.x} cy={spotlight.y} r="80" fill="url(#spotlightGrad)" opacity="0.8" />
          <line x1={spotlight.x} y1="0" x2={spotlight.x} y2="250" stroke="rgba(0, 212, 170, 0.15)" strokeWidth="1" strokeDasharray="3 4" />
        </>
      )}
    </svg>
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
          AI governance, <span className="text-orange">live in production.</span>
        </h2>
        <p className="live-stats__subtitle">
          Helping organizations automate governance and manage AI risk at scale.
        </p>
        <div className="live-stats__graph" aria-hidden="true">
          <InteractiveGraph />
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
