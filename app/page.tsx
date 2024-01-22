import ScheduleManager from '@/components/schedule-manager'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { createClient } from '@/utils/supabase/server'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
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
        const response = await fetch(`${process.env.NEXT_PUBLIC_PAGE_URL}/api/list`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        return data as ScheduleProps[]
    }
    const weekFoods = await getWeekFoods()
    return (
        <>
            <section className='flex justify-center items-start container gap-2 flex-wrap p-3'>
                {weekFoods.map((food, idx) => (
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
