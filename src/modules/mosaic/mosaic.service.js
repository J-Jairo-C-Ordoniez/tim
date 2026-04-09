import { mosaicRepository } from "./mosaic.repository";

export const mosaicService = {
  getMosaicData: async () => {
    try {
      const contributions = await mosaicRepository.getApprovedContributions();
      const cells = await mosaicRepository.getAllCells();

      return {
        contributions,
        totalContributions: contributions.length,
        cells,
      };
    } catch (error) {
      throw new Error("Failed to fetch mosaic data");
    }
  },
};
