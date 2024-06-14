import { ChatHeader } from "@/components/ChatHeader";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatMessages } from "@/components/chat/chat-messages";
import { MediaRoom } from "@/components/media-room";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";

interface ChannelIdProps {
  params: {
    channelId: string;
    projectId: string;
  };
}

const page = async ({ params }: ChannelIdProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/sign-in");
  }
  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });
  const member = await db.member.findFirst({
    where: {
      projectId: params.projectId,
      profileId: profile.id,
    },
  });
  if (!member || !channel) {
    return redirect("/");
  }

  return (
    <div className='bg-white dark:bg-black flex flex-col h-full'>
      <ChatHeader
        name={channel.name}
        projectId={channel.projectId}
        type='channel'
        key={channel.id}
      />
      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            member={member}
            name={channel.name}
            chatId={channel.id}
            type='channel'
            apiUrl='/api/messages'
            socketUrl='/api/socket/messages'
            socketQuery={{
              channelId: channel.id,
              projectId: channel.projectId,
            }}
            paramKey='channelId'
            paramValue={channel.id}
          />
          <ChatInput
            name={channel.name}
            type='channel'
            apiUrl='/api/socket/messages/messages'
            query={{
              channelId: channel.id,
              projectId: channel.projectId,
            }}
          />
        </>
      )}
      {channel.type === ChannelType.AUDIO && (
        <MediaRoom
          chatId={channel.id}
          video={false}
          audio={true}
        />
      )}
      {channel.type === ChannelType.VIDEO && (
        <MediaRoom
          chatId={channel.id}
          video={true}
          audio={true}
        />
      )}
    </div>
  );
};

export default page;
