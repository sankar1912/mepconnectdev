import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'

function SlideShow() {
  return (
    <Box id="about" sx={{ px: { xs: 2, md: 5 }, py: 5 }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src="/Assets/img/donate.png"
                    alt="Mepco Schlenk Engineering College"
                    style={{
                      width: "100%",
                      maxWidth: "300px",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography
                  variant="h3"
                  sx={{
                    color: "black",
                    fontFamily: "Poppins",
                    fontWeight: "bold",
                  }}
                >
                  Donations
                </Typography>

                <Box
                  sx={{
                    background:
                      "linear-gradient(-90deg, rgba(0, 162, 255, 0.6),rgba(255,255,255,0.7))",
                    padding: "20px",
                    borderRadius: "20px",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 2,
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
                    dedication to providing a comprehensive learning experience
                    is reflected in a wide array of academic programs,
                    pioneering research initiatives, and a diverse range of
                    extracurricular activities, designed to cultivate talent and
                    ignite passion in every field of interest.
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
              </Grid>
            </Grid>
          </Box>
  )
}

export default SlideShow