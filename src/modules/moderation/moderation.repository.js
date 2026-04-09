import { prisma } from "@/infrastucture/prisma";

export const moderationRepository = {
  getPendingContributions: async () => {
    return await prisma.contribution.findMany({
      where: {
        status: "pending",
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  updateStatus: async (id, status, cellId = null) => {
    const updateData = { status };
    if (cellId !== null) {
      updateData.cellId = cellId;
    }

    return await prisma.contribution.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
  },

  getNextAvailableCell: async () => {
    const count = await prisma.cell.count();
    return count + 1;
  },

  createCell: async (x, y) => {
    return await prisma.cell.create({
      data: { x, y }
    });
  }
};
