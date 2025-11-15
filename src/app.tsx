import "./app.css";

function App() {
  return (
    <div>
      <h1>Task management</h1>
      <Profile />
      <Profile />
      <Profile />
    </div>
  );
}

export function Profile() {
  return <img width={200} src="https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?cs=srgb&dl=scientist-working-in-laboratory-3938023.jpg&fm=jpg" alt="Katherine Johnson" />;
}

export default App;
