import express from 'express'
import mongoose from 'mongoose';
import dotenv from "dotenv";
import UserRoutes from './routes/User.routes.js';
import authRoutes from './routes/Auth.routes.js';
dotenv.config();


mongoose.connect(process.env.MONGO_CONNECTION_URL)
.then(() => {
    console.log('MongoDb is connected');
}).catch(err => {
    console.log(err);
});

const app = express();
app.use(express.json());

app.listen(3000, ()=>{
    console.log('server is running on port 3000')
})

app.use('/api/user', UserRoutes)
app.use('/api/auth', authRoutes)