import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import {
  cmsDefaults,
  managedSectionMeta,
  type ManagedCmsSection,
} from "../cms/managedSections";
import "./AdminPanel.css";

type AlertState = {
  type: "success" | "error" | "info";
  message: string;
} | null;

const TOKEN_STORAGE_KEY = "thndr_admin_bearer_token";

function toPrettyJson(value: unknown): string {
  return JSON.stringify(value, null, 2);
}

function normalizeRawJson(raw: string | null): string {
  if (!raw) {
    return "{}";
  }

  try {
    return toPrettyJson(JSON.parse(raw));
  } catch {
    return raw;
  }
}

function managedSections(): ManagedCmsSection[] {
  return Object.keys(cmsDefaults) as ManagedCmsSection[];
}

export function AdminPanel() {
  const [tokenInput, setTokenInput] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY) ?? "");
  const [authToken, setAuthToken] = useState(() => localStorage.getItem(TOKEN_STORAGE_KEY) ?? "");
  const [editors, setEditors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [alert, setAlert] = useState<AlertState>(null);
  const [newSection, setNewSection] = useState("");
  const [newSectionData, setNewSectionData] = useState("{\n  \n}");

  const managedSectionKeys = useMemo(() => managedSections(), []);

  const showAlert = useCallback((type: "success" | "error" | "info", message: string) => {
    setAlert({ type, message });
  }, []);

  const refreshContent = useCallback(async () => {
    setLoading(true);

    try {
      const response = await api.getContent();
      const existingMap = new Map(response.data.map((item) => [item.section, item.data]));

      const nextEditors: Record<string, string> = {};

      for (const section of managedSectionKeys) {
        const raw = existingMap.get(section) ?? toPrettyJson(cmsDefaults[section]);
        nextEditors[section] = normalizeRawJson(raw);
      }

      for (const [section, raw] of existingMap.entries()) {
        if (!(section in nextEditors)) {
          nextEditors[section] = normalizeRawJson(raw);
        }
      }

      setEditors(nextEditors);
      showAlert("info", "CMS data loaded.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to load CMS content.";
      showAlert("error", message);
    } finally {
      setLoading(false);
    }
  }, [managedSectionKeys, showAlert]);

  useEffect(() => {
    if (authToken) {
      void refreshContent();
    }
  }, [authToken, refreshContent]);

  const unmanagedSections = useMemo(
    () => Object.keys(editors).filter((section) => !managedSectionKeys.includes(section as ManagedCmsSection)),
    [editors, managedSectionKeys]
  );

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalized = tokenInput.trim();
    if (!normalized) {
      showAlert("error", "Enter a bearer token first.");
      return;
    }

    localStorage.setItem(TOKEN_STORAGE_KEY, normalized);
    setAuthToken(normalized);
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setAuthToken("");
    setEditors({});
    setTokenInput("");
    setAlert(null);
  };

  const saveSection = async (section: string) => {
    if (!authToken) {
      showAlert("error", "No auth token found.");
      return;
    }

    const raw = editors[section];
    if (!raw) {
      showAlert("error", `No JSON found for ${section}.`);
      return;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      showAlert("error", `Invalid JSON in ${section}.`);
      return;
    }

    setSavingSection(section);
    try {
      await api.updateContent({ section, data: parsed }, authToken);
      showAlert("success", `${section} saved.`);
      await refreshContent();
    } catch (error) {
      const message = error instanceof Error ? error.message : `Failed to save ${section}.`;
      showAlert("error", message);
    } finally {
      setSavingSection(null);
    }
  };

  const deleteSection = async (section: string) => {
    if (!authToken) {
      showAlert("error", "No auth token found.");
      return;
    }

    if (!window.confirm(`Delete section '${section}'?`)) {
      return;
    }

    setSavingSection(section);
    try {
      await api.deleteContent(section, authToken);
      showAlert("success", `${section} deleted.`);
      await refreshContent();
    } catch (error) {
      const message = error instanceof Error ? error.message : `Failed to delete ${section}.`;
      showAlert("error", message);
    } finally {
      setSavingSection(null);
    }
  };

  const resetToDefault = (section: ManagedCmsSection) => {
    setEditors((prev) => ({
      ...prev,
      [section]: toPrettyJson(cmsDefaults[section]),
    }));

    showAlert("info", `${section} reset in editor. Click Save to persist.`);
  };

  const createOrUpdateCustomSection = async () => {
    if (!authToken) {
      showAlert("error", "No auth token found.");
      return;
    }

    const section = newSection.trim();
    if (!section) {
      showAlert("error", "Section name is required.");
      return;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(newSectionData);
    } catch {
      showAlert("error", "Invalid JSON in new section payload.");
      return;
    }

    setSavingSection(section);
    try {
      await api.updateContent({ section, data: parsed }, authToken);
      setNewSection("");
      setNewSectionData("{\n  \n}");
      showAlert("success", `${section} created or updated.`);
      await refreshContent();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create section.";
      showAlert("error", message);
    } finally {
      setSavingSection(null);
    }
  };

  if (!authToken) {
    return (
      <div className="admin-login">
        <div className="admin-login__card">
          <h1>Thndr CMS Login</h1>
          <p>Enter the admin bearer token configured on the backend.</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={tokenInput}
              onChange={(event) => setTokenInput(event.target.value)}
              placeholder="Bearer token"
              autoComplete="current-password"
            />
            <button type="submit">Open CMS</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <header className="admin-panel__header">
        <div>
          <h1>Thndr CMS</h1>
          <p>Edit dynamic frontend data powered by the backend content API.</p>
        </div>
        <div className="admin-panel__header-actions">
          <button onClick={refreshContent} disabled={loading || Boolean(savingSection)}>
            Refresh
          </button>
          <button onClick={handleLogout}>Logout</button>
          <a href="/">Back to Site</a>
        </div>
      </header>

      {alert && <div className={`admin-alert admin-alert--${alert.type}`}>{alert.message}</div>}

      <section className="admin-section">
        <h2>Managed Frontend Sections</h2>
        <p>These are used directly by homepage components via the CMS hook.</p>

        <div className="admin-grid">
          {managedSectionKeys.map((section) => (
            <article key={section} className="admin-card">
              <div className="admin-card__header">
                <div>
                  <h3>{managedSectionMeta[section].title}</h3>
                  <p>{managedSectionMeta[section].description}</p>
                </div>
                <span className="admin-card__chip">{section}</span>
              </div>

              <textarea
                value={editors[section] ?? toPrettyJson(cmsDefaults[section])}
                onChange={(event) =>
                  setEditors((prev) => ({
                    ...prev,
                    [section]: event.target.value,
                  }))
                }
              />

              <div className="admin-card__actions">
                <button onClick={() => resetToDefault(section)}>Reset to Defaults</button>
                <button onClick={() => saveSection(section)} disabled={savingSection === section}>
                  {savingSection === section ? "Saving..." : "Save"}
                </button>
                <button onClick={() => deleteSection(section)} disabled={savingSection === section}>
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <h2>Custom Sections</h2>
        <p>Create or update additional sections not managed by defaults.</p>

        <div className="admin-create">
          <input
            type="text"
            placeholder="section name"
            value={newSection}
            onChange={(event) => setNewSection(event.target.value)}
          />
          <textarea
            value={newSectionData}
            onChange={(event) => setNewSectionData(event.target.value)}
          />
          <button onClick={createOrUpdateCustomSection} disabled={Boolean(savingSection)}>
            Save Custom Section
          </button>
        </div>

        {unmanagedSections.length > 0 && (
          <div className="admin-grid admin-grid--custom">
            {unmanagedSections.map((section) => (
              <article key={section} className="admin-card">
                <div className="admin-card__header">
                  <h3>{section}</h3>
                  <span className="admin-card__chip">custom</span>
                </div>
                <textarea
                  value={editors[section]}
                  onChange={(event) =>
                    setEditors((prev) => ({
                      ...prev,
                      [section]: event.target.value,
                    }))
                  }
                />
                <div className="admin-card__actions">
                  <button onClick={() => saveSection(section)} disabled={savingSection === section}>
                    {savingSection === section ? "Saving..." : "Save"}
                  </button>
                  <button onClick={() => deleteSection(section)} disabled={savingSection === section}>
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
