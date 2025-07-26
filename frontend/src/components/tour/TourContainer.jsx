import React, { useState } from 'react';
import {
  Box,
  Typography,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  Grid,
  CircularProgress,
  TextField,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TourContainer({ open, setOpen }) {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  const departments = [
    'Civil Engineering',
    'Mechanical Engineering',
    'Electrical and Electronics Engineering',
    'Electronics and Communication Engineering',
    'Computer Science Engineering',
    'Information Technology',
    'Artificial Intelligence & Data Science',
    'Bio Medical Engineering',
    'Bio Technology',
    'Architecture',
    'MCA',
    'MBA',
  ];

  const degrees = [
    { name: 'BE/BTech', duration: 4 },
    { name: 'ME/MTech', duration: 2 },
    { name: 'PhD', duration: 5 },
  ];

  const [selectedDept, setSelectedDept] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);

  const handleRegisterUser = (user) => {
    setOpen(true);
    localStorage.setItem('regUser', JSON.stringify(user));
    navigate('/new/user/verification');
  };

  const getBatchYears = (duration) => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 1984; year <= currentYear; year++) {
      years.push(`${year - duration}-${year}`);
    }
    return years;
  };

  const selectedDegreeObj = degrees.find((d) => d.name === selectedDegree);
  const batchYears = selectedDegreeObj
    ? getBatchYears(selectedDegreeObj.duration)
    : [];

  const handleFetchUsers = async () => {
    if (!selectedDept || !selectedBatch || !selectedDegree) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/v1/fuser/get?department=${encodeURIComponent(selectedDept)}&batch=${selectedBatch}`,
      );
      setUsers(res.data.users || []);
      setShowNameInput(true);
    } catch (err) {
      setUsers([]);
    }
    setLoading(false);
  };

  const matchedUsers = users.filter((u) =>
    u.name.toLowerCase().includes(userName.trim().toLowerCase()),
  );

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: 1400,
          height: '80vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 0,
          borderRadius: 3,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {!showForm ? (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
              }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              >
                <source src="/Assets/vid/getstarted.mp4" type="video/mp4" />
              </video>

            </Box>

            {/* Foreground Text */}
            <Box
              sx={{
                zIndex: 1,
                textAlign: 'center',
                color: 'white',
                px: 3,
                animation: 'fadeIn 1s',
              }}
            >
            <Button
  variant="contained"
  onClick={() => setShowForm(true)}
  sx={{
    px: 4,
    py: 1.5,
    fontWeight: 'bold',
    fontSize: '1rem',
    borderRadius: 2,
    backgroundColor: 'black',
    color: 'white',
    '&:hover': {
      backgroundColor: '#333', // Slightly lighter black
    },
    position: 'absolute',
    bottom: 30, // Adjust as needed
    left: '50%',
    transform: 'translateX(-50%)',
  }}
>
  Take a Minute
</Button>

            </Box>
          </Box>
        ) : (
          <Box
            sx={{
              p: 3,
              overflowY: 'auto',
              height: '100%',
            }}
          >
            <Typography variant="h5" fontWeight="bold" mb={2}>
              Select Department
            </Typography>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Department</InputLabel>
              <Select
                value={selectedDept}
                label="Department"
                onChange={(e) => setSelectedDept(e.target.value)}
              >
                {departments.map((dept) => (
                  <MenuItem key={dept} value={dept}>
                    {dept}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Degree</InputLabel>
              <Select
                value={selectedDegree}
                label="Degree"
                onChange={(e) => {
                  setSelectedDegree(e.target.value);
                  setSelectedBatch('');
                }}
              >
                {degrees.map((degree) => (
                  <MenuItem key={degree.name} value={degree.name}>
                    {degree.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedDegree && (
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Batch</InputLabel>
                <Select
                  value={selectedBatch}
                  label="Batch"
                  onChange={(e) => setSelectedBatch(e.target.value)}
                >
                  {batchYears.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            {selectedDept && selectedDegree && selectedBatch && (
              <>
                <Box mb={2}>
                  <Chip
                    label={`${selectedDept} | ${selectedDegree} | ${selectedBatch}`}
                    color="primary"
                  />
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                  onClick={handleFetchUsers}
                >
                  {loading ? <CircularProgress size={24} /> : 'Show Users'}
                </Button>
              </>
            )}

            {showNameInput && (
              <>
                <TextField
                  label="Enter your name"
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2, mb: 2 }}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />

                <Box sx={{ width: '100%' }}>
                  {userName.trim() === '' ? (
                    <Typography variant="body2" color="textSecondary">
                      Please enter your name to find your record.
                    </Typography>
                  ) : matchedUsers.length > 0 ? (
                    <Grid container spacing={2}>
                      {matchedUsers.map((user) => (
                        <Grid item xs={12} key={user._id}>
                          <Box
                            p={2}
                            border={1}
                            borderRadius={2}
                            borderColor="grey.300"
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Box>
                              <Typography variant="subtitle1" fontWeight="bold">
                                Name: {user.name}
                              </Typography>
                              <Typography variant="body2">
                                Father: {user.father || 'Not available'}
                              </Typography>
                              <Typography variant="body2">
                                Department: {user.department} | {user.batch}
                              </Typography>
                            </Box>
                            <PersonAddIcon
                              sx={{
                                cursor: 'pointer',
                                color: '#1976d2',
                                ml: 2,
                              }}
                              onClick={() => handleRegisterUser(user)}
                            />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No user found with that name.
                    </Typography>
                  )}
                </Box>
              </>
            )}
          </Box>
        )}
      </Box>
    </Modal>
  );
}

export default TourContainer;
