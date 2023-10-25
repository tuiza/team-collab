"use client";
import { useState } from "react";
import Container from "@mui/material/Container";

import NovoColaborador from "./novoProjetos";
import Table from "@/app/components/Tabela";
import { Stack, Typography, Button } from "@mui/material";
import { useAppContext } from "@/contexts/appContext";

export default function UserPage() {
  const { projetos } = useAppContext();
  const [openNew, setOpenNew] = useState(false);

  return (
    <>
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
                <Typography variant="h4">Projetos</Typography>
                
                  <Button variant="contained" color="inherit"
                    onClick={() => setOpenNew(true)}>
                    Novo Projeto
                  </Button>
              
              </Stack>
              <Table
                data={projetos}
                labels={[
                  { id: 'nome', label: 'Nome' },
                  {id: 'tecnlogias', label: 'Tecnologias'},
                  { id: 'colaboradores', label: 'Colaboradores' },
                  { id: 'descricao', label: 'Descrição' },
                  { id: 'acoes', label: 'Ações' },
                ]}
                setOpenEdit={setOpenNew}
              />
            </>
          )
        }
      </Container>
    </>
  );
}
