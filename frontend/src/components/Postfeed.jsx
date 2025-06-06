import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Fab,
  Zoom,
  useScrollTrigger,
  Button,
  Skeleton,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  ChatBubbleOutline,
  Share,
  KeyboardArrowUp,
  ThumbUpAltOutlined,
  ThumbDownAltOutlined,
  SentimentDissatisfiedOutlined,
  Verified,
  Pending,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {
  addLike,
  fetchPost,
  getAllPosts,
  removeLike,
} from "../features/feeds/postsSlice";
import { getAuth } from "../features/users/AuthSlice";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useCookies } from "react-cookie";

const ScrollTop = ({ children }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16, zIndex: 999 }}
      >
        {children}
      </Box>
    </Zoom>
  );
};

const PostFeed = () => {
  
  const { posts, loading } = useSelector(getAllPosts);
  const { auth } = useSelector(getAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expandedPostId, setExpandedPostId] = useState(null);
  const theme = useTheme();
    const [cookie, setCookie, removeCookie] =useCookies(['totalPosts'])
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage]= useState(1);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  useEffect(() => {
    dispatch(fetchPost(page));
  }, [dispatch]);


const loadMorePosts = async () => {
  const nextPage = page + 1;
  setPage(nextPage);
  dispatch(fetchPost(nextPage));
  if(!cookie.totalPosts){
    setHasMore(false)
  }
};
  const limit = 200;

  const toggleExpand = (id) => {
    setExpandedPostId((prevId) => (prevId === id ? null : id));
  };

  const cardStyle = {
    mb: 4,
    borderRadius: 4,
    backdropFilter: "blur(8px)",
    background: "rgba(255, 255, 255, 0.85)",
    boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.01)",
      boxShadow: "0 10px 24px rgba(0,0,0,0.15)",
    },
  };

  return (
    <Box paddingBottom={10}>
      {loading ? (
        [...Array(6)].map((_, index) => (
          <Card key={index} sx={cardStyle}>
            <Skeleton variant="rectangular" width="100%" height={250} />
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                <Skeleton variant="circular" width={50} height={50} />
                <Box>
                  <Skeleton width={120} height={20} />
                  <Skeleton width={80} height={15} />
                </Box>
              </Box>
              <Skeleton width="100%" height={20} sx={{ mb: 1 }} />
              <Skeleton width="80%" height={20} sx={{ mb: 2 }} />
              <Box sx={{ display: "flex", gap: 1 }}>
                <Skeleton width={50} height={20} />
                <Skeleton width={60} height={20} />
              </Box>
            </CardContent>
          </Card>
        ))
      ) : posts.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <SentimentDissatisfiedOutlined sx={{ fontSize: 80, color: "#b0b0b0" }} />
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, color: "#555" }}>
            No feed available for now
          </Typography>
          <Typography variant="body2" sx={{ color: "#777", mt: 1 }}>
            Try again later or explore other sections
          </Typography>
        </Box>
      ) : (
           <InfiniteScroll
      dataLength={posts.length-1}
      next={loadMorePosts}
      hasMore={hasMore}
      loader={  (
        [...Array(1)].map((_, index) => (
          <Card key={index} sx={cardStyle}>
            <Skeleton variant="rectangular" width="100%" height={250} />
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                <Skeleton variant="circular" width={50} height={50} />
                <Box>
                  <Skeleton width={120} height={20} />
                  <Skeleton width={80} height={15} />
                </Box>
              </Box>
              <Skeleton width="100%" height={20} sx={{ mb: 1 }} />
              <Skeleton width="80%" height={20} sx={{ mb: 2 }} />
              <Box sx={{ display: "flex", gap: 1 }}>
                <Skeleton width={50} height={20} />
                <Skeleton width={60} height={20} />
              </Box>
            </CardContent>
          </Card>
        ))
      )}
      endMessage={<p>No more posts</p>}
    >
      {
         posts.map((post) => (
          <motion.div
            key={post._id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.3 }}
            onClick={()=>{
              navigate(`/post/view/${post._id}`)
            }}
          >
            <Card sx={cardStyle}>
              {Array.isArray(post.media) && post.media.length > 0 && (
                <Slider
                  dots
                  infinite={false}
                  speed={500}
                  slidesToShow={1}
                  slidesToScroll={1}
                  arrows={!isMobile}
                >
                  {post.media.map((file, index) => (
                    <Box key={index} component="div">
                      <img
                        src={file}
                        alt={`post-${index}`}
                        style={{
                          width: "100%",
                          height: "400px",
                          objectFit: "cover",
                          borderTopLeftRadius: "16px",
                          borderTopRightRadius: "16px",
                        }}
                      />
                    </Box>
                  ))}
                </Slider>
              )}

              <CardContent>
                <Box sx={{ display: "flex", gap: 2, mb: 1, alignItems: "center" }}>
                  <Avatar src={post.user?.profileImage || "/"} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {post.name}
                      {post?.verified ? (
                        <Tooltip title="Verified Profile">
                          <Verified fontSize="small" color="info" sx={{ ml: 1 }} />
                        </Tooltip>
                      ) : (
                        <Tooltip title="Under Review">
                          <Pending fontSize="small" sx={{ ml: 1 }} />
                        </Tooltip>
                      )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {post.department}
                    </Typography>
                  </Box>
                </Box>

                <Typography
                  variant="body1"
                  fontWeight={500}
                  sx={{ textAlign: "justify", mt: 1 }}
                >
                  {expandedPostId === post._id
                    ? post.text
                    : `${post.text.slice(0, limit)}...`}
                  {post.text.length > limit && (
                    <Button
                      onClick={() => toggleExpand(post._id)}
                      size="small"
                      sx={{
                        ml: 1,
                        textTransform: "none",
                        fontWeight: "bold",
                        fontSize: "0.85rem",
                      }}
                    >
                      {expandedPostId === post._id ? "Show Less" : "Show More"}
                    </Button>
                  )}
                </Typography>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
                  {post.hashtags?.map((tag, index) => (
                    <Typography
                      key={index}
                      variant="caption"
                      sx={{
                        backgroundColor: "#e0f7fa",
                        color: "#00796b",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: "20px",
                        fontWeight: 500,
                      }}
                    >
                      #{tag}
                    </Typography>
                  ))}
                </Box>

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                  {auth.isLoggedIn ? (
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Tooltip title="Like">
                        <IconButton
                          onClick={() => dispatch(addLike({ _id: post._id }))}
                          disabled={post?.likedBy?.includes(auth.user.email)}
                        >
                          <ThumbUpAltOutlined />
                          <Typography sx={{ ml: 0.5 }} variant="caption">
                            {post?.likes}
                          </Typography>
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Unlike">
                        <IconButton
                          onClick={() => dispatch(removeLike({ _id: post._id }))}
                          disabled={!post?.likedBy?.includes(auth.user.email)}
                        >
                          <ThumbDownAltOutlined />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Comments">
                        <IconButton onClick={() => navigate(`/post/view/${post._id}`)}>
                          <ChatBubbleOutline />
                          <Typography sx={{ ml: 0.5 }} variant="caption">
                            {post.comments}
                          </Typography>
                        </IconButton>
                      </Tooltip>
                    </Box>
                  ) : (
                    <Button onClick={() => navigate("/login")} variant="outlined">
                      Login to interact
                    </Button>
                  )}
                  <Tooltip title="Share">
                    <IconButton>
                      <Share />
                    </IconButton>
                  </Tooltip>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        ))
      }
    </InfiniteScroll>
      )}

      <ScrollTop>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </ScrollTop>
    </Box>
  );
};

export default PostFeed;
