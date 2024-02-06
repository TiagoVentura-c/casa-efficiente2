"use client"
import EditBundle from "@/compenents/accounts/acount-information/editBundle";
import { Box, } from "@mui/material";
import React from "react";

type Props = {
    params: { bundleKey: string }
}

export default function App({ params }: Props){

    return(
        <Box mt={2} >
            <EditBundle  />
        </Box>
    )
}