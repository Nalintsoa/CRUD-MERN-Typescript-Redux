import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/userModel';
import jwt, { JwtPayload } from 'jsonwebtoken';
// import chalk from 'chalk';

require('dotenv').config();

export const requireAuth = async (req: any, res: Response, next: NextFunction) => {
    try {
        console.log('In middleware');
        // lire les cookies
        const token = req.cookies.Authorization;

        // Décoder le token
        const decoded = jwt.verify(token, process.env.SECRET!) as JwtPayload;
        if (Date.now() > decoded.exp!) return res.status(401).json({ message: 'fetch impossible' });

        // Chercher l'utilisateur correspondant
        const user = await UserModel.findById(decoded.sub);
        if (!user) return res.status(401).json({ message: 'fetch impossible' });

        // Attacher l'utilisateur à la requête
        req.user = user;

        next();
    } catch (err) {
        console.log(err);
        res.sendStatus(401);
    }
};