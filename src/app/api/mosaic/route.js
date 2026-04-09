import { mosaicController } from "@/modules/mosaic/mosaic.controller";

export async function GET() {
  return await mosaicController.getMosaic();
}
