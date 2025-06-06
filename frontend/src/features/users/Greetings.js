import React from "react";
import { useSelector } from "react-redux";
import { getAuth } from "./AuthSlice";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Grid,
  Button,
  Box,
} from "@mui/material";
import {
  Edit,
  Email,
  School,
  CalendarToday,
  CheckCircleOutline,
  WbSunny,
  LightMode,
  Brightness5,
  NightsStay,
  FreeBreakfast,
  LocalFireDepartment,
  HomeWork,
  Badge,
  Timelapse,
  Verified,
  Pending,
} from "@mui/icons-material";
import postbg from '../../img/postbg.png';

function Greetings() {
  const { auth } = useSelector(getAuth);
  const user = auth?.user || {};
  const isLoggedIn = auth?.isLoggedIn;

  const hour = new Date().getHours();

  let greetingMessage = "Hello!";
  let GreetingIcon = WbSunny; 

  if (hour >= 5 && hour < 12) {
    greetingMessage = "Good Morning!";
    GreetingIcon = LightMode;
  } else if (hour >= 12 && hour < 17) {
    greetingMessage = "Good Afternoon!";
    GreetingIcon = Brightness5;
  } else if (hour >= 17 && hour < 21) {
    greetingMessage = "Good Evening!";
    GreetingIcon = FreeBreakfast;
  } else {
    greetingMessage = "Good Night! Take a Break.";
    GreetingIcon = NightsStay;
  }

  return (
    <Card
      sx={{
       position:'fixed',
        borderRadius: "16px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 12px 24px rgba(0, 0, 0, 0.3)",
        },
        marginTop: "20px",
        marginLeft:'20px',
        width:'22%',
        backgroundImage:`url(${postbg})`,
        backgroundSize: "cover",
    backgroundPosition: "center",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <Avatar
            src={user.profileImage || "/static/images/avatar.png"}
            
            sx={{
              width: 120,
              height: 120,
              border: "4px solid #fff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          />
          <Typography variant="h5" sx={{ fontWeight: "bold", fontFamily:'Poppins' }}>
            {user.name || "Guest User"} {user.verified===true ?(<Verified color="info"/>):(<Pending/>)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <GreetingIcon fontSize="small" sx={{ verticalAlign: "middle", marginRight: "8px" }} />
            {isLoggedIn ? greetingMessage : "You're not logged in."}
          </Typography>
         
        </Box>
        <Grid container spacing={2} sx={{ marginTop: "16px", textAlign: "left" }}>
          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
              <Email fontSize="small" sx={{ verticalAlign: "middle", marginRight: "8px" }} />
              Email: {user.email || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
              <HomeWork fontSize="small" sx={{ verticalAlign: "middle", marginRight: "8px" }} />
              Department: {user.department || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
              <Badge fontSize="small" sx={{ verticalAlign: "middle", marginRight: "8px" }} />
              Degree: {user.degree || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
              <Timelapse fontSize="small" sx={{ verticalAlign: "middle", marginRight: "8px" }} />
              Batch: {user.batch || "N/A"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
              <CalendarToday fontSize="small" sx={{ verticalAlign: "middle", marginRight: "8px" }} />
              Account Created On: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
            </Typography>
          </Grid>
          
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Greetings;
