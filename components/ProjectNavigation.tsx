"use client";
import React, { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import {
  Layers,
  Home,
  MessageCircle,
  ListChecks,
  BotMessageSquare,
  SeparatorVerticalIcon,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { ServerChannel } from "./ServerChannel";

const ProjectNavigation = () => {
  const router = useRouter();

  const [route, setRoute] = useState("/project");

  return (
    <>
      <div className='py-2 flex flex-col justify-center items-center mx-3 dark:bg-black'>
        <div className='pt-2'>
          <Layers />
        </div>
        <div className='pt-10 flex flex-col gap-5'>
          <div
            className={`${
              route === "/project" ? "bg-blue-500" : ""
            } rounded-md p-2 cursor-pointer`}
            onClick={() => {
              setRoute("/project");
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
              route === "/tasks" ? "bg-blue-500" : ""
            } rounded-md p-2 cursor-pointer`}
            onClick={() => {
              setRoute("/tasks");
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
              route === "/ai-chat" ? "bg-blue-500" : ""
            } rounded-md p-2 cursor-pointer`}
            onClick={() => {
              setRoute("/ai-chat");
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
