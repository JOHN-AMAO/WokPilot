"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ActionTooltip } from "./ui/Actiontooltip";
import { FolderDot } from "lucide-react";

interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export const TaskClick = ({ id, imageUrl, name }: NavigationItemProps) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/tasks/${id}`);
  };

  return (
    <ActionTooltip
      side='right'
      align='center'
      label={name}
    >
      <button
        onClick={onClick}
        className={cn(
          "flex gap-2 items-center mx-3  w-48 rounded-lg transition-all",
          params?.taskId === id && "bg-blue-600   "
        )}
      >
        <FolderDot className='pl-2' />
        <h1 className='text-md text-black text-left p-2 dark:text-white'>
          {name.substring(0, 10)}
        </h1>
      </button>
    </ActionTooltip>
  );
};
