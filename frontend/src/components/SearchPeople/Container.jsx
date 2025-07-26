import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import SearchOptions from './SearchOptions';
import SearchResults from './SearchResults';

function Container() {
    const [selectedFilters, setSelectedFilters] = useState({
      city: [],
      batch: [],
      department: [],
      name:"",
      company:""
    });
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
  return (
    <Box sx={{ justifyContent: 'center', textAlign: 'center',padding:'2vw' }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Search People
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4} sx={{ background: "rgba(255,255,255,0.6)", padding: 2 }}>
          <SearchOptions selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters}/>
        </Grid>
        <Grid item xs={12} md={8} sx={{ background: "rgba(255,255,255,0.6)", padding: 2 }}>
          <SearchResults selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters}/>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Container;
