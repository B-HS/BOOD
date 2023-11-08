'use client'
import { initFirebase } from '@/module/firebase'
import { subscribe } from '@/module/subscribe'
import { ChakraProvider, Container } from '@chakra-ui/react'
import { useEffect } from 'react'
import './globals.sass'

export default function RootLayout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        subscribe()
        initFirebase()
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
