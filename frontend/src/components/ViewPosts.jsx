import React, { useEffect, useState } from "react";
import {
  Avatar, Box, Card, CardContent, Divider,
  IconButton, TextField, Typography, Button,
  Snackbar, Modal, Grid
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
import ViewComments from "./ViewComments";

function ViewPosts() {
  const { _id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const post = useSelector(displayPost);
  const { auth } = useSelector(getAuth);

  const [commentText, setCommentText] = useState("");
  const [openShare, setOpenShare] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const shareUrl = `${window.location.origin}/post/view/${_id}`;

  useEffect(() => {
    dispatch(getPost({ id: _id }));
  }, [_id, dispatch]);

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
    <Box sx={{ display: "flex", justifyContent: "center", mt: 4, px: 2 }}>
      <Grid container spacing={4} sx={{ maxWidth: "95%" }}>
        {/* Post Content - Left Column */}
        <Grid item xs={12} md={8}>
          <Card sx={{
            width: "100%",
            borderRadius: 4,
            boxShadow: 4,
            backgroundColor: "#fff"
          }}>
            {post?.media?.length > 0 && (
              <Box>
                {post.media.length > 1 ? (
                  <Slider {...sliderSettings}>
                    {post.media.map((item, idx) => (
                      <Box key={idx}>
                        {item.endsWith(".mp4") || item.endsWith(".webm") ? (
                          <video src={item} controls style={{ width: "100%" }} />
                        ) : (
                          <img src={item} alt="post media" style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                            borderRadius: "8px"
                          }} />
                        )}
                      </Box>
                    ))}
                  </Slider>
                ) : (
                  <Box>
                    {post.media[0].endsWith(".mp4") ? (
                      <video src={post.media[0]} controls style={{ width: "100%" }} />
                    ) : (
                      <img src={post.media[0]} alt="post media" style={{
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

            
          </Card>
          <SuggestionContainer />
        </Grid>

        {/* Comments and Actions - Right Column */}
        <Grid item xs={12} md={4}>
         <ViewComments/>
        </Grid>
      </Grid>

    </Box>
  );
}

export default ViewPosts;
