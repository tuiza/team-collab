'use client'
import { FormLogin } from "../../auth/components/FormLogin/FormLogin";

interface LoginProps { }

export default function Login(props: LoginProps) {
    return (
        <div>
            <FormLogin />
        </div>
    )
}