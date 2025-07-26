import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  IconButton,
  Paper,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { EmailOutlined, Person2, VpnKeyOutlined, PhotoCamera } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser, getAuth, loadUserRequest } from "../../redux/slice/AuthSlice";
import { useNotifications } from "@toolpad/core";
import Compressor from "compressorjs";
import useCloudinaryImage from "../hooks/useCloudinaryImage";
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
const degrees = [ { name: "BE/BTech", duration: 4 }, { name: "ME/MTech", duration: 2 }, { name: "PhD", duration: 5 } ];

const getBatchOptions = (duration) => {
  const startYear = 1987;
  const currentYear = new Date().getFullYear();
  let batchOptions = [];
  for (let year = startYear; year <= currentYear - duration; year++) {
    batchOptions.push(`${year}-${year + duration}`);
  }
  return batchOptions.reverse(); 
};




const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [degree, setDegree] = useState("");
  const [department, setDepartment] = useState("");
  const [batch, setBatch] = useState("");
  const [batchOptions, setBatchOptions] = useState([]);
  const [place, setPlace] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [profileImageURL, setProfileImageURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeSuggestions, setPlaceSuggestions] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);
  const notification = useNotifications();

  const { uploadImages, uploading, imageUrls } = useCloudinaryImage();



  useEffect(() => {
    if (auth.status === "failed") {
      notification.show("Account creation failed", { severity: "error", autoHideDuration: 3000 });
    } else if (!auth.error) {
      notification.show("Account creation Success", { severity: "success", autoHideDuration: 3000 });
    }
  }, [auth.isLoggedIn,auth.status,notification,auth.error]);

  useEffect(() => {
    if (degree) {
      const selectedDegree = degrees.find((d) => d.name === degree);
      if (selectedDegree) {
        setBatchOptions(getBatchOptions(selectedDegree.duration));
      }
    }   
  }, [degree]);

  useEffect(()=>{
    if(!uploading){
      setProfileImage(imageUrls);
      setProfileImageURL(imageUrls);
    }
  },[uploading,imageUrls])
  const handleImageChange =async (event) => {
    const file = event.target.files[0];
    await uploadImages(file,'profiles');
    
  };

  const fetchPlaces = async (query) => {
    if (query.length < 3) {
      setPlaceSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      const data = await response.json();
      setPlaceSuggestions(data.map((place) => place.display_name));
    } catch (error) {
      console.error("Error fetching place suggestions:", error);
    }
  };

  const handlePlaceChange = (e) => {
    const value = e.target.value;
    setPlace(value);
    fetchPlaces(value);
  };

  const handleSelectPlace = (selectedPlace) => {
    setPlace(selectedPlace);
    setPlaceSuggestions([]);
  };


  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      notification.show("Password donot match",{
        autoHideDuration:3000,
        severity:"error"
      })
      return;
    }

    setLoading(true);
    try {
      dispatch(createUser({ name, email, password, batch, degree, department, place, profileImage: profileImageURL }));
      navigate('/')
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("Error during sign-up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}  >
        <Typography variant="h5" sx={{ fontWeight: 600, color: "#2575fc", textAlign: "center", mb: 3 }}>
          Sign Up
        </Typography>

        <form onSubmit={handleSignUp}>
          <Grid container justifyContent="center" sx={{ mb: 2 }}>
            <input
              accept="image/*"
              type="file"
              id="profile-image"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="profile-image">
              <IconButton component="span">
                <Avatar sx={{ width: 80, height: 80 }} src={profileImage}>
                  <PhotoCamera />
                </Avatar>
              </IconButton>
            </label>
          </Grid>

          <TextField label="Full Name" fullWidth required value={name} onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }} InputProps={{ startAdornment: <Person2 color="primary" sx={{ mr: 1 }} /> }} />

          <TextField label="Email Address" fullWidth required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }} InputProps={{ startAdornment: <EmailOutlined color="primary" sx={{ mr: 1 }} /> }} />

          <TextField label="Password" fullWidth required type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }} InputProps={{ startAdornment: <VpnKeyOutlined color="primary" sx={{ mr: 1 }} /> }} />

          <TextField label="Confirm Password" fullWidth required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 2 }} InputProps={{ startAdornment: <VpnKeyOutlined color="primary" sx={{ mr: 1 }} /> }} />
             <TextField label="Place/City" fullWidth required value={place} onChange={handlePlaceChange}
            sx={{ mb: 2 }} />
{placeSuggestions.length > 0 && (
            <Paper>
              <List>
                {placeSuggestions.map((suggestion, index) => (
                  <ListItemButton key={index} onClick={() => handleSelectPlace(suggestion)}>
                    <ListItemText primary={suggestion} />
                  </ListItemButton>
                ))}
              </List>
            </Paper>
          )}

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Department</InputLabel>
            <Select value={department} onChange={(e) => setDepartment(e.target.value)} required>
              {departments.map((dept) => <MenuItem key={dept} value={dept}>{dept}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Degree</InputLabel>
            <Select value={degree} onChange={(e) => setDegree(e.target.value)} required>
              {degrees.map((deg) => <MenuItem key={deg.name} value={deg.name}>{deg.name}</MenuItem>)}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Batch</InputLabel>
            <Select value={batch} onChange={(e) => setBatch(e.target.value)} required disabled={!degree}>
              {batchOptions.map((batchOption) => <MenuItem key={batchOption} value={batchOption}>{batchOption}</MenuItem>)}
            </Select>
          </FormControl>

          <Button type="submit" variant="contained" fullWidth sx={{ mb: 3, py: 1.5, fontSize: "1rem", background: "#2575fc", "&:hover": { background: "#1d66b3" } }}
            disabled={loading}>{loading ? "Signing Up..." : "Sign Up"}</Button>
        </form>

        <Grid container justifyContent="center" spacing={1}>
          <Grid item>
            <Link to="/login" style={{ textDecoration: "none", fontWeight: 600, color: "#2575fc" }}>
              Already have an account? Login here
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignUp;
