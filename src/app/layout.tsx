'use client'
import { ChakraProvider, Container } from '@chakra-ui/react'
import { getAnalytics } from 'firebase/analytics'
import { FirebaseApp, initializeApp } from 'firebase/app'
import * as firebaseMessages from 'firebase/messaging'
import { useEffect, useRef } from 'react'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const app = useRef<FirebaseApp>()
    const analytics = useRef<object>()
    useEffect(() => {
        const firebaseConfig = {
            apiKey: process.env.NEXT_PUBLIC_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
            projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
            messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
            appId: process.env.NEXT_PUBLIC_APP_ID,
            measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
        }

        app.current = initializeApp(firebaseConfig)
        analytics.current = getAnalytics(app.current)

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
    }, [])

    return (
        <html lang='en'>
            <body>
                <ChakraProvider>
                    <Container maxW={'container.xl'} h={'100vh'}>
                        {children}
                    </Container>
                </ChakraProvider>
            </body>
        </html>
    )
}
