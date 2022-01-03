import React, {forwardRef, useCallback, useEffect, useRef, useState} from "react";
import {CircularProgress, Grid} from "@mui/material";
import {Post} from "./Post";
import axios from "axios";

const PostWrapper = forwardRef(({post}, ref) => (
  <Grid
    ref={ref}
    container
    justifyContent="center"
    item
    spacing={1}
    mt={2}
    xs={8}
  >
    <Post
      post={post}
    />
  </Grid>
))

export const Posts = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const observer = useRef(
    new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPageNumber => prevPageNumber + 1)
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
    setLoading(true)

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`)

        console.log("response: ", response);

        setPosts((prev) => [...prev, ...response.data])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData();

    return () => observer.current.disconnect()

  }, [page, limit])

  return (
    <Grid
      container
      justifyContent="center"
    >
      {posts && posts.length && posts.map((post, index) => (
          <PostWrapper
            ref={posts.length === index + 1 ? setLoader : null}
            key={`${post?.id}${index}`}
            post={post}
          />
        )
      )}
      {loading && <CircularProgress/>}
    </Grid>

  )
}