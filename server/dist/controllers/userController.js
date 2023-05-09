"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.logout = exports.login = exports.signup = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = bcryptjs_1.default.hashSync(req.body.password, 8);
    const data = {
        email: req.body.email,
        password: hashedPassword
    };
    const newUser = new userModel_1.default(data);
    try {
        yield newUser.save();
        res.status(200).json({
            message: 'Utilisateur enregistré avec succès',
            data: newUser
        });
    }
    catch (err) {
        res.send(err);
    }
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield userModel_1.default.findOne({ email: email });
        if (!user) {
            res.status(401).json({ message: 'Vous n\'avez pas encore de compte' });
            return;
        }
        const passwordMatch = bcryptjs_1.default.compareSync(password, user.password);
        if (!passwordMatch) {
            res.status(401).json({ message: 'Mot de passe incorrecte' });
            return;
        }
        // Création du token
        // Expiration du token
        const exp = Date.now() + 1000 * 60;
        const token = jsonwebtoken_1.default.sign({ sub: user._id, exp }, process.env.SECRET);
        // configurer cookie
        res.cookie("Authorization", token, {
            expires: new Date(exp),
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === "production"
        });
        res.sendStatus(200);
    }
    catch (err) {
        res.sendStatus(401);
        console.log(err);
    }
});
exports.login = login;
const logout = (req, res, next) => {
    res.clearCookie("Authorization");
    res.sendStatus(200);
};
exports.logout = logout;
const checkAuth = (req, res, next) => {
    console.log(req.user);
    res.sendStatus(200);
};
exports.checkAuth = checkAuth;
