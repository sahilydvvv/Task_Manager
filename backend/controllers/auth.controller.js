import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

export const signup = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const emailToLower = email.toLowerCase();

        const existingUser = await User.findOne({ email: emailToLower });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists with this email" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            userName,
            email: emailToLower,
            password: hashedPassword,
        })
        await newUser.save();

        const token = generateToken(newUser._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });


        res.status(201).json({
            message: "User registered successfully", user: {
                id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
            }
        });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Server error during signup" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const emailToLower = email.toLowerCase();
        const user = await User.findOne({ email: emailToLower });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });


        res.status(200).json({
            message: "Login successful", user: {
                id: user._id,
                userName: user.userName,
                email: user.email,
            }
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Server error during login" });
    }
}

export const logout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    });

    res.status(200).json({ message: "Logged out successfully" });
};