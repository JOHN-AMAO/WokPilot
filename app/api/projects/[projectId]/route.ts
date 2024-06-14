import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  try {
    const profile = await currentProfile();
    const { name, imageUrl } = await req.json();
    if (!profile) {
      return new NextResponse("UNAUTHORIZED");
    }

    const project = await db.project.update({
      where: {
        id: params.projectId,
        profileId: profile.id,
      },
      data: {
        name: name,
        imageUrl: imageUrl,
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    console.log(error);
    return new NextResponse("PROJECT_ID");
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { projectId: string } }
) {
  const profile = await currentProfile();
  if (!profile) {
    return new NextResponse("UNAUTHORIZED");
  }
  try {
    const project = await db.project.delete({
      where: {
        id: params.projectId,
        profileId: profile.id,
      },
    });
    return NextResponse.json(project);
  } catch (error) {
    console.log(error);
    return new NextResponse("PROJECT_ID");
  }
}
