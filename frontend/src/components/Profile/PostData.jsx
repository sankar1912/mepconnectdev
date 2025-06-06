import { AddCircleOutline, Article } from '@mui/icons-material'
import { Avatar, Box, Button, Paper, Typography } from '@mui/material'
import React from 'react'

function PostData({user}) {
  return (
    <Box sx={{ padding: "20px 0" }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
        <Avatar
          src={user?.profileImage || "/static/images/avatar.png"}
          alt="Profile"
          sx={{ width: 48, height: 48, marginRight: "15px" }}
        />
        <Button 
          variant="outlined" 
          fullWidth 
          sx={{ 
            borderRadius: "24px", 
            textAlign: "left", 
            padding: "12px", 
            color: "#666" 
          }}
          startIcon={<AddCircleOutline />}
        >
          Start a post
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 2, borderRadius: "8px" }}>
        <Typography variant="body1" sx={{ mb: 2 }}>
          No posts yet. Create your first post to share your thoughts or achievements!
        </Typography>
        <Button variant="contained" startIcon={<Article />}>
          Create Post
        </Button>
      </Paper>
    </Box>
  )
}

export default PostData