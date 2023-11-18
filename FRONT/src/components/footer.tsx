import { Flex, IconButton } from '@chakra-ui/react'
import AuthModal from './authModal'
import Pen from './svg/pen'

const Footer = () => {
    return (
        <Flex justifyContent={'flex-end'} alignItems={'baseline'} gap={3} my={2} px={1}>
            <AuthModal>
                <IconButton icon={<Pen />} aria-label='edit' p={3} variant={'ghost'} />
            </AuthModal>
        </Flex>
    )
}

export default Footer
