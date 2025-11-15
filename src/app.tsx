const dataTasks = [
  { id: 1, title: "Breakfast" },
  { id: 2, title: "Lunch" },
  { id: 3, title: "Dinner" },
  { id: 4, title: "Sleep" },
];

function App() {
  return (
    <div className="flex justify-center">
      <div>
        <h1>Task management</h1>
        <ul className="flex flex-col">
          {dataTasks.map((task) => {
            return (
              <li key={task.id}>
                <Task title={task.title} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export function Task({ title }: { title: string }) {
  return <span>{title}</span>;
}

export default App;
