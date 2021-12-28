import AppClient from "./index";
import JwtService from "./jwt.service";
import {AxiosResponse} from "axios";

export const defaultAppFactory = (
  apiUrl: string,
) => {
  apiUrl = apiUrl.replace(/\/*$/, "")

  const appClient = new AppClient({
    baseURL: apiUrl
  })

  appClient.addInterceptor("request", {
    onFulfilled: JwtService.requestFulfilledAuthInterceptor()
  })
  appClient.addInterceptor("response", {
    onFulfilled: (res: AxiosResponse) => res,
    onRejected: JwtService.responseRejectedAuthInterceptor({
      appClient
    })
  })

  return appClient;
}