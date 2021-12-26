import {Model, Association, DataTypes} from "sequelize";
import {v4 as uuidv4} from "uuid";
import User from "./User";
import sequelize from "../utils/db";
import "dotenv/config";

export interface RefreshTokenAttributes {
  token: string;
  expiryDate: Date;
  userId: number;
}

class RefreshToken extends Model<RefreshTokenAttributes> implements RefreshTokenAttributes {
  public token!: string;
  public expiryDate!: Date;
  public userId!: number;

  public static associations: {
    user: Association<RefreshToken, User>
  }

  async createToken(user: User) {
    let expiredAt = new Date();

    expiredAt.setSeconds(expiredAt.getSeconds() + +!process.env.JWT_REFRESH_EXPIRATION_DATE)

    let _token = uuidv4();

    const refreshToken = await RefreshToken.create({
      token: _token,
      userId: user.id,
      expiryDate: expiredAt
    })

    return refreshToken.token;
  }

  verifyExpiration(token: RefreshToken) {
    return token.expiryDate.getTime() < new Date().getTime();
  }
}

RefreshToken.init({
  token: {
    type: new DataTypes.STRING(128),
    primaryKey: true,
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  userId: {
    type: DataTypes.NUMBER,
    allowNull: false
  }
}, {
  sequelize,
  tableName: "refreshToken"
})

export default RefreshToken