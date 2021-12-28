import * as React from "react";
import { Header } from "./Header";
import { Grid } from "@mui/material";
import { Body } from "./Body";

export const Layout = ({ children, ...rest }) => {
  return (
    <Grid {...rest}>
      <Header />
      <Body>{children}</Body>
    </Grid>
  );
};
