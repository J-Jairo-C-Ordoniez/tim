import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export function useContributions() {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContributions = useCallback(async () => {
    try {
      const response = await axios.get("/api/mosaic");
      setContributions(response.data.contributions);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContributions();
  }, [fetchContributions]);

  return { contributions, loading, error, refresh: fetchContributions };
}