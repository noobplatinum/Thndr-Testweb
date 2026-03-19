
import React from "react";
import type { IconType } from "react-icons";
import { LuWrench, LuLayoutGrid, LuRefreshCw, LuUsers, LuTrendingUp, LuShieldCheck } from "react-icons/lu";
import { SectionHeader } from "../../components/SectionHeader";
import "./PainPoints.css";
import { useCmsContent } from "../../hooks/useCmsContent";
import { cmsDefaults } from "../../cms/managedSections";
import type { PainPoint } from "../../types";

const painPointIconMap: Record<string, IconType> = {
  ML: LuWrench,
  SC: LuLayoutGrid,
  LC: LuRefreshCw,
  TS: LuUsers,
  RA: LuTrendingUp,
  CG: LuShieldCheck,
};

export const PainPoints: React.FC = () => {
  const painPoints = useCmsContent<PainPoint[]>("painPoints", cmsDefaults.painPoints);

  return (
    <section className="pain-points" id="pain-points">
      <div className="container">
        <SectionHeader 
          title="AI is scaling fast. Governance isn't."
          subtitle="Six structural challenges preventing safe, scalable AI."
        />

        <div className="pain-points__grid">
          {painPoints.map((point, index) => {
            const Icon = painPointIconMap[point.icon] ?? LuWrench;

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
