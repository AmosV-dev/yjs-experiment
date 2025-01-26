import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { WebsocketContextProvider } from "./hooks/useWebsocket.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WebsocketContextProvider room="my-roomname">
      <App />
    </WebsocketContextProvider>
  </StrictMode>
);
