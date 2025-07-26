import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Card,
  CardContent,
  Grid,
  Divider,
  Tooltip,
  Chip,
  useTheme,
  TextField,
} from "@mui/material";
import {
  WorkOutline,
  LocationOn,
  Business,
  AttachMoney,
  EmojiObjects,
  Email,
  Verified,
  Person,
  Place,
  VerifiedOutlined,
  Pending,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getAuth } from "../../redux/slice/AuthSlice";

function JobTracker() {
  const { _id } = useParams();
  const job = useSelector((state) => state.jobs.searchedJob);
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  const { auth } = useSelector(getAuth);

  if (!job || !job._id !== _id) {
    navigate("/jobs/applied");
  }

  return (
    <Box
      maxWidth="1000px"
      mx="auto"
      p={3}
      sx={{ transition: "all 0.4s ease-in-out" }}
    >
      <Card
        elevation={6}
        sx={{
          borderRadius: "16px",
          transition: "0.3s",
          "&:hover": { boxShadow: "0 8px 28px rgba(0,0,0,0.1)" },
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
                  width: "100%",
                  height: 140,
                  borderRadius: "12px",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.03)",
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
                <Tooltip
                  title={job.verified ? "Verified" : "Not verified"}
                  arrow
                >
                  <Typography variant="body2" fontWeight="bold">
                    Status: {job.verified ? "Verified" : "Not Verified"}
                  </Typography>
                </Tooltip>
              </Box>

              <Box
                display="flex"
                alignItems="center"
                gap={2}
                mt={1}
                flexWrap="wrap"
              >
                <Tooltip title={`Company Provides: ${job.workType}`} arrow>
                  <Chip
                    icon={<WorkOutline />}
                    label={job.workType}
                    variant="outlined"
                  />
                </Tooltip>
                <Tooltip title={`Company Requires: ${job.workMode} mode`} arrow>
                  <Chip label={job.workMode} />
                </Tooltip>
                <Tooltip title={`Estd. Salary: ${job.salary}`} arrow>
                  <Chip
                    icon={<AttachMoney />}
                    label={`₹${job.salary}`}
                    sx={{ bgcolor: "#e3f2fd" }}
                  />
                </Tooltip>
                <Tooltip
                  title={job.experienceLevel || `Exp: ${job.experience}`}
                  arrow
                >
                  <Chip
                    icon={<EmojiObjects />}
                    label={job.experienceLevel || `Exp: ${job.experience}`}
                    sx={{ bgcolor: "#f3e5f5" }}
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
          {job.applicants ? (
           (job.applicants.length>0 && job.applicants) &&(
            job.applicants.map((applicant)=>(
                <Box mt={2}>
                <Typography variant="h6" gutterBottom>
                  Applications
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  gap={3}
                  mt={2}
                  flexWrap="wrap"
                >
                  <Avatar
                    src={applicant?.profileImage}
                    alt={applicant?.name}
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: "16px",
                      boxShadow: 2,
                    }}
                  />
                  <Typography variant="h6" fontWeight="bold">
                    {applicant?.name}{" "}
                    {applicant?.verified ? (
                      <Tooltip title="Verified Profile">
                        <VerifiedOutlined color="primary" />
                      </Tooltip>
                    ) : (
                      <Pending color="warning" />
                    )}
                  </Typography>
  
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Degree"
                        value={applicant?.degree}
                        fullWidth
                        InputProps={{
                          readOnly: true,
                          sx: {
                            borderRadius: 3,
                            backgroundColor: "#f5f5f5",
                          },
                        }}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                      />
                    </Grid>
  
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Department"
                        value={applicant?.department}
                        fullWidth
                        InputProps={{
                          readOnly: true,
                          sx: {
                            borderRadius: 3,
                            backgroundColor: "#f5f5f5",
                          },
                        }}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                      />
                    </Grid>
  
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Batch"
                        value={applicant?.batch}
                        fullWidth
                        InputProps={{
                          readOnly: true,
                          sx: {
                            borderRadius: 3,
                            backgroundColor: "#f5f5f5",
                          },
                        }}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                      />
                    </Grid>
  
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Email"
                        value={applicant?.email}
                        fullWidth
                        InputProps={{
                          readOnly: true,
                          sx: {
                            borderRadius: 3,
                            backgroundColor: "#f5f5f5",
                          },
                          startAdornment: (
                            <Email
                              sx={{ mr: 1, color: "text.secondary" }}
                              fontSize="small"
                            />
                          ),
                        }}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                      />
                    </Grid>
  
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Location"
                        value={applicant?.place}
                        fullWidth
                        InputProps={{
                          readOnly: true,
                          sx: {
                            borderRadius: 3,
                            backgroundColor: "#f5f5f5",
                          },
                          startAdornment: (
                            <Place
                              sx={{ mr: 1, color: "text.secondary" }}
                              fontSize="small"
                            />
                          ),
                        }}
                        InputLabelProps={{ shrink: true }}
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>
                  <Box mt={4} textAlign="center"> <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  sx={{
                    borderRadius: "30px",
                    px: 5,
                    py: 1.5,
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "16px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: `0 5px 15px ${theme.palette.primary.light}`,
                    },
                  }}
                  onClick={() => {
                    window.open(applicant.resume)
                  }}
                >
                  View Resume
                </Button>  
            </Box>
                </Box>
              </Box>
            ))
        )
          ):(<Box>
            No Applications till now
          </Box>)}
        
        </CardContent>
      </Card>
    </Box>
  );
}

export default JobTracker;
