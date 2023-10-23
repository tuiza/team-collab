
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import ComponentTable from "@mui/material/Table";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";

import useTable from "./useTable";
import { useState } from "react";
import UserTableToolbar from "./Toolbar";
import UserTableHead from "./TableHead";
import UserTableRow from "./TableRow";
import { emptyRows } from "@/utils/utils";
import TableNoData from "./NoData";
import TableEmptyRows from "./EmptyRows";

type TableProps = {
    data: any
    btnCreateLabel?: string
}

const Table = ({ data }: TableProps) => {
    const [openNew, setOpenNew] = useState(false);
    const {
        getLabels,
        handleChangePage,
        handleChangeRowsPerPage,
        notFound,
        isAdmin,
        dataFiltered,
        handleSort,
        rowsPerPage,
        page,
        handleFilterByName,
        order,
        orderBy,
        filterName
    } = useTable(data)
    return (
        <>
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

            <Card>
                <UserTableToolbar
                    filterName={filterName}
                    onFilterName={handleFilterByName}
                />

                <TableContainer sx={{ overflow: "unset" }}>
                    <ComponentTable sx={{ minWidth: 800 }}>
                        <UserTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleSort}
                            headLabel={getLabels()}
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
                                    />
                                ))}

                            <TableEmptyRows
                                height={77}
                                emptyRows={emptyRows(page, rowsPerPage, data.length)}
                            />

                            {notFound && <TableNoData query={filterName} />}
                        </TableBody>
                    </ComponentTable>
                </TableContainer>

                <TablePagination
                    page={page}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </>
    )
}

export default Table
