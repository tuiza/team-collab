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

import { Label } from '@mui/icons-material';

import { Colaborador } from '@/types/Colaborador';

export interface UserTableRowProps extends Colaborador {
}

export default function UserTableRow({
  nome,
  areas,
  email,
  idade,
  projetos,
  regimeContratacao,
}: UserTableRowProps) {
  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: React.ChangeEvent<HTMLInputElement> ) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">

        <TableCell component="th" scope="row" padding="normal">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {nome}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>{areas}</TableCell>
        <TableCell>{projetos}</TableCell>
        <TableCell>{regimeContratacao}</TableCell>
        <TableCell>{idade}</TableCell>
        <TableCell>{email}</TableCell>

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
        <MenuItem onClick={handleCloseMenu}>
         X
          Edit
        </MenuItem>

        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          X
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}