'use client'
import theme from '@/config/theme'
import { ChakraProvider } from '@chakra-ui/react'

const Providers = ({ children }: { children: React.ReactNode }) => {
    return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}

export default Providers
