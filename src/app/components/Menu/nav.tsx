'use client'
import { useCallback, useEffect } from 'react';

import {
    Avatar,
    Box,
    Drawer,
    Typography,
    ListItemButton,
    Stack,
} from '@mui/material';

import { alpha } from '@mui/material/styles';
import { useResponsive } from '@/hooks/useResponsive';

import navConfig from './navConfig';
import { NAV } from './configMenu';
import { account } from '@/public/mocks/accout';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type NavProps = {
    openNav: boolean;
    onCloseNav: () => void;
};

export default function Nav({ openNav, onCloseNav }: NavProps) {
    const pathname = usePathname();

    const upLg = useResponsive('up', 'lg');

    useEffect(() => {
        if (openNav) {
            onCloseNav();
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ pathname]);

    const renderAccount = (
        <Box
            sx={{
                my: 3,
                mx: 2.5,
                py: 2,
                px: 2.5,
                display: 'flex',
                borderRadius: 1.5,
                alignItems: 'center',
                bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
            }}
        >
             <Avatar src={account.photoURL} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2">{account.displayName}</Typography>
            </Box>
        </Box>
    );

    const renderMenu = (
        <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
            {navConfig.map((item) => (
                <NavItem key={item.title} item={item} />
            ))}
        </Stack>
    );

    const renderContent = (
        <Stack spacing={3} sx={{ height: 1 }}>
            {renderAccount}
            {renderMenu}

            <Box sx={{ flexGrow: 1 }} />
        </Stack>
    );

    return (
        <Box
            sx={{
                flexShrink: { lg: 0 },
                width: { lg: NAV.WIDTH },
            }}
        >
            {upLg ? (
                <Box
                    sx={{
                        height: 1,
                        position: 'fixed',
                        width: NAV.WIDTH,
                        borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
                    }}
                >
                    {renderContent}
                </Box>
            ) : (
                <Drawer
                    open={openNav}
                    onClose={onCloseNav}
                    PaperProps={{
                        sx: {
                            width: NAV.WIDTH,
                        },
                    }}
                >
                    {renderContent}
                </Drawer>
            )}
        </Box>
    );
}


// ----------------------------------------------------------------------

type NavItemProps = {
    item: {
        title: string;
        path: string;
    };
};

function NavItem({ item }: NavItemProps) {
    const pathname = usePathname();

    const active = item.path === pathname;

    return (
        <ListItemButton
            component={Link}
            href={item.path}
            sx={{
                minHeight: 44,
                borderRadius: 0.75,
                typography: 'body2',
                color: 'text.secondary',
                textTransform: 'capitalize',
                fontWeight: 'fontWeightMedium',
                ...(active && {
                    color: 'primary.main',
                    fontWeight: 'fontWeightSemiBold',
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                    '&:hover': {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                    },
                }),
            }}
        >

            <Box component="span">{item.title} </Box>
        </ListItemButton>
    );
}

