import React, { useEffect } from "react";
import { Grid } from "@mui/material";
import Greetings from "../features/users/Greetings";
import FeedsProvider from "./FeedsProvider";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";
import { fetchJobSearch } from "../features/feeds/jobsSlice";
import { fetchDonation } from "../features/feeds/donationsSlice";
const Service = () => {


  return (
    <Box  sx={{
  flexGrow: 1,
  overflowY: 'auto',
  width: '100%',
}}>
     
      <Grid container spacing={4} >
        <Grid item xs={12} lg={3} sx={{ display: { xs: "none", lg: "flex" } }}>
          <Greetings />
        </Grid>
        <Grid item xs={12} lg={6} sx={{overflow:'hidden'}}>
          <FeedsProvider />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Service;
