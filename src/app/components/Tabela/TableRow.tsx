'use client'

import { ChangeEvent, useState } from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useAppContext } from '@/contexts/appContext';

import { Label } from '@mui/icons-material';

import { Colaborador } from '@/types/Colaborador';

type UserTableRowProps = {
  row: Colaborador
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

        <TableCell component="th" scope="row" padding="normal">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {row.nome}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{row.areas}</TableCell>
        <TableCell>{row.idade}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.regimeContratacao}</TableCell>

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