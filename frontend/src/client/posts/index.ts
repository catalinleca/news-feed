import BaseCrudClient from "../base/baseCrudClient";
import {AxiosInstance} from "axios";
import {BaseInterface} from "../base";

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