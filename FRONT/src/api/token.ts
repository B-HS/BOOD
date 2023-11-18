import { axios } from './axios'

const addToken = async (token: string) => {
    const { data } = await axios.post('/addtoken', { token })
    return data
}

const updateToken = async (updatedToken: Record<string, string | boolean | Date | number>) => await axios.post('/updatetoken', updatedToken)

export { addToken, updateToken }
