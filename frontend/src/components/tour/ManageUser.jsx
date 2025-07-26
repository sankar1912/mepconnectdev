import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  TextField,
  Card,
  CardContent,
  Avatar,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import PersonIcon from '@mui/icons-material/Person';
import axios from 'axios';

const MotionBox = motion(Box);

function ManageUser() {
  const [regUser, setRegUser] = useState(null);
  const [emailInputs, setEmailInputs] = useState('');

  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('regUser')) || null;
      setRegUser(user);
    } catch {
      setRegUser(null);
    }
  }, []);

  const handleEmailChange = (id, value) => {
   setEmailInputs(value);
  };

 const handleSubmit = async (user) => {
  const enteredEmail =
    user.email && user.email !== "Not provided"
      ? user.email
      : emailInputs || "";

  console.log(`Submitted for user: ${user.name}, email: ${enteredEmail}`);

  // Ensure user.email is set correctly before sending
  const updatedUser = {
    ...user,
    email: enteredEmail,
  };

  try {
    const res = await axios.post('/api/v1/fuser/verify', updatedUser);
    console.log("Verification request sent:", res.data);
  } catch (error) {
    console.error("Error sending verification request:", error.response?.data || error.message);
  }
};



  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', mt: 10, px: 2 }}>
      <MotionBox
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        textAlign="center"
      
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Manage Registered User
        </Typography>
      </MotionBox>

      {regUser ? (
        <MotionBox
          component={Card}
          elevation={4}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          sx={{ borderRadius: 4, p: 3 }}
        >
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={2}>
                <Avatar sx={{ width: 56, height: 56 }}>
                  <PersonIcon />
                </Avatar>
              </Grid>
              <Grid item xs={12} sm={10}>
                <Typography variant="h6">{regUser.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {regUser.department} | Batch {regUser.batch}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography>
                  <strong>Father's Name:</strong> {regUser.father || 'N/A'}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography>
                  <strong>Email:</strong>{' '}
                  {regUser.email !== 'Not provided'
                    ? regUser.email
                    : 'Not provided'}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                {regUser.email !== 'Not provided'|| regUser.email!=="" ? (
                  <>
                    <Typography
                      sx={{ fontSize: 14, color: 'primary.main', mb: 2 }}
                    >
                      You will receive the password to this registered email.
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handleSubmit(regUser)}
                    >
                      Submit
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography
                      sx={{ fontSize: 14, color: 'error.main', mb: 1 }}
                    >
                      <strong>Email not available</strong>
                    </Typography>
                    <TextField
                      label="Enter your email"
                      fullWidth
                      size="small"
                      value={emailInputs}
                      onChange={(e) =>
                      {
                        setEmailInputs(e.target.value)
                      }
                      }
                      sx={{ mb: 2 }}
                    />
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handleSubmit(regUser)}
                    >
                      Submit
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </MotionBox>
      ) : (
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          textAlign="center"
          mt={4}
        >
          <Typography variant="h6" color="text.secondary">
            No registered user found.
          </Typography>
        </MotionBox>
      )}

      {/* Contact Support Section */}
      <MotionBox
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        component={Paper}
        elevation={2}
        sx={{
          mt: 6,
          p: 3,
          borderRadius: 3,
          background: '#f9f9f9',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Need Help? Contact Technical Support
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <EmailIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">support@mepconnect.org</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box display="flex" alignItems="center" justifyContent="center">
              <PhoneIcon color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">+91 98765 43210</Typography>
            </Box>
          </Grid>
        </Grid>
        <Typography
          mt={2}
          variant="body2"
          color="text.secondary"
          sx={{ fontStyle: 'italic' }}
        >
          Our team is here to help you with any issues you face during
          registration.
        </Typography>
      </MotionBox>
    </Box>
  );
}

export default ManageUser;
