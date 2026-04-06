import { moderationService } from "../service/moderation.service";

export const moderationController = {
  getPending: async () => {
    try {
      const data = await moderationService.getPending();
      return Response.json(data);
    } catch (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  },

  update: async (request) => {
    try {
      const { id, action } = await request.json();

      if (action === "approve") {
        const result = await moderationService.approve(id);
        return Response.json(result);
      } else if (action === "reject") {
        const result = await moderationService.reject(id);
        return Response.json(result);
      }

      return Response.json({ error: "Invalid action" }, { status: 400 });
    } catch (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  },
};
