import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  SpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
  Typography,
} from "@mui/material";
import { LocationOn, Apartment, Interests, Search } from "@mui/icons-material";
import { motion } from "framer-motion";

const actions = [
  { icon: <LocationOn />, name: "Place", value: "place" },
  { icon: <Apartment />, name: "Area", value: "area" },
  { icon: <Interests />, name: "Interest", value: "interest" },
];

const SearchWorks = () => {
  const [searchType, setSearchType] = useState("place");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "white",
        padding: 3,
        position: "relative",
      }}
    >
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, color: "#222" }}>
          Search Jobs
        </Typography>
      </motion.div>

      
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
        }}
      >
       
      </motion.div>

     
      <Box sx={{display:'flex', width:'100%',justifyContent:'center'}} spacing={5}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: "100%",
          maxWidth: "600px",
         
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder={`Search jobs by ${searchType}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "#777" }} />
              </InputAdornment>
            ),
            sx: {
              borderRadius: "30px",
              backgroundColor: "#f9f9f9",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              "&:hover": { backgroundColor: "#f1f1f1" },
              "&.Mui-focused": {
                backgroundColor: "white",
                borderColor: "black",
              },
            },
          }}
        />
      </motion.div>
      <SpeedDial
          ariaLabel="Search Type Selection"
          icon={<SpeedDialIcon />}
          direction="down"
          
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => setSearchType(action.value)}
            />
          ))}
        </SpeedDial>
      </Box>
    </Box>
  );
};

export default SearchWorks;
