import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Image from 'next/image';
import { Plan } from '@/_types';
import { motion } from "framer-motion"
import { Menu, MenuItem } from '@mui/material';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { PlanInfo } from './cardNewPlan';
import { ServiceDeletePlan } from '@/services/plans';
import { useSnackbar } from 'notistack';

type Props = {
    plan: Plan
    icon: string
}

export default function CardPlan({ plan, icon } : Props) {
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
        <Typography style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} variant="body2" color="text.secondary">{plan.Description}</Typography>
        <Typography sx={{fontWeight: 500, fontSize: '20px', color: '#25282C', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }} >{plan.Key}</Typography>
      </CardContent>
    </Card>
    </CardAnimation>
    
    <AlertDialog open={open} planKey={plan.Key} setOpen={setOpen} />
    <PlanInfo open={channelInfoOpen} setOpen={setChannelOpenInfo} edit plan={plan} />

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

  const handleDelete = async () =>{
    try {
      const res = await ServiceDeletePlan(planKey)
      enqueueSnackbar('Plan deleted succesful!', { variant: 'success' });
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
            You are about to delete {planKey} plan, are you sure?
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
