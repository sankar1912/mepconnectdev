import React, { useState } from "react";
import { Avatar, Box, Button, InputBase, Tooltip } from "@mui/material";
import {
  PostAddRounded,
  Event,
  VolunteerActivismOutlined,
  NotificationAddOutlined,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import CreatePost from "./CreatePost";
import CreateEvents from "./CreateEvents";
import CreateDonations from "./CreateDonations";
import { useSelector } from "react-redux";
import { getAuth } from "../redux/slice/AuthSlice";
import { useNotifications } from "@toolpad/core";

const WritePosts = () => {
  const [createPost, setCreatePost] = useState(false);
  const [createEvents, setCreateEvents] = useState(false);
  const [createDonations, setCreateDonations] = useState(false);
  const notification = useNotifications();
  const { auth } = useSelector(getAuth);
  const handleCreateAction = (actionSetter) => {
    if (auth.user?.verified) {
      actionSetter(true);
    } else {
      notification.show("Your account under review", {
        autoHideDuration: 5000,
        severity: "error",
      });
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Box
          sx={{
            color: "black",
            borderRadius: "12px",
            padding: "15px",
            width: "90%",
            margin: "auto",
            background: "rgb(25, 118, 210)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              src={auth.user?.profileImage || "/"}
              sx={{ width: 45, height: 45 }}
            />
            <InputBase
              placeholder="What’s on your mind?"
              sx={{
                flex: 1,
                borderRadius: "20px",
                padding: "10px 15px",
                color: "rgba(0, 0, 0, 0.8)",
                background: "white",
              }}
              onClick={() => handleCreateAction(setCreatePost)}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: "10px",
              paddingTop: "10px",
              borderTop: "1px solid white",
            }}
          >
            <motion.div
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Tooltip title="Create Post">
                <Button
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                    transition: "0.3s",
                    "&:hover": { color: "white" },
                  }}
                  startIcon={<PostAddRounded sx={{ color: "white" }} />}
                  onClick={() => handleCreateAction(setCreatePost)}
                ></Button>
              </Tooltip>
            </motion.div>

            <motion.div
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Tooltip title="Create Event">
                <Button
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                    transition: "0.3s",
                  }}
                  onClick={() => handleCreateAction(setCreateEvents)}
                  startIcon={<Event  />}
                ></Button>
              </Tooltip>
            </motion.div>

            <motion.div
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <Tooltip title="Create Donation">
                <Button
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                    transition: "0.3s",
                  }}
                  onClick={() => handleCreateAction(setCreateDonations)}
                  startIcon={
                    <VolunteerActivismOutlined />
                  }
                ></Button>
              </Tooltip>
            </motion.div>


            {
              auth.user.role === "admin" && (
                <motion.div
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <Tooltip title="Notice Board">
                  <Button
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "white",
                      transition: "0.3s",
                    }}
                    onClick={() => handleCreateAction(setCreateDonations)}
                    startIcon={
                      <NotificationAddOutlined />
                    }
                  ></Button>
                </Tooltip>
              </motion.div>
              )
            }
          </Box>
        </Box>
      </motion.div>

      <CreateEvents
        open={createEvents}
        handleClose={() => setCreateEvents(false)}
      />
      <CreatePost open={createPost} handleClose={() => setCreatePost(false)} />
      <CreateDonations
        open={createDonations}
        handleClose={() => setCreateDonations(false)}
      />
    </>
  );
};

export default WritePosts;
