'use client'

import Board from "@/compenents/dnd/board/Board";
import { generateQuoteMap } from "@/compenents/dnd/mockData";
import { Box,  } from "@mui/material";
import useFetchCatalogue from "@/queries/catalogue";
import useFetchBundle from "@/queries/bundles";

type Props = {
    params: { channelKey: string, planKey: string, version: number }
}

export default function App({ params }: Props){
  const { data, isLoading } = useFetchCatalogue()
  const { data: bundles, isLoading: isLoadingBundle } = useFetchBundle()
  
  const entries = generateQuoteMap(data?.find(c => c.channelKey == params.channelKey)?.plansPerVersion.find(pv => pv.version == params.version)
  ?.plans.find( p => p.planKey == decodeURIComponent( params.planKey))?.entries!, bundles)

    return(
      <Box mt={2}>
        { !isLoading && !isLoadingBundle && <Board initial={entries as any} withScrollableColumns />}  
      </Box>
    )
}