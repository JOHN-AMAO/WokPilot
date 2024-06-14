import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const { role } = await req.json();

    const projectId = searchParams.get("projectId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!projectId) {
      return new NextResponse("project ID missing", { status: 400 });
    }

    if (!params.memberId) {
      return new NextResponse("Member ID missing", { status: 400 });
    }

    const project = await db.project.update({
      where: {
        id: projectId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
              profileId: {
                not: profile.id,
              },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log("[MEMBERS_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get("projectId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!projectId) {
      return new NextResponse("project ID missing", { status: 400 });
    }

    if (!params.memberId) {
      return new NextResponse("Member ID missing", { status: 400 });
    }

    const project = await db.project.update({
      where: {
        id: projectId,
        profileId: profile.id,
      },
      data: {
        members: {
          deleteMany: {
            id: params.memberId,
            profileId: {
              not: profile.id,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.log("[MEMBERS_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
