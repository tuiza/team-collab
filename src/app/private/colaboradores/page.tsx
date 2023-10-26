"use client";
import { useState } from "react";
import Container from "@mui/material/Container";

import NovoColaborador from "./novoColaborador";
import Table from "@/app/components/Tabela";
import { Stack, Typography, Button } from "@mui/material";
import { useAppContext } from "@/contexts/appContext";
import { tableHead } from "./tableHead";
import { Row } from "@/types/Row";

export default function Colaboradores() {
  const { colaboradores } = useAppContext();
  const [openNew, setOpenNew] = useState(false);
  const [rowData, setRowData] = useState<Row>([]);


  const handleEdit = (row?: Row) => {
    if (row) {
      setRowData(row)
    }
    setOpenNew(true)
  }

  return (
    <Container>
      {openNew ?
        <NovoColaborador setNovo={setOpenNew} rowData={rowData} /> :
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
                onClick={handleEdit}>
                Novo Colaborador
              </Button>

            </Stack>
            <Table
              data={colaboradores}
              labels={tableHead}
              setOpenEdit={setOpenNew}
              handleEdit={handleEdit}
            />
          </>
        )
      }
    </Container>
  );
}
