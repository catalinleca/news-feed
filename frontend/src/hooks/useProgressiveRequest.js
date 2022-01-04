import {useEffect, useRef, useState} from "react";

export const useProgressiveRequest = ({apiCall, intersectionHandler, page, limit, observerConfig}) => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const observer = useRef(
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        intersectionHandler()
      }
    }, {
      root: null,
      rootMargin: "20px",
      threshold: 0,
      ...observerConfig
    })
  )

  useEffect(() => {
    setLoading(true)
    const currentObserver = observer.current;

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
        setLoading(false)
      }
    }

    fetchData();

    return () => currentObserver.disconnect()
  }, [page, limit])

  return {
    data,
    hasMore,
    loading,
    error
  }
}