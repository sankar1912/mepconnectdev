import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserJobs } from '../../features/feeds/jobsSlice';
import { getAuth } from '../../features/users/AuthSlice';

import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Chip,
  Divider,
  Tooltip,
  Stack,
  Button,
  ListItem,
  ListItemText,
  Skeleton
} from '@mui/material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useNavigate } from 'react-router-dom';
import { Done} from '@mui/icons-material';
import { fetchJobsPermit, getJobsPermit, updateJobRejected, updateJobVerified } from '../../features/admin/permitSlice';

function PermitJobs() {
  const dispatch = useDispatch();
  const { auth } = useSelector(getAuth);
  const jobs = useSelector(getJobsPermit);
  const navigate=useNavigate();
  useEffect(() => {
   dispatch(fetchJobsPermit())
  }, [ dispatch]);
  const loading = jobs.isLoading;

  return (
    <Box p={{ xs: 4, sm: 4 }} sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh', width:'90%' }}>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Job Post Request
      </Typography>
      
        {loading &&
            Array.from({ length: 6 }).map((_, index) => (
              <ListItem key={index}>
                <ListItemText primary={<Skeleton variant="text" width="80%" />} />
              </ListItem>
            ))}
      

      <Grid container spacing={4}>
        {Array.isArray(jobs) && jobs.length > 0 ? (
          jobs.map((job) => (
            <Grid item xs={12} sm={6}  key={job._id} >
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
                      src={job.owner?.profileImage}
                      alt={job.owner?.name}
                      sx={{ width: 56, height: 56, borderRadius: 3 }}
                    />
                    <Box sx={{textAlign:'left'}}>
                      <Typography sx={{cursor:'pointer'}} onClick={()=>{
                        navigate(`/publicprofile/${job.owner._id}`)
                      }} fontWeight={600}>{job.owner?.name}</Typography>
                      <Typography fontSize={13} color="text.secondary">
                        Company:{job.company}
                      </Typography>
                      <Typography fontSize={13} color="text.secondary">
                        Location: {job.location}
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
                  <Box>
                  <img
                            src={job.imageUrl}
                            alt="ImageUrl"
                            style={{
                              height: "150px",
                              width: "auto",
                              borderRadius: "8px",
                              objectFit: "cover",
                            }}
                          />
                          <img
                        
                            src={job.proofUrl}
                            alt="ProoflUrl"
                            style={{
                              height: "150px",
                              width: "auto",
                              borderRadius: "8px",
                              objectFit: "cover",
                            }}
                          />
                  </Box>
                  <Box >
                  <Button variant='contained' onClick={()=>{dispatch(updateJobVerified({id:job._id}))}}>
                    Approve
                  </Button>
                  <Button sx={{marginLeft:1}} color='error' variant='contained' onClick={()=>{updateJobRejected({id:job._id})}}>
                    Reject
                  </Button>
                  </Box>
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
                     height: '60vh',
                     width: '100%',
                     textAlign: 'center',
                     mt: 5
                   }}
                 >
                   <Done sx={{ fontSize: 80, color: "#b0b0b0" }} />
                   <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, color: "#555" }}>
                   No Pending Requests
                   </Typography>

                 </Box>
        )}
      </Grid>
    </Box>
  );
}

export default PermitJobs;
