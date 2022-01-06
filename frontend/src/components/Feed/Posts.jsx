import React, {forwardRef, useCallback, useRef, useState} from "react";
import {CircularProgress, Grid} from "@mui/material";
import {Post} from "./Post";
import appClient from "../../client/appClient";
import {useProgressiveRequest} from "../../hooks/useProgressiveRequest";

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

  const apiCall = useCallback(() => appClient.posts.getAllWithQueryParams({
    _page: page,
    _limit: limit
  }), [page, limit])

  const {
    data: posts,
    setData: setPosts,
    isLoading,
    error,
    hasMore
  } = useProgressiveRequest(
    apiCall,
    page,
    limit
  )

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
        isLoading && (
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