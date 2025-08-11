import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Snackbar,
  Alert,
  Box,
  Typography,
  Slide,
  Avatar
} from "@mui/material";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { getNotificationState } from "../redux/slice/notificationSlice";

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

function App() {
  const { message } = useSelector(getNotificationState);
  const [open, setOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (message && message !== "") {
      setOpen(false);
      setTimeout(() => {
        setCurrentMessage(message);
        setOpen(true);
      }, 100);
    }
  }, [message]);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={5000}
      TransitionComponent={SlideTransition}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "#1976d2", // LinkedIn blue
          color: "white",
          borderRadius: 5,
          p: 1.5,
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          minWidth: 300
        }}
      >
        <Avatar
          sx={{
            bgcolor: "white",
            color: "#0a66c2",
            width: 36,
            height: 36,
            mr: 1.5
          }}
        >
          <NotificationsActiveIcon />
        </Avatar>
        <Typography variant="body1" sx={{ fontWeight: 500 }}>
          {currentMessage}
        </Typography>
      </Box>
    </Snackbar>
  );
}

export default App;
