import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import * as firebaseMessages from 'firebase/messaging'

const initFirebase = () => {
    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
    }

    getAnalytics(initializeApp(firebaseConfig))
    const message = firebaseMessages.getMessaging()
    firebaseMessages
        .getToken(message, {
            vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
        })
        .then((ctkn) => {
            if (ctkn) {
                console.log(ctkn)
            } else {
                console.log('regi failed')
            }
        })
}

export { initFirebase }
