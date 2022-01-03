import {useEffect, useState} from "react";
import {Button, Grid, List} from "@mui/material";
import {Comment} from "./Comment";
import axios from "axios";

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
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}/comments?_page=${page}&_limit=${limit}`)

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

  console.log("comments: ", comments)
  return (
    <Grid container>
      <List
        sx={{
          width: '100%',
          maxHeight: "250px",
          overflowY: "scroll"
        }}
      >
        {comments && comments.length && comments.map((comment, index) => (
          <Comment
            key={`${comment.id}${index}`}
            comment={comment}
          />
        ))}
        {
          hasMore && <Button
            size="small"
            variant="text"
            onClick={loadMoreCommentsHandler}
          >
            Load more comments
          </Button>
        }
      </List>
    </Grid>
  )
}