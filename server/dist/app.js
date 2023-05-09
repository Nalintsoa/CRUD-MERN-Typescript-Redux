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
exports.passwordHashing = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const mongoose_1 = __importDefault(require("mongoose"));
// routes
const etudiantRoute_1 = __importDefault(require("./routes/etudiantRoute"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const mailRoute_1 = __importDefault(require("./routes/mailRoute"));
// import cookieParser from 'cookie-parser';
const cors_1 = __importDefault(require("cors"));
const cookieParser = require('cookie-parser');
const app = (0, express_1.default)();
const PORT = 5000;
exports.passwordHashing = process.env.SECRET;
require('dotenv').config();
app.use(cookieParser());
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
// Connection à la base
// Pour la relation avec React
app.use((0, cors_1.default)({
    origin: true,
    credentials: true
}));
const connection = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connect('mongodb://127.0.0.1:27017/first_mern');
});
connection()
    .then(() => console.log('Connexion à la base de données réussie'))
    .catch(err => console.log(err));
// Lancement du serveur Express
app.get('/', (req, res) => {
    res.send(`Le serveur est lancé sur le port ${PORT}`);
});
app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
});
// Routes
app.use('/etudiant', etudiantRoute_1.default);
app.use('/user', userRoute_1.default);
app.use('/mail', mailRoute_1.default);
