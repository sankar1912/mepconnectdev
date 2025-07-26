import React, { useEffect, useState } from "react";
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
  Tooltip,
  Divider,
  Chip,
  Button,
} from "@mui/material";
import {
  Event as EventIcon,
  Share,
  FavoriteBorder,
  KeyboardArrowUp,
  SentimentDissatisfiedOutlined,
  Verified,
  ThumbUpAlt,
  SentimentSatisfied,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllEvents,
  getEvents,
  likeEvent,
} from "../redux/slice/eventsSlice";

import CustomCalendar from "./CustomCalendar";
import { useCookies } from "react-cookie";
import InfiniteScroll from "react-infinite-scroll-component";

const ScrollTop = ({ children }) => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 100 });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

const EventFeed = () => {
  const { events } = useSelector(getAllEvents);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const [cookie, setCookie, removeCookie] =useCookies(['totalEvents'])
      const [hasMore, setHasMore] = useState(true);
      const [page, setPage]= useState(1);
  useEffect(() => {
    dispatch(getEvents(page));
  }, [dispatch]);

  const loadMoreEvents = async () => {
    console.log("Loading")
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(getEvents(nextPage));
    if(!cookie.totalEvents){
      setHasMore(false)
    }
  };
    const limit = 200;
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const getEventStatus = (eventDateStr) => {
    const eventDate = new Date(eventDateStr);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);

    if (eventDate < today) return "past";
    if (eventDate.getTime() === today.getTime()) return "today";
    return "future";
  };

  const filteredEvents = selectedDate
    ? events.filter((event) => isSameDay(new Date(event?.date), selectedDate))
    : events;

  return (
    <Box paddingBottom={10} sx={{ maxWidth: 800, margin: "auto" }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Pick a Date
      </Typography>
      <CustomCalendar
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />
      <Button
        variant="outlined"
        onClick={() => setSelectedDate(null)}
        sx={{ mt: 2 }}
      >
        Show All Events
      </Button>
                <InfiniteScroll
      dataLength={filteredEvents.length - 1}
      next={loadMoreEvents}
      hasMore={hasMore}
      loader={<>Loading</>}
      endMessage={<p>No more posts</p>}
    >
      {filteredEvents.map((event) => {
        const status = getEventStatus(event?.date);
        return (


      <motion.div
            key={event?._id}
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              sx={{
                mb: 4,
                borderRadius: 4,
                boxShadow: "0px 4px 18px rgba(0,0,0,0.1)",
                marginX: "auto",
                width: "100%",
                backgroundColor: "white",
                transition: "0.3s ease-in-out",
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <Avatar
                    sx={{ width: 56, height: 56 }}
                    src={event?.owner?.profileImage}
                    alt={event?.name}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: 2,
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight="bold">
                      {event?.name}
                      {event?.owner?.verified && (
                        <Verified
                          sx={{ ml: 1, fontSize: 20, color: "primary.main" }}
                        />
                      )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event?.department}
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{ color: "#333", textAlign: "left" }}
                >
                  {event?.title}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    textAlign: "left",
                    color: "#555",
                    mb: 2,
                  }}
                >
                  {event?.description}
                </Typography>

                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
                  <Chip
                    icon={<EventIcon />}
                    label={`Date: ${event?.date}`}
                    color="info"
                    variant="outlined"
                  />
                  <Chip
                    label={`Time: ${event?.time}`}
                    color="info"
                    variant="outlined"
                  />
                  <Chip
                    icon={
                      status === "past" ? (
                        <Verified />
                      ) : status === "today" ? (
                        <EventIcon color="white"  />
                      ) : (
                        <EventIcon color="success" />
                      )
                    }
                    label={
                      status === "past"
                        ? "Event Finished"
                        : status === "today"
                        ? "Today"
                        : "Upcoming Event"
                    }
                    color={
                      status === "past"
                        ? "error"
                        : status === "today"
                        ? "primary"
                        : "success"
                    }
                    variant="filled"
                  />
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  <Tooltip title="Like">
                    <IconButton
                      onClick={() =>
                        status !== "past" && dispatch(likeEvent(event?._id))
                      }
                      disabled={status === "past"}
                    >
                      {/* <ThumbUpAlt
                        sx={{ color: status === "past" ? "#ccc" : "#1976d2" }}
                      />
                      <Typography sx={{ ml: 0.5 }}>{event?.likes}</Typography> */}
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Share">
                    <IconButton>
                      <Share sx={{ color: "#1976d2" }} />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          </motion.div>

        );
      })}
          </InfiniteScroll>
    </Box>
  );
};

export default EventFeed;
