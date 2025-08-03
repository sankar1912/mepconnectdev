import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const EmailNotFoundModal = ({ open, onClose }) => (
  <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
    <DialogTitle textAlign="center" fontWeight="bold" sx={{ color: '#d32f2f' }}>
      <ErrorOutlineIcon sx={{ fontSize: 48, color: '#d32f2f', mb: 1 }} />
      <br />
      Email Not Found!
    </DialogTitle>
    <DialogContent>
      <Box textAlign="center">
        <Typography variant="h6" fontWeight="bold" color="error" mb={2}>
          Oops! We couldn't find an email for this user.
        </Typography>
        <Typography variant="body1" color="textSecondary">
          This user hasn't provided an email address, so you can't send a friend request at this time.
        </Typography>
      </Box>
    </DialogContent>
    <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
      <Button variant="contained" color="error" onClick={onClose} sx={{ px: 4, fontWeight: 'bold' }}>
        Close
      </Button>
    </DialogActions>
  </Dialog>
);

export default EmailNotFoundModal;
