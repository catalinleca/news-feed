import {useCallback, useEffect, useRef, useState} from "react";

export const useProgressiveRequest = (apiCall, page, limit, observerCallback) => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const observer = useRef(
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        observerCallback()
      }
    }, {
      root: null,
      rootMargin: "20px",
      threshold: 0
    })
  )

  const setLoader = useCallback(node => {
    if (observer.current) observer.current.disconnect();

    if (node) observer.current.observe(node)
  }, []);


  useEffect(() => {
    const currentObserver = observer;

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

    return () => currentObserver.current.disconnect();
  }, [page, limit, apiCall])

  return {
    data,
    setData,
    isLoading,
    error,
    setLoader
  };
}
