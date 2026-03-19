
const fs = require("fs");
const path = require("path");

const sectionsDir = path.join(__dirname, "frontend/src/sections");
const files = fs.readdirSync(sectionsDir);

files.forEach(folder => {
  const tsxPath = path.join(sectionsDir, folder, `${folder}.tsx`);
  if (fs.existsSync(tsxPath)) {
    let code = fs.readFileSync(tsxPath, "utf-8");
    let changed = false;
    
    if (code.includes("from \x27../components/Button\x27")) {
      code = code.replace(/from \x27\.\.\/components\/Button\x27/g, "from \x27../../components/Button\x27");
      changed = true;
    }
    if (code.includes("from \x27../components/SectionHeader\x27")) {
      code = code.replace(/from \x27\.\.\/components\/SectionHeader\x27/g, "from \x27../../components/SectionHeader\x27");
      changed = true;
    }
    if (code.includes("from \x27../hooks/")) {
      code = code.replace(/from \x27\.\.\/hooks\//g, "from \x27../../hooks/");
      changed = true;
    }
    if (code.includes("map((story) =>")) {
      code = code.replace(/map\(\(story\) =>/g, "map((story: any) =>");
      changed = true;
    }
    if (code.includes("map((stat) =>")) {
      code = code.replace(/map\(\(stat\) =>/g, "map((stat: any) =>");
      changed = true;
    }

    if (changed) fs.writeFileSync(tsxPath, code);
  }
});
console.log("Imports fixed");

