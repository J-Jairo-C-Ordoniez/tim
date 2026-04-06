import { v2 as cloudinary } from "cloudinary";
import { uploadRepository } from "../repository/upload.repository";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadService = {
  uploadImage: async (fileContent, metadata) => {
    try {
      // 1. Upload to Cloudinary (Full Size)
      const uploadResponse = await cloudinary.uploader.upload(fileContent, {
        folder: "tim_memories",
        resource_type: "image",
        // Cloudinary transformation for optimization
        transformation: [
          { width: 1000, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" }
        ]
      });

      // 2. Generate Thumbnail (smaller, grayscale option if needed for the design)
      const thumbnailResponse = cloudinary.url(uploadResponse.public_id, {
        width: 300,
        height: 300,
        crop: "thumb",
        gravity: "face",
        effect: "grayscale",
        quality: "auto",
        fetch_format: "auto"
      });

      // 3. Save to Database via Repository
      const contribution = await uploadRepository.createContribution({
        imageUrl: uploadResponse.secure_url,
        thumbnailUrl: thumbnailResponse,
        name: metadata.name,
        message: metadata.message,
      });

      return contribution;
    } catch (error) {
      console.error("Error in uploadService.uploadImage:", error);
      throw new Error(error.message || "Failed to upload memory");
    }
  },
};
