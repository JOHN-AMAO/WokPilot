"use server";
import { db } from "@/lib/db";
export async function getMembers(projectId: string) {
  const members = await db.member.findMany({
    where: {
      projectId: projectId,
    },
    include: {
      profile: true,
    },
  });
  return members;
}
