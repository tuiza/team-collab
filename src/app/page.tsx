import FormLogin from "./components/FormLogin";

interface LoginProps { }

export default function Home(props: LoginProps) {
  return (
    <div>
      <FormLogin/>
    </div>
  )
}