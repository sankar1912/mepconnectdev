import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Modal,
  TextField,
  Typography,
  Snackbar,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useSelector } from "react-redux";
import { getAuth } from "../../features/users/AuthSlice";
import axios from "axios";
import logo from "../../img/mepco.png";
import { useNavigate } from "react-router-dom";
import { useNotifications } from "@toolpad/core";

const CheckOut = () => {
  const [donation, setDonation] = useState(null);
  const [amount, setAmount] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [feeOption, setFeeOption] = useState("");
  const { auth } = useSelector(getAuth);
  const navigate = useNavigate();
  const [status, setStatus] = useState(false);
  const notification = useNotifications();
  useEffect(() => {
    const stored = sessionStorage.getItem("donation");
    if (stored) {
      const parsed = JSON.parse(stored);
      setDonation(parsed);
    }
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const storeTransaction = async (response,status) => {
    const body = {
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
      currency: "INR",
      status: status,
      amount: amount,
      user_id: auth.user?._id,
      donation_id: donation._id,
    };
    const res = await axios.post(
      "/api/v1/razorpay/payment/store-transaction",
      body
    );

    notification.show(res.data.message, {
      severity: "info",
      autoHideDuration: 3000,
    });
  };

const proceedToPayment = async () => {
  if (!amount || !feeOption) return;

  const actualAmount =
    feeOption === "include" ? Math.round(amount * 1.03) : amount;

  const res = await loadRazorpayScript();
  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  try {
    const response = await axios.post("/api/v1/razorpay/payment/create-order", {
      amount: actualAmount,
      email: auth.user?.email,
      donationId: donation._id,
    });

    const { order } = response.data;

    const options = {
      key: import.meta.env.PUBLIC_TEST_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: "INR",
      name: "Mepco Schlenk Engineering College",
      description: donation.campaignName,
      image: logo,
      order_id: order.id,
      prefill: {
        name: auth.user?.name,
        email: auth.user?.email,
      },
      notes: {
        donationId: donation._id,
        platformFee: feeOption,
      },
      handler: async function (response) {
        await storeTransaction(response, true);
        sessionStorage.setItem(
          "checkoutDetails",
          JSON.stringify({
            id: donation._id,
            user: auth.user,
            receipt: {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              currency: "INR",
              status: true,
              amount: amount,
              user_id: auth.user?._id,
              donation_id: donation._id,
            },
          })
        );
        navigate("/payment/redirect/success");
      },
      theme: {
        color: "black",
      },
    };

    const rzp = new window.Razorpay(options);

rzp.on("payment.failed", async function (response) {
  const errorMeta = response.error.metadata;
  console.log(response)
  await storeTransaction(
    {
      razorpay_order_id: errorMeta.order_id,
      razorpay_payment_id: errorMeta.payment_id,
      razorpay_signature: "N/A", 
      currency: "INR",
      status: false,
      amount: amount,
      user_id: auth.user?._id,
      donation_id: donation._id,
    },
    false
  );

  notification.show("Payment failed. Please try again.", {
    severity: "error",
    autoHideDuration: 4000,
  });

  navigate("/payment/redirect/failed");
});


    rzp.open();
    setOpenModal(false);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
  }
};


  if (!donation)
    return (<Typography variant="h6">Loading donation details...</Typography>);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card sx={{ borderRadius: 4, boxShadow: 4 }}>
        <CardContent>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Summary
          </Typography>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Campaign Name"
                value={donation.campaignName}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Department"
                value={donation.department}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={donation.description}
                fullWidth
                multiline
                minRows={2}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Goal Amount"
                value={`₹ ${donation.goalAmount}`}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contact"
                value={donation.contact}
                fullWidth
                InputProps={{ readOnly: true }}
              />
            </Grid>
            {amount > 0 && (
              <Grid item xs={12}>
                <TextField
                  label="Your Donation Amount"
                  value={`₹ ${amount}`}
                  fullWidth
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            )}
          </Grid>

          <TextField
            type="number"
            label="Enter Donation Amount (₹)"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            sx={{ mt: 3 }}
            fullWidth
            InputProps={{
              inputProps: { min: 1 },
            }}
          />

          {amount > 0 && (
            <FormControl sx={{ mt: 3 }} fullWidth>
              <FormLabel>Platform Fee</FormLabel>
              <RadioGroup
                value={feeOption}
                onChange={(e) => {
                  const value = e.target.value;
                  setFeeOption(value);

                  if (value === "include") {
                    const increased = Math.round(amount * 1.03);
                    setAmount(increased);
                  } else {
                    setAmount(amount);
                  }
                }}
              >
                <FormControlLabel
                  value="deduct"
                  control={<Radio />}
                  label="Deduct platform fee from my donation"
                />
                <FormControlLabel
                  value="include"
                  control={<Radio />}
                  label="Include 3% platform fee additionally"
                />
              </RadioGroup>
            </FormControl>
          )}

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3, borderRadius: 10, height: 50 }}
            onClick={() => setOpenModal(true)}
            disabled={!(amount > 0 && feeOption)}
          >
            Continue
          </Button>
        </CardContent>
      </Card>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 420,
            bgcolor: "white",
            border: "1px solid rgb(0, 0, 0)",
            boxShadow: 24,
            p: 4,
            borderRadius: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Thank You!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            You're just one step away from making an impact.
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            Your contribution of{" "}
            <strong>
              ₹{feeOption === "include" ? Math.round(amount * 1.03) : amount}
            </strong>{" "}
            will help us achieve our goal.
          </Typography>
          <Button variant="contained" fullWidth onClick={proceedToPayment}>
            Donate
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Copied to clipboard!"
      />
    </Container>
  );
};

export default CheckOut;
