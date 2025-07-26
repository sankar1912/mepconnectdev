import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Avatar,
  Paper,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { sendDonation } from "../redux/slice/donationsSlice";
import { Grid } from "@mui/system";
import { useNotifications } from "@toolpad/core";
import useCloudinaryImage from "./hooks/useCloudinaryImage";

function CreateDonations({ open, handleClose }) {
  const today = new Date().toISOString().split("T")[0];
  const [activeStep, setActiveStep] = useState(0);
  const [campaignName, setCampaignName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [startDate] = useState(today);
  const [endDate, setEndDate] = useState("");
  const [durationDays, setDurationDays] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [govtIdFile, setGovtIdFile] = useState(null);
  const [govtIdPreview, setGovtIdPreview] = useState(null);

  const notification = useNotifications();
  const dispatch = useDispatch();
  const { uploadImages } = useCloudinaryImage();

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleCampaignImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGovtIdSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGovtIdFile(file);
      setGovtIdPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !campaignName ||
      !description ||
      !contact ||
      goalAmount <= 0 ||
      !aadharNumber ||
      !panNumber ||
      !imageFile ||
      !govtIdFile
    ) {
      notification.show("Please fill in all fields and upload required documents.", {
        autoHideDuration: 3000,
        severity: "error",
      });
      return;
    }

    try {
      const imageUrl = await uploadImages(imageFile, "donations");
      const govtIdUrl = await uploadImages(govtIdFile, "donations");

      if (!imageUrl || !govtIdUrl) {
        notification.show("Image upload failed. Please try again.", {
          autoHideDuration: 3000,
          severity: "error",
        });
        return;
      }

      const donationData = {
        campaignName,
        goalAmount,
        description,
        contact,
        aadhar: aadharNumber,
        pan: panNumber,
        startDate,
        endDate,
        image: imageUrl,
        govtId: govtIdUrl,
      };

      dispatch(sendDonation(donationData));
      notification.show("Campaign created successfully!", {
        autoHideDuration: 3000,
        severity: "success",
      });

      handleClose();
    } catch (error) {
      console.error(error);
      notification.show("An error occurred during submission.", {
        autoHideDuration: 3000,
        severity: "error",
      });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Create a Donation Campaign</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} alternativeLabel>
          <Step>
            <StepLabel>Campaign Details</StepLabel>
          </Step>
          <Step>
            <StepLabel>Personal Verification</StepLabel>
          </Step>
          <Step>
            <StepLabel>Upload Documents</StepLabel>
          </Step>
        </Stepper>

        {activeStep === 0 && (
          <>
            <TextField
              fullWidth
              label="Campaign Name"
              variant="outlined"
              margin="normal"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Goal Amount ($)"
              type="number"
              variant="outlined"
              margin="normal"
              value={goalAmount}
              onChange={(e) => setGoalAmount(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </>
        )}

        {activeStep === 1 && (
          <>
            <TextField
              fullWidth
              label="Contact Number"
              variant="outlined"
              margin="normal"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Aadhar Number"
              variant="outlined"
              margin="normal"
              value={aadharNumber}
              onChange={(e) => setAadharNumber(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="PAN Number"
              variant="outlined"
              margin="normal"
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value)}
              required
            />
          </>
        )}

        {activeStep === 2 && (
          <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" fontWeight="bold" textAlign="center" gutterBottom>
              Upload Campaign & ID Proof
            </Typography>

            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography fontWeight="medium" gutterBottom>
                  Choose Campaign Image
                </Typography>
                <Button fullWidth variant="contained" component="label">
                  Choose File
                  <input type="file" accept="image/*" hidden onChange={handleCampaignImageSelect} />
                </Button>
                {imagePreview && (
                  <Box mt={2} display="flex" justifyContent="center">
                    <Avatar
                      src={imagePreview}
                      variant="rounded"
                      sx={{ width: "100%", height: 200, borderRadius: 2, objectFit: "cover" }}
                    />
                  </Box>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography fontWeight="medium" gutterBottom>
                  Upload Govt ID Proof with Face
                </Typography>
                <Button fullWidth variant="contained" color="secondary" component="label">
                  Upload File
                  <input type="file" accept="image/*" hidden onChange={handleGovtIdSelect} />
                </Button>
                {govtIdPreview && (
                  <Box mt={2} display="flex" justifyContent="center">
                    <Avatar
                      src={govtIdPreview}
                      variant="rounded"
                      sx={{ width: "100%", height: 200, borderRadius: 2, objectFit: "cover" }}
                    />
                  </Box>
                )}
              </Grid>
            </Grid>
          </Paper>
        )}
      </DialogContent>

      <DialogActions>
        {activeStep > 0 && (
          <Button onClick={handleBack} color="secondary">
            Back
          </Button>
        )}
        {activeStep < 2 && (
          <Button onClick={handleNext} variant="contained" color="primary">
            Next
          </Button>
        )}
        {activeStep === 2 && (
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default CreateDonations;
