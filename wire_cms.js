const fs = require("fs");
const path = require("path");

const hooksDir = path.join(__dirname, "frontend/src/hooks");
if (!fs.existsSync(hooksDir)) fs.mkdirSync(hooksDir, { recursive: true });

// 1. Create a generic hook to fetch content and auto-seed if it doesnt exist
fs.writeFileSync(path.join(hooksDir, "useCmsContent.ts"), `
import { useState, useEffect } from "react";

export function useCmsContent<T>(section: string, defaultData: T): T {
  const [data, setData] = useState<T>(defaultData);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/content");
        const json = await res.json();
        const sectionData = json.data?.find((item: any) => item.section === section);
        
        if (sectionData && sectionData.data) {
          setData(JSON.parse(sectionData.data));
        } else {
          // Auto-seed default data to DB if missing
          await fetch("http://localhost:3001/api/content", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": "Bearer supersecretadmin" },
            body: JSON.stringify({ section, data: defaultData })
          });
        }
      } catch (err) {
        console.error("Failed to fetch CMS content", err);
      }
    };
    fetchContent();
  }, [section]);

  return data;
}
`);

// 2. Wire up PainPoints
const painPointsPath = path.join(__dirname, "frontend/src/sections/PainPoints/PainPoints.tsx");
if (fs.existsSync(painPointsPath)) {
  let code = fs.readFileSync(painPointsPath, "utf-8");
  
  if (!code.includes("useCmsContent")) {
    code = code.replace(`export const PainPoints: React.FC = () => {`, `import { useCmsContent } from "../../hooks/useCmsContent";\n\nexport const PainPoints: React.FC = () => {`);
    
    // Replace the static array with hook
    const arrayStart = code.indexOf(`const painPoints = [`);
    const arrayEndMarker = `  ];`;
    const arrayEnd = code.indexOf(arrayEndMarker, arrayStart) + arrayEndMarker.length;
    
    const staticArray = code.substring(arrayStart, arrayEnd);
    const replacement = staticArray.replace("const painPoints =", `const painPoints = useCmsContent("painPoints",`);
    code = code.substring(0, arrayStart) + replacement + ")" + code.substring(arrayEnd);
    
    fs.writeFileSync(painPointsPath, code);
  }
}

// 3. Wire up Services
const servicesPath = path.join(__dirname, "frontend/src/sections/Services/Services.tsx");
if (fs.existsSync(servicesPath)) {
  let code = fs.readFileSync(servicesPath, "utf-8");
  
  if (!code.includes("useCmsContent")) {
    code = code.replace(`export const Services: React.FC = () => {`, `import { useCmsContent } from "../../hooks/useCmsContent";\n\nexport const Services: React.FC = () => {`);
    
    const arrayStart = code.indexOf(`const services = [`);
    const arrayEndMarker = `  ];`;
    const arrayEnd = code.indexOf(arrayEndMarker, arrayStart) + arrayEndMarker.length;
    
    const staticArray = code.substring(arrayStart, arrayEnd);
    const replacement = staticArray.replace("const services =", `const services = useCmsContent("services",`);
    code = code.substring(0, arrayStart) + replacement + ")" + code.substring(arrayEnd);
    
    fs.writeFileSync(servicesPath, code);
  }
}

// 4. Wire up ComparisonTable
const tablePath = path.join(__dirname, "frontend/src/sections/ComparisonTable/ComparisonTable.tsx");
if (fs.existsSync(tablePath)) {
  let code = fs.readFileSync(tablePath, "utf-8");
  
  if (!code.includes("useCmsContent")) {
    code = code.replace(`export const ComparisonTable: React.FC = () => {`, `import { useCmsContent } from "../../hooks/useCmsContent";\n\nexport const ComparisonTable: React.FC = () => {`);
    
    let newHook = `  const { ourFeatures, legacyFeatures, rows } = useCmsContent("comparisonTable", {
    ourFeatures: [
      'Automated Mapping',
      'Real-time Monitoring',
      'Unified Dashboard',
      'API-first Integration',
      'Proactive Alerts'
    ],
    legacyFeatures: [
      'Manual Tracking',
      'Periodic Audits',
      'Fragmented Tools',
      'Siloed Systems',
      'Reactive Fixes'
    ],
    rows: [
      { feature: 'Compliance Mapping', us: true, them: false },
      { feature: 'Audit Readiness', us: true, them: false },
      { feature: 'Model Monitoring', us: true, them: false },
      { feature: 'Policy Enforcement', us: true, them: false },
      { feature: 'Role-based Access', us: true, them: true }
    ]
  });`;

    const toRemove = code.substring(code.indexOf(`const ourFeatures = [`), code.indexOf(`const rows = [`));
    const toRemoveAlso = code.substring(code.indexOf(`const rows = [`), code.indexOf(`  return (`) - 1);
    
    code = code.replace(toRemove, "");
    code = code.replace(toRemoveAlso, newHook + "\n\n");
    
    fs.writeFileSync(tablePath, code);
  }
}

console.log("Hooks wired to UI!");
