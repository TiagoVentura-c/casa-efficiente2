'use client'
import Immobiles from "@/compenents/immobile";
import { Box, Divider } from "@mui/material";

export default function App(){
    

    return(
        <Box mt={2} >
            <Divider style={{marginBottom: 10}} />
            <Immobiles />
        </Box>
    )
}