import { Tasks } from "./modules/task/tasks";

function App() {
  return (
    <div className="flex justify-center">
      <div>
        {/* <h1>Task management</h1>
        <ul className="flex flex-col">
          <Task title="breakfast" />
          <Task title="Lunch" />
          <Task title="dinner" />
        </ul>
        <div className="flex min-h-svh flex-col items-center justify-center">
          <Button>Click me</Button>
        </div> */}
      </div>
      <div className="flex justify-center">
        <main className="w-full max-w-lg space-y-8">
          <h1 className="my-4 text-2xl font-bold text-sky-700">
            Task Management
          </h1>

          <Tasks />
        </main>
      </div>
    </div>
  );
}

export function Task({ title }: { title: string }) {
  return <span>{title}</span>;
}

export default App;
