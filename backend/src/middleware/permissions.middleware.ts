import { Response, Request, NextFunction } from "express";
import { PERMISSIONS_STRING, Role, RolePermission } from "@bookwebapp/types";

export const REQUIRE_PERMISSION = (permissionName: PERMISSIONS_STRING) => {
    return(req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                return res.status(401).json({ success: false, error: "Not authenticated" })
            }

            const hasAccess = req.user.roles.some((role: Role) => 
                role.permissions?.some((p: RolePermission) => 
                    p.permission_string === permissionName ||
                    p.permission_string === "ADMINISTRATOR"
                )
            )

            if (!hasAccess) {
                return res.status(403).json({ success: false, error: "You do not have permission" });
            }

            next();
        } catch (err) {
            console.error(err)
            return res.status(500).json({ success: false, error: "An error occured."})
        }
    }
}

export const OWNERSHIP_CHECK = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user;
        const idParam = req.params.id;

        if (Array.isArray(idParam)) {
            return res.status(400).json({ success: false, error: "Invalid format" });
        }

        const targetId = parseInt(idParam, 10)

        if (user.id === targetId) {
            return next();
        }

        const isAdmin = user.roles.some((role: Role) => 
            role.permissions?.some((p: RolePermission) => p.permission_string === "ADMINISTRATOR")
        );

        if (isAdmin) {
            return next();
        }

        return res.status(403).json({success: false, error: "Unauthorised."})
    } catch(err) {
        return res.status(500).json({success: false, error: "An error occured."})
    }
}