import { PrismaClient } from '@prisma/client'
import { default as AdminSDK } from 'firebase-admin'
import fs from 'fs'
import cron from 'node-cron'

const initCronJob = (prisma: PrismaClient, admin: typeof AdminSDK) => {
    const writeLog = (log: string) => {
        try {
            fs.writeFileSync('./logs.txt', log)
        } catch (e) {
            console.log(e)
        }
    }

    const sendWebpush = async (message: { title: string; body: string }, which: 'isAm' | 'isPm') => {
        const result = await prisma.tokens.findMany({})
        const tokens = result.filter((val) => val[which]).map((tkn) => tkn.token)
        admin
            .messaging()
            .sendEachForMulticast({
                tokens,
                webpush: {
                    notification: message,
                },
            })
            .then((res) => {
                console.log('result', res)
            })
    }

    const checkingTodayFood = async () => {
        const today = new Date('2023-11-20')
        today.setHours(0, 0, 0, 0)
        const start = new Date(today)
        today.setHours(23, 59, 59, 999)
        const end = new Date(today)
        const result = await prisma.food.findFirst({
            where: { date: { gte: start, lte: end } },
        })
        if (!!result) {
            const { am: isAm, pm: isPm } = result
            return { isAm, isPm }
        } else {
            return { isAm: undefined, isPm: undefined }
        }
    }

    cron.schedule(
        '0 11,17 * * 1-5',
        async () => {
            const which = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Tokyo' }).includes('오전') ? 'isAm' : 'isPm'
            const foodList = await checkingTodayFood()
            !!foodList[which] && sendWebpush({ title: which === 'isAm' ? '오전' : '저녁' + '식단', body: foodList[which]! }, which)
            writeLog(`${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Tokyo' })} : ${foodList[which]}`)
        },
        { scheduled: true, timezone: 'Asia/Seoul' },
    )
}

export { initCronJob }
