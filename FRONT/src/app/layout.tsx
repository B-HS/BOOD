'use client'
import Header from '@/components/header'
import { AuthContext } from '@/module/auth'
import { initFirebase } from '@/module/firebase'
import { subscribe } from '@/module/subscribe'
import { Container } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import './globals.sass'
import Providers from './providers'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [authed, setAuthed] = useState(false)
    useEffect(() => {
        subscribe()
        initFirebase()
    }, [])

    return (
        <html lang='en'>
            <body>
                <Providers>
                    <AuthContext.Provider value={{ isAuthed: authed, setIsAuthed: setAuthed }}>
                        <Header />
                        <Container maxW={'container.xl'} h={'100vh'} pt={'5rem'}>
                            {children}
                        </Container>
                    </AuthContext.Provider>
                </Providers>
            </body>
        </html>
    )
}
