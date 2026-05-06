import { Request, Response } from "express";
import InventoryModel from "../models/inventory.model";
import { InventoryStatus } from "@bookwebapp/types";

// Gets the availabilty (count) of a specified book using its ID
export const GET_BOOK_AVAILABILITY = async (req: Request, res: Response) => {
    // The book's ID
    const bookId = req.params.id as string;

    try {
        // Count how many times the book's ID appears in the InventoryModel table and has the AVAILABLE status.
        const availableCount = await InventoryModel.count({
            where: {
                bookId: Number(bookId),
                status: InventoryStatus.AVAILABLE
            }
        })

        // Count how many times the book ID appears in the InventoryModel table, regardless of its status
        const totalCount = await InventoryModel.count({
            where: {
                bookId: Number(bookId)
            }
        })

        // Return a fulfilled status alongside both the total and available counts
        res.status(201).json({
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

// Updates a book's availability
// NOTE: Unlike Author, Books and Users, body is not validated. 
export const UPDATE_BOOK_AVAILABILITY = async (req: Request, res: Response) => {
    try {
        // Get the inventoryId, location and status from req.body
        const { inventoryId, location, status } = req.body

        // See if the inventory's ID exists
        const existing = await InventoryModel.findOne({
            where: { inventoryId }
        });

        // If it does, then change it using the location and status attributes
        if (existing) {
            existing.location = location
            existing.status = status
            existing.save();

            return res.status(200).json({
                success: true,
                body: existing
            });
        } else {
            // If not return a not found status.
            return res.status(404).json({ success: false })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to update book availability"
        });
    }
};

// Creates a new record in the inventory table for a specified book
// NOTE: Same as above, req.body is NOT validated in middleware. 
export const CREATE_INVENTORY = async (req: Request, res: Response) => {
    try {
        // Get the inventoryId, location and status from req.body
        const { bookId, location, status } = req.body;

        // Basic validation to keep the system functioning.
        if (!bookId || !location) {
            return res.status(400).json({
                success: false,
                message: "bookId and location are required"
            });
        }

        // Create the new record
        const created = await InventoryModel.create({
            bookId: Number(bookId),
            location,
            status: status ?? InventoryStatus.AVAILABLE
        });

        // Return it with a success status
        return res.status(200).json({
            success: true,
            body: created
        });
    } catch (err) {
        res.status(500).json({ success: false })
    }
}

// Gets all inventory. 
// NOTE: Requires the READ_ALL_INVENTORY permission.
// OTHER NOTE: Not an optimal solution. Should use pagination for real-world applications.
export const GET_ALL_INVENTORY = async (req: Request, res: Response) => {
    try {
        // Gets all inventory from the database (SELECT * FROM INVENTORY)
        const inventory = await InventoryModel.findAll();

        // Returns a fulfilled status code alongside inventoru
        return res.status(201).json({
            success: true,
            body: inventory
        });

    } catch (err) {
        return res.status(500).json({ success: false });
    }
};