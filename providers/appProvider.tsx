'use client'
import AppContext from "@/contexts/appContext"
interface AppProviderProps {
    children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
    return (
        <AppContext>
            {children}
        </AppContext>
    )
}