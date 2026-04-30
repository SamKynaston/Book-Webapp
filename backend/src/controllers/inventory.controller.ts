import { Request, Response } from "express";
import InventoryModel from "../models/inventory.model";
import { InventoryStatus } from "@bookwebapp/types";

export const GET_BOOK_AVAILABILITY = async (req: Request, res: Response) => {
    const bookId = req.params.id as string;

    try {
        const availableCount = await InventoryModel.count({
            where: {
                bookId: Number(bookId),
                status: InventoryStatus.AVAILABLE
            }
        })

        const totalCount = await InventoryModel.count({
            where: {
                bookId: Number(bookId)
            }
        })

        res.status(200).json({
            success: true,
            body: {
                availability: availableCount,
                total: totalCount
            }
        })
    } catch(err) {
        res.status(500).json({ success: false, })
    }
}