import { addToken } from '@/api/token'
import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import * as firebaseMessages from 'firebase/messaging'

const initFirebase = async () => {
    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_APP_ID,
    }

    getAnalytics(initializeApp(firebaseConfig))
    const message = firebaseMessages.getMessaging()
    const ctkn = await firebaseMessages.getToken(message, {
        vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
    })
    if (ctkn) {
        const data = await addToken(ctkn)
        if (!!data) {
            return data
        }
    } else {
        return 'NOTOKEN'
    }
}

export { initFirebase }
