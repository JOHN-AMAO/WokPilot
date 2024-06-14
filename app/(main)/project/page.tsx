import React from "react";
import { ProfileSetup } from "@/lib/profile-setup";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import CreateProjectModal from "@/components/modals/InitialCreateProjectModal";

const page = async () => {
  const profile = await ProfileSetup();

  const project = await db.project.findFirst({
    where: {
      members: {
        some: {
          profileId: profile?.id,
        },
      },
    },
  });
  if (project) {
    redirect(`/project/${project?.id}`);
  }

  return (
    <div>
      <h1>Create Your First Project/Team</h1>
      <CreateProjectModal />
    </div>
  );
};

export default page;
