import JwtService from "../client/jwt.service";

export const initialState = {
  isLoggedIn: JwtService.isLoginValid(),
  user: JwtService.getCurrentTokenPayload(),
  loading: false
};

const AuthReducer = (state, action) => {
  switch (action.TYPE) {
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
    case "LOGOUT":
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