import { mosaicController } from "@/modules/mosaic/controller/mosaic.controller";

export async function GET() {
  return await mosaicController.getMosaic();
}
