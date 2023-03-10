import React from "react";
import {useAuthState} from "../context";

export const WithUser = ({children}) => {
  const state = useAuthState();
  const userId = state.user.userId

  return (
    <React.Fragment>
      {children({
        userId
      })}
    </React.Fragment>
  )

}