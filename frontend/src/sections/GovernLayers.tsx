import React, { useState } from 'react';
import { SectionHeader } from '../components/SectionHeader';
import './GovernLayers.css';

const layers = [
  {
    id: 'data',
    label: 'Data Governance',
    title: 'Data Governance',
    subtitle: 'Build AI on trusted, compliant data.',
    description: 'Ensure visibility, control, and accountability from data ingestion to model input.',
    features: [
      'Data sourcing, ownership, and cataloging',
      'Privacy-preserving transformations and lineage',
      'Automated compliance checks and audits',
      'Access control and consent management',
    ],
  },
  {
    id: 'model',
    label: 'AI Model Governance',
    title: 'AI Model Governance',
    subtitle: 'Govern models throughout their lifecycle.',
    description: 'Track, validate, and control AI models from development to deployment.',
    features: [
      'Model registry and version control',
      'Bias detection and fairness monitoring',
      'Performance tracking and drift detection',
      'Model documentation and explainability',
    ],
  },
  {
    id: 'deployment',
    label: 'Deployment Governance',
    title: 'Deployment Governance',
    subtitle: 'Control what gets deployed and where.',
    description: 'Automate deployment policies and enforce governance gates.',
    features: [
      'Deployment approval workflows',
      'Environment-specific policies',
      'Rollback and incident management',
      'Continuous monitoring in production',
    ],
  },
  {
    id: 'agent',
    label: 'Agent Governance',
    title: 'Agent Governance',
    subtitle: 'Govern autonomous AI agents at scale.',
    description: 'Monitor and control AI agents, their actions, and permissions.',
    features: [
      'Agent behavior monitoring',
      'Permission and scope management',
      'Action logging and audit trails',
      'Safety guardrails and constraints',
    ],
  },
];

export const GovernLayers: React.FC = () => {
  const [activeTab, setActiveTab] = useState('data');
  const activeLayer = layers.find((l) => l.id === activeTab)!;

  return (
    <section className="govern-layers section" aria-labelledby="govern-heading">
      <div className="container">
        <SectionHeader
          title="Govern Every Layer of Your AI Stack"
          subtitle="From data to models to deployment and autonomous systems, Thndr AI provides end-to-end governance across your entire AI lifecycle."
        />
        <div className="govern-layers__content">
          <nav className="govern-layers__tabs" aria-label="Governance layers">
            {layers.map((layer) => (
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
