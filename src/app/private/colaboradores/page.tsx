"use client";
import { useState } from "react";
import Container from "@mui/material/Container";

import NovoColaborador from "./novoColaborador";
import Table from "@/app/components/Tabela";
import { Stack, Typography, Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useAppContext } from "@/contexts/appContext";

export default function UserPage() {
  const { colaboradores } = useAppContext();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";
  const [openNew, setOpenNew] = useState(false);


  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Colaboradores</Typography>
        {isAdmin && (
          <Button variant="contained" color="inherit"
            onClick={() => setOpenNew(true)}>
            Novo Colaborador
          </Button>
        )}
      </Stack>
      {openNew ?
        <NovoColaborador setNovo={setOpenNew} /> :
        (
          <Table
            data={colaboradores}
            setOpenEdit={setOpenNew}
          />)
      }
    </Container>
  );
}
