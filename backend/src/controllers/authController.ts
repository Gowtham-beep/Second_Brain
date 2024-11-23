import express, { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User } from "../models/User";

dotenv.config();

// Shape of the request body TS Interface
export interface SignupBody {
    username: string;
    password: string;
}
export interface SigninBody {
    username: string;
    password: string;
}

// Signup Endpoint
export const Signup: RequestHandler<{}, {}, SignupBody> = async (req, res): Promise<void> => {
    const { username, password } = req.body;
    const saltRounds = 10;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(403).json({ message: "User already exists" });
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Save the new user
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({
            message: "Signup successful",
            username,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error in creating user",
            error: (error as Error).message,
        });
    }
};

// Signin Endpoint
export const Signin: RequestHandler<{}, {}, SigninBody> = async (req, res): Promise<void> => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        // Compare the provided password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "", { expiresIn: "1h" });

        res.status(200).json({
            message: "Signin successful",
            token,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: (error as Error).message,
        });
    }
};
