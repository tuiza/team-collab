'use client'

import A from "@/contexts/appContext"

interface AppProviderProps {
    children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
    return (
        <A>
            {children}
        </A>
    )
}