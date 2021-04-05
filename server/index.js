import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';
import dotenv from 'dotenv';
import morgan from 'morgan';

//Initialize App
const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.send('Welcome to Memories API')
} )

//Connect to DB
const PORT = process.env.PORT || 5000; //For ENV variable on Heroku

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
.catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false); // console warnings

app.use('/posts', postRoutes);
app.use('/users', userRoutes);