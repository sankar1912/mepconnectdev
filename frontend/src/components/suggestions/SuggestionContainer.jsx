import { Grid, Paper } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import PeopleSuggestions from './PeopleSuggestions'

function SuggestionContainer() {
  return (
    <Box>
        <Paper elevation={7}>
            <PeopleSuggestions/>
        </Paper>
    </Box>
  )
}

export default SuggestionContainer