import { useState } from "react";
import type { DemoRequestPayload } from "../types";
import { api } from "../services/api";

interface UseDemoRequestResult {
  submit: (data: DemoRequestPayload) => Promise<void>;
  loading: boolean;
  success: boolean;
  error: string | null;
  reset: () => void;
}

export function useDemoRequest(): UseDemoRequestResult {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: DemoRequestPayload) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await api.submitDemoRequest(data);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit request");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSuccess(false);
    setError(null);
  };

  return { submit, loading, success, error, reset };
}
