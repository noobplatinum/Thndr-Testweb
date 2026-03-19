import type {
  PlatformStat,
  CustomerStory,
  DemoRequestPayload,
  ApiResponse,
} from "../types";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
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
    fetchJson<{ message: string; id: number }>(`${API_BASE}/demo-request`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  healthCheck: () =>
    fetchJson<{ status: string }>(`${API_BASE}/health`),
};
