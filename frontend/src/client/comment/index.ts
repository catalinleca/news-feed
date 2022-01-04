import BaseCrudClient from "../base/baseCrudClient";
import {BaseInterface} from "../base";
import {AxiosInstance} from "axios";

interface IComment extends BaseInterface {
  id: number;
  userId: number;
  title: string;
  body: string;
}

class CommentsClient extends BaseCrudClient<IComment> {
  constructor(instance: AxiosInstance) {
    super(instance, "api/comments")
  }
}

export default CommentsClient;