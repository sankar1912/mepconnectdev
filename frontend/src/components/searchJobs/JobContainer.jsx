import { Box, Grid, Typography, SpeedDial, SpeedDialIcon, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import SearchOptions from './SearchOptions';
import SearchResults from './SearchResults';
import CreateJob from '../CreateJob';


function JobContainer() {
  const [setJob, setJobPost] = useState(false);

  return (
    <Box  sx={{ justifyContent: 'center', textAlign: 'center',  position: 'relative' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4} sx={{ background: 'rgba(255,255,255,0.6)', padding: 2 }}>
          <SearchOptions />
        </Grid>
        <Grid item xs={12} md={8} sx={{ background: 'rgba(255,255,255,0.6)', padding: 2 }}>
          <SearchResults />
        </Grid> 
      </Grid>

      <Tooltip title="Post a job">
      <SpeedDial
        ariaLabel="Add Job Post"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClick={() => setJobPost(true)}
      />
      </Tooltip>
      {
       setJob?(
        <CreateJob open={CreateJob} handleClose={() => setJobPost(false)} />
       ):(<></>)
      }
    </Box>
  );
}

export default JobContainer;
