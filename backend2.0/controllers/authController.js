import jwt from "jsonwebtoken";
import { dbVerifyUserCredentials } from "../models/user.js";

const secretKey = 'your_secret_key'; // Use a strong secret key in production

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await dbVerifyUserCredentials(username, password);

        if (!user) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const token = jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn: "1h" });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};