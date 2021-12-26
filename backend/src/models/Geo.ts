import {Optional, Model, DataTypes} from "sequelize";
import Address from "./Address";
import sequelize from "../utils/db";

export interface GeoAttributes {
  id: number;
  addressId: number;
  lat: string;
  lng: string
}

export interface GeoCreationAttributes extends Optional<GeoAttributes, "id"> {
}

class Geo extends Model<GeoAttributes, GeoCreationAttributes> implements GeoAttributes {
  public id!: number
  public addressId!: number
  public lat!: string
  public lng!: string
}

Geo.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  addressId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  lat: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
  lng: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
}, {
  sequelize,
  tableName: "geo"
});


export default Geo
