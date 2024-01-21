'use client'
import { User } from '@supabase/supabase-js'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import PopCalendar from './calendar'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'

const ScheduleManager = ({ user }: { user: User }) => {
    const [targetDate, setTargetDate] = useState<Date>()
    const [infos, setInfos] = useState([{}, {}, {}, {}, {}] as { am: string; pm: string; date: Date }[])

    const onChangeEvt = (idx: number, which: 'am' | 'pm', value: string) => {
        const newInfos = [...infos]
        newInfos[idx][which] = value
        setInfos(() => newInfos)
    }

    const saveInfos = () => {
        fetch('/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(infos),
        })
    }

    useEffect(() => {
        const startDate = new Date(targetDate || new Date())
        const weekDates = []
        for (let i = 0; i < 5; i++) {
            const currentDate = new Date(startDate)
            currentDate.setDate(startDate.getDate() + i)
            currentDate.setHours(0, 0, 0, 0)
            weekDates.push({ date: currentDate })
        }
        setInfos(weekDates.map((dateObj) => ({ am: '', pm: '', date: dateObj.date })))
    }, [targetDate])
    return (
        <section className='flex flex-col justify-start items-start container gap-2 flex-wrap p-3'>
            <section className='flex gap-2 items-center justify-between w-full                                    '>
                <section className='flex gap-2 items-center'>
                    <p>시작일 :</p>
                    <PopCalendar date={targetDate} onChange={(_, selectedDate, __) => setTargetDate(selectedDate)} />
                </section>
                <section className='flex gap-2 items-center'>
                    <Button onClick={saveInfos} variant={'default'}>
                        저장
                    </Button>
                </section>
            </section>
            <section className='w-full flex flex-col gap-3'>
                {infos.map((info, idx) => (
                    <div className='flex flex-col w-full items-start gap-2' key={idx}>
                        <Label>{dayjs(info.date).format('MM-DD (ddd)')}</Label>
                        <Input defaultValue={infos[idx].am || ''} onChange={(e) => onChangeEvt(idx, 'am', e.target.value)} />
                        <Input defaultValue={infos[idx].pm || ''} onChange={(e) => onChangeEvt(idx, 'pm', e.target.value)} />
                    </div>
                ))}
            </section>
        </section>
    )
}

export default ScheduleManager
