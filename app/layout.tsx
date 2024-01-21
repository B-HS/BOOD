import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import './globals.css'

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
        <html lang='ko'>
            <body>{isSupabaseConnected ? <main>{children}</main> : <section>500 Error</section>}</body>
        </html>
    )
}

export default RootLayout
