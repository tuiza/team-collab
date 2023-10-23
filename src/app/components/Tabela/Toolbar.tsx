'use client'
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

type UserTableToolbarProps = {
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function UserTableToolbar({filterName, onFilterName }: UserTableToolbarProps) {
  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
        <OutlinedInput
          value={filterName}
          onChange={onFilterName}
          placeholder="Pesquisar pelo nome"
          startAdornment={
            <InputAdornment position="start">
              {/* <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              /> */}
            </InputAdornment>
          }
        />
        <Tooltip title="Filter list">
          <IconButton>
          {/*   <Iconify icon="ic:round-filter-list" /> */}
          </IconButton>
        </Tooltip>
    </Toolbar>
  );
}
