import { mosaicService } from "../service/mosaic.service";

export const mosaicController = {
  getMosaic: async () => {
    try {
      const data = await mosaicService.getMosaicData();
      return Response.json(data);
    } catch (error) {
      console.error("Error in mosaicController.getMosaic:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }
  },
};
