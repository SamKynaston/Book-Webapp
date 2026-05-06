import { Response, Request, NextFunction } from "express";
import { PERMISSIONS_STRING, Role, RolePermission } from "@bookwebapp/types";

// Checks to see if a user's account has a role with a specified permission
export const REQUIRE_PERMISSION = (permissionName: PERMISSIONS_STRING) => {
    return(req: Request, res: Response, next: NextFunction) => {
        try {
            // If the user isn't authenticated, drop the request
            if (!req.user) {
                return res.status(401).json({ success: false, error: "Not authenticated" })
            }

            // Goes through all roles to see if the user has the permission_string
            const hasAccess = req.user.roles.some((role: Role) => 
                role.permissions?.some((p: RolePermission) => 
                    p.permission_string === permissionName ||
                    p.permission_string === "ADMINISTRATOR"
                )
            )

            // If they do not, then drop the request
            if (!hasAccess) {
                return res.status(403).json({ success: false, error: "You do not have permission" });
            }

            next();
        } catch (err) {
            return res.status(500).json({ success: false, error: "An error occured."})
        }
    }
}

// Checks to see if the user has ownership over a specified account
export const OWNERSHIP_CHECK = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Gets the authenticated user and the id of the requested user to change
        const user = req.user;
        const idParam = req.params.id;

        if (Array.isArray(idParam)) {
            return res.status(400).json({ success: false, error: "Invalid format" });
        }

        const targetId = parseInt(idParam, 10)

        // If they're the same, then continue the request
        if (user.id === targetId) {
            return next();
        }

        // Check if the user has the ADMINISTRATOR permission
        const isAdmin = user.roles.some((role: Role) => 
            role.permissions?.some((p: RolePermission) => p.permission_string === "ADMINISTRATOR")
        );

        // If they do, continue the request
        if (isAdmin) {
            return next();
        }
        
        // If all paths fail, drop the request.
        return res.status(403).json({success: false, error: "Unauthorised."})
    } catch(err) {
        return res.status(500).json({success: false, error: "An error occured."})
    }
}