import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({isOpen, handleClose, onAccept, onDeny, message, title}) {
  const handleAccept = () => {
    onAccept()
    handleClose();
  }

  const handleDeny = () => {
    onDeny && onDeny()
    handleClose()
  }

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title || "Attention"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message || "Are you sure you want to do this?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAccept}>Yes</Button>
          <Button onClick={handleDeny} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}