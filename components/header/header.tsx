import SITE_CONFIG from '@/config/site'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { CookingPotIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import LoginButton from '../login-button'
import { Button } from '../ui/button'
import Link from 'next/link'

const SiteHeader = () => {
    return (
        <header className='sticky top-0 z-50 w-full border-b border-border/35 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70'>
            <div className='container flex h-14 justify-between items-center'>
                <Link href={'/'} className='flex gap-2'>
                    <CookingPotIcon /> <span className='text-lg font-bold'>FOOD</span>
                </Link>
                <nav className='flex items-center'>
                    <Button variant={'ghost'} size={'icon'} asChild>
                        <Link className='p-0' href={SITE_CONFIG.links.github}>
                            <GitHubLogoIcon className='h-6 w-6' />
                        </Link>
                    </Button>
                    <LoginButton />
                </nav>
            </div>
        </header>
    )
}

export default SiteHeader
