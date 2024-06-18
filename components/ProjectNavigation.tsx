"use client";
import React, { useEffect } from "react";
import { UserButton } from "@clerk/nextjs";
import {
  Layers,
  MessageCircle,
  ListChecks,
  BotMessageSquare,
  SeparatorVerticalIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const ProjectNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const here = pathname?.startsWith("/project");
  const here2 = pathname?.startsWith("/tasks");
  const here3 = pathname?.startsWith("/ai-chat");

  return (
    <>
      <div className='py-2 flex flex-col justify-center items-center mx-3 dark:bg-black'>
        <div className='pt-2'>
          <Layers />
        </div>
        <div className='pt-10 flex flex-col gap-5'>
          <div
            className={`${
              here ? "bg-blue-500" : ""
            } rounded-md p-2 cursor-pointer`}
            onClick={() => {
              router.push("/project");
            }}
          >
            <MessageCircle
              color='#ebe5e5'
              strokeWidth={2.5}
            />
          </div>
          <div
            className={`${
              here2 ? "bg-blue-500" : ""
            } rounded-md p-2 cursor-pointer`}
            onClick={() => {
              router.push("/tasks");
            }}
          >
            <ListChecks
              color='#ebe5e5'
              strokeWidth={2.5}
            />
          </div>
          <div
            className={`${
              here3 ? "bg-blue-500" : ""
            } rounded-md p-2 cursor-pointer`}
            onClick={() => {
              router.push("/ai-chat");
            }}
          >
            <BotMessageSquare
              color='#ebe5e5'
              strokeWidth={2.5}
            />
          </div>
        </div>
        <div className='pb-3 mt-auto flex items-center flex-col gap-y-4'>
          <UserButton
            afterSignOutUrl='/project'
            appearance={{
              elements: {
                avatarBox: "h-[48px] w-[48px]",
              },
            }}
          />
        </div>
      </div>
      <SeparatorVerticalIcon className='h-full bg-zinc-300 dark:bg-zinc-900 w-1' />
    </>
  );
};

export default ProjectNavigation;
