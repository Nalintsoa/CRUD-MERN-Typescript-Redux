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
exports.requireAuth = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import chalk from 'chalk';
require('dotenv').config();
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('In middleware');
        // lire les cookies
        const token = req.cookies.Authorization;
        // Décoder le token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        if (Date.now() > decoded.exp)
            return res.status(401).json({ message: 'fetch impossible' });
        // Chercher l'utilisateur correspondant
        const user = yield userModel_1.default.findById(decoded.sub);
        if (!user)
            return res.status(401).json({ message: 'fetch impossible' });
        // Attacher l'utilisateur à la requête
        req.user = user;
        next();
    }
    catch (err) {
        console.log(err);
        res.sendStatus(401);
    }
});
exports.requireAuth = requireAuth;
