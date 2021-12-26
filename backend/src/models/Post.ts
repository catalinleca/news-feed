import {
  Model,
  Association,
  Optional,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, DataTypes
} from "sequelize";
import Comment from "./Comment";
import sequelize from "../utils/db";

export interface PostAttributes {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface PostCreationAttributes extends Optional<PostAttributes, "id"> {
}

class Post extends Model<PostAttributes, PostCreationAttributes> implements PostAttributes {
  public id!: number;
  public userId!: number;
  public title!: string;
  public body!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getComments!: HasManyGetAssociationsMixin<Comment>; // Note the null assertions!
  public addComment!: HasManyAddAssociationMixin<Comment, number>;
  public hasComment!: HasManyHasAssociationMixin<Comment, number>;
  public countComments!: HasManyCountAssociationsMixin;
  public createComment!: HasManyCreateAssociationMixin<Comment>;

  public readonly comments?: Comment;

  public static associations: {
    comments: Association<Post, Comment>
  }
}

Post.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
  body: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
}, {
  sequelize,
  tableName: "post"
})

export default Post;