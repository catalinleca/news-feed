import AuthClient from "./auth";
import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

interface IApiClient {
  readonly auth: AuthClient;
}

export default class ApiClient implements IApiClient {
  public readonly instance: AxiosInstance;
  public auth: AuthClient;

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create({
      timeout: 3000,
      ...config
    })

    this.auth = new AuthClient(this.instance);
  }
}