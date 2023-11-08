import { axios } from './axios'

const getVapidPublicKey = () => {
    return axios.get('/web-push/public-key')
}

export { getVapidPublicKey }
