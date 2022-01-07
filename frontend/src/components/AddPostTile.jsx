import {Card, Grid, TextField} from "@mui/material";
import * as React from "react";

export const AddPostTile = ({clickHandler}) => {
  return (
    <Grid
      container
      item
      justifyContent="center"
      mt={2}
      xs={8}
    >
      <Card sx={{width: 645, height: 75, borderRadius: 20}}>
        <Grid
          container={true}
          alignItems="center"
          justifyContent="center"
          sx={{
            height: "100%"
          }}
        >
          <Grid
            item={true}
            xs={7}
          >
            <TextField
              size="small"
              variant="standard"
              placeholder="What's on your mind?"
              fullWidth={true}
              onClick={clickHandler}
            />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}