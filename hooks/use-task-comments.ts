"use client";

// Custom hook for managing task comments - separates comment logic from components
import { useState, useCallback } from "react";
import type { Comment } from "@/types/comment";

export function useTaskComments(taskId: string) {
  const [comments, setComments] = useState<Comment[]>([]);

  const addComment = useCallback(
    (content: string, author: string) => {
      const newComment: Comment = {
        id: Math.random().toString(36).substr(2, 9),
        taskId,
        author,
        content,
        createdAt: new Date().toISOString(),
      };
      setComments((prev) => [...prev, newComment]);
      return newComment;
    },
    [taskId]
  );

  const deleteComment = useCallback((commentId: string) => {
    setComments((prev) => prev.filter((c) => c.id !== commentId));
  }, []);

  return { comments, addComment, deleteComment };
}
