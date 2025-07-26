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

function AcademicsData({ user }) {
  const [educationList, setEducationList] = useState(user?.education || []);
  const [isEditing, setIsEditing] = useState(false);
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    from: '',
    to: '',
  });

  useEffect(()=>{
    setEducationList(user?.education||[])
  },[user])

  const handleAddEducation = () => {
    if (
      !newEducation.institution.trim() ||
      !newEducation.degree.trim() ||
      !newEducation.from ||
      !newEducation.to
    )
      return;

    const updatedList = [...educationList, newEducation];
    setEducationList(updatedList);
    setNewEducation({ institution: '', degree: '', from: '', to: '' });
    setIsEditing(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 3, alignItems: 'flex-start' }}>
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
          <Box key={index} sx={{ position: 'relative', textAlign:"left" }}>
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
              <Typography variant="subtitle1" fontWeight="bold">
                {edu.institution}
              </Typography>
              <Typography variant="body2" sx={{ mb: 0.5 }} color="text.secondary">
                {edu.degree}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(edu.from).toLocaleDateString()} - {new Date(edu.to).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>

      {/* Add New Entry */}
      {isEditing && (
        <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ mt: 4 }}>
          <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>
            Add Education
          </Typography>

          <TextField
            fullWidth
            label="Institution"
            value={newEducation.institution}
            onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Degree"
            value={newEducation.degree}
            onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
            margin="dense"
          />
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <TextField
              label="From"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={newEducation.from}
              onChange={(e) => setNewEducation({ ...newEducation, from: e.target.value })}
            />
            <TextField
              label="To"
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={newEducation.to}
              onChange={(e) => setNewEducation({ ...newEducation, to: e.target.value })}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 3 }}>
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={() => {
                setIsEditing(false);
                setNewEducation({ institution: '', degree: '', from: '', to: '' });
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleAddEducation}
            >
              Save
            </Button>
          </Box>
        </Box>
      )}

      {!isEditing && (
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
