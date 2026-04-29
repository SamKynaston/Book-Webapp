import { Request, Response, NextFunction } from "express";
import type { ZodObject } from "zod";

export const VALIDATE_INPUT = (schema: ZodObject) => {
    return ( req: Request, res: Response, next: NextFunction ) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({ success: false, message: result.error.issues[0].message })
        }

        req.body = result.data
        next()
    }
}