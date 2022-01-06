import {Button, Grid, Paper, TextField} from "@mui/material";
import * as React from "react";
import {useForm} from "react-hook-form";
import {useMemo, useState} from "react";

export const AddComment = ({addComment}) => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")

  const buttonDisabled = useMemo(() => !(title && desc), [title, desc])

  const handleAddComment = (e) => {
    setTitle("")
    setDesc("")
    handleSubmit(addComment)(e)
  }

  const {
    register,
    handleSubmit,
  } = useForm({});

  return (
    <Paper
      sx={{
        width: "100%",
        marginTop: 2,
        padding: 2
      }}
    >
      <Grid
        container={true}
        justifyContent="flex-start"
        alignItems="center"
        spacing={2}
      >
        <Grid
          item={true}
          xs={10}
        >
          <Grid
            item={true}
            xs={4}
          >
            <TextField
              size="small"
              variant="standard"
              placeholder="Add a title"
              {...register("name")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid
            item={true}
            xs={12}
          >
            <TextField
              size="small"
              variant="standard"
              placeholder="Write a comment"
              fullWidth={true}
              multiline={true}
              maxRows={4}
              {...register("description")}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid
          item={true}
          xs={2}
        >
          <Button
            disabled={buttonDisabled}
            variant='text'
            size="small"
            onClick={handleAddComment}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}