import { initialDataTasks } from "@/modules/task/data";
import { type Tasks } from "@/modules/task/schema";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export function TaskCreate() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  //   const parsedTasks = JSON.parse(storedTasks) as Tasks;

  //   const task = parsedTasks.find((task) => task.id === Number(taskId));

  return (
    <section className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-2xl font-semibold text-gray-700">
        📝 Task Information
      </h2>
      <form className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter task title"
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600">
            Description
          </label>
          <textarea
            placeholder="Write task details..."
            className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none"
          ></textarea>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600">
            Status
          </label>
          <select className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none">
            <option value="todo">Todo</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600">
            Priority
          </label>
          <select className="w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-indigo-300 focus:outline-none">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-600">
            Due Date
          </label>
          <input
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
