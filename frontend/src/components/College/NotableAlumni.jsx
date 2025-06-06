import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const alumni = [
    {
      image: "/Assets/img/alumni/alumni1.jpg",
      name: "Dr. Karthik Ramesh",
      designation: "Senior Software Engineer, Google",
      thought:
        "Mepco provided me with the right blend of technical skills and soft skills, shaping my career in the tech industry.",
    },
    {
      image: "/Assets/img/alumni/alumni2.jpg",
      name: "Ms. Priya Sharma",
      designation: "Product Manager, Microsoft",
      thought:
        "The foundation laid at Mepco helped me adapt to the ever-changing landscape of technology and innovation.",
    },
    {
      image: "/Assets/img/alumni/alumni3.jpg",
      name: "Mr. Arjun Varma",
      designation: "Founder & CEO, TechStart Innovations",
      thought:
        "Entrepreneurship is a journey, and Mepco instilled in me the confidence to take the leap.",
    },
    {
      image: "/Assets/img/alumni/alumni4.jpg",
      name: "Dr. Anitha Krishnan",
      designation: "Research Scientist, NASA",
      thought:
        "Mepco’s emphasis on research and innovation played a crucial role in my career as a scientist.",
    },
    {
      image: "/Assets/img/alumni/alumni5.jpg",
      name: "Mr. Rahul Menon",
      designation: "CTO, FinTech Solutions",
      thought:
        "The strong problem-solving skills I developed at Mepco have been the key to my success in the FinTech sector.",
    },
  ];
  

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 1 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 1 },
  tablet: { breakpoint: { max: 768, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};

const NotableAlumni = () => {
  return (
    <Box id="alumni" sx={{ px: { xs: 2, md: 5 }, py: 5 }}>
      <Typography variant="h5" sx={{ color: "black", fontWeight: "bold", textAlign: "center", mb: 3 }}>
        Notable Alumni
      </Typography>
      <Carousel responsive={responsive} autoPlay={true} infinite={true} autoPlaySpeed={3000}>
        {alumni.map((person, index) => (
          <Card key={index} sx={{ display: "flex", alignItems: "center", p: 2, m: 2, borderRadius: 3,  color: "black", boxShadow: "0px 4px 10px rgba(0,0,0,0.3)", width:'90%', mx: "auto" }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <img src={person.image} alt={person.name} style={{ width: "100%", borderRadius: 10 }} />
              </Grid>
              <Grid item xs={8}>
                <CardContent sx={{ textAlign: "justify" }}>
                  <Typography variant="h6" fontWeight="bold">{person.name}</Typography>
                  <Typography variant="subtitle1" sx={{ fontStyle: "italic" }}>{person.designation}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}><strong>Thought:</strong> {person.thought}</Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Carousel>
    </Box>
  );
};

export default NotableAlumni;




