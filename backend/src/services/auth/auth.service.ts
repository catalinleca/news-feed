import jwt from "jsonwebtoken";
import User from "../../models/User";
import {v4 as uuidv4} from "uuid";
import RefreshToken from "../../models/RefreshToken";
import {InvalidCredentialsError} from "../../utils/errors";
import {BadRequestError} from "../../utils/errors/badRequestError";
import exp from "constants";

interface IAccessTokenPayload {
  [key: string]: any
}

export default class AuthService {
  private secret = process.env.SECRET;
  private refreshTokenExpDate = process.env.JWT_REFRESH_EXPIRATION_DATE;

  signAccessToken(payload: IAccessTokenPayload) {
    return jwt.sign(payload, this.secret as string, {
      expiresIn: this.refreshTokenExpDate
    })
  }

  async createRefreshToken(user: User) {
    const expiredAt = new Date(new Date().getTime() + 900000);
    console.log(expiredAt)
    let _token = uuidv4();

    /** TBD: Might use user.createRefreshToken from associations */
    const refreshToken = await RefreshToken.create({
      token: _token,
      userId: user.id,
      expiryDate: expiredAt
    })

    return refreshToken.token;
  }

  isRefreshTokenExpired(token: RefreshToken): boolean {
    return RefreshToken.isExpired(token);
  }

  async refreshTokens(refreshToken: string) {
    if (!refreshToken) {
      throw new BadRequestError("Refresh token is required!")
    }

    const dbRefreshToken = await RefreshToken.findOne({ where: {token: refreshToken }})

    if (!dbRefreshToken) {
      /** TBD: make errors more understandable for debugging */
      throw new InvalidCredentialsError()
    }

    if (this.isRefreshTokenExpired(dbRefreshToken)) {
      await RefreshToken.destroy({
        where: {
          id: dbRefreshToken.id
        }
      })

      throw new BadRequestError("Refresh token expired. Please login again!")
    }

    const user = await dbRefreshToken.getUser()

    const newAccessToken = this.signAccessToken({
      userId: user.id,
      email: user.email
    })

    return {
      accessToken: newAccessToken,
      refreshToken: refreshToken
    }
  }
}