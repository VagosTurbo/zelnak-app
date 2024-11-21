import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dbVerifyUserCredentials, dbCreateUser } from "../models/user.js";

const secretKey = process.env.JWT_SECRET; // Use a strong secret key in production

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await dbVerifyUserCredentials(username, password);

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: "1h" });

        
        res.json({token, id:user.id});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const register = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        if(!username || !password || !password){
            return res.status(400).json({ message: "Username, password and email are required" });
        } 

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            username,
            email,
            password: hashedPassword,
            role: role || "user",
        };

        await dbCreateUser(newUser);
        res.status(201).json({ message: "User registered successfully" });
    }

    catch (error) {
        console.error(error);
    }
};