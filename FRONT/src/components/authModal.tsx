import { auth } from '@/api/food'
import { AuthContext } from '@/module/auth'
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast,
} from '@chakra-ui/react'
import { useContext, useState } from 'react'

const AuthModal = ({ children }: { children: React.ReactNode }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [pw, setPw] = useState('')
    const pwOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setPw(e.target.value)
    const appContext = useContext(AuthContext)
    const toast = useToast()
    const authCheck = async () => {
        if ((await auth(pw)) === true) {
            appContext.setIsAuthed && appContext.setIsAuthed(true)
            onClose()
        } else {
            toast({
                title: 'Auth Failed !',
                description: 'Please check your password.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }
    return (
        <>
            <Box onClick={onOpen}>{children}</Box>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>pw</FormLabel>
                            <Input type='password' value={pw} onChange={pwOnChange} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant={'outline'} mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant={'outline'} onClick={authCheck}>
                            Secondary Action
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AuthModal
