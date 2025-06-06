import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Button,
  Box,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Grid,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useMediaQuery } from "@mui/material";
import SocialIcons from "./SocialIcons";
import SelectActionCard from "./SelectActionCard";
import { useNavigate } from "react-router-dom";
import DepartmentEvents from "./DepartmentEvents";
import { useDispatch } from "react-redux";
import { getEvents } from "../../features/feeds/eventsSlice";
import NotableAlumni from "./NotableAlumni";
import SlideShow from "./SlideShow";
import HelperCard from "./HelperCard";
import JourneyNotes from "./JourneyNotes";

const LandingPage = ({ setStart }) => {
  const imageVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
  };

  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut", delay: 0.3 },
    },
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoFullWidth, setVideoFullWidth] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [selectedOpt, setSelectedOpt] = useState("");
  const menuList = [
    { name: "Administration", loc: "admin" },
    { name: "Academics", loc: "academics" },
    { name: "About", loc: "about" },
    { name: "Contact", loc: "contact" },
    { name: "Get Started", loc: "main" },
  ];

  const address =
    "\nMepco Schlenk Engineering College Campus, Mepco Schlenk Engineering College Post, Sivakasi – 626005,\nVirudhunagar District, Tamilnadu, India.";
  const phoneNumber = "+91-4562-235000 (30 Lines)";
  // const mapPosition = [9.525360975955065, 77.85359498936283];
  const email = "msec@mepcoeng.ac.in";
  const scrollToSection = (sectionId) => {
    setMenuOpen(false);
    if (sectionId === "main") {
      setStart(true);
      localStorage.setItem("start", true);
    }
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const videoElement = document.getElementById("intro-video");
      if (videoElement) {
        const rect = videoElement.getBoundingClientRect();
        setVideoFullWidth(rect.top <= 10);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEvents());
  });

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.41)",
          color: "black",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <img
              style={{ width: 60, height: 60 }}
              src="/Assets/img/mepco.png"
              alt="Mepco Logo"
            />
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, gap: "20px" }}>
            {menuList.map((item, index) => (
              <Button
                key={index}
                onClick={() => {
                  scrollToSection(item.loc);
                  setSelectedOpt(item.name);
                }}
                sx={{ fontFamily: "Poppins", fontSize: "1rem" }}
              >
                {item.name}
              </Button>
            ))}
          </Box>

          {isMobile && (
            <IconButton
              onClick={() => {
                setMenuOpen(true);
              }}
              
            >
              <MenuIcon color="primary" />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <Box sx={{ width: 250 }}>
          <IconButton
            onClick={() => setMenuOpen(false)}
            sx={{ display: "flex", justifyContent: "flex-end", padding: 2 }}
          >
            <CloseIcon color="primary" />
          </IconButton>
          <List>
            {menuList.map((item, index) => (
              <ListItem
                button
                key={index}
                onClick={() => scrollToSection(item.loc)}
              >
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <SocialIcons />

      <Box sx={{ paddingTop: "20vh" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontFamily: "Poppins" }}>
            <strong>
              <big>
                {" "}
                Hello{" "}
                <span style={{ color: "rgb(25, 118, 210)" }}>Alumni!</span>
              </big>
              <br />
              <Divider />
              Mepco Schlenk Engineering College, Sivakasi
            </strong>
          </Typography>
        </Box>

        <video
          id="intro-video"
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: videoFullWidth ? "100%" : "80%",
            height: "100%",
            objectFit: "cover",
            maxWidth: "100%",
            transition: "width 0.5s ease-in-out",
            marginTop: "10vh",
            borderRadius: "25px",
          }}
        >
          <source src="/Assets/vid/intro.mp4" type="video/mp4" />
        </video>

        <section>
          <Box id="about" sx={{ px: { xs: 2, md: 5 }, py: 5 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <motion.div
                  variants={imageVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.4 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      borderRadius: "20px",
                      overflow: "hidden",
                    }}
                  >
                    <img
                      src="/Assets/img/mepco.png"
                      alt="Mepco Schlenk Engineering College"
                      style={{
                        width: "100%",
                        maxWidth: "300px",
                      }}
                      loading="lazy"
                    />
                  </Box>
                </motion.div>
              </Grid>

              <Grid item xs={12} md={6}>
                <motion.div
                  variants={textVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ amount: 0.4 }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      color: "black",
                      fontFamily: "Poppins",
                      fontWeight: "bold",
                    }}
                  >
                    About{" "}
                    <span
                      style={{ fontSize: "54px", color: "rgb(25, 118, 210)" }}
                    >
                      Mepco Schlenk
                    </span>{" "}
                    Engineering College
                  </Typography>

                  <Box
                    sx={{
                      background:
                        "linear-gradient(-90deg, rgb(25, 118, 210), rgba(255,255,255,0.7))",
                      padding: "20px",
                      borderRadius: "20px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      mt: 2,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: "black",
                        textAlign: "justify",
                        lineHeight: 1.6,
                      }}
                    >
                      Welcome to Mepco Schlenk Engineering College, a dynamic
                      center of knowledge, innovation, and boundless
                      opportunities. Located in the heart of Sivakasi, our
                      institution is a symbol of academic excellence, where
                      students embark on transformative educational journeys,
                      guided by distinguished faculty and supported by a vibrant
                      community of ambitious peers.
                    </Typography>

                    <Typography
                      variant="body1"
                      sx={{
                        mt: 2,
                        color: "black",
                        textAlign: "justify",
                        lineHeight: 1.6,
                      }}
                    >
                      At MSEC, we are committed to harnessing the power of
                      education to shape futures and inspire greatness. Our
                      dedication to providing a comprehensive learning
                      experience is reflected in a wide array of academic
                      programs, pioneering research initiatives, and a diverse
                      range of extracurricular activities, designed to cultivate
                      talent and ignite passion in every field of interest.
                    </Typography>
                  </Box>

                  <Button
                    href="https://www.mepcoeng.ac.in"
                    target="_blank"
                    sx={{
                      mt: 3,
                      background: "",
                      color: "black",
                      fontWeight: "bold",
                      "&:hover": {
                        background: "rgba(178, 164, 164, 0.49)",
                      },
                    }}
                  >
                    Visit Website
                  </Button>
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        </section>
        <Divider sx={{ fontWeight: "bold" }} />
        <Box id="about" sx={{ px: { xs: 2, md: 5 }, py: 5 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                variants={textVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{  amount: 0.4 }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    color: "black",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    mb: 2,
                  }}
                >
                  Our Principal
                </Typography>

                <Box
                  sx={{
                    position: "relative",
                    background:
                      "linear-gradient(90deg, rgb(25, 118, 210), rgba(255,255,255,0.8))",
                    padding: "30px",
                    borderRadius: "20px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    overflow: "hidden",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "black",
                      textAlign: "justify",
                      lineHeight: 1.8,
                      fontStyle: "italic",
                      fontSize: { xs: "16px", md: "18px" },
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    <span
                      style={{
                        fontSize: "80px",
                        color: "white",
                        fontFamily: "serif",
                        lineHeight: "0.5",
                        marginRight: "10px",
                        float: "left",
                      }}
                    >
                      “
                    </span>
                    Dream is not that which you see while sleeping and it is
                    something that does not let you sleep” – a famous quote by
                    Dr.Abdul Kalam. You should always dream high to scale up new
                    altitudes in your profession. To succeed in your mission,
                    you must have single-minded devotion towards your goal.
                    Wherever you serve, you should always be sincere, devoted
                    and dedicated. You must uphold the dignity of yourself, your
                    institution and the Nation by disciplined behavior showing
                    loyalty and integrity under all circumstances to win the
                    confidence of your employers and colleagues. Always
                    establish and maintain your professional ethics.
                    <span
                      style={{
                        fontSize: "80px",
                        color: "rgb(25, 118, 210)",
                        fontFamily: "serif",
                        lineHeight: "0.5",

                        float: "right",
                        fontStyle: "italic",
                      }}
                    >
                      ”
                    </span>
                  </Typography>
                </Box>

                <Typography
                  variant="h5"
                  sx={{
                    color: "black",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                    mt: 3,
                  }}
                >
                  <span
                    style={{ fontSize: "34px", color: "rgb(12, 129, 193)" }}
                  >
                    Dr.S. Arivazhagan
                  </span>{" "}
                  M.E., Ph.D.{" "}
                  <span
                    style={{ fontSize: "24px", color: "rgb(12, 129, 193)" }}
                  >
                    Principal
                  </span>
                </Typography>
              </motion.div>
            </Grid>

            <Grid item xs={12} md={6}>
              <motion.div
                variants={imageVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{  amount: 0.4 }}
              >
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src="/Assets/img/principal.jpg"
                    alt="Principal"
                    style={{
                      width: "80%",
                      
                      borderRadius: "20px",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    }}
                    loading="lazy"
                  />
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Box>

        <Divider  />
        <br />
        <br />
        <br />
        <Typography
                    variant="h3"
                    sx={{
                      color: "black",
                      fontFamily: "Poppins",
                      fontWeight: "bold",
                    }}
                  >
                    Here{" "}you{" "}
                    <span
                      style={{ fontSize: "54px", color: "rgb(25, 118, 210)" }}
                    >
                      Explore
                    </span>!!
                  </Typography>
                
                  <br />
                  <br />
        <HelperCard/>
        <br/><br/>
        <Divider />
        <JourneyNotes/>
        <br/>
        <br/>
        <Box
          id="contact"
          sx={{ px: { xs: 2, md: 5 }, py: 5, textAlign: "center" }}
        >
          <Typography
            variant="h3"
            sx={{ color: "black", fontFamily: "Poppins", fontWeight: "bold" }}
          >
            Contact Us
          </Typography>

          <Box
            sx={{
              width: "100px",
              height: "3px",
              backgroundColor: "black",
              margin: "10px auto 20px",
            }}
          ></Box>

          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} sx={{ textAlign: "left" }}>
              <Typography
                variant="h6"
                sx={{ color: "black", fontSize: "20px" }}
              >
                Feel free to reach out to us!
              </Typography>

              <Typography
                variant="body1"
                sx={{ color: "black", fontSize: "18px", mt: 2 }}
              >
                <strong>Address:</strong> <br />
                {address}
              </Typography>

              <Typography
                variant="body1"
                sx={{ color: "black", fontSize: "18px", mt: 2 }}
              >
                <strong>Phone:</strong> {phoneNumber}
              </Typography>

              <Typography
                variant="body1"
                sx={{ color: "black", fontSize: "18px", mt: 2 }}
              >
                <strong>Email:</strong> {email}
              </Typography>

              <Box sx={{ mt: 2 }}></Box>
            </Grid>

            <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
              <Box
                component="iframe"
                sx={{
                  width: "90%",
                  height: "350px",
                  borderRadius: "15px",
                  border: "none",
                  boxShadow: 2,
                }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.795634369296!2d77.84947511647749!3d9.526477260291959!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06d3287794055d%3A0x9c7b889bf154fb86!2sMepco%20Schlenk%20Engineering%20College!5e0!3m2!1sen!2sin!4v1703528868735!5m2!1sen!2sin"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default LandingPage;
