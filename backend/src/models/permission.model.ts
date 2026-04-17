import { DataTypes, Model, CreationOptional } from "sequelize";
import { sequelize } from "../database";
import { RolePermission } from "@bookwebapp/types";
import RoleModel from "./role.model";

export class PermissionModel extends Model implements RolePermission {
  declare permissionId: CreationOptional<number>;
  declare permission_string: string;
}

PermissionModel.init(
  {
    permissionId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    permission_string: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Permission",
  },
);

PermissionModel.belongsToMany(RoleModel, {
  through: "RolePermissions",
  foreignKey: "permissionId",
  otherKey: "roleId",
  as: "roles",
});

RoleModel.belongsToMany(PermissionModel, {
    through: "RolePermissions",
    foreignKey: "roleId",
    otherKey: "permissionId",
    as: "permissions",
});

export default PermissionModel;
