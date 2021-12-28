import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import {SchemaObject} from "ajv";
import BaseClient from "./index";

interface IBaseCrudClient<dataType> {
  getAll: (config?: AxiosRequestConfig) => Promise<AxiosResponse<dataType[]>>;
  getById: (
    id: number,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<dataType>>;
  create: (
    body: dataType,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<dataType>>;
  update: (
    id: number,
    body: Partial<dataType>,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<dataType>>;
  deleteById: (
    id: number,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<void>>;
}

export default class BaseCrudClient<dataType>
  extends BaseClient
  implements IBaseCrudClient<dataType> {

  constructor(instance: AxiosInstance, url: string, jsonSchema?: SchemaObject) {
    super(instance, url, jsonSchema)
  }

  getAll = async (config?: AxiosRequestConfig) => {
    const response = await this.instance.get<Array<dataType>>(
      `/${this.getUrl()}`,
      config
    );
    this.validate(response.data, "getAll", "response", {
      type: "array",
      items: this.jsonSchema
    });
    return response;
  };

  getById = async (id: number, config?: AxiosRequestConfig) => {
    this.validate(id, "getById", "request: id", {type: "number"});
    const response = await this.instance.get<dataType>(
      `/${this.getUrl()}/${id}`,
      config
    );
    this.validate(response.data, "getById", "response");
    return response;
  };

  create = async (body: dataType, config?: AxiosRequestConfig) => {
    this.validate(body, "create", "request: body");
    const response = await this.instance.post<dataType>(
      `/${this.getUrl()}`,
      body,
      config
    );
    this.validate(response.data, "create", "response");
    return response;
  };

  update = async (
    id: number,
    body: Partial<dataType>,
    config?: AxiosRequestConfig
  ) => {
    this.validate(id, "update", "request: id", {type: "number"});
    this.validate(
      body,
      "update",
      "request body",
    );
    const response = await this.instance.put<dataType>(
      `/${this.getUrl()}/${id}`,
      body,
      config
    );
    this.validate(response.data, "update", "response");
    return response;
  };

  deleteById = async (id: number, config?: AxiosRequestConfig) => {
    this.validate(id, "delete", "request: id", {type: "number"});
    const response = await this.instance.delete<void>(
      `/${this.getUrl()}/${id}`,
      config
    );
    this.validate(response.data, "delete", "response", {type: "null"});
    return response;
  };
}