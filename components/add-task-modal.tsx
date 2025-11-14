"use client";

import { useState } from "react";
import type { TaskPriority, TaskStatus } from "@/types/task";
import { useTaskStore } from "@/hooks/useTaskStore";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  const addTask = useTaskStore((state) => state.addTask);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<TaskStatus>("not-started");

  // ❗ New error state
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    assignee: "",
    dueDate: "",
  });

  // ❗ Validation
  const validateForm = () => {
    const newErrors = {
      title: "",
      description: "",
      assignee: "",
      dueDate: "",
    };

    let isValid = true;

    if (!title.trim()) {
      newErrors.title = "Title is required.";
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = "Description is required.";
      isValid = false;
    }

    if (!assignee.trim()) {
      newErrors.assignee = "Assignee is required.";
      isValid = false;
    }

    if (!dueDate) {
      newErrors.dueDate = "Due date is required.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newTask = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      assignee: assignee.trim(),
      priority,
      dueDate,
      status,
      createdAt: new Date().toISOString().split("T")[0],
    };

    addTask(newTask);

    // Reset form
    setTitle("");
    setDescription("");
    setAssignee("");
    setPriority("medium");
    setDueDate("");
    setStatus("not-started");
    setErrors({ title: "", description: "", assignee: "", dueDate: "" });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-900 rounded-lg shadow-lg max-w-md w-full mx-4 border border-slate-800">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Create New Task</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Task Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className={`w-full px-3 py-2 bg-slate-800 border rounded-lg text-white placeholder-slate-500 
              ${
                errors.title
                  ? "border-red-500 focus:border-red-500"
                  : "border-slate-700 focus:border-blue-500"
              } 
              focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors`}
            />
            {errors.title && (
              <p className="text-red-400 text-xs mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Description *
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              rows={3}
              className={`w-full px-3 py-2 bg-slate-800 border rounded-lg text-white placeholder-slate-500 resize-none
              ${errors.description ? "border-red-500" : "border-slate-700"} 
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors`}
            />
            {errors.description && (
              <p className="text-red-400 text-xs mt-1">{errors.description}</p>
            )}
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Assignee *
            </label>
            <input
              type="text"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              placeholder="Enter assignee name"
              className={`w-full px-3 py-2 bg-slate-800 border rounded-lg text-white placeholder-slate-500
              ${errors.assignee ? "border-red-500" : "border-slate-700"} 
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors`}
            />
            {errors.assignee && (
              <p className="text-red-400 text-xs mt-1">{errors.assignee}</p>
            )}
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Due Date *
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={`w-full px-3 py-2 bg-slate-800 border rounded-lg text-white
              ${errors.dueDate ? "border-red-500" : "border-slate-700"} 
              focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors`}
            />
            {errors.dueDate && (
              <p className="text-red-400 text-xs mt-1">{errors.dueDate}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            >
              <option value="not-started">Not Started</option>
              <option value="todo">To-Do</option>
              <option value="in-progress">In Progress</option>
              <option value="in-review">In Review</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
