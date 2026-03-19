import type {
  PlatformStat,
  CustomerStory,
  DemoRequestPayload,
  ApiResponse,
  CmsContentItem,
  CmsUpdatePayload,
} from "../types";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const requestHeaders = new Headers(options?.headers);
  if (!requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  const response = await fetch(url, {
    headers: requestHeaders,
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `Request failed: ${response.status}`);
  }

  return response.json();
}

export const api = {
  getStats: () =>
    fetchJson<ApiResponse<PlatformStat[]>>(`${API_BASE}/stats`),

  getCustomerStories: () =>
    fetchJson<ApiResponse<CustomerStory[]>>(`${API_BASE}/customer-stories`),

  submitDemoRequest: (data: DemoRequestPayload) =>
    fetchJson<{ message: string; data: { id: number } }>(`${API_BASE}/demo-request`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getContent: () =>
    fetchJson<ApiResponse<CmsContentItem[]>>(`${API_BASE}/content`),

  updateContent: (payload: CmsUpdatePayload, token: string) =>
    fetchJson<{ message: string }>(`${API_BASE}/content`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    }),

  deleteContent: (section: string, token: string) =>
    fetchJson<{ message: string }>(`${API_BASE}/content/${encodeURIComponent(section)}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    }),

  healthCheck: () =>
    fetchJson<{ status: string }>(`${API_BASE}/health`),
};
