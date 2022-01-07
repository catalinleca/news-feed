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

export const Posts = ({posts, isLoading, setLoader}) => {
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