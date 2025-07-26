import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAuth } from '../../redux/slice/AuthSlice';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  Alert,
  Button,
} from '@mui/material';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

function UserTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useSelector(getAuth);

  useEffect(() => {
    if (auth?.user?._id) {
      axios
        .get(`/api/v1/razorpay/payment/get-transactions/${auth.user._id}`)
        .then((res) => {
          if (res.data.success) {
            setTransactions(res.data.transaction.transactions);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching transactions:', err);
          setLoading(false);
        });
    }
  }, [auth?.user?._id]);

  const exportExcel = () => {
    const userDetails = {
      Name: auth.user.name,
      Email: auth.user.email,
      Batch: auth.user.batch,
      Degree: auth.user.degree,
      Department: auth.user.department,
      Place: auth.user.place,
      Role: auth.user.role,
    };

    const userSheetData = Object.entries(userDetails).map(([label, value]) => ({
      Field: label,
      Value: value,
    }));

    const transactionSheetData = transactions.map((txn) => ({
      "Amount(INR)": `${txn.amount}`,
      OrderID: txn.orderId,
      PaymentID: txn.paymentId,
      Status: txn.status ? 'Success' : 'Failed',
      Date: new Date(txn.createdAt).toLocaleString(),
    }));

    const userSheet = XLSX.utils.json_to_sheet(userSheetData);
    const transactionSheet = XLSX.utils.json_to_sheet(transactionSheetData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, userSheet, 'User Details');
    XLSX.utils.book_append_sheet(workbook, transactionSheet, 'Transactions');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });

    saveAs(blob, 'User_Transactions.xlsx');
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (transactions?.length === 0) {
    return (
      <Box mt={4} textAlign="center">
        <Alert severity="info">No transactions found.</Alert>
      </Box>
    );
  }

  const userDetails = {
    Name: auth.user.name,
    Email: auth.user.email,
    Batch: auth.user.batch,
    Degree: auth.user.degree,
    Department: auth.user.department,
    Place: auth.user.place,
    Role: auth.user.role,
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4">User Transactions</Typography>
        <Button
          onClick={exportExcel}
          variant="contained"
          sx={{ backgroundColor: '#1976d2', color: '#fff', fontWeight: 600 }}
        >
          Export as Excel
        </Button>
      </Box>

      <Card sx={{ mb: 3, backgroundColor: '#f5f5f5' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>User Details</Typography>
          <Grid container spacing={1}>
            {Object.entries(userDetails).map(([label, value]) => (
              <Grid item xs={12} sm={6} key={label}>
                <Typography variant="body2" color="textSecondary">
                  <strong>{label}:</strong> {value}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <Typography variant="h6" gutterBottom>Payment History</Typography>

      <Box display="flex" flexDirection="column" gap={2}>
        {transactions.map((txn) => (
          <motion.div
            key={txn._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card
              sx={{
                width: '100%',
                borderLeft: txn.status ? '5px solid green' : '5px solid red',textAlign: 'left',lineHeight: 2.5,
              }}
            >
              <CardContent>
                <Typography variant="subtitle1">
                  <strong>Amount:</strong> ₹{txn.amount} {txn.currency}
                </Typography>
                <Typography variant="body2">
                  <strong>Order ID:</strong> {txn.orderId}
                </Typography>
                <Typography variant="body2">
                  <strong>Payment ID:</strong> {txn.paymentId}
                </Typography>
                <Typography variant="body2">
                  <strong>Status:</strong>{' '}
                  <span style={{ color: txn.status ? 'green' : 'red' }}>
                    {txn.status ? 'Success' : 'Failed'}
                  </span>
                </Typography>
                <Typography variant="body2">
                  <strong>Date:</strong>{' '}
                  {new Date(txn.createdAt).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}

export default UserTransactions;
