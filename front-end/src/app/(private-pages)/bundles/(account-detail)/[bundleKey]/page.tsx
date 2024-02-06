"use client"
import { BundleApi } from "@/_types";
import EditBundle from "@/compenents/accounts/acount-information/editBundle";
import useFetchBundle from "@/queries/bundles";
import { Box, } from "@mui/material";
import React from "react";

type Props = {
    params: { bundleKey: string }
}

export default function App({ params }: Props){
    const { data }  = useFetchBundle( params.bundleKey )

    return(
        <Box mt={2}>
            {
                (data && data.length > 0 )?
            <EditBundle bundle={data[0]} edit />
                : <h1>Bundle not found</h1>
            }
        </Box>
    )
}