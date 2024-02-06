"use client"
import { Box, Toolbar } from "@mui/material";
import Header from "./header";
import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

import '../styles/global.css'
import { createTheme, ThemeProvider } from '@mui/material';
import { Provider } from "./provider";
import { QueryClient, QueryClientProvider } from "react-query";
import queryClient from "@/queries/QueryClient";



type Props = {
    children: React.ReactNode;
}
  
export default function MainContainer({ children }: Props){
    const font =  "'Poppins'"
    const { enqueueSnackbar } = useSnackbar()
        
    const darkTheme = createTheme({
        palette: {
        mode: 'dark',
        },
    });
    
    const lightTheme = createTheme({
        palette: {
            primary: {
            main: '#ffc107',
            },
            secondary: {
            main: '#2DCFC1',
            },
        },
        typography: {
            fontFamily: font,
        }
    });

    return(
        <ThemeProvider theme={lightTheme}>
            <QueryClientProvider client={queryClient} >
                <Provider>
                    <SnackbarProvider maxSnack={3}>
                    <Header />
                    <Box sx={{ display: 'flex', flex: 1 }}>
                        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                            {children}
                        </Box>
                    </Box>
                    </SnackbarProvider>
                </Provider>
            </QueryClientProvider>
        </ThemeProvider>
    )
}