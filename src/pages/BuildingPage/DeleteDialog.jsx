import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material/';
import { AiOutlineDelete } from 'react-icons/ai';

const DeleteDialog = ({ buildingId, handleDelete }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Tooltip title="Delete">
        <IconButton
          onClick={() => {
            setOpen(true);
          }}
        >
          <AiOutlineDelete />
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"> Are you sure? </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"> You are about to delete this building! </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              handleDelete('building', buildingId);
              handleClose();
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteDialog;
