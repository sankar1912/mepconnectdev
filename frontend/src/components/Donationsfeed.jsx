import React, { useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Fab,
  Zoom,
  useScrollTrigger,
  Button,
  CardMedia,
} from "@mui/material";
import {
  Share,
  KeyboardArrowUp,
  HealthAndSafetySharp,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDonation,
  getAllDonations,
} from "../features/feeds/donationsSlice";
import { useNavigate } from "react-router-dom";

const ScrollTop = ({ children }) => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 100 });
  const handleClick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Zoom>
  );
};

const DonationsFeed = () => {
  const { donations = [] } = useSelector(getAllDonations);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDonation());
  }, [dispatch]);

  return (
    <Box padding={{ xs: 2, sm: 3, md: 4 }} pb={10}>
      {donations.length > 0 ? (
        donations.map((donation) => (
          <motion.div
            key={donation.id}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            <Card
              sx={{
                mb: 4,
                borderRadius: 4,
                boxShadow: 4,
                overflow: "hidden",
                cursor: "pointer",
                transition: "0.3s",
                ":hover": {
                  boxShadow: 6,
                },
              }}
              onClick={() => navigate(`/donations/view/${donation._id}`)}
            >
              {donation.image && (
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="220"
                    image={donation.image}
                    alt={donation.campaignName}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "40%",
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                    }}
                  />
                </Box>
              )}

              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "left", mb: 2 }}>
                  <Box sx={{ alignItems: "left", textAlign: "left" }}>
                    <Typography variant="h6" fontWeight={600}>
                      {donation.campaignName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Organized: {donation.department}
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="subtitle1"
                  sx={{ color: "primary.main", mb: 1, textAlign: "left" }}
                >
                  Amount: ₹{donation.goalAmount}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ textAlign: "justify", mb: 2 }}
                >
                  {donation.description.length > 150
                    ? donation.description.slice(0, 150) + "..."
                    : donation.description}
                </Typography>
                <Box sx={{ alignItems: "left", textAlign: "left" }}>
                  <Typography variant="caption" color="text.secondary">
                    Date Open:{" "}
                    {new Date(donation.startDate).toLocaleDateString()}
                  </Typography>
                  <br />
                  <Typography variant="caption" color="text.secondary">
                    Date Close:{" "}
                    {new Date(donation.endDate).toLocaleDateString()}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 3,
                  }}
                >
                  <Box>
                    <IconButton>
                      <Share fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>

                <Button
                  fullWidth
                  variant="outlined"
                  color="primary"
                  sx={{ mt: 3 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/donations/view/${donation._id}`);
                  }}
                >
                  View Campaign
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))
      ) : (
        <Typography textAlign="center" mt={4} color="text.secondary">
          No donations available.
        </Typography>
      )}

      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </Box>
  );
};

export default DonationsFeed;
