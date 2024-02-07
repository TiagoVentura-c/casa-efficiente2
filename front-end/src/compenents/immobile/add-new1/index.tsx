'use client'
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
import { Box, Chip, FormControl, InputAdornment, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography, } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';

import KeyIcon from '@mui/icons-material/Key';
import DescriptionIcon from '@mui/icons-material/Description';
import TInput from '@/compenents/TInput';
import { useSnackbar } from 'notistack';
import { Immobile, Person } from '@/_types/index2';
import { QuiltedImageList } from '@/compenents/users/add-new'; 
import { ServiceCreateImmobile, ServiceUpdateUpdate } from '@/services/immbile';
import Cookies from 'js-cookie';


type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
}

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
  const [type, setType] = React.useState<'RESIDENCIAL' | 'COMERCIAL'>('RESIDENCIAL')
  const [typeContract, setTypeContract] = React.useState<'ALUGUEL' | 'VENDA'>('VENDA')
  const [building, setBuilding] = React.useState<boolean>(false)

  const [photos, setPhotos] = React.useState<Photo[]>([])

  const [files, setFiles] = React.useState<any>();
  const [previews, setPreviews] = React.useState<any>();

  // rendering previews
  React.useEffect(() => {
    if (!files) return;
    let tmp = [];
    for (let i = 0; i < files.length; i++) {
      tmp.push(URL.createObjectURL(files[i]));
    }

    const objectUrls: any = tmp;
    setPreviews(objectUrls);
    setPhotos([...photos, {
      url: objectUrls,
      albumId: 0,
      id: 0,
      title: ''
    }])

    // free memory
    for (let i = 0; i < objectUrls.length; i++) {
      return () => {
        URL.revokeObjectURL(objectUrls[i]);
      };
    }
  }, [files]);

  const handleClose = () => {
    setOpen(false);
    item=undefined
  }


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      setLoading(true)
      const storedUser: Person = JSON.parse(Cookies.get('user') as string);


      try {

          const immobile: Immobile = {
            description: data.get('description') as string,
            dimention: {
              height: (data.get('height') as unknown) as number,
              length: (data.get('length') as unknown) as number,
              width: (data.get('width') as unknown) as number,
            },
            isAvailable: true,
            location: {
              address: data.get('address') as string,
              country: data.get('country') as string,
              isBuilding: building,
              lat: data.get('lat') as string,
              lon: data.get('lon') as string,
              province: data.get('province') as string,
            },
            name: data.get('name') as string,
            price: (data.get('price') as unknown) as number,
            type: type,
            typePropertyBusiness: typeContract,
            id: item?.id,
            ratingAverage: 0,
            broker: {
              id: storedUser.id as number
            }
          }

          if(!edit) await ServiceCreateImmobile(immobile)
          else ServiceUpdateUpdate(immobile)

          
          enqueueSnackbar('Imovel salvo com sucesso!', { variant: 'success' });
          setOpen(false)
          location.reload()
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
          {!edit ? 'Imovel': 'Imovel'}
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

                    <TInput title={'Name'} placeholder='e.g.: ' id="Key" name="name" defaultValue={edit ? item?.name: undefined}  InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <KeyIcon fontSize='small' />
                        </InputAdornment>
                        ),
                    }} />

                    <TInput title={'Description'} placeholder='e.g.: ' id="Description"  name="description"
                            rows={4}  multiline defaultValue={edit ? item?.description: undefined} 
                            InputProps={{
                              startAdornment: (
                              <InputAdornment position="start">
                                  <DescriptionIcon fontSize='small' />
                              </InputAdornment>
                              ),
                          }}
                    />

                    <TInput title='Preço' name="price" defaultValue={edit ? item?.price: undefined} />

                    <Typography color={'#6F7D97'} fontSize={12} >Tipo de imovel</Typography>
                    <Select
                        value={type}
                        label="Tipo de imovel"
                        onChange={(event: any) => setType(event.target.value)}
                        fullWidth
                    >
                      <MenuItem  value={'RESIDENCIAL'}>Residencia</MenuItem>
                      <MenuItem  value={'COMERCIAL'}>Comercial</MenuItem>
                    </Select>

                    <Typography color={'#6F7D97'} fontSize={12} mt={2} >Tipo de contrato</Typography>
                    <Select
                        value={typeContract}
                        label="Tipo de contracto"
                        onChange={(event: any) => setTypeContract(event.target.value)}
                        fullWidth
                    >
                      <MenuItem  value={'ALUGUEL'}>Renda</MenuItem>
                      <MenuItem  value={'VENDA'}>Venda</MenuItem>
                    </Select>

                    
                    <TInput title={'Altura'}  name="height" defaultValue={edit ? item?.dimention.height: undefined}  />
                    <TInput title={'Cumprimento'}  name="length" defaultValue={edit ? item?.dimention.length: undefined}  />
                    <TInput title={'Largura'}  name="width" defaultValue={edit ? item?.dimention.width: undefined} />

                    <TInput title={'Pais'}  name="country" defaultValue={edit ? item?.location.country: undefined} />
                    <TInput title={'Provincia'}  name="province" defaultValue={edit ? item?.location.province: undefined} />
                    <TInput title={'Endereço'}  name="address" defaultValue={edit ? item?.location.address: undefined} />
                    <TInput title={'Latitude'}  name="lat" defaultValue={edit ? item?.location.lat: undefined} />
                    <TInput title={'Longitude'}  name="lon" defaultValue={edit ? item?.location.lon: undefined} />

                    <Typography color={'#6F7D97'} fontSize={12} mt={2} >Esta em um predio</Typography>
                    <Select
                        value={building}
                        label="Predio"
                        onChange={(event:any) => setBuilding(event.target.value)}
                        fullWidth
                        sx={{marginBottom: 2}}
                    >
                      <MenuItem  value={'true'}>SIM</MenuItem>
                      <MenuItem  value={'false'}>NAO</MenuItem>
                    </Select>

                    <TInput title={'Adicone Imagens'} type='file' onChange={(e: any) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setFiles(e.target.files);
                        }
                      }} />

                    <QuiltedImageList photos={photos} />

                    <LoadingButton
                        disabled={disable}
                        loading={loading}
                        type="submit"
                        color={'primary'}
                        size="small"
                        loadingPosition="center"
                        variant="contained"
                        sx={{width: '377px', borderRadius: 2, fontWeight: '550', fontSize: '16px', textTransform: 'none', mt: 1  }}
                    >{'Salvar imovel'}
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
  1.5: 'Poor',
  2: 'Poor+',
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
    </Box>
    </>
  );
}