import { prisma } from "@/infrastucture/prisma";

export const mosaicRepository = {
  getApprovedContributions: async () => {
    return await prisma.contribution.findMany({
      where: {
        status: { in: ["approved", "pending"] },
      },
      include: {
        cell: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  getAllCells: async () => {
    return await prisma.cell.findMany();
  },
};
