import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getAuth } from '../../redux/slice/AuthSlice';
import { 
    Grid, TextField, List, ListItem, ListItemText, IconButton, Paper, 
    Typography, Avatar, InputAdornment, Box 
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SearchIcon from '@mui/icons-material/Search';
import { motion, AnimatePresence } from 'framer-motion';
import { PersonRemove } from '@mui/icons-material';

const FriendsList = () => {
    const { auth } = useSelector(getAuth);
    const [selectedChat, setSelectedChat] = useState(null);
    const [friends, setFriends] = useState([
        { id: 1, name: 'Sankar', avatar: 'https://i.pravatar.cc/150?img=1' },
        { id: 2, name: 'Santhosh', avatar: 'https://i.pravatar.cc/150?img=2' },
        { id: 3, name: 'Sanjay', avatar: 'https://i.pravatar.cc/150?img=3' },
        { id: 4, name: 'Samuel', avatar: 'https://i.pravatar.cc/150?img=4' }
    ]);

    const removeFriend = (id) => {
        setFriends(prevFriends => prevFriends.filter(friend => friend.id !== id));
    };

    return (
        <div>
            {auth.isLoggedIn ? (
                <>
                <h1 style={{ textAlign: 'left' }}>Your Friends</h1>
                <Grid container spacing={2} sx={{ padding: 2 }}>
                    <Grid item xs={12} sm={4}>
                        <Paper sx={{ padding: 2 }}>
                            <TextField 
                                fullWidth 
                                label="Search Friends" 
                                variant="outlined" 
                                sx={{ marginBottom: 2 }} 
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <List>
                                <AnimatePresence>
                                    {friends.map(friend => (
                                        <motion.div 
                                            key={friend.id} 
                                            initial={{ opacity: 0, y: -10 }} 
                                            animate={{ opacity: 1, y: 0 }} 
                                            exit={{ opacity: 0, y: -10 }} 
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ListItem 
                                                sx={{
                                                    transition: 'background 0.3s ease-in-out',
                                                    '&:hover': { background: '#f0f0f0' }
                                                }}
                                            >
                                                <Avatar src={friend.avatar} sx={{ marginRight: 2 }} />
                                                <ListItemText primary={friend.name} />
                                                <IconButton edge="end" onClick={() => setSelectedChat(friend)}>
                                                    <ArrowForwardIosIcon />
                                                </IconButton>
                                                <IconButton edge="end" color="error" onClick={() => removeFriend(friend.id)}>
                                                    <PersonRemove />
                                                </IconButton>
                                            </ListItem>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </List>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={8}>
                        <Paper sx={{ padding: 2, height: '100%' }}>
                            {selectedChat ? (
                                <Box display="flex" alignItems="center">
                                    <Avatar src={selectedChat.avatar} sx={{ marginRight: 2 }} />
                                    <Typography variant="h6">
                                        Chat with {selectedChat.name}
                                    </Typography>
                                </Box>
                            ) : (
                                <Typography variant="h6" color="textSecondary">
                                    Select a friend to chat
                                </Typography>
                            )}
                        </Paper>
                    </Grid>
                </Grid>
                </>
            ) : (
                <Typography variant="h6" textAlign="center">
                    Please log in to see your friends list.
                </Typography>
            )}
        </div>
    );
};

export default FriendsList;
