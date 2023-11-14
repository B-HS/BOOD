import { PrismaClient } from '@prisma/client'
import admin from 'firebase-admin'
import cron from 'node-cron'
const initCronJob = (prisma: PrismaClient, firebase: admin.app.App) => {
    const checkingTodayFood = async () => {
        const today = new Date('2023-11-06')
        today.setHours(0, 0, 0, 0)
        const start = new Date(today)
        today.setHours(23, 59, 59, 999)
        const end = new Date(today)
        const result = await prisma.food.findFirst({
            where: { date: { gte: start, lte: end } },
        })
        if (!!result) {
            const { am, pm } = result
            return { am, pm }
        } else {
            return { am: null, pm: null }
        }
    }

    cron.schedule('* * * * * *', async () => {
        const { am, pm } = await checkingTodayFood()
        console.log('=========================')
        console.log(am, pm)
        console.log('=========================')
    })
}

export { initCronJob }
