'use client'

import { Box, Button, Divider, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography, useTheme } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";
import PackageDetaill from "@/compenents/package-details";
import LoadingButton from '@mui/lab/LoadingButton';


type Props = {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
    return(
        <Box sx={{marginTop: 10, marginLeft: 30}}>
            <Box   flexGrow={1}>
                <Stack direction={'column'} sx={{ width: '100%',  }} paddingY={1} spacing={-0.2} >
                    <MButton />
                    <Typography sx={{color: '#25282C', fontSize: '25px', fontWeight: '500', marginBottom: 2, }} >Internet</Typography>
                    <PackageDetaill />
                </Stack>
                <Divider />
                <Box   >
                    {children}
                </Box>
            </Box>
            <Footer />
        </Box>
    )
}

function MButton () {
    return(
        <ListItemButton sx={{maxWidth: 100}} >
            <ListItemIcon sx={{ ml: -2}} >
                <ArrowBackIcon sx={{}} />
            </ListItemIcon>
            <Link href={`/shop`} 
                style={{textDecoration: 'none', fontWeight: 'Semi-Bold' }} 
            >
                <ListItemText primary={'Shop'} sx={{ marginLeft: -3, color: '#25282C',  }} />
            </Link>
        </ListItemButton>
    )
}



function Footer () {
    const theme = useTheme()

    return(
        <Box sx={{position: 'absolute', bottom: 0,
        left: 0,
        width: '100%',
        padding: theme.spacing(2),
         }} 
        >
            <Divider />
            <Stack direction={'row'} sx={{ alignItems: 'center' }} >
                <Button>Cancel</Button>
                <LoadingButton
                    color={'primary'}
                    size="small"
                    loadingPosition="center"
                    variant="contained"
                    sx={{ borderRadius: 2, fontWeight: '550', fontSize: '16px', textTransform: 'none',  }}
                >Send
                </LoadingButton>
            </Stack>
        </Box>
    )
}