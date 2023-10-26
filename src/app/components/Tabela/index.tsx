'use client'
import Card from "@mui/material/Card";
import ComponentTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import useTable from "./useTable";
import TableToolbar from "./Toolbar";
import TableHead from "./TableHead";
import TableRow from "./TableRow";
import { emptyRows } from "@/utils/tableUtils";
import TableNoData from "./NoData";
import TableEmptyRows from "./EmptyRows";
import Scrollbar from "../Scrollbar";
import { Row } from "@/types/Row";

type TableProps = {
    data: { [key: string]: any }[]
    setOpenEdit: (open: boolean) => void
    labels: { id: string, label: string }[]
    handleEdit: (row: Row) => void
}

const Table = ({ data, setOpenEdit, labels, handleEdit }: TableProps) => {
    const {
        handleChangePage,
        handleChangeRowsPerPage,
        notFound,
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
        <Card>
            <TableToolbar
                filterName={filterName}
                onFilterName={handleFilterByName}
            />

            <Scrollbar sx={{ overflow: "unset" }}>
                <TableContainer >
                    <ComponentTable sx={{ minWidth: 800 }}>
                        <TableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleSort}
                            headLabel={labels}
                            openEdit={setOpenEdit}

                        />
                        <TableBody>
                            {dataFiltered
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <TableRow
                                        key={row.id}
                                        row={row}
                                        handleEdit={handleEdit}
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

            </Scrollbar>
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
    )
}

export default Table
