import { Cake, CalendarToday, ChildCare, Edit, Email, LocationOn, Person, Phone, School, Work } from '@mui/icons-material';
import { Box, Button, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import {motion} from 'framer-motion'
function AboutData({user}) {
      const [activeSection, setActiveSection] = useState("posts");
    
      const [isEditingAbout, setIsEditingAbout] = useState(false);
      const [aboutText, setAboutText] = useState(user?.about || "");
      const aboutTextFieldRef = useRef(null);
      useEffect(()=>{
        console.log(user)
      },[user])
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Paper sx={{ p: 3, borderRadius: "8px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>About</Typography>
        </Box>
        
        
        <Box sx={{ mt: 3 }}>
         <Typography sx={{color:"black"}} variant='h5'>Personal Details</Typography>
              <Grid container spacing={2} direction="column" marginTop={5}>
                <DetailItem icon={<Email sx={iconStyle} />} label="Email" value={user?.user?.email} />
                <DetailItem icon={<Person sx={iconStyle} />} label="Father" value={user?.user?.father} />
                <DetailItem icon={<ChildCare sx={iconStyle} />} label="Mother" value={user?.user?.mother} />
                <DetailItem icon={<Phone sx={iconStyle} />} label="Phone" value={user?.user?.phone} />
                <DetailItem icon={<Cake sx={iconStyle} />} label="Date of Birth" value={user?.user?.dob} />
                <DetailItem icon={<LocationOn sx={iconStyle} />} label="Place" value={user?.user?.place} />
                <DetailItem icon={<School sx={iconStyle} />} label="Degree" value={`${user?.user?.degree} (${user?.user?.department})`} />
                <DetailItem icon={<CalendarToday sx={iconStyle} />} label="Batch" value={user?.user?.batch} />
                <DetailItem icon={<Work sx={iconStyle} />} label="Role" value={user?.user?.role} />
                
              </Grid>
        </Box>
      </Paper>
    </motion.div>
  )
}
const iconStyle = {
  color: 'primary.main',
  fontSize: 24,
  mr: 2,
};

const DetailItem = ({ icon, label, value }) => (
  <Grid item sx={{
    display: 'flex',
    alignItems: 'center',
    p: 2,
    borderRadius: 3,
    background: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(6px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(25, 118, 210, 0.1)',
      borderColor: 'primary.main',
    },
  }}>
      {icon}
      <Box display="flex" width="100%">
        <Typography
          sx={{
            minWidth: '120px',
            fontWeight: 500,
            color: 'text.primary',
          }}
        >
          {label}
        </Typography>
        <Typography sx={{ mx: 1 }}>:</Typography>
        <Typography sx={{ color: 'text.secondary', wordBreak: 'break-word' }}>
          {value || 'N/A'}
        </Typography>
      </Box>

  </Grid>
);

export default AboutData