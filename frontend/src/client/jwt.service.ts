import {AxiosRequestConfig} from "axios";
import AppClient from "./index";
import jwt from "jsonwebtoken";

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export const SESSION_KEY = "app-auth";

const getLocalAccessToken = () => {
  const rawTokens = sessionStorage.getItem(SESSION_KEY);

  if (!rawTokens) return

  try {
    return JSON.parse(rawTokens)?.accessToken
  } catch (err) {
    console.error('Failed to parse authTokens: ', err);
  }

  return
};

const getLocalRefreshToken = () => {
  const rawTokens = sessionStorage.getItem(SESSION_KEY);

  if (!rawTokens) return

  try {
    return JSON.parse(rawTokens)?.refreshToken
  } catch (err) {
    console.error('Failed to parse authTokens: ', err);
  }

  return
};

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

  const rawTokens = sessionStorage.getItem(SESSION_KEY);

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
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(tokens))

const logout = () => sessionStorage.removeItem(SESSION_KEY);

const isLoginValid = (): boolean => {
  const tokens = getLocalTokens() as IAuthTokens

  if (!tokens) return false

  const {accessToken, refreshToken} = tokens;
  const isAnyTokenInvalid = isTokenExpired(accessToken) || !refreshToken

  return !isAnyTokenInvalid;
}

const requestFulfilledAuthInterceptor = ({
                                           header = "authorization",
                                           headerPrefix = "Bearer",
                                         } = {}) =>
  (reqConfig: AxiosRequestConfig): AxiosRequestConfig => {
    const accessToken = getLocalAccessToken()
    if (accessToken) {
      reqConfig.headers![header] = [headerPrefix, accessToken].join(" ")
    }

    return reqConfig
  }

const responseRejectedAuthInterceptor = ({
                                           appClient
                                         }: {
  appClient: AppClient
}) => async (err: any) => {
  const originalConfig = err.config;

  if (originalConfig !== "/auth/signin" && err.response) {
    if (err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const accessTokens: IAuthTokens = await appClient.auth.requestAccessTokens(JwtService.getLocalRefreshToken())

        JwtService.setAuthTokens(accessTokens)

        return appClient.instance(originalConfig)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  }

  return Promise.reject(err)
}

const JwtService = {
  getLocalRefreshToken,
  setAuthTokens,
  logout,
  requestFulfilledAuthInterceptor,
  responseRejectedAuthInterceptor,
  isTokenExpired,
  isLoginValid
}

export default JwtService