import { Button } from "@mui/material";
import { useWebsocketContext } from "../hooks/useWebsocket";

interface RoomProps {
  onDisconnect: () => void;
}

export const Room = ({ onDisconnect }: RoomProps) => {
  const { counter, increment, reset, roomName } = useWebsocketContext();

  return (
    <>
      <h1>{roomName}</h1>
      <h2>{counter}</h2>
      <div className="card">
        <button onClick={increment}>Increment</button>
        <button onClick={reset}>Reset</button>
      </div>

      <Button onClick={onDisconnect}>Disconnect</Button>
    </>
  );
};
