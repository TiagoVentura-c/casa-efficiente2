import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import {CardAnimation} from './cardPlans'

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

import KeyIcon from '@mui/icons-material/Key';
import DescriptionIcon from '@mui/icons-material/Description';
import { AppContextInterface, AuthContext } from '../provider';
import {  Plan } from '@/_types';
import { ServiceCreateChannels, ServiceEditChannels } from '@/services/channels';
import { useSnackbar } from 'notistack';

export default function CardNewPlan() {

  const [open, setOpen] = React.useState(false);
  
  return (
    <>
    <CardAnimation>
      <Card onClick={() => setOpen(true)}   sx={{maxHeight: 150, maxWidth: 250, borderRadius: 5, border: 1, borderColor: '#DDDDDD'}}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              +
            </Avatar>
          }
        />
        <CardContent sx={{  }} >
          <Typography variant="body2" color="text.secondary">{''}</Typography>
          <Typography sx={{fontWeight: 500, fontSize: '20px', color: '#25282C'}} >{'Create new channel'}</Typography>
        </CardContent>
      </Card>
    </CardAnimation>

    <PlanInfo open={open} setOpen={setOpen} />
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



export function PlanInfo({open, setOpen, edit=false, plan }: {open: boolean, setOpen: any, edit?: boolean, plan?: Plan } ) {
  const [loading, setLoading] = React.useState(false)
  const [disable, setDisable] = React.useState(edit)
  const { enqueueSnackbar } = useSnackbar();


  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const planKey = data.get('planKey') as string
      const description = data.get('description') as string
      const id = data.get('Id') as string

      setLoading(true)
      try {
          if(!edit){
            const newPlan = await ServiceCreateChannels({Key: planKey, Description: description, Id: 0})
            enqueueSnackbar('Channel created succesful!', { variant: 'success' });
            return setOpen(false)
          }

          const newPlan: Plan & { NewKey: string } = await ServiceEditChannels({Key: plan?.Key as string, Description: description, Id: parseInt(id), NewKey: planKey})
          enqueueSnackbar('Channel updated succesful!', { variant: 'success' });
          return setOpen(false)
      } catch (error) {
          enqueueSnackbar('Failed to execute operation ' + error, { variant: 'error' });
      }
      finally{
        setLoading(false)
      }

  }


  return (
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {edit? plan?.Key : 'Create new plan'}
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
                    {
                      edit && <Box mb={3} >
                      <Typography color={'#6F7D97'} fontSize={12} >Id</Typography>
                      <TextField
                          value={plan?.Id}
                          placeholder='e.g.: Ussd, Afrivendas'
                          variant="outlined" size='small' sx={{marginTop: 0.2, width: '270px', color: '#6F7D97', fontSize: '18px' }} 
                          id="Id"
                          name="Id"
                          type="number"
                          required
                          InputProps={{
                              startAdornment: (
                              <InputAdornment position="start">
                                  <KeyIcon fontSize='small' />
                              </InputAdornment>
                              ),
                              readOnly: true,
                          }}
                      />
                  </Box>
                    }
                    <Box mb={3} >
                        <Typography color={'#6F7D97'} fontSize={12} >Key</Typography>
                        <TextField
                            defaultValue={edit ? plan?.Key: undefined}
                            placeholder='e.g.: Kuyuyu, Konekta'
                            variant="outlined" size='small' sx={{marginTop: 0.2, width: '270px', color: '#6F7D97', fontSize: '18px' }} 
                            id="planKey"
                            name="planKey"
                            type="tel"
                            required
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <KeyIcon fontSize='small' />
                                </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    <Box mb={3}>
                        <Typography color={'#6F7D97'} fontSize={12} >Description</Typography>
                        <TextField
                            defaultValue={edit ? plan?.Description: undefined}
                            placeholder='e.g.: This Plan is used costumers'
                            variant="outlined" size='small' sx={{marginTop: 0.2, width: '270px', color: '#6F7D97', fontSize: '18px' }} 
                            id="description"
                            name="description"
                            type="tel"
                            required
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <DescriptionIcon fontSize='small' />
                                </InputAdornment>
                                ),
                            }}
                            multiline
                            rows={4}
                        />
                    </Box>
                   
                    <LoadingButton
                        disabled={disable}
                        loading={loading}
                        type="submit"
                        color={'primary'}
                        size="small"
                        loadingPosition="center"
                        variant="contained"
                        sx={{width: '377px', borderRadius: 2, fontWeight: '550', fontSize: '16px', textTransform: 'none', mt: 1  }}
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