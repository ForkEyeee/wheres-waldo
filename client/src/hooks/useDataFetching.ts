import { useState, useEffect } from "react";

const useDataFetching = (url: string, token = undefined) => {
  const [data, setData] = useState<object[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(await response.text());
        }
        const json: object[] = await response.json();
        setData(json);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, token]);
  return [data, loading, error];
};

export default useDataFetching;
