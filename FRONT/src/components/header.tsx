import { Box, Container, Flex, Heading, IconButton } from '@chakra-ui/react'
import AuthModal from './authModal'
import Github from './svg/github'
import Logo from './svg/logo'
import Pen from './svg/pen'

const Header = () => {
    return (
        <Box position='fixed' as='nav' w='100%' css={{ backdropFilter: 'blur(5px)' }} zIndex={2}>
            <Container
                borderBottomWidth={1}
                display={'flex'}
                maxW={'container.xl'}
                h={'3.5rem'}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <Flex alignItems={'center'} justifyContent={'flex-start'} w={'full'} h={'full'} gap={1}>
                    <IconButton icon={<Logo />} aria-label='bood' p={2} variant={'ghost'} />
                    <Heading pt={1} fontSize={'lg'}>
                        {' '}
                        BOOD{' '}
                    </Heading>
                </Flex>

                <Flex alignItems={'center'} justifyContent={'flex-end'} w={'full'} h={'full'} gap={1}>
                    <IconButton icon={<Github />} aria-label='github' p={2} variant={'ghost'} />
                    <AuthModal>
                        <IconButton icon={<Pen />} aria-label='edit' p={2} variant={'ghost'} />
                    </AuthModal>
                </Flex>
            </Container>
        </Box>
    )
}

export default Header
