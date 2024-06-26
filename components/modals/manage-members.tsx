"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModalStore";
import { ScrollArea } from "../ui/scroll-area";
import { ServerWithMembersWithProfiles } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from "lucide-react";
import { UserAvatar } from "../ui/user-avatar";
import { useState } from "react";
import { MemberRole } from "@prisma/client";
import qs from "query-string";
import axios from "axios";
import { useRouter } from "next/navigation";

const roleIconMap: Record<MemberRole, JSX.Element | null> = {
  GUEST: null,
  MEMBER: null,
  MODERATOR: <ShieldCheck className='h-4 w-4 ml-2 text-indigo-500' />,
  ADMIN: <ShieldAlert className='h-4 w-4 text-rose-500' />,
};

export const MembersModal = () => {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState("");
  const { isOpen, onOpen, onClose, type, data } = useModal();
  const isModalOpen = isOpen && type == "manageMembers";
  const { project }: any = data as { server: ServerWithMembersWithProfiles };

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          projectId: project.id,
        },
      });
      const response = await axios.patch(url, { role });
      router.refresh();
      onOpen("manageMembers", { project: response.data });
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingId("");
    }
  };

  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          projectId: project.id,
        },
      });
      const response = await axios.delete(url);
      router.refresh();
      onOpen("manageMembers", { project: response.data });
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingId("");
    }
  };

  return (
    <Dialog
      open={isModalOpen}
      onOpenChange={onClose}
    >
      <DialogContent className='text-white overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Manage Members
          </DialogTitle>
          <DialogDescription className='text-center'>
            {project?.members?.length} Members
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='mt-8 max-h-[420px] pr-6'>
          {project?.members?.map((member: any) => (
            <div
              key={member.id}
              className='flex items-center gap-x-2 mb-6'
            >
              <UserAvatar src={member.profile.imageUrl} />
              <div className='flex flex-col gap-y-1'>
                <div className='text-xs font-semibold flex items-center gap-x-1'>
                  {member.profile.name}
                  {roleIconMap[member.role as MemberRole]}
                </div>
                <p className='text-xs text-white'>{member.profile.email}</p>
              </div>
              {project.profileId !== member.profileId &&
                loadingId !== member.id && (
                  <div className='ml-auto'>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className='h-4 w-4' />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side='left'>
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className='flex items-center'>
                            <ShieldQuestion className='w-4 h-4 mr-2' />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem
                                onClick={() => onRoleChange(member.id, "GUEST")}
                              >
                                <Shield className='h-4 w-4 mr-2' />
                                Guest
                                {member.role === "GUEST" && (
                                  <Check className='h-4 w-4 ml-auto' />
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() =>
                                  onRoleChange(member.id, "MODERATOR")
                                }
                              >
                                <ShieldCheck className='h-4 w-4 mr-2' />
                                Moderator
                                {member.role === "MODERATOR" && (
                                  <Check className='h-4 w-4 ml-auto' />
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onKick(member.id)}>
                          <Gavel className='h-4 w-4 mr-2' />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              {loadingId === member.id && (
                <Loader2 className='animate-spin ml-auto w-4 h-4' />
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
