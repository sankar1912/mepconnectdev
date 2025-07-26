import React, { useState } from 'react';
import {
  Box, Typography, Paper, IconButton, TextField, Divider, Tooltip
} from '@mui/material';
import { motion } from 'framer-motion';
import { Edit, Save, Work } from '@mui/icons-material';

function ExperienceData({ user }) {
  const [experienceList, setExperienceList] = useState(user?.experience || []);
  const [editIndex, setEditIndex] = useState(null); // which experience block is in edit mode

  const handleChange = (index, field, value) => {
    const updated = [...experienceList];
    updated[index][field] = value;
    setExperienceList(updated);
  };

  const renderField = (index, field, label) => {
    const value = experienceList[index][field] || '';
    const isEditing = index === editIndex;

    return (
      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
        <Typography variant="subtitle2" sx={{ minWidth: 110 }}>{label}:</Typography>
        {isEditing ? (
          <TextField
            value={value}
            onChange={(e) => handleChange(index, field, e.target.value)}
            size="small"
            fullWidth
          />
        ) : (
          <Typography variant="body2" color="text.secondary">{value || '—'}</Typography>
        )}
      </Box>
    );
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <Paper sx={{
        p: 3,
        borderRadius: 4,
        background: 'rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.18)',
        fontFamily: 'Roboto, sans-serif'
      }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
          Experience
        </Typography>

        {experienceList.length > 0 ? (
          <Box>
            {experienceList.map((exp, index) => (
              <Box key={index} sx={{ pl: 2, position: 'relative', mb: 4 }}>
                {/* Vertical line */}
                <Box sx={{
                  position: 'absolute',
                  left: 6,
                  top: 0,
                  bottom: 0,
                  width: 2,
                  backgroundColor: '#90caf9',
                }} />
                {/* Dot */}
                <Box sx={{
                  width: 14,
                  height: 14,
                  backgroundColor: '#1976d2',
                  borderRadius: '50%',
                  position: 'absolute',
                  left: 0,
                  top: 8,
                }} />

                <Box sx={{
                  ml: 4,
                  background: '#f9fafc',
                  borderRadius: 3,
                  p: 2,
                  boxShadow: 1,
                  position: 'relative',
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      <Work sx={{ verticalAlign: 'middle', mr: 1 }} />
                      {exp.title || 'Job Title'}
                    </Typography>
                    <Tooltip title={editIndex === index ? "Save" : "Edit"}>
                      <IconButton
                        size="small"
                        onClick={() => setEditIndex(editIndex === index ? null : index)}
                      >
                        {editIndex === index ? <Save /> : <Edit />}
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Divider sx={{ my: 1 }} />
                  {renderField(index, 'company', 'Company')}
                  {renderField(index, 'role', 'Role')}
                  {renderField(index, 'from', 'Start Date')}
                  {renderField(index, 'to', 'End Date')}
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            No work experience added yet.
          </Typography>
        )}
      </Paper>
    </motion.div>
  );
}

export default ExperienceData;
