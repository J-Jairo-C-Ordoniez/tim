import { uploadService } from "../service/upload.service";

export const uploadController = {
  upload: async (request) => {
    try {
      const data = await request.json();
      
      const { fileContent, name, message } = data;

      if (!fileContent || !name || !message) {
        return Response.json({ error: "Missing required fields" }, { status: 400 });
      }

      const result = await uploadService.uploadImage(fileContent, { name, message });
      return Response.json(result);
    } catch (error) {
      console.error("Error in uploadController.upload:", error);
      return Response.json({ error: error.message || "Upload failed" }, { status: 500 });
    }
  },
};
