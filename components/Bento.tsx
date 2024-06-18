"use client";

import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/magicui/bento-grid";
import {
  CirclePlus,
  KanbanSquare,
  LayoutTemplate,
  LucideListTodo,
  SquareGanttChart,
  VideoIcon,
} from "lucide-react";
import Image from "next/image";

import { useTheme } from "next-themes";

export function BentoGridSecondDemo() {
  const { theme } = useTheme();
  const items = [
    {
      title: "Your meeting platfrom",
      description: "Host meetings, standups on WorkPilot.",
      header: (
        <Image
          src='/meetings.jpg'
          alt='TymelyPreview'
          width={600}
          height={600}
          className='z-0 overflow-hidden object-cover top-10 relative opacity-60 group-hover/bento:scale-105 transition-all'
        />
      ),
      className: "md:col-span-2",
      icon: <VideoIcon className='h-4 w-4 text-neutral-500' />,
      commingSoon: false,
    },
    {
      title: "Create tasks",
      description: "Create tasks, assign tasks to team members and more",
      header: (
        <Image
          src='/create-task.jpg'
          alt='TymelyPreview'
          width={600}
          height={600}
          className='z-0 overflow-hidden object-cover top-10 relative opacity-60 group-hover/bento:scale-105 transition-all'
        />
      ),
      className: "md:col-span-1",
      icon: <LucideListTodo className='h-4 w-4 text-neutral-500' />,
      commingSoon: false,
    },
    {
      title: "Manage your tasks",
      description: "Manage your tasks and work on them with ease.",
      header: (
        <Image
          src='/manage-task.jpg'
          alt='TymelyPreview'
          width={400}
          height={400}
          className='z-0 overflow-hidden object-cover top-10 relative opacity-60 group-hover/bento:scale-105 transition-all'
        />
      ),
      className: "md:col-span-1",
      icon: <SquareGanttChart className='h-4 w-4 text-neutral-500' />,
      commingSoon: false,
    },
    {
      title: "One commnunication Platforom.",
      description:
        "Collborate with your team and keep up with updates with chat",
      header: (
        <Image
          src='/view.jpg'
          alt='TymelyPreview'
          width={600}
          height={600}
          className='z-0 overflow-hidden object-cover opacity-60 group-hover/bento:scale-105 transition-all h-32 md:h-auto brightness-75 rounded-lg'
        />
      ),
      className: "md:col-span-2",
      icon: <KanbanSquare className='h-4 w-4 text-neutral-500' />,
      commingSoon: false,
    },
  ];
  return (
    <BentoGrid className='max-w-4xl mx-auto md:auto-rows-[20rem]'>
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
          icon={item.icon}
          comingSoon={item.commingSoon}
        />
      ))}
    </BentoGrid>
  );
}
