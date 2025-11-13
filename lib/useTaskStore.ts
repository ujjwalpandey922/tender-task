import { create } from "zustand";
import type { Task, TaskStatus } from "@/types/task";

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, newStatus: TaskStatus) => void;
  getTasksByStatus: (status: TaskStatus) => Task[];
}

// Mock initial data
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Design System Setup",
    description: "Create foundational design tokens and components",
    assignee: "Sarah Chen",
    priority: "high",
    dueDate: "2025-11-20",
    status: "in-progress",
    createdAt: "2025-11-13",
  },
  {
    id: "2",
    title: "API Integration",
    description: "Connect frontend to backend services",
    assignee: "Mike Johnson",
    priority: "urgent",
    dueDate: "2025-11-18",
    status: "todo",
    createdAt: "2025-11-13",
  },
  {
    id: "3",
    title: "User Research",
    description: "Conduct user interviews for validation",
    assignee: "Emma Davis",
    priority: "medium",
    dueDate: "2025-11-25",
    status: "not-started",
    createdAt: "2025-11-13",
  },
  {
    id: "4",
    title: "Testing Framework",
    description: "Set up unit and integration testing",
    assignee: "James Wilson",
    priority: "high",
    dueDate: "2025-11-22",
    status: "completed",
    createdAt: "2025-11-13",
  },
  {
    id: "5",
    title: "Database Migration",
    description: "Migrate data from legacy system",
    assignee: "Lisa Park",
    priority: "high",
    dueDate: "2025-11-19",
    status: "in-review",
    createdAt: "2025-11-13",
  },
];

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: initialTasks,

  addTask: (task: Task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  updateTask: (id: string, updates: Partial<Task>) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task
      ),
    })),

  deleteTask: (id: string) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),

  moveTask: (id: string, newStatus: TaskStatus) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      ),
    })),

  getTasksByStatus: (status: TaskStatus) => {
    const state = get();
    return state.tasks.filter((task) => task.status === status);
  },
}));
