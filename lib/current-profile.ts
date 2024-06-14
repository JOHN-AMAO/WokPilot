import { currentUser } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

export async function currentProfile() {
  const { userId } = await auth();
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
