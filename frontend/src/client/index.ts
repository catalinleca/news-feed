import AuthClient from "./auth";
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import PostsClient from "./posts";

interface IAppClient {
  readonly auth: AuthClient;
}

type requestInterceptor = {
  onFulfilled?:
    ((
      value: AxiosRequestConfig
    ) => AxiosRequestConfig | Promise<AxiosRequestConfig>)
    | undefined;
  onRejected?: ((error: any) => any) | undefined;
};

type responseInterceptors = {
  onFulfilled?:
    ((
      value: AxiosResponse<any>
    ) => AxiosResponse<any> | Promise<AxiosResponse<any>>)
    | undefined;
  onRejected?: ((error: any) => any) | undefined;
};


export default class AppClient implements IAppClient {
  public readonly instance: AxiosInstance;
  public auth: AuthClient;
  public posts: PostsClient

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create({
      timeout: 3000,
      headers: {
        "Content-Type": "application/json"
      },
      ...config
    })

    this.auth = new AuthClient(this.instance);
    this.posts = new PostsClient(this.instance);
  }

  addInterceptor = (
    type: "request" | "response",
    interceptor: requestInterceptor | responseInterceptors,
    ...rest: any
  ) => {
    return this.instance.interceptors[type].use(
      ...Object.values(interceptor),
      ...rest
    )
  }

  public removeInterceptor = (
    type: "response" | "request",
    interceptor: number
  ) => {
    this.instance.interceptors[type].eject(interceptor);
  };
}