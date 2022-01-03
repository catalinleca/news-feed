import jwt, {JwtPayload, TokenExpiredError} from "jsonwebtoken";
import User from "../../models/User";
import {v4 as uuidv4} from "uuid";
import RefreshToken from "../../models/RefreshToken";
import {ForbiddenError, UnauthorizedError} from "../../utils/errors";
import {BadRequestError} from "../../utils/errors";
import {NextFunction} from "express";

export interface IAccessTokenPayload {
  userId: number;
  email: string;
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
      throw new ForbiddenError()
    }

    if (this.isRefreshTokenExpired(dbRefreshToken)) {
      await RefreshToken.destroy({
        where: {
          id: dbRefreshToken.id
        }
      })

      throw new ForbiddenError("Refresh token expired. Please login again!")
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

  checkAccessToken(token: string, next: NextFunction, successCb: any): void {
    /** TBD: Catch jwt expired error */
    jwt.verify(token, this.secret as string, ((err, decode) => {
      if (err) {
        if (err instanceof TokenExpiredError) {
          next(new UnauthorizedError("Unauthorized! Access token expired"))
        }

        next(new UnauthorizedError())
      }

      successCb(decode)
      next()
    }))
  }

}