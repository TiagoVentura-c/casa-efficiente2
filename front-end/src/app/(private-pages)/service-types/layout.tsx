'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { TabGroup } from '@/compenents/tab-group';

type Props = {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
    return (
        <Box sx={{marginTop: 10, marginLeft: 30}}>
            <Typography sx={{color: '#25282C', fontSize: '30px', fontWeight: '500', marginBottom: 2, marginTop: 2 }} >Usuarios</Typography>
            <Box sx={{ width: '100%',  }}>
                <TabGroup
                    path="/location-and-regions"
                    items={[
                        {
                        text: 'Corretores',
                        },
                        {
                            text: 'Clientes',
                            segment: 'location-entries',
                            slug: 'clients'
                        }
                    ]}
                />
            </Box>
            {children}
        </Box>
    );
}


//location-entries