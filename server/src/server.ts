import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import timeRoutes from './routes/timeDataRoutes.js'
import projectsRoutes from './routes/projectDataRoutes.js'
import sitesRoutes from './routes/siteStatisticRoutes.js'
import { seed } from './config/seed/seed.js'
import cors from 'cors'

dotenv.config()

const PORT = process.env.PORT || 3000

const corsOptions = {
    origin: ['http://localhost:5173', 'https://dillank-frontend-stat.vercel.app'],
    methods: ['GET', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
}

const app = express()
app.use(cors(corsOptions));
app.use(express.json())
app.use('/time', timeRoutes)
app.use('/projects', projectsRoutes)
app.use('/sites', sitesRoutes)

const startServer = async() => {
    try {
        await connectDB()
        await seed()
        app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`))
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

startServer()