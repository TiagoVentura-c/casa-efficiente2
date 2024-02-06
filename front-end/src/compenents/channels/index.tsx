import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Box, } from '@mui/material';
import { AppContextInterface, AuthContext } from '@/compenents/provider';
import CardPlan from './cardPlans';
import CardNewPlan from './cardNewPlan'
import { ServiceGetPlans } from '@/services/plans';
import useFetchChannel from '@/queries/channels';

export default function Channels() {

  const { data } = useFetchChannel()
  return (
    <Box sx={{ flexGrow: 1, }}>
      <Grid container spacing={{ xs: 0.1, md: 2 }} columns={{ xs: 12, sm: 4, md: 12 }} sx={{  }} >
            {
               data?.map((c, index) =>
                 (
                <Grid item xs={2} sm={1.8} md={2.5} key={index} sx={{}} >
                    <CardPlan plan={c} icon='/images/current-usage.svg'  />
                </Grid>
                 )
                )
            }
            <Grid item xs={2} sm={1.8} md={2.5} key={'877'} sx={{}} >
                <CardNewPlan  />
            </Grid>
      </Grid>
    </Box>
  );
}

