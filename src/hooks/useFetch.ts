import { useState, useEffect } from 'react';

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url);
        console.log("Countries API URL: ", url)
        //console.log("Countries API Response: ", res)
        console.log("Response OKAY: ", res.ok)
        //if (!res.ok) throw new Error('Failed to fetch data');
        const json = await res.json();
        //console.log("Countries Resposnse JSON: ", json)
        setData(json);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
}
