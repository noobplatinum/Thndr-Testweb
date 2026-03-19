import { useState, useEffect } from "react";
import { api } from "../services/api";

function parseCmsData<T>(value: string | null, fallback: T): T {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function useCmsContent<T>(section: string, defaultData: T): T {
  const [data, setData] = useState<T>(defaultData);

  useEffect(() => {
    let isMounted = true;

    const fetchContent = async () => {
      try {
        const json = await api.getContent();
        const sectionData = json.data.find((item) => item.section === section);

        if (isMounted && sectionData) {
          setData(parseCmsData(sectionData.data, defaultData));
        }
      } catch (err) {
        console.error("Failed to fetch CMS content", err);
      }
    };

    fetchContent();

    return () => {
      isMounted = false;
    };
  }, [defaultData, section]);

  return data;
}
