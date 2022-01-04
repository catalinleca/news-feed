import {useEffect, useState} from "react";
import {Box, Button, Grid, LinearProgress, List, Typography} from "@mui/material";
import {Comment} from "./Comment";
import axios from "axios";
import appClient from "../../client/appClient";
import * as React from "react";

export const Comments = ({postId}) => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(3);
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)

    const fetchData = async () => {
      try {
        // const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments?_page=${page}&_limit=${limit}`)
        const response = await appClient.comments.getAllWithQueryParams({
          postId,
          _page: page,
          _limit: limit
        })

        if (response.data.length) {
          setComments((prev) => [...prev, ...response.data])
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

  }, [page, limit])

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
                  (hasMore && !loading) ? (
                    <Button
                      size="small"
                      variant="text"
                      onClick={loadMoreCommentsHandler}
                    >
                      Load more comments
                    </Button>
                  ) : ( loading && (
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