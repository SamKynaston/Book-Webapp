import { Request, Response, NextFunction } from "express";
import type { ZodObject } from "zod";

// Uses a ZOD schema in order to parse the body of a request and confirm its format meets what is expected.
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