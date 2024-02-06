'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Divider, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ConfirmDeleteDialog from '@/compenents/confirm-delete-dialog';
import { useRouter } from 'next/navigation';
import { BundleApi } from '@/_types';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SaveIcon from '@mui/icons-material/Save';
import useFetchBundle from '@/queries/bundles';

type Props = {
    children: React.ReactNode;
    params: { bundleKey: string }
}

export default function RootLayout({ children, params }: Props) {
    const { data }  = useFetchBundle( params.bundleKey )

    return(
        <Box sx={{marginTop: 10, marginLeft: 30}}>
            <Box   flexGrow={1}>
                <Stack direction={'column'} sx={{ width: '100%',  }} paddingY={1} spacing={-0.2} >
                    <MButton />
                    <Typography sx={{color: '#25282C', fontSize: '20px', fontWeight: '500', marginBottom: 2, }} >{ data ?  data[0].Name_Lang1 : ''}</Typography>
                </Stack>
                <Divider />
                <Stack direction={'row'} mt={2} spacing={2} >
                    <Typography sx={{flex: 1 }} >Bundle details</Typography>
                    <Button onClick={() => alert('In development')} variant="outlined" startIcon={<ContentCopyIcon />}>
                        Copy to JSON
                    </Button>
                    <ConfirmDeleteDialog bundle={ data ? data[0] : undefined}/>
                </Stack>
                <Box   >
                    {children}
                </Box>
            </Box>
        </Box>
    )
}

function MButton () {
    const router = useRouter()
   
    return(
        <ListItemButton sx={{maxWidth: 120}} onClick={() => router.back()} >
            <ListItemIcon sx={{ ml: -2}} >
                <ArrowBackIcon sx={{}} />
            </ListItemIcon>
            <ListItemText primary={'Bundles'} sx={{ marginLeft: -3, color: '#25282C',  }} />
        </ListItemButton>
    )
}