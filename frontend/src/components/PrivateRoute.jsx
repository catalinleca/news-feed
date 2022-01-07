import {Redirect, Route} from "react-router-dom";
import JwtService from "../client/jwt.service";

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