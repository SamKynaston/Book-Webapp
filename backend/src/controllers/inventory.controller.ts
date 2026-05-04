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
                availability: availableCount || 0,
                total: totalCount || 0
            }
        })
    } catch(err) {
        res.status(500).json({ success: false, })
    }
}

export const UPDATE_BOOK_AVAILABILITY = async (req: Request, res: Response) => {
    try {
        const { inventoryId, location, status } = req.body

        const existing = await InventoryModel.findOne({
            where: { inventoryId }
        });

        if (existing) {
            existing.location = location
            existing.status = status
            existing.save();

            return res.status(200).json({
                success: true,
                body: existing
            });
        } else {
            return res.status(404).json({ success: false })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to update book availability"
        });
    }
};

export const CREATE_INVENTORY = async (req: Request, res: Response) => {
    try {
        const { bookId, location, status } = req.body;

        if (!bookId || !location) {
            return res.status(400).json({
                success: false,
                message: "bookId and location are required"
            });
        }

        const created = await InventoryModel.create({
            bookId: Number(bookId),
            location,
            status: status ?? InventoryStatus.AVAILABLE
        });

        return res.status(201).json({
            success: true,
            body: created
        });
    } catch (err) {
        res.status(500).json({ success: false })
    }
}

export const GET_ALL_INVENTORY = async (req: Request, res: Response) => {
    try {
        const inventory = await InventoryModel.findAll();

        return res.status(200).json({
            success: true,
            body: inventory
        });

    } catch (err) {
        return res.status(500).json({ success: false });
    }
};