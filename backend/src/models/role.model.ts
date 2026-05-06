import { DataTypes, Model, CreationOptional, BelongsToManyAddAssociationsMixin } from "sequelize";
import { sequelize } from "../database";
import { Role, RolePermission } from "@bookwebapp/types";
import PermissionModel from "./permission.model";

// The role's database model, implementing its shared type
export class RoleModel extends Model implements Role {
  declare roleId: CreationOptional<number>;
  declare name: string;
  declare permissions: RolePermission[];
  declare setPermissions: BelongsToManyAddAssociationsMixin<PermissionModel, number>;
}

RoleModel.init(
  {
    roleId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Role",
  },
);

export default RoleModel;
