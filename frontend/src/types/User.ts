import { UserRole } from "../enums"

export interface User {
    id: number
    username: string
    password: string
    email: string
    created_at: string
    role: UserRole
}
