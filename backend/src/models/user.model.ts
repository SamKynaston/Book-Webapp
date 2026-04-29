import { DataTypes, Model, CreationOptional, BelongsToManyAddAssociationsMixin, BelongsToManyRemoveAssociationMixin, BelongsToManyAddAssociationMixin } from "sequelize";
import { sequelize } from "../database";
import { User } from "@bookwebapp/types";
import { hashPassword } from "../utils/password";

import RoleModel from "./role.model";
import BookModel from "./book.model";

export class UserModel extends Model implements User {
  declare id: CreationOptional<number>;
  declare username: string;
  declare password: string;
  declare email: string;
  declare roles: RoleModel[];
  declare favourites: BookModel[];
  declare setRoles: BelongsToManyAddAssociationsMixin<RoleModel, number>; 
  declare setFavourites: BelongsToManyAddAssociationsMixin<BookModel, number>;
  declare removeFavourite: BelongsToManyRemoveAssociationMixin<BookModel, number>;
  declare addFavourite: BelongsToManyAddAssociationMixin<BookModel, number>;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "User",

    hooks: {
      beforeCreate: async (user: UserModel) => {
        if (user.password) {
          user.password = await hashPassword(user.password);
        }
      },
      
      beforeUpdate: async (user: UserModel) => {
        if (user.changed("password")) {
          user.password = await hashPassword(user.password);
        }
      },
    },
  },
);

UserModel.belongsToMany(RoleModel, {
  through: "UserRole",
  foreignKey: "userId",
  otherKey: "roleId",
  as: "roles",
});

RoleModel.belongsToMany(UserModel, {
  through: "UserRole",
  foreignKey: "roleId",
  otherKey: "userId",
  as: "users",
});

BookModel.belongsToMany(UserModel, {
  through: "UserFavourites",
  foreignKey: "bookId",
  otherKey: "userId",
  as: "favourites"
})

UserModel.belongsToMany(BookModel, {
  through: "UserFavourites",
  foreignKey: "userId",
  otherKey: "bookId",
  as: "favourites"
});

export default UserModel;
