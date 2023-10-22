import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"

const schemaLogin = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(2, "Senha inválida").max(100),
});

type FormLoginType = z.infer<typeof schemaLogin>;

export default function useLogin() {
    const router = useRouter()
    const [errorAuth, setErrorAuth] = useState('');

    const { handleSubmit, register, formState: { errors } } = useForm<FormLoginType>(
        {
            criteriaMode: 'all',
            mode: 'all',
            resolver: zodResolver(schemaLogin),
            defaultValues: {
                email: '',
                senha: ''
            }
        }
    )
    

    const handleFormSubimit = async (data: any) => {
        const result = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.senha
        })
        if (result?.error) {
            setErrorAuth('Email ou senha inválidos')
        } else {
            router.refresh()
            router.push('/private')
        }
    }

    return {
        handleSubmit,
        handleFormSubimit,
        register,
        errors,
        errorAuth
    }
}