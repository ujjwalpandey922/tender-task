"use client";

import type React from "react";

import type { Task, TaskPriority } from "@/types/task";
import { useState } from "react";
import { useTaskStore } from "@/lib/useTaskStore";
import { TaskDetail } from "./TaskDetail";

interface TaskCardProps {
  task: Task;
  index: number;
}

const priorityConfig: Record<
  TaskPriority,
  { color: string; label: string; icon: string }
> = {
  low: { color: "from-blue-500 to-blue-600", label: "Low", icon: "↓" },
  medium: {
    color: "from-yellow-500 to-yellow-600",
    label: "Medium",
    icon: "→",
  },
  high: { color: "from-orange-500 to-orange-600", label: "High", icon: "↑" },
  urgent: { color: "from-red-500 to-red-600", label: "Urgent", icon: "⚡" },
};

export function TaskCard({ task, index }: TaskCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const priority = priorityConfig[task.priority];

  // Check if task is overdue
  const dueDate = new Date(task.dueDate);
  const today = new Date();
  const isOverdue = dueDate < today && task.status !== "completed";

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("taskId", task.id);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.id);
    }
  };

  return (
    <>
      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowDetail(true)}
        className={`bg-slate-700/40 border border-slate-600/30 rounded-lg p-4 cursor-grab active:cursor-grabbing transition-all duration-200 group ${
          isDragging
            ? "opacity-50 border-slate-500/60"
            : "hover:border-slate-500/60 hover:bg-slate-700/60 hover:shadow-lg hover:-translate-y-1"
        }`}
        style={{
          animation: `slideIn 0.3s ease-out ${index * 0.05}s backwards`,
        }}
      >
        {/* Header with title and priority */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-sm font-semibold text-white flex-1 line-clamp-2 group-hover:text-blue-300 transition-colors">
            {task.title}
          </h3>
          <div
            className={`bg-linear-to-r ${priority.color} px-2 py-0.5 rounded text-white text-xs font-medium shrink-0`}
          >
            {priority.icon}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-300 mb-3 line-clamp-2">
          {task.description}
        </p>

        {/* Metadata section */}
        <div className="space-y-2 text-xs mb-3">
          <div className="flex items-center text-slate-400">
            <span className="mr-2">👤</span>
            <span className="truncate">{task.assignee}</span>
          </div>
          <div
            className={`flex items-center ${
              isOverdue ? "text-red-400" : "text-slate-400"
            }`}
          >
            <span className="mr-2">📅</span>
            <span>
              {dueDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
            {isOverdue && <span className="ml-1 font-semibold">(Overdue)</span>}
          </div>
        </div>

        {/* Hover action bar */}
        {isHovered && (
          <div className="pt-3 border-t border-slate-600/50 flex gap-2 animate-in fade-in duration-200">
            <button className="flex-1 px-2 py-1.5 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 text-xs font-medium rounded transition-colors">
              View
            </button>
            <button className="flex-1 px-2 py-1.5 bg-slate-600/20 hover:bg-slate-600/40 text-slate-300 text-xs font-medium rounded transition-colors">
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="px-2 py-1.5 bg-red-600/20 hover:bg-red-600/40 text-red-300 text-xs font-medium rounded transition-colors"
            >
              ✕
            </button>
          </div>
        )}

        <style>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>

      {/* Task Detail Modal */}
      {showDetail && (
        <TaskDetail task={task} onClose={() => setShowDetail(false)} />
      )}
    </>
  );
}
