import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_USER_SECRET } from '../config';


export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ message: 'No token, authorization denied' });
        return
    }

    try {
        const decoded = jwt.verify(token, JWT_USER_SECRET);
        //@ts-ignore
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};
