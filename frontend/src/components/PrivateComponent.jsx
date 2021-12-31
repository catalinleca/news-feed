import React, {useEffect, useState} from "react";
import JwtService from "../client/jwt.service";
import {Redirect, Route} from "react-router-dom";

export const PrivateComponent = ({component: Component, ...rest}) => {
  const [showComponent, setShowComponent] = useState(false)

  useEffect(() => {
    const isLoginValid = JwtService.isLoginValid()

    if (isLoginValid) {
      setShowComponent(true)
    }
  }, [])

  return <Route
    {...rest}
    render={props => (
      showComponent
        ? <Component {...props}/>
        : <Redirect to={{
          pathname: "/login",
          state: { from: props.location }
        }}/>
    )}
  />
}