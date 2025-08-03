import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Grid,
  Box,
  Typography,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import { Verified, Pending, Refresh } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { searchresults, fetchSearchRequest } from "../../redux/slice/searchPeopleSlice";
import { getfriendslist, sendFriendequest } from "../../redux/slice/friendsSlice";
import { useNavigate } from "react-router-dom";
import SendRequest from "./SendRequest";
import EmailNotFoundModal from "./EmailNotFoundModal";

const SearchResults = ({selectedFilters, setSeletedFilters}) => {
  const dispatch = useDispatch();
  const users = useSelector(searchresults) || [];
  const friendsList = useSelector(getfriendslist);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [note, setNote] = useState("");
  const [emailNotFound, setEmailNotFound] = useState(false);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setNote("");
    setSelectedUser(null);
  };

  const handleRefresh = () => {
    setLimit(10);
    setPage(1);
    setHasMore(true);
    dispatch(fetchSearchRequest({ places: [], depts: [], batchs: [], page: 1, limit: 10 }));
  };

  const fetchMoreUsers = () => {
    const nextPage = page + 1;
    dispatch(fetchSearchRequest({places: selectedFilters?.city, 
      batchs: selectedFilters?.batch, 
      depts: selectedFilters?.department,
      limit:limit,
      page:nextPage,
      name:selectedFilters?.name,
      company:selectedFilters?.company
    }));
    setPage(nextPage);
    // If less than limit users returned, stop loading more
    // if (users.length < page * limit) {
    //   setHasMore(false);
    // }
  };

  // Filter users to exclude those already in the friendsList
  const filteredUsers = users.filter(user => 
    !friendsList?.some(friend => friend.email === user.email)
  );
  const navigate=useNavigate();

  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: "auto" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">Search Results</Typography>
        <IconButton onClick={handleRefresh}><Refresh /></IconButton>
      </Box>

      <InfiniteScroll
        dataLength={filteredUsers.length-1}
        next={fetchMoreUsers}
        hasMore={hasMore}
        loader={<Typography textAlign="center" mt={2}>Loading...</Typography>}
        endMessage={
          <Typography textAlign="center" mt={2} color="textSecondary">
            No more users to display.
          </Typography>
        }
      >
        <Grid container spacing={4}>
          {filteredUsers.map((user) => (
            <Grid item xs={12} lg={6} key={user._id}>
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    transition={{ type: "spring", stiffness: 200 }}
  >
    <Box
      sx={{
        height: 620,
        position: "relative",
        borderRadius: 6,
        overflow: "hidden",
        boxShadow: 6,
        backgroundImage: `url(${user.profileImage || "https://via.placeholder.com/400"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        cursor: "pointer",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backdropFilter: "blur(2px)",
          background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2))",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          p: 3,
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ display: "flex", alignItems: "center" }}>
          {user.name}
          {user.verified ? (
            <Verified fontSize="small" sx={{ ml: 1, color: "#4FC3F7" }} />
          ) : (
            <Pending fontSize="small" sx={{ ml: 1 }} />
          )}
        </Typography>

        <Typography variant="body2" sx={{ opacity: 0.85, textAlign:"left" }}>{user.department}</Typography>
        <Typography variant="body2" sx={{ opacity: 0.75, textAlign:"left" }}>{user.batch}</Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1, mt: 1 }}>
          {(() => {
            const companyFilter = selectedFilters?.company?.trim();
            let experiences = user.experience || [];
            if (companyFilter==="") {
              const match = experiences.find(exp => exp.company?.toLowerCase() === companyFilter?.toLowerCase());
              experiences = match ? [match] : [];
            } else {
              experiences = experiences.slice(0, 1); 
            }
            return experiences.map((exp, index) => (
              <Box
                key={index}
                sx={{
                  background: '#1976d2',
                  color: 'white',
                  px: 2.5,
                  py: 0.7,
                  borderRadius: '16px',
                  fontSize: '0.92rem',
                  fontWeight: 500,
                  boxShadow: 1,
                  display: 'flex',
                  alignItems: 'center',
                  minWidth: 0,
                  maxWidth: '90%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <span style={{ fontWeight: 700, marginRight: 8 }}>{exp.company}</span>
                <span style={{ fontSize: '0.85em', color: 'white' }}>({exp.from} - {exp.to})</span>
              </Box>
            ));
          })()}
        </Box>

        <Box mb={6} mt={3} display="flex" justifyContent="center" gap={2}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              textTransform: "none",
              fontWeight: "bold",
              px: 3,
              "&:hover": { backgroundColor: "#f0f0f0" },
            }}
            onClick={() => handleOpenModal(user)}
          >
            Connect
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "#fff",
              borderColor: "#fff",
              textTransform: "none",
              fontWeight: "bold",
              px: 3,
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
            }}
            onClick={() => {
              navigate(`/publicprofile/${user._id}`);
            }}
          >
            View
          </Button>
        </Box>
      </Box>
    </Box>
  </motion.div>
</Grid>

          ))}
        </Grid>
      </InfiniteScroll>

      {/* Friend Request Modal */}
      <SendRequest
        open={openModal}
        onClose={handleCloseModal}
        selectedUser={selectedUser}
        note={note}
        setNote={setNote}
        onSend={() => {
          if (!selectedUser?.email) {
            setOpenModal(false);
            setEmailNotFound(true);
            return;
          }
          dispatch(sendFriendequest(selectedUser.email, note));
          handleCloseModal();
        }}
      />
      <EmailNotFoundModal open={emailNotFound} onClose={() => setEmailNotFound(false)} />
    </Box>
  );
};

export default SearchResults;
