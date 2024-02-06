import * as React from 'react';
import { useRouter } from "next/navigation";


import Grid from '@mui/material/Grid';
import BoxBorder from '../../BoxBorder';
import { Box, Button, FormControl, Stack, Switch,  Typography } from '@mui/material';

import { BundleApi } from '@/_types';
import TInput from '@/compenents/TInput';
import SaveIcon from '@mui/icons-material/Save';
import { ServiceCreateBundle } from '@/services/bundles';

export default function NewBundle({edit=true, bundle }: { edit?: boolean, bundle?: BundleApi }) {
  const router = useRouter()
  const [disable, setDisable] = React.useState(edit)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const bundle: BundleApi = {
        Price: parseFloat( data.get('Price') as string),
        Key: data.get('Key') as string,
        Name_Lang1: data.get('Name_Lang1') as string,
        ServiceType: data.get('ServiceType') as string,
        Validity_In_Days: parseInt( data.get('Validity_In_Days') as string),
        Validity_Type: data.get('Validity_Type') as string,
        Validity_Value: 0,
        ChargingReason: '',
        Description_Lang1: data.get('Description_Lang1') as string,
        Description_Lang2: data.get('Description_Lang1') as string,
        Description_Lang3: data.get('Description_Lang1') as string,
        Id: 0,
        IsAvailableForOthers: false,
        IsPromotional: false,
        IsRecurring: false,
        AllowOverdraft: false,
        Location_Areas: '',
        Name_Lang2: data.get('Description_Lang1') as string,
        Name_Lang3: data.get('Description_Lang1') as string,
        Notification_Profile_AutoRenewAhead: '',
        Notification_Profile_AutoRenewFailed_General: '',
        Notification_Profile_AutoRenewFailed_LowBalance: '',
        Notification_Profile_AutoRenewSuccessful: '',
        Notification_Profile_Failed_General: '',
        Notification_Profile_Failed_LowBalance: '',
        Notification_Profile_Successful: '',
        Notification_Sender: '',
        OverdraftLimit: 0,
        ProductionFlag: 1,
        RecuringBundleKey: '',
        Status: '',
      }

      try {
        await ServiceCreateBundle(bundle)
        alert('Bundles created successful')
        router.back()
        return
      } catch (error) {
          alert(error)
      }

  }

  return (
    <Box sx={{ flexGrow: 1, }}>
        <BoxBorder mt={5} padding={4} >
          <FormControl onChange={() => disable ? setDisable(!disable): null} sx={{width: '60%', alignItems: 'flex-start',}}  component="form" onSubmit={handleSubmit}>
              <Stack direction={'row'} mb={4} >
                <Typography sx={{marginTop: '5', fontSize: '18px', flex: 1}} >Bundle information:</Typography>
              </Stack>

              <Grid container spacing={2} columns={4} justifyContent={'flex-start'} alignItems={'flex-start'}>
                  <TInput title={'Key'}  value={bundle?.Name_Lang1} placeholder='e.g.: 1139545792' id="Key" name="Key" type="text" required />
                  <TInput title={'Price'}  value={bundle?.Price} placeholder='e.g.:' id="Price" name="Price" type="text" required />
                  <TInput title={'Name_Lang1'}  value={bundle?.Name_Lang1} placeholder='e.g.: Afrinet 2GB' id="Name_Lang1" name="Name_Lang1" type="text" required />
                  <TInput title={'ServiceType'}  value={bundle?.ServiceType} placeholder='e.g.:' id="ServiceType" name="ServiceType" type="text" required />
                  <TInput title={'Validity_Type'}  value={bundle?.Validity_Type} placeholder='e.g.:' id="Validity_Type" name="Validity_Type" type="text" required />
                  <TInput title={'Validity_Value'}  value={bundle?.Validity_Value} placeholder='e.g.:' id="Validity_Value" name="Validity_Value" type="text" required />
                  <TInput title={'Validity_In_Days'}  value={bundle?.Validity_In_Days} placeholder='e.g.:' id="Validity_In_Days" name="Validity_In_Days" type="text" required />
                  <TInput title={'Name_Lang2'}  value={bundle?.Name_Lang2} placeholder='e.g.:' id="Name_Lang2" name="Name_Lang2" type="text" required />
                  <TInput title={'Name_Lang3'}  value={bundle?.Name_Lang3} placeholder='e.g.:' id="Name_Lang3" name="Name_Lang3" type="text" required />
                  <TInput title={'Description_Lang1'}  value={bundle?.Description_Lang1} placeholder='e.g.:' id="Description_Lang1" name="Description_Lang1" type="text" required />
                  <TInput title={'Description_Lang2'}  value={bundle?.Description_Lang2} placeholder='e.g.:' id="Description_Lang2" name="Description_Lang2" type="text" required />
                  <TInput title={'Description_Lang3'}  value={bundle?.Description_Lang3} placeholder='e.g.:' id="Description_Lang3" name="Description_Lang3" type="text" required />
                  <TInput title={'ChargingReason'}  value={bundle?.ChargingReason} placeholder='e.g.:' id="ChargingReason" name="ChargingReason" type="text" required />
                  <TInput title={'AllowOverdraft'}  value={bundle?.AllowOverdraft} placeholder='e.g.:' id="AllowOverdraft" name="AllowOverdraft" type="text" required />
                  <TInput title={'OverdraftLimit'}  value={bundle?.OverdraftLimit} placeholder='e.g.:' id="Notification_Sender" name="Notification_Sender" type="text" required />
                  <TInput title={'Notification_Sender'}  value={bundle?.Notification_Sender} placeholder='e.g.:' id="Name_Lang1" name="Name_Lang1" type="text" required />
                  <TInput title={'Notification_Profile_Successful'}  value={bundle?.Notification_Profile_Successful} placeholder='e.g.:' id="Notification_Profile_Successful" name="Notification_Profile_Successful" type="text" required />
                  <TInput title={'Notification_Profile_Failed_General'}  value={bundle?.Notification_Profile_Failed_General} placeholder='e.g.:' id="Notification_Profile_Failed_General" name="Notification_Profile_Failed_General" type="text" required />
                  <TInput title={'Notification_Profile_Failed_LowBalance'}  value={bundle?.Notification_Profile_Failed_LowBalance} placeholder='e.g.:' id="Notification_Profile_Failed_LowBalance" name="Notification_Profile_Failed_LowBalance" type="text" required />
                  <TInput title={'Notification_Profile_AutoRenewAhead'}  value={bundle?.Notification_Profile_AutoRenewAhead} placeholder='e.g.:' id="Name_Lang1" name="Name_Lang1" type="text" required />
                  <TInput title={'Notification_Profile_AutoRenewSuccessful'}  value={bundle?.Name_Lang1} placeholder='e.g.:' id="Notification_Profile_AutoRenewSuccessful" name="Notification_Profile_AutoRenewSuccessful" type="text" required />
                  <TInput title={'Notification_Profile_AutoRenewFailed_General'}  value={bundle?.Notification_Profile_AutoRenewFailed_General} placeholder='e.g.:' id="Notification_Profile_AutoRenewFailed_General" name="Notification_Profile_AutoRenewFailed_General" type="text" required />
                  <TInput title={'Notification_Profile'}  value={bundle?.Notification_Profile_AutoRenewFailed_LowBalance} placeholder='e.g.:' id="_AutoRenewFailed_LowBalance" name="_AutoRenewFailed_LowBalance" type="text" required />
                  <TInput title={'Status'}  value={bundle?.Status} placeholder='e.g.:' id="Status" name="Status" type="text" required />
                  <TInput title={'ProductionFlag'}  value={bundle?.ProductionFlag} placeholder='e.g.:' id="ProductionFlag" name="ProductionFlag" type="text" required />
                  <TInput title={'RecuringBundleKey'}  value={bundle?.RecuringBundleKey} placeholder='e.g.:' id="RecuringBundleKey" name="RecuringBundleKey" type="text" required />
                  <TInput title={'Location_Areas'}  value={bundle?.Location_Areas} placeholder='e.g.:' id="Location_Areas" name="Location_Areas" type="text" required />

                  <Stack  mb={3} m={2}  direction={'row'} alignContent={'center'} alignItems={'center'} >
                    <Typography color={'#6F7D97'} fontSize={12} >IsAvailableForOthers</Typography>
                    <Switch  />
                  </Stack>
                  <Stack  mb={3} m={2}  direction={'row'} alignContent={'center'} alignItems={'center'} >
                    <Typography color={'#6F7D97'} fontSize={12} >IsPromotional</Typography>
                    <Switch  />
                  </Stack>
                  <Stack  mb={3} m={2}  direction={'row'} alignContent={'center'} alignItems={'center'} >
                    <Typography color={'#6F7D97'} fontSize={12} >IsRecurring</Typography>
                    <Switch  />
                  </Stack>
                
                
              </Grid>
              <Button type='submit' variant="outlined" startIcon={<SaveIcon />}>
                  Save changes
              </Button>
        </FormControl>
        </BoxBorder>
    </Box>
  );
}

