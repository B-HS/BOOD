import ScheduleManager from '@/components/schedule-manager'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { createClient } from '@/utils/supabase/server'
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import 'dayjs/locale/ko'

import { cookies } from 'next/headers'
type ScheduleProps = {
    id: number
    am: string
    pm: string
    date: string
}

const Page = async () => {
    dayjs.extend(isSameOrAfter)
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const getWeekFoods = async () => {
        const startOfWeek = dayjs().startOf('week').format('YYYY-MM-DD')
        const endOfWeek = dayjs().endOf('week').format('YYYY-MM-DD')
        const { data: weekData, error } = await supabase
            .from('bood')
            .select('*')
            .gte('date', startOfWeek)
            .lte('date', endOfWeek)
            .order('id')
            .order('date', { ascending: true })
        if (error) {
            console.error('Error fetching data from Supabase:', error)
            return []
        }

        const uniqueData = Object.values(
            weekData.reduce((prev, next) => {
                const currentDate = next.date
                if (dayjs(currentDate).isSameOrAfter(dayjs().startOf('week').add(1, 'day').format('YYYY-MM-DD'))) {
                    if (!prev[currentDate] || prev[currentDate].id > next.id) {
                        prev[currentDate] = next
                    }
                }
                return prev
            }, {}),
        )

        return uniqueData.splice(0, 5) as ScheduleProps[]
    }

    return (
        <>
            <section className='flex justify-center items-start container gap-2 flex-wrap p-3'>
                {(await getWeekFoods()).map((food, idx) => (
                    <div className='flex flex-col gap-2' key={idx}>
                        <Card className='text-center'>
                            <CardHeader className='text-xl font-semibold p-2'>{dayjs(food.date).locale('ko').format('MM-DD (ddd)')}</CardHeader>
                            <Separator />
                            <CardContent className='p-0 flex flex-col justify-center w-60'>
                                <section className='p-2 flex flex-col gap-2 min-h-[200px]'>
                                    {food.am.split(',').map((item: string, idx: number) => (
                                        <p key={`${food.date}.${idx}`}>{item}</p>
                                    ))}
                                </section>
                                <Separator />
                                <section className='p-2 flex flex-col gap-2 min-h-[200px]'>
                                    {food.pm.split(',').map((item: string, idx: number) => (
                                        <p key={`${food.date}.${idx}`}>{item}</p>
                                    ))}
                                </section>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </section>
            {user && (
                <>
                    <Separator />
                    <ScheduleManager user={user} />
                </>
            )}
        </>
    )
}

export default Page
