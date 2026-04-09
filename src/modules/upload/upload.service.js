import { uploadRepository } from "./upload.repository";
import cloudinary from "@/infrastucture/cloudinary";

export const uploadService = {
  uploadImage: async (fileContent, metadata) => {
    try {
      const uploadResponse = await cloudinary.uploader.upload(fileContent, {
        folder: "tim_memories",
        resource_type: "image",
        transformation: [
          { width: 1000, crop: "limit" },
          { quality: "auto" },
          { fetch_format: "auto" }
        ]
      });

      const thumbnailResponse = cloudinary.url(uploadResponse.public_id, {
        width: 300,
        height: 300,
        crop: "thumb",
        gravity: "face",
        effect: "grayscale",
        quality: "auto",
        fetch_format: "auto"
      });

      const contribution = await uploadRepository.createContribution({
        imageUrl: uploadResponse.secure_url,
        thumbnailUrl: thumbnailResponse,
        name: metadata.name,
        message: metadata.message,
      });

      return contribution;
    } catch (error) {
      throw new Error(error.message || "Failed to upload memory");
    }
  },
};
