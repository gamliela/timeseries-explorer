import {useDebugValue, useEffect, useRef, useState} from "react";

enum SocketStatus { Init, Connecting, WaitingForData, WaitingForAck, Closed, Error}

function useSocket(url: string) {
  const [status, setStatus] = useState(SocketStatus.Init);
  const [data, setData] = useState(null);
  const [error, setError] = useState<Event | null>(null);
  const socket = useRef<WebSocket>();

  useDebugValue(status);

  useEffect(function openSocket() {
    socket.current = new WebSocket(url);
    setStatus(SocketStatus.Connecting);

    socket.current.onopen = function () {
      setStatus(SocketStatus.WaitingForData);
    };

    socket.current.onmessage = function (e: MessageEvent) {
      try {
        setData(JSON.parse(e.data));
        setStatus(SocketStatus.WaitingForAck);
      } catch (e) {
        setStatus(SocketStatus.Error);
        setError(e);
      }
    };

    socket.current.onclose = function () {
      setStatus(SocketStatus.Closed);
    };

    socket.current.onerror = function (e: Event) {
      setStatus(SocketStatus.Error);
      setError(e);
    };

    return function cleanup() {
      if (socket.current) {
        socket.current.close();
      }
    }
  }, [url]);

  function sendAck() {
    if ((status == SocketStatus.WaitingForAck) && socket.current) {
      socket.current.send("true");
      setStatus(SocketStatus.WaitingForData);
    }
  }

  return {
    status, data, error, sendAck
  }
}

export default useSocket;
