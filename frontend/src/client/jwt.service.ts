import jwt from "jsonwebtoken";

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IDecodedToken {
  userId: string;
  email: string;
}

export const SESSION_KEY = "app-auth";

const getLocalAccessToken = () => {
  const rawTokens = localStorage.getItem(SESSION_KEY);

  if (!rawTokens) return

  try {
    return JSON.parse(rawTokens)?.accessToken
  } catch (err) {
    console.error('Failed to parse authTokens: ', err);
  }

  return
};

const getLocalRefreshToken = () => {
  const rawTokens = localStorage.getItem(SESSION_KEY);

  if (!rawTokens) return

  try {
    return JSON.parse(rawTokens)?.refreshToken
  } catch (err) {
    console.error('Failed to parse authTokens: ', err);
  }

  return
};

const decodeToken = (token: string): IDecodedToken | null => {
  const decoded = jwt.decode(token) as { [key: string]: any }
  if (!decoded) return null;

  return {
    userId: decoded.userId,
    email: decoded.email
  }

}
const isTokenExpired = (token: string): boolean => {
  if (!token) return true;

  const decoded = jwt.decode(token) as { [key: string]: any }
  if (!decoded || !decoded.exp) return true;

  const tokenExpDate = decoded.exp
  const expiresIn = tokenExpDate - Date.now() / 1000

  return !expiresIn || expiresIn < 0;
}

const getLocalTokens = (type?: "access" | "refresh") => {
  enum tokenTypes {
    access = "accessToken",
    refresh = "refreshToken"
  }

  const currentTokenType = type ? tokenTypes[type] : null;

  const rawTokens = localStorage.getItem(SESSION_KEY);

  if (!rawTokens) return

  try {
    const jsonTokens = JSON.parse(rawTokens)
    return currentTokenType
      ? jsonTokens?.[currentTokenType]
      : jsonTokens
  } catch (err) {
    console.error('Failed to parse authTokens: ', err);
  }

  return {}
}

const setAuthTokens = (tokens: IAuthTokens) =>
  localStorage.setItem(SESSION_KEY, JSON.stringify(tokens))

const logout = () => localStorage.removeItem(SESSION_KEY);

const isLoginValid = (): boolean => {
  const tokens = getLocalTokens() as IAuthTokens

  if (!tokens) return false

  const {accessToken, refreshToken} = tokens;
  const isAnyTokenInvalid = !accessToken || !refreshToken

  return !isAnyTokenInvalid;
}

const getCurrentTokenPayload = (): Partial<IDecodedToken> => {
  const decoded = decodeToken(getLocalAccessToken())

  return decoded || {}
}

const JwtService = {
  getLocalRefreshToken,
  setAuthTokens,
  logout,
  getLocalAccessToken,
  isTokenExpired,
  isLoginValid,
  decodeToken,
  getCurrentTokenPayload
}

export default JwtService