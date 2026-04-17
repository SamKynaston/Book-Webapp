export interface RolePermission {
    permissionId: number;
    permission_string: string;
}

export interface Role {
    roleId: number;
    name: string;
    permissions: RolePermission[];
}