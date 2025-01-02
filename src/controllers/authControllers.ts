import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { UserModel } from '../models/User';

import { Request, Response } from "express";

// Signup Schema || INPUT VALIDATION
const signupSchema = z.object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
});

// Login Schema
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

// User Signup
export const signup = async (req: Request, res: Response) => {
    try {
        const validated = signupSchema.parse(req.body);
        const { username, email, password } = validated;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
        return
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};

// User Login
export const login = async (req: Request, res: Response) => {
    try {
        const validated = loginSchema.parse(req.body);
        const { email, password } = validated;

        const user = await UserModel.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err: any) {
        res.status(500).json({ message: err.message });
    }
};
