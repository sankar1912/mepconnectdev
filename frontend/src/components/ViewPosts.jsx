import React, { useEffect, useState } from "react";
import {
  Avatar, Box, Card, CardContent, Divider,
  IconButton, TextField, Typography, Button,
  Snackbar, Modal
} from "@mui/material";
import {
  ChatBubbleOutline, ContentCopy, Facebook, LinkedIn,
  Pending, Share, Telegram, ThumbDownAltOutlined,
  ThumbUpAltOutlined, Twitter, Verified, WhatsApp
} from "@mui/icons-material";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addComment, addLike, displayPost, getPost, removeLike
} from "../redux/slice/postsSlice";
import { getAuth } from "../redux/slice/AuthSlice";
import SuggestionContainer from "./suggestions/SuggestionContainer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ViewPosts() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector(displayPost);
  const { auth } = useSelector(getAuth);

  const [commentText, setCommentText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const shareUrl = `${window.location.origin}/post/view/${_id}`;

  useEffect(() => {
    dispatch(getPost({ id: _id }));
  }, [_id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setSnackbarOpen(true);
  };

  const handleShare = (platform) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${shareUrl}`,
      whatsapp: `https://api.whatsapp.com/send?text=${shareUrl}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`,
      telegram: `https://t.me/share/url?url=${shareUrl}`,
    };
    window.open(urls[platform], "_blank");
  };

  const sliderSettings = {
    dots: true, infinite: true, speed: 500,
    slidesToShow: 1, slidesToScroll: 1, arrows: true,
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4, px: 2, minHeight: 1200 }}>
  <Box sx={{ width: "100%", maxWidth: "800px", display: "flex", flexDirection: "column", gap: 4 }}>

    <Card sx={{
      width: "100%",
      borderRadius: 4,
      boxShadow: 4,
      backgroundColor: "#fff"
    }}>
        {post?.media?.length > 0 && (
          <Box >
            {post.media.length > 1 ? (
              <Slider {...sliderSettings}>
                {post.media.map((item, idx) => (
                  <Box key={idx}>
                    {item.endsWith(".mp4") || item.endsWith(".webm") ? (
                      <video src={item} controls style={{ width: "100%" }} />
                    ) : (
                      <img src={item} alt="post media"  style={{
                        width: "100%",
                        height: "auto", 
                        objectFit: "cover",
                        borderRadius: "8px"
                      }}/>
                    )}
                  </Box>
                ))}
              </Slider>
            ) : (
              <Box>
                {post.media[0].endsWith(".mp4") ? (
                  <video src={post.media[0]} controls style={{ width: "100%" }} />
                ) : (
                  <img src={post.media[0]} alt="post media"  style={{
                    width: "100%",
                    height: "400px", 
                    objectFit: "cover",
                    borderRadius: "8px"
                  }} />
                )}
              </Box>
            )}
          </Box>
        )}

        {/* Post Details */}
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "left", gap: 2, mb: 1 }}>
            <Avatar src={post?.user?.profileImage} />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {post?.name}
                {post?.user?.verified ? <Verified sx={{ ml: 1 }} color="info" /> : <Pending sx={{ ml: 1 }} />}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {post?.department} • {new Date(post?.createdAt).toLocaleString()}
              </Typography>
            </Box>
          </Box>

          <Typography variant="body1" sx={{ my: 2, textAlign: "left" }}>
            {post?.text}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {auth?.isLoggedIn ? (
              <>
                <IconButton
                  onClick={() => dispatch(addLike({ _id: post._id }))}
                  disabled={post?.likedBy?.includes(auth.user.email)}
                >
                  <ThumbUpAltOutlined />
                </IconButton>

                <IconButton
                  onClick={() => dispatch(removeLike({ _id: post._id }))}
                  disabled={!post?.likedBy?.includes(auth.user.email)}
                >
                  <ThumbDownAltOutlined />
                </IconButton>

                <IconButton onClick={() => setShowComments(!showComments)}>
                  <ChatBubbleOutline />
                  <Typography sx={{ ml: 1 }}>{post?.comments?.length || 0}</Typography>
                </IconButton>

                <IconButton onClick={() => setOpenShare(true)}>
                  <Share />
                </IconButton>
              </>
            ) : (
              <Button onClick={() => navigate("/login")} variant="contained">Login to Like</Button>
            )}
          </Box>

          {/* Comments */}
          {showComments && (
            <Box sx={{ mt: 2 }}>
              <Divider sx={{ mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1 }}>Comments</Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  fullWidth
                  placeholder="Write a comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <Button
                  onClick={() => {
                    if (commentText.trim()) {
                      dispatch(addComment(post._id, commentText));
                      setCommentText("");
                    }
                  }}
                  variant="contained"
                >
                  Post
                </Button>
              </Box>

              <Box sx={{ mt: 2, maxHeight: 200, overflowY: "auto" }}>
                {post?.comments?.length === 0 ? (
                  <Typography>No comments yet.</Typography>
                ) : (
                  post.comments.map((comment, i) => (
                    <Box key={i} sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
                      <Avatar sx={{ width: 36, height: 36 }}>
                        {comment?.name?.[0]}
                      </Avatar>
                      <Box>
                        <Typography fontWeight="bold" variant="body2">
                          {comment.name}
                        </Typography>
                        <Typography variant="body2">{comment.text}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(comment.timestamp).toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                )}
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
      <SuggestionContainer />
      

      <Modal open={openShare} onClose={() => setOpenShare(false)}>
        <Box sx={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper", boxShadow: 24,
          p: 4, borderRadius: 2, width: 300, textAlign: "center"
        }}>
          <Typography variant="h6" gutterBottom>Share this post</Typography>
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <TextField fullWidth value={shareUrl} InputProps={{ readOnly: true }} />
            <IconButton onClick={handleCopy}><ContentCopy /></IconButton>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
            <IconButton onClick={() => handleShare("facebook")}><Facebook /></IconButton>
            <IconButton onClick={() => handleShare("twitter")}><Twitter /></IconButton>
            <IconButton onClick={() => handleShare("whatsapp")}><WhatsApp /></IconButton>
            <IconButton onClick={() => handleShare("linkedin")}><LinkedIn /></IconButton>
            <IconButton onClick={() => handleShare("telegram")}><Telegram /></IconButton>
          </Box>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message="Link copied to clipboard!"
      />
      </Box>
    </Box>
  );
}

export default ViewPosts;
