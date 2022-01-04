import React, {forwardRef, useCallback, useEffect, useRef, useState} from "react";
import {CircularProgress, Grid} from "@mui/material";
import {Post} from "./Post";
import axios from "axios";
import appClient from "../../client/appClient";

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
    const currentObserver = observer.current;

    const fetchData = async () => {
      try {
        const response = await appClient.posts.getAllWithQueryParams({
          _page: page,
          _limit: limit
        })

        if (response.data.length) {
          setPosts((prev) => [...prev, ...response.data])
        } else {
          setHasMore(false);
        }

      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData();

    return () => currentObserver.disconnect()

  }, [page, limit])

  console.log("===")
  return (
    <Grid
      container
      justifyContent="center"
    >
      {posts && posts.map((post, index) => (
          <PostWrapper
            ref={posts.length === index + 1 ? setLoader : null}
            key={`${post?.id}${index}`}
            post={post}
          />
        )
      )}
      <br/>
      {
        loading && (
          <Grid
            container
            justifyContent="center"
            spacing={1}
            mt={2}
          >
            <CircularProgress/>
          </Grid>
      )}
    </Grid>

  )
}