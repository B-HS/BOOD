import { createClient } from '@/utils/supabase/server'
import { LogInIcon, LogOutIcon } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Button } from './ui/button'
import UserToast from './user-toast'

const LoginButton = async () => {
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
    }

    return (
        <>
            <UserToast user={user} />
            {user ? (
                <form action={signOut}>
                    <Button variant='ghost' size={'icon'}>
                        <LogOutIcon />
                    </Button>
                </form>
            ) : (
                <Button variant={'ghost'} size={'icon'} asChild>
                    <Link className='p-0' href={'/login'}>
                        <LogInIcon className='h-6 w-6' />
                    </Link>
                </Button>
            )}
        </>
    )
}

export default LoginButton
