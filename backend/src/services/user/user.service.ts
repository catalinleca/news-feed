import User from "../../models/User";
import {AddressService, Password} from "../index";
import BaseService from "../base.service";
import {CreateOptions, Options} from "sequelize";
import {userDto} from "./dto";

export default class UserService extends BaseService {
  constructor(seqConfig: CreateOptions) {
    super(seqConfig)
  }

  async registerUser(payload: any) {
    const {password} = payload;

    const hashedPassword = await Password.toHash(password);

    const user = await User.create({
      ...payload,
      password: hashedPassword
    }, {
      ...this.seqConfig as any,
    })

    const address = await AddressService.createAddress(payload.address, user, this.seqConfig);
    const userObject = (user as User).get({plain: true})

    return {
      ...userDto(userObject),
      address
    };

  }
}