import React, { useEffect, useState } from "react";
import {
  Avatar,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Divider,
  Stack,
  Chip,
} from "@mui/material";
import {
  Article,
  VolunteerActivism,
  SentimentDissatisfiedOutlined,
  Verified,
  Pending,
  PersonAddAlt1,
  LockOutlined,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSelectedUser,
  searchUser,
} from "../features/Search/searchPeopleSlice";
import { useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchMyList } from "../features/friends/friendsSlice";
import { getAuth } from "../features/users/AuthSlice";

import PublicProfileContainer from "./PublicProfile/PublicProfileContainer";

function PublicProfile() {
  const [activeSection, setActiveSection] = useState("about");
  const selectedUser = useSelector(searchUser || []);
  const params = useParams();
  const dispatch = useDispatch();
  const handleShowLess = () => {
    setVisibleCount(5);
  };
  const { auth } = useSelector(getAuth);

  useEffect(() => {
    dispatch(fetchMyList(auth.user.email));
    if (params?._id) {
      dispatch(fetchSelectedUser(params._id));
    }
  }, [params._id, dispatch]);

  const [visibleCount, setVisibleCount] = useState(5);

  const hasMore = visibleCount < selectedUser?.events?.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
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

  const navigate = useNavigate();

  return (
    <Box sx={{ py: 5 }}>
      <Box sx={{ maxWidth: "900px", mx: "auto" }}>
        <Card sx={{ borderRadius: 3, overflow: "visible", mb: 3 }}>
          <Box
            sx={{
              height: "200px",
              background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
              position: "relative",
            }}
          >
            <Avatar
              src={
                selectedUser?.user?.profileImage || "/static/images/avatar.png"
              }
              sx={{
                width: 130,
                height: 130,
                border: "4px solid white",
                position: "absolute",
                bottom: -40,
                left: 30,
              }}
            />
          </Box>
          <Box sx={{ pb: 3 }}>
            <Typography variant="h4" fontWeight="bold">
              {selectedUser?.user?.name}{" "}
              {selectedUser?.user?.verified === true ? (
                <Verified color="info" />
              ) : (
                <Pending />
              )}
            </Typography>
            <Typography variant="h6" color="text.secondary" mt={1}>
              {selectedUser?.headline}
            </Typography>
          </Box>
        </Card>

        {selectedUser?.user?.friend ? (
          <>
            <PublicProfileContainer user={selectedUser} />

            {selectedUser.posts?.length > 0 ? (
              <Box
                mt={5}
                sx={{ background: "rgba(255,255,255,0.6)", padding: "5px 5px" }}
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
        ) : (
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={5}
              sx={{
                p: 4,
                borderRadius: 4,
                textAlign: "center",
                background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
              }}
            >
              <LockOutlined
                sx={{
                  fontSize: 60,
                  color: "#1976d2",
                  mb: 2,
                }}
              />
              <CardContent>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  Profile Locked
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={3}>
                  This user’s profile is private. Send a connection request to
                  view their full profile and activities.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<PersonAddAlt1 />}
                  sx={{
                    px: 4,
                    py: 1.2,
                    fontWeight: 600,
                    borderRadius: "20px",
                  }}
                >
                  Connect
                </Button>
              </CardContent>
            </Card>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default PublicProfile;
