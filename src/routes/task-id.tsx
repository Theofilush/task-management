import { initialDataTasks } from "@/modules/task/data";
import { type Tasks } from "@/modules/task/schema";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { toast } from "sonner";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export function TaskId() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? (JSON.parse(storedTasks) as Tasks) : initialDataTasks;
  });

  console.log({ tasks });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const { taskId } = useParams();

  const task = tasks.find((task) => task.id === Number(taskId));

  if (!task) {
    return (
      <div>
        <h1>Task not found</h1>
      </div>
    );
  }

  const isStatusTodo = task.status === "todo";
  const isStatusInProgreess = task?.status === "inprogress";

  function toCapitalCase(text: string): string {
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  function handleDone(taskId: number) {
    try {
      const updatedTasks: Tasks = tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: "done",
              updatedAt: new Date(),
            }
          : task,
      );

      setTasks(updatedTasks);
    } catch (error) {
      console.error("Failed to mark task as done:", error);
      toast.error("Gagal mengubah status task");
    }
  }

  return (
    <section className="mx-auto max-w-3xl rounded-xl bg-white p-8 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <Link
          className="rounded-lg border border-gray-300 px-5 py-2 text-gray-600 transition hover:bg-gray-100"
          to="/"
        >
          Back
        </Link>

        <h2 className="text-2xl font-semibold text-gray-800">
          {toCapitalCase(task.title)}
        </h2>
        <button
          className="rounded-lg bg-emerald-500 px-5 py-2 text-white shadow transition hover:bg-emerald-600"
          onClick={() => handleDone(task.id)}
        >
          <p>
            {isStatusTodo
              ? "📝 Todo"
              : isStatusInProgreess
                ? "⚡ In Progress"
                : "✅ Done"}
          </p>
        </button>
      </div>

      <p className="mb-6 text-gray-600">{task.description}</p>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Priority</p>
          <p className="font-medium text-gray-800">
            {toCapitalCase(task.priority)}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Due Date</p>
          <p className="font-medium text-gray-800">
            {format(new Date(task.dueDate ?? ""), "dd MMMM yyyy, HH:mm", {
              locale: id,
            })}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Created At</p>
          <p className="font-medium text-gray-800">
            {format(new Date(task.createdAt), "dd MMMM yyyy, HH:mm", {
              locale: id,
            })}
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">Updated At</p>
          <p className="font-medium text-gray-800">
            {format(new Date(task.updatedAt), "dd MMMM yyyy, HH:mm", {
              locale: id,
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
