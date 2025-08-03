import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import { Search, Close, ExpandMore, ExpandLess } from '@mui/icons-material';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import {
  fetchSearchRequest,
} from '../../redux/slice/searchPeopleSlice';

const SearchOptions = ({ selectedFilters, setSelectedFilters }) => {
  const [searchName, setSearchName] = useState('');
  const [searchPlace, setSearchPlace] = useState('');
  const [placeSuggestions, setPlaceSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchCompany, setSearchCompany] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();

  const startYear = 1991;
  const currentYear = new Date().getFullYear();
  const batches = Array.from({ length: currentYear - startYear + 1 }, (_, i) => (startYear + i).toString());

  const departments = [
    'Civil Engineering',
    'Mechanical Engineering',
    'Electrical and Electronics Engineering',
    'Electronics and Communication Engineering',
    'Computer Science Engineering',
    'Information Technology',
    'Artificial Intelligence & Data Science',
    'Bio Medical Engineering',
    'Bio Technology',
    'Architecture',
    'MCA',
    'MBA',
  ];

  const handleFilterChange = (type, value) => {
    setSelectedFilters((prev) => ({ ...prev, [type]: value }));
  };

  const removeFilter = (type, value) => {
    setSelectedFilters((prev) => {
      const current = prev[type];
      if (Array.isArray(current)) {
        const updated = current.filter((item) => item !== value);
        return updated.length ? { ...prev, [type]: updated } : { ...prev, [type]: undefined };
      }
      if (current === value) {
        const { [type]: _, ...rest } = prev;
        return rest;
      }
      return prev;
    });
  };

  // Debounce place fetching
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchPlace.trim()) {
        axios.get(`https://nominatim.openstreetmap.org/search`, {
          params: { q: searchPlace, format: 'json', limit: 5 },
        }).then((res) => {
          setPlaceSuggestions(res.data);
          setShowSuggestions(true);
        }).catch(console.error);
      } else {
        setPlaceSuggestions([]);
        setShowSuggestions(false);
      }
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchPlace]);

  useEffect(() => {
    dispatch(
      fetchSearchRequest({
        places: selectedFilters.city,
        batchs: selectedFilters.batch,
        depts: selectedFilters.department,
        name: searchName,
        company: searchCompany,
        page: 1,
        limit: 10,
      })
    );
  }, [selectedFilters, searchName, searchCompany, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          width: { sm: '100%', md: '100%' },
          margin: 'auto',
          p: 4,
          background: 'linear-gradient(135deg, #ffffff, #f9f9f9)',
          borderRadius: 4,
          boxShadow: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by Name..."
              value={searchName}
              onChange={(e) => {
                setSearchName(e.target.value);
                handleFilterChange('name', e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#555' }} />
                  </InputAdornment>
                ),
                endAdornment: searchName && (
                  <IconButton onClick={() => setSearchName('')}>
                    <Close sx={{ color: '#555' }} />
                  </IconButton>
                ),
              }}
                sx={{
                  mb: 3,
                  borderRadius: '12px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '25px',
                    background: '#fff',
                  },
                }}
            />

            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by Company..."
              value={searchCompany}
              onChange={(e) => {
                setSearchCompany(e.target.value);
                handleFilterChange('company', e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#555' }} />
                  </InputAdornment>
                ),
                endAdornment: searchCompany && (
                  <IconButton onClick={() => setSearchCompany('')}>
                    <Close sx={{ color: '#555' }} />
                  </IconButton>
                ),
              }}
                sx={{
                  mb: 3,
                  borderRadius: '12px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '25px',
                    background: '#fff',
                  },
                }}
            />

            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by Place..."
              value={searchPlace}
              onChange={(e) => setSearchPlace(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#555' }} />
                  </InputAdornment>
                ),
                endAdornment: searchPlace && (
                  <IconButton onClick={() => setSearchPlace('')}>
                    <Close sx={{ color: '#555' }} />
                  </IconButton>
                ),
              }}
                sx={{
                  mb: 3,
                  borderRadius: '12px',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '25px',
                    background: '#fff',
                  },
                }}
            />
            {showSuggestions && (
              <Box
                sx={{
                  maxHeight: '150px',
                  overflowY: 'auto',
                  background: '#fff',
                  borderRadius: 2,
                  p: 1,
                  boxShadow: 1,
                  position: 'relative',
                  zIndex: 10,
                }}
              >
                {placeSuggestions.map((place) => (
                  <MenuItem
                    key={place.place_id}
                    onClick={() => {
                      const updatedCity = [...(selectedFilters.city || [])];
                      if (!updatedCity.includes(place.display_name)) {
                        updatedCity.push(place.display_name);
                      }
                      handleFilterChange('city', updatedCity);
                      setPlaceSuggestions([]);
                      setShowSuggestions(false);
                      setSearchPlace('');
                    }}
                  >
                    {place.display_name}
                  </MenuItem>
                ))}
              </Box>
            )}

            {/* Filters: Batch and Department */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { label: 'Select Batch', type: 'batch', options: batches },
                { label: 'Select Department', type: 'department', options: departments },
              ].map(({ label, type, options }) => (
                <FormControl fullWidth key={type}>
                  <InputLabel>{label}</InputLabel>
                  <Select
                    multiple
                    value={selectedFilters[type] || []}
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

        {/* Active Filter Chips */}
        <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {Object.entries(selectedFilters).flatMap(([key, values]) =>
            (Array.isArray(values) ? values : [values]).filter(Boolean).map((value) => (
              <Chip
                key={`${key}-${value}`}
                label={value}
                onDelete={() => removeFilter(key, value)}
                deleteIcon={<Close />}
                sx={{ backgroundColor: '#007bff', color: '#fff' }}
              />
            ))
          )}
        </Box>
      </Box>
    </motion.div>
  );
};

export default SearchOptions;
