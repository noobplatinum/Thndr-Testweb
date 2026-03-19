
import React from "react";
import type { IconType } from "react-icons";
import { FiActivity, FiAlertTriangle, FiFileText } from "react-icons/fi";
import { SectionHeader } from "../../components/SectionHeader";
import "./PainPoints.css";
import { useCmsContent } from "../../hooks/useCmsContent";
import { cmsDefaults } from "../../cms/managedSections";
import type { PainPoint } from "../../types";

const painPointIconMap: Record<string, IconType> = {
  ML: FiActivity,
  AU: FiFileText,
  RG: FiAlertTriangle,
};

export const PainPoints: React.FC = () => {
  const painPoints = useCmsContent<PainPoint[]>("painPoints", cmsDefaults.painPoints);

  return (
    <section className="pain-points" id="pain-points">
      <div className="container">
        <SectionHeader 
          title="The fragmentation problem"
          subtitle="Why AI governance is failing in the enterprise"
        />

        <div className="pain-points__grid">
          {painPoints.map((point, index) => {
            const Icon = painPointIconMap[point.icon] ?? FiActivity;

            return (
            <div key={index} className="pain-points__card">
              <div
                className="pain-points__icon"
                style={{ backgroundColor: point.color + "15", color: point.color }}
              >
                <Icon aria-hidden="true" />
              </div>
              <h3 className="pain-points__title">{point.title}</h3>
              <p className="pain-points__description">{point.description}</p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

