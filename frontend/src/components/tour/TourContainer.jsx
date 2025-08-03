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
import { Link, useNavigate } from 'react-router-dom';

const programMapping = [
  { id: 1, degree: 'B.E', department: 'Civil Engineering', startYear: 1988, endYear: 2025, duration: 4 },
  { id: 2, degree: 'B.E', department: 'Electrical and Electronics Engineering', startYear: 1988, endYear: 2025, duration: 4 },
  { id: 3, degree: 'B.E', department: 'Electronics and Communication Engineering', startYear: 1988, endYear: 2025, duration: 4 },
  { id: 4, degree: 'B.E', department: 'Computer Science and Engineering', startYear: 1988, endYear: 2025, duration: 4 },
  { id: 5, degree: 'B.E', department: 'Mechanical Engineering', startYear: 1988, endYear: 2025, duration: 4 },
  { id: 6, degree: 'B.Tech', department: 'Information Technology', startYear: 2000, endYear: 2025, duration: 4 },
  { id: 7, degree: 'B.Tech', department: 'Bio Technology', startYear: 2001, endYear: 2025, duration: 4 },
  { id: 8, degree: 'M.E', department: 'Structural Engineering', startYear: 2005, endYear: 2025, duration: 2 },
  { id: 10, degree: 'M.E', department: 'Communication Systems', startYear: 2005, endYear: 2025, duration: 2 },
  { id: 12, degree: 'M.E', department: 'Computer Science and Engineering', startYear: 2005, endYear: 2025, duration: 2 },
  { id: 13, degree: 'M.Tech', department: 'Information Technology', startYear: 2005, endYear: 2025, duration: 2 },
  { id: 14, degree: 'M.E', department: 'Industrial Safety Engineering', startYear: 2005, endYear: 2025, duration: 2 },
  { id: 15, degree: 'M.E', department: 'CAD/CAM', startYear: 2005, endYear: 2025, duration: 2 },
  { id: 17, degree: 'Master of Computer Applications', department: null, startYear: 2005, endYear: 2025, duration: 3 },
  { id: 18, degree: 'Master of Business Administration (MBA)', department: null, startYear: 2005, endYear: 2025, duration: 2 },
  { id: 19, degree: 'M.Tech', department: 'Nano Science and Technology', startYear: 2008, endYear: 2025, duration: 2 },
  { id: 37, degree: 'M.Tech', department: 'Communication and Computer Network', startYear: 2010, endYear: 2025, duration: 2 },
  { id: 55, degree: 'B.E', department: 'BioMedical Engineering', startYear: 2012, endYear: 2025, duration: 4 },
  { id: 56, degree: 'B.Tech', department: 'Artificial Intelligence and Data Science', startYear: 2020, endYear: 2025, duration: 4 },
  { id: 61, degree: 'B.Arch', department: 'Architecture', startYear: 2000, endYear: 2025, duration: 5 },
];

