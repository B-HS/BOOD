import { createContext } from 'react'

const AuthContext = createContext({
    isAuthed: false,
    setIsAuthed: null as null | Function,
})

export { AuthContext }
