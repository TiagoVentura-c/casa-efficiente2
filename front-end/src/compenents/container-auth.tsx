'use client'
import Image from 'next/image'
import { Box, Stack, Typography,  } from '@mui/material'
import styles from '../app/(public-pages)/auth/login/login.module.css'

type Props = {
    children: React.ReactNode;
}

export default function ContainerAuth({ children }: Props){
    return (
        <Box sx={{ position: 'fixed',  }} >
            <Box sx={{position: 'absolute', width: '100%', height: '100%', top: 0, display: 'flex', }} >
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: 1, }} >
                        <Stack direction="row" spacing={2} sx={{height: '53%', width: '55%', marginTop: -20, borderRadius: 5, boxShadow: 20, justifyContent: 'center'  }} >
                            <Stack direction="column"  >
                                {children}
                            </Stack>
                        </Stack>
                </Box>
            </Box>
            <div>
                <Image src="/images/auth-background.svg" alt="Background image" width={1} height={1} className={styles.logo} style={{ objectFit: 'cover',  }} />
            </div>
        </Box>
    )
}