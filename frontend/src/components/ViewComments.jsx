import React, { useEffect, useState } from "react";
import {
  Avatar, Box, Card, CardContent, Divider,
  IconButton, TextField, Typography, Button,
  Snackbar, Modal, Grid,
  Paper
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

function ViewComments() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector(displayPost);
  const { auth } = useSelector(getAuth);

  const [commentText, setCommentText] = useState("");
  const [openShare, setOpenShare] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const shareUrl = `${window.location.origin}/post/view/${_id}`;
  const [makeLiked, setMakeLiked] = useState(false);
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
    <Paper elevation ={7} sx={{ display: "flex", mt: 4,justifyContent:"center",textAlign:"left", px: 2, borderRadius:5 }}>
            <CardContent>
              <CardContent>
              <Box sx={{ display: "flex", alignItems: "left", textAlign:"left",gap: 2, mb: 1 }}>
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
            </CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                {auth?.isLoggedIn ? (
                  <>
                   <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
  <IconButton
    onClick={() => dispatch(addLike({ _id: post._id }))}
    disabled={post?.likedBy?.includes(auth.user.email)}
  >
    <ThumbUpAltOutlined />
  </IconButton>
  <Typography variant="body2">{post?.likedBy?.length || 0}</Typography>

  <IconButton
    onClick={() => dispatch(removeLike({ _id: post._id }))}
    disabled={!post?.likedBy?.includes(auth?.user?.email)}
  >
    <ThumbDownAltOutlined />
  </IconButton>
</Box>


                    <IconButton onClick={() => setOpenShare(true)}>
                      <Share />
                    </IconButton>
                  </>
                ) : (
                  <Button onClick={() => navigate("/login")} variant="contained">Login to Interact</Button>
                )}
              </Box>

             
                <Box sx={{display:auth?.isLoggedIn ? "block":"none"}}>
                <Typography variant="h6" sx={{ mb: 2 }}>Comments ({post?.comments?.length || 0})</Typography>

                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                  <TextField
                    fullWidth
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    size="small"
                  />
                  <Button
                    onClick={() => {
                      if (commentText.trim()) {
                        dispatch(addComment(post._id, commentText));
                        setCommentText("");
                      }
                    }}
                    variant="contained"
                    size="small"
                  >
                    Post
                  </Button>
                </Box>

                <Box sx={{ maxHeight: "700px", overflowY: "auto" }}>
                  {post?.comments?.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">No comments yet.</Typography>
                  ) : (
                    post?.comments?.map((comment, i) => (
                      <Box key={i} sx={{ display: "flex", gap: 1.5, mb: 1.5 }}>
                        <Avatar sx={{ width: 32, height: 32 }}>
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
            </CardContent>
         
        
      

      {/* Share Modal */}
      <Modal open={openShare} onClose={() => setOpenShare(false)}>
        <Box sx={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper", boxShadow: 24,
          p: 4, borderRadius: 2, width: 300, textAlign: "center"
        }}>
          <Typography variant="h6" gutterBottom>Share this post</Typography>
          <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
            <TextField fullWidth value={shareUrl} InputProps={{ readOnly: true }} size="small" />
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
    </Paper>
  );
}

export default ViewComments;
