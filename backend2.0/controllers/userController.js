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
    const { username, password, email } = req.body

    const newUser = {
        username,
        password,
        email,
        role: Roles.Registered,
    }

    try {
        await dbCreateUser(newUser)
        res.json({ message: "User created successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const updateUser = async (req, res) => {
    const updatedUser = {
        placeholder: req.body.placeholder,
    }

    try {
        await dbUpdateUser(req.params.id, updatedUser)
        res.json({ message: "User updated successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        await dbDeleteUser(req.params.id)
        res.json({ message: "User deleted successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
