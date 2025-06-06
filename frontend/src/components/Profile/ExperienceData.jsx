import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Paper,Typography,IconButton,Box,TextField, Button } from '@mui/material';
import { AddCircleOutline, Edit, Work } from '@mui/icons-material';
function ExperienceData({user}) {

     
      const [isEditingExperience, setIsEditingExperience] = useState(false);
      const [experienceData, setExperienceData] = useState({
        title: user.experience?.[0]?.title || "",
        company: user.experience?.[0]?.company || "",
        employmentType: user.experience?.[0]?.employmentType || "",
        startDate: user.experience?.[0]?.startDate || "",
        endDate: user.experience?.[0]?.endDate || "",
        location: user.experience?.[0]?.location || "",
        description: user.experience?.[0]?.description || "",
      });
     
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Paper sx={{ p: 3, borderRadius: "8px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>Experience</Typography>
          <IconButton onClick={() => setIsEditingExperience(!isEditingExperience)}>
            <Edit fontSize="small" />
          </IconButton>
        </Box>
        
        {isEditingExperience ? (
          <Box component="form" onSubmit={(e) => {
            e.preventDefault();
            console.log("Updated Experience Data:", experienceData);
            //dispatch(updateUserExperience(experienceData));
            setIsEditingExperience(false);
          }}>
            <TextField
              fullWidth
              label="Job Title"
              value={experienceData.title}
              onChange={(e) => setExperienceData({ ...experienceData, title: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Company"
              value={experienceData.company}
              onChange={(e) => setExperienceData({ ...experienceData, company: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Employment Type"
              value={experienceData.employmentType}
              onChange={(e) => setExperienceData({ ...experienceData, employmentType: e.target.value })}
              margin="normal"
            />
            <Box sx={{ display: 'flex', gap: 2, mt: 1, mb: 2 }}>
              <TextField
                label="Start Date"
                type="date"
                value={experienceData.startDate}
                onChange={(e) => setExperienceData({ ...experienceData, startDate: e.target.value })}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="End Date"
                type="date"
                value={experienceData.endDate}
                onChange={(e) => setExperienceData({ ...experienceData, endDate: e.target.value })}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
            </Box>
            <TextField
              fullWidth
              label="Location"
              value={experienceData.location}
              onChange={(e) => setExperienceData({ ...experienceData, location: e.target.value })}
              margin="normal"
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={experienceData.description}
              onChange={(e) => setExperienceData({ ...experienceData, description: e.target.value })}
              margin="normal"
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
              <Button variant="outlined" onClick={() => setIsEditingExperience(false)}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Box>
          </Box>
        ) : (
          <>
            {user.experience && user.experience.length > 0 ? (
              user.experience.map((job, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "flex-start", mb: 3 }}>
                  <Work fontSize="large" sx={{ mr: 2, color: "#0077B5" }} />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                      {job.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {job.company} • {job.employmentType || "Full-time"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {job.startDate || "Month Year"} - {job.endDate || "Present"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {job.location || "Location"}
                    </Typography>
                    {job.description && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {job.description}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Work fontSize="small" sx={{ mr: 1 }} />
                <Typography variant="body1">No work experience added.</Typography>
              </Box>
            )}
            
            <Button 
              startIcon={<AddCircleOutline />} 
              variant="outlined" 
              sx={{ mt: 2 }}
              onClick={() => setIsEditingExperience(true)}
            >
              Add experience
            </Button>
          </>
        )}
      </Paper>
    </motion.div>
  )
}

export default ExperienceData