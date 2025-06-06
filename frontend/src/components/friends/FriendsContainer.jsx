import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DisplayOptions from './DisplayOptions';
import MyFriends from './MyFriends';
import MyInvites from './MyInvites';
import Container from '../SearchPeople/Container';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyList } from '../../features/friends/friendsSlice';
import { getAuth } from '../../features/users/AuthSlice';

function FriendsContainer() {
  const [options, setOptions] = useState('friends');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {auth}=useSelector(getAuth);
const dispatch=useDispatch();

const renderContent = () => {
    switch (options) {
      case 'friends':
        return <MyFriends />;
      case 'invites':
        return <MyInvites />;
      case 'search':
        return <Container />;
      default:
        return <MyFriends />;
    }
  };

useEffect(()=>{
  dispatch(fetchMyList(auth.user.email));
},[]);

  return (
    <Box >
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={12} md={12}>
          {renderContent()}
        </Grid>
      </Grid>
      <DisplayOptions setOptions={setOptions} selected={options} />
    </Box>
  );
}

export default FriendsContainer;
