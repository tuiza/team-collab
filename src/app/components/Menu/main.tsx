'use client'

import Box from '@mui/material/Box';
import { useResponsive } from '@/hooks/useResponsive';

import { HEADER, NAV } from './configMenu';

const SPACING = 8;

type MainProps = {
    children: React.ReactNode;
    sx?: object;
} & React.ComponentProps<typeof Box>;

export default function Main({ children, sx, ...props }: MainProps) {
    const lgUp = useResponsive('up', 'lg');

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                minHeight: 1,
                display: 'flex',
                flexDirection: 'column',
                py: `${HEADER.H_MOBILE + SPACING}px`,
                ...(lgUp && {
                    px: 2,
                    py: `${HEADER.H_DESKTOP + SPACING}px`,
                    width: `calc(100% - ${NAV.WIDTH}px)`,
                }),
                ...sx,
            }}
            {...props}
        >
            {children}
        </Box>
    );
}