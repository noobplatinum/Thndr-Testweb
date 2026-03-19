import React from 'react';
import './ComparisonTable.css';
import { useCmsContent } from '../../hooks/useCmsContent';
import { cmsDefaults } from '../../cms/managedSections';
import type { ComparisonTableContent } from '../../types';

export const ComparisonTable: React.FC = () => {
  const { ourFeatures, legacyFeatures, rows } = useCmsContent<ComparisonTableContent>(
    "comparisonTable",
    cmsDefaults.comparisonTable
  );

  return (
    <section className="comparison" id="comparison">
      <div className="container">
        <div className="comparison__header">
          <h2 className="comparison__title">Why Modern Enterprises Choose Thndr</h2>
          <p className="comparison__subtitle">Moving beyond spreadsheet-based governance</p>
        </div>

        <div className="comparison__table-wrapper">
          <table className="comparison__table" aria-label="Feature comparison">
            <thead>
              <tr>
                <th scope="col" className="comparison__table-th comparison__table-th--feature">Features</th>
                <th scope="col" className="comparison__table-th comparison__table-th--us">Thndr AI</th>
                <th scope="col" className="comparison__table-th comparison__table-th--them">Legacy Tools</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="comparison__table-tr">
                  <td className="comparison__table-td comparison__table-td--feature">{row.feature}</td>
                  <td className="comparison__table-td comparison__table-td--us">
                    {row.us ? (
                      <span className="comparison__check" aria-label="Included">Yes</span>
                    ) : (
                      <span className="comparison__dash" aria-label="Not included">No</span>
                    )}
                  </td>
                  <td className="comparison__table-td comparison__table-td--them">
                    {row.them ? (
                      <span className="comparison__check comparison__check--dim" aria-label="Included">Yes</span>
                    ) : (
                      <span className="comparison__dash" aria-label="Not included">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="comparison__lists">
          <div className="comparison__list-card comparison__list-card--us">
            <h3 className="comparison__list-title">The Thndr Approach</h3>
            <ul className="comparison__list">
              {ourFeatures.map((feat: string, i: number) => (
                <li key={i}>{feat}</li>
              ))}
            </ul>
          </div>
          <div className="comparison__list-card comparison__list-card--them">
            <h3 className="comparison__list-title">The Alternative</h3>
            <ul className="comparison__list">
              {legacyFeatures.map((feat: string, i: number) => (
                <li key={i}>{feat}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
