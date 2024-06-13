import { Server as SocketIoServer } from "socket.io";
import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Project, Member, Profile } from "@prisma/client";

export type ServerWithMembersWithProfiles = Project & {
  members: (Member & { profile: Profile })[];
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIoServer;
    };
  };
};
