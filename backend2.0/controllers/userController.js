import { Roles } from "../enums/roles.js"
import { dbGetAllUsers, dbGetUserById, dbCreateUser, dbUpdateUser, dbDeleteUser } from "../models/user.js"

export const getAllUsers = async (req, res) => {
    try {
        const users = await dbGetAllUsers()
        res.json(users)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await dbGetUserById(req.params.id)
        res.json(user)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const createUser = async (req, res) => {
    const { username, password, email, role } = req.body

    const newUser = {
        username,
        password,
        email,
        role: role || Roles.Registered,
    }

    try {
        await dbCreateUser(newUser)
        res.json({ message: "User created successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const updateUser = async (req, res) => {
    const userId = req.params.id
    const updatedUser = {}

    if (req.body.username) updatedUser.username = req.body.username

    if (req.body.email) updatedUser.email = req.body.email

    if (req.body.role) updatedUser.role = req.body.role

    // there must be at least one field to update
    if (Object.keys(updatedUser).length === 0) {
        return res.status(400).json({ error: "At least one field is required to update." })
    }

    try {
        // does user exist?
        const existingUser = await dbGetUserById(userId)
        if (!existingUser) {
            return res.status(404).json({ error: "User not found." })
        }

        await dbUpdateUser(userId, updatedUser)
        res.json({ message: "User updated successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteUser = async (req, res) => {
    const userId = req.params.id

    try {
        // test existence
        const existingUser = await dbGetUserById(userId)
        if (!existingUser) {
            return res.status(404).json({ error: "User not found." })
        }

        const result = await dbDeleteUser(userId)

        // was the user deleted?
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "User not found." })
        }

        res.json({ message: "User deleted successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
