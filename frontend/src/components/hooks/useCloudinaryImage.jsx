import { useState } from "react";
import Compressor from "compressorjs";

const useCloudinaryImage = () => {
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState(null); 

  const uploadImages = async (images, foldername) => {
    if (!images || !foldername) return;

    setUploading(true);
    const imageArray = Array.isArray(images) ? images : [images];

    try {
      const uploadedUrls = await Promise.all(
        imageArray.map((image) => compressAndUpload(image, foldername))
      );

      const result = uploadedUrls.length === 1 ? uploadedUrls[0] : uploadedUrls;
      setImageUrls(result);
      return result;
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const compressAndUpload = (image, foldername) => {
    return new Promise((resolve, reject) => {
      new Compressor(image, {
        quality: 0.5, 
        success: async (compressedImage) => {
          try {
            const formData = new FormData();
            formData.append("file", compressedImage);
            formData.append("upload_preset", "web_test_default");
            formData.append("folder", foldername); 

            const response = await fetch(
              `https://api.cloudinary.com/v1_1/dpyothauk/image/upload`, 
              {
                method: "POST",
                body: formData,
              }
            );

            const data = await response.json();
            resolve(data.secure_url);
          } catch (error) {
            reject(error);
          }
        },
        error: (err) => reject(err),
      });
    });
  };

  return { uploadImages, uploading, imageUrls };
};

export default useCloudinaryImage;
