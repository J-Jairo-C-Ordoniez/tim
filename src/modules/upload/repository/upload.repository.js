import { prisma } from "@/lib/prisma";

export const uploadRepository = {
  createContribution: async (data) => {
    return await prisma.contribution.create({
      data: {
        imageUrl: data.imageUrl,
        thumbnailUrl: data.thumbnailUrl,
        name: data.name,
        message: data.message,
        status: "pending",
      },
    });
  },
};
