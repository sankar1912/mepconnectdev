import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Avatar,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Skeleton,
  Divider,
  LinearProgress,
  useTheme,
  useMediaQuery,
  Stack,
  Container,
  IconButton,
  Modal,
  TextField,
  Snackbar,
} from '@mui/material';
import {
  ContentCopy,
  Share as ShareIcon,
  Facebook,
  Twitter,
  WhatsApp,
  LinkedIn,
  Telegram,
  Verified,
  Pending,
} from '@mui/icons-material';
import { fetchSingleDonation } from '../features/feeds/donationsSlice';
import postbg from '../img/postbg.png';
import { useNotifications } from '@toolpad/core';
const DonationView = () => {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const donation = useSelector((state) => state.donations.donations);
  const loading = useSelector((state) => state.donations.loading);
  const theme = useTheme();
  const notification=useNotifications();
  const [openShare, setOpenShare] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    dispatch(fetchSingleDonation({ id: _id }));
  }, [dispatch, _id]);

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const progress = donation ? (donation.raisedAmount / donation.goalAmount) * 100 : 0;
  const navigate = useNavigate();
  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setSnackbarOpen(true);
  };

  const handleShare = (platform) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const messages = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}`,
      whatsapp: `https://wa.me/?text=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}`,
    };
    window.open(messages[platform], '_blank');
  };

  if(!loading && donation._id===null){
    notification.show("Donation not available",{
      severity:"error",
      autoHideDuration:3000
    })
    navigate('/')
  }

  const InfoRow = ({ label, value }) => (
    <Box display="flex" justifyContent="left">
      <Typography variant="body2" fontWeight={600} color="text.secondary">
        {label}:
      </Typography>
      <Typography variant="body2" sx={{ ml: 1 }}>{value}</Typography>
    </Box>
  );

  return (
    <Box sx={{ backgroundColor: '#f0f6ff', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
       
          <Grid item xs={12} md={7}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: 4,
                overflow: 'hidden',
                backgroundColor: '#ffffff',
                position: 'relative',
              }}
            >
              <IconButton
                sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1 }}
                onClick={() => setOpenShare(true)}
              >
                <ShareIcon />
              </IconButton>

              {loading || !donation ? (
                <Skeleton variant="rectangular" height={300} />
              ) : (
                <CardMedia
                  component="img"
                  height="300"
                  image={donation.image}
                  alt={donation.campaignName}
                />
              )}

              <CardContent>
                <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
                  Campaign:<span style={{ fontWeight: 'bolder' }}> {donation.campaignName}</span>
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {loading || !donation ? (
                  <>
                    <Skeleton width="60%" />
                    <Skeleton width="80%" height={20} sx={{ mb: 1 }} />
                    <Skeleton width="100%" height={10} />
                    <Skeleton width="100%" height={10} sx={{ mt: 1 }} />
                  </>
                ) : (
                  <Box style={{ textAlign: 'left', justifyContent: 'left' }}>
                    <Typography variant="h6" sx={{ mt: 1, mb: 2 }}>
                      <span style={{ fontWeight: 'bolder' }}>Description:</span> {donation.description}
                    </Typography>

                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" color="text.secondary">
                        Goal: ₹{donation.goalAmount}
                      </Typography>
                    </Box>

                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#e3f2fd',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: theme.palette.primary.main,
                        },
                      }}
                    />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                      <Typography variant="body2">
                        Start: {new Date(donation.startDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="body2">
                        End: {new Date(donation.endDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6">
                      Organized by: {donation.department}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                      Contact: {donation.contact}
                    </Typography>
                    <Button
                      variant="contained"
                     onClick={()=>{
                      sessionStorage.setItem('donation',JSON.stringify(donation))
                      navigate('/payment/checkout')
                     }}
                      fullWidth
                      sx={{
                        mt: 3,
                        borderRadius: 3,
                        textTransform: 'none',
                        fontWeight: 600,
                      }}
                    >
                      Donate Now
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Card
              sx={{
        borderRadius: "16px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
        },
        marginTop: "20px",
        marginLeft:'20px',
        width:'100%',
        backgroundImage:`url(${postbg})`,
        backgroundSize: "cover",
    backgroundPosition: "center",
      }}
            >
              <CardContent>
                <Typography variant="h5" fontWeight="bold" color="primary" gutterBottom>
                  Personal Info
                </Typography>
                <Divider sx={{ mb: 2 }} />

                {loading || !donation ? (
                  <>
                    <Skeleton variant="circular" width={60} height={60} />
                    <Skeleton width="50%" sx={{ mt: 1 }} />
                    <Skeleton width="70%" />
                    <Skeleton width="60%" />
                  </>
                ) : (
                  <Stack spacing={2}>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        src={donation.user?.profileImage}
                        sx={{ width: 64, height: 64, border: '2px solid #1976d2' }}
                      />
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {donation.user?.name} {donation.user?.verified ?(<Verified color="info"/>):(<Pending/>)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {donation.user?.email}
                        </Typography>
                      </Box>
                    </Box>

                    <Stack spacing={1}>
                      <InfoRow label="Degree" value={`${donation.user?.degree} (${donation.user?.batch})`} />
                      <InfoRow label="Place" value={donation.user?.place} />
                      <InfoRow label="Department" value={donation.user?.department} />
                      <InfoRow label="Contact" value={donation.user?.email} />  
                      <InfoRow label="Aadhar" value={donation.aadhar} />
                    </Stack>
                  </Stack>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Share Modal */}
      <Modal open={openShare} onClose={() => setOpenShare(false)}>
        <Box sx={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper", boxShadow: 24,
          p: 4, borderRadius: 2, width: 300, textAlign: "center"
        }}>
          <Typography variant="h6" gutterBottom>Share this post</Typography>
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <TextField fullWidth value={shareUrl} InputProps={{ readOnly: true }} />
            <IconButton onClick={handleCopy}><ContentCopy /></IconButton>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
            <IconButton onClick={() => handleShare("facebook")}><Facebook /></IconButton>
            <IconButton onClick={() => handleShare("twitter")}><Twitter /></IconButton>
            <IconButton onClick={() => handleShare("whatsapp")}><WhatsApp /></IconButton>
            <IconButton onClick={() => handleShare("linkedin")}><LinkedIn /></IconButton>
            <IconButton onClick={() => handleShare("telegram")}><Telegram /></IconButton>
          </Box>
        </Box>
      </Modal>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Link copied to clipboard!"
      />
    </Box>
  );
};

export default DonationView;
