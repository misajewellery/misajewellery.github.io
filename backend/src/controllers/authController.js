import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res) => {
    try {
        const { name, mobile, email, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ mobile });
        if (userExists) {
            return res.status(400).json({ success: false, message: "User already exists with this mobile number" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            name,
            mobile,
            email,
            password: hashedPassword
        });

        if (user) {
            res.status(201).json({
                success: true,
                message: "Registration successful. Please login."
            });
        }
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ success: false, message: "Server Error during registration" });
    }
};

// Login User
export const loginUser = async (req, res) => {
    try {
        const { mobile, password } = req.body;

        // Find user by mobile
        const user = await User.findOne({ mobile });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Match password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        res.json({
            success: true,
            token,
            message: "Login successful"
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: "Server Error during login" });
    }
};
