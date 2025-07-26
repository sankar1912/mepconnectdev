import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  IconButton,
  Collapse,
  Card,
  CardContent,
  Button,
  Skeleton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import {  fetchPostsPermit, getPostsPermit, updatePostPermitFailure, updatePostPermitSuccess } from "../../redux/slice/permitSlice";

function PermitPosts() {
  const permit = useSelector(getPostsPermit) || {}; 
  const dispatch = useDispatch();
  const loading = permit?.loading || false;
  const results = permit||[];
  const [expandedPostId, setExpandedPostId] = useState(null);

  useEffect(() => {
    dispatch(fetchPostsPermit({ fetchData: "posts" }));
  }, [dispatch]);

  const handleExpandClick = (postId) => {
    setExpandedPostId(expandedPostId === postId ? null : postId);
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" textAlign="left" mb={2}>
        Pending Post Approvals
      </Typography>

      <List>
        {loading &&
          Array.from({ length: 6 }).map((_, index) => (
            <ListItem key={index}>
              <ListItemText primary={<Skeleton variant="text" width="80%" />} />
            </ListItem>
          ))}

        {!loading && results.length > 0 ? (
          results.map((post) => (
            <div key={post.id}>
              <ListItem button onClick={() => handleExpandClick(post.id)}>
                <ListItemIcon>
                  <Avatar
                    src={post?.user?.profileImage || "https://via.placeholder.com/100"}
                    alt={post.name}
                  />
                </ListItemIcon>
                <ListItemText primary={post.name} secondary={post.email} />
                <IconButton>
                  {expandedPostId === post.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </ListItem>

              <Collapse sx={{textAlign:'left'}} in={expandedPostId === post.id} timeout="auto" unmountOnExit>
                <Card sx={{ margin: 2, padding: 2 }}>
                  <CardContent>
                    <Typography variant="body2" fontWeight="bold">
                      {post.username}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {Date(post.time)}
                    </Typography>
                    <Typography variant="body1" mt={1}>
                      {post.text}
                    </Typography>

               
                    {post.media?.length > 0 && (
                      <Box
                        sx={{
                          display: "flex",
                          overflowX: "auto",
                          gap: 1,
                          mt: 2,
                          paddingBottom: 1,
                        }}
                      >
                        {post.media.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Media ${index + 1}`}
                            style={{
                              height: "150px",
                              width: "auto",
                              borderRadius: "8px",
                              objectFit: "cover",
                            }}
                          />
                        ))}
                      </Box>
                    )}

                   
                    {post.hashtags?.length > 0 && (
                      <Typography variant="body2" mt={1} color="primary">
                        {post.hashtags.map((tag) => `#${tag} `)}
                      </Typography>
                    )}
                    <Button variant="contained" size="small" sx={{ marginTop: 1 }} onClick={()=>{
                      dispatch(updatePostPermitSuccess({id:post._id,email:post.email}))
                    }}>
                      Approve
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      sx={{ marginTop: 1, marginLeft: 1 }}
                      onClick={()=>{
                        dispatch(updatePostPermitFailure({id:post._id,email:post.email}))
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
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
              sx={{ mt: 2 }}  
            >
              No pending posts for approval.
            </Typography>
          )
        )}
      </List>
    </Box>
  );
}

export default PermitPosts;
