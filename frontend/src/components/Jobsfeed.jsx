import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Fab,
  Zoom,
  useScrollTrigger,
  Tooltip,
  Chip,
  Divider,
  Stack,
  Button,
  Grid,
} from "@mui/material";
import {
  Share,
  KeyboardArrowUp,
  HowToRegOutlined,
  WorkOutlineRounded,
  Search as SearchIcon,
  LocationCity,
  CloseOutlined,
  Close,
  CloseRounded,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { applyJob, fetchJobSearch } from "../features/feeds/jobsSlice";
import { useNavigate } from "react-router-dom";
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import VerifiedIcon from '@mui/icons-material/Verified';
import { getAuth } from "../features/users/AuthSlice";
const ScrollTop = ({ children }) => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 100 });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };



  return (
    <Zoom in={trigger}>
      <Box onClick={handleClick} role="presentation" sx={{ position: "fixed", bottom: 16, right: 16 }}>
        {children}
      </Box>
    </Zoom>
  );
};

const JobsFeed = () => {
  const jobs = useSelector((state) => state.jobs.searchedJob);
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const {auth}=useSelector(getAuth)
  
  useEffect(() => {
    dispatch(
      fetchJobSearch({
        name: "",
        job: "",
        places: [],
        mode: [],
        experienceLevels: [],
        type: [],
      })
    );
  }, [dispatch]);

  return (
    <Box sx={{ px: { xs: 2, sm: 5 }, py: 3, paddingBottom: 10, position: "relative" }}>
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Chip
          label="Search job at your convenience"
          color="primary"
          icon={<SearchIcon />}
          clickable
          onClick={() => navigate("/jobs/search")}
          sx={{
            fontWeight: "bold",
            fontSize: "1rem",
            px: 2,
            py: 1,
            backgroundColor: "#1976d2",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        />
      </Box>
      

      {jobs.length>0 && jobs.filter((job)=>job?.owner?._id!==auth.user._id).map((job) => (
            <Grid item  sx={{marginTop:'20px'}} key={job?._id}>
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
                      src={job?.owner?.profileImage}
                      alt={job?.owner?.name}
                      sx={{ width: 56, height: 56, borderRadius: 3 }}
                    />
                    <Box sx={{textAlign:'left'}}>
                      <Typography sx={{cursor:'pointer'}} onClick={()=>{
                        navigate(`/publicprofile/${job.owner._id}`)
                      }} fontWeight={600}>{job?.owner?.name|| "Deleted Account"}</Typography>
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
                    ):(<Chip
                      icon={<CloseRounded sx={{ color: 'red' }} />}
                      label="Not Verified"
                      color="error"
                      variant="outlined"
                      sx={{ borderRadius: 2 }}
                    />)}
                  </Stack>
                </CardContent>
                <Button variant="contained" sx={{marginBottom:"10px", borderRadius:"20px"}} onClick={()=>{
                  navigate(`/job/view/${job._id}`)
                }}>
                  View
                </Button>
              </Card>
            </Grid>
          ))}

      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </Box>
  );
};

export default JobsFeed;
