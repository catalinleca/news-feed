import React from "react";
import {Grid, Skeleton} from "@mui/material";

export const CommentLoader = () => (
  <Grid
    container={true}
    spacing={1}
    p={2}
  >
    <Grid
      item={true}
    >
      <Skeleton animation="wave" variant="circular" width={40} height={40} />
    </Grid>
    <Grid
      item={true}
      sx={{
        flexGrow: 1
      }}
    >
      <Skeleton animation="wave" variant="text" sx={{width: "50%"}} />
      <Skeleton animation="wave" variant="text" sx={{width: "100%"}} />
    </Grid>
  </Grid>
)