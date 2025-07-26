import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventsPermit,  getEventsPermit, updateEventPermitFailure, updateEventPermitSuccess } from "../../redux/slice/permitSlice";
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
  ImageList,
  ImageListItem,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

function PermitEvents() {
  const result = useSelector(getEventsPermit);
  const permit=result||[];
  const dispatch = useDispatch();
  const loading = permit.loading || false;
  const [expandedUserId, setExpandedUserId] = useState(null);

  useEffect(() => {
    dispatch(fetchEventsPermit({ fetchData: "events" }));
  }, [dispatch]);

  const handleExpandClick = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 3 }}>
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
        Pending Event Approvals
      </Typography>

      <List>
        {loading &&
          Array.from({ length: 6 }).map((_, index) => (
            <ListItem key={index}>
              <ListItemText primary={<Skeleton variant="text" width="80%" />} />
            </ListItem>
          ))}

        {!loading && permit.length > 0 ? (
          permit.map((event) => (
            <div key={event._id}>
              <ListItem button onClick={() => handleExpandClick(event._id)}>
                <ListItemIcon>
                  <Avatar
                    src={event?.user?.profileImage || "https://via.placeholder.com/100"}
                    alt={event.name}
                  />
                </ListItemIcon>
                <ListItemText 
                  primary={event.title} 
                  secondary={`${event.name} | ${event.department}`} 
                />
                <IconButton>
                  {expandedUserId === event._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </ListItem>
              <Collapse in={expandedUserId === event._id} timeout="auto" unmountOnExit>
                <Card sx={{ margin: 2, padding: 2, boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" mb={1}>
                      {event.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Date:</strong> {event.date} | <strong>Time:</strong> {event.time}
                    </Typography>

                    {/* Display Images
                    {event.media?.length > 0 && (
                      <ImageList cols={Math.min(event.media.length, 3)} rowHeight={120} sx={{ mt: 2 }}>
                        {event.media.map((image, index) => (
                          <ImageListItem key={index}>
                            <img src={image} alt={`Event Image ${index + 1}`} loading="lazy" />
                          </ImageListItem>
                        ))}
                      </ImageList>
                    )} */}

                    <Box mt={2}>
                      <Button variant="contained" color="success" size="small" onClick={()=>{
                        dispatch(updateEventPermitSuccess({email:event.email,id:event._id}))
                      }}>
                        Approve
                      </Button>
                      <Button variant="outlined" color="error" size="small" sx={{ ml: 1 }} onClick={()=>{
                        dispatch(updateEventPermitFailure({email:event.email,id:event._id}))
                      }}>
                        Reject
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Collapse>
            </div>
          ))
        ) : (
          !loading && (
            <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mt: 2 }}>
              No pending events for approval.
            </Typography>
          )
        )}
      </List>
    </Box>
  );
}

export default PermitEvents;
