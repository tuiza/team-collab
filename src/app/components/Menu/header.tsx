'use client'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { HEADER, NAV } from './configMenu';
import { bgBlur } from '@/theme/ThemeRegistry/css';
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
                    --
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
                ...bgBlur({
                    color: theme.palette.background.default,
                }),
                transition: theme.transitions.create(['height'], {
                    duration: theme.transitions.duration.shorter,
                }),
                ...(lgUp && {
                    width: `calc(100% - ${NAV.WIDTH + 1}px)`,
                    height: HEADER.H_DESKTOP,
                }),
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
