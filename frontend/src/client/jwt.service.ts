export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export const SESSION_KEY = "app-auth";

const setAuthTokens = (tokens: IAuthTokens) =>
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(tokens))

const logout = () => sessionStorage.removeItem(SESSION_KEY);


const JwtService = {
  setAuthTokens,
  logout
}

export default JwtService