import { initialDataTasks } from "@/modules/task/data";
import { TaskSchema, type Task, type Tasks } from "@/modules/task/schema";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

export function Create() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? (JSON.parse(storedTasks) as Tasks) : initialDataTasks;
  });
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const storedTasks = localStorage.getItem("tasks");

  if (!storedTasks) {
    return (
      <div>
        <h1>Tasks data unavailable</h1>

        <Link to="/">Go to home</Link>
      </div>
    );
  }

  function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
      const rawDueDate = formData.get("due-date")?.toString();
      const newTask: Task = {
        id: newId,
        title: formData.get("title")?.toString().trim() || "",

        description: formData.get("description")?.toString().trim() || "",
        status: (formData.get("status")?.toString().trim() || "todo") as
          | "todo"
          | "inprogress"
          | "done",
        priority: (formData.get("priority")?.toString().trim() || "low") as
          | "low"
          | "medium"
          | "high",
        dueDate: rawDueDate ? new Date(rawDueDate) : undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      TaskSchema.parse(newTask);

      const updatedTasks: Tasks = [...tasks, newTask];

      setTasks(updatedTasks);

      event.currentTarget.reset();
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const messages = error.issues.map((issue) => issue.message).join(", ");
        toast.error("Task invalid", { description: messages });
      }
    }
  }

  return (
    <section className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-semibold text-gray-700">
        📝 Task Information
      </h2>
      {/* <form method="post" onSubmit={handleCreate} className="space-y-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title:</Label>
          <Input id="title" type="text" name="title" required />
        </div>
        <Button type="submit">Create Task</Button>
      </form> */}
      <form className="space-y-6" method="post" onSubmit={handleCreate}>
        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-gray-600"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Enter task title"
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
          />
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-gray-600"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            placeholder="Write task details..."
            id="description"
            name="description"
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
          ></textarea>
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-gray-600"
            htmlFor="status"
          >
            Status
          </label>
          <select
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            id="status"
            name="status"
          >
            <option value="todo">Todo</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-gray-600"
            htmlFor="priority"
          >
            Priority
          </label>
          <select
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            id="priority"
            name="priority"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium text-gray-600"
            htmlFor="due-date"
          >
            Due Date
          </label>
          <input
            id="due-date"
            name="due-date"
            type="date"
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
          />
        </div>

        {/* TODO: add tags label */}
        {/* <div>
          <label className="mb-2 block text-sm font-medium text-gray-600">
            Tags
          </label>
          <input
            type="text"
            placeholder="e.g. work, personal"
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
          />
        </div> */}

        <div className="flex justify-end space-x-4">
          <Link
            className="rounded-lg border border-gray-300 px-5 py-2 text-gray-600 transition hover:bg-gray-100"
            to="/"
          >
            Back
          </Link>
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-5 py-2 text-white shadow transition hover:bg-indigo-700"
          >
            Save Task
          </button>
        </div>
      </form>
    </section>
  );
}
