import { ChangeEvent, useState } from "react";
import { applyFilter, getComparator } from "@/utils/tableUtils";

export default function useTable(data: { [key: string]: any }[]) {
  const [page, setPage] = useState<number>(0);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("name");
  const [filterName, setFilterName] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleSort = (event: React.MouseEvent<unknown>, id: string) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleChangePage = (
    event: React.MouseEvent<unknown> | null,
    newPage: number
  ) => {
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
    inputData: data,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return {
    handleSort,
    handleChangePage,
    handleChangeRowsPerPage,
    handleFilterByName,
    notFound,
    dataFiltered,
    rowsPerPage,
    page,
    filterName,
    order,
    orderBy,
  };
}
