'use client'
import { useState } from 'react';

import {
  Popover,
  MenuItem,
  Typography,
  TableCell,
  TableRow as TableRowComponent,
  IconButton
} from '@mui/material';
import { useAppContext } from '@/contexts/appContext';
import { FiMoreVertical, FiEdit, FiTrash2 } from "react-icons/fi";
import { Row } from '@/types/Row';

type TableRowProps = {
  row: Row
  handleEdit: (row: Row) => void
}

export default function TableRow({ row, handleEdit }: TableRowProps) {
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const { removerColaborador } = useAppContext()

  const handleOpenMenu = (event: any) => {
    setOpen(event.currentTarget);
  };

  function handleDelete() {
    removerColaborador(row.id)
  }


  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRowComponent hover tabIndex={-1} role="checkbox">
        {
          Object.keys(row).filter((r) => r !== 'id').map((key) => {
            if (key !== 'nome') {
              return <TableCell key={key} >{row[key]}</TableCell>
            } else {
              return <TableCell key={key} >
                <Typography noWrap>
                  {row.nome}
                </Typography>
              </TableCell>
            }
          }
          )
        }

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <FiMoreVertical />
          </IconButton>
        </TableCell>
      </TableRowComponent>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { width: 120 } } }}
      >
        <MenuItem onClick={()=> handleEdit(row)} >
          <FiEdit />
          <Typography sx={{ ml: 1 }}>Editar</Typography>
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <FiTrash2 />
          <Typography sx={{ ml: 1 }}> Apagar</Typography>
        </MenuItem>
      </Popover>
    </>
  );
}