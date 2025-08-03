import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Grid,
} from '@mui/material';
import {
  Email, Phone, Cake, LocationOn,
  School, Person, Wc, CalendarToday, Work
} from '@mui/icons-material';

const PersonalDetails = ({ user }) => {
  return (
    <Box
      sx={{
        p: 4,
        borderRadius: 5,
        background: 'linear-gradient(to bottom right, #e3f2fd, #ffffff)',
        boxShadow: 3,
        width:"95%",
        mx: 'auto',
      }}
    >
      <Typography sx={{color:"black"}} variant='h5'>Personal Details</Typography>
      <Grid container spacing={2} direction="column" marginTop={5}>
        <DetailItem icon={<Email sx={iconStyle} />} label="Email" value={user?.email} />
        <DetailItem icon={<Phone sx={iconStyle} />} label="Phone" value={user?.phone} />
        <DetailItem icon={<Cake sx={iconStyle} />} label="Date of Birth" value={user?.dob} />
        <DetailItem icon={<LocationOn sx={iconStyle} />} label="Place" value={user?.place} />
        <DetailItem icon={<School sx={iconStyle} />} label="Degree" value={`${user?.degree} (${user?.department})`} />
        <DetailItem icon={<CalendarToday sx={iconStyle} />} label="Batch" value={user?.batch} />
        <DetailItem icon={<Work sx={iconStyle} />} label="Role" value={user?.role} />
        <DetailItem icon={<Person sx={iconStyle} />} label="Father" value={user?.father} />
        <DetailItem icon={<Wc sx={iconStyle} />} label="Mother" value={user?.mother} />
      </Grid>
    </Box>
  );
};

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

export default PersonalDetails;
