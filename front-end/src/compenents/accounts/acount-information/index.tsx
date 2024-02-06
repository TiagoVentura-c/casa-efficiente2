import * as React from 'react';
import Grid from '@mui/material/Grid';
import BoxBorder from '../../BoxBorder';
import { Box, FormControl, Stack, Switch,  Typography } from '@mui/material';
import { AppContextInterface, AuthContext } from '@/compenents/provider';
import { BundleApi } from '@/_types';
import TInput from '@/compenents/TInput';


export default function AccountInformation({edit=true, bundle }: { edit?: boolean, bundle?: BundleApi }) {
  
  const context: AppContextInterface = React.useContext(AuthContext)
  const [loading, setLoading] = React.useState(false)
  const [disable, setDisable] = React.useState(edit)


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      // event.preventDefault();
      // const data = new FormData(event.currentTarget);
      // const key = data.get('key') as string
      // const description = data.get('description') as string
      // const id = data.get('Id') as string

      // setLoading(true)

      // try {
      //     if(!edit){
      //       const newST = await ServiceCreateServiceTypes({Key: key, Description: description, Id: 0})
      //       context.setServiceTypes([...context.serviceTypes, newST])
      //       alert('Service type created succesful')
      //       return setOpen(false)
      //     }

      //     const newST: Plan & { NewKey: string } = await ServiceEditServiceTypes({Key: cardInfo?.Key as string, Description: description, Id: parseInt(id), NewKey: key})
      //     context.setServiceTypes([...context.serviceTypes.filter(ch => ch.Id != newST.Id), {...newST, Key: newST.NewKey}])
      //     alert('Service type edited succesful')
      //     return setOpen(false)

      // } catch (error) {
      //     alert(error)
      // }
      // finally{
      //   setLoading(false)
      // }

  }

  return (
    <Box sx={{ flexGrow: 1, }}>
        <BoxBorder mt={5} padding={4} >
          <FormControl onChange={() => disable ? setDisable(!disable): null} sx={{width: '60%', alignItems: 'flex-start',}}  component="form" onSubmit={handleSubmit}>
              <Stack direction={'row'} mb={4} >
                <Typography sx={{marginTop: '5', fontSize: '18px', flex: 1}} >Bundle information:</Typography>
              </Stack>

              <Grid container spacing={2} columns={4} justifyContent={'flex-start'} alignItems={'flex-start'}>
                  { edit && <TInput title={'Id'}  value={bundle?.Id} placeholder='e.g.:' id="Id" name="Id" type="number" required defaultValue={edit ? bundle?.Id: undefined} InputProps={{ readOnly: true,}} /> }
                  <TInput title={'Name_Lang1'}  value={bundle?.Name_Lang1} placeholder='e.g.:' id="Name_Lang1" name="Name_Lang1" type="text" required />
                  <TInput title={'Name_Lang2'}  value={bundle?.Name_Lang2} placeholder='e.g.:' id="Name_Lang2" name="Name_Lang2" type="text" required />
                  <TInput title={'Name_Lang3'}  value={bundle?.Name_Lang3} placeholder='e.g.:' id="Name_Lang3" name="Name_Lang3" type="text" required />
                  <TInput title={'Description_Lang1'}  value={bundle?.Description_Lang1} placeholder='e.g.:' id="Description_Lang1" name="Description_Lang1" type="text" required />
                  <TInput title={'Description_Lang2'}  value={bundle?.Description_Lang2} placeholder='e.g.:' id="Description_Lang2" name="Description_Lang2" type="text" required />
                  <TInput title={'Description_Lang3'}  value={bundle?.Description_Lang3} placeholder='e.g.:' id="Description_Lang3" name="Description_Lang3" type="text" required />
                  <TInput title={'Validity_Type'}  value={bundle?.Validity_Type} placeholder='e.g.:' id="Validity_Type" name="Validity_Type" type="text" required />
                  <TInput title={'Validity_Value'}  value={bundle?.Validity_Value} placeholder='e.g.:' id="Validity_Value" name="Validity_Value" type="text" required />
                  <TInput title={'Validity_In_Days'}  value={bundle?.Validity_In_Days} placeholder='e.g.:' id="Validity_In_Days" name="Validity_In_Days" type="text" required />
                  <TInput title={'Price'}  value={bundle?.Price} placeholder='e.g.:' id="Price" name="Price" type="text" required />
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
                  <TInput title={'Notification_Profile_AutoRenewFailed_LowBalance'}  value={bundle?.Notification_Profile_AutoRenewFailed_LowBalance} placeholder='e.g.:' id="Notification_Profile_AutoRenewFailed_LowBalance" name="Notification_Profile_AutoRenewFailed_LowBalance" type="text" required />
                  <TInput title={'Status'}  value={bundle?.Status} placeholder='e.g.:' id="Status" name="Status" type="text" required />
                  <TInput title={'Status_Time'}  value={bundle?.Status} placeholder='e.g.:' id="Status_Time" name="Status_Time" type="text" required />
                  <TInput title={'ProductionFlag'}  value={bundle?.ProductionFlag} placeholder='e.g.:' id="ProductionFlag" name="ProductionFlag" type="text" required />
                  <TInput title={'IsRecurring'}  value={bundle?.IsRecurring} placeholder='e.g.:' id="IsRecurring" name="IsRecurring" type="text" required />
                  <TInput title={'RecuringBundleKey'}  value={bundle?.RecuringBundleKey} placeholder='e.g.:' id="RecuringBundleKey" name="RecuringBundleKey" type="text" required />
                  <TInput title={'IsAvailableForOthers'}  value={bundle?.IsAvailableForOthers} placeholder='e.g.:' id="IsAvailableForOthers" name="IsAvailableForOthers" type="text" required />
                  <TInput title={'IsPromotional'}  value={bundle?.IsPromotional} placeholder='e.g.:' id="IsPromotional" name="IsPromotional" type="text" required />
                  <TInput title={'Location_Areas'}  value={bundle?.Location_Areas} placeholder='e.g.:' id="Location_Areas" name="Location_Areas" type="text" required />


                <Stack direction={'row'} alignContent={'center'} alignItems={'center'} >
                    <Typography sx={{ color: '#5B5B5B', fontWeight: '500' }} >Testing Switch </Typography>
                    <Switch  />
                </Stack>
                <Stack direction={'row'} alignContent={'center'} alignItems={'center'} >
                    <Typography sx={{ color: '#5B5B5B', fontWeight: '500' }} >Testing Switch </Typography>
                    <Switch  />
                </Stack>
              </Grid>
        </FormControl>
        </BoxBorder>
    </Box>
  );
}

