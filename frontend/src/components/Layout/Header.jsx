import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {Button, Grid, Typography} from "@mui/material";
import JwtService from "../../client/jwt.service";
import {AuthDispatchContext, AuthStateContext} from "../../context/auth/authContext";
import { useHistory } from "react-router-dom";

export const Header = () => {
  const state = React.useContext(AuthStateContext);
  const dispatch = React.useContext(AuthDispatchContext);

  let history = useHistory();

  const logoutHandler = () => {
    dispatch({TYPE: "LOGOUT"})
    JwtService.logout()
    history.push('/login')
  }

  const registerHandler = () => {
    history.push('/register')
  }

  const logoutButton = (
    <Button
      onClick={logoutHandler}
      style={{
        color: "white"
      }}
    >
      Logout
    </Button>
  )

  const registerButton = (
    <Button
      onClick={registerHandler}
      style={{
        color: "white"
      }}
    >
      Register
    </Button>
  )


  const actionButton = state.isLoggedIn ? logoutButton : registerButton;

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
              {actionButton}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
