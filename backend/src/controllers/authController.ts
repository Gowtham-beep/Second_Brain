import express, { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User } from "../models/User";
import {z, ZodError} from 'zod';

dotenv.config();

//Zod schemas for validation
const signupSchema=z.object({
    username:z.string().min(3,"username must be at leat 3 chars long"),
    password:z.string().min(8,"password must be at least 8 chars long"),
});
const signinSchema=z.object({
    username:z.string().min(3,"username must be at leat 3 chars long"),
    password:z.string().min(8,"password must be at least 8 chars long"),
});

// Signup Endpoint
export const Signup: RequestHandler = async (req, res): Promise<void> => {
    

    try {
        const{username,password}=signupSchema.parse(req.body);
        const saltRounds = 10;
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
        if(error instanceof z.ZodError){
            res.status(400).json({errors:error.errors});
            return;
        }else{
            res.status(500).json({
                message: "Error in creating user",
                error: (error as Error).message,
            });
        }
        
    }
};

// Signin Endpoint
export const Signin: RequestHandler= async (req, res): Promise<void> => {
    
    try {
        const { username, password } = signinSchema.parse(req.body);

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
        if(error instanceof ZodError){
            res.status(400).json({errors:error.errors});
            return;
        }else{
            res.status(500).json({
                message: "Server error",
                error: (error as Error).message,
            });
        }
        
    }
};
