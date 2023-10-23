import Box from '@mui/material/Box';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@/utils/utils';

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

export default function UserTableHead({
  order,
  orderBy,
  headLabel,
  onRequestSort,
}: ColaboradoresTableHeadProps) {

  const onSort = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
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
    </TableHead>
  );
}