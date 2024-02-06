import * as React from 'react';
import { useRouter } from "next/navigation";

import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, FormControl, InputAdornment, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';

import DescriptionIcon from '@mui/icons-material/Description';
import {  BundleApi, CatalogueEntry, Plan } from '@/_types';
import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import AddIcon from '@mui/icons-material/Add';
import { AddEntryToCatalogue } from '@/services/catalogue';
import useFetchBundle from '@/queries/bundles';
import { useCatalogueMap } from '@/store/useCatalogueMap';

export default function ButttonNewEntry({ Key }: {Key: string}) {
  const [open, setOpen] = React.useState(false);
  
  return (
    <>
    <Button onClick={() => setOpen(true)}  variant="outlined" startIcon={<AddIcon />}>
      Add new entry
    </Button>
    <EntryForm open={open} setOpen={setOpen} Key={Key} />
    </>
  );
}



const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));



export function EntryForm({open, setOpen, edit=false, plan, Key }: {open: boolean, setOpen: any, edit?: boolean, plan?: Plan, Key: string } ) {
  const navigation = useRouter()
  const { data: bundles, } = useFetchBundle()

  const updateColumns = useCatalogueMap(state => state.updateColumns)
  const updateOrdered = useCatalogueMap(state => state.updateOrdered)
  const columns = useCatalogueMap(state => state.columns)
  const ordered = useCatalogueMap(state => state.ordered)
  
  const [loading, setLoading] = React.useState(false)
  const [disable, setDisable] = React.useState(edit)
  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      
      const data = new FormData(event.currentTarget);
      const selectedBundles: BundleApi[] = selectedOptions

      const order = data.get('Description') as string

      const newOrdered = [...ordered, order]
      columns[order] = selectedBundles.map(bundle => ({ id: bundle.Key+bundle.Description_Lang1, content: bundle}))

      updateOrdered(newOrdered)
      updateColumns(columns)


      handleClose()
      return

  }


  return (
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {edit? plan?.Key : 'Add new entry'}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
        <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <FormControl  onChange={() => disable ? setDisable(!disable): null} sx={{width: '60%', alignItems: 'flex-start',}}  component="form" onSubmit={handleSubmit}>
                    <Box mb={3} >
                        <Typography color={'#6F7D97'} fontSize={12} >Description</Typography>
                        <TextField
                            defaultValue={edit ? plan?.Key: undefined}
                            placeholder='e.g.: 1|Data|Daily'
                            variant="outlined" size='small' sx={{marginTop: 0.2, width: '270px', color: '#6F7D97', fontSize: '18px' }} 
                            id="Description"
                            name="Description"
                            type="tel"
                            required
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <DescriptionIcon fontSize='small' />
                                </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <Box mb={3} >
                        <Typography color={'#6F7D97'} fontSize={12} >Description_Lang1</Typography>
                        <TextField
                            id="Description_Lang1"
                            defaultValue={edit ? plan?.Key: undefined}
                            placeholder='e.g.: 1|Data|Daily'
                            variant="outlined" size='small' sx={{marginTop: 0.2, width: '270px', color: '#6F7D97', fontSize: '18px' }} 
                            name="Description_Lang1"
                            type="tel"
                            required
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <DescriptionIcon fontSize='small' />
                                </InputAdornment>
                                ),
                            }}
                        />
                    </Box><Box mb={3} >
                        <Typography color={'#6F7D97'} fontSize={12} >Description_Lang2</Typography>
                        <TextField
                            id="Description_Lang2"
                            defaultValue={edit ? plan?.Key: undefined}
                            placeholder='e.g.: 1|Data|Daily'
                            variant="outlined" size='small' sx={{marginTop: 0.2, width: '270px', color: '#6F7D97', fontSize: '18px' }} 
                            name="Description_Lang2"
                            type="tel"
                            required
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <DescriptionIcon fontSize='small' />
                                </InputAdornment>
                                ),
                            }}
                        />
                    </Box><Box mb={3} >
                        <Typography color={'#6F7D97'} fontSize={12} >Description_Lang3</Typography>
                        <TextField
                            id="Description_Lang3"
                            defaultValue={edit ? plan?.Key: undefined}
                            placeholder='e.g.: 1|Data|Daily'
                            variant="outlined" size='small' sx={{marginTop: 0.2, width: '270px', color: '#6F7D97', fontSize: '18px' }} 
                            name="Description_Lang3"
                            type="tel"
                            required
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <DescriptionIcon fontSize='small' />
                                </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    <CheckboxesTags selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} bundles={bundles as BundleApi[]} />
                    <LoadingButton
                        disabled={disable}
                        loading={loading}
                        type="submit"
                        color={'primary'}
                        size="small"
                        loadingPosition="center"
                        variant="contained"
                        sx={{width: '400px', borderRadius: 2, fontWeight: '550', fontSize: '16px', textTransform: 'none', mt: 1,  }}
                    >{edit ? 'Save changes': 'Add'}
                    </LoadingButton>
                </FormControl>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
  );
}

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

 function CheckboxesTags({selectedOptions, setSelectedOptions, bundles}: {selectedOptions: any, setSelectedOptions: any, bundles: BundleApi[]}) {
  const handleChange = (event: any, value: any) => setSelectedOptions(value);

  return (
    <Autocomplete
      onChange={handleChange}
      multiple
      id="checkboxes-tags-demo"
      options={bundles}
      disableCloseOnSelect
      getOptionLabel={(bundle) => bundle.Name_Lang1}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.Name_Lang1}
        </li>
      )}
      style={{ width: 400 }}
      renderInput={(params) => (
        <TextField {...params} label="Select your bundles" placeholder="search as you type" />
      )}
    />
  );
}
