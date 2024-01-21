import SiteHeader from '@/components/header/header'
import { Toaster } from '@/components/ui/toaster'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import './globals.css'

export const runtime = 'edge'
const RootLayout = ({ children }: { children: React.ReactNode }) => {
    const cookieStore = cookies()
    const canInitSupabaseClient = () => {
        try {
            createClient(cookieStore)
            return true
        } catch (e) {
            return false
        }
    }
    const isSupabaseConnected = canInitSupabaseClient()
    return (
        <html lang='ko' suppressHydrationWarning>
            <body className='max-w-screen max-h-screen h-screen w-screen flex flex-col'>
                <SiteHeader />
                <section className='container w-full h-full'>{isSupabaseConnected ? children : <span>500 Error</span>}</section>
                <Toaster />
            </body>
        </html>
    )
}

export default RootLayout
