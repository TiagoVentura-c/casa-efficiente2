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
import { Box, Chip, FormControl, InputAdornment, MenuItem, Select, SelectChangeEvent, Stack, } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import dayjs, { Dayjs } from 'dayjs';

import KeyIcon from '@mui/icons-material/Key';
import { LocationEntry } from '@/_types';
import TInput from '@/compenents/TInput';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useSnackbar } from 'notistack';
import { Contract } from '@/_types/index2';
import { ServiceAproveServicePendingContracts } from '@/services/property';

export default function AddNew() {

  const [open, setOpen] = React.useState(false);
  
  return (
    <>
        <Button onClick={() => setOpen(true)} variant="outlined" startIcon={<AddIcon />}>
          Add
        </Button>
        <LocationEntryInfo open={open} setOpen={setOpen} />
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



export function LocationEntryInfo({open, setOpen, edit=false, item }: {open: boolean, setOpen: any, edit?: boolean, item?: Contract } ) {
  const [loading, setLoading] = React.useState(false)
  const [disable, setDisable] = React.useState(edit)
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setOpen(false);
    item=undefined
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      setLoading(true)

      try {

          await ServiceAproveServicePendingContracts(item as Contract)
          
          enqueueSnackbar('Contracto aprovados com sucesso', { variant: 'success' });
          setOpen(false)
          location.reload()
          return
      } catch (error) {
          enqueueSnackbar('Falha ao aprovar contracto ' + error, { variant: 'error' });
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
          {'Detalhes de contrato'}
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
                    <TInput title='Tipo de contracto' defaultValue={item?.typePropertyBusiness}  id="Key" name='Key'
                          InputProps={{
                              startAdornment: (
                              <InputAdornment position="start">
                                  <KeyIcon fontSize='small' />
                              </InputAdornment>
                              ),
                          }}
                    />
                    <TInput title={'Data adquirida'} placeholder='e.g.: 232' defaultValue={edit ? item?.startDate: undefined}  />
                    <TInput title={'Valor total pago'} defaultValue={edit ? item?.totalPaid: undefined}  />
                    <TInput title={'Cliente'} defaultValue={edit ? item?.client.firstName + ' ' + item?.client.lastName: undefined}  />
                    <TInput title={'Corretor'}  defaultValue={edit ? item?.broker.firstName + ' ' + item?.broker.lastName: undefined}  />

                    <TInput title={'Nome do imovel'}  name="Latitude" defaultValue={edit ? item?.immobile.name: undefined}  />
                    <TInput title={'Descricao do imovel'}  name="Latitude" defaultValue={edit ? item?.immobile.description: undefined}  />
                    <TInput title={'Localizacao do imovel'}  name="Latitude" defaultValue={edit ? item?.immobile.location.address : undefined}  />
                    <TInput title={'Coordenadas do imovel'}  name="Latitude" defaultValue={edit ? item?.immobile.location.lat+ ', ' + item?.immobile.location.lon : undefined}  />
                    <TInput multiline title={'Descricao do cliente'}  name="Latitude" defaultValue={edit ? item?.clientDescription: undefined}  />
                    <QuiltedImageList photos={item?.immobile.photos} />
                    <LoadingButton
                        // disabled={disable}
                        loading={loading}
                        type="submit"
                        color={'primary'}
                        size="small"
                        loadingPosition="center"
                        variant="contained"
                        sx={{width: '377px', borderRadius: 2, fontWeight: '550', fontSize: '16px', textTransform: 'none', mt: 1  }}
                    >{'Aprovar contrato'}
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
          />
        </ImageListItem>
      ))}
    </ImageList>
      : <Typography>Sem imagens disponivel</Typography>
      }
    </>
  );
}
