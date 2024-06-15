"use client";
import React from "react";
import { useModal } from "@/hooks/useModalStore";
import { CirclePlus } from "lucide-react";

const NewButtonChannel = ({ project }: any) => {
  const { onOpen } = useModal();
  return (
    <button onClick={() => onOpen("createChannel", { project })}>
      <div className='flex gap-2'>
        <p>Add New </p>
        <CirclePlus
          color='#ebe5e5'
          strokeWidth={2.5}
        />
      </div>
    </button>
  );
};

export default NewButtonChannel;
