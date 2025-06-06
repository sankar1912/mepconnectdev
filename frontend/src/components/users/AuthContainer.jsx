import React, { act, useState } from "react";
import { Container, Box, Grid, Typography } from "@mui/material";
import Login from "./Login";
import SignUp from "./SignUp";

const AuthContainer = () => {
  const [activeTab, setActiveTab] = useState("login");

  const handleToggleTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Container
      component="main" top={20}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        backgroundImage: "url(/Assets/img/loginbg.avif)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "30px",
        padding: "2vw",
        marginTop: "5vh",
        
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={5} >
          <img
            src="/Assets/img/mepco.png"
            style={{ width: "60%", height: '60%' }}
            alt="none"

          />
          <Typography sx={{ color: "white",fontFamily:'Poppins', textAlign:'center' }} variant="h5">
            <strong>Mepco Schlenk Engineering College(Autonomous),<br/>Sivakasi</strong>
          </Typography>
        </Grid>

        <Grid item xs={12} sm={7} justifyContent="center">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 4,
              borderRadius: 4,
              boxShadow: 3,
              background: "rgba(255,255,255,0.7)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: 6,
              },
            }}
          >
            {/* Toggle Tab Section */}
            <Box
              sx={{
                display: "flex",
                borderRadius: "25px",
                overflow: "hidden",
                width: "100%",
                maxWidth: "300px",
                border: "1px solid rgb(25, 118, 210)",
                mb: 3,
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  width: "50%",
                  height: "100%",
                  backgroundColor: activeTab === "login" ? "rgb(25, 118, 210)" : "white",
                  borderRadius: "25px",
                  transition: "transform 0.3s ease",
                  transform: activeTab === "login" ? "translateX(0)" : "translateX(100%)",
                }}
              />
              <Typography
                onClick={() => handleToggleTab("login")}
                sx={{
                  flex: 1,
                  textAlign: "center",
                  lineHeight: "40px",
                  cursor: "pointer",
                  color: activeTab === "login" ? "white" : "black",
                  zIndex: 1,
                }}
              >
                Login
              </Typography>
              <Typography
                onClick={() => handleToggleTab("signup")}
                sx={{
                  flex: 1,
                  textAlign: "center",
                  lineHeight: "40px",
                  cursor: "pointer",
                  color: activeTab === "signup" ? "rgb(25, 118, 210)" : "white",
                  zIndex: 1,
                }}
              >
                Sign Up
              </Typography>
            </Box>

            {/* Form Section */}
            {activeTab === "login" ? (
              <Login />
            ) : (
              <SignUp  />
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AuthContainer;
