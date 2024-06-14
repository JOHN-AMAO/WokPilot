import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getOrCreateConversation } from "@/lib/conversations";
import { currentProfile } from "@/lib/current-profile";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatMessages } from "@/components/chat/chat-messages";
import { ChatInput } from "@/components/chat/chat-input";
import { MediaRoom } from "@/components/media-room";

interface MemberIdPageProps {
  params: {
    memberId: string;
    projectId: string;
  };
  searchParams: {
    video?: boolean;
  };
}

const MemberIdPage = async ({ params, searchParams }: MemberIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return auth().redirectToSignIn();
  }

  const currentMember = await db.member.findFirst({
    where: {
      projectId: params.projectId,
      profileId: profile.id,
    },
    include: {
      profile: true,
    },
  });

  if (!currentMember) {
    return redirect("/");
  }

  const conversation = await getOrCreateConversation(
    currentMember.id,
    params.memberId
  );

  if (!conversation) {
    return redirect(`/project/${params.projectId}`);
  }

  const { memberOne, memberTwo } = conversation;

  const otherMember =
    memberOne.profileId === profile.id ? memberTwo : memberOne;

  return (
    <div className='bg-white dark:bg-[#313338] flex flex-col h-full'>
      <ChatHeader
        imageUrl={otherMember.profile.imageUrl}
        name={otherMember.profile.name}
        projectId={params.projectId}
        type='conversation'
      />
      {searchParams.video && (
        <MediaRoom
          chatId={conversation.id}
          video={true}
          audio={true}
        />
      )}
      {!searchParams.video && (
        <>
          <ChatMessages
            member={currentMember}
            name={otherMember.profile.name}
            chatId={conversation.id}
            type='conversation'
            apiUrl='/api/direct-messages'
            paramKey='conversationId'
            paramValue={conversation.id}
            socketUrl='/api/socket/direct-messages'
            socketQuery={{
              conversationId: conversation.id,
            }}
          />
          <ChatInput
            name={otherMember.profile.name}
            type='conversation'
            apiUrl='/api/socket/direct-messages'
            query={{
              conversationId: conversation.id,
            }}
          />
        </>
      )}
    </div>
  );
};

export default MemberIdPage;
