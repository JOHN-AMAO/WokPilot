import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import { NavigationItem } from "./NavigationItem";
import { NavigationAction } from "./NavigationAction";
import Members from "./Members";

const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const projects = await db.project.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <div className='space-y-4 flex flex-col  h-full w-60 text-primary dark:bg-black py-3'>
      <div className='flex items-center'>
        <h1 className='text-2xl font-bold pl-4'>Projects</h1>
        <NavigationAction />
      </div>

      <Separator className='h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-48' />
      <ScrollArea className='flex-1 w-full'>
        {projects.map((project) => (
          <>
            <div
              key={project.id}
              className='mb-2'
            >
              <NavigationItem
                id={project.id}
                name={project.name}
                imageUrl={project.imageUrl}
              />
            </div>
          </>
        ))}
      </ScrollArea>
      <ScrollArea>
        {projects.map((project, key) => (
          <>
            <div key={key}>
              <Members id={project.id} />
            </div>
          </>
        ))}
      </ScrollArea>
    </div>
  );
};

export default NavigationSidebar;
