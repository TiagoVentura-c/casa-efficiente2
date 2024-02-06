'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import { Divider, Typography } from '@mui/material';

type Props = {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {

    return (
        <Box sx={{marginTop: 10, marginLeft: 30}}>
            <Typography sx={{color: '#25282C', fontSize: '30px', fontWeight: '500', background: 'transparent', marginTop: 2 }} >
                Alugar/Comprar imoveis
            </Typography>
            <Divider />
            {children}
        </Box>
    );
}


