import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { EmailOutlined, VpnKeyOutlined } from "@mui/icons-material";
import { Link,  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAuth, getStatus,loginRequest } from "../../features/users/AuthSlice";
import { useNotifications } from "@toolpad/core";


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {auth}=useSelector(getAuth)
  const navigate = useNavigate();

  const notification=useNotifications();

  const handleLogin = async (email, password) => {
    dispatch(loginRequest({email:email,password:password}))
  };

useEffect(()=>{
  console.log(auth)
  if(auth.isLoggedIn){
   notification.show("Login Success",{
    severity:'success',autoHideDuration:3000
   })
    navigate('/')
  }
  else{
    notification.show("Login Failed",{
      severity:'error',autoHideDuration:3000
     })
  }
},[auth])

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 600, color: "#333", mb: 3, textAlign: "center" }}>
        Login
      </Typography>

      <TextField
        label="Email Address"
        variant="outlined"
        fullWidth
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{
          background: "rgba(255,255,255,0.7)",
          mb: 3,
          "& .MuiInputLabel-root": { fontSize: "1rem", color: "#444" },
          "& .MuiInputBase-root": { borderRadius: "8px" },
        }}
        InputProps={{
          startAdornment: (
            <IconButton sx={{ padding: 0, color: "#2575fc" }}>
              <EmailOutlined />
            </IconButton>
          ),
        }}
      />

      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{
          background: "rgba(255,255,255,0.7)",
          mb: 3,
          "& .MuiInputLabel-root": { fontSize: "1rem", color: "#444" },
          "& .MuiInputBase-root": { borderRadius: "8px" },
        }}
        InputProps={{
          startAdornment: (
            <IconButton sx={{ padding: 0, color: "#2575fc" }}>
              <VpnKeyOutlined />
            </IconButton>
          ),
        }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          mb: 3,
          "&:hover": {
            backgroundColor: "#1d66b3",
            boxShadow: 4,
          },
          padding: "12px",
          fontSize: "1.1rem",
        }}
        onClick={() => handleLogin(email, password)}
      >
        Login
      </Button>

      {/* Links Section */}
      <Grid container justifyContent="center" spacing={1}>
        <Grid item xs={6}>
          <Link
            href="/register"
            variant="body2"
            sx={{ color: "#2575fc", fontWeight: 600 }}
          >
            New user? Register here
          </Link>
        </Grid>
        <Grid item xs={6} onClick={()=>{
          navigate("/user/forgotpassword")
        }}>
          <Link
            variant="body2"
            sx={{ color: "#2575fc", fontWeight: 600 }}
            
          >
            Forgot password?
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
