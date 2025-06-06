import React, { useEffect, useState } from 'react';
import PageSider from './PageSider';
import DisplayList from './DisplayList';
import FriendsList from './FriendsList';
import SearchFriends from './SearchFriends';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, getStatus } from '../../features/users/AuthSlice';
import { Box } from '@mui/joy';
import { SentimentDissatisfiedOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import Container from '../SearchPeople/Container';
import { fetchMyList } from '../../features/friends/friendsSlice';

const FriendsPage = () => {
    const [content, setContent] = useState('');
    function renderContent(content){
      switch(content){
        case 'My Friends':
          return <FriendsList/>;
          case 'Search Friends':
            return <Container/>
          default:
            return<FriendsList/>
      }
    }

    const {auth}=useSelector(getAuth);
 const dispatch=useDispatch();
 useEffect(()=>{
  dispatch(fetchMyList(auth.user.email));
 },[auth]);

    return (
        <div>
            <PageSider setContent={setContent} />
            {auth.isLoggedIn===true ? renderContent(content):(
              <Box sx={{ textAlign: "center", mt: 5 }}>
              <SentimentDissatisfiedOutlined sx={{ fontSize: 80, color: "#b0b0b0" }} />
              <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, color: "#555" }}>
                Not Available!! Please Login.....
              </Typography>
              <Typography variant="body2" sx={{ color: "#777", mt: 1 }}>
                Try again later or explore other sections
              </Typography>
            </Box>
            )}

        </div>
    );
};

export default FriendsPage;
