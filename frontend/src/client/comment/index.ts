import BaseCrudClient from "../base/baseCrudClient";
import {BaseInterface} from "../base";
import {AxiosInstance, AxiosRequestConfig} from "axios";
import JwtService from "../jwt.service";

interface IComment extends BaseInterface {
  id: number;
  postId: number;
  userId: number;
  title: string;
  body: string;
}

class CommentsClient extends BaseCrudClient<IComment> {
  constructor(instance: AxiosInstance) {
    super(instance, "api/comments")
  }

  createWithPost = async (body: Partial<IComment>, postId: number, config?: AxiosRequestConfig) => {
    this.validate(body, "create", "request: body");
    const response = await this.instance.post<Partial<IComment>>(
      `/api/posts/${postId}/comments`,
      body,
      config
    );
    this.validate(response.data, "create", "response");
    return response;
  };


  createWithUserId = async (body: Partial<Omit<IComment, "userId">>, config?: AxiosRequestConfig) => {
    let newBody: Partial<IComment> = {
      ...body
    };

    this.validate(body, "create", "request: body");

    const {userId} = JwtService.getCurrentTokenPayload()
    if (userId) {
      newBody.userId = +userId
    }

    const response = await this.instance.post<IComment>(
      `/${this.getUrl()}`,
      body,
      config
    );
    this.validate(response.data, "create", "response");
    return response;
  };
}

export default CommentsClient;