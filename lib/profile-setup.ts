import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";
import { redirect } from "next/navigation";

export const ProfileSetup = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-up");
  }
  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });
  if (profile) return profile;
  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.lastName} ${user.firstName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });
  return newProfile;
};
