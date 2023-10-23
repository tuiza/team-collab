'use client'
import { FormLogin } from "../app/auth/components/FormLogin/FormLogin";

interface LoginProps { }

export default function Login(props: LoginProps) {
  return (
    <div>
      <FormLogin />
    </div>
  )
}