import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {  useSelector } from "react-redux";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1024 }, items: 1 },
  desktop: { breakpoint: { max: 1024, min: 768 }, items: 1 },
  tablet: { breakpoint: { max: 768, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 }
};

const DepartmentEvents = () => {
  const { events = [] } =  useSelector(state=>state.events);
  console.log(events)
  return (
    <Box id="events" sx={{ px: { xs: 2, md: 5 }, py: 5 }}>
      <Typography variant="h5" sx={{ color: "black", fontWeight: "bold", textAlign: "center", mb: 3 }}>
        Notable Events
      </Typography>
      <Carousel responsive={responsive} autoPlay={true} infinite={true} autoPlaySpeed={3000}>
        {events.map((person, index) => (
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

export default DepartmentEvents;




