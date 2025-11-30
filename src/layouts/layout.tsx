import { Link, Outlet } from "react-router";

export function Layout2() {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg">
        <nav className="flex items-center justify-between gap-4">
          <h1 className="my-4 text-2xl font-bold text-sky-700">
            <Link to="/">Task Management</Link>
          </h1>

          <ul className="inline-flex gap-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <main className="w-full space-y-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function Layout() {
  return (
    <div className="min-h-screen bg-linear-to-r from-indigo-50 via-white to-indigo-100 p-8">
      <header className="mb-8 flex w-full items-center justify-between">
        <h1 className="text-xl font-bold text-indigo-700">
          <Link to="/">✨Handoyo Task Management</Link>
        </h1>
        <Link
          className="rounded-lg bg-indigo-600 px-5 py-2 text-white shadow transition hover:bg-indigo-700"
          to="/task/create"
        >
          + Create Task
        </Link>
      </header>

      <Outlet />
    </div>
  );
}
