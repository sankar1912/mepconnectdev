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
        </Box>
        

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
      </Paper>
    </motion.div>
  )
}

export default AcademicsData