import { createContext } from 'react'

const AuthContext = createContext({
    userinfo: {} as Record<string, string | boolean | Date | number>,
    loadUserinfo: null as null | Function,
    isAuthed: false,
    setIsAuthed: null as null | Function,
})

export { AuthContext }
