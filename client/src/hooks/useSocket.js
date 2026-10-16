import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext.jsx";
import { io } from "socket.io-client";

export function useSocket(roomId) {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setMessages([]);
    setSocket(null);
    if (!token) return undefined;

    const connection = io(import.meta.env.VITE_SOCKET_URL, {
      auth: { token },
    });
    setSocket(connection);

    const onMessage = (message) => {
      setMessages((previousMessages) => [...previousMessages, message]);
    };
    connection.on("chat:message", onMessage);
    connection.emit("room:join", roomId);

    return () => {
      connection.off("chat:message", onMessage);
      connection.disconnect();
    };
  }, [token, roomId]);

  const sendMessage = useCallback(
    (text) => socket?.emit("chat:message", { roomId, text }),
    [socket, roomId]
  );

  return { messages, sendMessage };
}
