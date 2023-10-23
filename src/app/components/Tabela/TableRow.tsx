'use client'

import { useState } from 'react';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { useAppContext } from '@/contexts/appContext';
import { Typography } from '@mui/material';

type UserTableRowProps = {
  row: { [key: string]: any }
  setOpenEdit: (open: boolean) => void
}

export default function UserTableRow({ row, setOpenEdit }: UserTableRowProps) {
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const { removerColaborador } = useAppContext()

  const handleOpenMenu = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpen(event.currentTarget);
  };

  function handleDelete() {
    removerColaborador(row.id)
  }

  function handleEdit() {
    setOpenEdit(true)
  }

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">
        {
          Object.keys(row).filter((r)=> r !== 'id').map((key) => {
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
            *
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: { width: 100 } } }}
      >
        <MenuItem onClick={handleEdit}>
          +
          Edit
        </MenuItem>

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          X
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}