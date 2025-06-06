import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Paper,
  Alert,
  Collapse,
  IconButton,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('success');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendEmail = async () => {
    if (email.trim() === '') {
      setAlertMessage('Please enter your email.');
      setAlertType('error');
      setAlertOpen(true);
      return;
    }

    setLoading(true);
    setAlertOpen(false);

    try {
      const response = await axios.post('/api/user/request/resetpassword', { email });

      setAlertMessage(response.data.message || 'Password reset email sent successfully.');
      setAlertType('success');
      setEmail('');
    } catch (error) {
      setAlertMessage(
        error.response?.data?.message || 'Something went wrong. Please try again.'
      );
      setAlertType('error');
    } finally {
      setLoading(false);
      setAlertOpen(true);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Paper elevation={6} sx={{ padding: 4, borderRadius: 4, width: '100%', maxWidth: 420 }}>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <EmailIcon sx={{ fontSize: 50, color: '#1976d2' }} />
            <Typography variant="h5" fontWeight="bold" textAlign="center">
              Forgot Your Password?
            </Typography>
            <Typography variant="body2" color="textSecondary" textAlign="center">
              Enter your email address and we’ll send you instructions to reset your password.
            </Typography>

            <Collapse in={alertOpen} sx={{ width: '100%' }}>
              <Alert
                severity={alertType}
                action={
                  <IconButton
                    aria-label="close"
                    size="small"
                    onClick={() => setAlertOpen(false)}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ mb: 2 }}
              >
                {alertMessage}
              </Alert>
            </Collapse>

            <TextField
              fullWidth
              label="Email Address"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />

            <Button
              variant="contained"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                mt: 1,
                backgroundColor: '#1976d2',
                '&:hover': { backgroundColor: '#155a9a' },
              }}
              onClick={handleSendEmail}
              startIcon={loading && <CircularProgress size={20} color="inherit" />}
            >
              {loading ? 'Sending...' : 'Send Email'}
            </Button>

            <Typography variant="body2" sx={{ mt: 2 }}>
              Remember your password?{' '}
              <Link
                onClick={() => navigate('/login')}
                underline="hover"
                sx={{ cursor: 'pointer', color: '#1976d2', fontWeight: 'medium' }}
              >
                Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}

export default ForgotPassword;
