import { moderationController } from "@/modules/moderation/controller/moderation.controller";

export async function GET() {
  return await moderationController.getPending();
}

export async function POST(request) {
  return await moderationController.update(request);
}
