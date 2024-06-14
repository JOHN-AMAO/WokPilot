"use server";
import { db } from "@/lib/db";

export const getTasks = async (projectId: string) => {
  const tasks = await db.task.findMany({
    where: {
      projectId: projectId,
    },
  });
  return tasks;
};

export const createTask = async (values: any) => {
  const task = await db.task.create({
    data: {
      description: values.description,
      fromDate: values.duration?.from,
      toDate: values.duration?.to,
      duration: values.duration,
      projectId: values.projectId,
      profileId: values.userId,
      collaborators: values.collaborators,
    },
  });
  return task;
};
