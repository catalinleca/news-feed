import {Optional, Model, DataTypes} from "sequelize";
import sequelize from "../utils/db";

export interface CompanyAttributes {
  id: number;
  name: string;
  catchPhrase: string | null;
  bs: string | null;
}

export interface CompanyCreationAttributes extends Optional<CompanyAttributes, "id"> {
}

class Company extends Model<CompanyAttributes, CompanyCreationAttributes> implements CompanyAttributes {
  public id!: number;
  public name!: string;
  public catchPhrase!: string | null;
  public bs!: string | null;
}

Company.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
  catchPhrase: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
  bs: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
}, {
  sequelize,
  tableName: "company"
})

export default Company;