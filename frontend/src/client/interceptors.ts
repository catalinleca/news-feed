import {AxiosRequestConfig} from "axios";
import AppClient from "./index";
import JwtService, {IAuthTokens} from "./jwt.service";

export const requestFulfilledAuthInterceptor = ({
                                           header = "authorization",
                                           headerPrefix = "Bearer",
                                         } = {}) =>
  (reqConfig: AxiosRequestConfig): AxiosRequestConfig => {

    const accessToken = JwtService.getLocalAccessToken()
    if (accessToken) {
      reqConfig.headers![header] = [headerPrefix, accessToken].join(" ")
    }

    return reqConfig
  }

export const responseRejectedAuthInterceptor = ({
                                           appClient
                                         }: {
  appClient: AppClient
}) => async (err: any) => {
  console.log("err: ", err);
  console.log("err.response: ", err.response);

  const originalConfig = err.config;

  if (originalConfig !== "/auth/signin" && err.response) {
    if (err.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const accessTokens: IAuthTokens = await appClient.auth.requestAccessTokens(JwtService.getLocalRefreshToken())

        JwtService.setAuthTokens(accessTokens)

        return appClient.instance(originalConfig)
      } catch (error) {
        JwtService.logout();
        window.location.replace("/login");
        return Promise.reject(error)
      }
    }
  }

  return Promise.reject(err)
}