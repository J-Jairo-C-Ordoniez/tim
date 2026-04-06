import { prisma } from "@/lib/prisma";

export const mosaicRepository = {
  getApprovedContributions: async () => {
    return await prisma.contribution.findMany({
      where: {
        status: "approved",
      },
      include: {
        cell: true,
      },
    });
  },

  getAllCells: async () => {
    return await prisma.cell.findMany();
  },
};
