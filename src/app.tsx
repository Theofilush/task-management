import { Tasks } from "./modules/task/tasks";

function App() {
  return (
    <div className="flex justify-center">
      <main className="w-full max-w-lg space-y-8">
        <h1 className="my-4 text-2xl font-bold text-sky-700">
          Task Management
        </h1>

        <Tasks />
      </main>
    </div>
  );
}

export function Task({ title }: { title: string }) {
  return <span>{title}</span>;
}

export default App;
