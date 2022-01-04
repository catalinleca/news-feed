import {useCallback, useState} from "react";
import {Button, Grid, LinearProgress, List, Typography} from "@mui/material";
import {Comment} from "./Comment";
import appClient from "../../client/appClient";
import * as React from "react";
import {useProgressiveRequest} from "../../hooks/useProgressiveRequest";

export const Comments = ({postId}) => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5);

  const apiCall = useCallback(() => appClient.comments.getAllWithQueryParams({
    postId,
    _page: page,
    _limit: limit
  }), [page, limit, postId])

  const {
    data: comments,
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
                  ) : ( isLoading && (
                    <Grid>
                      <LinearProgress />
                    </Grid>
                  ))
                }
              </Grid>
            )
            : (<Typography variant="caption">No comments</Typography>)
        }
      </List>
    </Grid>
  )
}