import "./App.css";

import { ThemeProvider, createTheme } from "@mui/material";
import { WebsocketContextProvider } from "./hooks/useWebsocket";
import { useState } from "react";
import { Connect } from "./components/Connect";
import { Room } from "./components/Room";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

interface RoomConfig {
  roomName: string;
  nickname: string;
}

const getConfig = () => {
  const roomName = localStorage.getItem("roomName");
  const nickname = localStorage.getItem("nickname");

  return roomName && nickname
    ? { roomName: roomName, nickname: nickname }
    : undefined;
};

function App() {
  const [roomConfig, setRoomConfig] = useState<RoomConfig | undefined>(
    getConfig()
  );

  const handleConnect = (room: string, nickname: string) => {
    setRoomConfig({ roomName: room, nickname: nickname });
    localStorage.setItem("roomName", room);
    localStorage.setItem("nickname", nickname);
  };

  const handleDisconnect = () => {
    localStorage.removeItem("roomName");
    localStorage.removeItem("nickname");
    setRoomConfig(undefined);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      {roomConfig ? (
        <WebsocketContextProvider
          room={roomConfig.roomName}
          nickname={roomConfig.nickname}
        >
          <Room onDisconnect={handleDisconnect} />
        </WebsocketContextProvider>
      ) : (
        <Connect onSubmit={handleConnect} />
      )}
    </ThemeProvider>
  );
}

export default App;
