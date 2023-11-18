import { updateToken } from '@/api/token'
import { AuthContext } from '@/module/auth'
import { Box, Container, Flex, Heading, IconButton, Menu, MenuButton, MenuItem, MenuList, Switch, Text, useToast } from '@chakra-ui/react'
import { useContext } from 'react'
import Github from './svg/github'
import Logo from './svg/logo'
import Setting from './svg/setting'

const Header = () => {
    const authContext = useContext(AuthContext)
    const toast = useToast()

    const infoUpdate = async (which: 'isAm' | 'isPm' | 'nickname') => {
        const updatedToken = { ...authContext.userinfo, [which]: !authContext.userinfo[which] }
        const { data } = await updateToken(updatedToken)
        if (!!data) {
            toast({
                title: '구독',
                description: data[which] ? '구독되었습니다' : '구독이 취소되었습니다',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            authContext.loadUserinfo && authContext.loadUserinfo()
        }
    }

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
                        BOOD
                    </Heading>
                </Flex>

                <Flex alignItems={'center'} justifyContent={'flex-end'} w={'full'} h={'full'} gap={1}>
                    <Menu>
                        <IconButton
                            onClick={() => window.open('https://github.com/b-hs', '_blank')}
                            icon={<Github />}
                            aria-label='github'
                            p={2}
                            variant={'ghost'}
                        />
                        <MenuButton p={2} variant={'ghost'} icon={<Setting />} as={IconButton} />
                        <MenuList>
                            <MenuItem as={Switch} isChecked={authContext.userinfo['isAm'] as boolean} onChange={() => infoUpdate('isAm')}>
                                <Text pt={0.5}>오전 알람</Text>
                            </MenuItem>
                            <MenuItem as={Switch} isChecked={authContext.userinfo['isPm'] as boolean} onChange={() => infoUpdate('isPm')}>
                                <Text pt={0.5}>오후 알람</Text>
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Container>
        </Box>
    )
}

export default Header
