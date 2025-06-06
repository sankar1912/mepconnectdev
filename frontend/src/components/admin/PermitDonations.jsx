import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDonationsPermit, getDonationsPermit, updateDonationFailure, updateDonationSuccess } from "../../features/admin/permitSlice";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  IconButton,
  Skeleton,
  TextField,
  Modal,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

function PermitDonations() {
  const permit = useSelector(getDonationsPermit);
  const dispatch = useDispatch();
  const loading = permit.loading || false;
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [razorpayUrls, setRazorpayUrls] = useState({});
  const [numDays, setNumDays] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    dispatch(fetchDonationsPermit({ fetchData: "donations" }));
  }, [dispatch]);

  const handleExpandClick = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  const handleApprove = (userId, email) => {
    const razorpayUrl = razorpayUrls[userId] || "";
    const days = numDays[userId] || "";
    dispatch(updateDonationSuccess({ email, razorpayUrl, days,id:userId }));
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 2 }}>
      <Typography variant="h5" fontWeight="bold" textAlign="left" mb={2}>
        Pending User Approvals
      </Typography>
      <List>
        {loading &&
          Array.from({ length: 6 }).map((_, index) => (
            <ListItem key={index}>
              <ListItemText primary={<Skeleton variant="text" width="80%" />} />
            </ListItem>
          ))}

        {!loading && permit.length > 0 ? (
          permit.map((user) => (
            <div key={user._id}>
              <ListItem button onClick={() => handleExpandClick(user._id)}>
                <ListItemIcon>
                  <Avatar src={user.profileImage || "https://via.placeholder.com/100"} alt={user.name} />
                </ListItemIcon>
                <ListItemText primary={user.campaignName} secondary={user.email} />
                <IconButton>
                  {expandedUserId === user._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </ListItem>
              <Collapse in={expandedUserId === user._id} timeout="auto" unmountOnExit>
                <Card sx={{ margin: 2, padding: 2 }}>
                  <CardContent>
                    <Box sx={{textAlign:'left'}}>
                      <Typography>Campaign Details:</Typography>
                    <Typography variant="body2"><strong>Department:</strong> {user.department}</Typography>
                    <Typography variant="body2"><strong>Campaign Name:</strong> {user.campaignName}</Typography>
                    <Typography variant="body2"><strong>Description:</strong> {user.description}</Typography>
                    <Typography variant="body2"><strong>Contact:</strong> {user.contact}</Typography>
                    <Typography variant="body2"><strong>Goal Amount:</strong> {user.goalAmount}</Typography>
                    <Typography variant="body2"><strong>Aadhar number:</strong> {user.aadhar}</Typography>
                    <Typography variant="body2"><strong>PAN number:</strong> {user.pan}</Typography>
                    </Box>
                    <Divider/>
                    <br/>
                    <Box sx={{textAlign:'left'}}>
                      <Typography><strong>Personal Details:</strong></Typography>
                    <Typography variant="body2"><strong>Department:</strong> {user?.user?.department}</Typography>
                    <Typography variant="body2"><strong>Campaign Name:</strong> {user?.user?.name}</Typography>
                    <Typography variant="body2"><strong>Email:</strong> {user?.user?.email}</Typography>
                    <Typography variant="body2"><strong>Batch:</strong> {user?.user?.batch}</Typography>

                    </Box>
                    <Divider/>
                    {user.image && (
                      <Box mt={2} onClick={() => setSelectedImage(user.image)} sx={{ cursor: "pointer" }}>
                        <Typography variant="body2"><strong>Campaign Image:</strong></Typography>
                        <img src={user.image} alt="Campaign" style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }} />
                      </Box>
                    )}
                    {user.govtProof && (
                      <Box mt={2} onClick={() => setSelectedImage(user.govtProof)} sx={{ cursor: "pointer" }}>
                        <Typography variant="body2"><strong>Government Proof:</strong></Typography>
                        <img src={user.govtProof} alt="Government Proof" style={{ width: "100%", maxHeight: "200px", objectFit: "cover" }} />
                      </Box>
                    )}
                    <TextField
                      fullWidth
                      label="Razorpay URL"
                      variant="outlined"
                      size="small"
                      value={razorpayUrls[user._id] || ""}
                      onChange={(e) => setRazorpayUrls({ ...razorpayUrls, [user._id]: e.target.value })}
                      sx={{ marginTop: 1 }}
                    />
                    <TextField
                      fullWidth
                      label="Number of Days"
                      variant="outlined"
                      size="small"
                      type="number"
                      value={numDays[user._id] || ""}
                      onChange={(e) => setNumDays({ ...numDays, [user._id]: e.target.value })}
                      sx={{ marginTop: 1 }}
                    />
                    <Button variant="contained" size="small" sx={{ marginTop: 1 }} onClick={() => handleApprove(user._id, user.email)}>
                      Approve
                    </Button>
                    <Button variant="outlined" size="small" sx={{ marginTop: 1, marginLeft: 1 }}
                    onClick={()=>{
                      dispatch(updateDonationFailure({id:user._id}));
                    }}
                    >
                      Reject
                    </Button>
                  </CardContent>
                </Card>
              </Collapse>
            </div>
          ))
        ) : (
          !loading && (
            <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mt: 2 }}>
              No pending users for approval.
            </Typography>
          )
        )}
      </List>

      <Modal open={!!selectedImage} onClose={() => setSelectedImage(null)}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", backgroundColor: "rgba(0,0,0,0.8)" }}>
          <img src={selectedImage} alt="Preview" style={{ maxWidth: "90%", maxHeight: "90vh" }} />
        </Box>
      </Modal>
    </Box>
  );
}

export default PermitDonations;
