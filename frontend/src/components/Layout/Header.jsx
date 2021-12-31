import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {Button, Grid, Link, Typography} from "@mui/material";
import JwtService from "../../client/jwt.service";
import {useAuthState} from "../../context/context";

export const Header = (props) => {
  const state = useAuthState()

  console.log("state: ", state);

  const logoutHandler = () => {
    JwtService.logout()
    props.history.push('/login')
  }

  const logoutButton = JwtService.isLoginValid() ? (
    <Button
      onClick={logoutHandler}
      style={{
        color: "white"
      }}
    >
      Logout
    </Button>
  ) : null


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Grid
            container={true}
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item={true}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Genos App
              </Typography>
            </Grid>
            <Grid item={true}>
              {logoutButton}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
