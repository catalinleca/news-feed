import {
  Association, DataTypes,
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  Model,
  Optional
} from "sequelize";
import Geo from "./Geo";
import sequelize from "../utils/db";

export interface AddressAttributes {
  id: number,
  userId: number;
  street: string;
  suite: string
  city: string
  zipcode: string | null
}

export interface AddressCreationAttributes extends Optional<AddressAttributes, "id" | "zipcode"> {
}

class Address extends Model<AddressAttributes, AddressCreationAttributes> implements AddressAttributes {
  public id!: number
  public userId!: number
  public street!: string
  public suite!: string
  public city!: string
  public zipcode!: string | null

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getGeo!: HasOneGetAssociationMixin<Geo>
  public updateGeo!: HasOneSetAssociationMixin<Geo, number>
  public createGeo!: HasOneCreateAssociationMixin<Geo>

  public readonly geo?: Geo;

  public static associations: {
    geo: Association<Address, Geo>
  }
}

Address.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  street: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
  suite: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
  city: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
  zipcode: {
    type: new DataTypes.STRING(128),
    allowNull: true
  },
}, {
  sequelize,
  tableName: "address"
})

export default Address