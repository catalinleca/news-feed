import React, {useCallback, useState} from "react";
import {Button, Grid, LinearProgress, List, Typography} from "@mui/material";
import {Comment, AddComment} from "../components";
import appClient from "../client/appClient";
import {useProgressiveRequest} from "../hooks";

export const Comments = ({postId}) => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(3);
  const [activeLoadingComment, setActiveLoadingComment] = useState(null);

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
      setActiveLoadingComment(commentId);
      const response = await appClient.comments.update(commentId, {
        [name]: val
      })

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
      setActiveLoadingComment(null);
    } catch (err) {
      console.error("Handle me - Could not update Comment", err)
    }
  }

  const deleteCommentHandler = (commentId) => async () => {
    try {
      const response = await appClient.comments.deleteById(commentId)

      if (response[0] === 0) {
        console.error("Handle me - Could not delete Comment")
        return
      }

      const newComments = comments.filter(({id}) => id !== commentId)

      setComments(newComments)
    } catch (err) {
      console.error("Handle me - Could not delete Comment", err)
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
      console.error("Handle me - Could not add Comment", err)
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
                      key={`${comment.id}${comment.name}`}
                      comment={comment}
                      updateComment={updateCommentHandler}
                      deleteComment={deleteCommentHandler}
                      activeLoadingComment={activeLoadingComment}
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
      <AddComment
        addComment={addCommentHandler}
      />
    </Grid>
  )
}