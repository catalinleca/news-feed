import {CreateOptions} from "sequelize";

export default class BaseService {
  protected readonly seqConfig: CreateOptions;

  constructor(seqConfig: CreateOptions) {
    this.seqConfig = seqConfig;
  }
}