import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    if (!profile) return new NextResponse("Unauthorized", { status: 410 });

    if (!projectId)
      return new NextResponse("Project Id missing", { status: 400 });

    if (name === "general")
      return new NextResponse("Name cannot be 'general'", { status: 400 });

    const project = await db.project.update({
      where: {
        id: projectId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type,
          },
        },
      },
    });

    return NextResponse.json(project);
  } catch (err) {
    return new NextResponse("Interrnal Server Error", { status: 500 });
  }
}
