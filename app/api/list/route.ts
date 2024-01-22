import { createClient } from '@/utils/supabase/server'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
type ScheduleProps = {
    id: number
    am: string
    pm: string
    date: string
}
export const POST = async () => {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    dayjs.extend(isSameOrAfter)
    try {
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
        return NextResponse.json(uniqueData.splice(0, 5) as ScheduleProps[])
    } catch (error) {
        return NextResponse.error()
    }
}
