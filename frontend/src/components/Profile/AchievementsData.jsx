import { AddCircleOutline, Edit, EmojiEvents } from "@mui/icons-material";
import { Box, Button, IconButton, Paper, TextField, Typography } from "@mui/material";
import {motion} from 'framer-motion'
import React, { useState } from 'react'
  
  function AchievementsData({user}) {
  const [isEditingAchievements, setIsEditingAchievements] = useState(false);
  const [achievementData, setAchievementData] = useState({
    title: user.achievements?.[0]?.title || "",
    issuer: user.achievements?.[0]?.issuer || "",
    date: user.achievements?.[0]?.date || "",
    description: user.achievements?.[0]?.description || "",
  });


    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Paper sx={{ p: 3, borderRadius: "8px" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>Honors & Achievements</Typography>
            <IconButton onClick={() => setIsEditingAchievements(!isEditingAchievements)}>
              <Edit fontSize="small" />
            </IconButton>
          </Box>
          
          {isEditingAchievements ? (
            <Box component="form" onSubmit={(e) => {
              e.preventDefault();
              console.log("Updated Achievement Data:", achievementData);
              //dispatch(updateUserAchievements(achievementData));
              setIsEditingAchievements(false);
            }}>
              <TextField
                fullWidth
                label="Achievement Title"
                value={achievementData.title}
                onChange={(e) => setAchievementData({ ...achievementData, title: e.target.value })}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Issuer"
                value={achievementData.issuer}
                onChange={(e) => setAchievementData({ ...achievementData, issuer: e.target.value })}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Date"
                type="date"
                value={achievementData.date}
                onChange={(e) => setAchievementData({ ...achievementData, date: e.target.value })}
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                value={achievementData.description}
                onChange={(e) => setAchievementData({ ...achievementData, description: e.target.value })}
                margin="normal"
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
                <Button variant="outlined" onClick={() => setIsEditingAchievements(false)}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  Save
                </Button>
              </Box>
            </Box>
          ) : (
            <>
              {user.achievements && user.achievements.length > 0 ? (
                user.achievements.map((award, index) => (
                  <Box key={index} sx={{ display: "flex", alignItems: "flex-start", mb: 2 }}>
                    <EmojiEvents fontSize="large" sx={{ mr: 2, color: "#0077B5" }} />
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        {award.title || award}
                      </Typography>
                      {award.issuer && (
                        <Typography variant="body2" color="text.secondary">
                          Issued by {award.issuer} • {award.date || "Date"}
                        </Typography>
                      )}
                      {award.description && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          {award.description}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))
              ) : (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <EmojiEvents fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body1">No achievements added yet.</Typography>
                </Box>
              )}
              
              <Button
                startIcon={<AddCircleOutline />} 
                variant="outlined" 
                sx={{ mt: 2 }}
                onClick={() => setIsEditingAchievements(true)}
              >
                Add achievement
              </Button>
            </>
          )}
        </Paper>
      </motion.div>
    )
  }
  
  export default AchievementsData