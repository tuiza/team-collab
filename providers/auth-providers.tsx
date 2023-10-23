'use client'

import { SessionProvider } from "next-auth/react"
import { AppProvider } from "./appProvider"

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    return (
        <SessionProvider>
            <AppProvider>
                {children}
            </AppProvider>
        </SessionProvider>
    )
}