"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface TaskContextType {
  taskUpdated: boolean;
  updateTasks: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [taskUpdated, setTaskUpdated] = useState(false);

  const updateTasks = () => {
    setTaskUpdated((prev) => !prev);
  };

  return (
    <TaskContext.Provider value={{ taskUpdated, updateTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
