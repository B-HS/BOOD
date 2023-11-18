'use client'
import Header from '@/components/header'
import { AuthContext } from '@/module/auth'
import { initFirebase } from '@/module/firebase'
import { subscribe } from '@/module/subscribe'
import { Container, Divider } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import './globals.sass'
import Providers from './providers'
import Footer from '@/components/footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const [authed, setAuthed] = useState(false)
    const [userinfo, setUserinfo] = useState({})
    const getUserinfo = async () => {
        const data = await initFirebase()
        setUserinfo(data)
    }

    const authContext = {
        userinfo: userinfo,
        loadUserinfo: getUserinfo,
        isAuthed: authed,
        setIsAuthed: setAuthed,
    }

    useEffect(() => {
        subscribe()
        getUserinfo()
    }, [])

    return (
        <html lang='en'>
            <body>
                <Providers>
                    <AuthContext.Provider value={authContext}>
                        <Header />
                        <Container maxW={'container.xl'} h={'100vh'} pt={'5rem'}>
                            {children}
                            <Divider py={3} />
                            <Footer />
                        </Container>
                    </AuthContext.Provider>
                </Providers>
            </body>
        </html>
    )
}
