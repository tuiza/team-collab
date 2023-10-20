'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface FormLoginProps { }

export const FormLogin = (props: FormLoginProps) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password
        })
        if (result?.error) {
            alert(result.error)
        } else {
            router.refresh()
            router.push('/private')
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="email" onChange={e => setEmail(e.target.value)} />
                <input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}