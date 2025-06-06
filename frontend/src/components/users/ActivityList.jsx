import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardMedia, Typography, Box, Avatar, Grid, IconButton, Button } from "@mui/material";
import { FavoriteBorder, ChatBubbleOutline, Share, ArrowBack, ArrowForward } from "@mui/icons-material";

function ActivityList() {
  const results = useSelector((state) => state.activity.results);

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 3 }}>
      <Grid container spacing={2}>
        {results.length > 0 ? (
          results.map((item, index) => (
            <Grid item xs={12} key={index}>
              <ActivityCard item={item} />
            </Grid>
          ))
        ) : (
          <Typography variant="h6" color="text.secondary" sx={{ textAlign: "center", width: "100%" }}>
            No activities found
          </Typography>
        )}
      </Grid>
    </Box>
  );
}

const ActivityCard = ({ item }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % item.media.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + item.media.length) % item.media.length);
  };

  return (
    <Card
      sx={{
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", padding: "10px" }}>
        <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
          {item.name?.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography fontWeight="bold">{item.name}</Typography>
          <Typography variant="caption" color="text.secondary">
            {new Date(item.createdAt).toLocaleString()}
          </Typography>
        </Box>
      </Box>

      {item.media.length > 0 && (
        <Box sx={{ position: "relative", width: "100%", height: "300px", overflow: "hidden" }}>
          <CardMedia
            component="img"
            height="300"
            image={item.media[currentImageIndex]}
            alt={`Activity Image ${currentImageIndex}`}
            sx={{ objectFit: "cover", width: "100%" }}
          />
          {item.media.length > 1 && (
            <>
              <Button
                onClick={handlePrev}
                sx={{
                  position: "absolute",
                  left: 5,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(0, 0, 0, 0.5)",
                  color: "#fff",
                  minWidth: "30px",
                  padding: "5px",
                  borderRadius: "50%",
                  "&:hover": { background: "rgba(0, 0, 0, 0.7)" },
                }}
              >
                <ArrowBack />
              </Button>
              <Button
                onClick={handleNext}
                sx={{
                  position: "absolute",
                  right: 5,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "rgba(0, 0, 0, 0.5)",
                  color: "#fff",
                  minWidth: "30px",
                  padding: "5px",
                  borderRadius: "50%",
                  "&:hover": { background: "rgba(0, 0, 0, 0.7)" },
                }}
              >
                <ArrowForward />
              </Button>
            </>
          )}
        </Box>
      )}
      <CardContent>
        <Typography variant="body1" fontWeight="bold">
          {item.text}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {item.hashtags?.map((tag, i) => (
            <Typography
              key={i}
              variant="caption"
              color="primary"
              sx={{ fontWeight: "bold", mr: 1 }}
            >
              #{tag}
            </Typography>
          ))}
        </Typography>
      </CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 1 }}>
        <IconButton>
          <FavoriteBorder /> <Typography sx={{ ml: 0.5 }}>{item.likes}</Typography>
        </IconButton>
        <IconButton>
          <ChatBubbleOutline /> <Typography sx={{ ml: 0.5 }}>{item.comments}</Typography>
        </IconButton>
        <IconButton>
          <Share /> <Typography sx={{ ml: 0.5 }}>{item.shares}</Typography>
        </IconButton>
      </Box>
    </Card>
  );
};

export default ActivityList;
