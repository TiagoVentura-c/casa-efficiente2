import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Box, } from '@mui/material';
import MCard from './card';
import CardNewPlan from './cardNew'

export default function Plans() {

  
  return (
    <Box sx={{ flexGrow: 1, }}>
      <Grid container spacing={{ xs: 0.1, md: 2 }} columns={{ xs: 12, sm: 4, md: 12 }} sx={{  }} >
            {
              
            }
            <Grid item xs={2} sm={1.8} md={2.5} key={'877'} sx={{}} >
                <CardNewPlan  />
            </Grid>
      </Grid>
    </Box>
  );
}

