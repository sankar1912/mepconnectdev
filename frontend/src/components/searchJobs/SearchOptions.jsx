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
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Search, Close, ExpandMore, ExpandLess } from "@mui/icons-material";
import axios from "axios";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import {
  fetchSearchRequest,
  reduceByName,
} from "../../redux/slice/searchPeopleSlice";
import { fetchJobSearch } from "../../redux/slice/jobsSlice";

const SearchOptions = () => {
  const [searchName, setSearchName] = useState("");
  const [searchPlace, setSearchPlace] = useState("");
  const [searchJob, setSearchJob] = useState("");
  const [placeSuggestions, setPlaceSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    city: [],
    position: [],
    workmodes: [],
    experiencelevels: [],
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const workTypes = ["Full-Time", "Part-Time", "Internship", "Contract"];
  const workModes = ["On-site", "Remote", "Hybrid"];
  const experienceLevels = ["Entry level", "Mid-Senior level", "Director", "Executive"];

  const dispatch = useDispatch();

  const handleSelectPlace = (place) => {
    setSearchPlace(place);
    setPlaceSuggestions([]);
    setShowSuggestions(false);
    setSelectedFilters((prev) => ({
      ...prev,
      city: [...prev.city, `:${place}`],
    }));
  };

  const handleRemoveTag = (type, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item !== value),
    }));
  };

  const handlePlaceChange = (e) => {
    const value = e.target.value;
    setSearchPlace(value);
    fetchPlaces(value);
  };

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
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
    console.log(selectedFilters)
  };

  useEffect(() => {
    dispatch(
      fetchJobSearch({
        name: searchName,
        job: searchJob,
        places: selectedFilters.city,
        mode: selectedFilters.workmodes,
        type: selectedFilters.position,
        experienceLevels: selectedFilters.experiencelevels,
      })
    );
  }, [searchName, searchJob, selectedFilters, dispatch]);

  useEffect(() => {
    dispatch(reduceByName({ name: searchName }));
  }, [searchName, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
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
            Search Jobs
          </Typography>
          {isMobile && (
            <IconButton onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          )}
        </Box>

        {!isMobile || isExpanded ? (
          <>
                      {/* Job Field */}
                      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search by Position"
                value={searchJob}
                onChange={(e) => setSearchJob(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Search sx={{ color: "#555" }} /></InputAdornment>,
                  endAdornment: searchJob && (
                    <IconButton onClick={() => setSearchJob("")}>
                      <Close sx={{ color: "#555" }} />
                    </IconButton>
                  ),
                }}
                sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: "25px", background: "#fff" } }}
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search by Company..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Search sx={{ color: "#555" }} /></InputAdornment>,
                  endAdornment: searchName && (
                    <IconButton onClick={() => setSearchName("")}>
                      <Close sx={{ color: "#555" }} />
                    </IconButton>
                  ),
                }}
                sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: "25px", background: "#fff" } }}
              />
            </motion.div>



            {/* Place Field */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search by Location..."
                value={searchPlace}
                onChange={handlePlaceChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Search sx={{ color: "#555" }} /></InputAdornment>,
                  endAdornment: searchPlace && (
                    <IconButton onClick={() => setSearchPlace("")}>
                      <Close sx={{ color: "#555" }} />
                    </IconButton>
                  ),
                }}
                sx={{ mb: 3, "& .MuiOutlinedInput-root": { borderRadius: "25px", background: "#fff" } }}
              />
              {showSuggestions && placeSuggestions.length > 0 && (
                <Paper
                  sx={{
                    position: "absolute",
                    zIndex: 10,
                    width: "30%",
                    maxHeight: "200px",
                    overflowY: "auto",
                    background: "#fff",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                    mt: 1,
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", px: 2, py: 1, borderBottom: "1px solid #ddd" }}>
                    <Typography variant="body2" color="textSecondary">Suggestions</Typography>
                    <IconButton size="small" onClick={() => setShowSuggestions(false)}>
                      <Close fontSize="small" />
                    </IconButton>
                  </Box>
                  <List >
                    {placeSuggestions.map((place, index) => (
                      <ListItem key={index} disablePadding >
                        <ListItemButton onClick={() => handleSelectPlace(place.display_name)}>
                          <ListItemText primary={place.display_name} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </motion.div>

            {/* Select Fields */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
              {[
                { label: "Select Job Type", type: "position", options: workTypes },
                { label: "Select Work Mode", type: "workmodes", options: workModes },
                { label: "Select Experience Level", type: "experiencelevels", options: experienceLevels },
              ].map(({ label, type, options }) => (
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

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
              {Object.entries(selectedFilters).map(([key, values]) =>
                values.map((value, index) => (
                  <Chip
                    key={`${key}-${index}`}
                    label={value}
                    onDelete={() => handleRemoveTag(key, value)}
                    sx={{ backgroundColor: "#f1f1f1", borderRadius: "16px", padding: "5px" }}
                  />
                ))
              )}
            </Box>
          </>
        ) : null}
      </Box>
    </motion.div>
  );
};

export default SearchOptions;
