"use client";
import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ChevronDown,
  GripVertical,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";
import { useModal } from "@/hooks/useModalStore";

interface ServerHeaderProps {
  project: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

const ProjectHeader = ({ project, role }: ServerHeaderProps) => {
  const { onOpen } = useModal();

  const isAdmin = role === MemberRole.ADMIN;

  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className='focus:outline-none'
        asChild
      >
        <button className='text-md  font-semibold ml-10 flex items-center h-12 rounded-sm  hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition'>
          <GripVertical
            h-5
            w-5
            ml-auto
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]'>
        {isModerator && (
          <DropdownMenuItem
            className='text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer'
            onClick={() => onOpen("invite", { project: project })}
          >
            Invite People
            <UserPlus className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            className='px-3 py-2 text-sm cursor-pointer'
            onClick={() => onOpen("editServer", { project: project })}
          >
            project Settings
            <Settings className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem
            className='px-3 py-2 text-sm cursor-pointer'
            onClick={() => onOpen("manageMembers", { project: project })}
          >
            Manage Members
            <Users className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem
            className='px-3 py-2 text-sm cursor-pointer'
            onClick={() => onOpen("createChannel", { project: project })}
          >
            Create Channel
            <PlusCircle className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
        {isModerator && <DropdownMenuSeparator />}
        {isAdmin && (
          <DropdownMenuItem
            className='text-rose-500 px-3 py-2 text-sm cursor-pointer'
            onClick={() => onOpen("deleteServer", { project: project })}
          >
            Delete project
            <Trash className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem
            className='text-rose-500 px-3 py-2 text-sm cursor-pointer'
            onClick={() => onOpen("leaveServer", { project: project })}
          >
            Leave project
            <LogOut className='h-4 w-4 ml-auto' />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectHeader;
