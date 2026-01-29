import { DataTypes, Model, CreationOptional } from "sequelize";
import { sequelize } from "../database";
import { Book, Author } from "@bookwebapp/types";

export class BookModel extends Model implements Book {
  declare id: CreationOptional<number>;
  declare key: string;
  declare title: string;
  declare first_publish_year: number;
  declare cover_id?: number | undefined;
  declare authors?: Author[];
  declare isRecommended?: boolean;
}

BookModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    first_publish_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    cover_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    authors: {
      type: DataTypes.JSONB,
      allowNull: false,
    },

    isRecommended: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Book",
  },
);

export default BookModel;
