// HelperCard.js
import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import GroupIcon from "@mui/icons-material/Group";
import { motion } from "framer-motion";
import { minHeight } from "@mui/system";

const cardStyles = {
  borderRadius: "24px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
  overflow: "hidden",
  height: "100%", // Ensure equal height
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight:250
};

const iconHoverAnimation = {
  whileHover: { scale: 1.2, rotate: 10 },
  transition: { type: "spring", stiffness: 300 },
};
const ContentVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut", delay: 0.3 },
  },
};

const HelperCard = () => {
  return (
    <Grid container spacing={4} justifyContent="center">
      {/* Become a Helper Card */}

      <Grid item xs={12} md={4}>
        <motion.div
          variants={ContentVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
        >
          <Card
            sx={{
              ...cardStyles,
              background: "linear-gradient(135deg, #fef6f9, #ffe4ec)",
            }}
          >
            <CardContent sx={{ p: 4, flexGrow: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 900,
                  color: "#c2185b",
                  mb: 2,
                  textAlign: "center",
                  fontFamily: "'Pacifico', cursive",
                }}
              >
                Become a Helper
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#555",
                  fontSize: "15px",
                  textAlign: "center",
                  lineHeight: 1.5,
                }}
              >
                Spread kindness and support by lending a hand to those in need.
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <motion.div {...iconHoverAnimation}>
                <FavoriteIcon
                  sx={{
                    fontSize: "80px",
                    color: "#e91e63",
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
                  }}
                />
              </motion.div>
            </Box>
          </Card>
        </motion.div>
      </Grid>

      {/* We Offer Jobs Card */}
      <Grid item xs={12} md={4}>
        <motion.div
          variants={ContentVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
        >
          <Card
            sx={{
              ...cardStyles,
              background: "linear-gradient(135deg, #42a5f5, #478ed1)",
            }}
          >
            <CardContent sx={{ p: 4, flexGrow: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 900,
                  color: "white",
                  transform: "skewX(-10deg)",
                  letterSpacing: "1px",
                  mb: 1,
                  fontFamily: "cursive",
                  textAlign: "center",
                }}
              >
                Create Jobs
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#e3f2fd",
                  fontSize: "15px",
                  textAlign: "center",
                  lineHeight: 1.5,
                }}
              >
                Explore careers and join our growing team. Shape your future
                with us!
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
              <motion.div {...iconHoverAnimation}>
                <WorkOutlineIcon
                  sx={{
                    fontSize: "80px",
                    color: "#fff",
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
                  }}
                />
              </motion.div>
            </Box>
          </Card>
        </motion.div>
      </Grid>

      {/* Join Our Community Card */}
      <Grid item xs={12} md={4}>
        <motion.div
          variants={ContentVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
        >
          <Card
            sx={{
              ...cardStyles,
              background: "linear-gradient(135deg, #f9f9f9, #e0e0e0)",
            }}
          >
            <CardContent sx={{ p: 4, flexGrow: 1 }}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 900,
                  color: "#222",
                  transform: "skewX(-10deg)",
                  letterSpacing: "1px",
                  mb: 1,
                  fontFamily: "cursive",
                  textAlign: "center",
                }}
              >
                Join Our <span style={{
                  fontWeight: 600,
                  color: "#1976d2",
                  transform: "skewX(10deg) rotate(-2deg)",
                  textDecoration: "underline wavy #1976d2",
                  letterSpacing: "2px",
                  fontFamily: "'Pacifico', cursive",
                  textAlign: "center",
                  mb: 2,
                }}>Community</span>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#444",
                  fontSize: "15px",
                  textAlign: "center",
                  fontStyle: "italic",
                  lineHeight: 1.5,
                }}
              >
                Connect. Collaborate. Grow together!
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <motion.div {...iconHoverAnimation}>
                <GroupIcon
                  sx={{
                    fontSize: "80px",
                    color: "#e53935",
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                  }}
                />
              </motion.div>
            </Box>
          </Card>
        </motion.div>
      </Grid>
    </Grid>
  );
};

export default HelperCard;
