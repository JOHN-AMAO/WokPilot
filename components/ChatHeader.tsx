import {
  ALargeSmall,
  AudioLines,
  ChevronDown,
  CirclePlus,
  Hash,
  Mic,
  ShieldAlert,
  ShieldCheck,
  Video,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ServerSearch from "./ServerSearch";

import { MobileToggle } from "@/components/ui/mobile-toggle";
import { UserAvatar } from "./ui/user-avatar";
import SocketIndicator from "./ui/socket-indicator";
import { ChatVideoButton } from "./chat/chat-video-button";
import { db } from "@/lib/db";
import { ChannelType, MemberRole } from "@prisma/client";
import { ServerChannel } from "./ServerChannel";
import { currentProfile } from "@/lib/current-profile";
import { auth } from "@clerk/nextjs/server";
import NewButtonChannel from "./NewButtonChannel";
import ProjectHeader from "./project/ProjectHeader";

interface ChatHeaderProps {
  projectId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
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

export const ChatHeader = async ({
  projectId,
  name,
  type,
  imageUrl,
}: ChatHeaderProps) => {
  const profile = await currentProfile();

  if (!profile) return auth().redirectToSignIn();

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
  if (!project) return null;

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
    <div className='text-md font-semibold px-3 py-8 flex items-center h-12 w-full border-neutral-200 dark:border-neutral-800 border-b-2'>
      <MobileToggle projectId={projectId} />
      <h1 className='text-md font-semibold px-3 flex items-center'>
        {project.name}
      </h1>
      {type === "channel" && (
        <div className='md:flex flex-row gap-4 hidden'>
          <DropdownMenu>
            <DropdownMenuTrigger className='font-semibold text-md text-black dark:text-white border rounded-md p-1'>
              <div className='flex gap-2'>
                <div className='bg-blue-800 rounded-sm'>
                  <ALargeSmall
                    color='#ebe5e5'
                    strokeWidth={2.5}
                  />
                </div>
                <p>Text channels</p>
                <ChevronDown
                  color='#ebe5e5'
                  strokeWidth={2.5}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {textChannels.map((channel) => (
                <DropdownMenuItem key={channel.id}>
                  <ServerChannel
                    key={channel.id}
                    channel={channel}
                    role={role}
                    project={project}
                  />
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />
              <DropdownMenuLabel>
                <NewButtonChannel project={project} />
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className='font-semibold text-md text-black dark:text-white border rounded-md p-1'>
              <div className='flex gap-2'>
                <div className='bg-blue-800 rounded-sm'>
                  <AudioLines
                    color='#ebe5e5'
                    strokeWidth={2.5}
                  />
                </div>
                <p>Audio Channels</p>
                <ChevronDown
                  color='#ebe5e5'
                  strokeWidth={2.5}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {audioChannels.map((channel) => (
                <DropdownMenuItem key={channel.id}>
                  <ServerChannel
                    key={channel.id}
                    channel={channel}
                    role={role}
                    project={project}
                  />
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />
              <DropdownMenuLabel>
                <NewButtonChannel project={project} />
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className='font-semibold text-md text-black dark:text-white border rounded-md p-1'>
              <div className='flex gap-2'>
                <div className='bg-blue-800 rounded-sm'>
                  <Video
                    color='#ebe5e5'
                    strokeWidth={2.5}
                  />
                </div>
                <p>Video Channels</p>
                <ChevronDown
                  color='#ebe5e5'
                  strokeWidth={2.5}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {videoChannels.map((channel) => (
                <DropdownMenuItem key={channel.id}>
                  <ServerChannel
                    key={channel.id}
                    channel={channel}
                    role={role}
                    project={project}
                  />
                </DropdownMenuItem>
              ))}

              <DropdownMenuSeparator />
              <DropdownMenuLabel>
                <NewButtonChannel project={project} />
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className='border rounded-lg'>
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
          <div>
            <ProjectHeader
              project={project}
              role={role}
            />
          </div>
        </div>
      )}

      {type === "conversation" && (
        <UserAvatar
          src={imageUrl}
          className='h-8 w-8 md:h-8 md:w-8 mr-2'
        />
      )}
      <div className='ml-auto flex items-center'>
        {type === "conversation" && <ChatVideoButton />}
        {/* <SocketIndicator /> */}
      </div>
    </div>
  );
};
