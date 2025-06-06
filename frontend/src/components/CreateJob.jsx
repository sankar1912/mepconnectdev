import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stepper,
  Step,
  StepLabel,
  TextField,
  MenuItem,
  Typography,
  CardMedia,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import {
  Work as WorkIcon,
  Business as BusinessIcon,
  Assignment as AssignmentIcon,
  School as SchoolIcon,
  AttachFile as AttachFileIcon,
  LocationOn as LocationOnIcon,
  Image as ImageIcon,
} from "@mui/icons-material";
import useCloudinaryImage from "./hooks/useCloudinaryImage";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../features/users/AuthSlice";
import { registerJobs } from "../features/feeds/jobsSlice";

const steps = [
  { label: "Job Details", icon: <WorkIcon /> },
  { label: "Company Details", icon: <BusinessIcon /> },
  { label: "Role Details", icon: <AssignmentIcon /> },
  { label: "Experience Details", icon: <SchoolIcon /> },
  { label: "Location", icon: <LocationOnIcon /> },
  { label: "Proof Upload", icon: <AttachFileIcon /> },
  { label: "Image Upload", icon: <ImageIcon /> },
  { label: "Preview", icon: <AssignmentIcon /> },
];

const workTypes = ["Full-Time", "Part-Time", "Internship", "Contract"];
const workModes = ["On-site", "Remote", "Hybrid"];
const experienceLevels = ["Entry level", "Mid-Senior level", "Director", "Executive"];

