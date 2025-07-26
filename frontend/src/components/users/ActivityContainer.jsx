import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Tab, Tabs } from "@mui/material";
import ActivityList from "./ActivityList"; 
import { useDispatch, useSelector } from "react-redux";
import { fetchActivity, getActivity } from "../../redux/slice/activitySlice";
import { getAuth } from "../../redux/slice/AuthSlice";

const activities = ["Posts", "Events", "Donations"];

function ActivityContainer() {
  const { auth } = useSelector(getAuth);
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    dispatch(fetchActivity({ email: auth.user.email }));
  }, [dispatch, auth]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    dispatch(getActivity({ dataType: activities[newValue] }));
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 600, mx: "auto", mt: 3, pb: 10 }}>
      {/* Activity Content */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ActivityList />
        </Grid>
      </Grid>

      {/* Bottom Tabs */}
      <Paper 
        elevation={3} 
        sx={{
          position: "fixed",
          bottom: 10,
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
          maxWidth: 400,
          borderRadius: "25px",
          overflow: "hidden",
        }}
      >
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
          sx={{
            "& .MuiTab-root": { fontWeight: "bold", textTransform: "none" },
          }}
        >
          {activities.map((activity, index) => (
            <Tab key={index} label={activity} />
          ))}
        </Tabs>
      </Paper>
    </Box>
  );
}

export default ActivityContainer;
