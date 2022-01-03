import BaseCrudClient from "../base/baseCrudClient";
import {BaseInterface} from "../base";
import {AxiosInstance} from "axios";

interface ICompany extends BaseInterface {
  id: number;
  name: string,
  catchPhrase: string,
  bs: string,
}

class CompanyClient extends BaseCrudClient<ICompany> {
  constructor(instance: AxiosInstance) {
    super(instance, "api/companies")
  }
}

export default CompanyClient