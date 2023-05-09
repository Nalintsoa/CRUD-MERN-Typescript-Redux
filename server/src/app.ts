import express from 'express';
import { json, urlencoded } from 'body-parser';
import mongoose from 'mongoose';
// routes
import etudiantRoute from './routes/etudiantRoute';
import userRoute from './routes/userRoute';
import mailRoute from './routes/mailRoute';
// import cookieParser from 'cookie-parser';
import cors from 'cors';

const cookieParser = require('cookie-parser');

const app = express();
const PORT = 5000;

export const passwordHashing = process.env.SECRET;

require('dotenv').config();

app.use(cookieParser());
app.use(json());
app.use(urlencoded({ extended: true }));

// Connection à la base
// Pour la relation avec React

app.use(cors({
    origin: true,
    credentials: true
}));

const connection = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/first_mern');
};

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
app.use('/etudiant', etudiantRoute);
app.use('/user', userRoute);
app.use('/mail', mailRoute);