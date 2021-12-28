import React from "react";
import JwtService from "../client/jwt.service";
import {Redirect, Route} from "react-router-dom";

export const PrivateRoute = ({component: Component, ...rest}) => {
  const isLoginValid = JwtService.isLoginValid();

  return <Route
    {...rest}
    render={props => (
      isLoginValid
        ? <Component {...props}/>
        : <Redirect to={{
          pathname: "/login",
          state: { from: props.location }
        }}/>
    )}
  />
}