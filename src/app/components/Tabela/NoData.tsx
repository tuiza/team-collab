'use client'
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

type TableNoDataProps = {
  query: string;
};

export default function TableNoData({ query }: TableNoDataProps) {
  return (
    <TableRow>
      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
        <Paper
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" paragraph>
            Nenhum Resultado Encontrado
          </Typography>

          <Typography variant="body2">
            Sem resultados para &nbsp;
            <strong>&quot;{query}&quot;</strong>.
            <br />  
          </Typography>
        </Paper>
      </TableCell>
    </TableRow>
  );
}

