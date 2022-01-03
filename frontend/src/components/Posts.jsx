import * as React from "react";
import {Grid} from "@mui/material";
import {Post} from "./Post";
import {useRequest} from "../hooks";
import appClient from "../client/appClient";

export const Posts = () => {
  const {data: posts} = useRequest(
    () => appClient.posts.getAll()
  )

  console.log("posts: ", posts);

  return (
    <Grid
      container
      spacing={1}
    >
      {posts && posts.length && posts.map((post, index) => (
        <Grid
          item
          xs={12}
          key={`${post?.id}${index}`}
        >
          <Post
            post={post}
          />
        </Grid>
      ))}
    </Grid>

  )
}