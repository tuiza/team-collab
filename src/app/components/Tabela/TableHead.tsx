import {
  Box,
  TableRow,
  TableSortLabel,
  TableHead as TableHeadComponent,
  TableCell
} from '@mui/material'
import  { TableCellProps } from '@mui/material/TableCell';
import { visuallyHidden } from '@/utils/tableUtils';
export interface HeadCell {
  id: string;
  align?: TableCellProps['align'];
  width?: string;
  minWidth?: string;
  label: string;
}

interface ColaboradoresTableHeadProps {
  order: 'asc' | 'desc' | undefined;
  orderBy: string | undefined;
  headLabel: HeadCell[];
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  openEdit: (open: boolean) => void
}

export default function TableHead({
  order,
  orderBy,
  headLabel,
  onRequestSort,
}: ColaboradoresTableHeadProps) {

  const onSort = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHeadComponent>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align || 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ width: headCell.width, minWidth: headCell.minWidth }}
          >
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={onSort(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHeadComponent>
  );
}