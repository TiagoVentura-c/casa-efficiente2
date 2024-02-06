import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';

import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Chip, FormControl, InputAdornment, Typography, } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';

import KeyIcon from '@mui/icons-material/Key';
import DescriptionIcon from '@mui/icons-material/Description';
import TInput from '@/compenents/TInput';
import { useSnackbar } from 'notistack';
import { Immobile, Person } from '@/_types/index2';
import { QuiltedImageList } from '../location-entries/add-new';
import Cookies from "js-cookie";


export default function AddNew() {

  const [open, setOpen] = React.useState(false);
  
  return (
    <>
        <Button onClick={() => setOpen(true)} variant="outlined" startIcon={<AddIcon />}>
          Add
        </Button>
        <LocationAreaInfo open={open} setOpen={setOpen} />
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



export function LocationAreaInfo({open, setOpen, edit=false, item }: {open: boolean, setOpen: any, edit?: boolean, item?: Immobile } ) {
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
          const storedUser: Person = JSON.parse(Cookies.get('user') as string);
          

          console.log(storedUser)
          
          enqueueSnackbar('Pedido de contracto enviado!', { variant: 'success' });
          setOpen(false)

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
          {!edit ? 'Create location area': 'Create update area'}
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

                    <TInput title={'Name'} placeholder='e.g.: Luanda|Luanda' id="Key" name="name" defaultValue={edit ? item?.name: undefined}  InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <KeyIcon fontSize='small' />
                        </InputAdornment>
                        ),
                    }} />

                    <TInput title={'Description'} placeholder='e.g.: Location for costumers in Luanda' id="Description"  
                            rows={4} name="Description" multiline defaultValue={edit ? item?.description: undefined} 
                            InputProps={{
                              startAdornment: (
                              <InputAdornment position="start">
                                  <DescriptionIcon fontSize='small' />
                              </InputAdornment>
                              ),
                          }}
                    />

                    <TInput title='Preço' placeholder='e.g.: Luanda' id="Province" name="Province" defaultValue={edit ? item?.price: undefined} />
                    <TInput title='Tipo' placeholder='e.g.: Luanda' id="Province" name="Province" defaultValue={edit ? item?.type: undefined} />
                    <TInput title='Esta disponivel' placeholder='e.g.: Luanda' id="Province" name="Province" defaultValue={edit ? item?.isAvailable ? 'SIM': 'NAO': undefined} />
                    <TInput title='Tipo de contrato' placeholder='e.g.: Luanda' id="Province" name="Province" defaultValue={edit ? item?.typePropertyBusiness == 'ALUGUEL' ? 'Aluguel': 'Venda': undefined} />
                    <TInput title='Dimesao' placeholder='e.g.: Luanda' id="Province" name="Province" defaultValue={edit ? item?.dimention.height + ' altura, ' + item?.dimention.length + ' cumprimento, '  + item?.dimention.width + ' largura' : undefined} />
                    <TInput title={'Coordenadas do imovel'}  name="Latitude" defaultValue={edit ? item?.location.lat+ ', ' + item?.location.lon : undefined}  />
                    <TInput title={'Avaliações'}  name="Latitude" defaultValue={ item?.ratingAverage }  />
                    <QuiltedImageList photos={item?.photos} />
                    <HoverRating />
                    
                    <LoadingButton
                        disabled={disable}
                        loading={loading}
                        type="submit"
                        color={'primary'}
                        size="small"
                        loadingPosition="center"
                        variant="contained"
                        sx={{width: '377px', borderRadius: 2, fontWeight: '550', fontSize: '16px', textTransform: 'none', mt: 4  }}
                    >{'Enviar pedido de contracto'}
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



const labels: { [index: string]: string } = {
  0.5: 'Inútil',
  1: 'Inútil+',
  1.5: 'Pobre',
  2: 'Pobre+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Bom',
  4: 'Bom+',
  4.5: 'Excelente',
  5: 'Excelente+',
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

function HoverRating() {
  const [value, setValue] = React.useState<number | null>(2);
  const [hover, setHover] = React.useState(-1);

  return (
    <>
    <Typography mt={4} color={'#6F7D97'} fontSize={12} >{'Avalie este imovel'}</Typography>
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'center'
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
      <Button sx={{ml: 4}} >Enviar</Button>
    </Box>
    </>
  );
}