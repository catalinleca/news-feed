import BaseCrudClient from "../base/baseCrudClient";
import {BaseInterface} from "../base";
import {AxiosInstance} from "axios";

interface IPost extends BaseInterface {
  id: number;
  userId: number;
  title: string;
  body: string;
}

class PostsClient extends BaseCrudClient<IPost> {
  constructor(instance: AxiosInstance) {
    super(instance, "api/posts")
  }
}

export default PostsClient;