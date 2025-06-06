import { AddCircleOutline, Edit, School } from '@mui/icons-material';
import { Box, Button, IconButton, Paper, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react'
import {motion} from 'framer-motion'
function AcademicsData({user}) {
    
      const [isEditingEducation, setIsEditingEducation] = useState(false);
      const [educationData, setEducationData] = useState({
        school: user.education?.school || "",
        degree: user.education?.degree || "",
        field: user.education?.field || "",
        startYear: user.education?.startYear || "",
        endYear: user.education?.endYear || "",
      });
      
      
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Paper sx={{ p: 3, borderRadius: "8px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>Education</Typography>
          <IconButton onClick={() => setIsEditingEducation(!isEditingEducation)}>
            <Edit fontSize="small" />
          </IconButton>
        </Box>
        
        {isEditingEducation ? (
          <Box component="form" onSubmit={(e) => {
            e.preventDefault();
            console.log("Updated Education Data:", educationData);
            //dispatch(updateUserEducation(educationData));
            setIsEditingEducation(false);
          }}>
            <TextField
              fullWidth
              label="School"
              value={educationData.school}
              onChange={(e) => setEducationData({ ...educationData, school: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Degree"
              value={educationData.degree}
              onChange={(e) => setEducationData({ ...educationData, degree: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Field of Study"
              value={educationData.field}
              onChange={(e) => setEducationData({ ...educationData, field: e.target.value })}
              margin="normal"
            />
            <Box sx={{ display: 'flex', gap: 2, mt: 1, mb: 2 }}>
              <TextField
                label="Start Year"
                type="date"
                value={educationData.startYear}
                onChange={(e) => setEducationData({ ...educationData, startYear: e.target.value })}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="End Year"
                type="date"
                value={educationData.endYear}
                onChange={(e) => setEducationData({ ...educationData, endYear: e.target.value })}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button variant="outlined" onClick={() => setIsEditingEducation(false)}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            {user.education ? (
              <Box sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                <School fontSize="large" sx={{ mr: 2, color: "#0077B5" }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {user.education.school || "University Name"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.education.degree || "Degree"} • {user.education.field || "Field of Study"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.education.startYear || "20XX"} - {user.education.endYear || "20XX"}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <School fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body1">No education details added.</Typography>
              </Box>
            )}
            
            <Button
              startIcon={<AddCircleOutline />} 
              variant="outlined" 
              sx={{ mt: 2 }}
              onClick={() => setIsEditingEducation(true)}
            >
              Add education
            </Button>
          </>
        )}
      </Paper>
    </motion.div>
  )
}

export default AcademicsData