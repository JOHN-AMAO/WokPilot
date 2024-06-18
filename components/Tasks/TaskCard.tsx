import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cva } from "class-variance-authority";
import { GripVertical, TimerIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Collaborator, TaskStatus } from "@prisma/client";

export interface Task {
  id: string;
  status: TaskStatus;
  description: string;
  duration: number;
  fromDate: Date;
  toDate: Date;
  projectId: string;
  collaborators: Collaborator[];
}

interface TaskCardProps {
  task: Task;
  isOverlay?: boolean;
  projectId: string;
}

export type TaskType = "Task";

export interface TaskDragData {
  type: TaskType;
  task: Task;
}

export function TaskCard({ task, isOverlay, projectId }: TaskCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    } satisfies TaskDragData,
    attributes: {
      roleDescription: "Task",
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva("", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  });

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
      })}
    >
      <CardHeader className='px-3 py-3 space-between flex flex-row border-b-2 border-secondary relative'>
        <Button
          variant={"ghost"}
          {...attributes}
          {...listeners}
          className='p-1 text-secondary-foreground/50 -ml-2 h-auto cursor-grab'
        >
          <span className='sr-only'>Move task</span>
          <GripVertical />
        </Button>
        <Badge
          variant={"outline"}
          className='ml-auto font-semibold'
        >
          Task
        </Badge>
      </CardHeader>
      <CardContent className='px-3 pt-3 pb-6 text-left whitespace-pre-wrap '>
        <div className='flex flex-col gap-4'>
          <div>{task.description}</div>
          <div className='flex justify-between '>
            <div className='flex flex-row gap-2'>
              <TimerIcon />
              <p>{task.duration} days</p>
            </div>
            <div>
              <p>collaborators</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
