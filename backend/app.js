import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv";
import tripRoutes from './routes/trips.js'
import cors from "cors";
import authRoutes from './routes/auth.js'
import chatRoutes from './routes/chat.js'

dotenv.config()

const app = express()
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight requests for all routes
app.options('*', cors());

app.use(express.json())
app.use('/api/trips', tripRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/chat', chatRoutes)

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("MongoDB Connected!")
        console.log("Database Name:", mongoose.connection.name);
    })
    
    .catch(err => console.log("MongoDB Connection Error: ", err))

app.get("/", (req, res) => {
    res.send("API is Running!")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`))