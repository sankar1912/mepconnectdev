import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Search, Close, ExpandMore, ExpandLess } from "@mui/icons-material";
import axios from "axios";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { fetchSearchRequest, reduceByName } from "../../features/Search/searchPeopleSlice";

const SearchOptions = () => {
  const [searchName, setSearchName] = useState("");
  const [searchPlace, setSearchPlace] = useState("");
  const [placeSuggestions, setPlaceSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    city: [],
    batch: [],
    department: [],
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const startYear = 1991;
  const currentYear = new Date().getFullYear();
  const batches = Array.from({ length: currentYear - startYear + 1 }, (_, i) => (startYear + i).toString());
  const dispatch=useDispatch();
  const departments = ["Civil Engineering",
    "Mechanical Engineering",
    "Electrical and Electronics Engineering",
    "Electronics and Communication Engineering",
    "Computer Science Engineering", 
    "Information Technology", 
    "Artificial Intelligence & Data Science", 
    "Bio Medical Engineering", 
    "Bio Technology", 
    "Architecture",
    "MCA", 
    "MBA", 
    ];

  // Fetch place
  const fetchPlaces = async (query) => {
    if (!query) {
      setPlaceSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: { q: query, format: "json", limit: 5 },
      });
      setPlaceSuggestions(response.data);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  const handleFilterChange = (type, value) => {
    setSelectedFilters((prev) => ({ ...prev, [type]: value }));
  };

  const removeFilter = (type, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item !== value),
    }));
  };

  useEffect(()=>{
    console.log(selectedFilters);
    dispatch(fetchSearchRequest({places: selectedFilters.city, 
      batchs: selectedFilters.batch, 
      depts: selectedFilters.department}))
  },[selectedFilters,dispatch])

  useEffect(()=>{
    dispatch(reduceByName({name:searchName}))
  },[searchName,dispatch])


  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
      <Box
        sx={{
          width: { sm: "70%", md: "100%" },
          margin: "auto",
          p: 4,
          background: "linear-gradient(135deg, #ffffff, #f9f9f9)",
          borderRadius: "16px",
          boxShadow: "0px 8px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5" fontWeight="bold" textAlign="center" color="#333">
            Search Here
          </Typography>
          {isMobile && (
            <IconButton onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          )}
        </Box>

        {!isMobile || isExpanded ? (
          <>
           
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search by Name..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "#555" }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchName && (
                    <IconButton onClick={() => setSearchName("")}>
                      <Close sx={{ color: "#555" }} />
                    </IconButton>
                  ),
                }}
                sx={{
                  mb: 3,
                  borderRadius: "12px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "25px",
                    background: "#fff",
                  },
                }}
              />
            </motion.div>

       
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search by Place..."
                value={searchPlace}
                onChange={(e) => {
                  setSearchPlace(e.target.value);
                  fetchPlaces(e.target.value);
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "#555" }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchPlace && (
                    <IconButton
                      onClick={() => {
                        setSearchPlace("");
                        setPlaceSuggestions([]);
                        setShowSuggestions(false);
                      }}
                    >
                      <Close sx={{ color: "#555" }} />
                    </IconButton>
                  ),
                }}
                sx={{
                  mb: 3,
                  borderRadius: "12px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "25px",
                    background: "#fff",
                  },
                }}
              />
            </motion.div>

            
            {showSuggestions && placeSuggestions.length > 0 && (
              <Box
                sx={{
                  maxHeight: "150px",
                  overflowY: "auto",
                  background: "#fff",
                  borderRadius: "8px",
                  p: 1,
                  boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                  position: "relative",
                }}
              >
                
                <IconButton
                  onClick={() => {
                    setPlaceSuggestions([]);
                    setShowSuggestions(false);
                  }}
                  sx={{ position: "absolute", top: 5, right: 5, zIndex: 1 }}
                >
                  <Close sx={{ color: "#555" }} />
                </IconButton>

                {placeSuggestions.map((place) => (
                  <MenuItem
                    key={place.place_id}
                    onClick={() => {
                      handleFilterChange("city", [...selectedFilters.city, place.display_name]);
                      setPlaceSuggestions([]);
                      setShowSuggestions(false);
                    }}
                  >
                    {place.display_name}
                  </MenuItem>
                ))}
              </Box>
            )}

        
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[{ label: "Select Batch", type: "batch", options: batches },
                { label: "Select Department", type: "department", options: departments }].map(({ label, type, options }, index) => (
                <FormControl fullWidth key={type}>
                  <InputLabel>{label}</InputLabel>
                  <Select
                    multiple
                    value={selectedFilters[type]}
                    onChange={(e) => handleFilterChange(type, e.target.value)}
                    input={<OutlinedInput label={label} />}
                  >
                    {options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ))}
            </Box>
          </>
        ) : null}
        
       
         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }}>
              <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 1 }}>
                {Object.entries(selectedFilters).map(([key, values]) =>
                  values.map((value) => (
                    <Chip key={value} label={value} onDelete={() => removeFilter(key, value)} deleteIcon={<Close />} sx={{ background: "#007bff", color: "#fff" }} />
                  ))
                )}
              </Box>
            </motion.div>
      </Box>
      
    </motion.div>
  );
};

export default SearchOptions;
