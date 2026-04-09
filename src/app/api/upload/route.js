import { uploadController } from "@/modules/upload/upload.controller";

export async function POST(request) {
  return await uploadController.upload(request);
}
