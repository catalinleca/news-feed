import AppClient from "./index";
import {AxiosResponse} from "axios";
import {requestFulfilledAuthInterceptor, responseRejectedAuthInterceptor} from "./interceptors";

export const defaultAppFactory = (
  apiUrl: string,
) => {
  apiUrl = apiUrl.replace(/\/*$/, "")

  const appClient = new AppClient({
    baseURL: apiUrl
  })

  appClient.addInterceptor("request", {
    onFulfilled: requestFulfilledAuthInterceptor()
  })
  appClient.addInterceptor("response", {
    onFulfilled: (res: AxiosResponse) => res,
    onRejected: responseRejectedAuthInterceptor({
      appClient
    })
  })

  return appClient;
}