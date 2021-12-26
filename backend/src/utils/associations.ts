import User from "../models/User";
import Address from "../models/Address";
import Geo from "../models/Geo";
import Company from "../models/Company";
import Post from "../models/Post";
import Comment from "../models/Comment";
import RefreshToken from "../models/RefreshToken";

const createAssociations = () => {
  User.hasOne(Address, {foreignKey: "userId"});
  Address.belongsTo(User, {foreignKey: "userId"});
  Address.hasOne(Geo, {foreignKey: "addressId"});
  Geo.belongsTo(Address, {foreignKey: "addressId"});

  User.belongsTo(Company, {foreignKey: "companyId"});
  Company.hasMany(User, {foreignKey: "companyId"});

  User.hasMany(Post, {foreignKey: "userId"})
  Post.belongsTo(User, {foreignKey: "userId"})
  User.hasMany(Comment, {foreignKey: "userId"})
  Comment.belongsTo(User, {foreignKey: "userId"})

  Post.hasMany(Comment, {foreignKey: "postId"})
  Comment.belongsTo(Post, {foreignKey: "postId"})

  RefreshToken.belongsTo(User, {foreignKey: "userId"})
  User.hasOne(RefreshToken, {foreignKey: "userId"})
}

export default createAssociations;