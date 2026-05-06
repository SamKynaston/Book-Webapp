import { DataTypes, Model, CreationOptional } from "sequelize";
import { sequelize } from "../database";
import { PERMISSIONS_STRING, RolePermission } from "@bookwebapp/types";
import RoleModel from "./role.model";

// The permission's database model, implementing its shared type
export class PermissionModel extends Model implements RolePermission {
  declare permissionId: CreationOptional<number>;
  declare permission_string: PERMISSIONS_STRING;
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

// Many-to-Many junction tables through RolePermissions
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
