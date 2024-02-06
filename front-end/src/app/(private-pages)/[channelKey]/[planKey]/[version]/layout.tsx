'use client'
import {useState } from 'react';
import { useCatalogueMap } from '@/store/useCatalogueMap';

import Box from '@mui/material/Box';
import { Button, Divider, Stack, Typography } from '@mui/material';
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ButttonNewEntry from '@/compenents/entries/NewEntry';
import useFetchCatalogue from '@/queries/catalogue';
import SaveIcon from '@mui/icons-material/Save';
import { ServiceUpdateEntriesCatalogue } from '@/services/catalogue';
import { CatalogueMap } from '@/_types';
import { useSnackbar } from 'notistack';


type Props = {
    children: React.ReactNode;
    params: { channelKey: string, planKey: string, version: number }
}

export default function RootLayout({ children, params }: Props) {
    const { enqueueSnackbar } = useSnackbar();
    const { data, } = useFetchCatalogue()
    const key = data?.find(c => c.channelKey == params.channelKey)?.plansPerVersion.find(pv => pv.version == params.version)?.plans.find(p => p.planKey == decodeURIComponent(params.planKey))

    const columns = useCatalogueMap(state => state.columns)
    const ordered = useCatalogueMap(state => state.ordered)


    const handleSave = async () => {
      
      try {
        await ServiceUpdateEntriesCatalogue(key?.Key as string, ordered, columns as CatalogueMap)
        enqueueSnackbar('Entries updated succesful!', { variant: 'success' });
      } catch (error) {
        enqueueSnackbar('Failed to execute operation ' + error, { variant: 'error' });
      }

    }

    return (
        <Box sx={{marginTop: 10, marginLeft: 30}} >
            <Typography sx={{color: '#25282C', fontSize: '30px', fontWeight: '500', marginBottom: 2, marginTop: 2 }} >{`${decodeURIComponent(params.channelKey)} > ${decodeURIComponent(params.planKey)} > ${params.version}`}</Typography>
            <Box sx={{ width: '100%',  }}>
                <Stack direction={'row'} spacing={2} >
                  <ToggleViewType />
                    <ButttonNewEntry Key={key?.Key as string} />
                    <Button onClick={handleSave} variant="outlined" startIcon={<SaveIcon />}>
                      Save changes
                    </Button>
                </Stack>
                <Divider />
            </Box>
            {children}
        </Box>
    );
}


 function ToggleViewType() {
  const [view, setView] = useState('list');

  const handleChange = (event: React.MouseEvent<HTMLElement>, nextView: string) => {
    setView(nextView);
  };

  return (
    <ToggleButtonGroup
      orientation="horizontal"
      value={view}
      exclusive
      onChange={handleChange}
      style={{marginBottom: 2,  display: 'flex' }}
      size='small'
    >
      <Typography alignSelf={'center'} mr={2}>View type: </Typography>
      <ToggleButton value="module" aria-label="module">
        <ViewModuleIcon />
      </ToggleButton>
      <ToggleButton value="list" aria-label="list">
        <ViewListIcon />
      </ToggleButton>
      
    </ToggleButtonGroup>
  );
}