function TourContainer({ open, setOpen }) {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedDegree, setSelectedDegree] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [introCompleted, setIntroCompleted] = useState(false);

  const handleRegisterUser = (user) => {
    setOpen(true);
    localStorage.setItem('regUser', JSON.stringify(user));
    navigate('/new/user/verification');
  };

  const uniqueDegrees = [...new Set(programMapping.map((p) => p.degree))];
  const programOptions = programMapping
    .filter((p) => p.degree === selectedDegree && p.department)
    .map((p) => p.department);
  const currentProgram = programMapping.find(
    (p) =>
      p.degree === selectedDegree &&
      (p.department === selectedDept || p.department === null),
  );

  const getBatchYears = (start, end, duration) => {
    const years = [];
    for (let y = start + duration; y <= end; y++) {
      years.push(`${y - duration}-${y}`);
    }
    return years.reverse();
  };

  const batchYears =
    selectedDegree && currentProgram
      ? getBatchYears(
          currentProgram.startYear,
          currentProgram.endYear,
          currentProgram.duration,
        )
      : [];

  const handleFetchUsers = async () => {
    const department = currentProgram.department || selectedDegree;
    if (!department || !selectedBatch) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/v1/fuser/get?department=${encodeURIComponent(department)}&batch=${selectedBatch}`,
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
          
          height: '85vh',
          borderRadius: 6,
          overflow: 'hidden',
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#fff',
        }}
      >
        {!introCompleted ? (
          <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
  <video
    src="/assets/vid/getstarted.mp4"
    autoPlay
    muted
    loop
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: 12,
    }}
  />
  
  <Box
    sx={{
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1.5,
    }}
  >
    <Button
  variant="contained"
  sx={{
    px: 4,
    py: 1.5,
    fontSize: '1rem',
    borderRadius: 2,
    backgroundColor: '#000',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#222', 
    },
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    textTransform: 'none',
  }}
  onClick={() => setIntroCompleted(true)}
>
  Take a Minute
</Button>


    <Typography variant="h6" color="black">
      Already have an account?{' '}
      <Link
        to="/login"
        style={{
          color: 'black',
          textDecoration: 'underline',
          fontWeight: 'bold',
        }}
      >
        Login
      </Link>
    </Typography>
  </Box>
</Box>

        ) : (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              
              height: '85vh',
              backdropFilter: 'blur(20px)',
              background:
                'linear-gradient(to right, rgba(255,255,255,0.85), rgba(240,240,240,0.8))',
              borderRadius: 6,
              overflow: 'hidden',
              p: 4,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                width: '90%',
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                py: { xs: 4, md: 6 },
                px: { xs: 2, md: 6 },
                borderRadius: 4,
                mb: 4,
                textAlign: 'center',
                boxShadow: 4,
              }}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                sx={{
                  mb: 2,
                  fontSize: { xs: '1.8rem', md: '2.5rem' },
                  letterSpacing: 1,
                }}
              >
                Welcome!!
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: '0.95rem', md: '1.1rem' },
                  maxWidth: 800,
                  mx: 'auto',
                  lineHeight: 1.8,
                }}
              >
                Reconnect and be part of our growing alumni network! 🎓
                <br />
                Select your <strong>Batch</strong> and{' '}
                <strong>Department</strong> so we can match your details from
                our archives.
                <br />
                We're making this quick and accurate — your legacy matters!
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Degree</InputLabel>
                  <Select
                    value={selectedDegree}
                    label="Degree"
                    onChange={(e) => {
                      setSelectedDegree(e.target.value);
                      setSelectedDept('');
                      setSelectedBatch('');
                    }}
                  >
                    {uniqueDegrees.map((deg) => (
                      <MenuItem key={deg} value={deg}>
                        {deg}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {selectedDegree &&
                ![
                  'Master of Business Administration (MBA)',
                  'Master of Computer Applications',
                ].includes(selectedDegree) && (
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel>Department</InputLabel>
                      <Select
                        value={selectedDept}
                        label="Department"
                        onChange={(e) => {
                          setSelectedDept(e.target.value);
                          setSelectedBatch('');
                        }}
                      >
                        {programOptions.map((dept) => (
                          <MenuItem key={dept} value={dept}>
                            {dept}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                )}
              {(selectedDept ||
                [
                  'Master of Business Administration (MBA)',
                  'Master of Computer Applications',
                ].includes(selectedDegree)) && (
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth>
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
                </Grid>
              )}
            </Grid>

            {selectedBatch && (
              <>
                <Chip
                  label={`${selectedDept || selectedDegree} | ${selectedBatch}`}
                  color="primary"
                  sx={{
                    mt: 3,
                    mb: 2,
                    px: 2,
                    py: 1.5,
                    fontSize: 16,
                    borderRadius: 2,
                  }}
                />
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 1.5,
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    borderRadius: 3,
                  }}
                  onClick={handleFetchUsers}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Find My Name'
                  )}
                </Button>
              </>
            )}

            {showNameInput && (
              <Box mt={4}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Search Your Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  sx={{ borderRadius: 2 }}
                />
                <Box mt={2}>
                  {userName.trim() === '' ? (
                    <Typography variant="body2" color="textSecondary">
                      Please enter your name to search.
                    </Typography>
                  ) : matchedUsers.length > 0 ? (
                    <Grid container spacing={2}>
                      {matchedUsers.map((user) => (
                        <Grid item xs={12} key={user._id}>
                          <Box
                            p={2}
                            sx={{
                              border: '1px solid #ccc',
                              borderRadius: 3,
                              background: 'rgba(255, 255, 255, 0.6)',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <Box>
                              <Typography variant="subtitle1" fontWeight="bold">
                                {user.name}
                              </Typography>
                              <Typography variant="body2">
                                Father: {user.father || 'Not available'}
                              </Typography>
                              <Typography variant="body2">
                                {user.department} | {user.batch}
                              </Typography>
                            </Box>
                            <PersonAddIcon
                              sx={{
                                fontSize: 32,
                                color: '#1e88e5',
                                cursor: 'pointer',
                              }}
                              onClick={() => handleRegisterUser(user)}
                            />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      No matching user found.
                    </Typography>
                  )}
                </Box>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Modal>
  );
}

export default TourContainer;
