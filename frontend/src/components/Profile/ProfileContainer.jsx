import React, { useState } from "react";
import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  DynamicFeedRounded,
  Event,
  VolunteerActivism,
  WorkOutlineRounded,
  NotificationAddOutlined,
  Article,
  Info,
  EmojiEmotions,
  Work,
  CastForEducation,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import AboutData from "./AboutData";
import AcademicsData from "./AcademicsData";
import ExperienceData from "./ExperienceData";
import AchievementsData from "./AchievementsData";


const ProfileContainer = ({user}) => {
  const [tabIndex, setTabIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const renderTab = () => {
    const tabContent = [
      <AboutData key="about" user={user}/>,
      <AcademicsData key="academics" user={user}/>,
      <ExperienceData key="experience" user={user}/>,
      <AchievementsData key="achievements" user={user}/>,
    ];
    return (
      <motion.div
        key={tabIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ width: "100%" }}
      >

        {tabContent[tabIndex]}
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",

        paddingBottom: isMobile ? "80px" : 0,
      }}
    >
      {renderTab()}

      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80 }}
      >
        <Box
          sx={{
            position: "fixed",
            bottom: 15,
            left: 0,
            right: 0,
            margin: "0 auto",
            width: { xs: "92%", sm: "75%", md: "55%", lg: "48%" },
            background: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(10px)",
            borderRadius: "20px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
        >
          <BottomNavigation
            showLabels
            value={tabIndex}
            onChange={(e, newValue) => setTabIndex(newValue)}
            sx={{
              borderRadius: "20px",
              py: 0.5,
              "& .MuiBottomNavigationAction-root": {
                color: "#555",
                minWidth: 0,
                maxWidth: "100%",
                flex: 1,
                fontSize: "0.7rem", // smaller label text
                padding: { xs: "6px 4px", sm: "8px 6px" },
                "& .MuiBottomNavigationAction-label": {
                  fontSize: { xs: "0.65rem", sm: "0.75rem" },
                  lineHeight: 1,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  mt: 0.2,
                },
                "& .MuiSvgIcon-root": {
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                },
              },
              "& .Mui-selected": {
                color: "#1976d2",
                fontWeight: 500,
              },
            }}
          >
            <BottomNavigationAction label="About" icon={<Info />} />
            <BottomNavigationAction
              label="Academics"
              icon={<CastForEducation />}
            />
            <BottomNavigationAction
              label="Experience"
              icon={<WorkOutlineRounded />}
            />
            <BottomNavigationAction
              label="Achievements"
              icon={<EmojiEmotions />}
            />
          </BottomNavigation>
        </Box>
      </motion.div>
    </motion.div>
  );
};

export default ProfileContainer;
