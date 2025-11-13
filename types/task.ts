export type TaskStatus =
  | "not-started"
  | "todo"
  | "in-progress"
  | "in-review"
  | "completed";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  dueDate: string;
  createdAt: string;
}

export interface Column {
  id: string;
  title: string;
  status: TaskStatus;
  tasks: Task[];
}
