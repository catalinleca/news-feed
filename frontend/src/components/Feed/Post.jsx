import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader, Grid,
  Typography
} from "@mui/material";
import {PrivateComponent, PostCardActions, PostLoader} from "../";
import {FeedContext} from "../../containers/Feed";
import {Comments} from "../../containers";

export const Post = ({post}) => {
  const {
    activePostLoading,
    triggerEdit,
    deletePostHandler
  } = React.useContext(FeedContext)

  if (activePostLoading === post.id) {
    return (
      <PostLoader
        sx={{
          display: "contents"
        }}
      />
    )
  }

  return (
    <Card sx={{width: 645}}>
      <CardHeader
        avatar={
          <Avatar
            style={{
              backgroundColor: "orange"
            }}
            aria-label="recipe"
          />
        }
        action={
          <PrivateComponent
            componentUserId={post.userId}
          >
            <PostCardActions
              handleEdit={(e) => triggerEdit(post.id, e)}
              handleDelete={(e) => deletePostHandler(post.id, e)}
            />
          </PrivateComponent>

        }
        title={post.title}
        subheader={post.createdAt}
      />

      <CardContent>
        <Grid>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflowWrap: "break-word"
            }}
          >
            {post.body}
          </Typography>
        </Grid>
      </CardContent>
      <CardContent>
        <Comments
          postId={post.id}
        />
      </CardContent>
    </Card>
  )
}
