import React, { useState } from 'react';
import type { IconType } from 'react-icons';
import { LuDatabase, LuCpu, LuLayers, LuGitBranch } from 'react-icons/lu';
import { SectionHeader } from '../../components/SectionHeader';
import { useCmsContent } from '../../hooks/useCmsContent';
import { cmsDefaults } from '../../cms/managedSections';
import type { GovernLayersContent } from '../../types';
import './GovernLayers.css';

const layerIconMap: Record<string, IconType> = {
  data: LuDatabase,
  model: LuCpu,
  deployment: LuLayers,
  agent: LuGitBranch,
};

const layerImages: Record<string, string> = {
  data: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
  model: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80',
  deployment: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80',
  agent: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80',
};

export const GovernLayers: React.FC = () => {
  const content = useCmsContent<GovernLayersContent>('governLayers', cmsDefaults.governLayers);
  const [activeTab, setActiveTab] = useState('data');
  const activeLayer = content.layers.find((l) => l.id === activeTab) ?? content.layers[0];
  const ActiveLayerIcon = layerIconMap[activeLayer?.id ?? 'data'] ?? LuDatabase;

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
        <div className="govern-layers__layout">
          {/* Left: Tabs */}
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

          {/* Center: Image with icon overlay */}
          <div className="govern-layers__visual">
            <div className="govern-layers__visual-frame">
              <img
                src={layerImages[activeLayer.id]}
                alt={activeLayer.title}
                className="govern-layers__visual-img"
              />
              <div className="govern-layers__visual-icon-overlay">
                <ActiveLayerIcon className="govern-layers__visual-icon-glyph" />
              </div>
            </div>
          </div>

          {/* Right: Panel details */}
          <div
            className="govern-layers__panel"
            id={`panel-${activeLayer.id}`}
            role="tabpanel"
          >
            <div className="govern-layers__panel-icon" aria-hidden="true">
              <ActiveLayerIcon className="govern-layers__panel-icon-glyph" />
            </div>
            <h3 className="govern-layers__panel-title">{activeLayer.title}</h3>
            <p className="govern-layers__panel-subtitle">{activeLayer.subtitle}</p>
            <p className="govern-layers__panel-desc">{activeLayer.description}</p>
            <ul className="govern-layers__panel-features">
              {activeLayer.features.map((f) => (
                <li key={f}>
                  <span className="govern-layers__bullet" aria-hidden="true">--</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
