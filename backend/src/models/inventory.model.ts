import { DataTypes, Model, CreationOptional, ForeignKey } from "sequelize";
import { sequelize } from "../database";
import BookModel from "./book.model";
import { InventoryStatus } from "@bookwebapp/types";

export class InventoryModel extends Model {
    declare id: CreationOptional<number>;
    declare bookId: ForeignKey<number>;
    declare location: string;
    declare status: InventoryStatus;
    declare added_date: Date;
    declare last_checked: Date;
}

InventoryModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        location: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        status: {
            type: DataTypes.ENUM(...Object.values(InventoryStatus)),
            defaultValue: InventoryStatus.AVAILABLE,
        },

        added_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },

        last_checked: {
            type: DataTypes.DATE,
            allowNull: true,
        },  
    },
    {
        sequelize,
        modelName: "Inventory",
    },
)

InventoryModel.belongsTo(BookModel, {
  foreignKey: "bookId",
  as: "book",
});

BookModel.hasMany(InventoryModel, {
  foreignKey: "bookId",
  as: "copies",
});

export default InventoryModel;