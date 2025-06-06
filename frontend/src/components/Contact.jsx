import React, { useState } from "react";
import {
  Container,
  Typography,
  MenuItem,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Input,
} from "@mui/material";
import { Event, School, VolunteerActivism, AttachFile } from "@mui/icons-material";

const requestOptions = [
  { label: "Conduct Event", icon: <Event />, value: "event" },
  { label: "Host Workshop", icon: <School />, value: "workshop" },
  { label: "Donation Campaign", icon: <VolunteerActivism />, value: "donation" },
];

function ContactUs() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    requestType: "",
    name: "",
    email: "",
    phone: "",
    details: "",
    date: "",
    duration: "",
    budget: "",
    proof: null,
    notes: "",
  });

  const handleNext = () => {
    if (!validateStep()) return;
    setStep((prev) => prev + 1);
  };

  const handleBack = () => setStep((prev) => prev - 1);
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFormData({ ...formData, proof: e.target.files[0] });

  const validateStep = () => {
    const requiredFields = {
      0: ["requestType"],
      1: ["name", "email", "phone"],
      2: formData.requestType === "donation" ? ["details", "budget", "duration"] : ["details", "date", "duration"],
      3: [],
    };

    for (const field of requiredFields[step]) {
      if (!formData[field].trim()) {
        alert(`Please fill in the required field: ${field}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    console.log("Form Submitted: ", formData);
    alert("Form Submitted! Check console for data.");
  };

  const getStepContent = () => {
    switch (step) {
      case 0:
        return (
          <TextField
            select
            fullWidth
            required
            label="Select Request Type"
            name="requestType"
            value={formData.requestType}
            onChange={handleChange}
          >
            {requestOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.icon} {option.label}
              </MenuItem>
            ))}
          </TextField>
        );
      case 1:
        return (
          <>
            <TextField fullWidth required label="Your Name" name="name" value={formData.name} onChange={handleChange} margin="normal" />
            <TextField fullWidth required label="Your Email" type="email" name="email" value={formData.email} onChange={handleChange} margin="normal" />
            <TextField fullWidth required label="Phone Number" type="tel" name="phone" value={formData.phone} onChange={handleChange} margin="normal" />
          </>
        );
      case 2:
        return (
          <>
            <TextField fullWidth required label="Event/Workshop Details" name="details" value={formData.details} onChange={handleChange} margin="normal" multiline rows={3} />
            {formData.requestType === "event" || formData.requestType === "workshop" ? (
              <>
                <TextField fullWidth required label="Preferred Date" type="date" name="date" value={formData.date} onChange={handleChange} margin="normal" InputLabelProps={{ shrink: true }} />
                <TextField fullWidth required label="Duration (Days)" name="duration" type="number" value={formData.duration} onChange={handleChange} margin="normal" />
              </>
            ) : null}
            {formData.requestType === "donation" ? (
              <>
                <TextField fullWidth required label="Expected Budget (₹)" type="number" name="budget" value={formData.budget} onChange={handleChange} margin="normal" />
                <TextField fullWidth required label="Campaign Duration (Days)" name="duration" type="number" value={formData.duration} onChange={handleChange} margin="normal" />
              </>
            ) : null}
          </>
        );
      case 3:
        return (
          <>
            <Typography variant="subtitle1">Upload Proof/Supporting Document</Typography>
            <Input type="file" required onChange={handleFileChange} sx={{ mt: 1 }} />
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              (Attach any relevant document, proposal, or image)
            </Typography>
            <TextField fullWidth label="Important Notes (if any)" name="notes" value={formData.notes} onChange={handleChange} margin="normal" multiline rows={2} />
          </>
        );
      default:
        return <Typography variant="h6">Review & Submit</Typography>;
    }
  };

  return (
    <Container  sx={{ mt: 4 }}>
      <Card elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Contact Us
          </Typography>
          <Stepper activeStep={step} alternativeLabel>
            <Step><StepLabel>Request Type</StepLabel></Step>
            <Step><StepLabel>Personal Info</StepLabel></Step>
            <Step><StepLabel>Details</StepLabel></Step>
            <Step><StepLabel>Proof & Notes</StepLabel></Step>
            <Step><StepLabel>Submit</StepLabel></Step>
          </Stepper>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12}>{getStepContent()}</Grid>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "space-between" }}>
              {step > 0 && <Button onClick={handleBack} variant="outlined">Back</Button>}
              {step < 4 ? (
                <Button onClick={handleNext} variant="contained">Next</Button>
              ) : (
                <Button variant="contained" color="success" onClick={handleSubmit}>Submit</Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ContactUs;
