import { DataTypes, Model, CreationOptional, BelongsToManyAddAssociationsMixin } from "sequelize";
import { sequelize } from "../database";
import { User } from "@bookwebapp/types";
import RoleModel from "./role.model";

export class UserModel extends Model implements User {
  declare id: CreationOptional<number>;
  declare username: string;
  declare password: string;
  declare email: string;
  declare roles: RoleModel[];
  declare setRoles: BelongsToManyAddAssociationsMixin<RoleModel, number>; 
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

export default UserModel;
