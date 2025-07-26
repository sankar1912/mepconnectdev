import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserJobs, trackAppliedJobs } from '../../redux/slice/jobsSlice';
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
  Tooltip,
  Stack,
  Button,
  Link
} from '@mui/material';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import VerifiedIcon from '@mui/icons-material/Verified';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { SentimentDissatisfiedOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function AppliedJobs() {
  const dispatch = useDispatch();
  const { auth } = useSelector(getAuth);
  const jobs = useSelector((state) => state.jobs.jobapplications);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.user?._id) {
      dispatch(trackAppliedJobs());
    }
  }, [auth?.user?._id, dispatch]);

  return (
    <Box p={{ xs: 2, md: 4 }} sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" fontWeight={600} mb={4}>
        My Applied Jobs
      </Typography>

      <Grid container spacing={4}>
        {Array.isArray(jobs) && jobs.length > 0 ? (
          jobs.map((job) => {
            const applicant = job.applicants?.find(a => a.email === auth.user.email);

            return (
              <Grid item xs={12} md={6} lg={4} key={job._id}>
                <Card elevation={3} sx={{ borderRadius: 4, p: 2 }}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Avatar
                      src={job.imageUrl}
                      variant="rounded"
                      sx={{ width: 64, height: 64, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {job.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {job.company} • {job.location}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {job.description.length > 120 ? `${job.description.slice(0, 120)}...` : job.description}
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap mb={2}>
                    <Chip icon={<BusinessCenterIcon />} label={job.workType} />
                    <Chip icon={<WorkOutlineIcon />} label={job.experienceLevel} />
                    <Chip icon={<LocationOnIcon />} label={job.location} />
                    <Chip icon={<AttachMoneyIcon />} label={`₹${job.salary}`} />
                    <Chip
                      icon={<VerifiedIcon />}
                      label={job.verified ? "Verified" : "Not Verified"}
                      color={job.verified ? 'primary' : 'error'}
                    />
                  </Stack>

                  <Divider sx={{ my: 2 }} />

                  {applicant && (
                    <Box sx={{textAlign:"left"}}>
                      <Typography fontWeight={600} mb={1}>
                        My Application
                      </Typography>

                      <Typography variant="body2">
                        <strong>Degree:</strong> {applicant.degree} ({applicant.department})
                      </Typography>
                      <Typography variant="body2">
                        <strong>Batch:</strong> {applicant.batch}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Place:</strong> {applicant.place}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        <strong>Experience:</strong> {applicant.experience} year(s)
                      </Typography>

                      

                      <Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>About Me:</strong> {applicant.additionalInfo}
                      </Typography><Typography variant="body2" sx={{ mb: 1 }}>
                        <strong>Skills</strong>
                      </Typography>
                      <Stack direction="row" spacing={1} mt={1} mb={2} flexWrap="wrap">
                        {applicant.skills.map((skill, idx) => (
                          <Chip key={idx} label={skill} color="primary" variant="contained" />
                        ))}
                      </Stack>
                      <Stack direction="row" spacing={2} mt={1}>
                        <Link href={applicant.resume} target="_blank" underline="none">
                          <Button variant="outlined" startIcon={<InsertDriveFileIcon />}>
                            Resume
                          </Button>
                        </Link>
                        <Chip
                      icon={<VerifiedIcon />}
                      label={applicant.status ? "Accepted" : "Pending"}
                      color={applicant.status ? 'primary' : 'error'}
                    />
                      </Stack>
                    </Box>
                  )}
                </Card>
              </Grid>
            );
          })
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
            <SentimentDissatisfiedOutlined sx={{ fontSize: 80, color: "#b0b0b0" }} />
            <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, color: "#555" }}>
              You haven't applied to any jobs yet.
            </Typography>
            <Typography variant="body2" sx={{ color: "#777", mt: 1 }}>
              Start browsing and apply for exciting opportunities!
            </Typography>
            <Button variant='contained' color='primary' onClick={() => navigate('/jobs')}>
              Browse Jobs
            </Button>
          </Box>
        )}
      </Grid>
    </Box>
  );
}

export default AppliedJobs;
