import { DataTypes, Model, CreationOptional } from "sequelize";
import { sequelize } from "../database";
import { Author } from "@bookwebapp/types";

export class AuthorModel extends Model implements Author {
  declare id: CreationOptional<number>;
  declare name: string;
}

AuthorModel.init(
  {
    id: {
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
    modelName: "Author",
  },
);

export default AuthorModel;
