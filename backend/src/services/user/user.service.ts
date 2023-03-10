import User from "../../models/User";
import {AddressService, Password} from "../index";
import BaseService from "../base.service";
import {CreateOptions} from "sequelize";
import {getUserDto, LoginUserDto} from "./dto";
import {ForbiddenError, UnauthorizedError} from "../../utils/errors";
import "dotenv/config";
import AuthService from "../auth";

export default class UserService extends BaseService {
  constructor(seqConfig: CreateOptions = {}) {
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
      ...getUserDto(userObject),
      address
    };
  }

  async signInUser({email, password}: LoginUserDto) {
    const user = await User.findOne({
      where: {
        email
      }
    })

    if (!user) {
      throw new ForbiddenError("Wrong username or password")
    }

    const isPasswordValid = await Password.compare(user.password, password)

    if (!isPasswordValid) {
      throw new ForbiddenError("Wrong username or password")
    }

    const authService = new AuthService();

    const accessToken = authService.signAccessToken({
      userId: user.id,
      email: user.email
    })
    const refreshToken = await authService.createRefreshToken(user);

    return {
      accessToken,
      refreshToken
    }
  }
}