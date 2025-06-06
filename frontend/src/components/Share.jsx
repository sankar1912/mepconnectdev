import React, { useRef } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import html2canvas from "html2canvas";

function Share({ post, open, onClose }) {
  const cardRef = useRef(null);

  const handleShare = async () => {
    if (!navigator.canShare) {
      alert("Sharing images is not supported on this device.");
      return;
    }

    try {

      const canvas = await html2canvas(cardRef.current, { useCORS: true });
      const blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );
      const capturedFile = new File([blob], "post.png", { type: "image/png" });

      const imageFiles = await Promise.all(
        post?.image?.map(async (img, index) => {
          const response = await fetch(img);
          const blob = await response.blob();
          return new File([blob], `image-${index}.png`, { type: blob.type });
        }) || []
      );

      const filesToShare = [capturedFile, ...imageFiles];

      if (navigator.canShare({ files: filesToShare })) {
        await navigator.share({
          title: post.name,
          text: post.text,
          files: filesToShare,
        });
      } else {
        alert("Sharing images is not supported.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="share-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: "12px",
          boxShadow: 24,
          p: 2,
        }}
      >
        <Card ref={cardRef}>
          <IconButton
            sx={{ position: "absolute", right: 8, top: 8 }}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>

          
          {post?.media?.length > 0 &&
            post.media.map((img, index) => (
              <CardMedia
                key={index}
                component="img"
                height="200"
                src={img instanceof Blob ? URL.createObjectURL(img) : img}
                alt={`Post media ${index + 1}`}
                sx={{ objectFit: "cover", mb: 1 }} 
              />
            ))}

          <CardContent>
            <Typography variant="h6" fontWeight="bold">
              {post.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {post.department}
            </Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {post.text}
            </Typography>

            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Button variant="contained" color="primary" onClick={handleShare}>
                Share Post
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
}

export default Share;
