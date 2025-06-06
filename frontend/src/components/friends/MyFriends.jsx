import React from 'react';
import { useSelector } from 'react-redux';
import { getfriendslist } from '../../features/friends/friendsSlice';
import { Box, Typography, Grid, IconButton, Chip, Tooltip } from '@mui/material';
import { EmailOutlined, ChatBubbleOutline, Verified } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

function MyFriends() {
  const friendsList = useSelector(getfriendslist);
  const navigate =useNavigate();
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        My Friends Network
      </Typography>

      {friendsList?.length === 0 ? (
        <Typography>No friends found.</Typography>
      ) : (
        <MotionBox
          variants={containerVariant}
          initial="hidden"
          animate="visible"
          component={Grid}
          container
          spacing={4}
        >
          {friendsList?.map((friend) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={friend._id}>
              <MotionBox
                variants={cardVariant}
                whileHover={{ scale: 1.04 }}
                sx={{
                  position: 'relative',
                  height: 600,
                  borderRadius: '1.5rem',
                  overflow: 'hidden',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.2)',
                  backgroundImage: `url(${friend.profileImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'all 0.4s ease-in-out',
                  cursor: 'pointer',
                  '&:hover .overlay': {
                    backdropFilter: 'blur(5px)',
                    backgroundColor: 'rgba(0,0,0,0.55)',
                  },
                }}
              >
                {/* Overlay */}
                <Box
                  className="overlay"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    p: 3,
                    color: '#fff',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.1))',
                    backdropFilter: 'blur(4px)',
                    transition: '0.4s ease-in-out',
                  }}
                  onClick={()=>{
                    navigate(`/publicprofile/${friend._id}`)
                  }}
                >
                  
                  <Box sx={{ mb: 1 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ color: '#fff', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: 1 }}
                    >
                      {friend.name}
                      {friend.verified && <Verified fontSize="small" color="info" />}
                    </Typography>
                  </Box>

                  <Typography
                    variant="caption"
                    sx={{
                      color: 'rgba(255,255,255,0.75)',
                      fontSize: '0.8rem',
                      mb: 1,
                      overflowWrap: 'left',
                      textAlign:'left'
                    }}
                  >
                    {friend.email}
                  </Typography>

                  {friend.status && (
                    <Chip
                      label={friend.status}
                      size="small"
                      sx={{
                        bgcolor: 'rgba(255,255,255,0.1)',
                        color: '#fff',
                        backdropFilter: 'blur(2px)',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        px: 1,
                        mb: 1,
                        width: 'fit-content',
                      }}
                    />
                  )}

                  {/* Action Buttons */}
                  <Box sx={{ mb: 5, display: 'flex', gap: 1 }}>
                    <Tooltip title="Send Email">
                      <IconButton sx={{ color: '#fff', backgroundColor: 'rgba(255,255,255,0.15)' }}>
                        <EmailOutlined fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Start Chat">
                      <IconButton sx={{ color: '#fff', backgroundColor: 'rgba(255,255,255,0.15)' }}>
                        <ChatBubbleOutline fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </MotionBox>
            </Grid>
          ))}
        </MotionBox>
      )}
    </Box>
  );
}

export default MyFriends;
