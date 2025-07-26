import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserJobs, setSearchedJob, trackMyJobs } from '../../redux/slice/jobsSlice';
import { getAuth } from '../../redux/slice/AuthSlice';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Chip,
  Divider,

  Stack,
  Button,
  useTheme
} from '@mui/material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useNavigate } from 'react-router-dom';
import { SentimentDissatisfiedOutlined } from '@mui/icons-material';

function MyJobs() {
    const theme = useTheme();
  const dispatch = useDispatch();
  const { auth } = useSelector(getAuth);
  const jobs = useSelector((state) => state.jobs.searchedJob);
  const navigate=useNavigate();
  useEffect(() => {
    dispatch(trackMyJobs())
  }, [dispatch]);

  return (
    <Box p={{ xs: 2, md: 4 }} sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight={600} mb={3}>
        My Job Postings
      </Typography>

      <Grid container spacing={4}>
        {Array.isArray(jobs) && jobs.length > 0 ? (
          jobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: 5,
                  background: 'linear-gradient(to bottom right, #ffffff, #f1f5f9)',
                  transition: 'all 0.35s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-6px) scale(1.01)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar
                      src={auth.user?.profileImage}
                      alt={auth.user?.name}
                      sx={{ width: 56, height: 56, borderRadius: 3 }}
                    />
                    <Box sx={{textAlign:'left'}}>
                      <Typography sx={{cursor:'pointer'}} onClick={()=>{
                        navigate(`/publicprofile/${auth.user._id}`)
                      }} fontWeight={600}>{auth.user?.name}</Typography>
                      <Typography fontSize={13} color="text.secondary">
                        Company:{job.company}
                      </Typography>
                      <Typography fontSize={13} color="text.secondary">
                        Location: job.location
                      </Typography>
                    </Box>
                  </Box>

                  <Divider sx={{ mb: 2 }} />

                 <Box sx={{textAlign:'left'}}>
                 <Typography variant="h6" fontWeight={600} gutterBottom color="primary.dark">
                    {job.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, minHeight: 60 }}
                  >
                    {job.description.length > 100
                      ? job.description.slice(0, 100) + '...'
                      : job.description}
                  </Typography>

                 </Box>
                  <Stack direction="row" flexWrap="wrap" gap={1} useFlexGap>
                    <Chip
                      icon={<BusinessCenterIcon color='primary' />}
                      label={job.workType}
                      variant="outlined"
                      sx={{ borderRadius: 2 }}
                    />
                    <Chip
                      icon={<WorkOutlineIcon color='info' />}
                      label={job.experienceLevel}
                      variant="outlined"
                      sx={{ borderRadius: 2 }}
                    />
                    <Chip
                      icon={<LocationOnIcon color='error' />}
                      label={job.location}
                      variant="outlined"
                      sx={{ borderRadius: 2 }}
                    />
                    <Chip
                      icon={<AttachMoneyIcon color='success' />}
                      label={`₹${job.salary}`}
                      variant="outlined"
                      sx={{ borderRadius: 2 }}
                    />
                    {job.verified ? (
                      <Chip
                        icon={<VerifiedIcon sx={{ color: '#1e88e5' }} />}
                        label="Verified"
                        color="primary"
                        variant="outlined"
                        sx={{ borderRadius: 2 }}
                      />
                    ):(
                      <Chip
                        icon={<VerifiedIcon sx={{ color: 'red' }} />}
                        label="Not Verified"
                        color="error"
                        variant="outlined"
                        sx={{ borderRadius: 2 }}
                      />
                    )}
                  </Stack>
                  <Button
                              variant="contained"
                              color="primary"
                              sx={{
                                maringBottom:"10px",
                                borderRadius: '30px',
                                px: 5,
                                py: 1.5,
                                textTransform: 'none',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  transform: 'scale(1.05)',
                                  boxShadow: `0 5px 15px ${theme.palette.primary.light}`,
                                },
                              }}
                              onClick={()=>{
                                navigate(`/job/track/${job._id}`)
                                dispatch(setSearchedJob(job))
                              }}
                            >
                             View Applications
                            </Button>
                </CardContent>
               
              </Card>
            </Grid>
          ))
        ) : (
          <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            textAlign: 'center',
            mt: 5
          }}
        >
          <SentimentDissatisfiedOutlined sx={{ fontSize: 50, color: "#b0b0b0" }} />
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, color: "#555" }}>
           You haven't posted anything
          </Typography>
          <Typography variant="body2" sx={{ color: "#777", mt: 1 }}>
          Create a Job!!
          </Typography>
          <Button variant='contained' color='primary' onClick={()=>{
            navigate('/jobs/create')
          }}>Create</Button>
        </Box>
        )}
      </Grid>
    </Box>
  );
}

export default MyJobs;
