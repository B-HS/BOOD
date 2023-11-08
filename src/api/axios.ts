import axios from 'axios'
const axs = axios
const instance = axs.create({
    baseURL: process.env.NEXT_PUBLIC_BACK_IP,
    headers: {
        'Content-Type': 'application/json',
    },
})

export { instance as axios }
