import { UserRole } from '../enums'

export interface UserData {
    name?: string
    email?: string
    role?: UserRole
}

export const emptyUser: UserData = {}
