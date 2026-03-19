import { useState, useEffect } from "react";
import type { CustomerStory } from "../types";
import { api } from "../services/api";

interface UseCustomerStoriesResult {
  stories: CustomerStory[];
  loading: boolean;
  error: string | null;
}

const FALLBACK_STORIES: CustomerStory[] = [
  {
    id: 1,
    quote: "Thndr AI helped us achieve compliance 3x faster while maintaining full visibility.",
    authorName: "Chief AI Officer",
    authorTitle: "Chief AI Officer",
    company: "Enterprise Healthcare",
    metricLabel: "80% reduction in compliance time",
    metricValue: "80%",
    imageUrl: "/Customers/c1.jpg",
    createdAt: "",
  },
  {
    id: 2,
    quote: "Complete governance across 50+ models without adding overhead to ML teams.",
    authorName: "VP of Engineering",
    authorTitle: "VP of Engineering",
    company: "Enterprise Healthcare",
    metricLabel: "100% model coverage",
    metricValue: "100%",
    imageUrl: "/Customers/c2.jpg",
    createdAt: "",
  },
  {
    id: 3,
    quote: "Seamless integration with our stack. Audit-ready in weeks, not months.",
    authorName: "Head of ML Operations",
    authorTitle: "Head of ML Operations",
    company: "Financial Services",
    metricLabel: "25% faster time to market",
    metricValue: "25%",
    imageUrl: "/Customers/c3.jpg",
    createdAt: "",
  },
  {
    id: 4,
    quote: "Automated governance that scaled with our rapid AI deployment.",
    authorName: "CTO",
    authorTitle: "CTO",
    company: "Tech Scale-up",
    metricLabel: "50+ agents governed",
    metricValue: "50+",
    imageUrl: "/Customers/c4.jpg",
    createdAt: "",
  },
];

export function useCustomerStories(): UseCustomerStoriesResult {
  const [stories, setStories] = useState<CustomerStory[]>(FALLBACK_STORIES);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchStories() {
      try {
        const response = await api.getCustomerStories();
        if (!cancelled) {
          setStories(response.data.length > 0 ? response.data : FALLBACK_STORIES);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          console.warn("Using fallback customer stories:", err);
          setError(err instanceof Error ? err.message : "Failed to fetch stories");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchStories();
    return () => { cancelled = true; };
  }, []);

  return { stories, loading, error };
}
