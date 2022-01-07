import React, {useCallback, useState} from "react";
import {Button, Grid, LinearProgress, List, Typography} from "@mui/material";
import {Comment, AddComment} from "./";
import appClient from "../../client/appClient";
import {useProgressiveRequest} from "../../hooks";

export const Comments = ({postId, addComment}) => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5);

  const apiCall = useCallback(() => appClient.comments.getAllWithQueryParams({
    postId,
    _page: page,
    _limit: limit
  }), [page, limit, postId])

  const {
    data: comments,
    setData: setComments,
    isLoading,
    error,
    hasMore
  } = useProgressiveRequest(
    apiCall,
    page,
    limit
  )

  const loadMoreCommentsHandler = () => {
    setPage(prevPage => prevPage + 1)
  }

  const updateCommentHandler = (commentId) => async (val, name) => {
    try {
      /** TBD move down and add loader */
      const response = await appClient.comments.update(commentId, {
        [name]: val
      })

      console.log("update response: ", response);
      if (response.data[0] === 0) {
        console.error("Handle me - Could not delete Comment")
        return
      }

      const {data: newComment} = response

      const newComments = comments.map(comment => {
        if (comment.id === commentId) {
          return newComment
        } else {
          return comment
        }
      })

      setComments(newComments)
    } catch (err) {
      console.error("Handle me - Could not update Comment")
    }
  }

  const deleteCommentHandler = (commentId) => async () => {
    try {
      /** TBD move down and add loader */
      const response = await appClient.comments.deleteById(commentId)

      if (response[0] === 0) {
        console.error("Handle me - Could not delete Comment")
        return
      }

      const newComments = comments.filter(({id}) => id !== commentId)

      setComments(newComments)
    } catch (err) {
      console.error("Handle me - Could not delete Comment")
    }
  }

  const addCommentHandler = async (data) => {
    try {
      const response = await appClient.comments.createWithPost({
        ...data
      }, postId)

      const newComment = response.data;
      setComments([...comments, newComment])
    } catch (err) {
      console.error("Handle me - Could not add Comment")
    }
  }

  return (
    <Grid container>
      <Typography paragraph>Comments</Typography>
      <List
        sx={{
          width: '100%',
          maxHeight: "250px",
          overflowY: "auto"
        }}
      >
        {
          comments && comments.length
            ? (
              <Grid>
                {
                  comments.map((comment, index) => (
                    <Comment
                      key={`${comment.id}${index}`}
                      comment={comment}
                      updateComment={updateCommentHandler}
                      deleteComment={deleteCommentHandler}
                    />
                  ))
                }
                {
                  (hasMore && !isLoading) ? (
                    <Button
                      size="small"
                      variant="text"
                      onClick={loadMoreCommentsHandler}
                    >
                      Load more comments
                    </Button>
                  ) : (isLoading && (
                    <Grid>
                      <LinearProgress/>
                    </Grid>
                  ))
                }
              </Grid>
            )
            : (<Typography variant="caption">No comments</Typography>)
        }
      </List>
      {
        addComment && (
          <AddComment
            addComment={addCommentHandler}
          />
        )
      }
    </Grid>
  )
}