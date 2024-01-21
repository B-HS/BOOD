import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { RedirectType, redirect } from 'next/navigation'
import { Button } from './ui/button'

const AuthButton = async () => {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const signOut = async () => {
        'use server'
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        await supabase.auth.signOut()
        return redirect('/login')
    }

    return user ? (
        <form action={signOut}>
            <Button variant='outline'>Logout</Button>
        </form>
    ) : (
        <Button variant={'default'} asChild>
            <Link href='/login'>Login</Link>
        </Button>
    )
}

export default AuthButton
