import { dbGetAllUsers, dbGetUserById, dbCreateUser, dbUpdateUser, dbDeleteUser } from "../models/user.js"

export const getAllUsers = (req, res) => {
    dbGetAllUsers((err, users) => {
        if (err) throw err
        res.json(users)
    })
}

export const getUserById = (req, res) => {
    dbGetUserById(req.params.id, (err, user) => {
        if (err) throw err
        res.json(user)
    })
}

export const createUser = (req, res) => {
    const newUser = {
        title: req.body.title,
        completed: req.body.completed,
    }

    dbCreateUser(newUser, (err, result) => {
        if (err) throw err
        res.json({ message: "User created successfully" })
    })
}

export const updateUser = (req, res) => {
    const updatedUser = {
        title: req.body.title,
        completed: req.body.completed,
    }

    dbUpdateUser(req.params.id, updatedUser, (err, result) => {
        if (err) throw err
        res.json({ message: "User updated successfully" })
    })
}

export const deleteUser = (req, res) => {
    dbDeleteUser(req.params.id, (err, result) => {
        if (err) throw err
        res.json({ message: "User deleted successfully" })
    })
}
