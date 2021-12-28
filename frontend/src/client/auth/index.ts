import {AxiosInstance, AxiosRequestConfig} from "axios";
import BaseClient from "../base";
import JwtService, {IAuthTokens} from "../jwt.service";

interface ICredentials {
  email: string;
  password: string;
}

interface IAddress {
  street: string;
  city: string;
  suite: string;
}

interface IRegisterCredentials {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
}

interface IRegisterBusiness {
  companyId: string;
  name: string;
  phone: string;
  address: IAddress
}

interface IRegister extends IRegisterBusiness, IRegisterCredentials {
}

const authSchema = {
  $id: "#Auth",
  $schema: "http://json-schema.org/schema#",
  type: "object",
  properties: {
    accessToken: {
      type: "string"
    },
    refreshToken: {
      type: "string"
    }
  },
  required: ["accessToken", "refreshToken"],
  additionalProperties: false
};

/** TBD: registerSchema */
const registerSchema = {}

const credentialsSchema = {
  type: "object",
  properties: {
    email: {type: "string"},
    password: {type: "integer"}
  },
  required: ["email", "password"]
};

const LOGIN_URL = "/signin"
const REGISTER_URL = "/signup"
const REFRESH_TOKEN_URL = "/refreshToken"

export default class AuthClient extends BaseClient {
  constructor(instance: AxiosInstance) {
    super(instance, "auth")
  }

  requestAccessTokens = async (refreshToken: string): Promise<IAuthTokens> => {
    if (!refreshToken) {
      throw new Error("refreshToken required to get new access token!")
    }

    const response = await this.instance.post<IAuthTokens>(
      `/${this.getUrl()}/${REFRESH_TOKEN_URL}`, {
        refreshToken
      }
    )

    this.validate(response.data, "requestAccessTokens", "response", authSchema);

    return response.data;
  }

  login = async (credentials: ICredentials, config?: AxiosRequestConfig) => {
    let errorMessage = "login";

    if (!credentials.email || !credentials.password) {
      errorMessage = "Invalid credentials!"
    }

    this.validate(credentials, "login", errorMessage, credentialsSchema);

    const response = await this.instance.post<IAuthTokens>(
      `/${this.getUrl()}/${LOGIN_URL}`,
      credentials,
      config
    )

    this.validate(response.data, "login", "response", authSchema);
    JwtService.setAuthTokens(response.data)

    return true;
  }

  register = async (registerCredentials: IRegister, config?: AxiosRequestConfig) => {
    let errorMessage = "register"

    this.validate(registerCredentials, "register", errorMessage, registerSchema)

    const response = await this.instance.post(
      `/${this.getUrl()}/${REGISTER_URL}`,
      registerCredentials,
      config
    )

    this.validate(response.data, "register", "response");

    return response
  }

  logout = () => {
    JwtService.logout()
  }

}