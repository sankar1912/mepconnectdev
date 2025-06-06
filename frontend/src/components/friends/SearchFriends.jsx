import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser, getfriendslist } from "../../features/friends/friendsSlice";
import { useNotifications } from "@toolpad/core";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Avatar,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  IconButton,
  Button,
  useTheme,
  useMediaQuery,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Search, PersonAdd, PersonRemove, Person, School, Work } from "@mui/icons-material";
import { getAuth, getStatus } from "../../features/users/AuthSlice";
import { useNavigate } from "react-router-dom";

const actions = [
  { icon: <Person />, name: "Name", value: "name" },
  { icon: <School />, name: "Degree", value: "degree" },
  { icon: <Work />, name: "Profession", value: "profession" },
];

const SearchFriends = () => {
  const dispatch = useDispatch();
  const friendslist = useSelector(getfriendslist);
  const [searchType, setSearchType] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [friendsList, setFriendsList] = useState([]);
  const notifications = useNotifications();
  const { auth } = useSelector(getAuth);
  const navigate = useNavigate();
  const getLogged = useSelector(getStatus);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  useEffect(() => {
    if (friendslist && Array.isArray(friendslist)) {
      setFriendsList(friendslist.map(user => ({ ...user, isFriend: false })));
    }
  }, [friendslist]);

  const handleToggleFriend = (id, action) => {
    if (action === "remove") {
      notifications.show("User removed", { severity: "error", autoHideDuration: 2000 });
      setFriendsList(prevList => prevList.filter(user => user._id !== id));
    } else {
      notifications.show("Friend request sent", { severity: "info", autoHideDuration: 2000 });
      setFriendsList(prevList =>
        prevList.map(user => (user._id === id ? { ...user, isFriend: !user.isFriend } : user))
      );
    }
  };

  const filteredFriends = friendsList.filter(user =>
    user[searchType]?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ width: "90%", padding: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
     
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, color: "#222" }}>
          Search People
        </Typography>
      </motion.div>
      <Divider/>

     
      <Box sx={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={`Search friends by ${searchType}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "#777" }} />
                </InputAdornment>
              ),
              sx: {
                borderRadius: "30px",
                backgroundColor: "#f9f9f9",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                "&:hover": { backgroundColor: "#f1f1f1" },
                "&.Mui-focused": {
                  backgroundColor: "white",
                  borderColor: "black",
                },
                
              },
              
            }}
          />
        </motion.div>

        <SpeedDial ariaLabel="Search Filter" icon={<SpeedDialIcon />} direction={isMobile ? "down" : "right "}>
          {actions.map((action) => (
            <SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={() => setSearchType(action.value)} />
          ))}
        </SpeedDial>
      </Box>

      <Divider sx={{ my: 3, width: "100%" }} />
      <List sx={{ width: "100%", maxWidth: "800px", bgcolor: "background.paper", borderRadius: 2, boxShadow: 3 }}>
        {filteredFriends.length > 0 ? (
          filteredFriends.map(user => (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} key={user._id}>
              <ListItem
                sx={{
                  borderBottom: "1px solid #ddd",
                  display: "flex",
                  alignItems: "center",
                  padding: "15px",
                }}
              >
                <ListItemAvatar>
                  <Avatar src={user.avatar} alt={user.name} sx={{ width: 70, height: 70, boxShadow: 2 }} />
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Typography variant="h6" fontWeight="bold">
                      {user.name} 
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary">
                        {user.degree}  - {user.batch}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.profession || "Engineer"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                       Department:  {user.department || "N/A"}
                      </Typography>
                    </>
                  }
                  sx={{ ml: 2 }}
                />

                {auth.isLoggedIn ? (
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <IconButton color="primary" onClick={() => handleToggleFriend(user._id, "add")}>
                        <PersonAdd />
                      </IconButton>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <IconButton color="error" onClick={() => handleToggleFriend(user._id, "remove")}>
                        <PersonRemove />
                      </IconButton>
                    </motion.div>
                  </Box>
                ) : (
                  <Button variant="outlined" color="primary" onClick={() => navigate("/login")}>
                    Login to request
                  </Button>
                )}
              </ListItem>
            </motion.div>
          ))
        ) : (
          <Typography sx={{ textAlign: "center", p: 3 }}>No friends found matching your search.</Typography>
        )}
      </List>
    </Box>
  );
};

export default SearchFriends;
