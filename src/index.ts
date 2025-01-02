import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";

import { PORT, MONGO_URL } from './config';
import { swsRouter } from './routes/authRoutes';


const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', swsRouter);

app.get('/' , (req , res) => {
    res.send(`StudyWithShubh Server is Live! <br/> <a href="https://studywithshubh.tech">Visit the Website!</a>`)
})

async function main() {
    mongoose.connect(MONGO_URL, {
    }).then(() => {
        console.log('Connection Successfully Established to the Database!!');
    }).catch((err) => {
        console.error(err);
    });
    
    app.listen(PORT, () => {
        console.log(`Backend Hosted on: http://localhost:${PORT}`)
    });
}
main();