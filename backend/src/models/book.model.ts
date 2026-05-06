import {
  DataTypes,
  Model,
  CreationOptional,
  BelongsToManyAddAssociationsMixin,
} from "sequelize";
import { sequelize } from "../database";
import { Book, Author } from "@bookwebapp/types";
import AuthorModel from "./author.model";

// Database model for books, implementing its shared type
export class BookModel extends Model implements Book {
  declare id: CreationOptional<number>;
  declare title: string;
  declare first_publish_year: number;
  declare authors: Author[];
  declare cover_id?: number | undefined;
  declare is_recommended?: boolean;
  declare setAuthors: BelongsToManyAddAssociationsMixin<AuthorModel, number>;
}

BookModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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

    is_recommended: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Book",
  },
);

// MANY-TO-MANY relationship with AuthorModel, through the AuthorBook junction table
BookModel.belongsToMany(AuthorModel, {
  through: "AuthorBook",
  foreignKey: "bookId",
  otherKey: "authorId",
  as: "authors",
  onDelete: "CASCADE", // If the book is deleted, then delete the associated table
});

// MANY-TO-MANY relationship with BookModel, through an authors table
AuthorModel.belongsToMany(BookModel, {
  through: "AuthorBook",
  foreignKey: "authorId",
  otherKey: "bookId",
  as: "books",
  onDelete: "CASCADE", // If the author is deleted, then delete the associated table
});

export default BookModel;
