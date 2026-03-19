import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import './ComparisonTable.css';

const features = [
  {
    feature: 'End-to-End Governance',
    thndr: 'Oversight across data, models, deployment, and agents in one unified system.',
    vendorLocked: false,
  },
  {
    feature: 'Multi-vendor Support',
    thndr: 'Works across different AI tools, cloud providers, and model vendors.',
    vendorLocked: false,
  },
  {
    feature: 'Automated Compliance',
    thndr: 'Built-in policy enforcement, reporting, and audit documentation.',
    vendorLocked: true,
  },
  {
    feature: 'Real-time Monitoring',
    thndr: 'Continuous tracking of performance, risk, drift, and incidents in production.',
    vendorLocked: true,
  },
  {
    feature: 'Agent Governance',
    thndr: 'Controls and monitors autonomous agents, workflows, and permissions.',
    vendorLocked: false,
  },
];

export const ComparisonTable: React.FC = () => {
  return (
    <section className="comparison section section--dark" aria-labelledby="comparison-heading">
      <div className="container">
        <SectionHeader
          title="The Platform built for real-world AI operations"
          subtitle="Unlike fragmented governance tools, Thndr AI gives every stakeholder full visibility, automated compliance, and scalable governance without being locked into a single vendor ecosystem."
          align="center"
        />
        <div className="comparison__table-wrapper">
          <table className="comparison__table" role="table">
            <thead>
              <tr>
                <th scope="col" className="comparison__th">Feature</th>
                <th scope="col" className="comparison__th comparison__th--thndr">
                  <span className="comparison__brand">Thndr AI</span>
                </th>
                <th scope="col" className="comparison__th">Vendor-locked</th>
              </tr>
            </thead>
            <tbody>
              {features.map((row) => (
                <tr key={row.feature} className="comparison__row">
                  <td className="comparison__td comparison__feature-name">{row.feature}</td>
                  <td className="comparison__td comparison__td--thndr">
                    <span className="comparison__check" aria-label="Supported">✓</span>
                    <span className="comparison__detail">{row.thndr}</span>
                  </td>
                  <td className="comparison__td comparison__td--vendor">
                    {row.vendorLocked ? (
                      <span className="comparison__check" aria-label="Supported">✓</span>
                    ) : (
                      <span className="comparison__cross" aria-label="Not supported">✕</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
