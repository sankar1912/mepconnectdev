import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Box, Container, Tabs, Tab, Typography, Paper } from "@mui/material";
import PermitPosts from "./PermitPosts";
import PermitUsers from "./PermitUsers";
import PermitEvents from "./PermitEvents";
import PermitDonations from "./PermitDonations";
import PermitJobs from "./PermitJobs";



function PermitDashboard({show}) {
  const tabLabels = ["Users", "Posts", "Events", "Donations", "Jobs"];
const tabComponents = {
  users: <PermitUsers show={show} />,
  posts: <PermitPosts show={show} />,
  events: <PermitEvents show={show} />,
  donations: <PermitDonations show={show} />,
  jobs:<PermitJobs show={show}/>
};
  const { auth } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("users");

  if (auth?.user?.role !== "admin") {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Typography variant="h4" color="error">
          403 - Not Authorized
        </Typography>
      </Box>
    );
  }

  return (
    <Container sx={{width:'100%'}}>
      
      <Box textAlign="center" mt={4} mb={3}>
        <Avatar src={auth.user.profileImage} sx={{ width: 100, height: 100, bgcolor: "primary.main", mx: "auto" }} />
        <Typography variant="h5" fontWeight="bold" mt={2}>
          Welcome Admin - {auth.user.name}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Manage Pending Approvals
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
          variant="fullWidth"
          indicatorColor="primary"
          textColor="primary"
        >
          {tabLabels.map((tab, index) => (
            <Tab key={index} label={tab} value={tab.toLowerCase()} />
          ))}
        </Tabs>
      </Box>

      <Paper
        elevation={3}
        sx={{
          mt: 3,
          width: "90%",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
          padding: 2,
        }}
      >
        {tabComponents[activeTab] || <Typography>No Data Available</Typography>}
      </Paper>
    </Container>
  );
}

export default PermitDashboard;
