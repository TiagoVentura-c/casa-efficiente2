import * as React from 'react';
import { useRouter } from "next/navigation";

import Grid from '@mui/material/Grid';
import BoxBorder from '../../BoxBorder';
import { Autocomplete, Box, Button, FormControl, Stack, Switch,  TextField,  Typography, Select, InputLabel, MenuItem } from '@mui/material';
import { BundleApi, LocationArea } from '@/_types';
import TInput from '@/compenents/TInput';
import SaveIcon from '@mui/icons-material/Save';
import { ServiceCreateBundle, ServiceEditBundle } from '@/services/bundles';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import useFetchLocationArea from '@/queries/locationArea';
import useFetchServiceType from '@/queries/serviceType';
import { useSnackbar } from 'notistack';


export default function EditBundle({edit=false, bundle }: { edit?: boolean, bundle?: BundleApi }) {
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter()
  const [disable, setDisable] = React.useState(edit)
  const { data: locationAreas }  = useFetchLocationArea()
  const { data: serviceTypes }  = useFetchServiceType()
  
  const [serviceType, setServiceType] = React.useState( edit ? bundle?.ServiceType: serviceTypes?.at(0));

  const [IsAvailableForOthers, setIsAvailableForOthers] = React.useState(bundle?.IsAvailableForOthers)
  const [IsPromotional, setIsPromotional] = React.useState(bundle?.IsPromotional)
  const [IsRecurring, setIsRecurring] = React.useState(bundle?.IsRecurring)
  const [AllowOverdraft, setAllowOverdraft] = React.useState(bundle?.AllowOverdraft)
  const [selectedOptions, setSelectedOptions] = React.useState<LocationArea[]>( bundle ? Object.keys(bundle?.Location_Areas ?? '').map(e => ({
        Description: '',
        Id: 0,
        Key: e,
        Municipality: '',
        Provinces: '',
        Type: '',
      })) : [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      try {
        if(bundle){
            const newBundle: BundleApi & { NewKey: string} = {
            Price: parseFloat( data.get('Price') as string),
            Key: bundle!.Key,
            Name_Lang1: data.get('Name_Lang1') as string,
            ServiceType: serviceType as string,
            Validity_In_Days: parseInt( data.get('Validity_In_Days') as string),
            Validity_Type: data.get('Validity_Type') as string,
            Validity_Value: parseInt(data.get('Validity_Value') as string),
            ChargingReason: data.get('ChargingReason') as string,
            Description_Lang1: data.get('Description_Lang1') as string,
            Description_Lang2: data.get('Description_Lang2') as string,
            Description_Lang3: data.get('Description_Lang3') as string,
            Id: bundle.Id,
            IsAvailableForOthers: IsAvailableForOthers!,
            IsPromotional: IsPromotional!,
            IsRecurring: IsRecurring!,
            AllowOverdraft: AllowOverdraft!,
            Location_Areas: selectedOptions.map(e => e.Key),
            Name_Lang2: data.get('Name_Lang2') as string,
            Name_Lang3: data.get('Name_Lang3') as string,
            Notification_Profile_AutoRenewAhead: data.get('Notification_Profile_AutoRenewAhead') as string,
            Notification_Profile_AutoRenewFailed_General: data.get('Notification_Profile_AutoRenewFailed_General') as string,
            Notification_Profile_AutoRenewFailed_LowBalance: data.get('Notification_Profile_AutoRenewFailed_LowBalance') as string,
            Notification_Profile_AutoRenewSuccessful: data.get('Notification_Profile_AutoRenewSuccessful') as string,
            Notification_Profile_Failed_General: data.get('Notification_Profile_Failed_General') as string,
            Notification_Profile_Failed_LowBalance: data.get('Notification_Profile_Failed_LowBalance') as string,
            Notification_Profile_Successful: data.get('Notification_Profile_Successful') as string,
            Notification_Sender: data.get('Notification_Sender') as string,
            OverdraftLimit: parseInt(data.get('OverdraftLimit') as string),
            ProductionFlag: parseInt(data.get('Description_Lang1') as string),
            RecuringBundleKey: data.get('Notification_Profile_Failed_LowBalance') as string,
            Status: data.get('Status') as string,
            NewKey: data.get('Key') as string,
          }
          await ServiceEditBundle(newBundle, Object.keys(bundle?.Location_Areas ?? []) )
          enqueueSnackbar('Bundles updated successful!', { variant: 'success' });
          router.back()
          return
        }

          const newBundle: BundleApi = {
          Price: parseFloat( data.get('Price') as string),
          Key: data.get('Key') as string,
          Name_Lang1: data.get('Name_Lang1') as string,
          ServiceType: serviceType as string,
          Validity_In_Days: parseInt( data.get('Validity_In_Days') as string),
          Validity_Type: data.get('Validity_Type') as string,
          Validity_Value: parseInt(data.get('Validity_Value') as string),
          ChargingReason: data.get('ChargingReason') as string,
          Description_Lang1: data.get('Description_Lang1') as string,
          Description_Lang2: data.get('Description_Lang2') as string,
          Description_Lang3: data.get('Description_Lang3') as string,
          Id: 0,
          IsAvailableForOthers: IsAvailableForOthers!,
          IsPromotional: IsPromotional!,
          IsRecurring: IsRecurring!,
          AllowOverdraft: AllowOverdraft!,
          Location_Areas: selectedOptions.map(e => e.Key),
          Name_Lang2: data.get('Name_Lang2') as string,
          Name_Lang3: data.get('Name_Lang3') as string,
          Notification_Profile_AutoRenewAhead: data.get('Notification_Profile_AutoRenewAhead') as string,
          Notification_Profile_AutoRenewFailed_General: data.get('Notification_Profile_AutoRenewFailed_General') as string,
          Notification_Profile_AutoRenewFailed_LowBalance: data.get('Notification_Profile_AutoRenewFailed_LowBalance') as string,
          Notification_Profile_AutoRenewSuccessful: data.get('Notification_Profile_AutoRenewSuccessful') as string,
          Notification_Profile_Failed_General: data.get('Notification_Profile_Failed_General') as string,
          Notification_Profile_Failed_LowBalance: data.get('Notification_Profile_Failed_LowBalance') as string,
          Notification_Profile_Successful: data.get('Notification_Profile_Successful') as string,
          Notification_Sender: data.get('Notification_Sender') as string,
          OverdraftLimit: parseInt(data.get('OverdraftLimit') as string),
          ProductionFlag: parseInt(data.get('Description_Lang1') as string),
          RecuringBundleKey: data.get('Notification_Profile_Failed_LowBalance') as string,
          Status: data.get('Status') as string,
        }
        await ServiceCreateBundle(newBundle)
        enqueueSnackbar('Bundles created successful!', { variant: 'success' });
        router.back()
        return
      } catch (error) {
          enqueueSnackbar('Failed to execute operation ' + error, { variant: 'error' });
      }

  }

  return (
    <Box sx={{ flexGrow: 1, }}>
        <BoxBorder mt={5} padding={4} >
          <FormControl onChange={() => disable ? setDisable(!disable): null} sx={{width: '60%', alignItems: 'flex-start',}}  component="form" onSubmit={handleSubmit}>
              <Stack direction={'row'} mb={4} >
                <Typography sx={{marginTop: '5', fontSize: '18px', flex: 1}} >Bundle information:</Typography>
              </Stack>

              <Grid container spacing={1} columns={4} justifyContent={'flex-start'} alignItems={'flex-start'}>
                  <TInput sx={{margin: 1}} title={'Key'}  value={bundle?.Key} placeholder='e.g.: 1139545792' id="Key" name="Key" type="text" required={false} />
                  <TInput sx={{margin: 1}} title={'Price'}  value={bundle?.Price} placeholder='e.g.:' id="Price" name="Price" type="text" required={false} />

                  <Box mb={3} height={40} alignSelf={'center'} >
                    <FormControl sx={{ m: 1, minWidth: 120, height: 60 }}>
                        <InputLabel id="demo-simple-select-helper-label">Service Type</InputLabel>
                        <Select
                            value={serviceType}
                            label="Service type"
                            onChange={(event) => setServiceType(event.target.value)}
                            sx={{ width: 150, height: 40 }}
                        > 
                            {
                                serviceTypes?.map( pv => <MenuItem key={pv.Key} value={pv.Key}>{pv.Key}</MenuItem>) 
                            }
                        </Select>
                      </FormControl>
                    </Box>

                  <TInput sx={{margin: 1}} title={'Name_Lang1'}  value={bundle?.Name_Lang1} placeholder='e.g.: Afrinet 2GB' id="Name_Lang1" name="Name_Lang1" type="text" required={false} />
                  <TInput sx={{margin: 1}} title={'Validity_Type'}  value={bundle?.Validity_Type} placeholder='e.g.:' id="Validity_Type" name="Validity_Type" type="text" required={false} />
                  <TInput sx={{margin: 1}} title={'Validity_Value'}  value={bundle?.Validity_Value} placeholder='e.g.:' id="Validity_Value" name="Validity_Value" type="text" required={false} />
                  <TInput sx={{margin: 1}} title={'Validity_In_Days'}  value={bundle?.Validity_In_Days} placeholder='e.g.:' id="Validity_In_Days" name="Validity_In_Days" type="text" required={false} />
                  <TInput sx={{margin: 1}} title={'Name_Lang2'}  value={bundle?.Name_Lang2} placeholder='e.g.:' id="Name_Lang2" name="Name_Lang2" type="text" required={false} />
                  <TInput sx={{margin: 1}} title={'Name_Lang3'}  value={bundle?.Name_Lang3} placeholder='e.g.:' id="Name_Lang3" name="Name_Lang3" type="text" required={false} />
                  <TInput sx={{margin: 1}} title={'Description_Lang1'}  value={bundle?.Description_Lang1} placeholder='e.g.:' id="Description_Lang1" name="Description_Lang1" type="text" required={false} />
                  <TInput sx={{margin: 1}} title={'Description_Lang2'}  value={bundle?.Description_Lang2} placeholder='e.g.:' id="Description_Lang2" name="Description_Lang2" type="text" required={false} />
                  <TInput sx={{margin: 1}} title={'Description_Lang3'}  value={bundle?.Description_Lang3} placeholder='e.g.:' id="Description_Lang3" name="Description_Lang3" type="text" required={false} />
                  <TInput sx={{margin: 1}} title={'ChargingReason'}  value={bundle?.ChargingReason} placeholder='e.g.:' id="ChargingReason" name="ChargingReason" type="text" required={false} />
                  <TInput sx={{margin: 1}} title={'OverdraftLimit'}  value={bundle?.OverdraftLimit} placeholder='e.g.:' id="OverdraftLimit" name="OverdraftLimit" type="text" required={false} />
                  <TInput sx={{margin: 1}} title={'Notification_Sender'}  value={bundle?.Notification_Sender} placeholder='e.g.:' id="Notification_Sender" name="Notification_Sender" type="text" required={false} />
                  <TInput sx={{margin: 1}} title={'Notification_Profile_Successful'}  value={bundle?.Notification_Profile_Successful} placeholder='e.g.:' id="Notification_Profile_Successful" name="Notification_Profile_Successful" type="text" required={false} />
                  <TInput sx={{margin: 1}} title={'Notification_Profile_Failed_General'}  value={bundle?.Notification_Profile_Failed_General} placeholder='e.g.:' id="Notification_Profile_Failed_General" name="Notification_Profile_Failed_General" type="text" required={false} />
                  <TInput sx={{margin: 1}} title={'Notification_Profile_Failed_LowBalance'}  value={bundle?.Notification_Profile_Failed_LowBalance} placeholder='e.g.:' id="Notification_Profile_Failed_LowBalance" name="Notification_Profile_Failed_LowBalance" type="text" required={false} />
                  <TInput sx={{margin: 1}} title={'Notification_Profile_AutoRenewAhead'}  value={bundle?.Notification_Profile_AutoRenewAhead} placeholder='e.g.:' id="Notification_Profile_AutoRenewAhead" name="Notification_Profile_AutoRenewAhead" type="text" required={false} />
                  <TInput sx={{margin: 1}} title={'Notification_Profile_AutoRenewSuccessful'}  value={bundle?.Name_Lang1} placeholder='e.g.:' id="Notification_Profile_AutoRenewSuccessful" name="Notification_Profile_AutoRenewSuccessful" type="text" required={false} />
                  <TInput sx={{margin: 1}} title={'Notification_Profile_AutoRenewFailed'}  value={bundle?.Notification_Profile_AutoRenewFailed_General} placeholder='e.g.:Notification_Profile_AutoRenewFailed_General' id="Notification_Profile_AutoRenewFailed_General" name="Notification_Profile_AutoRenewFailed_General" type="text" required={false} />
                  <TInput sx={{margin: 1}} title={'AutoRenewFailed_LowBalance'}  value={bundle?.Notification_Profile_AutoRenewFailed_LowBalance} placeholder='e.g.:' id="_AutoRenewFailed_LowBalance" name="_AutoRenewFailed_LowBalance" type="text" required={false} />
                  <TInput sx={{margin: 1}} title={'Status'}  value={bundle?.Status} placeholder='e.g.:' id="Status" name="Status" type="text" required={false} />
                  <TInput sx={{margin: 1}} title={'ProductionFlag'}  value={bundle?.ProductionFlag} placeholder='e.g.:' id="ProductionFlag" name="ProductionFlag" type="text" required={false} />
                  <TInput sx={{margin: 1}} title={'RecuringBundleKey'}  value={bundle?.RecuringBundleKey} placeholder='e.g.:' id="RecuringBundleKey" name="RecuringBundleKey" type="text" required={false} />

                  <Box mb={3} alignSelf={'center'} >
                    <CheckboxesTags locationAreas={locationAreas} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
                  </Box>

                  <Stack direction={'row'} >
                      <Stack  mb={3} m={2}  direction={'row'} alignContent={'center'} alignItems={'center'} >
                        <Typography color={'#6F7D97'} fontSize={12} >IsAvailableForOthers</Typography>
                        <Switch value={IsAvailableForOthers} onChange={() => setIsAvailableForOthers(!IsAvailableForOthers)} />
                      </Stack>
                      <Stack  mb={3} m={2}  direction={'row'} alignContent={'center'} alignItems={'center'} >
                        <Typography color={'#6F7D97'} fontSize={12} >IsPromotional</Typography>
                        <Switch value={IsPromotional} onChange={() => setIsPromotional(!IsPromotional)} />
                      </Stack>
                      <Stack  mb={3} m={2}  direction={'row'} alignContent={'center'} alignItems={'center'} >
                        <Typography color={'#6F7D97'} fontSize={12} >IsRecurring</Typography>
                        <Switch value={IsRecurring} onChange={() => setIsRecurring(!IsRecurring)} />
                      </Stack>
                      <Stack  mb={3} m={2}  direction={'row'} alignContent={'center'} alignItems={'center'} >
                        <Typography color={'#6F7D97'} fontSize={12} >AllowOverdraft</Typography>
                        <Switch value={AllowOverdraft} onChange={() => setAllowOverdraft(!AllowOverdraft)} />
                      </Stack>
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


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

 function CheckboxesTags({selectedOptions, setSelectedOptions, locationAreas=[]}: {selectedOptions: any, setSelectedOptions: any, locationAreas?: LocationArea[]}) {
  const handleChange = (event: any, value: any) => setSelectedOptions(value);

  return (
    <Autocomplete
      value={selectedOptions}
      onChange={handleChange}
      multiple
      options={locationAreas}
      disableCloseOnSelect
      getOptionLabel={(locationAreas) => locationAreas.Key}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.Key} - <Typography color={'white'} bgcolor={ option.Type == 'Province' ?  '#32a852': '#883199' } variant="subtitle2">{option.Type}</Typography>
        </li>
      )}
      style={{ width: 500, }}
      renderInput={(params) => (
        <TextField {...params} label="Select your location area" placeholder="search as you type" />
      )}
      
    />
  );
}
