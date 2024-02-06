"use client"
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import '../styles/global.css'
import { ThemeProvider } from '@mui/material';


var theme = createTheme({
    palette: {
        primary: {
          main: '#ffc107',
        },
        secondary: {
          main: '#2DCFC1',
        },
      },
  });

  theme = responsiveFontSizes(theme);

type Props = {
    children: React.ReactNode;
}


export default function MainContainerAuth({ children }: Props){
    return(
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}