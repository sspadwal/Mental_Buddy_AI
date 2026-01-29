import dotenv from 'dotenv'
import express from 'express'
import connectDb from './config/db.js'
// import moodRouter from '../routes/moodRoutes.js'
import moodRouter from './routes/moodRoutes.js'
import authRouter from './routes/authRoutes.js'
import cors from 'cors'
// import moodHistoryRouter from './routes/moodHistoryRoutes.js'
dotenv.config()

// initializing the Express Server
const app = express()
// to parse the json Data this is the middleware we used.
const corsOptions = {
    origin: 'http://localhost:5173', // Allow only requests from this origin
    methods: 'GET,POST', // Allow only these methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow only these headers
};

app.use(express.json())
app.use(cors(corsOptions))
// calling the Database Function- connecting with mongodb database
connectDb();

// 
app.use('/api/mood', moodRouter)
app.use('/api/auth', authRouter)
// app.use('/api/mood',moodRouter)
// listening the server here 
app.listen(process.env.PORT, () => {
    console.log("Server is Running....")
})     