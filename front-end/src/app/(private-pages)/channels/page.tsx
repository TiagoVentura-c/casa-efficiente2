'use client'
import Contracts from "@/compenents/contracts";
import { Box, Divider,  } from "@mui/material";

export default function App(){
    

    return(
        <Box mt={2} >
            <Divider style={{marginBottom: 10}} />
            <Contracts />
        </Box>
    )
}