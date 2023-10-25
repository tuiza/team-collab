"use client";
import { useState } from "react";
import Container from "@mui/material/Container";

import NovoColaborador from "./novoColaborador";
import Table from "@/app/components/Tabela";
import { Stack, Typography, Button } from "@mui/material";
import { useAppContext } from "@/contexts/appContext";
import { tableHead } from "./tableHead";

export default function UserPage() {
  const { colaboradores } = useAppContext();
  const [openNew, setOpenNew] = useState(false);

  return (
    <Container>
      {openNew ?
        <NovoColaborador setNovo={setOpenNew} /> :
        (
          <>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={5}
            >
              <Typography variant="h4">Colaboradores</Typography>

              <Button variant="contained" color="inherit"
                onClick={() => setOpenNew(true)}>
                Novo Colaborador
              </Button>

            </Stack>
            <Table
              data={colaboradores}
              labels={tableHead}
              setOpenEdit={setOpenNew}
            />
          </>
        )
      }
    </Container>
  );
}
