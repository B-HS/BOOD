import { axios } from './axios'

export interface FOOD {
    fid: number
    am: string
    pm: string
    date: Date | string
    insertdate: Date
}

export interface PERIOD {
    start: Date
    end: Date
}

const addFoods = async (foods: Partial<FOOD>[]) => {
    const { data } = await axios.post('/addfoods', { foods: foods })
    return data
}

const foodlist = async () => {
    const { data } = await axios.post('/foodlist')
    return data
}

const today = async () => {
    const { data } = await axios.get('/today')
    return data
}

const auth = async (pw: string) => {
    const { data } = await axios.post('/pw', { pw: pw })
    return data
}

export { addFoods, foodlist, today, auth }
