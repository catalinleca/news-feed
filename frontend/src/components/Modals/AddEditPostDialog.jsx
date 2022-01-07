import React, { useState, useEffect, useMemo } from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

export const AddEditPostDialog = ({isOpen, handleClose, actionHandler, defaultValues}) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (defaultValues) {
      setTitle(defaultValues?.title || "");
      setDescription(defaultValues?.body || "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [defaultValues?.title, defaultValues?.body]);


  const disabledSubmit = useMemo(() => (
    title.length === 0 && description.length === 0
  ), [title, description])
  const isEdit = !!defaultValues


  const handleAction = (e) => {
    setTitle("");
    setDescription("");
    actionHandler({title, description}, e)
    handleClose();
  }

  const closeHandler = (e) => {
    setTitle("")
    setDescription("")
    handleClose(e)
  }

  return (
    <Dialog open={isOpen} onClose={closeHandler}>
      <DialogTitle>{isEdit ? "Edit Post" : "Add Post"}</DialogTitle>
      <DialogContent>
        <TextField
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="dense"
          label="Title"
          variant="standard"
        />
        <TextField
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          autoFocus
          margin="dense"
          label="Content"
          multiline
          maxRows={4}
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler}>Cancel</Button>
        <Button disabled={disabledSubmit} onClick={handleAction}>{isEdit ? "Edit" : "Post"}</Button>
      </DialogActions>
    </Dialog>
  )
}