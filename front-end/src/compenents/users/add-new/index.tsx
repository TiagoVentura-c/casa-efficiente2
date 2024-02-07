import * as React from 'react';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {FormControl, InputAdornment, MenuItem, Select, } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';

import KeyIcon from '@mui/icons-material/Key';
import TInput from '@/compenents/TInput';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useSnackbar } from 'notistack';
import { Contract, Person } from '@/_types/index2';
import { ServiceCreatePerson, ServiceUpdatePerson } from '@/services/person';
import { useQueryClient } from 'react-query';

export default function AddNew() {

  const [open, setOpen] = React.useState(false);
  
  return (
    <>
        <Button onClick={() => setOpen(true)} variant="outlined" startIcon={<AddIcon />}>
          Adicionar novo usuario
        </Button>
        <LocationEntryInfo open={open} setOpen={setOpen} edit={false} />
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



export function LocationEntryInfo({open, setOpen, edit=false, item }: {open: boolean, setOpen: any, edit?: boolean, item?: Person } ) {
  const [loading, setLoading] = React.useState(false)
  const [disable, setDisable] = React.useState(edit)
  const { enqueueSnackbar } = useSnackbar();
  const [type, setType] = React.useState< 'BROKER' | 'CLIENT' | 'ADMIN' >('CLIENT')
  const queryClient = useQueryClient();

  const handleClose = () => {
    setOpen(false);
    item=undefined
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      setLoading(true)
      

      try {
          const person: Person = {
            firstName: data.get('firstName') as string,
            lastName: data.get('lastName') as string,
            address: data.get('address') as string,
            nationalId: data.get('nationalId') as string,
            email: data.get('email') as string,
            id: item?.id,
            password: data.get('password') as string,
            type: type,
            user: data.get('user') as string,
          }


          if(!edit) await ServiceCreatePerson(person)
          else await ServiceUpdatePerson(person)

          enqueueSnackbar('Usuario salvo com sucesso!', { variant: 'success' });
          setOpen(false)
          location.reload();
          return
      } catch (error) {
          enqueueSnackbar('Falha ao executar pedido ' + error, { variant: 'error' });
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
          {'Usuarios'}
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
                    <TInput title={'Nome'} placeholder='e.g.: 232' defaultValue={item?.firstName} name="firstName" />
                    <TInput title={'Sobrenome'} defaultValue={item?.lastName} name="lastName" />
                    <TInput title='Usuario' defaultValue={item?.user}  id="Key" name='user'
                          InputProps={{
                              startAdornment: (
                              <InputAdornment position="start">
                                  <KeyIcon fontSize='small' />
                              </InputAdornment>
                              ),
                          }}
                    />
                    <TInput title={'Numero de BI'} defaultValue={item?.nationalId} name="nationalId" />
                    <TInput title={'Endereço'}  defaultValue={item?.address} name="address" />

                    <TInput title={'Email'}  name="email" defaultValue={item?.email}  />
                    <TInput title={'Password'}  name="password" defaultValue={item?.password}  />
                    
                    <Typography color={'#6F7D97'} fontSize={12} >Tipo</Typography>
                    <Select
                        value={type}
                        label="Tipo"
                        onChange={(event: any) => setType(event.target.value)}
                        fullWidth
                    >
                      <MenuItem  value={'CLIENT'}>Cliente</MenuItem>
                      <MenuItem  value={'BROKER'}>Corretor</MenuItem>
                      <MenuItem  value={'ADMIN'}>Admin</MenuItem>
                    </Select>

                    <LoadingButton
                        disabled={disable}
                        loading={loading}
                        type="submit"
                        color={'primary'}
                        size="small"
                        loadingPosition="center"
                        variant="contained"
                        sx={{width: '377px', borderRadius: 2, fontWeight: '550', fontSize: '16px', textTransform: 'none', mt: 1  }}
                    >{ !edit ? 'Criar usuario': 'Actualizar usuario'}
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


function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export function QuiltedImageList( { photos }: {photos?: { albumId: number; id: number; title: string; url: string; }[] | undefined} ) {
  return (
    <>
      <Typography color={'#6F7D97'} fontSize={12} >{'Imagens do imovel'}</Typography>
      {
        photos ?
    <ImageList
      sx={{ width: 500, height: 450 }}
      variant="quilted"
      cols={4}
      rowHeight={121}
    >
      {photos?.map((item) => (
        <ImageListItem key={item.url} >
          <img
            {...srcset(item.url, 121, 1, 1)}
            alt={item.title}
            loading="lazy"
            src={item.url}
          />
        </ImageListItem>
      ))}
    </ImageList>
      : <Typography>Sem imagens disponivel</Typography>
      }
    </>
  );
}
