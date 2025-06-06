import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Avatar,
  TextField,
  Typography,
  Box,
  IconButton,
  Button,
  CardContent,
  Divider,
  Stack,
  Chip,
} from "@mui/material";
import {
  Article,
  Edit,
  SentimentDissatisfiedOutlined,
  Verified,
  VolunteerActivism,
} from "@mui/icons-material";

import { getAuth } from "../../features/users/AuthSlice";

import ProfileContainer from "./ProfileContainer";
import {
  fetchSelectedUser,
  searchUser,
} from "../../features/Search/searchPeopleSlice";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

function UserProfile() {
  const { auth } = useSelector(getAuth);
  const navigate = useNavigate();
  const isLoggedIn = auth?.isLoggedIn;
  const { user } = useSelector(searchUser || []);

  const selectedUser = useSelector(searchUser || []);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [nameText, setNameText] = useState(auth.user?.name || "Guest User");
  const [headlineText, setHeadlineText] = useState(
    user?.headline || "Software Developer | Tech Enthusiast"
  );
  const dispatch = useDispatch();
  const [visibleCount, setVisibleCount] = useState(5);

  const hasMore = visibleCount < selectedUser?.events?.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };
  const handleShowLess = () => {
    setVisibleCount(5);
  };
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    dispatch(fetchSelectedUser(auth.user._id));
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#F3F2EF",
        padding: "40px 0",
      }}
    >
      <Box
        sx={{
          width: {xs: "95%", sm: "80%", md: "70%" },
          margin: "0 auto",
        }}
      >
        <Card
          sx={{
            borderRadius: "10px",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.15), 0 2px 3px rgba(0,0,0,0.2)",
            marginBottom: "20px",
            overflow: "visible",
          }}
        >
          <Box
            sx={{
              height: "200px",
              backgroundColor: "#1976D2",
              position: "relative",
            }}
          >
            <Avatar
              src={user?.profileImage}
              alt="Profile Picture"
              sx={{
                width: 150,
                height: 150,
                border: "4px solid #fff",
                boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                position: "absolute",
                bottom: "-50px",
                left: "40px",
              }}
            />

            <IconButton
              sx={{
                position: "absolute",
                right: "20px",
                bottom: "20px",
                backgroundColor: "white",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
              onClick={() => setIsEditingProfile(!isEditingProfile)}
            >
              <Edit />
            </IconButton>
          </Box>
          <Box sx={{ padding: "70px 40px 30px" }}>
            {isEditingProfile ? (
              <Box
                component="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log("Updated Profile Data:", {
                    name: nameText,
                    headline: headlineText,
                  });
                  //dispatch(updateUserProfile({ name: nameText, headline: headlineText }));
                  setIsEditingProfile(false); // Exit edit mode
                }}
              >
                <TextField
                  fullWidth
                  label="Name"
                  value={nameText}
                  onChange={(e) => setNameText(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Headline"
                  value={headlineText}
                  onChange={(e) => setHeadlineText(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => setIsEditingProfile(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" type="submit">
                    Save
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  {nameText}{" "}
                  {isLoggedIn && (
                    <Verified
                      sx={{
                        color: "#0077B5",
                        fontSize: 28,
                        verticalAlign: "middle",
                      }}
                    />
                  )}
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mt: 1 }}>
                  {headlineText}
                </Typography>
              </>
            )}


          </Box>
        </Card>
        
        <ProfileContainer user={user} />
      
                  <>
              {selectedUser.posts?.length > 0 ? (
                <Box
                  mt={5}
                  sx={{
                    background: "rgba(255,255,255,0.6)",
                    padding: "5px 5px",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={2}
                    display="flex"
                    alignItems="center"
                  >
                    <Article sx={{ mr: 1 }} /> Posts
                  </Typography>
                  <Slider {...sliderSettings}>
                    {selectedUser.posts.map((post, index) => (
                      <Box key={index}>
                        <Card
                          sx={{
                            width: 280,
                            height: 300,
                            borderRadius: 3,
                            overflow: "hidden",
                            position: "relative",
                            boxShadow: 4,
                            backgroundColor: "#fff",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            navigate(`/post/view/${post._id}`);
                          }}
                        >
                          <Box
                            sx={{
                              height: "100%",
                              backgroundImage: `url(${post.media?.[0] || "/no-image.jpg"})`,
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              position: "relative",
                            }}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                bottom: 8,
                                left: 8,
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "rgba(0,0,0,0.5)",
                                borderRadius: "20px",
                                px: 1,
                                py: 0.5,
                              }}
                            >
                              <Avatar
                                src={
                                  selectedUser.user.profileImage ||
                                  "/default-avatar.png"
                                }
                                sx={{ width: 24, height: 24, mr: 1 }}
                              />
                              <Typography
                                variant="caption"
                                sx={{ color: "white", fontWeight: 500 }}
                              >
                                {post.username}
                              </Typography>
                            </Box>
                          </Box>
                        </Card>
                      </Box>
                    ))}
                  </Slider>
                </Box>
              ) : (
                <Box
                  sx={{
                    textAlign: "center",
                    mt: 5,
                    background: "rgba(255,255,255,0.6)",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={2}
                    display="flex"
                    alignItems="center"
                  >
                    <Article sx={{ mr: 1 }} /> Posts
                  </Typography>
                  <SentimentDissatisfiedOutlined
                    sx={{ fontSize: 80, color: "#b0b0b0" }}
                  />
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ mt: 2, color: "#555" }}
                  >
                    No Posts available for now
                  </Typography>
                </Box>
              )}

              {selectedUser.events?.length > 0 ? (
                <Box mt={5} sx={{ background: "rgba(255,255,255,0.6)", p: 2 }}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={2}
                    display="flex"
                    alignItems="center"
                  >
                    <Verified sx={{ mr: 1 }} />
                    Events
                  </Typography>

                  {selectedUser.events
                    .slice(0, visibleCount)
                    .map((event, index) => (
                      <Box
                        key={index}
                        sx={{
                          backgroundColor: "rgba(255, 255, 255, 0.95)",
                          borderRadius: 4,
                          boxShadow: 4,
                          p: 3,
                          mb: 3,
                          maxWidth: 700,
                          mx: "auto",
                        }}
                        onClick={() => {
                          navigate(`/donations/view/${event._id}`);
                        }}
                      >
                        <Typography variant="h5" fontWeight="bold">
                          {event.title}
                          {event.verified && (
                            <Verified sx={{ color: "primary.main", ml: 1 }} />
                          )}
                        </Typography>

                        <Typography
                          variant="subtitle1"
                          color="text.secondary"
                          gutterBottom
                        >
                          Organized by: {event.name} ({event.department}) •{" "}
                          {event.email}
                        </Typography>

                        <Typography variant="body2" mt={1}>
                          {event.description}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Stack direction="row" spacing={2}>
                          <Chip
                            label={`Date: ${event.date}`}
                            color="info"
                            variant="outlined"
                          />
                          <Chip
                            label={`Time: ${event.time}`}
                            color="info"
                            variant="outlined"
                          />
                        </Stack>
                      </Box>
                    ))}

                  <Box textAlign="center">
                    {hasMore ? (
                      <Button variant="outlined" onClick={handleShowMore}>
                        Show More
                      </Button>
                    ) : (
                      selectedUser.events.length > 5 && (
                        <Button variant="text" onClick={handleShowLess}>
                          Show Less
                        </Button>
                      )
                    )}
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    textAlign: "center",
                    mt: 5,
                    background: "rgba(255,255,255,0.6)",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={2}
                    display="flex"
                    alignItems="center"
                  >
                    <Article sx={{ mr: 1 }} /> Events
                  </Typography>
                  <SentimentDissatisfiedOutlined
                    sx={{ fontSize: 80, color: "#b0b0b0" }}
                  />
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ mt: 2, color: "#555" }}
                  >
                    No Events available for now
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#777", mt: 1 }}>
                    Try again later or explore other sections
                  </Typography>
                </Box>
              )}

              {selectedUser.donations?.length > 0 ? (
                <Box mt={5} mb={4}>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={2}
                    display="flex"
                    alignItems="center"
                  >
                    <VolunteerActivism sx={{ mr: 1 }} /> Donations
                  </Typography>
                  <Slider {...sliderSettings} style={{ padding: "0 2px" }}>
                    {selectedUser.donations.map((donation, index) => (
                      <Box key={index} px={1.5}>
                        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                          <CardContent>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {donation.campaignName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              ₹{donation.amount} •{" "}
                              {new Date(donation.date).toLocaleDateString()}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Box>
                    ))}
                  </Slider>
                </Box>
              ) : (
                <Box
                  sx={{
                    textAlign: "center",
                    mt: 5,
                    background: "rgba(255,255,255,0.6)",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    mb={2}
                    display="flex"
                    alignItems="center"
                  >
                    <Article sx={{ mr: 1 }} /> Donation
                  </Typography>
                  <SentimentDissatisfiedOutlined
                    sx={{ fontSize: 80, color: "#b0b0b0" }}
                  />
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ mt: 2, color: "#555" }}
                  >
                    No Donations available for now
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#777", mt: 1 }}>
                    Try again later or explore other sections
                  </Typography>
                </Box>
              )}
            </>
      
      </Box>
    </Box>
  );
}

export default UserProfile;
