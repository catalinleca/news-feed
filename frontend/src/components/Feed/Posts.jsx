import React, {forwardRef} from "react";
import {Grid} from "@mui/material";
import {Post} from "./";

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

export const Posts = ({posts, setLoader}) => {
  return (
    <Grid
      container
      justifyContent="center"
    >
      {posts && posts.map((post, index) => (
          <PostWrapper
            ref={posts.length === index + 1 ? setLoader : null}
            key={post.id + post.title}
            post={post}
          />
        )
      )}
    </Grid>

  )
}