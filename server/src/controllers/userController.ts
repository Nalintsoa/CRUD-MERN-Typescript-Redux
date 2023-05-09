import { Request, Response, NextFunction } from 'express';
import UserModel, { IUser } from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

require('dotenv').config();

const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const data: IUser = {
        email: req.body.email,
        password: hashedPassword
    };
    const newUser = new UserModel(data);
    try {
        await newUser.save();
        res.status(200).json({
            message: 'Utilisateur enregistré avec succès',
            data: newUser
        });
    } catch (err) {
        res.send(err);
    }
};

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            res.status(401).json({ message: 'Vous n\'avez pas encore de compte' });
            return;
        }
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ message: 'Mot de passe incorrecte' });
            return;
        }
        // Création du token
        // Expiration du token
        const exp = Date.now() + 1000 * 60;
        const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET!);
        // configurer cookie
        res.cookie("Authorization", token, {
            expires: new Date(exp),
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === "production"
        });
        res.sendStatus(200);
    } catch (err) {
        res.sendStatus(401);
        console.log(err);
    }
};

const logout = (req: Request, res: Response, next: NextFunction): void => {
    res.clearCookie("Authorization");
    res.sendStatus(200);
};

const checkAuth = (req: any, res: Response, next: NextFunction): void => {
    console.log(req.user);
    res.sendStatus(200);
};

export { signup, login, logout, checkAuth };