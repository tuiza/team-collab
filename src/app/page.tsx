import Link from "next/link";
import Header from "./components/Menu";

export default function Home() {
  return (
    <>
      <Link href="/private/projetos">
        <h1>Gerenciar projetos</h1>
      </Link>
      <Link href="/private/colaboradores">
        <h1>Gerenciar colaboradores</h1>
      </Link>
      <Link href="/signIn">
        <h1>Ir pra auth</h1>
      </Link>
    </>
  )
}
