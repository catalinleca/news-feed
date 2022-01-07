import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import * as React from "react";
import {FeedDispatchContext} from "../../containers/Feed";

export const AddPostForm = ({isOpen, handleClose, actionHandler, defaultValues = {}}) => {
  const {
    title = "", body: description = ""
  } = defaultValues

  const isEdit = !!(title || description)

  const {
    register,
    handleSubmit,
  } = useForm();


  const handleAction = (e) => {
    handleSubmit(actionHandler)(e)
    handleClose();
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{isEdit ? "Edit Post" : "Add Post"}</DialogTitle>
      <DialogContent>
        <TextField
          id="title"
          name="title"
          defaultValue={title}
          margin="dense"
          label="Title"
          variant="standard"
          {...register('title')}
        />
        <TextField
          id="description"
          name="description"
          defaultValue={description}
          autoFocus
          margin="dense"
          label="Content"
          multiline
          maxRows={4}
          fullWidth
          variant="standard"
          {...register('description')}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAction}>{isEdit ? "Edit" : "Post"}</Button>
      </DialogActions>
    </Dialog>
  )
}