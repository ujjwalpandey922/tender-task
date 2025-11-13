// Comment interface for task comments thread
export interface Comment {
  id: string;
  taskId: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}
