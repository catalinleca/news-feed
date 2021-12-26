import {Model, Association, DataTypes, Optional, HasOneGetAssociationMixin} from "sequelize";
import User from "./User";
import sequelize from "../utils/db";
import "dotenv/config";

export interface RefreshTokenAttributes {
  id: number;
  token: string;
  expiryDate: Date;
  userId: number;
}

export interface RefreshTokenCreationAttributes extends Optional<RefreshTokenAttributes, "id"> {
}

class RefreshToken extends Model<RefreshTokenAttributes, RefreshTokenCreationAttributes> implements RefreshTokenAttributes {
  public id!: number;
  public token!: string;
  public expiryDate!: Date;
  public userId!: number;

  public static associations: {
    user: Association<RefreshToken, User>
  }

  public getUser!: HasOneGetAssociationMixin<User>

  static isExpired(token: RefreshToken): boolean {
    return token.expiryDate.getTime() < new Date().getTime();
  }

}

RefreshToken.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  token: {
    type: new DataTypes.STRING(128),
    allowNull: true,
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