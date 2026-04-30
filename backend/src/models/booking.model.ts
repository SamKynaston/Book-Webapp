import { DataTypes, Model, CreationOptional, ForeignKey } from "sequelize";
import { sequelize } from "../database";
import UserModel from "./user.model";
import InventoryModel from "./inventory.model";
import { BorrowStatus } from "@bookwebapp/types";

export class BorrowModel extends Model {
    declare id: CreationOptional<number>;
    declare userId: ForeignKey<number>;
    declare inventoryId: ForeignKey<number>;
    declare borrow_date: Date;
    declare due_date: Date;
    declare return_date: Date;
    declare status: BorrowStatus;
}

InventoryModel.init(
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

        inventoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        borrow_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },

        due_date: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: () => {
                const date = new Date();
                date.setDate(date.getDate() + 14);
                return date;
            }
        },  

        return_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },  

        status: {
            type: DataTypes.ENUM(...Object.values(BorrowStatus)),
            defaultValue: BorrowStatus.ACTIVE,
        }
    },
    {
        sequelize,
        modelName: "Borrow",
        indexes: [
            { fields: ["userId"] },
            { fields: ["inventoryId"] },
            { fields: ["borrowed_by_user_id"] },
        ],
    },
)

BorrowModel.belongsTo(UserModel, {
  foreignKey: "userId",
  as: "borrower",
});

BorrowModel.belongsTo(UserModel, {
  foreignKey: "borrowed_by_user_id",
  as: "borrowedBy",
});

BorrowModel.belongsTo(UserModel, {
  foreignKey: "returned_by_user_id",
  as: "returnedBy",
});

BorrowModel.belongsTo(InventoryModel, {
  foreignKey: "inventoryId",
  as: "inventoryCopy",
});

InventoryModel.hasMany(BorrowModel, {
  foreignKey: "inventoryId",
  as: "borrowHistory",
});

UserModel.hasMany(BorrowModel, {
  foreignKey: "userId",
  as: "borrows",
});

export default BorrowModel;