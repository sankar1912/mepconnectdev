import { Box, Grid} from '@mui/material'
import React from 'react'
import Writeposts from './Writeposts'
import { useSelector } from 'react-redux'
import { getAuth } from '../features/users/AuthSlice'
import { Card } from '@mui/joy'
import FeedContainer from './FeedContainer'
const FeedsProvider = () => {
   
    const {auth}=useSelector(getAuth);
    
  return (
        <Card sx={{background:'rgba(255,255,255,0.7)',marginTop:'20px',  borderRadius: "16px",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2) ",}}>
            <Grid container spacing={4}>
            <Grid item xs={12} sm={12}>
                {
                    auth.isLoggedIn ?(<Writeposts/>):(<></>)
                }
            </Grid>
        </Grid>
        <Grid item xs={12} sm={12}  >
            <FeedContainer/>
        </Grid>
        </Card>

  )
}

export default FeedsProvider