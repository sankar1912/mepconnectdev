import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  Typography,
  TextField,
  Box
} from "@mui/material";

const SendRequest = ({ open, onClose, selectedUser, note, setNote, onSend }) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
    <DialogTitle textAlign="center" fontWeight="bold">Send Friend Request</DialogTitle>
    <DialogContent dividers>
      {selectedUser && (
        <Box display="flex" flexDirection="column" alignItems="left" mb={2} >
          <Avatar
            src={selectedUser.profileImage || "https://via.placeholder.com/100"}
            sx={{ width: 90, height: 90, mb: 1 }}
          />
          <Typography variant="h6">{selectedUser.name}</Typography>
          <Typography variant="body2" color="textSecondary">{selectedUser.department}</Typography>
          <Typography variant="body2" color="textSecondary">{selectedUser.batch}</Typography>
        </Box>
      )}
      <Typography variant="subtitle1" fontWeight="medium" mb={1}>Note (optional):</Typography>
      <TextField
        fullWidth
        multiline
        minRows={3}
        placeholder="Write a short message..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
    </DialogContent>
    <DialogActions sx={{ justifyContent: "center", pb: 5 }}>
      <Button
        variant="contained"
        sx={{ px: 4, backgroundColor: "#1877F2", textTransform: "none", fontWeight: "bold" }}
        onClick={onSend}
      >
        Send Request
      </Button>
      <Button onClick={onClose} variant="outlined" sx={{ textTransform: "none" }}>
        Cancel
      </Button>
    </DialogActions>
  </Dialog>
);

export default SendRequest;
