'use client'
import { useState } from 'react';

import Box from '@mui/material/Box';

import Nav from './nav';
import Main from './main';
import Header from './header';

import { useSession } from 'next-auth/react';

type DashboardLayoutProps = {
    children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [openNav, setOpenNav] = useState(false);
    const { data: session } = useSession();

    return (
        <Box
            sx={{
                minHeight: 1,
                display: 'flex',
                flexDirection: { xs: 'column', lg: 'row' },
            }}
        >
            {session && (
                <>
                    <Header onOpenNav={() => setOpenNav(true)} />
                    <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />
                </>
            )}

            <Main>{children}</Main>
        </Box>
    );
}
