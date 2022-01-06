import React from "react";
import {useAuthState} from "../context/context";

export const PrivateComponent = ({componentUserId, children}) => {
  const state = useAuthState();
  const userId = state.user.userId

  const showComponent = componentUserId === userId

  return showComponent ? children : null;
}