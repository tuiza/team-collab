'use client'
import Toolbar from '@mui/material/Toolbar';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { FiSearch } from "react-icons/fi";

type TableToolbarProps = {
  filterName: string;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TableToolbar({filterName, onFilterName }: TableToolbarProps) {
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
              <FiSearch/>
            </InputAdornment>
          }
        />
    </Toolbar>
  );
}
