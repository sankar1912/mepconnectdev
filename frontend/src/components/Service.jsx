import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Greetings from "../redux/slice/Greetings";
import FeedsProvider from "./FeedsProvider";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../redux/slice/AuthSlice";
import TourContainer from "./tour/TourContainer";
const Service = () => {

  
  const {isLoading} = useSelector(getAuth);
  const [open, setOpen] =useState(isLoading);
  useEffect(()=>{
    setOpen(!isLoading)
  },[isLoading])
  return (
    <Box  sx={{flexGrow: 1,overflowY: 'auto',width: '100%',}}>
  <TourContainer open={!open} setOpen={setOpen}/>
     
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
