import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import SearchOptions from './SearchOptions';
import SearchResults from './SearchResults';

function Container() {
  return (
    <Box sx={{ justifyContent: 'center', textAlign: 'center',padding:'2vw' }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Search People
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4} sx={{ background: "rgba(255,255,255,0.6)", padding: 2 }}>
          <SearchOptions />
        </Grid>
        <Grid item xs={12} md={8} sx={{ background: "rgba(255,255,255,0.6)", padding: 2 }}>
          <SearchResults />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Container;
