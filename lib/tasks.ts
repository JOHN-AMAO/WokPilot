"use server";
import { db } from "@/lib/db";

export const createTask = async (values: any) => {
  console.log(values);
  const durationInDays =
    (values.duration?.to - values.duration?.from) / (1000 * 60 * 60 * 24);
  const task = await db.task.create({
    data: {
      description: values.description,
      fromDate: values.duration?.from,
      toDate: values.duration?.to,
      duration: Math.ceil(durationInDays),
      collaborators: {
        create: values.collaborators.map((collaborator: any) => ({
          name: collaborator,
        })),
      },
      projectId: values.projectId,
    },
  });
  return task;
};
