import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import BoxBorder from './BoxBorder';
import { Box } from '@mui/material';

export default function SkeletonBundleCard() {
  return (
    <BoxBorder width={220} height={130}>
        <Stack direction={'row'}  margin={2} >
            <Box flex={1}  sx={{flex: 1}}><Skeleton variant="circular" width={40} height={40} /></Box>
            <Skeleton variant="text" sx={{width: 55 }} />
        </Stack>

        <Stack direction={'column'} margin={2} >
            <Skeleton variant="text" sx={{color: '#001733', fontSize: '14px', fontStyle: 'italic' }} />
            <Skeleton width={60} variant="text" />
        </Stack>
    </BoxBorder>
  );
}