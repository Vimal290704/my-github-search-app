import { useEffect, useState } from "react";

const useGitHubData = (username, detailType) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!username) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }

    const cacheKey = `${username}_${detailType}`;
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      setData(JSON.parse(cachedData));
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    let endpoint = `https://api.github.com/users/${username}`;
    if (detailType !== "overview") {
      endpoint += `/${detailType}`;
    }

    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch(endpoint, {
          signal: abortController.signal,
        });
        if (!response.ok) {
          setError(`Error: ${response.status} - ${response.statusText}`);
          setLoading(false);
          return;
        }
        const json = await response.json();
        setData(json);
        localStorage.setItem(cacheKey, JSON.stringify(json));
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      abortController.abort();
    };
  }, [username, detailType]);

  return { data, error, loading };
};

export default useGitHubData;
