import React, { useState } from 'react';
import { SectionHeader } from '../../components/SectionHeader';
import { useCmsContent } from '../../hooks/useCmsContent';
import { cmsDefaults } from '../../cms/managedSections';
import type { GovernLayersContent } from '../../types';
import './GovernLayers.css';

export const GovernLayers: React.FC = () => {
  const content = useCmsContent<GovernLayersContent>('governLayers', cmsDefaults.governLayers);
  const [activeTab, setActiveTab] = useState('data');
  const activeLayer = content.layers.find((l) => l.id === activeTab) ?? content.layers[0];

  if (!activeLayer) {
    return null;
  }

  return (
    <section className="govern-layers section" aria-labelledby="govern-heading">
      <div className="container">
        <SectionHeader
          title={content.title}
          subtitle={content.subtitle}
        />
        <div className="govern-layers__content">
          <nav className="govern-layers__tabs" aria-label="Governance layers">
            {content.layers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => setActiveTab(layer.id)}
                className={`govern-layers__tab ${activeTab === layer.id ? 'is-active' : ''}`}
                role="tab"
                aria-selected={activeTab === layer.id}
                aria-controls={`panel-${layer.id}`}
              >
                {layer.label}
              </button>
            ))}
          </nav>

          <div className="govern-layers__panel-area">
            <div className="govern-layers__visual">
              <div className="govern-layers__visual-placeholder">
                <div className="govern-layers__visual-grid">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="govern-layers__visual-item" />
                  ))}
                </div>
              </div>
            </div>

            <div
              className="govern-layers__panel"
              id={`panel-${activeLayer.id}`}
              role="tabpanel"
            >
              <div className="govern-layers__panel-icon" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-cyan)" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 3v18M3 9h18" />
                </svg>
              </div>
              <h3 className="govern-layers__panel-title">{activeLayer.title}</h3>
              <p className="govern-layers__panel-subtitle">{activeLayer.subtitle}</p>
              <p className="govern-layers__panel-desc">{activeLayer.description}</p>
              <ul className="govern-layers__panel-features">
                {activeLayer.features.map((f) => (
                  <li key={f}>
                    <span className="govern-layers__bullet" aria-hidden="true">•</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
