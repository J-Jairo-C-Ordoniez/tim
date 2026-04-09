import { moderationRepository } from "./moderation.repository";
import { generateSilhouettePoint } from "@/lib/utils";


export const moderationService = {
  getPending: async () => {
    return await moderationRepository.getPendingContributions();
  },

  approve: async (id) => {
    try {
      const { x, y } = generateSilhouettePoint();
      const cell = await moderationRepository.createCell(x, y);
      return await moderationRepository.updateStatus(id, "approved", cell.id);
    } catch (error) {
      throw error;
    }
  },

  reject: async (id) => {
    return await moderationRepository.updateStatus(id, "rejected");
  },
};