import { useState } from "react";

const useCloudinaryFile = () => {
  const [uploading, setUploading] = useState(false);
  const [fileUrls, setFileUrls] = useState(null);

  const uploadFiles = async (files, foldername) => {
    if (!files || !foldername) return;

    setUploading(true);
    const fileArray = Array.isArray(files) ? files : [files];

    try {
      const uploadedUrls = await Promise.all(
        fileArray.map((file) => uploadToCloudinary(file, foldername))
      );

      const result = uploadedUrls.length === 1 ? uploadedUrls[0] : uploadedUrls;
      setFileUrls(result);
      return result;
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const uploadToCloudinary = async (file, foldername) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "web_test_default"); 
    formData.append("folder", foldername);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dpyothauk/raw/upload`, 
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Upload failed");
    return data.secure_url;
  };

  return { uploadFiles, uploading, fileUrls };
};

export default useCloudinaryFile;
