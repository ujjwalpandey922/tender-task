"use client";

import { useCallback } from "react";
import type { Comment } from "@/types/comment";
import { useTaskStore } from "@/lib/useTaskStore";

export function useTaskComments(taskId: string) {
  const { comments, addComment, deleteComment } = useTaskStore();

  const taskComments = comments.filter((c) => c.taskId === taskId);

  const handleAddComment = useCallback(
    (content: string, author: string) => {
      const newComment: Comment = {
        id: Math.random().toString(36).substr(2, 9),
        taskId,
        author,
        content,
        createdAt: new Date().toISOString(),
      };
      addComment(newComment);
      return newComment;
    },
    [taskId, addComment]
  );

  const handleDeleteComment = useCallback(
    (commentId: string) => {
      deleteComment(commentId);
    },
    [deleteComment]
  );

  return {
    comments: taskComments,
    addComment: handleAddComment,
    deleteComment: handleDeleteComment,
  };
}
