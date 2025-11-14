"use client";

import type { Column as ColumnType } from "@/types/task";
import { Header } from "./Header";
import { useTaskStore } from "@/lib/useTaskStore";
import { TaskColumn } from "./TaskColumn";

const COLUMNS: ColumnType[] = [
  { id: "not-started", title: "Not Started", tasks: [], status: "not-started" },
  { id: "todo", title: "To-Do", tasks: [], status: "todo" },
  { id: "in-progress", title: "In Progress", tasks: [], status: "in-progress" },
  { id: "in-review", title: "In Review", tasks: [], status: "in-review" },
  { id: "completed", title: "Completed", tasks: [], status: "completed" },
];

export default function TaskBoard() {
  const tasks = useTaskStore((state) => state.tasks);

  const columns = COLUMNS.map((col) => ({
    ...col,
    tasks: tasks.filter((task) => task.status === col.id),
  }));

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "completed").length;

  return (
    <div className="min-h-screen bg-linear-to-br from-neutral-800 via-neutral-900 to-neutral-950">
      <Header completed={completedTasks} total={totalTasks} />

      <div className="px-6 pb-6">
        <div className="flex gap-6 overflow-x-auto p-2">
          {columns.map((column) => (
            <TaskColumn key={column.id} column={column} />
          ))}
        </div>
      </div>
    </div>
  );
}
