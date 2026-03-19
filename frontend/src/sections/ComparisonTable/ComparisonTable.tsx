import React from 'react';
import { LuCheck, LuX } from 'react-icons/lu';
import './ComparisonTable.css';

interface ComparisonRow {
  feature: string;
  thndr: string;
  vendorLocked: boolean;
}

const ROWS: ComparisonRow[] = [
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
    <section className="comparison" id="comparison">
      <div className="container">
        <div className="comparison__header">
          <h2 className="comparison__title">
            The Platform built for <span className="text-gradient">real-world AI operations</span>
          </h2>
          <p className="comparison__subtitle">
            Unlike fragmented governance tools, Thndr gives every stakeholder full visibility, automated compliance, and
            scalable governance without being locked into a single vendor ecosystem.
          </p>
        </div>

        <div className="comparison__table-wrapper">
          <table className="comparison__table" aria-label="Feature comparison">
            <thead>
              <tr>
                <th scope="col" className="comparison__table-th comparison__table-th--feature">Feature</th>
                <th scope="col" className="comparison__table-th comparison__table-th--us">Thndr AI</th>
                <th scope="col" className="comparison__table-th comparison__table-th--them">Vendor-locked</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, index) => (
                <tr key={index} className="comparison__table-tr">
                  <td className="comparison__table-td comparison__table-td--feature">{row.feature}</td>
                  <td className="comparison__table-td comparison__table-td--us">
                    <div className="comparison__cell-content">
                      <span className="comparison__check-icon"><LuCheck /></span>
                      <span className="comparison__cell-text">{row.thndr}</span>
                    </div>
                  </td>
                  <td className="comparison__table-td comparison__table-td--them">
                    {row.vendorLocked ? (
                      <span className="comparison__check-icon comparison__check-icon--dim"><LuCheck /></span>
                    ) : (
                      <span className="comparison__x-icon"><LuX /></span>
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
