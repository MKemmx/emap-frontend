import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// Initial State
import { INITIAL_STATE } from './initialState';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UserPageModal = ({ closeModal, openAddModal, editData }) => {
  // Always showing
  const alwaysOpen = true;

  const [data, setData] = useState(editData === null ? INITIAL_STATE : editData);

  return (
    <div>
      <Modal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        open={alwaysOpen}
        onClose={closeModal}
      >
        <Box sx={style}>
          <h1> {data?.userName} </h1>
        </Box>
      </Modal>
    </div>
  );
};

export default UserPageModal;
