import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import { Verified, Pending, Refresh } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { searchresults, fetchSearchRequest } from "../../features/Search/searchPeopleSlice";
import { getfriendslist, sendFriendequest } from "../../features/friends/friendsSlice";
import { useNavigate } from "react-router-dom";
import { getAuth } from "../../features/users/AuthSlice";

const SearchResults = () => {
  const dispatch = useDispatch();
  const users = useSelector(searchresults) || [];
  const friendsList = useSelector(getfriendslist);

  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [note, setNote] = useState("");
  const {auth} = useSelector(getAuth);
  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNote("");
    setSelectedUser(null);
  };

  const handleRefresh = () => {
    dispatch(fetchSearchRequest({ places: [], depts: [], batchs: [] }));
  };

  // Filter users to exclude those already in the friendsList
  const filteredUsers = users.filter(user => 
    !friendsList.some(friend => friend.email === user.email) && !auth?.user?.email
  );
  const navigate=useNavigate();

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">Search Results</Typography>
        <IconButton onClick={handleRefresh}><Refresh /></IconButton>
      </Box>

      <Grid container spacing={4}>
        {filteredUsers.map((user) => (
          <Grid item xs={12} sm={6} key={user._id}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Box
                sx={{
                  height: 450,
                  position: "relative",
                  borderRadius: 5,
                  overflow: "hidden",
                  boxShadow: 4,
                  backgroundImage: `url(${user.profileImage || "https://via.placeholder.com/400"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  cursor: "pointer",
                }}
                
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backdropFilter: "blur(2px)",
                    background: "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.3))",
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    p: 3,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" sx={{ display: "flex", alignItems: "flex-start" }}>
                    {user.name}
                    {user.verified ? (
                      <Verified fontSize="small" sx={{ ml: 1, color: "lightblue" }} />
                    ) : (
                      <Pending fontSize="small" sx={{ ml: 1 }} />
                    )}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9, textAlign: 'left' }}>{user.department}</Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8, textAlign: 'left' }}>{user.batch}</Typography>
                  <Box mb={6} display="flex" justifyContent="center" gap={2}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#fff",
                        color: "#000",
                        textTransform: "none",
                        fontWeight: "bold",
                        "&:hover": { backgroundColor: "#f0f0f0" },
                      }}
                      onClick={() => handleOpenModal(user)}
                    >
                      Connect
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        color: "#fff",
                        borderColor: "#fff",
                        textTransform: "none",
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: "rgba(255,255,255,0.1)",
                        },
                      }}
                      onClick={()=>{
                        navigate(`/publicprofile/${user._id}`)
                      }}
                    >
                      View
                    </Button>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="xs">
        <DialogTitle textAlign="center" fontWeight="bold">Send Friend Request</DialogTitle>
        <DialogContent dividers>
          {selectedUser && (
            <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
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
        <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
          <Button
            variant="contained"
            sx={{ px: 4, backgroundColor: "#1877F2", textTransform: "none", fontWeight: "bold" }}
            onClick={() => {
              dispatch(sendFriendequest(selectedUser.email));
              handleCloseModal();
            }}
          >
            Send Request
          </Button>
          <Button onClick={handleCloseModal} variant="outlined" sx={{ textTransform: "none" }}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SearchResults;
