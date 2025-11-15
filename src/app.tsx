function App() {
  return (
    <div className="flex justify-center">
      <div>
        <h1>Task management</h1>
        <ul className="flex flex-col">
          <Task />
          <Task />
          <Task />
        </ul>
      </div>
    </div>
  );
}

export function Task() {
  return <span>Breakfast</span>;
}

export default App;
