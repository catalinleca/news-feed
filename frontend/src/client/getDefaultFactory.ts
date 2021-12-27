import AppClient from "./index";

export const defaultAppFactory = (
  apiUrl: string,
  refreshTokenUrl: string
) => {
  apiUrl = apiUrl.replace(/\/*$/, "")

  const appClient = new AppClient({
    baseURL: apiUrl
  })

  appClient.addInterceptor("request", {

  })

  return appClient;
}