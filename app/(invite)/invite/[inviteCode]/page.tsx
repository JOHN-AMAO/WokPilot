import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import { db } from "@/lib/db";

const Page = async ({ params }: { params: { inviteCode: string } }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect(auth().redirectToSignIn());
  }
  if (!params.inviteCode) {
    redirect("/");
  }
  const existingProject = await db.project.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (existingProject) {
    return redirect(`/project/${existingProject.id}`);
  }

  const project = await db.project.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });

  if (project) redirect(`/project/${project.id}`);

  return (
    <div>
      <h1>Invite page</h1>
    </div>
  );
};

export default Page;
