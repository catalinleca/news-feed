import {
  Avatar, createStyles,
  Divider,
  Grid, IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText, makeStyles, TextField,
  Typography
} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {EditableField} from "../EditableField";
import DeleteIcon from '@mui/icons-material/Delete';
import {PrivateComponent} from "../PrivateComponent";
import {WithUser} from "../WithUser";

const MAX_COMMENT = 100;

export const Comment = ({comment, updateComment, deleteComment}) => {
  const [readMore, setReadMore] = useState(comment.body.length > MAX_COMMENT);
  const [colors, _] = useState(`${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)}`)
  const commentTooBig = comment.body.length > MAX_COMMENT;

  const readMoreToggle = (e) => {
    e.stopPropagation()
    setReadMore(prevState => !prevState)
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
                      sx={{display: 'inline'}}
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
                    >
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