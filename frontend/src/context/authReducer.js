const JwtService = require("../client/jwt.service");

export const initialState = {
  isLoggedIn: false,
  user: null,
  loading: false
};

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...initialState,
        loading: true
      };
    case "LOGIN_SUCCESS":
      const accessToken = JwtService.getLocalAccessToken();
      const user = JwtService.decodeToken(accessToken);

      return {
        ...state,
        loading: false,
        isLoggedIn: true,
        user,
      };
    case "LOGOUT_SUCCESS":
      JwtService.logout()
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        user: null
      };
    default:
      return state;
  }
};

export default AuthReducer