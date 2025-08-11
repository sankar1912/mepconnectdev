import React from "react";
import { useSelector } from "react-redux";
import { getAuth } from "./AuthSlice";
import {
  Card,
  Avatar,
  Typography,
  Box,
  Tooltip,
  IconButton,
  Divider,
  Chip,
} from "@mui/material";
import {
  Edit,
  Email,
  Phone,
  School,
  Work,
  EmojiEvents,
  CalendarToday,
  Star,
  Verified,
} from "@mui/icons-material";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from "@mui/lab";
import { motion } from "framer-motion"; 

function UserProfile() {
  const { auth } = useSelector(getAuth);
  const user = auth?.user || {};
  const isLoggedIn = auth?.isLoggedIn;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        padding: "40px 0",
      }}
    >
      <Card
        sx={{
          width: "80%",
          maxWidth: "900px",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
          backgroundColor: "#fff",
        }}
      >
        
        <Box
          sx={{
            textAlign: "center",
            position: "relative",
            paddingBottom: "20px",
          }}
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            
            <Tooltip title="Change Profile Picture">
              <IconButton sx={{ position: "absolute", right: "20px", top: "10px" }}>
                <Edit color="primary" />
              </IconButton>
            </Tooltip>
            <Avatar
              src={user.profilePicture || "/static/images/avatar.png"}
              alt="Profile Picture"
              sx={{
                width: 120,
                height: 120,
                margin: "auto",
                border: "4px solid #1976D2",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
            />
           
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333", marginTop: "10px" }}>
              {user.name || "Guest User"}{" "}
              {isLoggedIn && <Verified sx={{ color: "#4CAF50", fontSize: 24, marginLeft: "5px" }} />}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {isLoggedIn ? "Software Developer | Tech Enthusiast" : "You're not logged in."}
            </Typography>
          </motion.div>
        </Box>

        <Divider sx={{ margin: "20px 0" }} />

        
        <Timeline position="alternate">
          
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary">
                <Email />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Tooltip title="Personal Information">
                  <Box sx={{ padding: "10px 15px", background: "#E3F2FD", borderRadius: "8px" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>Personal Details</Typography>
                    <Typography variant="body2"><Email fontSize="small" /> {user.email || "N/A"}</Typography>
                    <Typography variant="body2"><Phone fontSize="small" /> {user.phone || "N/A"}</Typography>
                  </Box>
                </Tooltip>
              </motion.div>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="secondary">
                <School />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Tooltip title="Educational Background">
                  <Box sx={{ padding: "10px 15px", background: "#FCE4EC", borderRadius: "8px" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>Academics</Typography>
                    <Typography variant="body2">
                      <CalendarToday fontSize="small" /> {user.education || "No education details added."}
                    </Typography>
                  </Box>
                </Tooltip>
              </motion.div>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="success">
                <Work />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Tooltip title="Work Experience">
                  <Box sx={{ padding: "10px 15px", background: "#E8F5E9", borderRadius: "8px" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>Work Experience</Typography>
                    {user.experience ? (
                      user.experience.map((job, index) => (
                        <Typography key={index} variant="body2">
                          <Work fontSize="small" /> {job.title} - {job.company}
                        </Typography>
                      ))
                    ) : (
                      <Typography variant="body2">No work experience added.</Typography>
                    )}
                  </Box>
                </Tooltip>
              </motion.div>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="warning">
                <EmojiEvents />
              </TimelineDot>
            </TimelineSeparator>
            <TimelineContent>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <Tooltip title="Achievements & Awards">
                  <Box sx={{ padding: "10px 15px", background: "#FFF3E0", borderRadius: "8px" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>Honors & Achievements</Typography>
                    {user.achievements ? (
                      user.achievements.map((award, index) => (
                        <Chip key={index} icon={<Star />} label={award} sx={{ margin: "5px" }} />
                      ))
                    ) : (
                      <Typography variant="body2">No honors added.</Typography>
                    )}
                  </Box>
                </Tooltip>
              </motion.div>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Card>
    </Box>
  );
}

export default UserProfile;