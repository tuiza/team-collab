'use client'

import { useSession } from "next-auth/react"

export default function PublicPage() {
    const { data: session, status } = useSession()
    return (
        <>
        <h1>Publica</h1>
            {session && <pre>{JSON.stringify(session, null, 2)}</pre>}
        </>
    )
}
