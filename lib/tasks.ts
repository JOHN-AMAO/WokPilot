"use server";
import { db } from "@/lib/db";
import { TaskStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getTasks = async (projectId: string) => {
  const tasks = await db.task.findMany({
    where: {
      projectId: projectId,
    },
  });
  revalidatePath(`/tasks/${projectId}`);
  return tasks;
};

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
  revalidatePath(`/tasks/${values.projectId}`);
  return task;
};

export const updateStatus = async (
  projectId: string,
  taskId: string,
  status: TaskStatus
) => {
  try {
    const newStatus = await db.task.update({
      where: {
        projectId: projectId,
        id: taskId,
      },
      data: {
        status: status,
      },
    });
    return newStatus; // Adjust according to what db.task.update returns
  } catch (error) {
    console.error("Error updating task status:", error);
    throw error; // Handle error appropriately
  }
};
