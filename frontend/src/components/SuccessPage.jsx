import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Container,
  Typography,
  TextField,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SuccessPage = () => {
  const [status, setStatus] = useState('loading');
  const [details, setDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem('checkoutDetails');
    if (!stored) {
      setStatus('missing');
      return;
    }

    const parsed = JSON.parse(stored);
    setDetails(parsed);

    const {receipt} = parsed;

    // Call backend API to validate the transaction
    axios.post('/api/v1/razorpay/payment/verify-transaction', receipt)
      .then(() => {setStatus('success');setTimeout(() => {
          sessionStorage.removeItem('checkoutDetails');
          sessionStorage.removeItem('donation');
          navigate('/');
        }, 5000);})
      .catch(() => {setStatus('invalid');setTimeout(() => {
          sessionStorage.removeItem('checkoutDetails');
          sessionStorage.removeItem('donation');
          navigate('/');
        }, 5000);});
  }, []);

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'missing') {
    navigate('/');
    return null;
  }

  if (status === 'invalid') {
    return (
      <Container maxWidth="sm" sx={{ mt: 6 }}>
        <Card sx={{ p: 4, borderRadius: 4, boxShadow: 5 }}>
          <Typography variant="h5" color="error" fontWeight="bold" textAlign="center">
            Payment Verification Failed
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, textAlign: 'center' }}>
            We couldn’t verify your transaction. Please contact support.
          </Typography>
          <Box textAlign="center" mt={4}>
            <Button variant="outlined" color="primary" onClick={() => navigate('/')}>
              Go Back
            </Button>
          </Box>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Card sx={{ p: 4, borderRadius: 4, boxShadow: 5 }}>
        <Typography variant="h4" color="primary" fontWeight="bold" textAlign="center">
          ✅ Payment Successful
        </Typography>

        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Donation ID"
              value={details?._id || ''}
              disabled
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              value={details?.user?.name || ''}
              disabled
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              value={details?.user?.email || ''}
              disabled
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Payment ID"
              value={details?.receipt?.razorpay_payment_id || ''}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Order ID"
              value={details?.receipt?.razorpay_order_id || ''}
              disabled
            />
          </Grid>
        </Grid>

        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              sessionStorage.removeItem('checkoutDetails');
              sessionStorage.removeItem('donation');
              navigate('/');
            }}
          >
            Go to Home
          </Button>
        </Box>
      </Card>
    </Container>
  );
};

export default SuccessPage;
