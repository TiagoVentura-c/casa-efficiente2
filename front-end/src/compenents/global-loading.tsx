import { Box, LinearProgress } from "@mui/material";

export default function GlobalLoading(){
    return(
        <Box sx={{ width: '100%',  }}>
            <LinearProgress variant={'determinate'} />
        </Box>
    )
}