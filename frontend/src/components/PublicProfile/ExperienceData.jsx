import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Paper,Typography,IconButton,Box,TextField, Button } from '@mui/material';
import { AddCircleOutline, Edit, Work } from '@mui/icons-material';
function ExperienceData({user}) {

     
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Paper sx={{ p: 3, borderRadius: "8px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>Experience</Typography>
        </Box>
        
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
            


      </Paper>
    </motion.div>
  )
}

export default ExperienceData