const CreateJob = ({ open, handleClose }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    company: "",
    industry: "",
    workType: "",
    workMode: "",
    salary: "",
    experience: "",
    experienceLevel: "",
    location: "",
    proof: null,
    image: null,
    proofPreview: "",
    imagePreview: "",
  });

  const [place, setPlace] = useState("");
  const [placeSuggestions, setPlaceSuggestions] = useState([]);

  const dispatch = useDispatch();
  const { uploadImages, uploading } = useCloudinaryImage();
  const { auth } = useSelector(getAuth);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setJobData((prev) => ({
          ...prev,
          [name]: file,
          [`${name}Preview`]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchPlaces = async (query) => {
    if (query.length < 3) {
      setPlaceSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      const data = await response.json();
      setPlaceSuggestions(data.map((place) => place.display_name));
    } catch (error) {
      console.error("Error fetching place suggestions:", error);
    }
  };

  const handlePlaceChange = (e) => {
    const value = e.target.value;
    setPlace(value);
    setJobData({ ...jobData, location: value });
    fetchPlaces(value);
  };

  const handleSelectPlace = (selectedPlace) => {
    setPlace(selectedPlace);
    setJobData({ ...jobData, location: selectedPlace });
    setPlaceSuggestions([]);
  };

  const handleSubmit = async () => {
    try {
      let proofUrl = null;
      let imageUrl = null;

      if (jobData.proof) {
        proofUrl = await uploadImages(jobData.proof, `jobapplication/proof/${auth.user.email}`);
      }
      if (jobData.image) {
        imageUrl = await uploadImages(jobData.image, `jobapplication/offer/${auth.user.email}`);
      }
      const finalJobData = {
        ...jobData,
        proofUrl,
        imageUrl,
        proofPreview: undefined,
        imagePreview: undefined,
        _id: auth.user._id,
      };
      dispatch(registerJobs(finalJobData));
      console.log("Final Job Data Submitted:", { job: finalJobData });
      handleClose();
    } catch (error) {
      console.error("Failed to submit job data:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" PaperProps={{ sx: { borderRadius: "20px" } }}>
      <DialogTitle>Create Job Vacancy</DialogTitle>
      <DialogContent>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                StepIconComponent={() =>
                  React.cloneElement(step.icon, {
                    color: activeStep === index ? "primary" : "action",
                  })
                }
              >
                {step.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box mt={3} p={2} sx={{ borderRadius: 3, bgcolor: "#f9f9f9" }}>
          {/* Step Content */}
          {activeStep === 0 && (
            <>
              <TextField
                fullWidth
                label="Job Title"
                name="title"
                value={jobData.title}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Job Description"
                name="description"
                value={jobData.description}
                onChange={handleChange}
              />
            </>
          )}

          {activeStep === 1 && (
            <>
              <TextField
                fullWidth
                label="Company Name"
                name="company"
                value={jobData.company}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Industry"
                name="industry"
                value={jobData.industry}
                onChange={handleChange}
              />
            </>
          )}

          {activeStep === 2 && (
            <>
              <TextField
                select
                fullWidth
                label="Work Type"
                name="workType"
                value={jobData.workType}
                onChange={handleChange}
                sx={{ mb: 2 }}
              >
                {workTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                fullWidth
                label="Work Mode"
                name="workMode"
                value={jobData.workMode}
                onChange={handleChange}
              >
                {workModes.map((mode) => (
                  <MenuItem key={mode} value={mode}>
                    {mode}
                  </MenuItem>
                ))}
              </TextField>
            </>
          )}

          {activeStep === 3 && (
            <>
              <TextField
                fullWidth
                label="Salary (Annual)"
                name="salary"
                value={jobData.salary}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Experience (Years)"
                name="experience"
                value={jobData.experience}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />
              <TextField
                select
                fullWidth
                label="Experience Level"
                name="experienceLevel"
                value={jobData.experienceLevel}
                onChange={handleChange}
              >
                {experienceLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </TextField>
            </>
          )}

          {activeStep === 4 && (
            <Box position="relative">
              <TextField
                fullWidth
                label="Job Location"
                name="location"
                value={place}
                onChange={handlePlaceChange}
                autoComplete="off"
              />
              {placeSuggestions.length > 0 && (
                <List
                  sx={{
                    position: "absolute",
                    top: "100%",
                    zIndex:10,
                    width: "100%",
                    bgcolor: "white",
                    boxShadow: 3,
                  }}
                >
                  {placeSuggestions.map((suggestion, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton onClick={() => handleSelectPlace(suggestion)}>
                        <ListItemText primary={suggestion} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          )}

          {activeStep === 5 && (
            <Box>
              <Typography variant="body1" gutterBottom>
                Upload Government-Issued Proof
              </Typography>
              <Button
                variant="outlined"
                component="label"
                sx={{ borderRadius: 5, mb: 2 }}
                startIcon={<AttachFileIcon />}
              >
                Upload Proof
                <input hidden type="file" name="proof" onChange={handleFileChange} />
              </Button>
              {jobData.proofPreview && (
                <Typography variant="body2">{jobData.proof.name}</Typography>
              )}
            </Box>
          )}

          {activeStep === 6 && (
            <Box>
              <Typography variant="body1" gutterBottom>
                Upload Company Logo or Job Image
              </Typography>
              <Button
                variant="outlined"
                component="label"
                sx={{ borderRadius: 5, mb: 2 }}
                startIcon={<ImageIcon />}
              >
                Upload Image
                <input hidden type="file" name="image" accept="image/*" onChange={handleFileChange} />
              </Button>
              {jobData.imagePreview && (
                <Box
                  component="img"
                  src={jobData.imagePreview}
                  alt="Preview"
                  sx={{ width: "100%", maxHeight: 200, objectFit: "contain", borderRadius: 2 }}
                />
              )}
            </Box>
          )}

          {activeStep === 7 && (
            <Card variant="outlined" sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Preview Job Post
                </Typography>
                <Typography><strong>Title:</strong> {jobData.title}</Typography>
                <Typography><strong>Description:</strong> {jobData.description}</Typography>
                <Typography><strong>Company:</strong> {jobData.company}</Typography>
                <Typography><strong>Industry:</strong> {jobData.industry}</Typography>
                <Typography><strong>Work Type:</strong> {jobData.workType}</Typography>
                <Typography><strong>Work Mode:</strong> {jobData.workMode}</Typography>
                <Typography><strong>Salary:</strong> ₹{jobData.salary}</Typography>
                <Typography><strong>Experience:</strong> {jobData.experience} years</Typography>
                <Typography><strong>Level:</strong> {jobData.experienceLevel}</Typography>
                <Typography><strong>Location:</strong> {jobData.location}</Typography>
                <Typography><strong>Proof File:</strong> {jobData.proof?.name}</Typography>
                {jobData.imagePreview && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={jobData.imagePreview}
                    alt="Job Visual"
                    sx={{ mt: 2 }}
                  />
                )}
              </CardContent>
            </Card>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        {activeStep === steps.length - 1 ? (
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={uploading}>
            {uploading ? "Uploading..." : "Submit"}
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default CreateJob;
