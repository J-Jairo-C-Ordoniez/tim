import { mosaicService } from "./mosaic.service";

export const mosaicController = {
  getMosaic: async () => {
    try {
      const data = await mosaicService.getMosaicData();
      return Response.json(data);
    } catch (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  },
};
