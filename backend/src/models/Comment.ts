import {
  DataTypes,
  Model,
  Optional
} from "sequelize";
import sequelize from "../utils/db";

export interface CommentAttributes {
  id: number;
  postId: number;
  userId: number;
  name: string;
  email: string;
  body: string;
}

export interface CommentCreationAttributes extends Optional<CommentAttributes, "id"> {
}

class Comment extends Model<CommentAttributes, CommentCreationAttributes> implements CommentAttributes {
  public id!: number;
  public postId!: number;
  public userId!: number;
  public name!: string;
  public email!: string;
  public body!: string;
}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
  email: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
  body: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
}, {
  sequelize,
  tableName: "comment"
})

export default Comment;