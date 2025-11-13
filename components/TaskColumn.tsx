"use client";

import type React from "react";

import type { Column as ColumnType, TaskStatus } from "@/types/task";

import { useState } from "react";
import { useTaskStore } from "@/lib/useTaskStore";
import { TaskCard } from "./TaskCard";

interface TaskColumnProps {
  column: ColumnType;
}

export function TaskColumn({ column }: TaskColumnProps) {
  const [isOver, setIsOver] = useState(false);
  const moveTask = useTaskStore((state) => state.moveTask);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);

    const taskId = e.dataTransfer.getData("taskId");
    if (taskId) {
      moveTask(taskId, column.id as TaskStatus);
    }
  };

  return (
    <div
      className={`w-96 shrink-0 bg-slate-800/40 border rounded-xl p-4 transition-all duration-300 ${
        isOver
          ? "border-blue-400/60 bg-blue-900/10 shadow-lg shadow-blue-500/20"
          : "border-slate-700/50 hover:bg-slate-800/60"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Column header */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">{column.title}</h2>
          <span className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs font-medium rounded-full">
            {column.tasks.length}
          </span>
        </div>
      </div>

      {/* Tasks container */}
      <div className="space-y-3 min-h-[500px] max-h-[calc(100vh-300px)] overflow-y-auto pr-1">
        {column.tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-500 transition-opacity duration-300">
            <div className="text-4xl mb-2">📭</div>
            <p className="text-sm">No tasks in this column</p>
          </div>
        ) : (
          column.tasks.map((task, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))
        )}
      </div>
    </div>
  );
}
