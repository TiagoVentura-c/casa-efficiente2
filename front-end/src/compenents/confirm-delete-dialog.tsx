import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import { BundleApi } from '@/_types';


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDeleteDialog({ bundle }: {bundle?: BundleApi}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} variant="outlined" startIcon={<DeleteOutline />}>
            Delete bundle
        </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{bundle?.Name_Lang1}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            You are about to delete this bundles, are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='text' color='info' onClick={handleClose}>Cancel</Button>
          <Button color='error'  onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
