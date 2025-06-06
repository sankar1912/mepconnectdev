import { Edit, Email, Phone } from '@mui/icons-material';
import { Box, Button, IconButton, Paper, TextField, Typography } from '@mui/material';
import React, { useRef, useState } from 'react'
import {motion} from 'framer-motion'
function AboutData({user}) {
      const [activeSection, setActiveSection] = useState("posts");
    
      const [isEditingAbout, setIsEditingAbout] = useState(false);
      const [aboutText, setAboutText] = useState(user?.about || "");


    

      const aboutTextFieldRef = useRef(null);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Paper sx={{ p: 3, borderRadius: "8px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>About</Typography>
          <IconButton onClick={() => {
            setIsEditingAbout(!isEditingAbout);
          }}>
            <Edit fontSize="small" />
          </IconButton>
        </Box>
        
        {isEditingAbout ? (
          <Box component="form" onSubmit={(e) => {
            e.preventDefault();
            console.log("Updated About Data:", { about: aboutText });
            //dispatch(updateUserAbout(aboutText));
            setIsEditingAbout(false);
          }}>
            <TextField
              inputRef={aboutTextFieldRef} 
              fullWidth
              multiline
              rows={4}
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              placeholder="Write about yourself"
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
              <Button variant="outlined" onClick={() => setIsEditingAbout(false)}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography variant="body1" sx={{ mb: 2 }}>
            {aboutText || user?.about || "No information provided. Add a summary about yourself."}
          </Typography>
        )}
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>Contact Info</Typography>
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Email fontSize="small" sx={{ mr: 1 }} /> {user?.email || "N/A"}
          </Typography>
          <Typography variant="body2" sx={{ display: "flex", alignItems: "center" }}>
            <Phone fontSize="small" sx={{ mr: 1 }} /> {user?.phone || "N/A"}
          </Typography>
        </Box>
      </Paper>
    </motion.div>
  )
}

export default AboutData