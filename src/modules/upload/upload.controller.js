import { uploadService } from "./upload.service";

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
      return Response.json({ error: error.message || "Upload failed" }, { status: 500 });
    }
  },
};
