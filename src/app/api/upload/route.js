import { uploadController } from "@/modules/upload/controller/upload.controller";

export async function POST(request) {
  return await uploadController.upload(request);
}
