import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addComment,
  addLike,
  displayPost,
  getPost,
  removeLike,
} from "../features/feeds/postsSlice";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  IconButton,
  Modal,
  Typography,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import {
  ChatBubbleOutline,
  ThumbDownAltOutlined,
  ThumbUpAltOutlined,
  Share as ShareIcon,
  Close,
} from "@mui/icons-material";
import { getAuth } from "../features/users/AuthSlice";
import { useNavigate } from "react-router-dom";
import Share from "./Share";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PostView({ setClose, id }) {
  const dispatch = useDispatch();
  const post = useSelector(displayPost);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { auth } = useSelector(getAuth);
  const [openShare, setOpenShare] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id > 0) {
      dispatch(getPost(id));
    } else {
      setClose(false);
    }
  }, [id, dispatch]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <>
      <Modal
        open={true}
        onClose={() => setClose(false)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Card
          sx={{
            width: "80vw",
            maxWidth: 700,
            borderRadius: "12px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            p: 2,
            position: "relative",
          }}
        >
          <IconButton
            onClick={() => setClose(false)}
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            <Close />
          </IconButton>

          {post?.media?.length > 1 ? (
            <Slider {...sliderSettings}>
              {post.media.map((mediaItem, index) => (
                <div key={index}>
                  {mediaItem.endsWith(".mp4") || mediaItem.endsWith(".webm") ? (
                    <video
                      src={mediaItem}
                      controls
                      style={{
                        width: "100%",
                        maxHeight: 350,
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  ) : (
                    <img
                      src={mediaItem}
                      alt="Post Media"
                      style={{
                        width: "100%",
                        maxHeight: 350,
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                </div>
              ))}
            </Slider>
          ) : post?.media?.length === 1 ? (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              {post.media[0].endsWith(".mp4") ||
              post.media[0].endsWith(".webm") ? (
                <video
                  src={post.media[0]}
                  controls
                  style={{
                    width: "100%",
                    maxHeight: 350,
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              ) : (
                <img
                  src={post.media[0]}
                  alt="Post Media"
                  style={{
                    width: "100%",
                    maxHeight: 350,
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              )}
            </Box>
          ) : null}

          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
              <Avatar
                sx={{ width: 50, height: 50 }}
                src={post?.user?.profileImage}
              />
              <Box>
                <Typography variant="subtitle1" fontWeight="bold">
                  {post?.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {post?.department}
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="body1"
              sx={{ mt: 1, mb: 2, textAlign: "justify", color: "#333" }}
            >
              {post?.text}
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
            >
              {auth.isLoggedIn ? (
                <>
                  <IconButton
                    onClick={() => {
                      console.log({ id: post._id });
                      dispatch(addLike({ _id: post._id }));
                    }}
                    disabled={post?.likedBy?.includes(auth.user.email)}
                  >
                    <ThumbUpAltOutlined />
                    <Typography sx={{ ml: 1 }}>{post?.likes}</Typography>
                  </IconButton>

                  <IconButton
                    onClick={() => dispatch(removeLike(id))}
                    disabled={!post?.likedBy?.includes(auth.user.email)}
                  >
                    <ThumbDownAltOutlined />
                  </IconButton>

                  <IconButton onClick={() => setShowComments(!showComments)}>
                    <ChatBubbleOutline />
                    <Typography sx={{ ml: 1 }}>{post?.comments}</Typography>
                  </IconButton>

                  <IconButton onClick={() => setOpenShare(true)}>
                    <ShareIcon />
                  </IconButton>
                </>
              ) : (
                <Button
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login to access
                </Button>
              )}
            </Box>

            {showComments && (
              <Box
                sx={{
                  mt: 3,
                  maxHeight: "250px",
                  overflowY: "auto",
                  paddingRight: "8px",
                }}
              >
                <Divider />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Comments
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <TextField
                    fullWidth
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    sx={{ flex: 1, mr: 1 }}
                  />
                  <Button
                    variant="contained"
                    onClick={() => {
                      if (commentText.trim()) {
                        dispatch(addComment(id, commentText));
                        setCommentText("");
                      }
                    }}
                  >
                    Post
                  </Button>
                </Box>

                <Box sx={{ mt: 2 }}>
                  {post.comments === 0 ? (
                    <Typography variant="body2" color="textSecondary">
                      No comments yet.
                    </Typography>
                  ) : (
                    <>
                      {post.commentdetails.map((comment, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1.5,
                            mb: 2,
                          }}
                        >
                          <Avatar
                            src={comment.avatar || ""}
                            sx={{ width: 36, height: 36 }}
                          >
                            {comment.name[0]}
                          </Avatar>

                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <Typography variant="body2" fontWeight="bold">
                              {comment.name}{" "}
                              <Typography variant="body2" component="span">
                                {comment.text}
                              </Typography>
                            </Typography>

                            <Typography variant="caption" color="textSecondary">
                              {new Date(comment.timestamp).toLocaleString()}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </>
                  )}
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </Modal>

      {openShare && (
        <Share
          open={openShare}
          onClose={() => setOpenShare(false)}
          post={post}
        />
      )}
    </>
  );
}

export default PostView;
