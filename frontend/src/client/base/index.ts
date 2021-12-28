import {AxiosInstance} from "axios";
import {SchemaObject} from "ajv";

export interface BaseInterface {
  createdAt: string
  updatedAt: string
}

export default class BaseClient {
  private urlAppender: string

  constructor(
    protected readonly instance: AxiosInstance,
    private readonly url: string,
    protected readonly jsonSchema?: SchemaObject
  ) {
    this.urlAppender = ""
  }

  protected appendUrl(appendString: string) {
    this.urlAppender = appendString;
  }

  protected getUrl() {
    return this.url + this.urlAppender;
  }

  /** TBD: Validate incoming/outgoing data
   *  Validation is not currently implemented thus all
   *  this.validate calls will return true
   * */
  protected validate = (
    body: unknown,
    requestName: string,
    detail: string,
    schema?: SchemaObject
  ) => {
    // schema = schema ? schema : this.jsonSchema;
    // if (!schema) {
    //   throw new Error("jsonSchema must be set or a schema must be provided!");
    // }
  };
}