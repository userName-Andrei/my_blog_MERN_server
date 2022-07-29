import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';


dotenv.config();

const app = express();

app.use(express.json())
app.use(cors())
app.use('/avatar', express.static('uploads/img/avatars'))
app.use('/preview', express.static('uploads/img/previews/'))

app.use('/auth', userRoutes);
app.use('/', postRoutes);
app.use('/', commentRoutes);

const startApp = async () => {
    try {
        mongoose
            .connect(process.env.DB_URI)
            .then(() => console.log('DB connected'))
            .catch(e => console.log(e))

        app.listen(process.env.PORT, (error) => {
        
            console.log(`Server successfully started on ${process.env.PORT} port`)
        })
    } catch (error) {
        console.log(error)
    }
}

startApp();