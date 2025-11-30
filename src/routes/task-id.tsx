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
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const { taskId } = useParams();
  // const params = useParams();
  // const { taskId } = params;

  // const storedTasks = localStorage.getItem("tasks");

  // if (!storedTasks) {
  //   return (
  //     <div>
  //       <h1>Tasks data unavailable</h1>

  //       <Link to="/">Go to home</Link>
  //     </div>
  //   );
  // }

  // const parsedTasks = JSON.parse(storedTasks) as Tasks;

  // const task = parsedTasks.find((task) => task.id === Number(taskId));
  const task = tasks.find((task) => task.id === Number(taskId));

  if (!task) {
    return (
      <div>
        <h1>Task not found</h1>
      </div>
    );
  }

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
              isDone: true,
              updatedAt: new Date().toISOString(),
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
        <h2 className="text-2xl font-semibold text-gray-800">
          {toCapitalCase(task.title)}
        </h2>
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
          <p>
            {task.status === "todo"
              ? "📝 Todo"
              : task.status === "done"
                ? "✅ Done"
                : "⚡ In Progress"}
          </p>
        </span>
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

      {/* TODO: add Tags */}
      {/* <div className="mb-6">
        <p className="mb-2 text-sm text-gray-500">Tags</p>
        <div className="flex space-x-2">
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700">
            learning
          </span>
          <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700">
            frontend
          </span>
        </div>
      </div> */}

      <div className="flex justify-end space-x-4">
        <Link
          className="rounded-lg border border-gray-300 px-5 py-2 text-gray-600 transition hover:bg-gray-100"
          to="/"
        >
          Back
        </Link>

        {/* TODO: add edit feature */}
        {/* <button className="rounded-lg bg-indigo-600 px-5 py-2 text-white shadow transition hover:bg-indigo-700">
          Edit Task
        </button> */}

        {(task.status === "todo" || task.status === "inprogress") && (
          <button
            className="rounded-lg bg-emerald-500 px-5 py-2 text-white shadow transition hover:bg-emerald-600"
            onClick={() => handleDone(task.id)}
          >
            Done
          </button>
        )}
      </div>
    </section>
  );
}
