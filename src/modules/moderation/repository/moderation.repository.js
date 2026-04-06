import { prisma } from "@/lib/prisma";

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
    // Basic logic to find the next available cell in a spiral or grid
    // For now, we'll find the max cell id and increment, or find a hole.
    // Or just create a new cell if it's dynamic.
    
    const count = await prisma.cell.count();
    // Simplified: we'll create cells as needed or use a predefined grid
    // Let's create a new cell with spiral coordinates.
    return count + 1; // Simplified for now
  },

  createCell: async (x, y) => {
    return await prisma.cell.create({
      data: { x, y }
    });
  }
};
