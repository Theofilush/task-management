function App() {
  return (
    <div className="flex justify-center">
      <div>
        <h1>Task management</h1>
        <ul className="flex flex-col">
          <Task title="breakfast" />
          <Task title="Lunch" />
          <Task title="dinner" />
        </ul>
      </div>
    </div>
  );
}

export function Task({ title }) {
  return <span>{title}</span>;
}

export default App;
