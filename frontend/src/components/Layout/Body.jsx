import * as React from "react";
import { Grid } from "@mui/material";

export const Body = ({ children }) => {
  return (
    <Grid container={true} justifyContent="center" spacing={2}>
      <Grid item={true} xs={8}>
        {children}
      </Grid>
    </Grid>
  );
};
