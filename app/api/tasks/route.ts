import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { description, duration, collaborators, profileId, projectId } =
      await req.json();
    const durationInDays =
      (duration?.to - duration?.from) / (1000 * 60 * 60 * 24);
    const task = await db.task.create({
      data: {
        description,
        duration: Math.ceil(durationInDays),
        collaborators: collaborators.map((collaborator: any) => ({
          name: collaborator.name,
        })),
        fromDate: duration?.from,
        toDate: duration?.to,
      },
    });
    return NextResponse.json(task);
  } catch (error) {
    console.log(error);
  }
}
