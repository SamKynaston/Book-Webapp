import { GET_BOOK_AVAILABILITY } from "../controllers/inventory.controller";
import { Request, Response } from "express";
import InventoryModel from "../models/inventory.model";

jest.mock("../models/inventory.model", () => ({
    __esModule: true,

    default: {
        count: jest.fn() 
    } 
}))

describe("GET_BOOK_AVAILABILITY", () => {
    let req: Partial<Request>
    let res: Partial<Response>

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        }
        jest.clearAllMocks();
    });

    describe("GET_AVAILABILITY", () => {
        it("should get and then return book availability", async () => {
            req.params = { bookId: "1" };

            (InventoryModel.count as jest.Mock)
                .mockResolvedValueOnce(3)
                .mockResolvedValueOnce(5);

            await GET_BOOK_AVAILABILITY(req as Request, res as Response);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                body: {
                    availability: 3,
                    total: 5,
                },
            });
        })
    })
})