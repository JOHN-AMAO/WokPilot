import AddTask from "@/components/AddTask";
import { KanbanBoard } from "@/components/Tasks/KanbanBoard";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ParkingMeter } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { TaskProvider } from "@/Provider/TaskContext";

interface TaskIdprops {
  params: {
    taskId: string;
  };
}

const Page = async ({ params }: TaskIdprops) => {
  const profile = await currentProfile();
  if (!profile) return redirect("/");
  const project = await db.project.findUnique({
    where: {
      id: params.taskId,
    },
  });
  if (!project) redirect("/project");

  return (
    <>
      <TaskProvider>
        <div className='bg-black'>
          <div className='flex flex-row justify-between items-center pt-10  p-10'>
            <h1>/{project?.name}</h1>
            <AddTask
              profileId={profile.id}
              projectId={params.taskId}
            />
          </div>
          <KanbanBoard projectId={params.taskId} />
        </div>
      </TaskProvider>
    </>
  );
};

export default Page;
