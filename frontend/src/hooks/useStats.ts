import { useState, useEffect } from "react";
import type { PlatformStat } from "../types";
import { api } from "../services/api";

interface UseStatsResult {
  stats: PlatformStat[];
  loading: boolean;
  error: string | null;
}

// Fallback data matching the mockup in case API is unavailable
const FALLBACK_STATS: PlatformStat[] = [
  { id: 1, label: "Platform Uptime", value: "99.9%", icon: "uptime", sortOrder: 1 },
  { id: 2, label: "Predictions Governed Daily", value: "10M+", icon: "predictions", sortOrder: 2 },
  { id: 3, label: "Audit Coverage", value: "100%", icon: "audit", sortOrder: 3 },
];

export function useStats(): UseStatsResult {
  const [stats, setStats] = useState<PlatformStat[]>(FALLBACK_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const response = await api.getStats();
        if (!cancelled) {
          setStats(response.data.length > 0 ? response.data : FALLBACK_STATS);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          console.warn("Using fallback stats:", err);
          setError(err instanceof Error ? err.message : "Failed to fetch stats");
          // Keep fallback data
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchStats();
    return () => { cancelled = true; };
  }, []);

  return { stats, loading, error };
}
