"use client";
import { ChangeEvent, useState } from "react";

import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import TableNoData from "./Tabela/NoData";
import UserTableRow from "./Tabela/TableRow";
import UserTableHead from "./Tabela/TableHead";
import TableEmptyRows from "./Tabela/EmptyRows";
import UserTableToolbar from "./Tabela/Toolbar";
import { emptyRows, applyFilter, getComparator } from "./utils";
import { colaboradores } from "@/public/mocks/colaboradores";
import { useRouter } from "next/navigation";
import NovoColaborador from "./novoColaborador";

export default function UserPage() {
  const [page, setPage] = useState<number>(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState<string>('name');
  const [filterName, setFilterName] = useState<string>('');
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  // const { colaboradores } = useAppContext();
  const [novo, setNovo] = useState(false);

  const handleSort = (event: React.MouseEvent<unknown>, id: string) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = colaboradores.map((n) => n.nome);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: ChangeEvent<HTMLInputElement>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: React.MouseEvent<unknown> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event: ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: colaboradores,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      {novo ? <NovoColaborador setNovo={(b: boolean) => setNovo(b)} /> :
        (<>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mb={5}
          >
            <Typography variant="h4">Colaboradores</Typography>

            <Button variant="contained" color="inherit"
              onClick={() => setNovo(true)}>
              Novo Colaborador
            </Button>
          </Stack>

          <Card>
            <UserTableToolbar
              numSelected={selected.length}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <TableContainer sx={{ overflow: "unset" }}>
              <Table sx={{ minWidth: 800 }}>
                <UserTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={colaboradores.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: "nome", label: "Nome" },
                    { id: "areas", label: "Áreas" },
                    { id: "projetos", label: "Projetos" },
                    { id: "regimeContratacao", label: "Regime Contratação" },
                    { id: "idade", label: "Idade" },
                    { id: "email", label: "Email" },
                    { id: "status", label: "Status" },
                  ]}
                />
                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <UserTableRow
                        key={row.id}
                        id="id"
                        nome={row.nome}
                        areas={row.areas}
                        projetos={row.projetos}
                        regimeContratacao={row.regimeContratacao}
                        idade={row.idade}
                        email={row.email}
                        selected={selected.indexOf(row.nome) !== -1}
                        handleClick={(event) => handleClick(event, row.name)}
                      />
                    ))}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, colaboradores.length)}
                  />

                  {notFound && <TableNoData query={filterName} />}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              page={page}
              component="div"
              count={colaboradores.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </>
        )
      }
    </Container>
  );
}
