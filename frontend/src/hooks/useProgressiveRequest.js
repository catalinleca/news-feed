import {useEffect, useState} from "react";

export const useProgressiveRequest = (apiCall, page, limit) => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true)

    const fetchData = async () => {
      try {
        const response = await apiCall()

        if (response.data.length) {
          setData((prev) => [...prev, ...response.data])
        } else {
          setHasMore(false);
        }
      } catch (err) {
        console.error(err)
        setError(err);
      } finally {
        setIsLoading(false)
      }
    }

    fetchData();

  }, [page, limit, apiCall])

  return {
    data,
    isLoading,
    error,
    hasMore
  };
}
