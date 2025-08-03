import React, { useEffect, Suspense } from 'react';
import {
  Box,Typography,Button,Avatar,Card,CardContent,Grid,Divider,Tooltip,Chip,useTheme,TextField,Skeleton,} from '@mui/material';
import {WorkOutline,LocationOn,Business,AttachMoney,EmojiObjects,Email,Verified,Person,Place,VerifiedOutlined,Pending,Clear,ClearRounded,Cancel,
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getJobById } from '../redux/slice/jobsSlice';
import { getAuth } from '../redux/slice/AuthSlice';


function ViewJob({show}) {
  const { _id } = useParams();
  const job = useSelector((state) => state.jobs.searchedJob);
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate= useNavigate();
  useEffect(() => {
    dispatch(getJobById(_id));
  }, [dispatch, _id]);

  const {auth} =useSelector(getAuth);
if (!job || !job.title) {
  return (
    <Box maxWidth="1000px" mx="auto" p={3}>
      <Card elevation={6} sx={{ borderRadius: '16px', p: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Skeleton variant="rectangular" width="100%" height={140} sx={{ borderRadius: '12px' }} />
          </Grid>
          <Grid item xs={12} md={9}>
            <Skeleton variant="text" width="60%" height={40} />
            <Skeleton variant="text" width="40%" height={30} />
            <Skeleton variant="text" width="50%" height={30} />
            <Skeleton variant="rounded" width={100} height={30} sx={{ mt: 1 }} />
            <Skeleton variant="rounded" width={100} height={30} sx={{ mt: 1, ml: 1 }} />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Skeleton variant="text" width="40%" height={30} />
        <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 2 }} />

        <Divider sx={{ my: 3 }} />

        <Skeleton variant="text" width="40%" height={30} />
        <Box display="flex" alignItems="center" gap={2} mt={2}>
          <Skeleton variant="circular" width={80} height={80} />
          <Box>
            <Skeleton variant="text" width={150} height={30} />
            <Skeleton variant="text" width={100} height={20} />
          </Box>
        </Box>

        <Grid container spacing={2} mt={2}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Skeleton variant="rounded" height={56} sx={{ borderRadius: 3 }} />
            </Grid>
          ))}
        </Grid>

        <Box mt={4} textAlign="center">
          <Skeleton variant="rounded" width={200} height={50} sx={{ borderRadius: '30px', mx: 'auto' }} />
        </Box>
      </Card>
    </Box>
  );
}

  return (
      <Box
      maxWidth="1000px"
      mx="auto"
      p={3}
      sx={{ transition: 'all 0.4s ease-in-out' }}
    >
      <Card
        elevation={6}
        sx={{
          borderRadius: '16px',
          transition: '0.3s',
          '&:hover': { boxShadow: '0 8px 28px rgba(0,0,0,0.1)' },
        }}
      >
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Avatar
                variant="rounded"
                src={job.imageUrl}
                alt={job.company}
                sx={{
                  width: '100%',
                  height: 140,
                  borderRadius: '12px',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} md={9}>
             <Tooltip title={job.title} arrow>
             <Typography variant="h4" fontWeight="bold" gutterBottom>
                {job.title} 
              </Typography>

             </Tooltip>
             
              <Box display="flex" alignItems="center" gap={1} mb={1}>

                <Business fontSize="small" color="primary" />
                <Tooltip title={job.company} arrow>
                  <Typography variant="body2" fontWeight="bold">
                    {job.company}
                  </Typography>
                  </Tooltip>
              </Box>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <LocationOn fontSize="small" color="info" />
                <Tooltip title={job.location} arrow>
                <Typography variant="body2" fontWeight="bold">
                {job.location}
                  </Typography>
                  </Tooltip>
              </Box>
              <Box display="flex" alignItems="center" gap={1} mb={1}>
                <Verified fontSize="small" color="primary" />
                <Tooltip title={job.verified ? "Verified":"Not verified"} arrow>
                  <Typography variant="body2" fontWeight="bold">
                    Status: {job.verified ? "Verified" : "Not Verified"}
                  </Typography>
                  </Tooltip>
              </Box>
              <Box display="flex" alignItems="center" gap={2} mt={1} flexWrap="wrap">
                <Tooltip title={`Company Provides: ${job.workType}`}  arrow>
                <Chip icon={<WorkOutline />} label={job.workType} variant="outlined" />
                </Tooltip>
                <Tooltip title={`Company Requires: ${job.workMode} mode`} arrow>
                <Chip label={job.workMode} />
                </Tooltip>
                <Tooltip title={`Estd. Salary: ${job.salary}`}  arrow>
                <Chip
                  icon={<AttachMoney />}
                  label={`₹${job.salary}`}
                  sx={{ bgcolor: '#e3f2fd' }}
                />
                </Tooltip>
                <Tooltip title={job.experienceLevel || `Exp: ${job.experience}`} arrow>
                <Chip
                  icon={<EmojiObjects />}
                  label={job.experienceLevel || `Exp: ${job.experience}`}
                  sx={{ bgcolor: '#f3e5f5' }}
                />
                    </Tooltip>
                {job.verified && (
                  <Chip
                    icon={<Verified />}
                    label="Verified"
                    color="success"
                    variant="filled"
                  />
                )}
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Job Description
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {job.description}
          </Typography>

          <Divider sx={{ my: 3 }} />
          {job.owner && (
            <Box mt={2}>
              <Typography variant="h6" gutterBottom>
                Posted By
              </Typography>
              <Box display="flex" alignItems="center" gap={3} mt={2} flexWrap="wrap">
  <Avatar
    src={job.owner.profileImage}
    alt={job.owner.name}
    sx={{
      width: 80,
      height: 80,
      borderRadius: '16px',
      boxShadow: 2,
    }}
  />
  <Typography variant="h6" fontWeight="bold">
    {job.owner.name  } {job.owner.verified ?(<Tooltip title="Verified Profile"><VerifiedOutlined color='primary'/></Tooltip>):(<Pending color='warning'/>)}
  </Typography>

  <Grid container spacing={2}>
    <Grid item xs={12} sm={6} md={4}>
      <TextField
        label="Degree"
        value={job.owner.degree}
        fullWidth
        InputProps={{
          readOnly: true,
          sx: {
            borderRadius: 3,
            backgroundColor: '#f5f5f5',
          },
        }}
        InputLabelProps={{ shrink: true }}
        variant="outlined"
      />
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <TextField
        label="Department"
        value={job.owner.department}
        fullWidth
        InputProps={{
          readOnly: true,
          sx: {
            borderRadius: 3,
            backgroundColor: '#f5f5f5',
          },
        }}
        InputLabelProps={{ shrink: true }}
        variant="outlined"
      />
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <TextField
        label="Batch"
        value={job.owner.batch}
        fullWidth
        InputProps={{
          readOnly: true,
          sx: {
            borderRadius: 3,
            backgroundColor: '#f5f5f5',
          },
        }}
        InputLabelProps={{ shrink: true }}
        variant="outlined"
      />
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <TextField
        label="Email"
        value={job.owner.email}
        fullWidth
        InputProps={{
          readOnly: true,
          sx: {
            borderRadius: 3,
            backgroundColor: '#f5f5f5',
          },
          startAdornment: (
            <Email sx={{ mr: 1, color: 'text.secondary' }} fontSize="small" />
          ),
        }}
        InputLabelProps={{ shrink: true }}
        variant="outlined"
      />
    </Grid>

    <Grid item xs={12} sm={6} md={4}>
      <TextField
        label="Location"
        value={job.owner.place}
        fullWidth
        InputProps={{
          readOnly: true,
          sx: {
            borderRadius: 3,
            backgroundColor: '#f5f5f5',
          },
          startAdornment: (
            <Place sx={{ mr: 1, color: 'text.secondary' }} fontSize="small" />
          ),
        }}
        InputLabelProps={{ shrink: true }}
        variant="outlined"
      />
    </Grid>
  </Grid>
</Box>
            </Box>
          )}
          {!auth ? (< Box mt={4} textAlign="center">     
                  <Button
              variant="contained"
              size="large"
              color="primary"
              sx={{
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

                navigate("/login")
              }}
            >
              Login to Apply
            </Button></Box>):(<Box mt={4} textAlign="center">
           {
             (auth?.user?.applications?.length >0 && auth?.user?.applications?.includes(job?._id)) ?(
            <>
             <Button
              variant="contained"
              size="large"
              color="primary"
              sx={{
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
                
                navigate("/jobs/applied")
              }}
            >
              Track Your Application
            </Button>
            </>):(
              <>
               <Button
              variant="contained"
              size="large"
              color="primary"
              sx={{
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
                show("Applying for job", ()=>{navigate(`/job/apply/${job._id}`)})
                
              }}
            >
              Apply Now
            </Button>
              </>

            )
           }
          </Box>)}
        </CardContent>
      </Card>
    </Box>
  );
}

export default ViewJob;
