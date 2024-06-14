import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      projectId: string;
    };
  }
) {
  try {
    const profile = await currentProfile();

    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    if (!params.projectId)
      return new NextResponse("project Id missing", { status: 400 });

    const project = await db.project.update({
      where: {
        id: params.projectId,
      },
      data: {
        inviteCode: uuidv4(),
      },
    });

    return NextResponse.json(project);
  } catch (err) {
    console.log("[project_ID]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
