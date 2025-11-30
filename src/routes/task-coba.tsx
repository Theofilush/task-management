import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TaskSchema, type Task, type Tasks } from "@/modules/task/schema";
import { EyeIcon, TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { z } from "zod";
import { toast } from "sonner";
import { initialDataTasks } from "@/modules/task/data";

export function Tasks() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? (JSON.parse(storedTasks) as Tasks) : initialDataTasks;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleDelete(id: number) {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    setTasks(updatedTasks);
  }

  function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);

      const newId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

      const newTask: Task = {
        id: newId,
        title: formData.get("title")?.toString().trim() || "",
        isDone: false,
        description: formData.get("description")?.toString() || "",
        status: "todo",
        priority: "low",
        dueDate: formData.get("dueDate")?.toString() || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      TaskSchema.parse(newTask);

      const updatedTasks: Tasks = [...tasks, newTask];
      setTasks(updatedTasks);

      event.currentTarget.reset();
      toast.success("Task berhasil dibuat");
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        const messages = error.issues.map((issue) => issue.message).join(", ");
        toast.error("Task invalid", { description: messages });
      }
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <section className="space-y-4 rounded-xl bg-white p-5 shadow-lg">
        <form method="post" onSubmit={handleCreate} className="space-y-2">
          <div className="space-y-2">
            <Label htmlFor="title">Title:</Label>
            <Input id="title" type="text" name="title" required />
          </div>
          <Button type="submit">Create Task</Button>
        </form>
      </section>
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* <!-- Todo --> */}
        <div className="rounded-xl bg-white p-5 shadow-lg">
          <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-700">
            📝 Todo
          </h2>
          <div className="space-y-4">
            <ul className="flex flex-col gap-4">
              {tasks
                .filter((task) => task.status === "todo")
                .map((task) => (
                  <li key={task.id}>
                    <TodoTaskItem
                      task={task}
                      handleDelete={() => handleDelete(task.id)}
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* <!-- In Progress --> */}
        <div className="rounded-xl bg-white p-5 shadow-lg">
          <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-700">
            ⚡ In Progress
          </h2>
          <div className="space-y-4">
            <ul className="flex flex-col gap-4">
              {tasks
                .filter((task) => task.status === "inprogress")
                .map((task) => (
                  <li key={task.id}>
                    <InProgressTaskItem
                      task={task}
                      handleDelete={() => handleDelete(task.id)}
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* <!-- Done --> */}
        <div className="rounded-xl bg-white p-5 shadow-lg">
          <h2 className="mb-4 border-b pb-2 text-xl font-semibold text-gray-700">
            ✅ Done
          </h2>
          <div className="space-y-4">
            <ul className="flex flex-col gap-4">
              {tasks
                .filter((task) => task.status === "done")
                .map((task) => (
                  <li key={task.id}>
                    <DoneTaskItem
                      task={task}
                      handleDelete={() => handleDelete(task.id)}
                    />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export function TodoTaskItem({
  task,
  handleDelete,
}: {
  task: Task;
  handleDelete?: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-indigo-50 p-4 shadow">
      <div>
        <h3 className="font-medium text-gray-800">{task.title}</h3>
        <p className="text-sm text-gray-500">{task.description}</p>
        <p className="text-xs text-gray-500">
          {task.isDone ? "✅ Done" : "📝 Todo"}
        </p>
      </div>
      <div className="flex space-x-2">
        <Link
          to={`/tasks/${task.id}`}
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
        >
          <EyeIcon className="size-3" />
          <span className="text-xs">View</span>
        </Link>
        {handleDelete && (
          <button
            className="inline-flex items-center gap-1 text-red-600 hover:text-red-800"
            onClick={handleDelete}
          >
            <TrashIcon className="size-3" />
            <span className="text-xs">Delete</span>
          </button>
        )}
      </div>
    </div>
  );
}

export function InProgressTaskItem({
  task,
  handleDelete,
}: {
  task: Task;
  handleDelete?: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-yellow-50 p-4 shadow">
      <div>
        <h3 className="font-medium text-gray-800">{task.title}</h3>
        <p className="text-sm text-gray-500">{task.description}</p>
        <p className="text-xs text-gray-500">
          {task.isDone ? "✅ Done" : "📝 Todo"}
        </p>
      </div>
      <div className="flex space-x-2">
        <Link
          to={`/tasks/${task.id}`}
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
        >
          <EyeIcon className="size-3" />
          <span className="text-xs">View</span>
        </Link>
        {handleDelete && (
          <button
            className="inline-flex items-center gap-1 text-red-600 hover:text-red-800"
            onClick={handleDelete}
          >
            <TrashIcon className="size-3" />
            <span className="text-xs">Delete</span>
          </button>
        )}
      </div>
    </div>
  );
}

export function DoneTaskItem({
  task,
  handleDelete,
}: {
  task: Task;
  handleDelete?: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-green-50 p-4 shadow">
      <div>
        <h3 className="font-medium text-gray-800">{task.title}</h3>
        <p className="text-sm text-gray-500">{task.description}</p>
        <p className="text-xs text-gray-500">
          {task.isDone ? "✅ Done" : "📝 Todo"}
        </p>
      </div>
      <div className="flex space-x-2">
        <Link
          to={`/tasks/${task.id}`}
          className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800"
        >
          <EyeIcon className="size-3" />
          <span className="text-xs">View</span>
        </Link>
        {handleDelete && (
          <button
            className="inline-flex items-center gap-1 text-red-600 hover:text-red-800"
            onClick={handleDelete}
          >
            <TrashIcon className="size-3" />
            <span className="text-xs">Delete</span>
          </button>
        )}
      </div>
    </div>
  );
}
