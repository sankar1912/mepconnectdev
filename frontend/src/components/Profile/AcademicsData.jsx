import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Paper,
  Button,
  Avatar,
  Stack,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';

function AcademicsData({ user }) {
  const [educationList, setEducationList] = useState(user?.education || []);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEducationList(user?.education || []);
  }, [user]);

  // Handle field changes for both existing and new entries
  const handleChange = (index, field, value) => {
    const updatedList = [...educationList];
    updatedList[index][field] = value;
    setEducationList(updatedList);
  };

  // Add a new empty row
  const handleAddEducation = () => {
    setEducationList([
      ...educationList,
      { institution: '', degree: '', from: '', to: '' },
    ]);
  };

  // Remove an education row
  const handleRemoveEducation = (index) => {
    const updatedList = educationList.filter((_, i) => i !== index);
    setEducationList(updatedList);
  };

  // Save the data
  const handleSave = () => {
    console.log('Updated Education List:', educationList);
    setIsEditing(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight={600}>
          Education
        </Typography>
        <IconButton onClick={() => setIsEditing(!isEditing)}>
          <EditIcon />
        </IconButton>
      </Box>

      <Stack spacing={4} sx={{ borderLeft: '3px solid #1976d2', pl: 3 }}>
        {educationList.map((edu, index) => (
          <Box key={index} sx={{ position: 'relative', textAlign: 'left' }}>
            <Avatar
              sx={{
                bgcolor: '#1976d2',
                position: 'absolute',
                left: '-36px',
                top: 0,
                width: 24,
                height: 24,
              }}
            >
              <SchoolIcon sx={{ fontSize: 16 }} />
            </Avatar>

            <Box
              sx={{
                p: 2,
                backgroundColor: '#f9f9f9',
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              {isEditing ? (
                <>
                  <TextField
                    fullWidth
                    label="Institution"
                    value={edu.institution}
                    onChange={(e) => handleChange(index, 'institution', e.target.value)}
                    margin="dense"
                  />
                  <TextField
                    fullWidth
                    label="Degree"
                    value={edu.degree}
                    onChange={(e) => handleChange(index, 'degree', e.target.value)}
                    margin="dense"
                  />
                  <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                    <TextField
                      label="From"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      value={edu.from}
                      onChange={(e) => handleChange(index, 'from', e.target.value)}
                    />
                    <TextField
                      label="To"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      value={edu.to}
                      onChange={(e) => handleChange(index, 'to', e.target.value)}
                    />
                  </Box>
                  <Button
                    color="error"
                    startIcon={<DeleteIcon />}
                    sx={{ mt: 1 }}
                    onClick={() => handleRemoveEducation(index)}
                  >
                    Remove
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {edu.institution}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 0.5 }} color="text.secondary">
                    {edu.degree}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(edu.from).toLocaleDateString()} - {new Date(edu.to).toLocaleDateString()}
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        ))}
      </Stack>

      {isEditing ? (
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button startIcon={<AddIcon />} variant="outlined" onClick={handleAddEducation}>
            Add Education
          </Button>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      ) : (
        <Button
          startIcon={<AddIcon />}
          variant="text"
          sx={{ mt: 3 }}
          onClick={() => setIsEditing(true)}
        >
          Add Education
        </Button>
      )}
    </Paper>
  );
}

export default AcademicsData;
