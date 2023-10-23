import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { applyFilter, getComparator } from "@/utils/utils";
import { HeadCell } from "./TableHead";

export default function useTable(data) {
  const [page, setPage] = useState<number>(0);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string>("name");
  const [filterName, setFilterName] = useState<string>("");
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [novo, setNovo] = useState(false);
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

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
    
    console.log(data)

  const dataFiltered = applyFilter({
    inputData: data,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const getLabels = (): HeadCell => {
    let labels = [
      { id: "nome", label: "Nome" },
      { id: "areas", label: "Áreas" },
      { id: "projetos", label: "Projetos" },
      { id: "idade", label: "Idade" },
      { id: "email", label: "Email" },
      { id: "status", label: "Status" },
    ];
    if (isAdmin) {
      return labels.push(
        ...[{ id: "regimeContratacao", label: "Regime Contratação" }]
      );
    } else return labels;
  };

  return {
    handleSort,
    handleChangePage,
    handleChangeRowsPerPage,
    handleFilterByName,
    getLabels,
    isAdmin,
    notFound,
    dataFiltered,
    rowsPerPage,
    page,
    filterName,
    order,
    orderBy,
  };
}
