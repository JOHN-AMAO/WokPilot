import { db } from "@/lib/db";
import { ProfileSetup } from "@/lib/profile-setup";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
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
    redirect(`/tasks/${project?.id}`);
  }

  return (
    <div>
      <div className='flex justify-center items-center'>
        <h1 className='text-5xl'>Go create your first project first</h1>
      </div>
    </div>
  );
};

export default Page;
