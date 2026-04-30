import { DataTypes, Model, CreationOptional } from "sequelize";
import { sequelize } from "../database";
import { UserModel } from "./user.model";

export default class PasswordResetModel extends Model {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare token: string;
  declare expiresAt: Date;
}

PasswordResetModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PasswordReset",
  }
);

PasswordResetModel.belongsTo(UserModel, {
  foreignKey: "userId",
  as: "user",
  onDelete: "CASCADE",
});