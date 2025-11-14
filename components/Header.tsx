"use client";
import { useState } from "react";
import { AddTaskModal } from "./add-task-modal";

interface HeaderProps {
  completed: number;
  total: number;
}

export function Header({ completed, total }: HeaderProps) {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  return (
    <>
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10 transition-all duration-300">
        <div className="px-4 sm:px-6 py-4 sm:py-6 w-full">
          {/* TOP ROW */}
          <div
            className="
            flex flex-wrap 
            items-center justify-between 
            gap-4
          "
          >
            {/* LEFT */}
            <div className="min-w-[200px]">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Tender Tasks
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm mt-1 max-sm:hidden">
                Manage your project tasks efficiently
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-6 sm:gap-8 ml-auto">
              {/* Stats */}
              <div className="text-right max-sm:hidden">
                <div className="text-2xl sm:text-3xl font-bold text-blue-400 animate-pulse">
                  {completed}
                </div>
                <p className="text-slate-400 text-xs sm:text-sm">
                  of {total} completed
                </p>
              </div>

              {/* Button */}
              <button
                onClick={() => setIsAddTaskOpen(true)}
                className="
                  px-3 sm:px-4 py-2 
                  cursor-pointer bg-linear-to-r from-blue-600 to-blue-700
                  hover:from-blue-700 hover:to-blue-800 
                  text-white rounded-lg font-medium 
                  transition-all duration-200 
                  hover:shadow-lg hover:shadow-blue-500/25 
                  transform hover:scale-105
                  text-sm sm:text-base
                "
              >
                + New Task
              </button>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="mt-4 bg-slate-800 rounded-full h-1.5 overflow-hidden shadow-inner">
            <div
              className="bg-linear-to-r from-blue-500 via-purple-500 to-blue-500 h-full transition-all duration-500 shadow-lg shadow-blue-500/50"
              style={{
                width: `${total > 0 ? (completed / total) * 100 : 0}%`,
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
              }}
            />
          </div>
        </div>
      </header>

      <AddTaskModal
        isOpen={isAddTaskOpen}
        onClose={() => setIsAddTaskOpen(false)}
      />
    </>
  );
}
