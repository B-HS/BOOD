import { PrismaClient } from '@prisma/client'
import cors from 'cors'
import dotenv from 'dotenv'
import express, { Express } from 'express'
import { initCronJob } from './cron/cron'
import { initFirebaseAdmin } from './firebase/firebase'
import { initRoutes } from './routes/routes'
dotenv.config()

const app: Express = express()
const PORT = process.env.PORT
const admin = initFirebaseAdmin()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

initRoutes(app, prisma)
initCronJob(prisma, admin)
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
