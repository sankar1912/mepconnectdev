import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Stack,
  Divider
} from '@mui/material';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
  borderRadius: '20px',
  p: 4,
  width: 380,
  textAlign: 'center',
  transition: 'all 0.3s ease-in-out',
};

function useShare() {
  const [open, setOpen] = useState(false);
  const [callback, setCallback] = useState(() => () => {});
  const [message, setMessage] = useState('');

  const show = (msg = 'Click OK to proceed', fn = () => {}) => {
    setMessage(msg);
    setCallback(() => fn);
    setOpen(true);
  };

  const handleConfirm = () => {
    setOpen(false);
    callback();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ModalUI = (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" mb={1}>
          <HelpOutlineRoundedIcon color="primary" sx={{ fontSize: 28 }} />
          <Typography variant="h5" fontWeight="600" color="primary">
            Please Confirm
          </Typography>
        </Stack>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" color="text.secondary" mb={3}>
          {message}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            onClick={handleClose}
            variant="outlined"
            color="primary"
            startIcon={<CancelOutlinedIcon />}
            sx={{
              borderRadius: '12px',
              px: 3,
              textTransform: 'none',
              fontWeight: 500
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            variant="contained"
            color="primary"
            startIcon={<CheckCircleRoundedIcon />}
            sx={{
              borderRadius: '12px',
              px: 3,
              textTransform: 'none',
              fontWeight: 500,
              boxShadow: '0 4px 12px rgba(0, 123, 255, 0.3)'
            }}
          >
            OK
          </Button>
        </Stack>
      </Box>
    </Modal>
  );

  return { show, ModalUI };
}

export default useShare;
