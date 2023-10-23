"use client";
import { useState } from "react";
import Container from "@mui/material/Container";
import { colaboradores } from "@/public/mocks/colaboradores";
import NovoColaborador from "./novoColaborador";
import Table from "@/app/components/Tabela";

export default function UserPage() {
  // const { colaboradores } = useAppContext();
  const [novo, setNovo] = useState(false);

  return (
    <Container>
      {novo ?
        <NovoColaborador setNovo={(b: boolean) => setNovo(b)} /> :
        (<Table
          data={colaboradores}
        />)
      }
    </Container>
  );
}
