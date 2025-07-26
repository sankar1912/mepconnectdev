import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Card,
  CardContent,
  Grid,
  Divider,
  Chip,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  TextField,
  useTheme,
  InputAdornment,
  Zoom,
  Paper,
  IconButton,
} from "@mui/material";
import {
  WorkOutline,
  LocationOn,
  Business,
  AttachMoney,
  EmojiObjects,
  Email,
  Verified,
  Place,
  UploadFile,
  HighlightOff,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addJobApllication, getAllJobsPost, getJobById } from "../redux/slice/jobsSlice";
import { getAuth } from "../redux/slice/AuthSlice";
import useCloudinaryFile from "./hooks/useCloudinaryFile";


function JobApplication() {
    const { uploadFiles, uploading, fileUrls} = useCloudinaryFile();
  const { _id } = useParams();
  const job = useSelector(getAllJobsPost);
  const { auth } = useSelector(getAuth);
  const { user } = auth;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const [skillInput, setSkillInput] = useState("");
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    degree: user?.degree || "",
    department: user?.department || "",
    batch: user?.batch || "",
    place: user?.place || "",
    experience: "",
    skills: [],
    resume: null,
    additionalInfo: "",
  });

  useEffect(() => {
    dispatch(getJobById(_id));
  }, [dispatch, _id]);

  if (!job || !job.title)
    return <Typography>Loading job details...</Typography>;

  const handleNext = () => {
    if (
      (activeStep === 0 &&
        formData.name &&
        formData.email &&
        formData.degree &&
        formData.department &&
        formData.batch &&
        formData.place &&
        formData.experience &&
        formData.skills.length > 0) ||
      (activeStep === 1 && formData.resume && formData.additionalInfo)
    ) {
      setActiveStep((prev) => prev + 1);
    } else {
      alert("Please fill all required fields.");
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      e.preventDefault();
      if (!formData.skills.includes(skillInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          skills: [...prev.skills, skillInput.trim()],
        }));
        setSkillInput("");
      }
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = async () => {
    if (!formData.resume) {
      alert("Please upload a resume before submitting.");
      return;
    }

    try {
      const resumeUrl = await uploadFiles(formData.resume, "resumes");
      if (!resumeUrl) {
        alert("Resume upload failed. Please try again.");
        return;
      }
      const submissionData = {
        ...formData,
        resume: resumeUrl,
        _id:job._id
      };
      dispatch(addJobApllication(submissionData))
      //console.log("Submitting Application with Cloudinary URL:", submissionData);
      navigate("/jobs");
  
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("An error occurred while submitting the application.");
    }
  };
  

  const renderTextField = (label, name, detail, disabled = false) => (
    <TextField
      label={label}
      name={name}
      value={detail}
      onChange={handleChange}
      fullWidth
      required
      disabled={disabled}
      sx={{
        marginTop: "15px",
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
        },
      }}
      InputProps={{
        startAdornment:
          name === "email" ? (
            <InputAdornment position="start">
              <Email color="action" />
            </InputAdornment>
          ) : name === "place" ? (
            <InputAdornment position="start">
              <Place color="action" />
            </InputAdornment>
          ) : null,
      }}
    />
  );

  const steps = [
    {
      label: "Personal Information",
      content: (
        <Zoom in>
          <Grid container spacing={2}>
            {renderTextField("Full Name", "name", user?.name, true)}
            {renderTextField("Email", "email", user.email, true)}
            {renderTextField("Degree", "degree", user.degree, true)}
            {renderTextField("Department", "department", user.department, true)}
            {renderTextField("Batch", "batch", user.batch, true)}
            {renderTextField("Place", "place", user.place, true)}

            <Grid item xs={12} mt={2}>
              <TextField
                label="Years of Experience"
                name="experience"
                type="number"
                value={formData.experience}
                onChange={handleChange}
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} mt={2}>
              <TextField
                label="Enter a Skill and press Enter"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
              <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
                {formData.skills.map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill}
                    onDelete={() => handleRemoveSkill(skill)}
                    color="primary"
                    deleteIcon={<HighlightOff />}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Zoom>
      ),
    },
    {
      label: "Resume & Additional Info",
      content: (
        <Zoom in>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<UploadFile />}
              >
                Upload Resume (PDF or Image)
                <input
                  type="file"
                  name="resume"
                  accept="application/pdf,image/*"
                  hidden
                  onChange={handleChange}
                  required
                />
              </Button>
              {formData.resume && (
                <Box mt={2}>
                  <Typography variant="body2" mb={1}>
                    Preview:
                  </Typography>
                  {formData.resume.type === "application/pdf" ? (
                    <iframe
                      src={URL.createObjectURL(formData.resume)}
                      width="100%"
                      height="400px"
                      title="Resume Preview"
                    />
                  ) : (
                    <img
                      src={URL.createObjectURL(formData.resume)}
                      alt="Resume Preview"
                      style={{ maxWidth: "100%", borderRadius: 12 }}
                    />
                  )}
                </Box>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="additionalInfo"
                label="Why do you want this job?"
                multiline
                rows={4}
                value={formData.additionalInfo}
                onChange={handleChange}
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "12px",
                  },
                }}
              />
            </Grid>
          </Grid>
        </Zoom>
      ),
    },
    {
      label: "Review & Submit",
      content: (
        <Zoom in>
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Please review your information before submitting:
            </Typography>
            <Paper
              variant="outlined"
              sx={{ p: 2, borderRadius: "12px", textAlign: "left" }}
            >
              <Grid container spacing={2}>
                {Object.entries(formData).map(([key, value]) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <TextField
                      label={
                        key === "resume"
                          ? "Resume File"
                          : key === "skills"
                          ? "Skills"
                          : key
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())
                      }
                      value={
                        key === "resume"
                          ? value?.name || "Not uploaded"
                          : Array.isArray(value)
                          ? value.join(", ")
                          : value
                      }
                      fullWidth
                      disabled
                      multiline={key === "additionalInfo" || key === "skills"}
                      rows={
                        key === "additionalInfo" || key === "skills" ? 3 : 1
                      }
                      InputProps={{
                        sx: {
                          borderRadius: "12px",
                          backgroundColor: "#f9f9f9",
                        },
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "12px",
                        },
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Box>
        </Zoom>
      ),
    },
  ];

  return (
    <Box maxWidth="1000px" mx="auto" p={3}>
      <Card elevation={6} sx={{ borderRadius: "16px" }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Avatar
                variant="rounded"
                src={job.imageUrl}
                alt={job.company}
                sx={{ width: "100%", height: 140, borderRadius: "12px" }}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <Typography variant="h4" fontWeight="bold">
                {job.title}
              </Typography>
              <Box display="flex" gap={1} mt={1}>
                <Business fontSize="small" color="primary" />
                <Typography variant="body2">{job.company}</Typography>
              </Box>
              <Box display="flex" gap={1}>
                <LocationOn fontSize="small" color="info" />
                <Typography variant="body2">{job.location}</Typography>
              </Box>
              <Box display="flex" gap={1}>
                <Verified
                  color={job.verified ? "success" : "disabled"}
                  fontSize="small"
                />
                <Typography variant="body2">
                  {job.verified ? "Verified" : "Not Verified"}
                </Typography>
              </Box>
              <Box mt={1} display="flex" gap={1} flexWrap="wrap">
                <Chip icon={<WorkOutline />} label={job.workType} />
                <Chip label={job.workMode} />
                <Chip icon={<AttachMoney />} label={`₹${job.salary}`} />
                <Chip
                  icon={<EmojiObjects />}
                  label={job.experienceLevel || `Exp: ${job.experience}`}
                />
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6">Job Description</Typography>
          <Typography variant="body1" color="text.secondary">
            {job.description}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6">Apply for this job</Typography>
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            sx={{ mt: 5 }}
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  {step.content}
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      onClick={
                        index === steps.length - 1 ? handleSubmit : handleNext
                      }
                      sx={{ mr: 1 }}
                      disabled={uploading}
                    >
                      {index === steps.length - 1 ? "Submit" : "Next"}
                    </Button>
                    {index > 0 && (
                      <Button variant="text" onClick={handleBack}>
                        Back
                      </Button>
                    )}
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </CardContent>
      </Card>
    </Box>
  );
}

export default JobApplication;
