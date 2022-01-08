import React from "react";
import {Grid, Skeleton, Stack} from "@mui/material";

export const PostLoader = (props) => (
  <Grid
    container
    justifyContent="center"
    item
    spacing={1}
    mt={2}
    xs={8}
    {...props}
  >
    <Stack spacing={1} sx={{
      width: "100%"
    }}>
      <Skeleton animation="wave" variant="text" sx={{width: "50%"}} />
      <Skeleton animation="wave" variant="circular" width={60} height={60} />
      <Skeleton animation="wave" variant="rectangular" height={210}/>
      <Skeleton animation="wave" variant="rectangular" height={110}/>
    </Stack>
  </Grid>
)