export enum UserRole {
    ADMIN = 1,
}

export const UserRoleLabel: Record<UserRole, string> = {
    [UserRole.ADMIN]: 'Admin',
}
