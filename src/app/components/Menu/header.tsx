'use client'
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { FiAlignJustify } from "react-icons/fi";

import { HEADER, NAV } from './configMenu';
import { useResponsive } from '@/hooks/useResponsive';

type MenuProps = {
    onOpenNav: () => void;
};

export default function Menu({ onOpenNav }: MenuProps) {
    const theme = useTheme();

    const lgUp = useResponsive('up', 'lg');

    const renderContent = (
        <>
            {!lgUp && (
                <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
                    <FiAlignJustify/>
                </IconButton>
            )}
            <Box sx={{ flexGrow: 1 }} />
        </>
    );

    return (
        <AppBar
            sx={{
                boxShadow: 'none',
                height: HEADER.H_MOBILE,
                zIndex: theme.zIndex.appBar + 1,
                transition: theme.transitions.create(['height'], {
                    duration: theme.transitions.duration.shorter,
                }),
                ...(lgUp && {
                    width: `calc(100% - ${NAV.WIDTH + 1}px)`,
                    height: HEADER.H_DESKTOP,
                }),
                backgroundColor: theme.palette.background.default,
            }}
        >
            <Toolbar
                sx={{
                    height: 1,
                    px: { lg: 5 },
                }}
            >
                {renderContent}
            </Toolbar>
        </AppBar>
    );
}
