import React from "react";
import { currentProfile } from "@/lib/current-profile";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import ProjectHeader from "./project/ProjectHeader";
import { ChannelType, MemberRole } from "@prisma/client";
import { ScrollArea } from "./ui/scroll-area";
import ServerSearch from "./ServerSearch";
import { Separator } from "./ui/separator";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { ServerSection } from "./ServerSection";
import { ServerChannel } from "./ServerChannel";
import { ServerMember } from "./ServerMember";

interface ProjectSidebarProps {
  projectId: string;
}

const iconMap: Record<ChannelType, JSX.Element> = {
  [ChannelType.TEXT]: <Hash className='mr-2 h-4 w-4' />,
  [ChannelType.AUDIO]: <Mic className='mr-2 h-4 w-4' />,
  [ChannelType.VIDEO]: <Video className='mr-2 h-4 w-4' />,
};

const roleIconMap: Record<MemberRole, JSX.Element | null> = {
  [MemberRole.GUEST]: null,
  [MemberRole.MEMBER]: null, // Include MEMBER role with no icon
  [MemberRole.MODERATOR]: (
    <ShieldCheck className='h-4 w-4 mr-2 text-indigo-500' />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className='h-4 w-4 mr-2 text-rose-500' />,
};

const ServerSidebar = async ({ projectId }: ProjectSidebarProps) => {
  const profile = await currentProfile();
  if (!profile) {
    redirect("/");
  }
  const project = await db.project.findUnique({
    where: {
      id: projectId,
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

  const textChannels = project.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = project.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = project.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const members = project.members.filter(
    (member) => member.profile.id !== profile.id
  );
  const role = project.members.find(
    (member) => member.profileId === profile.id
  )?.role;

  return (
    <div className='flex flex-col h-full text-primary w-full dark:bg-black bg-[#F2F3F5]'>
      <ProjectHeader
        project={project}
        role={role}
      />
      <ScrollArea className='flex-1 px-3'>
        <div className='mt-2'>
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Audio Channels",
                type: "channel",
                data: audioChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                })),
              },
              {
                label: "Members",
                type: "member",
                data: members.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role as MemberRole],
                })),
              },
            ]}
          />
        </div>
        <Separator className='bg-zinc-200 dark:bg-zinc-700 rounded-md my-2' />

        {!!textChannels?.length && (
          <div className='mb-2'>
            <ServerSection
              sectionType='channels'
              channelType={ChannelType.TEXT}
              role={role}
              label='Text Channels'
            />
            <div className='space-y-[2px]'>
              {textChannels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  project={project}
                />
              ))}
              {!!audioChannels?.length && (
                <div className='mb-2'>
                  <ServerSection
                    sectionType='channels'
                    channelType={ChannelType.AUDIO}
                    role={role}
                    label='Audio Channels'
                  />
                  <div className='space-y-[2px]'>
                    {audioChannels.map((channel) => (
                      <ServerChannel
                        key={channel.id}
                        channel={channel}
                        role={role}
                        project={project}
                      />
                    ))}
                  </div>
                </div>
              )}
              {!!videoChannels?.length && (
                <div className='mb-2'>
                  <ServerSection
                    sectionType='channels'
                    channelType={ChannelType.VIDEO}
                    role={role}
                    label='Video Channels'
                  />
                  <div className='space-y-[2px]'>
                    {videoChannels.map((channel) => (
                      <ServerChannel
                        key={channel.id}
                        channel={channel}
                        role={role}
                        project={project}
                      />
                    ))}
                  </div>
                </div>
              )}
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
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default ServerSidebar;
