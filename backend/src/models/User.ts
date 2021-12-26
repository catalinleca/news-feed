import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin, HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  Model,
  Optional
} from "sequelize";
import sequelize from "../utils/db";
import Address from "./Address";
import Company from "./Company";
import Comment from "./Comment";
import Post from "./Post";
import RefreshToken from "./RefreshToken";

export interface UserAttributes {
  id: number;
  companyId: number;
  name: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  website: string | null;
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id" | "website"> {
}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public companyId!: number;
  public name!: string;
  public username!: string;
  public password!: string;
  public email!: string;
  public phone!: string;
  public website!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getAddress!: HasOneGetAssociationMixin<Address>; // Note the null assertions!
  public setAddress!: HasOneSetAssociationMixin<Address, number>;
  public createAddress!: HasOneCreateAssociationMixin<Address>;

  public getCompany!: HasOneGetAssociationMixin<Company>; // Note the null assertions!
  public setCompany!: HasOneSetAssociationMixin<Company, number>;
  public createCompany!: HasOneCreateAssociationMixin<Company>;

  public getPosts!: HasManyGetAssociationsMixin<Post>; // Note the null assertions!
  public addPost!: HasManyAddAssociationMixin<Post, number>;
  public hasPost!: HasManyHasAssociationMixin<Post, number>;
  public countPosts!: HasManyCountAssociationsMixin;
  public createPost!: HasManyCreateAssociationMixin<Post>;

  public getComments!: HasManyGetAssociationsMixin<Comment>; // Note the null assertions!
  public hasComment!: HasManyHasAssociationMixin<Comment, number>;
  public countComments!: HasManyCountAssociationsMixin;

  public createRefreshToken!: HasOneCreateAssociationMixin<RefreshToken>;

  public readonly address?: Address;
  public readonly company?: Company;
  public readonly posts?: Post;
  public readonly comments?: Company;
  public readonly refreshToken?: RefreshToken;

  public static associations: {
    address: Association<User, Address>
    company: Association<User, Company>
    posts: Association<User, Post>
    comments: Association<User, Comment>
    refreshToken: Association<User, RefreshToken>
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    phone: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    website: {
      type: new DataTypes.STRING(128),
    },
  }, {
    sequelize,
    tableName: "users"
  }
)

export default User;