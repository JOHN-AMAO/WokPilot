"use client";
import { Plus } from "lucide-react";
import { ActionTooltip } from "./ui/Actiontooltip";
import { useModal } from "@/hooks/useModalStore";

export const NavigationAction = () => {
  const { onOpen } = useModal();
  return (
    <div>
      <ActionTooltip
        side='right'
        align='center'
        label='New Project'
      >
        <button
          onClick={() => onOpen("createServer")}
          className='group flex items-center'
        >
          <div className='flex mx-3 h-[20px] w-[20px] rounded-[24px] group-hover:rounded-[4px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-blue-500'>
            <Plus
              className='group-hover:text-white transition text-blue-500'
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};
