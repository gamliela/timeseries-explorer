import {useCallback, useDebugValue, useEffect, useRef, useState} from "react";
import {SocketState, SocketStatus} from "./types";

function useForceUpdate(): [boolean, () => void] {
  const [updated, update] = useState<boolean>(false);
  const forceUpdate: () => void = useCallback(() => {
    update(state => !state);
  }, []);
  return [updated, forceUpdate];
}

function useSocket<T>(url: string,
                      onOpen?: () => void,
                      onMessage?: (data: T) => void): SocketState<T> {
  const [status, setStatus] = useState(SocketStatus.Init);
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Event>();
  const [restartRequested, requestRestart] = useForceUpdate();
  const socket = useRef<WebSocket>();

  useDebugValue(status);

  useEffect(function openSocket() {
    socket.current = new WebSocket(url);
    setStatus(SocketStatus.Connecting);

    socket.current.onopen = function () {
      setStatus(SocketStatus.WaitingForData);
      onOpen && onOpen();
    };

    socket.current.onmessage = function (e: MessageEvent) {
      try {
        const newData = JSON.parse(e.data) as T;
        setData(newData);
        setStatus(SocketStatus.WaitingForAck);
        onMessage && onMessage(newData);
      } catch (e) {
        setStatus(SocketStatus.Error);
        setError(e);
        socket.current && socket.current.close()
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
      socket.current && socket.current.close();
    }
  }, [url, onOpen, onMessage, restartRequested]);

  function sendAck() {
    if ((status == SocketStatus.WaitingForAck) && socket.current) {
      socket.current.send("true");
      setData(undefined);
      setStatus(SocketStatus.WaitingForData);
    }
  }

  return {
    status,
    data,
    error,
    sendAck,
    requestRestart
  }
}

export {SocketStatus};
export default useSocket;
