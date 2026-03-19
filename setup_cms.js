const fs = require("fs");
const path = require("path");

// 1. BACKEND SCHEMA UPDATE to act as a Headless CMS
const schemaPath = path.join(__dirname, "backend/src/db/schema.ts");
let schemaContent = fs.readFileSync(schemaPath, "utf-8");
if (!schemaContent.includes("siteContent")) {
  schemaContent += `\nexport const siteContent = sqliteTable("site_content", {\n  section: text("section").primaryKey(),\n  data: text("data"), // Stored as JSON string\n});\n`;
  fs.writeFileSync(schemaPath, schemaContent);
}

// 2. BACKEND MVC FOR CONTENT
const servicesDir = path.join(__dirname, "backend/src/services");
const controllersDir = path.join(__dirname, "backend/src/controllers");
const routesDir = path.join(__dirname, "backend/src/routes");

fs.writeFileSync(path.join(servicesDir, "content.service.ts"), `
import { db } from "../db/connection";
import { siteContent } from "../db/schema";
import { eq } from "drizzle-orm";

export const getContentService = async () => {
  return await db.select().from(siteContent);
};

export const updateContentService = async (section: string, data: string) => {
  const existing = await db.select().from(siteContent).where(eq(siteContent.section, section));
  if (existing.length > 0) {
    return await db.update(siteContent).set({ data }).where(eq(siteContent.section, section)).returning();
  } else {
    return await db.insert(siteContent).values({ section, data }).returning();
  }
};
`);

fs.writeFileSync(path.join(controllersDir, "content.controller.ts"), `
import { Request, Response } from "express";
import { getContentService, updateContentService } from "../services/content.service";

export const getAllContent = async (_req: Request, res: Response) => {
  try {
    const content = await getContentService();
    res.json({ data: content });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch content" });
  }
};

export const updateContent = async (req: Request, res: Response) => {
  try {
    const { section, data } = req.body;
    // VERY BASIC AUTH FOR ADMIN
    const authHeader = req.headers.authorization;
    if (authHeader !== "Bearer supersecretadmin") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const result = await updateContentService(section, JSON.stringify(data));
    res.json({ message: "Content updated", data: result });
  } catch (error) {
    res.status(500).json({ error: "Failed to update content" });
  }
};
`);

fs.writeFileSync(path.join(routesDir, "content.ts"), `
import { Router } from "express";
import { getAllContent, updateContent } from "../controllers/content.controller";

const router = Router();
router.get("/", getAllContent);
router.post("/", updateContent);

export default router;
`);

// UPDATE INDEX.TS
const indexPath = path.join(__dirname, "backend/src/index.ts");
let indexContent = fs.readFileSync(indexPath, "utf-8");
if (!indexContent.includes("contentRoutes")) {
  indexContent = indexContent.replace('import statsRoutes from "./routes/stats";', 'import statsRoutes from "./routes/stats";\nimport contentRoutes from "./routes/content";');
  indexContent = indexContent.replace('app.use("/api/stats", statsRoutes);', 'app.use("/api/stats", statsRoutes);\napp.use("/api/content", contentRoutes);');
  fs.writeFileSync(indexPath, indexContent);
}


// 3. FRONTEND ADMIN PANEL SETUP
const pagesDir = path.join(__dirname, "frontend/src/pages");
if (!fs.existsSync(pagesDir)) fs.mkdirSync(pagesDir, { recursive: true });

// Move App content to Home
const appTsxPath = path.join(__dirname, "frontend/src/App.tsx");
let appCode = fs.readFileSync(appTsxPath, "utf-8");
fs.writeFileSync(path.join(pagesDir, "Home.tsx"), appCode.replace("export default App;", "export default App;")); 
// Wait, rename the function
let homeCode = appCode.replace("function App()", "export function Home()");
homeCode = homeCode.replace("export default App;", "");
homeCode = homeCode.replace(/'\.\/components\//g, `'../components/`).replace(/'\.\/sections\//g, `'../sections/`);
fs.writeFileSync(path.join(pagesDir, "Home.tsx"), homeCode);

// Write new App.tsx with Router
fs.writeFileSync(appTsxPath, `
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { AdminPanel } from "./pages/AdminPanel";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
`);

// Write AdminPanel.tsx
fs.writeFileSync(path.join(pagesDir, "AdminPanel.tsx"), `
import { useState, useEffect } from "react";
import "./AdminPanel.css";

export function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [contents, setContents] = useState<any[]>([]);

  useEffect(() => {
    if (isAuthenticated) fetchContent();
  }, [isAuthenticated]);

  const fetchContent = async () => {
    const res = await fetch("http://localhost:3001/api/content");
    const json = await res.json();
    setContents(json.data || []);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin") setIsAuthenticated(true);
    else alert("Incorrect Password");
  };

  const saveContent = async (section: string, rawJson: string) => {
    try {
      const parsed = JSON.parse(rawJson);
      await fetch("http://localhost:3001/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer supersecretadmin" },
        body: JSON.stringify({ section, data: parsed })
      });
      alert("Saved perfectly!");
    } catch(err) {
      alert("Invalid JSON format!");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input type="password" placeholder="Password (admin)" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <header>
        <h1>Thndr AI - Content Management System</h1>
        <a href="/">← Back to Site</a>
      </header>
      <div className="admin-sections">
        {contents.length === 0 && <p>No sections seeded yet. Try visiting the frontend components first to trigger initial data population.</p>}
        {contents.map(c => (
          <div key={c.section} className="admin-card">
            <h3>{c.section}</h3>
            <textarea 
              defaultValue={JSON.stringify(JSON.parse(c.data || "{}"), null, 2)}
              id={\`json-\${c.section}\`}
            />
            <button onClick={() => saveContent(c.section, (document.getElementById(\`json-\${c.section}\`) as HTMLTextAreaElement).value)}>
              Save Changes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
`);

fs.writeFileSync(path.join(pagesDir, "AdminPanel.css"), `
.admin-login { display:flex; flex-direction:column; align-items:center; justify-content:center; height:100vh; background:#0a0e1a; color:white; }
.admin-login input { padding: 10px; margin: 10px 0; border-radius: 4px; border:none; }
.admin-login button { padding: 10px 20px; background:#00d4aa; color:#0a0e1a; font-weight:bold; border:none; border-radius: 4px; cursor:pointer;}
.admin-panel { padding: 40px; background:#0a0e1a; min-height: 100vh; color:white; }
.admin-panel header { display:flex; justify-content:space-between; align-items:center; margin-bottom: 40px; border-bottom:1px solid #1f2937; padding-bottom:20px; }
.admin-panel header a { color: #00d4aa; text-decoration:none; }
.admin-card { background:#111827; padding: 20px; border-radius: 8px; margin-bottom: 20px; border:1px solid #1f2937; }
.admin-card h3 { margin-top:0; color:#00d4aa; text-transform: capitalize; }
.admin-card textarea { width: 100%; height: 200px; background:#0a0e1a; color:#e5e7eb; border:1px solid #374151; padding:10px; font-family:monospace; border-radius:4px; margin-bottom:15px; }
.admin-card button { background:#00d4aa; color:#0a0e1a; padding:8px 16px; border:none; border-radius:4px; font-weight:bold; cursor:pointer; }
`);
console.log("CMS setup complete!");
