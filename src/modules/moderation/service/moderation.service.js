import { moderationRepository } from "../repository/moderation.repository";
import { generateSilhouettePoint } from "@/lib/utils";


export const moderationService = {
  getPending: async () => {
    return await moderationRepository.getPendingContributions();
  },

  approve: async (id) => {
    try {
      // 1. Logic for assigning coordinates in the silhouette
      // We can generate a new point based on the AuraCloud logic
      const { x, y } = generateSilhouettePoint(); // A simple internal helper

      // 2. Create the cell
      const cell = await moderationRepository.createCell(x, y);

      // 3. Link contribution to cell and set status to 'approved'
      return await moderationRepository.updateStatus(id, "approved", cell.id);
    } catch (error) {
      console.error("Error in moderationService.approve:", error);
      throw error;
    }
  },

  reject: async (id) => {
    return await moderationRepository.updateStatus(id, "rejected");
  },
};


