import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

interface ProjectIdProps {
  params: {
    projectId: string;
  };
}

const page = async ({ params }: ProjectIdProps) => {
  const profile = await currentProfile();
  if (!profile) {
    redirect("/sign-in");
  }

  const project = await db.project.findUnique({
    where: {
      id: params.projectId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
      },
    },
  });

  const initialChannel = project?.channels[0];
  if (initialChannel?.name !== "general") return null;

  return redirect(`/project/${params.projectId}/channels/${initialChannel.id}`);
};

export default page;
