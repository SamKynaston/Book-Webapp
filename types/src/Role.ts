import { PERMISSIONS_STRING } from "./Permissions";

export interface RolePermission {
    permissionId: number;
    permission_string: PERMISSIONS_STRING;
}

export interface Role {
    roleId: number;
    name: string;
    permissions: RolePermission[];
}