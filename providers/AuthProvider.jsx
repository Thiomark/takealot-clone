import { createContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)


    return (
        <AuthContext.Provider value={{ user, error }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext