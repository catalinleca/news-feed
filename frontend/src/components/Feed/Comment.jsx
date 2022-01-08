import React, {useState} from "react";
import {
  Avatar,
  Divider,
  Grid, IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {PrivateComponent, WithUser, EditableField, CommentLoader} from "../";

const MAX_COMMENT = 100;

export const Comment = ({comment, updateComment, deleteComment, activeLoadingComment}) => {
  const [readMore, setReadMore] = useState(comment.body.length > MAX_COMMENT);
  const [colors, _] = useState(`${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}`)
  const commentTooBig = comment.body.length > MAX_COMMENT;

  const readMoreToggle = (e) => {
    e.stopPropagation()
    setReadMore(prevState => !prevState)
  }

  if (activeLoadingComment === comment.id) {
    return (
      <React.Fragment>
        <CommentLoader/>
        <Divider/>
      </React.Fragment>
    )
  }

  return (
    <Grid>
      <ListItem
        alignItems="flex-start"
        secondaryAction={
          <PrivateComponent
            componentUserId={comment.userId}
          >
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={deleteComment(comment.id)}
            >
              <DeleteIcon/>
            </IconButton>
          </PrivateComponent>
        }
      >
        <ListItemAvatar>
          <Avatar
            sx={{
              backgroundColor: `rgb(${colors})`
            }}
          >
            {comment.email && comment.email[0]}
          </Avatar>
        </ListItemAvatar>
        <WithUser>
          {
            ({userId}) => (
              <ListItemText
                disableTypography={true}
                primary={
                  <EditableField
                    isEditable={userId === comment.userId}
                    value={comment.name}
                    setValue={updateComment(comment.id)}
                    name="name"
                  />
                }
                secondary={
                  <Grid>
                    <Typography
                      sx={{display: 'inline', fontWeight: "bold", float: "left", marginTop: "1px", marginRight: "2px"}}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {comment.email.split('@')[0] + " — "}
                    </Typography>
                    <EditableField
                      isEditable={userId === comment.userId}
                      value={comment.body}
                      setValue={updateComment(comment.id)}
                      name="description"
                      textFieldProps={{
                        fullWidth: true,
                        multiline: true,
                        maxRows: 4
                      }}
                      gridProps={{
                        sx: {
                          display: "contents"
                        }
                      }}
                    >
                      <Typography variant="body2" sx={{display: "contents"}}>
                        {readMore ? (comment.body.slice(0, MAX_COMMENT) + "...") : comment.body}
                      </Typography>
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
                    </EditableField>
                  </Grid>
                }
              />
            )
          }
        </WithUser>
      </ListItem>
      <Divider/>
    </Grid>
  )
}