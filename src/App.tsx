import "./App.css";

import { useWebsocketContext } from "./hooks/useWebsocket";

function App() {
  const { counter, increment, reset } = useWebsocketContext();

  return (
    <>
      <h1>Welcome</h1>
      <h2>Enter an existing room, or create a new room.</h2>
      <input type="text" />
      <h1>{counter}</h1>
      <div className="card">
        <button onClick={increment}>Increment</button>
        <button onClick={reset}>Reset</button>
      </div>
    </>
  );
}

export default App;
