import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
  Chip,
} from "@mui/material";
import { AddPhotoAlternate, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "../redux/slice/AuthSlice";
import { addNewPost } from "../redux/slice/postsSlice";
import { useNotifications } from "@toolpad/core";
import useCloudinaryImage from "./hooks/useCloudinaryImage";

const CreatePost = ({ open, handleClose }) => {
  const [postText, setPostText] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaPreviews, setMediaPreviews] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const notification = useNotifications();
  const { auth } = useSelector(getAuth);
  const user = auth?.user || {};
  const dispatch = useDispatch();
  const { uploadImages, uploading, imageUrls } = useCloudinaryImage();

  const handleMediaUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length) {
      const previews = files.map((file) => URL.createObjectURL(file));
      setMediaFiles([...mediaFiles, ...files]);
      setMediaPreviews([...mediaPreviews, ...previews]);
    }
  };

  const handlePostSubmit = async () => {
    if (!postText.trim() && mediaFiles.length === 0) return;
    
    let uploadedImageUrls = [];
    if (mediaFiles.length > 0) {
      uploadedImageUrls = await uploadImages(mediaFiles, `/posts/${auth.user.email}`);
      if (!uploadedImageUrls) {
        notification.show("Error in uploading images!", { severity: "warning", autoHideDuration: 4000 });
        return;
      }
    }

    const newPost = {
      text: postText,
      media: uploadedImageUrls,
      hashtags,
    };
    
    dispatch(addNewPost(newPost));
    notification.show("Post Under Review", { severity: "info", autoHideDuration: 3000 });
    resetForm();
  };

  const handleHashtagInput = (event) => {
    if (event.key === "Enter" && event.target.value.trim()) {
      const tag = event.target.value.trim();
      if (!hashtags.includes(tag)) {
        setHashtags([...hashtags, tag]);
      }
      event.target.value = "";
    }
  };

  const removeHashtag = (tagToRemove) => {
    setHashtags(hashtags.filter((tag) => tag !== tagToRemove));
  };

  const resetForm = () => {
    setPostText("");
    setMediaFiles([]);
    setMediaPreviews([]);
    setHashtags([]);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="post-modal-title" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Box sx={{ width: "450px", backgroundColor: "white", borderRadius: "12px", padding: "20px", boxShadow: "0px 4px 10px rgba(0,0,0,0.3)" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" fontWeight="bold">Create Post</Typography>
          <IconButton onClick={handleClose}><Close /></IconButton>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
          <Avatar src={user.profileImage || "/default-avatar.png"} sx={{ width: 45, height: 45 }} />
          <Typography fontWeight="bold">{user.name}</Typography>
        </Box>

        <TextField
          multiline
          fullWidth
          rows={4}
          placeholder="What's on your mind?"
          variant="standard"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          sx={{ mt: 2, mb: 2, borderBottom: "1px solid rgba(0,0,0,0.1)" }}
        />

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
          {mediaPreviews.map((preview, index) => (
            <Box
              key={index}
              sx={{
                width: "100px",
                height: "100px",
                backgroundImage: `url(${preview})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "10px",
                position: "relative",
              }}
            />
          ))}
        </Box>

        <TextField placeholder="Add hashtags (press Enter)..." variant="outlined" fullWidth sx={{ mt: 2 }} onKeyPress={handleHashtagInput} />
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
          {hashtags.map((tag, index) => (
            <Chip key={index} label={tag} onDelete={() => removeHashtag(tag)} sx={{ backgroundColor: "#e1f5fe", color: "#0277bd" }} />
          ))}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mt: 2, gap: 2 }}>
          <Button component="label" sx={{ color: "blue", cursor: "pointer" }}>
            <AddPhotoAlternate /> Upload Images
            <input type="file" accept="image/*" multiple hidden onChange={handleMediaUpload} />
          </Button>
        </Box>

        <Button
          fullWidth
          variant="contained"
          sx={{ backgroundColor: "#1877f2", color: "white", borderRadius: "20px", marginTop: "10px", "&:hover": { backgroundColor: "#165db0" } }}
          onClick={handlePostSubmit}
          disabled={!postText.trim() && mediaFiles.length === 0}
        >
          Post
        </Button>
      </Box>
    </Modal>
  );
};

export default CreatePost;