import { Grid } from "@mui/material";
import { Body, Header } from "./";

export const Layout = ({ children, ...rest }) => {
  return (
    <Grid {...rest}>
      <Header />
      <Body>{children}</Body>
    </Grid>
  );
};
