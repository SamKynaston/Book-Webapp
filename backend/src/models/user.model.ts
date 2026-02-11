import { DataTypes, Model, CreationOptional } from "sequelize";
import { sequelize } from "../database";
import { User } from "@bookwebapp/types";

export class UserModel extends Model implements User {
  declare id: CreationOptional<number>;
  declare username: string;
  declare password: string;
  declare email: string;
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

export default UserModel;
