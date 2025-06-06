import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPermit, getUsersPermit,  updateUserPermitFailure,  updateUserPermitSuccess } from "../../features/admin/permitSlice";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useNotifications } from "@toolpad/core";

function PermitUsers({show}) {
  const permit = useSelector(getUsersPermit);
  const dispatch = useDispatch();
  const loading = permit.loading || false;
  const [expandedUserId, setExpandedUserId] = useState(null);
  const notifcation=useNotifications();
  useEffect(() => {
    dispatch(fetchPermit({ fetchData: "users" }));
  }, [dispatch]);

  const handleExpandClick = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" textAlign="center" mb={2}>
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
                  <Avatar
                    src={user.profileImage || "https://via.placeholder.com/100"}
                    alt={user.name}
                  />
                </ListItemIcon>
                <ListItemText primary={user.name} secondary={user.email} />
                <IconButton>
                  {expandedUserId === user._id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </ListItem>

              <Collapse sx={{textAlign:'left'}} in={expandedUserId === user._id} timeout="auto" unmountOnExit>
                <Card sx={{ margin: 2, padding: 2 }}>
                  <CardContent>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Department:</strong> {user.department}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Batch:</strong> {user.batch}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Degree:</strong> {user.degree}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Role:</strong> {user.role}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Place:</strong> {user.place}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Created At:</strong>{" "}
                      {new Date(user.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      <strong>Verified:</strong> {user.verified ? "Yes" : "No"}
                    </Typography>

                    <Button variant="contained" size="small" sx={{ marginTop: 1 }}
                    onClick={()=>{
                      dispatch(updateUserPermitSuccess(user.email));
                      notifcation.show("Approved",{
                        autoHideDuration:3000,
                        severity:'success'
                      })
                    }}
                    >
                      Approve
                    </Button>
                    <Button variant="outlined" size="small" sx={{ marginTop: 1, marginLeft: 1 }}
                     onClick={()=>{
                      dispatch(updateUserPermitFailure(user.email));
                      notifcation.show("Removed",{
                        autoHideDuration:3000,
                        severity:'success'
                      })
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
    </Box>
  );
}

export default PermitUsers;
