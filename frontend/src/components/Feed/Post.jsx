import React from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography
} from "@mui/material";
import JwtService from "../../client/jwt.service";
import {Comments} from "./";
import {PrivateComponent, PostCardActions} from "../";
import {FeedDispatchContext} from "../../containers/Feed";

export const Post = ({post}) => {
  const {
    triggerEdit,
    deletePostHandler
  } = React.useContext(FeedDispatchContext)

  const {email} = JwtService.getCurrentTokenPayload();

  return (
    <Card sx={{width: 645}}>
      <CardHeader
        avatar={
          <Avatar
            style={{
              backgroundColor: "orange"
            }}
            aria-label="recipe"
          >
            {email && email[0].toUpperCase()}
          </Avatar>
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
        <Typography variant="body2" color="text.secondary">
          {post.body}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>

      </CardActions>
      <CardContent>
        <Comments
          postId={post.id}
          addComment={true}
        />
      </CardContent>
    </Card>
  )
}