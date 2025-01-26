import { createContext, useContext, useEffect, useState } from "react";
import { WebsocketProvider } from "y-websocket";
import * as Y from "yjs";

interface useWebsocketProviderValues {
  counter: number | undefined;
  increment: () => void;
  reset: () => void;
}

const WebsocketContext = createContext<useWebsocketProviderValues | null>(null);

export const WebsocketContextProvider = ({
  room,
  children,
}: React.PropsWithChildren<{ room: string }>) => {
  const [counter, setCounter] = useState<number>();

  const [wsProvider, setWsProvider] = useState<WebsocketProvider | null>(null);

  useEffect(() => {
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider("ws://localhost:1234", room, ydoc);

    setWsProvider(provider);

    const yCounter: Y.Map<number> = ydoc.getMap("counter");

    if (!yCounter.has("value")) {
      yCounter.set("value", 0);
    }

    const updateCounter = () => {
      setCounter(yCounter.get("value"));
    };

    yCounter.observe(updateCounter);

    return () => {
      provider.disconnect();
    };
  }, [room]);

  const increment = () => {
    if (wsProvider) {
      const yCounter: Y.Map<number> = wsProvider.doc.getMap("counter");
      const currentValue: number = yCounter.get("value") || 0;
      yCounter.set("value", currentValue + 1);
    }
  };

  const reset = () => {
    if (wsProvider) {
      const yCounter: Y.Map<number> = wsProvider.doc.getMap("counter");
      yCounter.set("value", 0);
    }
  };

  const value = { counter, increment, reset };
  return (
    <WebsocketContext.Provider value={value}>
      {children}
    </WebsocketContext.Provider>
  );
};

export const useWebsocketContext = () => {
  const context = useContext(WebsocketContext);

  if (!context) {
    throw new Error("No websocket provider found.");
  }
  return context;
};
