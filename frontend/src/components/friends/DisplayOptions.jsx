import React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  useMediaQuery,
  useTheme,
  Box,
} from '@mui/material';
import { Group, PersonAdd, Block, Search } from '@mui/icons-material';
import { motion } from 'framer-motion';

const DisplayOptions = ({ setOptions, selected }) => {
  const theme = useTheme();

  const options = [
    { label: "Friends", icon: <Group />, value: "friends" },
    { label: "Invites", icon: <PersonAdd />, value: "invites" },
    { label: "Search", icon: <Search />, value: "search" },
    { label: "Blocked", icon: <Block />, value: "blockedusers" },
    
  ];


  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <Paper
        sx={{
          position: 'fixed',
          bottom: 15,
          left: 0,
          right: 0,
          mx: 'auto',
          width: '90%',
          maxWidth: 500,
          borderRadius: '25px',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(8px)',
          background: 'rgba(255, 255, 255, 0.85)',
          zIndex: 9999,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={selected}
          onChange={(event, newValue) => {
            setOptions(newValue);
          }}
          sx={{
            borderRadius: '25px',
          }}
        >
          {options.map((opt) => (
            <BottomNavigationAction
              key={opt.value}
              label={opt.label}
              icon={opt.icon}
              value={opt.value}
              sx={{
                color: selected === opt.value ? '#1976d2' : '#555',
                '&.Mui-selected': {
                  color: '#1976d2',
                },
              }}
            />
          ))}
        </BottomNavigation>
      </Paper>
    </motion.div>
  );
};

export default DisplayOptions;
