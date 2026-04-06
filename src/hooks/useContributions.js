import { useState, useEffect } from "react";
import axios from "axios";

export function useContributions() {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContributions = async () => {
    try {
      const response = await axios.get("/api/mosaic");
      setContributions(response.data.contributions);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching contributions:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  return { contributions, loading, error, refresh: fetchContributions };
}
