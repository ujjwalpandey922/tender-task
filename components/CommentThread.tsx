"use client";

import type { Comment } from "@/types/comment";
import { Trash2 } from "lucide-react";

interface CommentThreadProps {
  comments: Comment[];
  onDeleteComment: (commentId: string) => void;
}

export function CommentThread({
  comments,
  onDeleteComment,
}: CommentThreadProps) {
  return (
    <div className="space-y-3 max-h-64 overflow-y-auto">
      {comments.length === 0 ? (
        <p className="text-slate-500 text-sm text-center py-8">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30"
          >
            <div className="flex items-start justify-between mb-2">
              <p className="text-white font-medium text-sm">{comment.author}</p>
              <button
                onClick={() => onDeleteComment(comment.id)}
                className="text-slate-500 hover:text-red-400 transition-colors text-xs cursor-pointer"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <p className="text-slate-300 text-sm">{comment.content}</p>
            <p className="text-slate-500 text-xs mt-2">
              {new Date(comment.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
