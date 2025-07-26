import React, { useEffect, useState } from 'react';
import {
  Accordion, AccordionSummary, AccordionDetails,
  Typography, TextField, IconButton, Tooltip,
  Box, Grid, Avatar, Paper, CircularProgress, Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useNotifications } from '@toolpad/core';
import useCloudinaryImage from './hooks/useCloudinaryImage';
import '@fontsource/roboto';

function VerifyUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [editState, setEditState] = useState({});
  const [loading, setLoading] = useState(true);
  const [avatarFile, setAvatarFile] = useState(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [workExperience, setWorkExperience] = useState([]);
  const [education, setEducation] = useState([]);

  const notification = useNotifications();
  const { uploadImages, uploading } = useCloudinaryImage();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(`/api/v1/fuser/verify/${id}`);
        setUser(res.data.user);
        setWorkExperience(res.data.user?.workExperience || []);
        setEducation(res.data.user?.education || []);
        notification.show(res.data.message, { severity: 'info' });
      } catch (err) {
        console.error("Verification failed:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    if (id) verifyUser();
  }, [id]);

  const handleChange = (field, value) => {
    setUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUser((prev) => ({ ...prev, profileImage: ev.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleEdit = (field) => {
    setEditState((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInitialSubmit = () => setShowPasswordFields(true);

  const handleFinalSubmit = async () => {
    try {
      let uploadedImage = user.profileImage;
      if (avatarFile) {
        uploadedImage = await uploadImages(avatarFile, 'user_avatars');
      }

      // Combine address fields into a single address string for 'place'
      const address = `${user.doorNo || ''}, ${user.street || ''}, ${user.city || ''} - ${user.pincode || ''}`;

      const finalUser = {
        ...user,
        profileImage: uploadedImage,
        password,
        experience:workExperience,
        education,
        place: address // set place as the full address
      };

      await axios.post('/api/v1/register', finalUser);
      notification.show('User updated successfully', { severity: 'success' });
      navigate('/');
    } catch (error) {
      notification.show('Error submitting user data', { severity: 'error' });
    }
  };

  const requiredFields = ["name", "email", "batch", "degree", "department", "place", "father", "mother", "dob", "phone", "doorNo", "street", "city", "pincode"];
  const allFilled = user && requiredFields.every(f => user[f]?.toString().trim() !== "");

  const handleAddWork = () => setWorkExperience([...workExperience, { company: '', role: '', from: '', to: '' }]);
  const handleAddEdu = () => setEducation([...education, { institution: '', degree: '', from: '', to: '' }]);

  const updateWork = (i, field, value) => {
    const updated = [...workExperience];
    updated[i][field] = value;
    setWorkExperience(updated);
  };

  const updateEdu = (i, field, value) => {
    const updated = [...education];
    updated[i][field] = value;
    setEducation(updated);
  };

  const removeItem = (i, setter, state) => {
    const updated = [...state];
    updated.splice(i, 1);
    setter(updated);
  };

  if (loading) {
    return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>;
  }

  if (!user) {
    return <Box textAlign="center" mt={5}><Typography color="error">Verification failed or user not found.</Typography></Box>;
  }

  return (
    <Box maxWidth="700px" margin="2rem auto" fontFamily="'Roboto', sans-serif">
      <Paper elevation={3} sx={{
        padding: 4,
        borderRadius: 6,
        background: 'rgba(255,255,255,0.25)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.18)',
        fontFamily: 'Roboto, sans-serif',
      }}>
        <Box textAlign="center" mb={3}>
          <label htmlFor="avatar-upload">
            <input id="avatar-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
            <Avatar src={user.profileImage} sx={{ width: 100, height: 100, margin: "0 auto", mb: 1, cursor: 'pointer', border: '2px solid #1976d2', boxShadow: 2, borderRadius: 4 }} />
            <Typography variant="caption" color="primary" sx={{ cursor: 'pointer', fontFamily: 'Roboto, sans-serif' }}>Click to upload/change photo</Typography>
          </label>
          <Typography variant="h5" fontWeight={700} color="#222" fontFamily="Roboto, sans-serif">Welcome, {user.name}</Typography>
          <Typography variant="body2" color="text.secondary" fontFamily="Roboto, sans-serif">
            {user.verified ? "✅ Verified Account" : "⏳ Pending Verification"}
          </Typography>
        </Box>

        {/* Personal Details */}
        <Accordion defaultExpanded sx={{ mb: 2, boxShadow: 1, borderRadius: 4, background: 'rgba(255,255,255,0.35)' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography fontWeight={600}>Personal Details</Typography></AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {([
                { label: "Name", field: "name" },
                { label: "Email", field: "email", disableEdit: true },
                { label: "Batch", field: "batch" },
                { label: "Degree", field: "degree" },
                { label: "Department", field: "department" },
                { label: "Place", field: "place" },
                { label: "Father name", field: "father" },
                { label: "Mother name", field: "mother" },
                { label: "D.O/B", field: "dob" },
                { label: "Phone Number", field: "phone" },
              ]).map(({ label, field, disableEdit }) => {
                const isEditable = !user[field] || editState[field];
                return (
                  <Grid item xs={12} sm={6} key={field}>
                    <Box display="flex" alignItems="center">
                      <TextField
                        label={label}
                        fullWidth
                        value={user[field] || ""}
                        onChange={(e) => handleChange(field, e.target.value)}
                        disabled={disableEdit || (!isEditable && user[field])}
                        type={field === "dob" ? "date" : field === "phone" ? "tel" : "text"}
                        InputLabelProps={field === "dob" ? { shrink: true } : undefined}
                        sx={{ background: '#fff', borderRadius: 1 }}
                      />
                      {!disableEdit && user[field] && (
                        <Tooltip title="Edit Field">
                          <IconButton onClick={() => toggleEdit(field)} sx={{ ml: 1 }}>
                            <EditIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </AccordionDetails>
        </Accordion>

        {/* Address Details */}
        <Accordion sx={{ mb: 2, boxShadow: 1, borderRadius: 4, background: 'rgba(255,255,255,0.35)' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography fontWeight={600}>Address</Typography></AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              {([
                { label: "Door No", field: "doorNo" },
                { label: "Street/Building", field: "street" },
                { label: "City", field: "city" },
                { label: "Pincode", field: "pincode" },
              ]).map(({ label, field }) => (
                <Grid item xs={12} sm={6} key={field}>
                  <TextField
                    label={label}
                    fullWidth
                    value={user[field] || ""}
                    onChange={(e) => handleChange(field, e.target.value)}
                    sx={{ background: '#fff', borderRadius: 1 }}
                  />
                </Grid>
              ))}
            </Grid>
            <Divider sx={{ mt: 3, mb: 1 }} />
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>📍 Address Preview:</Typography>
            <Typography fontWeight={500}>
              {`${user.doorNo || ''}, ${user.street || ''}, ${user.city || ''} - ${user.pincode || ''}`}
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* Work Experience */}
        <Accordion sx={{ mb: 2, boxShadow: 1, borderRadius: 4, background: 'rgba(255,255,255,0.35)' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography fontWeight={600}>Work Experience</Typography></AccordionSummary>
          <AccordionDetails>
            {workExperience.length === 0 && (
              <Box mb={2} textAlign="center" color="text.secondary">No work experience added yet.</Box>
            )}
            {workExperience.map((item, i) => (
              <Paper key={i} elevation={2} sx={{ mb: 2, p: 2, borderRadius: 2, background: '#f1f5f9', position: 'relative' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Company" value={item.company} onChange={(e) => updateWork(i, 'company', e.target.value)} sx={{ background: '#fff', borderRadius: 1 }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Role" value={item.role} onChange={(e) => updateWork(i, 'role', e.target.value)} sx={{ background: '#fff', borderRadius: 1 }} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="From" type="month" value={item.from} onChange={(e) => updateWork(i, 'from', e.target.value)} InputLabelProps={{ shrink: true }} sx={{ background: '#fff', borderRadius: 1 }} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="To" type="month" value={item.to} onChange={(e) => updateWork(i, 'to', e.target.value)} InputLabelProps={{ shrink: true }} sx={{ background: '#fff', borderRadius: 1 }} />
                  </Grid>
                </Grid>
                <Box position="absolute" top={8} right={8}>
                  <Tooltip title="Remove">
                    <IconButton onClick={() => removeItem(i, setWorkExperience, workExperience)} color="error"><DeleteIcon /></IconButton>
                  </Tooltip>
                  <Tooltip title="Add New Work Experience">
                    <IconButton onClick={handleAddWork} color="primary"><AddIcon /></IconButton>
                  </Tooltip>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2" color="text.secondary" mt={1}>
                  <b>Preview:</b> {item.role || 'Role'} at {item.company || 'Company'} ({item.from || 'From'} – {item.to || 'To'})
                </Typography>
              </Paper>
            ))}
            {workExperience.length === 0 && (
              <Box textAlign="center">
                <IconButton onClick={handleAddWork} color="primary"><AddIcon /> Add Work</IconButton>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>

        {/* Education */}
        <Accordion sx={{ mb: 2, boxShadow: 1, borderRadius: 4, background: 'rgba(255,255,255,0.35)' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography fontWeight={600}>Education</Typography></AccordionSummary>
          <AccordionDetails>
            {education.length === 0 && (
              <Box mb={2} textAlign="center" color="text.secondary">No education added yet.</Box>
            )}
            {education.map((item, i) => (
              <Paper key={i} elevation={2} sx={{ mb: 2, p: 2, borderRadius: 2, background: '#f1f5f9', position: 'relative' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Institution" value={item.institution} onChange={(e) => updateEdu(i, 'institution', e.target.value)} sx={{ background: '#fff', borderRadius: 1 }} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Degree" value={item.degree} onChange={(e) => updateEdu(i, 'degree', e.target.value)} sx={{ background: '#fff', borderRadius: 1 }} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="From" type="month" value={item.from} onChange={(e) => updateEdu(i, 'from', e.target.value)} InputLabelProps={{ shrink: true }} sx={{ background: '#fff', borderRadius: 1 }} />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField fullWidth label="To" type="month" value={item.to} onChange={(e) => updateEdu(i, 'to', e.target.value)} InputLabelProps={{ shrink: true }} sx={{ background: '#fff', borderRadius: 1 }} />
                  </Grid>
                </Grid>
                <Box position="absolute" top={8} right={8}>
                  <Tooltip title="Remove">
                    <IconButton onClick={() => removeItem(i, setEducation, education)} color="error"><DeleteIcon /></IconButton>
                  </Tooltip>
                  <Tooltip title="Add New Education">
                    <IconButton onClick={handleAddEdu} color="primary"><AddIcon /></IconButton>
                  </Tooltip>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Typography variant="body2" color="text.secondary" mt={1}>
                  <b>Preview:</b> {item.degree || 'Degree'} at {item.institution || 'Institution'} ({item.from || 'From'} – {item.to || 'To'})
                </Typography>
              </Paper>
            ))}
            {education.length === 0 && (
              <Box textAlign="center">
                <IconButton onClick={handleAddEdu} color="primary"><AddIcon /> Add Education</IconButton>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>

        {/* Password + Submit */}
        {showPasswordFields && (
          <Box mt={3}>
            <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2, background: '#fff', borderRadius: 1 }} />
            <TextField label="Confirm Password" type="password" fullWidth value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} error={password !== confirmPassword} helperText={password !== confirmPassword ? "Passwords do not match" : ""} sx={{ background: '#fff', borderRadius: 1 }} />
          </Box>
        )}

        {allFilled && (
          <Box mt={4} textAlign="center">
            {!showPasswordFields ? (
              <button onClick={handleInitialSubmit} style={buttonStyle("#1976d2", "#64b5f6")}>Submit</button>
            ) : (
              <button disabled={password !== confirmPassword || uploading} onClick={handleFinalSubmit} style={buttonStyle("#388e3c", "#66bb6a", password !== confirmPassword || uploading)}> {uploading ? 'Uploading...' : 'Finish Verification'} </button>
            )}
          </Box>
        )}
      </Paper>
    </Box>
  );
}

const buttonStyle = (startColor, endColor, disabled = false) => ({
  padding: '12px 36px',
  background: `linear-gradient(90deg,${startColor},${endColor})`,
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  fontWeight: 700,
  fontSize: 18,
  cursor: disabled ? 'not-allowed' : 'pointer',
  opacity: disabled ? 0.7 : 1,
  boxShadow: '0 2px 8px rgba(0,0,0,0.12)'
});

export default VerifyUser;
