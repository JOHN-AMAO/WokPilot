"use client";
import { useSocket } from "@/Provider/socket-provider";
import { Badge } from "./badge";

const SocketIndicator = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge
        variant='outline'
        className='bg-yellow-600 text-white border-none'
      >
        Fallback: Polling every 1s
      </Badge>
    );
  }

  return (
    <Badge
      variant='outline'
      className='bg-emerald-600 text-white border-none'
    >
      Live: Real-time updates
    </Badge>
  );
};

export default SocketIndicator;
