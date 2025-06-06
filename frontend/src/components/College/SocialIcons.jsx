import React from "react";
import { Button, IconButton } from "@mui/material";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";

const SocialIcons = () => {
  return (
   <>
    <div style={{
      position: "fixed",
      right: "20px",
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      background: "rgba(0, 0, 0, 0.4)",
      padding: "10px",
      borderRadius: "8px",
      zIndex:100
    }}>
      <IconButton color="primary" href="https://facebook.com">
        <Facebook style={{ color: "white" }} />
      </IconButton>
      <IconButton color="secondary" href="https://instagram.com">
        <Instagram style={{ color: "white" }} />
      </IconButton>
      <IconButton color="primary" href="https://linkedin.com">
        <LinkedIn style={{ color: "white" }} />
      </IconButton>
      <IconButton color="primary" href="https://twitter.com">
        <Twitter style={{ color: "white" }} />
      </IconButton>
      
    </div>
    
   </>
  );
};

export default SocialIcons;
