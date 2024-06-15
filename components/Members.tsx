import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

import React from "react";
import { ServerSection } from "./ServerSection";
import { ServerMember } from "./ServerMember";

interface MemberProps {
  id: string;
}

const Members = async ({ id }: MemberProps) => {
  const profile = await currentProfile();
  if (!profile) {
    redirect("/");
  }

  const project = await db.project.findUnique({
    where: {
      id: id,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  if (!project) {
    return redirect("/");
  }

  const members = project.members.filter(
    (member) => member.profile.id !== profile.id
  );
  const role = project.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div>
      {!!members?.length && (
        <div className='mb-2'>
          <ServerSection
            sectionType='members'
            role={role}
            label='Members'
            project={project}
          />
          <div className='space-y-[2px]'>
            {members.map((member) => (
              <ServerMember
                key={member.id}
                member={member}
                project={project}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Members;
