import { getAuth } from "@clerk/nextjs/server";
import { db } from "./db";
import { NextApiRequest } from "next";

export async function currentProfile(req: NextApiRequest) {
  const { userId } = await getAuth(req);
  if (!userId) {
    return null;
  }
  const profile = db.profile.findUnique({
    where: {
      userId,
    },
  });
  return profile;
}
