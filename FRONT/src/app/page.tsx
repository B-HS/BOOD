'use client'
import { FOOD, addFoods, foodlist } from '@/api/food'
import FoodTable from '@/components/foodTable'
import useForm from '@/hooks/useForm'
import { AuthContext } from '@/module/auth'
import { Box, Button, FormControl, FormLabel, Input, Stack, StackDivider, useToast } from '@chakra-ui/react'
import dayjs from 'dayjs'
import { useContext, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const SubmitFood = () => {
    const authContext = useContext(AuthContext)
    const isAuthed = authContext.isAuthed
    const [date, setDate] = useState<Date>()
    const [days, setDay] = useState(['월', '화', '수', '목', '금'].map((val) => ({ name: val, am: '', pm: '', date: '' })))
    const { formData, onChangeFormData, setFormData } = useForm<Partial<FOOD>>({
        am: '',
        pm: '',
    })
    const toast = useToast()

    const modifyFormData = (obj: Partial<FOOD>) => {
        setDate(dayjs(obj.date).toDate())
        setFormData(obj)
    }

    const loadFoodList = () => {
        foodlist().then((res) => {
            const result = res.map((ele: { am: string; pm: string; date: string }) => {
                const targetIdx = (dayjs(ele.date).format('d') as unknown as number) - 1
                return { ...days[targetIdx], ...ele, date: dayjs(ele.date).format('YYYY-MM-DD') }
            })
            setDay(result)
        })
    }

    const createFoodList = () => {
        const foods = days.map((day) => ({
            am: day.am,
            pm: day.pm,
            date: '20' + day.date,
        }))
        addFoods(foods).then((res) => {
            res.result === 'success' &&
                toast({
                    title: 'Success ! 🎉',
                    description: 'Data has been saved.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                })
        })
    }

    const setToCalendar = () => {
        const targetIdx = (dayjs(date).format('d') as unknown as number) - 1
        setDay((prev) => {
            const newDays = [...prev]
            newDays[targetIdx as unknown as number].am = formData.am || 'empty'
            newDays[targetIdx as unknown as number].pm = formData.pm || 'empty'
            newDays[targetIdx as unknown as number].date = dayjs(date).format('YY-MM-DD') || 'empty'
            return newDays
        })
        setDate(dayjs(date).add(1, 'd').toDate() as any)
    }

    useEffect(() => {
        loadFoodList()
    })

    return (
        <Stack divider={<StackDivider />} gap={3}>
            <FoodTable days={days} fn={modifyFormData} />
            {isAuthed && (
                <Box>
                    <Button variant={'solid'} onClick={createFoodList}>
                        서버에 저장
                    </Button>
                    <Stack mt={3} divider={<StackDivider />} gap={2}>
                        <FormControl>
                            <FormLabel fontSize={'xl'}>오전</FormLabel>
                            <Input name='am' type='text' onChange={onChangeFormData} value={formData.am} />
                        </FormControl>
                        <FormControl>
                            <FormLabel fontSize={'xl'}>오후</FormLabel>
                            <Input name='pm' type='text' onChange={onChangeFormData} value={formData.pm} />
                        </FormControl>
                        <FormControl>
                            <FormLabel fontSize={'xl'}>날짜</FormLabel>
                            <DatePicker
                                className='border p-2 rounded-lg'
                                placeholderText='YYYY-MM-DD'
                                onChange={(date) => setDate(date as any)}
                                selected={date}
                                filterDate={(date) => date.getDay() !== 0 && date.getDay() !== 6}
                            />
                        </FormControl>
                    </Stack>
                    <Button mt={3} variant={'solid'} onClick={setToCalendar}>
                        설정
                    </Button>
                </Box>
            )}
        </Stack>
    )
}

export default SubmitFood
