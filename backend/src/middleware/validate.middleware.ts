import { Request, Response, NextFunction } from "express";
import type { ZodObject } from "zod";

export const VALIDATE_INPUT = (schema: ZodObject) => {
    return ( req: Request, res: Response, next: NextFunction ) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            console.log(result.error)
            return res.status(400).json({ success: false, message: "Validation failed" })
        }

        req.body = result.data
        next()
    }
}