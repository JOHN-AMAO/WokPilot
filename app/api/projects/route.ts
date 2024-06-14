import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { currentProfile } from "@/lib/current-profile";
import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();
    if (!profile) {
      return NextResponse.json(
        { error: "Unauthorized to access this resource" },
        { status: 401 }
      );
    }
    const project = await db.project.create({
      data: {
        profileId: profile.id,
        name: name,
        imageUrl: imageUrl,
        inviteCode: uuidv4(),
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
        channels: {
          create: [{ name: "general", profileId: profile.id }],
        },
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the project" },
      { status: 500 }
    );
  }
}
