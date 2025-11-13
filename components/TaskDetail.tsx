"use client";

import type React from "react";

import type { Task } from "@/types/task";
import { useState } from "react";
import { useTaskComments } from "@/hooks/use-task-comments";
import { CommentThread } from "./CommentThread";
interface TaskDetailProps {
  task: Task;
  onClose: () => void;
}

const priorityConfig = {
  low: { color: "bg-blue-500", label: "Low" },
  medium: { color: "bg-yellow-500", label: "Medium" },
  high: { color: "bg-orange-500", label: "High" },
  urgent: { color: "bg-red-500", label: "Urgent" },
};

const statusConfig = {
  "not-started": "Not Started",
  todo: "To-Do",
  "in-progress": "In Progress",
  "in-review": "In Review",
  completed: "Completed",
};

export function TaskDetail({ task, onClose }: TaskDetailProps) {
  const { comments, addComment, deleteComment } = useTaskComments(task.id);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      addComment(newComment, "Current User");
      setNewComment("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-700">
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">{task.title}</h2>
            <p className="text-slate-400">{task.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Task Details Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-700/30 p-4 rounded-lg">
              <p className="text-slate-400 text-sm mb-1">Status</p>
              <p className="text-white font-semibold">
                {statusConfig[task.status as keyof typeof statusConfig]}
              </p>
            </div>
            <div className="bg-slate-700/30 p-4 rounded-lg">
              <p className="text-slate-400 text-sm mb-1">Priority</p>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    priorityConfig[task.priority as keyof typeof priorityConfig]
                      .color
                  }`}
                />
                <p className="text-white font-semibold">
                  {
                    priorityConfig[task.priority as keyof typeof priorityConfig]
                      .label
                  }
                </p>
              </div>
            </div>
            <div className="bg-slate-700/30 p-4 rounded-lg">
              <p className="text-slate-400 text-sm mb-1">Assignee</p>
              <p className="text-white font-semibold">{task.assignee}</p>
            </div>
            <div className="bg-slate-700/30 p-4 rounded-lg">
              <p className="text-slate-400 text-sm mb-1">Due Date</p>
              <p className="text-white font-semibold">
                {new Date(task.dueDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Comments Section */}
          <div className="border-t border-slate-700 pt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Comments</h3>

            {/* Comment Thread */}
            <CommentThread
              comments={comments}
              onDeleteComment={deleteComment}
            />

            {/* Add Comment Form */}
            <form onSubmit={handleAddComment} className="mt-4 space-y-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full bg-slate-700/30 border border-slate-600 rounded-lg p-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                rows={3}
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
              >
                Post Comment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
