import { mosaicRepository } from "../repository/mosaic.repository";

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
      console.error("Error in mosaicService.getMosaicData:", error);
      throw new Error("Failed to fetch mosaic data");
    }
  },
};
