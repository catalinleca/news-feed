import {
  Avatar,
  Divider,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from "@mui/material";
import * as React from "react";
import {useState} from "react";

const MAX_COMMENT = 100;
export const Comment = ({comment}) => {
  const [readMore, setReadMore] = useState(comment.body.length > MAX_COMMENT);
  const [colors, _] = useState(`${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}`)
  const commentTooBig = comment.body.length > MAX_COMMENT;

  const readMoreToggle = () => {
    setReadMore(prevState => !prevState)
  }

  return (
    <Grid>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            sx={{
              backgroundColor: `rgb(${colors})`
            }}
          >
            {comment.email && comment.email[0]}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={comment.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{display: 'inline'}}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {comment.email.split('@')[0] + " — "}
              </Typography>
              {readMore ? (comment.body.slice(0, MAX_COMMENT) + "...") : comment.body}
              <br/>
              {
                commentTooBig &&
                <Typography
                  size="small"
                  variant="caption"
                  onClick={readMoreToggle}
                  sx={{
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {readMore ? "Read more" : "Show less"}
                </Typography>
              }
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider/>
    </Grid>
  )
}