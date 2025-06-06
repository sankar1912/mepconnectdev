import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { acceptFriendRequest, fetchMyList, getfriendinviteslist } from '../../features/friends/friendsSlice';
import {
  Box,
  Grid,
  Skeleton,
  Typography,
  Card,
  Avatar,
  IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import PeopleSuggestions from '../suggestions/PeopleSuggestions';
import { getAuth } from '../../features/users/AuthSlice';
import { SentimentDissatisfiedOutlined } from '@mui/icons-material';
import SuggestionContainer from '../suggestions/SuggestionContainer';

const MyInvites = () => {
  const invitesList = useSelector(getfriendinviteslist);
  const isLoading = !Array.isArray(invitesList);
  const dispatch=useDispatch();
  const {auth}=useSelector(getAuth);
  useEffect(()=>{
    dispatch(fetchMyList(auth.user.email));
  },[dispatch])
  if(invitesList.length===0){
    return(<Box sx={{ textAlign: "center", mt: 10 }}>
            <SentimentDissatisfiedOutlined sx={{ fontSize: 80, color: "#ccc" }} />
            <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
              No Invitation available
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Check back later or explore other sections
            </Typography>
            
          </Box>)
  }
  return (
    <Box sx={{ maxWidth: "70%", mx: "auto", px: 2, py: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
        Friend Invites
      </Typography>

      <Grid container spacing={2}>
        {isLoading
          ? Array.from(new Array(3)).map((_, index) => (
              <Grid item xs={12} key={index}>
                <Card variant="outlined" sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                  <Skeleton variant="circular" width={50} height={50} />
                  <Box sx={{ ml: 2, flexGrow: 1 }}>
                    <Skeleton variant="text" width="60%" height={25} />
                    <Skeleton variant="text" width="40%" height={20} />
                  </Box>
                  <Skeleton variant="circular" width={40} height={40} />
                </Card>
              </Grid>
            ))
          : invitesList.map((user) => (
              <Grid item xs={12} key={user._id}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: 2,
                      borderRadius: 3,
                      boxShadow: 2,
                      transition: 'transform 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: 4,
                      },
                    }}
                  >
                    <Avatar src={user.profileImage} alt={user.name} sx={{ width: 50, height: 50 }} />
                    <Box sx={{ ml: 2, textAlign:'left' }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {user.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.degree} - {user.department}
                      </Typography>
                    </Box>
                    <Box sx={{ ml: 'auto' }}>
                      <IconButton color="primary" aria-label="accept" onClick={()=>{
                        dispatch(acceptFriendRequest(auth.user._id,user._id))
                      }}>
                        <PersonAddAlt1Icon />
                      </IconButton>
                      <IconButton color="error" aria-label="reject">
                        <PersonRemoveAlt1Icon />
                      </IconButton>
                    </Box>
                  </Card>
                </motion.div>

                
              </Grid>
            ))}
            <Grid item xs={12} md={12}>
            <PeopleSuggestions/>
            </Grid>
      </Grid>
    </Box>
  );
};

export default MyInvites;
