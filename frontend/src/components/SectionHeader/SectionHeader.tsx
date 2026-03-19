import React from 'react';

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  titleHighlight?: string;
  highlightColor?: 'cyan' | 'purple' | 'gradient' | 'purple-cyan';
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  subtitle,
  align = 'left',
  titleHighlight,
  highlightColor = 'cyan',
}) => {
  const renderTitle = () => {
    if (!titleHighlight) return title;

    const parts = title.split(titleHighlight);
    const highlightClass =
      highlightColor === 'gradient'
        ? 'text-gradient'
        : highlightColor === 'purple'
          ? 'text-purple'
          : 'text-cyan';

    return (
      <>
        {parts[0]}
        <span className={highlightClass}>{titleHighlight}</span>
        {parts[1] || ''}
      </>
    );
  };

  return (
    <div
      className="section-header"
      style={{ textAlign: align, marginBottom: 'var(--space-12)' }}
    >
      {label && (
        <p
          className={highlightColor === 'purple-cyan' ? 'text-purple-cyan' : ''}
          style={{
            color: highlightColor === 'purple-cyan' ? undefined : 'var(--color-accent-cyan)',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 'var(--space-4)',
          }}
        >
          {label}
        </p>
      )}
      <h2
        style={{
          fontSize: 'var(--font-size-4xl)',
          fontWeight: 800,
          lineHeight: 1.2,
          marginBottom: subtitle ? 'var(--space-4)' : 0,
        }}
      >
        {renderTitle()}
      </h2>
      {subtitle && (
        <p
          style={{
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--font-size-lg)',
            maxWidth: align === 'center' ? '600px' : 'none',
            margin: align === 'center' ? '0 auto' : undefined,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
