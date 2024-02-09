import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Image from 'next/image';
import { Plan, ServiceType } from '@/_types';
import { motion } from "framer-motion"
import { Box, Menu, MenuItem } from '@mui/material';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { PlanInfo } from './cardNew';
import { AppContextInterface, AuthContext } from '../provider';
import { useSnackbar } from 'notistack';

type Props = {
    serviceType: ServiceType
    icon: string
}

export default function MCard({ serviceType, icon } : Props) {
  const [open, setOpen] = React.useState(false);
  const [channelInfoOpen, setChannelOpenInfo] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    <CardAnimation>
    <Card sx={{maxWidth: 250, maxHeight: 150, borderRadius: 5, border: 1, borderColor: '#DDDDDD'}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <Image src={icon} alt='current usage' width={44} height={44} />
          </Avatar>
        }
        action={
          <div>
          <IconButton onClick={handleMenu} aria-label="settings">
            <MoreVertIcon />
          </IconButton>
          <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => setChannelOpenInfo(true)} > <EditIcon style={{marginRight: 2}} /> Edit</MenuItem>
              <MenuItem onClick={() => setOpen(true)}> <DeleteIcon style={{marginRight: 2}} /> Delete</MenuItem>
            </Menu>
          </div>
        }
      />
      <CardContent  onClick={() => setChannelOpenInfo(true)} >
        <Typography style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} variant="body2" color="text.secondary">{serviceType.Description}</Typography>
        <Typography sx={{fontWeight: 500, fontSize: '20px', color: '#25282C', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} >{serviceType.Key}</Typography>
      </CardContent>
    </Card>
    </CardAnimation>
    
    <AlertDialog open={open} planKey={serviceType.Key} setOpen={setOpen} />
    <PlanInfo open={channelInfoOpen} setOpen={setChannelOpenInfo} edit cardInfo={serviceType} />

    </>
  );
}

export function CardAnimation({children}: { children: JSX.Element }) {
  return(
    <motion.div
      whileHover={{ scale: 1.08, rotate: 0 }}
    >
      {children}
    </motion.div>
  )
}
  

function AlertDialog( {open, setOpen, planKey}: {open: boolean, setOpen: any, planKey: string} ) {
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    setOpen(false);
  };

  /*delete * */
  const handleDelete = async () =>{
    try {
      enqueueSnackbar('Service type deleted successful!', { variant: 'success' });

      return setOpen(false)
    } catch (error) {
      enqueueSnackbar('Failed to execute operation ' + error, { variant: 'error' });
    }
  }

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete " + planKey}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You are about to delete {planKey} service type, are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
  );
}
